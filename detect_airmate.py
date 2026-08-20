#!/usr/bin/env python3
"""
AIRMATE FS35-SRD133 设备探测脚本

用途：确定 airmate-fan 到底属于哪一套协议（AFxx 广播 UUID + 完整 GATT 服务枚举）

关键背景：
  微信小程序「慧居管家」通过广播里的 service UUID (AF30~AF70) 来区分设备型号，
  不同的 AFxx 对应不同的协议族：
    AF50 -> protocol/fan       (通用风扇)
    AF51 -> protocol/bofei     (bofei 风扇)
    AF53 -> protocol/ruide     (ruide 风扇)
    AF58 -> protocol/juhu      (juhu 风扇)
    ...

运行：
    python detect_airmate.py
"""

import asyncio
from bleak import BleakScanner, BleakClient

TARGET_NAME = "airmate-fan"


async def main():
    print("=" * 60)
    print("AIRMATE 设备探测")
    print("=" * 60)

    print("\n[1] 扫描 airmate-fan 的广播数据 (10 秒)...")
    devices = await BleakScanner.discover(timeout=10.0, return_adv=True)

    target = None
    target_adv = None
    for addr, (dev, adv) in devices.items():
        name = dev.name or adv.local_name or ""
        if name.lower() == TARGET_NAME:
            target = dev
            target_adv = adv
            print(f"\n找到设备: {name} ({addr})")
            print(f"  RSSI: {adv.rssi}")

            if adv.local_name:
                print(f"  Local Name: {adv.local_name}")

            if adv.service_uuids:
                print(f"  ★ 广播 Service UUIDs (决定协议族):")
                for u in adv.service_uuids:
                    print(f"      {u}")
            else:
                print(f"  (广播里没有 service_uuids 字段)")

            if adv.service_data:
                print(f"  Service Data:")
                for u, d in adv.service_data.items():
                    print(f"      {u}: {d.hex(' ')}")

            if adv.manufacturer_data:
                print(f"  Manufacturer Data:")
                for cid, d in adv.manufacturer_data.items():
                    print(f"      Company 0x{cid:04X}: {d.hex(' ')}")
            break

    if target is None:
        print("\n没有找到 airmate-fan，以下是全部扫描到的设备：")
        for addr, (dev, adv) in devices.items():
            name = dev.name or adv.local_name or "(无名称)"
            su = [str(u) for u in (adv.service_uuids or [])]
            print(f"  {name:20s} {addr}  services={su}")
        return

    print("\n[2] 连接并枚举完整 GATT 服务...")
    async with BleakClient(target) as client:
        print(f"连接成功: {client.is_connected}")
        if not client.is_connected:
            return

        for service in client.services:
            print(f"\n[SERVICE] {service.uuid}")
            for ch in service.characteristics:
                props = ",".join(ch.properties)
                desc = ch.description or ""
                print(f"    [{ch.uuid}]  props={props}  {desc}")
                # 尝试读取特征值（部分设备的命令入口特征是可读的）
                if "read" in ch.properties:
                    try:
                        val = await client.read_gatt_char(ch.uuid)
                        print(f"        value = {val.hex(' ')}")
                    except Exception as e:
                        print(f"        read error: {e}")


if __name__ == "__main__":
    asyncio.run(main())
