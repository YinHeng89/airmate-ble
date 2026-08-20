#!/usr/bin/env python3
"""
AIRMATE FS35-SRD133 GATT 服务枚举脚本

用途：连接 airmate-fan，枚举完整 GATT 服务与特征，并尝试读取可读特征值。

设备：
  BLE 名称: airmate-fan
  服务:     0000ae20 (含 ae21=write / ae22=notify)

运行：
    python inspect_airmate.py

依赖：pip install bleak
"""

import asyncio
from bleak import BleakClient, BleakScanner

TARGET_NAME = "airmate-fan"


def print_separator():
    print("=" * 70)


async def find_device():
    print("正在扫描 airmate-fan ...")

    devices = await BleakScanner.discover(timeout=10)

    for device in devices:
        if device.name == TARGET_NAME:
            return device

    return None


async def main():
    print_separator()
    print("AIRMATE FS35-SRD133 GATT Inspector")
    print_separator()

    device = await find_device()

    if not device:
        print("没有找到 airmate-fan")
        print("请确认风扇通电，并且在附近。")
        return

    print()
    print("找到设备")
    print("名称:", device.name)
    print("ID:", device.address)

    print()
    print("正在连接...")

    async with BleakClient(device) as client:
        print("连接成功:", client.is_connected)

        print()
        print_separator()
        print("GATT SERVICES")
        print_separator()

        for service in client.services:
            print()
            print(f"[SERVICE] {service.uuid}")

            if service.description:
                print(f"  Description: {service.description}")

            for char in service.characteristics:
                print()
                print(f"  [CHARACTERISTIC]")
                print(f"    UUID: {char.uuid}")
                print(f"    Properties: {', '.join(char.properties)}")

                if "read" in char.properties:
                    try:
                        value = await client.read_gatt_char(char.uuid)
                        print(
                            f"    Current Value: "
                            f"{value.hex(' ')}"
                        )
                    except Exception as e:
                        print(f"    Read Error: {e}")

        print()
        print_separator()
        print("枚举完成")
        print_separator()


if __name__ == "__main__":
    asyncio.run(main())
