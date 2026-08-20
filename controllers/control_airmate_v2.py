#!/usr/bin/env python3
"""
AIRMATE FS35-SRD133 BLE 控制器（交互版 · 型号精简版）

型号：FS35150SR-DC-1（初始化帧 Byte[3]=0x2A 确认）
      市场型号 FS35-SRD133

运行：
    python control_airmate_v2.py

程序自动扫描连接 airmate-fan，数字菜单控制。

功能（按用户实机确认，仅保留真实支持的功能）：
  - 开关机
  - 风速 12 档 (01~0C)
  - 定时 0~15 小时
  - 风模式：自然风、睡眠风、暴风
  - 左右摆头 开/关
  - 语音、屏显
  （无：上下摆头、摆头角度、负离子、氛围灯、预约、加湿、童锁）

协议：
  命令帧(写AE21) 5字节：AA [type] [opcode] [param] 55，需 response=True 写入
  状态帧(AE22) 15字节：AA FC 03 [数据] [checksum] 55
  checksum = (sum(frame[1:13]) + 4) & 0xFF

依赖：pip install bleak
"""

import asyncio
from bleak import BleakClient, BleakScanner

TARGET_NAME = "airmate-fan"
AE21_UUID = "0000ae21-0000-1000-8000-00805f9b34fb"
AE22_UUID = "0000ae22-0000-1000-8000-00805f9b34fb"

MAX_SPEED = 12   # 风速最大 12 档（Byte[4]=0x0C）
MAX_TIMER = 15   # 定时/预约最大 15 小时（Byte[6]/[7]=0x0F）


def parse_hex(s: str) -> bytes:
    return bytes(int(x, 16) for x in s.split())


# ============================================================
# 命令帧（FS35150SR-DC-1 官方精确值）
# ============================================================
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
    """语音播报"""
    return parse_hex(f"AA 01 11 {'01' if on else '00'} 55")


def cmd_display(on=True):
    """屏显（注意：open=00, close=01，官方反着来的）"""
    return parse_hex(f"AA 01 0A {'00' if on else '01'} 55")


# 风模式（FS35150SR-DC-1 仅支持这三种）
MODE_COMMANDS = {
    "标准风": "AA 01 05 00 55",
    "自然风": "AA 01 05 07 55",
    "睡眠风": "AA 01 05 06 55",
    "暴风":   "AA 01 05 03 55",
}


def cmd_mode_gear(mode: str, gear: int) -> bytes:
    """风模式档位命令（自然风/睡眠风才有档位）
    自然风: 一档=01 二档=02 三档=03
    睡眠风: 一档=21 二档=22
    """
    if mode == "自然风":
        if not 1 <= gear <= 3:
            raise ValueError("自然风档位 1~3")
        return parse_hex(f"AA 01 08 0{gear} 55")
    elif mode == "睡眠风":
        if not 1 <= gear <= 2:
            raise ValueError("睡眠风档位 1~2")
        return parse_hex(f"AA 01 08 2{gear} 55")
    else:
        raise ValueError("该模式无档位")


def decode_ae22(data: bytes) -> str:
    """解析 AE22 状态帧（15 字节 AA FC 03 ...）

    bit 映射（官方 attributeRules）：
      Byte[5] 功能位(1-based)：语音=0x02 负离子=0x04 屏显=0x08 氛围灯=0x10
      Byte[8] 风模式(0-based)：暴风=0x08 睡眠风=0x20 自然风=0x40
      Byte[9] 自然风档位：一档=0x04 二档=0x08 三档=0x10
      Byte[12] 睡眠风档位：一档=0x02 二档=0x04
    """
    if len(data) < 15:
        return f"(长度 {len(data)} 异常帧)"
    power = "开" if data[3] == 1 else "关"
    timer = data[6]
    # 风模式 Byte[8] 位
    mode = "标准"
    if data[8] & 0x40:
        mode = "自然风"
    elif data[8] & 0x20:
        mode = "睡眠风"
    elif data[8] & 0x08:
        mode = "暴风"
    # 风速：自然风/睡眠风模式下读各自档位字节，普通模式读 Byte[4]
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
    # 摆头 Byte[10] bit0
    swing = "开" if data[10] & 0x01 else "关"
    # Byte[5] 功能位（1-based）：语音=0x02 屏显=0x08
    voice = "开" if data[5] & 0x02 else "关"
    display = "开" if data[5] & 0x08 else "关"
    return (f"电源={power} 风速={speed} 模式={mode} "
            f"定时={timer}h 摆头={swing} 语音={voice} 屏显={display}")


def notify_handler(_sender, data: bytearray):
    raw = bytes(data)
    print(f"\n[风扇→] {raw.hex(' ').upper()}")
    print(f"        {decode_ae22(raw)}")


def show_menu():
    print("\n" + "=" * 46)
    print("  AIRMATE FS35-SRD133 控制")
    print("=" * 46)
    print("  1. 开机           2. 关机")
    print("  3. 设置风速       4. 风模式")
    print("  5. 左右摆头       6. 语音")
    print("  7. 屏显           8. 定时")
    print("  9. 查询状态")
    print("  0. 退出")
    print("-" * 46)


async def find_fan():
    print("正在扫描 airmate-fan ...")
    devices = await BleakScanner.discover(timeout=8.0)
    for d in devices:
        if d.name and d.name.lower() == TARGET_NAME.lower():
            return d
    return None


async def input_async(prompt: str) -> str:
    loop = asyncio.get_running_loop()
    return (await loop.run_in_executor(None, input, prompt)).strip()


async def write_cmd(client, frame: bytes, label: str = ""):
    """统一写入命令：response=True（写响应模式，官方行为）"""
    try:
        await client.write_gatt_char(AE21_UUID, frame, response=True)
    except Exception:
        await client.write_gatt_char(AE21_UUID, frame, response=False)
    if label:
        print(f"[→] {label}")


async def main():
    print("=" * 46)
    print("  AIRMATE FS35-SRD133 BLE 控制器")
    print("=" * 46)

    device = await find_fan()
    if device is None:
        print("\n没有找到 airmate-fan")
        print("请确认：1) 风扇已通电 2) 风扇在附近 3) 官方App已退出")
        return

    print(f"\n找到设备: {device.name} ({device.address})")
    print("正在连接...")

    async with BleakClient(device) as client:
        if not client.is_connected:
            print("连接失败")
            return
        print("已连接")

        await client.start_notify(AE22_UUID, notify_handler)
        print("已订阅状态通知")
        await asyncio.sleep(1.0)

        # 连接后：先 initial 初始化，再 searchState 查询
        print("\n发送初始化命令...")
        await write_cmd(client, cmd_init())
        await asyncio.sleep(0.5)
        print("发送查询状态命令...")
        await write_cmd(client, cmd_query())
        await asyncio.sleep(1.5)

        while True:
            show_menu()
            choice = await input_async("请选择: ")

            if choice == "0":
                print("退出...")
                break

            elif choice == "1":
                await write_cmd(client, cmd_on(), "开机")

            elif choice == "2":
                await write_cmd(client, cmd_off(), "关机")

            elif choice == "3":
                v = await input_async(f"输入风速档位 (1~{MAX_SPEED}): ")
                try:
                    await write_cmd(client, cmd_speed(int(v)), f"风速 {v} 档")
                except ValueError as e:
                    print(f"  {e}")

            elif choice == "4":
                print("风模式：")
                modes = list(MODE_COMMANDS.items())
                for i, (name, _) in enumerate(modes, 1):
                    print(f"  {i}. {name}")
                m = await input_async("选择模式 (回车返回): ")
                if m.isdigit() and 1 <= int(m) <= len(modes):
                    name, frame_str = modes[int(m) - 1]
                    await write_cmd(client, parse_hex(frame_str), f"风模式 → {name}")
                    # 自然风/睡眠风需要额外发档位命令
                    if name == "自然风":
                        g = await input_async("自然风档位 (1~3，回车跳过): ")
                        if g.isdigit() and 1 <= int(g) <= 3:
                            await write_cmd(client, cmd_mode_gear("自然风", int(g)), f"自然风 {g} 档")
                    elif name == "睡眠风":
                        g = await input_async("睡眠风档位 (1~2，回车跳过): ")
                        if g.isdigit() and 1 <= int(g) <= 2:
                            await write_cmd(client, cmd_mode_gear("睡眠风", int(g)), f"睡眠风 {g} 档")
                elif m:
                    print("无效选项")

            elif choice == "5":
                v = await input_async("左右摆头: 1=开 0=关 > ")
                await write_cmd(client, cmd_swing_lr(v == "1"),
                                f"左右摆头 {'开' if v == '1' else '关'}")

            elif choice == "6":
                v = await input_async("语音: 1=开 0=关 > ")
                await write_cmd(client, cmd_voice(v == "1"),
                                f"语音 {'开' if v == '1' else '关'}")

            elif choice == "7":
                v = await input_async("屏显: 1=开 0=关 > ")
                await write_cmd(client, cmd_display(v == "1"),
                                f"屏显 {'开' if v == '1' else '关'}")

            elif choice == "8":
                v = await input_async(f"定时小时 (0~{MAX_TIMER}，0=取消): ")
                try:
                    await write_cmd(client, cmd_timer(int(v)), f"定时 {v} 小时")
                except ValueError as e:
                    print(f"  {e}")

            elif choice == "9":
                await write_cmd(client, cmd_query(), "查询状态")

            else:
                print("无效选项")

            await asyncio.sleep(1.0)

        await client.stop_notify(AE22_UUID)


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\n\n已退出")
