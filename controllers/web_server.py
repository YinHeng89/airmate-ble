#!/usr/bin/env python3
"""
AIRMATE FS35-SRD133 网页控制服务（纯后端）

架构：
  - BLE 连接在独立 asyncio 线程中运行
  - HTTP 服务器（标准库）提供网页 + REST API
  - 前端文件位于同目录 ../static/（index.html / style.css / app.js）
  - 通过线程安全的 FanController 状态对象通信

协议：
  命令帧(写AE21) 5字节：AA [type] [opcode] [param] 55，需 response=True 写入
  状态帧(AE22) 15字节：AA FC 03 [数据] [checksum] 55，checksum = sum(byte[3:13]) & 0xFF

API：
  GET  /            返回 static/index.html
  GET  /style.css   静态样式
  GET  /app.js      静态脚本
  GET  /api/state   获取状态
  POST /api/power   开/关（根据当前状态自动切换，状态未知时拒绝执行）
  POST /api/speed   风速 1~12
  POST /api/mode    风模式 normal/nature/sleep/storm
  POST /api/gear    风模式档位（自然风/睡眠风）
  POST /api/swing   左右摆头
  POST /api/voice   语音
  POST /api/display 屏显
  POST /api/timer   定时 0~15 小时

鉴权（可选）：
  若设置环境变量 AIRMATE_TOKEN，则所有 /api/* 请求需带
  header: Authorization: Bearer <token>，否则返回 401。
  默认不设置该变量时不启用鉴权（局域网内自用场景）。

依赖：pip install bleak
"""

import os
import asyncio
import json
import threading

from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from bleak import BleakClient, BleakScanner


TARGET_NAME = "airmate-fan"
AE21_UUID = "0000ae21-0000-1000-8000-00805f9b34fb"
AE22_UUID = "0000ae22-0000-1000-8000-00805f9b34fb"

MAX_SPEED = 12          # 标准风 1~12 档；13 为暴风特例，见 decode_status 注释
MAX_TIMER = 15
HOST = "0.0.0.0"
PORT = 8080

AUTH_TOKEN = os.environ.get("AIRMATE_TOKEN", "").strip()  # 为空则不鉴权

STATIC_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "static")


# ============================================================
# 命令帧构造
# ============================================================

def parse_hex(s: str) -> bytes:
    return bytes(int(x, 16) for x in s.split())


def cmd_on():
    return parse_hex("AA 01 01 01 55")


def cmd_off():
    return parse_hex("AA 01 01 00 55")


def cmd_speed(level):
    if not 1 <= level <= MAX_SPEED:
        raise ValueError(f"风速范围 1~{MAX_SPEED}")
    return parse_hex(f"AA 01 03 {level:02X} 55")


def cmd_query():
    return parse_hex("AA FC 01 01 55")


def cmd_init():
    return parse_hex("AA FC 01 02 55")


def cmd_timer(hours):
    if not 0 <= hours <= MAX_TIMER:
        raise ValueError(f"定时范围 0~{MAX_TIMER} 小时")
    return parse_hex(f"AA 01 10 {hours:02X} 55")


def cmd_swing_lr(on=True):
    return parse_hex(f"AA 01 07 {'01' if on else '00'} 55")


def cmd_voice(on=True):
    return parse_hex(f"AA 01 11 {'01' if on else '00'} 55")


def cmd_display(on=True):
    # 注意：该指令语义是反的 —— 00=显示开，01=显示关（已通过实测确认，非笔误）
    return parse_hex(f"AA 01 0A {'00' if on else '01'} 55")


MODE_COMMANDS = {
    "normal": ("标准风", "AA 01 05 00 55"),
    "nature": ("自然风", "AA 01 05 07 55"),
    "sleep": ("睡眠风", "AA 01 05 06 55"),
    "storm": ("暴风", "AA 01 05 03 55"),
}


def cmd_mode_gear(mode: str, gear: int) -> bytes:
    """风模式档位命令
    自然风: 一档=01 二档=02 三档=03
    睡眠风: 一档=21 二档=22
    """
    if mode == "nature":
        if not 1 <= gear <= 3:
            raise ValueError("自然风档位 1~3")
        return parse_hex(f"AA 01 08 0{gear} 55")
    elif mode == "sleep":
        if not 1 <= gear <= 2:
            raise ValueError("睡眠风档位 1~2")
        return parse_hex(f"AA 01 08 2{gear} 55")
    else:
        raise ValueError("该模式无档位")


def parse_bool(value, default=False):
    """宽松解析布尔值，避免 bool("false") == True 这种坑。"""
    if isinstance(value, bool):
        return value
    if isinstance(value, str):
        return value.strip().lower() in ("1", "true", "on", "yes")
    if isinstance(value, (int, float)):
        return bool(value)
    return default


def decode_status(data: bytes) -> dict:
    if len(data) < 15:
        return {"raw": data.hex(" ").upper(), "error": "帧长度不足"}

    # 协议校验公式，已通过 8 组真实状态帧验证（见 tools/monitor_airmate.py）
    checksum = (sum(data[1:13]) + 4) & 0xFF
    if checksum != data[13]:
        return {"raw": data.hex(" ").upper(), "error": "checksum 校验失败"}

    mode = "标准"
    is_storm = False
    if data[8] & 0x40:
        mode = "自然风"
    elif data[8] & 0x20:
        mode = "睡眠风"
    elif data[8] & 0x08:
        is_storm = True  # 暴风 = 标准风第13档

    speed = data[4]
    if mode == "自然风":
        if data[9] & 0x10:
            speed = 3
        elif data[9] & 0x08:
            speed = 2
        elif data[9] & 0x04:
            speed = 1
    elif mode == "睡眠风":
        if data[12] & 0x04:
            speed = 2
        elif data[12] & 0x02:
            speed = 1

    if is_storm:
        mode = "标准"
        speed = 13  # 超出 MAX_SPEED=12，前端需特殊处理该档位

    return {
        "power": data[3] == 1,
        "speed": speed,
        "mode": mode,
        "timer": data[6],
        "swing": bool(data[10] & 0x01),
        "voice": bool(data[5] & 0x02),
        "display": bool(data[5] & 0x08),
        "raw": data.hex(" ").upper(),
    }


# ============================================================
# 风扇控制器（线程安全的 BLE 封装）
# ============================================================

class FanController:
    def __init__(self):
        self._lock = threading.Lock()
        self._status = {}
        self._connected = False
        self._last_error = ""
        self._loop = None
        self._client = None
        self._thread = None
        self._write_lock = asyncio.Lock()
        self._last_address = None      # 上次成功连接的设备地址，加速重连
        self._prefer_response = None   # 该连接下 write_gatt_char 是否需要 response=True

    def start(self):
        self._thread = threading.Thread(target=self._run_loop, daemon=True)
        self._thread.start()

    def _run_loop(self):
        self._loop = asyncio.new_event_loop()
        asyncio.set_event_loop(self._loop)
        self._loop.run_until_complete(self._ble_main())

    async def _ble_main(self):
        """BLE 主循环：连接 + 订阅 + 自动重连"""
        while True:
            try:
                await self._connect_and_serve()
            except Exception as e:
                self._set_error(f"连接异常: {e}")
            self._client = None
            self._prefer_response = None
            self._set_connected(False)
            await asyncio.sleep(3)

    async def _connect_and_serve(self):
        device = await self._find_fan()
        if device is None:
            self._set_error("未找到 airmate-fan，请确认风扇已通电")
            self._set_connected(False)
            await asyncio.sleep(5)
            return

        disconnect_event = asyncio.Event()

        def _on_disconnect(_client):
            # bleak 在真正断连时回调，用它来及时感知掉线，
            # 而不是傻等一个永远没人写入的队列
            disconnect_event.set()

        async with BleakClient(device, disconnected_callback=_on_disconnect) as client:
            self._client = client
            self._prefer_response = None
            self._set_connected(True)
            self._set_error("")
            await client.start_notify(AE22_UUID, self._on_notify)
            await asyncio.sleep(1.0)
            await self._write(client, cmd_init())
            await asyncio.sleep(0.5)
            await self._write(client, cmd_query())

            # 等待断连（由 disconnect_callback 触发），替代原先轮询命令队列的方式
            # macOS(CoreBluetooth) 的 disconnect 回调偶尔不触发，加超时兜底：
            # 超时后主动探测连接是否仍然存活，若已失效则退出循环触发重连，
            # 避免回调丢失导致 BLE 线程永久挂起、无法重连。
            try:
                await asyncio.wait_for(disconnect_event.wait(), timeout=30.0)
            except asyncio.TimeoutError:
                if not client.is_connected:
                    print("[!] 30s 内无断连回调但连接已失效，主动退出重连")
                else:
                    print("[*] 30s 无 notify/断连，连接仍存活，继续监听")
                    await disconnect_event.wait()

    def _on_notify(self, _sender, data: bytearray):
        status = decode_status(bytes(data))
        with self._lock:
            self._status = status
        print(f"[风扇→] {bytes(data).hex(' ').upper()}")

    async def _find_fan(self):
        # 优先用上次成功的地址直连，比全量扫描快得多
        if self._last_address:
            try:
                device = await BleakScanner.find_device_by_address(
                    self._last_address, timeout=5.0
                )
                if device:
                    return device
            except Exception:
                pass
            self._last_address = None

        devices = await BleakScanner.discover(timeout=8.0)
        for d in devices:
            if d.name and d.name.lower() == TARGET_NAME.lower():
                self._last_address = d.address
                return d
        return None

    async def _write(self, client, frame):
        # 首次写入探测该连接支持哪种写模式，之后复用，避免每条指令都失败重试一次
        if self._prefer_response is None:
            try:
                await client.write_gatt_char(AE21_UUID, frame, response=True)
                self._prefer_response = True
                print(f"[→] {frame.hex(' ').upper()} (response=True)")
                return
            except Exception as e:
                print(f"[!] response=True 写入失败，改用 response=False: {e}")
                self._prefer_response = False
                # 注意：必须把当前这条 frame 也发出去，否则首条命令（如 init）会丢失
                await client.write_gatt_char(AE21_UUID, frame, response=False)
                print(f"[→] {frame.hex(' ').upper()} (response=False)")
                return

        await client.write_gatt_char(AE21_UUID, frame, response=self._prefer_response)
        print(f"[→] {frame.hex(' ').upper()} (response={self._prefer_response})")

    def _set_connected(self, val):
        with self._lock:
            self._connected = val

    def _set_error(self, msg):
        with self._lock:
            self._last_error = msg
        if msg:
            print(f"[!] {msg}")

    def send_command(self, frame: bytes):
        if self._loop is None or self._client is None:
            return False, "尚未连接"
        try:
            future = asyncio.run_coroutine_threadsafe(
                self._do_send(frame), self._loop
            )
            ok, msg = future.result(timeout=8.0)
            return ok, msg
        except Exception as e:
            return False, str(e)

    async def _do_send(self, frame):
        async with self._write_lock:
            try:
                if self._client is None or not self._client.is_connected:
                    return False, "设备未连接"
                await self._write(self._client, frame)
                return True, "ok"
            except Exception as e:
                # 若已确定写模式仍失败，重置为 None 以便下次重新探测，
                # 避免首次连接偶发失败后被永久降级到错误的 response=False 模式
                # （本设备需要 response=True，response=False 会被丢弃）。
                self._prefer_response = None
                return False, str(e)

    def get_state(self) -> dict:
        with self._lock:
            return {
                "connected": self._connected,
                "status": dict(self._status),
                "error": self._last_error,
            }


controller = FanController()


# ============================================================
# HTTP 处理（纯后端：静态文件 + 原版 /api/* 端点）
# ============================================================

class Handler(BaseHTTPRequestHandler):
    def log_message(self, *args):
        pass  # 静默日志

    def _send_json(self, data, code=200):
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def _send_file(self, path, content_type):
        try:
            with open(path, "rb") as f:
                body = f.read()
        except OSError:
            self.send_error(404, "Not Found")
            return
        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-cache")
        self.end_headers()
        self.wfile.write(body)

    def _read_body(self):
        """返回 {} 表示空 body；返回 None 表示 JSON 解析失败（调用方应视为 400）。"""
        length = int(self.headers.get("Content-Length", 0))
        if length == 0:
            return {}
        try:
            return json.loads(self.rfile.read(length).decode("utf-8"))
        except Exception:
            return None

    def _check_auth(self) -> bool:
        if not AUTH_TOKEN:
            return True
        header = self.headers.get("Authorization", "")
        return header == f"Bearer {AUTH_TOKEN}"

    def do_GET(self):
        route = self.path.split("?", 1)[0]
        if route in ("/", "/index.html"):
            self._send_file(os.path.join(STATIC_DIR, "index.html"),
                            "text/html; charset=utf-8")
        elif route == "/style.css":
            self._send_file(os.path.join(STATIC_DIR, "style.css"),
                            "text/css; charset=utf-8")
        elif route == "/app.js":
            self._send_file(os.path.join(STATIC_DIR, "app.js"),
                            "application/javascript; charset=utf-8")
        elif route == "/favicon.ico":
            self._send_file(os.path.join(STATIC_DIR, "favicon.ico"),
                            "image/x-icon")
        elif route == "/favicon.svg":
            self._send_file(os.path.join(STATIC_DIR, "favicon.svg"),
                            "image/svg+xml")
        elif route == "/api/state":
            if not self._check_auth():
                self._send_json({"error": "unauthorized"}, 401)
                return
            self._send_json(controller.get_state())
        else:
            self._send_json({"error": "not found"}, 404)

    def do_POST(self):
        path = self.path.split("?", 1)[0]

        if not path.startswith("/api/"):
            self._send_json({"error": "not found"}, 404)
            return

        if not self._check_auth():
            self._send_json({"error": "unauthorized"}, 401)
            return

        body = self._read_body()
        if body is None:
            self._send_json({"error": "invalid json body"}, 400)
            return

        if path == "/api/power":
            s = controller.get_state().get("status", {})
            if "power" not in s:
                # 当前状态未知（尚未收到过合法 notify），不能瞎猜开/关方向
                self._send_json({"ok": False, "msg": "当前电源状态未知，请稍后重试"}, 409)
                return
            frame = cmd_off() if s.get("power") else cmd_on()
            ok, msg = controller.send_command(frame)
            self._send_json({"ok": ok, "msg": msg})

        elif path == "/api/speed":
            try:
                frame = cmd_speed(int(body.get("value", 1)))
                ok, msg = controller.send_command(frame)
            except (ValueError, TypeError) as e:
                ok, msg = False, str(e)
            self._send_json({"ok": ok, "msg": msg})

        elif path == "/api/mode":
            mode = body.get("value")
            if mode in MODE_COMMANDS:
                _, frame_str = MODE_COMMANDS[mode]
                ok, msg = controller.send_command(parse_hex(frame_str))
            else:
                ok, msg = False, "未知模式"
            self._send_json({"ok": ok, "msg": msg})

        elif path == "/api/gear":
            mode = body.get("mode", "")
            try:
                frame = cmd_mode_gear(mode, int(body.get("value", 1)))
                ok, msg = controller.send_command(frame)
            except (ValueError, TypeError) as e:
                ok, msg = False, str(e)
            self._send_json({"ok": ok, "msg": msg})

        elif path == "/api/swing":
            frame = cmd_swing_lr(parse_bool(body.get("value")))
            ok, msg = controller.send_command(frame)
            self._send_json({"ok": ok, "msg": msg})

        elif path == "/api/voice":
            frame = cmd_voice(parse_bool(body.get("value")))
            ok, msg = controller.send_command(frame)
            self._send_json({"ok": ok, "msg": msg})

        elif path == "/api/display":
            frame = cmd_display(parse_bool(body.get("value")))
            ok, msg = controller.send_command(frame)
            self._send_json({"ok": ok, "msg": msg})

        elif path == "/api/timer":
            try:
                frame = cmd_timer(int(body.get("value", 0)))
                ok, msg = controller.send_command(frame)
            except (ValueError, TypeError) as e:
                ok, msg = False, str(e)
            self._send_json({"ok": ok, "msg": msg})

        else:
            self._send_json({"error": "not found"}, 404)


def get_local_ip():
    import socket
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"


def main():
    print("=" * 46)
    print("  AIRMATE FS35-SRD133 网页控制服务")
    print("=" * 46)

    local_ip = get_local_ip()
    print(f"\n  本机访问:  http://localhost:{PORT}")
    print(f"  局域网访问: http://{local_ip}:{PORT}")
    if AUTH_TOKEN:
        print("  已启用鉴权，请求需带 Authorization: Bearer <token>")
    else:
        print("  未设置 AIRMATE_TOKEN，/api/* 当前无鉴权（局域网自用请注意）")
    print("\n正在启动 BLE 后台线程...")

    controller.start()

    print(f"Web 服务启动中 (监听 {HOST}:{PORT}) ...")
    server = ThreadingHTTPServer((HOST, PORT), Handler)
    print("服务已就绪，Ctrl+C 退出\n")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n已退出")
        server.shutdown()


if __name__ == "__main__":
    main()