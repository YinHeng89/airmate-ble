#!/usr/bin/env python3
"""
AIRMATE FS35-SRD133 网页控制服务

运行：
    python web_server.py

启动后：
  - 本机浏览器访问: http://localhost:8080
  - 局域网设备访问: http://<本机局域网IP>:8080

架构：
  - BLE 连接在独立 asyncio 线程中运行
  - HTTP 服务器（标准库）提供网页 + REST API
  - 通过线程安全的 FanController 状态对象通信

协议：
  命令帧(写AE21) 5字节：AA [type] [opcode] [param] 55，需 response=True 写入
  状态帧(AE22) 15字节：AA FC 03 [数据] [checksum] 55

依赖：pip install bleak  (无需其他依赖，纯标准库实现 Web 服务)
"""

import asyncio
import json
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

from bleak import BleakClient, BleakScanner

TARGET_NAME = "airmate-fan"
AE21_UUID = "0000ae21-0000-1000-8000-00805f9b34fb"
AE22_UUID = "0000ae22-0000-1000-8000-00805f9b34fb"

MAX_SPEED = 12
MAX_TIMER = 15
HOST = "0.0.0.0"
PORT = 8080


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


def decode_status(data: bytes) -> dict:
    """解析 AE22 状态帧，返回结构化状态字典

    bit 映射（来自官方 attributeRules）：
      Byte[5] 功能位（position 1-based）：语音=0x02 负离子=0x04 屏显=0x08 氛围灯=0x10
      Byte[8] 风模式（position 0-based）：暴风=0x08 睡眠风=0x20 自然风=0x40
      Byte[9] 自然风档位：一档=0x04 二档=0x08 三档=0x10
      Byte[10] 摆头：左右摆头=0x01
      Byte[12] 睡眠风档位：一档=0x02 二档=0x04
    """
    if len(data) < 15:
        return {"raw": data.hex(" ").upper()}

    mode = "标准"
    is_storm = False
    if data[8] & 0x40:
        mode = "自然风"
    elif data[8] & 0x20:
        mode = "睡眠风"
    elif data[8] & 0x08:
        is_storm = True  # 暴风 = 标准风第13档

    # 自然风/睡眠风模式下，风速语义变为「档位」
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

    # 暴风统一映射为标准风第13档
    if is_storm:
        mode = "标准"
        speed = 13

    return {
        "power": data[3] == 1,
        "speed": speed,
        "mode": mode,
        "timer": data[6],
        "swing": bool(data[10] & 0x01),
        "voice": bool(data[5] & 0x02),    # Byte[5] bit1 = 语音
        "display": bool(data[5] & 0x08),  # Byte[5] bit3 = 屏显
        "raw": data.hex(" ").upper(),
    }


class FanController:
    """线程安全的风扇控制器，BLE 在独立线程运行"""

    def __init__(self):
        self._lock = threading.Lock()
        self._status = {}
        self._connected = False
        self._last_error = ""
        self._loop = None
        self._client = None
        self._thread = None
        self._write_lock = asyncio.Lock()  # 串行化 BLE 写入，避免并发冲突

    def start(self):
        """启动后台 BLE 线程"""
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
            # 断开后等待重连
            self._set_connected(False)
            await asyncio.sleep(3)

    async def _connect_and_serve(self):
        device = await self._find_fan()
        if device is None:
            self._set_error("未找到 airmate-fan，请确认风扇已通电")
            self._set_connected(False)
            await asyncio.sleep(5)
            return

        async with BleakClient(device) as client:
            self._client = client
            self._set_connected(True)
            await client.start_notify(AE22_UUID, self._on_notify)
            # 初始化 + 查询
            await asyncio.sleep(1.0)
            await self._write(client, cmd_init())
            await asyncio.sleep(0.5)
            await self._write(client, cmd_query())

            # 保持连接，等待命令（通过 asyncio.Event 触发）
            self._command_queue = asyncio.Queue()
            while client.is_connected:
                frame = await self._command_queue.get()
                await self._write(client, frame)

    def _on_notify(self, _sender, data: bytearray):
        status = decode_status(bytes(data))
        with self._lock:
            self._status = status
        print(f"[风扇→] {bytes(data).hex(' ').upper()}")

    async def _find_fan(self):
        devices = await BleakScanner.discover(timeout=8.0)
        for d in devices:
            if d.name and d.name.lower() == TARGET_NAME.lower():
                return d
        return None

    async def _write(self, client, frame):
        # 优先写响应模式（官方行为），失败才降级；降级也失败则抛出
        try:
            await client.write_gatt_char(AE21_UUID, frame, response=True)
        except Exception:
            await client.write_gatt_char(AE21_UUID, frame, response=False)
        print(f"[→] {frame.hex(' ').upper()}")

    # ---------- 线程安全的对外接口 ----------

    def _set_connected(self, val):
        with self._lock:
            self._connected = val

    def _set_error(self, msg):
        with self._lock:
            self._last_error = msg
        print(f"[!] {msg}")

    def send_command(self, frame: bytes):
        """从任意线程发送命令，等待 BLE 写入完成后返回结果"""
        if self._loop is None or self._client is None:
            return False, "尚未连接"
        try:
            future = asyncio.run_coroutine_threadsafe(
                self._do_send(frame), self._loop
            )
            # 等待写入结果（最多 8 秒，点太快时命令会排队）
            ok, msg = future.result(timeout=8.0)
            return ok, msg
        except Exception as e:
            return False, str(e)

    async def _do_send(self, frame):
        """在事件循环内真正执行写入（用锁串行化，避免并发写 BLE 冲突）"""
        async with self._write_lock:
            try:
                if self._client is None or not self._client.is_connected:
                    return False, "设备未连接"
                await self._write(self._client, frame)
                return True, "ok"
            except Exception as e:
                return False, str(e)

    def get_state(self) -> dict:
        with self._lock:
            return {
                "connected": self._connected,
                "status": dict(self._status),
                "error": self._last_error,
            }


# 全局控制器单例
controller = FanController()


# ============================================================
# 前端页面（内嵌 HTML/CSS/JS）
# ============================================================
HTML_PAGE = r"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AIRMATE 风扇控制</title>
<style>
  :root {
    --bg: #0f1115;
    --card: #1a1d24;
    --text: #e8eaf0;
    --sub: #8b91a0;
    --accent: #4da3ff;
    --danger: #ff5c5c;
    --green: #34d399;
    --border: #2a2f3a;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: -apple-system, "PingFang SC", "Helvetica Neue", sans-serif;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    padding: 24px 16px;
  }
  .container { width: 100%; max-width: 520px; }
  .header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 20px;
  }
  .title { font-size: 20px; font-weight: 700; }
  .status-dot {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 13px; color: var(--sub);
  }
  .dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: #555; transition: background .3s;
  }
  .dot.on { background: var(--green); box-shadow: 0 0 8px var(--green); }
  .dot.off { background: #666; }

  /* 风扇可视化 */
  .power-area { text-align: center; margin: 12px 0 28px; position: relative; }
  .fan-wrap {
    position: relative; width: 220px; height: 220px; margin: 0 auto;
    cursor: pointer;
  }
  /* 外罩圆环 */
  .fan-ring {
    position: absolute; inset: 0; border-radius: 50%;
    border: 4px solid #333a47;
    box-shadow: inset 0 0 30px rgba(0,0,0,.5), 0 6px 30px rgba(0,0,0,.5);
    transition: border-color .4s, box-shadow .4s;
  }
  .fan-wrap.on .fan-ring {
    border-color: var(--accent);
    box-shadow: inset 0 0 30px rgba(0,0,0,.5), 0 0 40px rgba(77,163,255,.35);
  }
  /* 扇叶组（旋转） */
  .fan-blades {
    position: absolute; inset: 20px; border-radius: 50%;
    transition: opacity .4s;
  }
  /* 旋转动画由 JS Web Animations API 控制（updateFan），此处不再用 CSS animation */
  .blade {
    position: absolute; left: 50%; top: 50%;
    width: 60%; height: 50%;
    transform-origin: 0% 50%;
    margin-top: -25%;
  }
  .blade svg { width: 100%; height: 100%; display: block; }
  .fan-wrap.on .blade svg .blade-fill { fill: #4da3ff; }
  .fan-wrap .blade svg .blade-fill { fill: #3a4150; transition: fill .4s; }

  /* 样式 A：对称水滴形（端正扇叶） */
  .fan-wrap.style-a .blade-symmetric { display: block; }
  .fan-wrap.style-a .blade-slanted { display: none; }

  /* 样式 B：斜扇叶形（旧版） */
  .fan-wrap.style-b .blade-symmetric { display: none; }
  .fan-wrap.style-b .blade-slanted { display: block; }
  .fan-wrap.style-b .blade-slanted {
    width: 42%; height: 42%;
    transform-origin: 0 0;
    margin-top: 0;
  }
  /* 中心 hub */
  .fan-hub {
    position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
    width: 44px; height: 44px; border-radius: 50%;
    background: #2a2f3a; border: 3px solid #3a4150;
    display: flex; align-items: center; justify-content: center;
    transition: all .4s;
  }
  .fan-wrap.on .fan-hub { background: var(--accent); border-color: #7ab8ff; }
  .fan-hub .hub-icon {
    width: 16px; height: 16px; border-radius: 50%;
    background: #555; transition: background .4s;
  }
  .fan-wrap.on .fan-hub .hub-icon { background: #fff; }
  /* 状态文字 */
  .fan-status {
    position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%);
    font-size: 14px; font-weight: 600; color: var(--sub);
    padding: 4px 16px; border-radius: 20px; background: var(--card);
    border: 1px solid var(--border); white-space: nowrap;
    transition: color .4s;
  }
  .fan-wrap.on .fan-status { color: var(--accent); }
  /* 扇叶样式切换 */
  .fan-style-toggle {
    display: flex; justify-content: center; gap: 8px; margin-top: 16px;
  }
  .style-btn {
    padding: 6px 18px; border-radius: 20px; border: 1px solid var(--border);
    background: transparent; color: var(--sub); cursor: pointer;
    font-size: 13px; transition: all .2s;
  }
  .style-btn.active {
    background: var(--accent); border-color: var(--accent);
    color: #fff; font-weight: 600;
  }
  .power-hint { margin-top: 14px; font-size: 13px; color: var(--sub); }

  /* 卡片 */
  .card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 16px; padding: 18px; margin-bottom: 16px;
  }
  .card-title { font-size: 14px; color: var(--sub); margin-bottom: 14px; }

  /* 分段档位滑块：横线 + 刻度点 + 可拖动原点 */
  .gear-slider {
    position: relative; height: 40px; margin: 6px 0 0;
    padding: 0 18px;  /* 左右留出 thumb 半径，避免原点贴边露出去 */
    cursor: pointer; user-select: none; touch-action: none;
  }
  .gear-inner {
    position: relative; height: 100%;
  }
  .gear-track {
    position: absolute; top: 50%; left: 0; right: 0;
    height: 3px; border-radius: 2px;
    background: #333a47; transform: translateY(-50%);
  }
  .gear-dots {
    position: absolute; top: 50%; left: 0; right: 0;
    transform: translateY(-50%);
  }
  .gear-dot {
    position: absolute; width: 10px; height: 10px; border-radius: 50%;
    background: #4a5160; border: 2px solid var(--card);
    transform: translate(-50%, -50%); transition: background .2s;
  }
  .gear-dot.active { background: var(--accent); }
  .gear-thumb {
    position: absolute; top: 50%; left: 0;
    width: 36px; height: 36px; border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 2px 10px rgba(77,163,255,.5);
    transform: translate(-50%, -50%);
    transition: left .15s ease;
    border: 3px solid #fff;
    display: flex; align-items: center; justify-content: center;
  }
  .gear-thumb .gear-val {
    font-size: 16px; font-weight: 700; color: #fff;
    line-height: 1;
  }

  /* 模式按钮组 */
  .mode-grid { display: flex; gap: 10px; }
  .mode-btn {
    flex: 1; padding: 12px 0; border-radius: 12px; border: 1px solid var(--border);
    background: transparent; color: var(--text); cursor: pointer;
    font-size: 14px; transition: all .2s;
  }
  .mode-btn.active {
    background: var(--accent); border-color: var(--accent);
    color: #fff; font-weight: 600;
  }

  /* 开关行 */
  .switch-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 0;
  }
  .switch-row + .switch-row { border-top: 1px solid var(--border); }
  .switch-label { font-size: 15px; }
  .switch {
    position: relative; width: 48px; height: 26px; cursor: pointer;
  }
  .switch input { display: none; }
  .slider {
    position: absolute; inset: 0; border-radius: 13px;
    background: #333a47; transition: .25s;
  }
  .slider::before {
    content: ""; position: absolute; width: 20px; height: 20px;
    left: 3px; top: 3px; border-radius: 50%; background: #fff;
    transition: .25s;
  }
  .switch input:checked + .slider { background: var(--accent); }
  .switch input:checked + .slider::before { transform: translateX(22px); }

  /* 定时 */
  .timer-row { display: flex; align-items: center; gap: 12px; }
  .timer-select {
    flex: 1; padding: 10px; border-radius: 10px; border: 1px solid var(--border);
    background: #14171d; color: var(--text); font-size: 15px; outline: none;
  }
  .timer-btn {
    padding: 10px 20px; border-radius: 10px; border: none;
    background: var(--accent); color: #fff; cursor: pointer; font-size: 14px;
  }

  .raw { font-size: 11px; color: #555; word-break: break-all; margin-top: 8px; text-align: center; }
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <div class="title">AIRMATE 风扇</div>
    <div class="status-dot">
      <span class="dot" id="connDot"></span>
      <span id="connText">连接中...</span>
    </div>
  </div>

  <div class="power-area">
    <div class="fan-wrap style-a" id="fanWrap">
      <div class="fan-ring"></div>
      <div class="fan-blades" id="fanBlades">
        <!-- 样式A：对称水滴形（端正） -->
        <div class="blade blade-symmetric" style="transform: rotate(0deg)"><svg viewBox="0 0 100 100"><path class="blade-fill" d="M0 50 C 25 30, 55 35, 80 50 C 55 65, 25 70, 0 50 Z"/></svg></div>
        <div class="blade blade-symmetric" style="transform: rotate(72deg)"><svg viewBox="0 0 100 100"><path class="blade-fill" d="M0 50 C 25 30, 55 35, 80 50 C 55 65, 25 70, 0 50 Z"/></svg></div>
        <div class="blade blade-symmetric" style="transform: rotate(144deg)"><svg viewBox="0 0 100 100"><path class="blade-fill" d="M0 50 C 25 30, 55 35, 80 50 C 55 65, 25 70, 0 50 Z"/></svg></div>
        <div class="blade blade-symmetric" style="transform: rotate(216deg)"><svg viewBox="0 0 100 100"><path class="blade-fill" d="M0 50 C 25 30, 55 35, 80 50 C 55 65, 25 70, 0 50 Z"/></svg></div>
        <div class="blade blade-symmetric" style="transform: rotate(288deg)"><svg viewBox="0 0 100 100"><path class="blade-fill" d="M0 50 C 25 30, 55 35, 80 50 C 55 65, 25 70, 0 50 Z"/></svg></div>
        <!-- 样式B：斜扇叶形（旧版） -->
        <div class="blade blade-slanted" style="transform: rotate(0deg)"><svg viewBox="0 0 100 100"><path class="blade-fill" d="M50 50 C 50 20, 80 18, 90 30 C 100 42, 78 52, 50 50 Z"/></svg></div>
        <div class="blade blade-slanted" style="transform: rotate(72deg)"><svg viewBox="0 0 100 100"><path class="blade-fill" d="M50 50 C 50 20, 80 18, 90 30 C 100 42, 78 52, 50 50 Z"/></svg></div>
        <div class="blade blade-slanted" style="transform: rotate(144deg)"><svg viewBox="0 0 100 100"><path class="blade-fill" d="M50 50 C 50 20, 80 18, 90 30 C 100 42, 78 52, 50 50 Z"/></svg></div>
        <div class="blade blade-slanted" style="transform: rotate(216deg)"><svg viewBox="0 0 100 100"><path class="blade-fill" d="M50 50 C 50 20, 80 18, 90 30 C 100 42, 78 52, 50 50 Z"/></svg></div>
        <div class="blade blade-slanted" style="transform: rotate(288deg)"><svg viewBox="0 0 100 100"><path class="blade-fill" d="M50 50 C 50 20, 80 18, 90 30 C 100 42, 78 52, 50 50 Z"/></svg></div>
      </div>
      <div class="fan-hub"><div class="hub-icon"></div></div>
      <div class="fan-status" id="fanStatus">已关机</div>
    </div>
    <div class="fan-style-toggle">
      <button class="style-btn active" data-style="a">端正</button>
      <button class="style-btn" data-style="b">斜叶</button>
    </div>
    <div class="power-hint" id="powerHint"></div>
  </div>

  <div class="card">
    <div class="card-title">风速</div>
    <div class="gear-slider" id="gearSlider">
      <div class="gear-inner">
        <div class="gear-track"></div>
        <div class="gear-dots" id="gearDots"></div>
        <div class="gear-thumb" id="gearThumb"><span class="gear-val" id="speedVal">1</span></div>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-title">风模式</div>
    <div class="mode-grid" id="modeGrid">
      <button class="mode-btn" data-mode="normal">标准风</button>
      <button class="mode-btn" data-mode="nature">自然风</button>
      <button class="mode-btn" data-mode="sleep">睡眠风</button>
      <button class="mode-btn" data-mode="storm">暴风</button>
    </div>
  </div>

  <div class="card">
    <div class="card-title">开关</div>
    <div class="switch-row">
      <span class="switch-label">左右摆头</span>
      <label class="switch"><input type="checkbox" id="swing"><span class="slider"></span></label>
    </div>
    <div class="switch-row">
      <span class="switch-label">语音</span>
      <label class="switch"><input type="checkbox" id="voice"><span class="slider"></span></label>
    </div>
    <div class="switch-row">
      <span class="switch-label">屏显</span>
      <label class="switch"><input type="checkbox" id="display"><span class="slider"></span></label>
    </div>
  </div>

  <div class="card">
    <div class="card-title">定时</div>
    <div class="timer-row">
      <select class="timer-select" id="timerSelect"></select>
      <button class="timer-btn" id="timerBtn">设置</button>
    </div>
  </div>

  <div class="raw" id="rawText"></div>
</div>

<script>
const $ = id => document.getElementById(id);

// 定时选项 0~15
const timerSelect = $('timerSelect');
for (let i = 0; i <= 15; i++) {
  const opt = document.createElement('option');
  opt.value = i;
  opt.textContent = i === 0 ? '取消定时' : i + ' 小时';
  timerSelect.appendChild(opt);
}

async function api(cmd, data = {}) {
  const res = await fetch('/api/' + cmd, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

// ===== 本地 UI 状态（乐观更新：点击后立即生效，失败再回滚） =====
let uiState = {
  power: false, speed: 0, mode: '', swing: false,
  voice: false, display: false, timer: 0, raw: '',
};
let currentStyle = 'a';
let pendingOps = 0;       // 进行中的异步指令数
let coolDownUntil = 0;    // 冷却截止时间戳：指令完成后短时间内不接收服务端覆盖

// 轮询状态
async function poll() {
  try {
    const res = await fetch('/api/state');
    const state = await res.json();
    render(state);
  } catch (e) {}
  setTimeout(poll, 1500);
}

function render(state) {
  const connected = state.connected;
  $('connDot').className = 'dot ' + (connected ? 'on' : 'off');
  $('connText').textContent = connected ? '已连接' : '未连接';

  // raw 原始帧始终更新（服务端回传，不受乐观值影响）
  const s = state.status || {};
  uiState.raw = s.raw || '';

  // 冷却期内（指令刚完成，等待设备回传新状态）不覆盖本地，避免"闪一下切回"
  const now = Date.now();
  if (pendingOps === 0 && now >= coolDownUntil) {
    uiState.power = !!s.power;
    uiState.speed = s.speed || 0;
    uiState.mode = s.mode || '';
    uiState.swing = !!s.swing;
    uiState.voice = !!s.voice;
    uiState.display = !!s.display;
    uiState.timer = s.timer || 0;
  }
  // powerHint 仅用于错误提示，连接状态由顶部 connText 承担
  if (state.error) {
    $('powerHint').textContent = state.error;
  }

  // 用本地 uiState 重绘 UI
  paintUI();
}

function modeKey(m) {
  return { '自然风': 'nature', '睡眠风': 'sleep', '暴风': 'storm' }[m] || '';
}

// 根据 uiState 重绘所有控件（风扇 + 滑条 + 按钮 + 开关）
function paintUI() {
  updateSpeedRange();
  updateFan(uiState.power, uiState.speed, uiState.mode);

  if (uiState.speed > 0) {
    $('speedVal').textContent = uiState.speed;
    positionThumb(uiState.speed);
  }
  document.querySelectorAll('.mode-btn').forEach(b => {
    let active = false;
    const m = b.dataset.mode;
    if (m === 'storm') {
      // 暴风按钮：标准风模式下第13档时高亮
      active = (uiState.mode === '标准' && uiState.speed === STORM_GEAR);
    } else if (m === 'normal') {
      // 标准风按钮：标准风模式下且非暴风时高亮
      active = (uiState.mode === '标准' && uiState.speed !== STORM_GEAR);
    } else {
      active = (m === modeKey(uiState.mode));
    }
    b.className = 'mode-btn' + (active ? ' active' : '');
  });
  $('swing').checked = uiState.swing;
  $('voice').checked = uiState.voice;
  $('display').checked = uiState.display;
  $('rawText').textContent = uiState.raw || '';
}

// 风扇动画：根据开关和风速控制旋转（用 Web Animations API 平滑调速，不重置角度）
let fanAnimation = null;   // 当前旋转动画实例
let fanAngle = 0;          // 当前累计旋转角度
let fanSpeed = 0;          // 当前转速（用于判断是否需要调速）

function updateFan(power, speed, mode) {
  const wrap = $('fanWrap');
  const blades = $('fanBlades');
  const status = $('fanStatus');

  // 保留 style-a/style-b class，只切换 on/off
  wrap.classList.toggle('on', power);

  if (power && speed > 0) {
    const duration = Math.max(0.4, 3.2 - speed * 0.22);
    if (fanSpeed !== speed || !fanAnimation) {
      // 记录当前角度（动画已转的角度）
      if (fanAnimation) {
        const progress = fanAnimation.effect.getComputedTiming().progress || 0;
        fanAngle = (fanAngle + progress * 360) % 360;
        fanAnimation.cancel();
      }
      fanSpeed = speed;
      // 从当前角度继续旋转
      fanAnimation = blades.animate(
        [
          { transform: 'rotate(' + fanAngle + 'deg)' },
          { transform: 'rotate(' + (fanAngle + 360) + 'deg)' }
        ],
        { duration: duration * 1000, iterations: Infinity, easing: 'linear' }
      );
    }
    // 暴风 = 标准风第13档
    if (mode === '标准' && speed === STORM_GEAR) {
      status.textContent = '暴风';
    } else if (mode && mode !== '标准') {
      status.textContent = mode + ' · ' + speed + ' 档';
    } else {
      status.textContent = '标准风 · ' + speed + ' 档';
    }
  } else {
    // 关机/待机：记录当前角度后停止
    if (fanAnimation) {
      const progress = fanAnimation.effect.getComputedTiming().progress || 0;
      fanAngle = (fanAngle + progress * 360) % 360;
      fanAnimation.cancel();
      fanAnimation = null;
    }
    fanSpeed = 0;
    blades.style.transform = 'rotate(' + fanAngle + 'deg)';
    status.textContent = power ? '待机' : '已关机';
  }
}

// 乐观更新：立即改 UI → 发指令 → 失败回滚
async function optimistic(cmd, data, applyFn) {
  const backup = { ...uiState };   // 备份旧状态
  applyFn();                       // 立即更新 uiState 并重绘
  pendingOps++;
  try {
    const r = await api(cmd, data);
    if (!r.ok) {
      // 失败：回滚并提示
      uiState = backup;
      paintUI();
      showError(r.msg || '指令失败');
    }
  } catch (e) {
    uiState = backup;
    paintUI();
    showError('网络错误，请重试');
  } finally {
    pendingOps--;
    // 指令完成后进入冷却期，给设备时间回传新状态，避免轮询用旧状态覆盖
    coolDownUntil = Date.now() + 1800;
  }
}

// 错误提示（短暂显示，3 秒后隐藏）
let errorTimer = null;
function showError(msg) {
  $('powerHint').textContent = '⚠ ' + msg;
  $('powerHint').style.color = 'var(--danger)';
  if (errorTimer) clearTimeout(errorTimer);
  errorTimer = setTimeout(() => {
    $('powerHint').style.color = '';
    $('powerHint').textContent = '';
  }, 3000);
}

// ===== 事件绑定（全部乐观更新） =====
$('fanWrap').onclick = () => optimistic('power', {}, () => {
  uiState.power = !uiState.power;
  if (!uiState.power) uiState.speed = 0;
  paintUI();
});

// 模式 → 档位范围
// 标准风：13档 = 1~12 普通风速 + 第13档暴风
// 自然风：3档，睡眠风：2档
const MODE_GEAR_RANGE = {
  '自然风': { min: 1, max: 3, key: 'nature' },
  '睡眠风': { min: 1, max: 2, key: 'sleep' },
  '标准':   { min: 1, max: 13, key: '' },
};
const STORM_GEAR = 13;  // 标准风模式下第13档 = 暴风

// ===== 分段档位滑块 =====
let gearCount = 12;  // 当前档位数

function getGearRange() {
  return MODE_GEAR_RANGE[uiState.mode] || MODE_GEAR_RANGE['标准'];
}

function initGearDots() {
  const dotsEl = $('gearDots');
  dotsEl.innerHTML = '';
  const r = getGearRange();
  gearCount = r.max - r.min + 1;
  for (let i = 0; i < gearCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'gear-dot';
    dot.style.left = (i / (gearCount - 1) * 100) + '%';
    dotsEl.appendChild(dot);
  }
  positionThumb(uiState.speed);
}

// 更新原点位置 + 高亮刻度
function positionThumb(gear) {
  const r = getGearRange();
  const idx = Math.max(0, Math.min(gearCount - 1, gear - r.min));
  const pct = idx / (gearCount - 1) * 100;
  $('gearThumb').style.left = pct + '%';
  document.querySelectorAll('.gear-dot').forEach((d, i) => {
    d.className = 'gear-dot' + (i <= idx ? ' active' : '');
  });
}

function updateSpeedRange() {
  initGearDots();
}

// 从坐标计算最近的档位（用 .gear-inner 内容区作为基准）
function gearFromClientX(clientX) {
  const inner = document.querySelector('.gear-inner');
  const rect = inner.getBoundingClientRect();
  let ratio = (clientX - rect.left) / rect.width;
  ratio = Math.max(0, Math.min(1, ratio));
  const r = getGearRange();

  // 边界吸附：接近左右两端时，直接落到首档/末档，避免分辨率误差导致点不到
  const threshold = 0.06;  // 两端 6% 区域吸附
  if (ratio >= 1 - threshold) {
    return r.max;
  }
  if (ratio <= threshold) {
    return r.min;
  }

  const idx = Math.round(ratio * (gearCount - 1));
  return r.min + idx;
}

// 档位变化统一处理：更新 UI + 防抖发指令
let speedDebounceTimer = null;
function applyGear(gear, immediate = false) {
  uiState.speed = gear;
  $('speedVal').textContent = gear;
  positionThumb(gear);
  updateFan(uiState.power, gear, uiState.mode);

  const send = () => {
    const r = getGearRange();
    if (r.key === 'nature' || r.key === 'sleep') {
      // 自然风/睡眠风：发档位命令
      optimistic('gear', { mode: r.key, value: gear }, () => { paintUI(); });
    } else if (gear === STORM_GEAR) {
      // 标准风第13档 = 暴风
      optimistic('mode', { value: 'storm' }, () => { paintUI(); });
    } else {
      // 标准风 1~12 档：发普通风速命令
      optimistic('speed', { value: gear }, () => { paintUI(); });
    }
  };

  if (immediate) { send(); return; }
  if (speedDebounceTimer) clearTimeout(speedDebounceTimer);
  speedDebounceTimer = setTimeout(send, 300);
}

// 拖拽交互：pointerdown 记录拖拽，pointermove 实时跟随，pointerup 结束
let dragging = false;
let dragGear = 0;

$('gearSlider').addEventListener('pointerdown', e => {
  dragging = true;
  dragGear = gearFromClientX(e.clientX);
  applyGear(dragGear);
  // 阻止默认行为，避免移动端滚动/文本选择干扰
  e.preventDefault();
});
$('gearSlider').addEventListener('pointermove', e => {
  if (!dragging) return;
  dragGear = gearFromClientX(e.clientX);
  applyGear(dragGear);
});
$('gearSlider').addEventListener('pointerup', e => {
  if (!dragging) return;
  dragging = false;
  // 松手用拖拽过程中的最终档位发指令（不重新计算，避免 transition/坐标偏差）
  if (speedDebounceTimer) clearTimeout(speedDebounceTimer);
  applyGear(dragGear, true);
});
$('gearSlider').addEventListener('pointercancel', () => { dragging = false; });

document.querySelectorAll('.mode-btn').forEach(b => {
  b.onclick = () => {
    const modeKeyName = b.dataset.mode;
    if (modeKeyName === 'storm') {
      // 暴风 = 标准风模式下的第13档
      optimistic('mode', { value: 'storm' }, () => {
        uiState.mode = '标准';
        uiState.speed = STORM_GEAR;
        updateSpeedRange();
        paintUI();
      });
    } else if (modeKeyName === 'normal') {
      // 标准风：保留当前档位数值（如自然风2档 → 标准风2档），并发送对应风速命令
      const targetSpeed = (uiState.speed && uiState.speed <= 12) ? uiState.speed : 1;
      optimistic('mode', { value: 'normal' }, () => {
        uiState.mode = '标准';
        uiState.speed = targetSpeed;
        updateSpeedRange();
        paintUI();
      });
      // 发送标准风对应的风速命令（普通风速命令）
      setTimeout(() => {
        optimistic('speed', { value: targetSpeed }, () => { paintUI(); });
      }, 150);
    } else {
      const modeName = { nature: '自然风', sleep: '睡眠风' }[modeKeyName] || '';
      optimistic('mode', { value: modeKeyName }, () => {
        uiState.mode = modeName;
        uiState.speed = 1;
        updateSpeedRange();
        paintUI();
      });
    }
  };
});

$('swing').onchange = e => {
  const v = e.target.checked;
  optimistic('swing', { value: v }, () => {
    uiState.swing = v;
    paintUI();
  });
};
$('voice').onchange = e => {
  const v = e.target.checked;
  optimistic('voice', { value: v }, () => {
    uiState.voice = v;
    paintUI();
  });
};
$('display').onchange = e => {
  const v = e.target.checked;
  optimistic('display', { value: v }, () => {
    uiState.display = v;
    paintUI();
  });
};
$('timerBtn').onclick = () => {
  const v = +$('timerSelect').value;
  optimistic('timer', { value: v }, () => {
    uiState.timer = v;
    paintUI();
  });
};

// 扇叶样式切换（localStorage 记住选择）
const STYLE_KEY = 'fan_blade_style';
function applyFanStyle(style) {
  currentStyle = style;
  $('fanWrap').classList.remove('style-a', 'style-b');
  $('fanWrap').classList.add('style-' + style);
  document.querySelectorAll('.style-btn').forEach(b => {
    b.className = 'style-btn' + (b.dataset.style === style ? ' active' : '');
  });
  try { localStorage.setItem(STYLE_KEY, style); } catch (e) {}
}
document.querySelectorAll('.style-btn').forEach(b => {
  b.onclick = () => applyFanStyle(b.dataset.style);
});

// 初始化：读取记住的扇叶样式 + 生成档位刻度点
(function() {
  let saved = 'a';
  try { saved = localStorage.getItem(STYLE_KEY) || 'a'; } catch (e) {}
  applyFanStyle(saved);
})();
initGearDots();

poll();
</script>
</body>
</html>
"""


# ============================================================
# HTTP 请求处理器
# ============================================================
class Handler(BaseHTTPRequestHandler):
    def log_message(self, *args):
        pass  # 静默日志

    def _send_json(self, data, code=200):
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _send_html(self):
        body = HTML_PAGE.encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _read_body(self):
        length = int(self.headers.get("Content-Length", 0))
        if length == 0:
            return {}
        try:
            return json.loads(self.rfile.read(length).decode("utf-8"))
        except Exception:
            return {}

    def do_GET(self):
        if self.path in ("/", "/index.html"):
            self._send_html()
        elif self.path == "/api/state":
            self._send_json(controller.get_state())
        else:
            self._send_json({"error": "not found"}, 404)

    def do_POST(self):
        path = self.path
        body = self._read_body()

        if path == "/api/power":
            s = controller.get_state().get("status", {})
            frame = cmd_off() if s.get("power") else cmd_on()
            ok, msg = controller.send_command(frame)
            self._send_json({"ok": ok, "msg": msg})

        elif path == "/api/speed":
            try:
                frame = cmd_speed(int(body.get("value", 1)))
                ok, msg = controller.send_command(frame)
            except ValueError as e:
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
            # 风模式档位（自然风/睡眠风）
            mode = body.get("mode", "")
            try:
                frame = cmd_mode_gear(mode, int(body.get("value", 1)))
                ok, msg = controller.send_command(frame)
            except (ValueError, TypeError) as e:
                ok, msg = False, str(e)
            self._send_json({"ok": ok, "msg": msg})

        elif path == "/api/swing":
            frame = cmd_swing_lr(bool(body.get("value")))
            ok, msg = controller.send_command(frame)
            self._send_json({"ok": ok, "msg": msg})

        elif path == "/api/voice":
            frame = cmd_voice(bool(body.get("value")))
            ok, msg = controller.send_command(frame)
            self._send_json({"ok": ok, "msg": msg})

        elif path == "/api/display":
            frame = cmd_display(bool(body.get("value")))
            ok, msg = controller.send_command(frame)
            self._send_json({"ok": ok, "msg": msg})

        elif path == "/api/timer":
            try:
                frame = cmd_timer(int(body.get("value", 0)))
                ok, msg = controller.send_command(frame)
            except ValueError as e:
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
