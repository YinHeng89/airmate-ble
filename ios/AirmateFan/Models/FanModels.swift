import Foundation

// MARK: - 风模式
enum FanMode: String, CaseIterable, Codable {
    case normal = "normal"   // 标准风
    case nature = "nature"   // 自然风
    case sleep  = "sleep"    // 睡眠风
    case storm  = "storm"    // 暴风（标准风第13档）

    var label: String {
        switch self {
        case .normal: return "标准风"
        case .nature: return "自然风"
        case .sleep:  return "睡眠风"
        case .storm:  return "暴风"
        }
    }

    /// 标准风 1~12 档，第13档为暴风特例；自然风 1~3 档；睡眠风 1~2 档；暴风单档 13
    var gearRange: ClosedRange<Int> {
        switch self {
        case .normal: return 1...13
        case .nature: return 1...3
        case .sleep:  return 1...2
        case .storm:  return 13...13
        }
    }

    /// 当前模式需要发送的 api 值（暴风映射为 storm）
    var apiValue: String { rawValue }
}

// MARK: - 风扇状态
struct FanStatus: Codable {
    var power: Bool = false
    var speed: Int = 0
    /// 解码后的中文风模式（"标准"/"自然风"/"睡眠风"），由服务端返回
    var mode: String = ""
    var timer: Int = 0
    var swing: Bool = false
    var voice: Bool = false
    var display: Bool = false
    var raw: String = ""

    /// 将服务端返回的中文 mode 映射到 FanMode
    var fanMode: FanMode {
        switch mode {
        case "自然风": return .nature
        case "睡眠风": return .sleep
        case "暴风":   return .storm
        default:       return .normal
        }
    }

    /// 当前档位（暴风时 speed=13）
    var gear: Int {
        if power && speed > 0 { return speed }
        return 1
    }
}

// MARK: - 完整状态
struct FanState: Codable {
    var connected: Bool = false
    var status: FanStatus = FanStatus()
    var error: String?
}

// MARK: - 命令响应
struct CommandResponse: Codable {
    var ok: Bool = false
    var msg: String?
}
