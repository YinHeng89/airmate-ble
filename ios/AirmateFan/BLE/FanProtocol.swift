import Foundation
import CoreBluetooth

// MARK: - 艾美特 FS35-SRD133 风扇 BLE 协议
//
// 协议族：bofei（博飞），广播服务 UUID 含 0xAF51（扫描发现用）
// 服务 UUID: 0000AE20-0000-1000-8000-00805F9B34FB
// 写特性  : 0000AE21-0000-1000-8000-00805F9B34FB
// 状态特性: 0000AE22-0000-1000-8000-00805F9B34FB（notify）
//
// 命令帧 = 5 字节: AA [type] [opcode] [param] 55
// 状态帧 = 15 字节: AA FC 03 [10字节数据] [checksum] 55
// 校验: checksum = (sum(frame[1:13]) + 4) & 0xFF （已通过 8 组真实帧验证）
//
// 以下所有命令/解码逻辑与 controllers/web_server.py 完全一致。

enum FanProtocol {
    static let serviceUUIDString = "0000AE20-0000-1000-8000-00805F9B34FB"
    static let writeUUIDString   = "0000AE21-0000-1000-8000-00805F9B34FB"
    static let notifyUUIDString  = "0000AE22-0000-1000-8000-00805F9B34FB"
    /// 广播服务 UUID，用于扫描发现（0xAF51 族）
    static let scanServiceUUIDString = "0000AF51-0000-1000-8000-00805F9B34FB"
    static let targetName = "airmate-fan"

    static func serviceUUID() -> CBUUID { CBUUID(string: serviceUUIDString) }
    static func writeUUID()   -> CBUUID { CBUUID(string: writeUUIDString) }
    static func notifyUUID()  -> CBUUID { CBUUID(string: notifyUUIDString) }
    static func scanServiceUUID() -> CBUUID { CBUUID(string: scanServiceUUIDString) }

    private static func frame(_ bytes: [UInt8]) -> Data {
        Data(bytes)
    }

    // MARK: - 命令帧
    static func cmdOn() -> Data     { frame([0xAA, 0x01, 0x01, 0x01, 0x55]) }
    static func cmdOff() -> Data    { frame([0xAA, 0x01, 0x01, 0x00, 0x55]) }

    static func cmdSpeed(_ level: Int) -> Data {
        let l = UInt8(min(max(level, 1), 12))
        return frame([0xAA, 0x01, 0x03, l, 0x55])
    }

    static func cmdQuery() -> Data  { frame([0xAA, 0xFC, 0x01, 0x01, 0x55]) }
    static func cmdInit()  -> Data  { frame([0xAA, 0xFC, 0x01, 0x02, 0x55]) }

    static func cmdTimer(_ hours: Int) -> Data {
        let h = UInt8(min(max(hours, 0), 15))
        return frame([0xAA, 0x01, 0x10, h, 0x55])
    }

    static func cmdSwing(_ on: Bool) -> Data {
        frame([0xAA, 0x01, 0x07, on ? 0x01 : 0x00, 0x55])
    }

    static func cmdVoice(_ on: Bool) -> Data {
        frame([0xAA, 0x01, 0x11, on ? 0x01 : 0x00, 0x55])
    }

    /// 屏显语义是反的：00=开，01=关（已实测确认）
    static func cmdDisplay(_ on: Bool) -> Data {
        frame([0xAA, 0x01, 0x0A, on ? 0x00 : 0x01, 0x55])
    }

    static func cmdMode(_ mode: FanMode) -> Data {
        switch mode {
        case .normal: return frame([0xAA, 0x01, 0x05, 0x00, 0x55])
        case .nature: return frame([0xAA, 0x01, 0x05, 0x07, 0x55])
        case .sleep:  return frame([0xAA, 0x01, 0x05, 0x06, 0x55])
        case .storm:  return frame([0xAA, 0x01, 0x05, 0x03, 0x55])
        }
    }

    /// 风模式档位命令
    /// 自然风: 一档=01 二档=02 三档=03
    /// 睡眠风: 一档=21 二档=22
    static func cmdModeGear(mode: FanMode, gear: Int) -> Data {
        if mode == .nature {
            let g = UInt8(min(max(gear, 1), 3))
            return frame([0xAA, 0x01, 0x08, g, 0x55])
        } else if mode == .sleep {
            let g = UInt8(min(max(gear, 1), 2))
            return frame([0xAA, 0x01, 0x08, 0x20 + g, 0x55])
        }
        return cmdMode(mode)
    }

    // MARK: - 状态解码
    static func decode(_ data: Data) -> FanStatus? {
        guard data.count >= 15 else { return nil }

        let bytes = [UInt8](data)
        // 校验: (sum(frame[1:13]) + 4) & 0xFF
        // 注意：必须用 Int 累加，否则 UInt8 求和会溢出（12 字节最大和 3060 > 255）
        let sum = bytes[1...12].reduce(0) { Int($0) + Int($1) }
        let checksum = (sum + 4) & 0xFF
        guard checksum == bytes[13] else { return nil }

        var status = FanStatus()

        // 风模式（data[8]）
        var modeName = "标准"
        var isStorm = false
        if bytes[8] & 0x40 != 0 {
            modeName = "自然风"
        } else if bytes[8] & 0x20 != 0 {
            modeName = "睡眠风"
        } else if bytes[8] & 0x08 != 0 {
            isStorm = true
        }

        var speed = Int(bytes[4])
        if modeName == "自然风" {
            if bytes[9] & 0x10 != 0 { speed = 3 }
            else if bytes[9] & 0x08 != 0 { speed = 2 }
            else if bytes[9] & 0x04 != 0 { speed = 1 }
        } else if modeName == "睡眠风" {
            if bytes[12] & 0x04 != 0 { speed = 2 }
            else if bytes[12] & 0x02 != 0 { speed = 1 }
        }
        if isStorm {
            modeName = "标准"
            speed = 13
        }

        status.power  = (bytes[3] == 1)
        status.speed  = speed
        status.mode   = modeName
        status.timer  = Int(bytes[6])
        status.swing  = (bytes[10] & 0x01) != 0
        status.voice  = (bytes[5] & 0x02) != 0
        status.display = (bytes[5] & 0x08) != 0
        status.raw    = data.map { String(format: "%02X", $0) }.joined(separator: " ")
        return status
    }
}
