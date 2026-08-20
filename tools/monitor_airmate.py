#!/usr/bin/env python3
"""
AIRMATE FS35-SRD133 BLE 状态监听脚本

用途：连接 airmate-fan，实时监听 AE22 notify 状态帧并解析，
      支持原样回放（R）测试命令帧。

运行：
    python monitor_airmate.py

交互：
    R → 原样回放最后收到的状态帧到 AE21
    Q → 退出

依赖：pip install bleak
"""

import asyncio
from datetime import datetime

from bleak import BleakClient, BleakScanner


DEVICE_NAME = "airmate-fan"

SERVICE_UUID = "0000ae20-0000-1000-8000-00805f9b34fb"
WRITE_UUID = "0000ae21-0000-1000-8000-00805f9b34fb"
NOTIFY_UUID = "0000ae22-0000-1000-8000-00805f9b34fb"


# ============================================================
# AIRMATE FS35-SRD133
#
# 帧格式：
#
# AA FC 03
#    │
#    ├─ Byte[3]  Power
#    ├─ Byte[4]  Speed
#    ├─ Byte[5]  State
#    ├─ Byte[6]  Timer
#    ├─ Byte[7]  Unknown
#    ├─ Byte[8]  Mode
#    ├─ Byte[9]  Mode Param
#    ├─ Byte[10] Swing
#    ├─ Byte[11] Unknown
#    ├─ Byte[12] Unknown
#    ├─ Byte[13] Checksum
#    └─ Byte[14] 55
#
# Checksum：
# (sum(Byte[1] ~ Byte[12]) + 4) & 0xFF
# ============================================================


def calc_checksum(data: bytes) -> int:
    """
    Byte[13] checksum
    已通过 8 组真实状态帧验证：
    checksum = (sum(frame[1:13]) + 4) & 0xFF
    """

    return (sum(data[1:13]) + 4) & 0xFF


def verify_frame(data: bytes) -> bool:
    if len(data) != 15:
        return False

    if data[0] != 0xAA:
        return False

    if data[14] != 0x55:
        return False

    return data[13] == calc_checksum(data)


def decode_frame(data: bytes):
    if len(data) != 15:
        return

    print("DECODE:")
    print(f"  power:      {data[3]} (0x{data[3]:02X})")
    print(f"  speed:      {data[4]} (0x{data[4]:02X})")
    print(f"  state:      {data[5]} (0x{data[5]:02X})")
    print(f"  timer:      {data[6]} h (0x{data[6]:02X})")
    print(f"  byte7:      {data[7]} (0x{data[7]:02X})")
    print(f"  mode:       {data[8]} (0x{data[8]:02X})")
    print(f"  mode_param: {data[9]} (0x{data[9]:02X})")
    print(f"  swing:      {data[10]} (0x{data[10]:02X})")
    print(f"  byte11:     {data[11]} (0x{data[11]:02X})")
    print(f"  byte12:     {data[12]} (0x{data[12]:02X})")
    print(f"  checksum:   {data[13]} (0x{data[13]:02X})")

    if verify_frame(data):
        print("  checksum:   ✓ OK")
    else:
        print("  checksum:   ✗ ERROR")


class AirMateMonitor:

    def __init__(self):
        self.client = None
        self.last_frame = None

    def notification_handler(self, sender, data: bytearray):

        data = bytes(data)

        now = datetime.now().strftime("%H:%M:%S.%f")[:-3]

        print()
        print("=" * 70)
        print(f"[{now}] NOTIFY")
        print()

        print("RAW")
        print(" ".join(f"{x:02x}" for x in data))

        # 对比上一帧
        if self.last_frame is not None and len(self.last_frame) == len(data):

            changed = []

            for i, (old, new) in enumerate(
                zip(self.last_frame, data)
            ):
                if old != new:
                    changed.append(
                        f"Byte[{i}] {old:02X} → {new:02X}"
                    )

            if changed:
                print()
                print("CHANGED:")

                for item in changed:
                    print("  " + item)

        print()

        decode_frame(data)

        self.last_frame = data

    async def find_device(self):

        print("=" * 70)
        print("AIRMATE FS35-SRD133")
        print("BLE Monitor")
        print("=" * 70)

        print()
        print("正在扫描 airmate-fan ...")

        devices = await BleakScanner.discover(timeout=10)

        for device in devices:

            name = device.name or ""

            if name.lower() == DEVICE_NAME.lower():

                print()
                print("找到设备")
                print(f"名称: {device.name}")
                print(f"ID: {device.address}")

                return device

        return None

    async def connect(self):

        device = await self.find_device()

        if device is None:
            print()
            print("❌ 没找到 airmate-fan")
            return False

        print()
        print("正在连接...")

        self.client = BleakClient(device)

        await self.client.connect()

        print(f"连接成功: {self.client.is_connected}")

        if not self.client.is_connected:
            return False

        print()
        print("订阅 Notify...")

        await self.client.start_notify(
            NOTIFY_UUID,
            self.notification_handler
        )

        print("✓ Notify 已订阅")

        return True

    async def write_frame(self, frame: bytes):

        print()
        print("=" * 70)
        print("准备写入 AE21")
        print("=" * 70)

        print()
        print("Frame:")
        print(" ".join(f"{x:02x}" for x in frame))

        print()

        if not verify_frame(frame):
            print("❌ Checksum 错误，拒绝发送")
            print(
                f"计算值: 0x{calc_checksum(frame):02X}"
            )
            print(
                f"帧中值: 0x{frame[13]:02X}"
            )
            return

        print("Checksum ✓")

        print()
        print("正在写入...")

        try:

            await self.client.write_gatt_char(
                WRITE_UUID,
                frame,
                response=True
            )

            print("✓ BLE 写入成功")

        except Exception as e:

            print()
            print("❌ 写入失败")
            print(type(e).__name__)
            print(str(e))

    async def run(self):

        connected = await self.connect()

        if not connected:
            return

        print()
        print("=" * 70)
        print("开始监听")
        print("=" * 70)

        print()
        print("当前操作：")
        print()
        print("  遥控器可以正常操作风扇")
        print("  程序会实时显示 AE22 Notify")
        print()
        print("测试功能：")
        print()
        print("  R  → 原样回放最后收到的状态帧")
        print("  Q  → 退出")
        print()
        print("请先让风扇处于你想测试的状态。")
        print()

        loop = asyncio.get_running_loop()

        while True:

            try:

                command = await loop.run_in_executor(
                    None,
                    input,
                    "请选择: "
                )

            except (EOFError, KeyboardInterrupt):

                break

            command = command.strip().lower()

            if command == "q":

                break

            elif command == "r":

                if self.last_frame is None:

                    print()
                    print("⚠️ 目前还没有收到状态帧")
                    print("请先用遥控器操作一次风扇")

                    continue

                print()
                print("准备原样回放最后一帧：")
                print()

                print(
                    " ".join(
                        f"{x:02x}"
                        for x in self.last_frame
                    )
                )

                await self.write_frame(
                    self.last_frame
                )

            else:

                print()
                print("请输入 R 或 Q")


async def main():

    monitor = AirMateMonitor()

    try:

        await monitor.run()

    finally:

        if monitor.client is not None:

            try:
                await monitor.client.stop_notify(
                    NOTIFY_UUID
                )
            except Exception:
                pass

            try:
                await monitor.client.disconnect()
            except Exception:
                pass

        print()
        print("已断开连接")


if __name__ == "__main__":

    asyncio.run(main())