#!/usr/bin/env python3
"""
AIRMATE FS35-SRD133 BLE 扫描脚本

用途：扫描附近 BLE 设备，标记疑似目标设备（airmate 风扇）。

匹配关键字：airmate / 艾美特 / fs35 / srd133 / hui

运行：
    python scan_airmate.py

依赖：pip install bleak
"""

import asyncio
from bleak import BleakScanner

TARGET_KEYWORDS = [
    "airmate",
    "艾美特",
    "fs35",
    "srd133",
    "hui",
]


def hex_data(data):
    if not data:
        return ""
    return data.hex(" ")


async def main():
    print("=" * 60)
    print("AIRMATE BLE Scanner")
    print("正在扫描附近蓝牙设备 15 秒...")
    print("=" * 60)

    devices = await BleakScanner.discover(
        timeout=15,
        return_adv=True,
    )

    print()

    for address, (device, adv) in devices.items():
        name = device.name or adv.local_name or ""
        name_lower = name.lower()

        matched = any(keyword in name_lower for keyword in TARGET_KEYWORDS)

        print("-" * 60)
        print("设备名称:", name or "<无名称>")
        print("设备 ID:", device.address)
        print("RSSI:", adv.rssi)
        print("疑似目标:", "YES" if matched else "NO")

        if adv.local_name:
            print("Local Name:", adv.local_name)

        if adv.service_uuids:
            print("Service UUIDs:")
            for uuid in adv.service_uuids:
                print("  ", uuid)

        if adv.manufacturer_data:
            print("Manufacturer Data:")
            for company_id, data in adv.manufacturer_data.items():
                print(
                    f"  Company ID: 0x{company_id:04X}"
                )
                print(
                    f"  Data: {hex_data(data)}"
                )

        if adv.service_data:
            print("Service Data:")
            for uuid, data in adv.service_data.items():
                print(
                    f"  {uuid}: {hex_data(data)}"
                )

    print()
    print("=" * 60)
    print("扫描完成")
    print("=" * 60)


if __name__ == "__main__":
    asyncio.run(main())
