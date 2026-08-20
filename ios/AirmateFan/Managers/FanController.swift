import Foundation
import SwiftUI
import Combine

/// 风扇控制器：管理 BLE 直连、状态接收与乐观更新。
/// 手机直接连接风扇，不依赖任何电脑端服务。
@MainActor
final class FanController: ObservableObject {
    static let shared = FanController()

    private let ble = FanBLEManager.shared

    // MARK: - 状态（桥接 BLE 管理器）
    @Published var bleState: BLEConnectionState = .idle
    @Published var discovered: [ScannedDevice] = []
    @Published var status: FanStatus = FanStatus()
    @Published var error: String?
    @Published var toast: String?

    /// 是否已连接（供 UI 切换页面）
    var connected: Bool { bleState == .connected }

    /// 是否已进入扫描/连接流程（取代原 isConfigured）
    @Published var hasStarted: Bool = false

    /// 扫描是否超时（供 UI 显示「未找到设备」提示）
    @Published var scanDidTimeout: Bool = false

    private var coolDownUntil = Date.distantPast
    private var pendingOps = 0
    private var latest: FanStatus?
    private var cancellables = Set<AnyCancellable>()

    private init() {
        // 监听设备真实状态（回调已在主线程）
        ble.onStatus = { [weak self] s in
            self?.applyRemote(s)
        }
        // 绑定 BLE 连接状态
        ble.$state
            .receive(on: RunLoop.main)
            .sink { [weak self] st in
                guard let self else { return }
                self.bleState = st
                if case .failed(let msg) = st {
                    self.error = msg
                } else if st == .connected {
                    self.error = nil
                }
            }
            .store(in: &cancellables)

        // 同步扫描发现的设备列表（否则 UI 拿不到设备）
        ble.$discovered
            .receive(on: RunLoop.main)
            .sink { [weak self] list in
                self?.discovered = list
            }
            .store(in: &cancellables)

        // 同步扫描超时状态
        ble.$scanDidTimeout
            .receive(on: RunLoop.main)
            .sink { [weak self] timedOut in
                self?.scanDidTimeout = timedOut
            }
            .store(in: &cancellables)
    }

    // MARK: - 扫描 / 连接
    func startScan() {
        hasStarted = true
        discovered = []
        scanDidTimeout = false
        ble.startScan()
        observeBLEState()
    }

    func stopScan() {
        ble.stopScan()
    }

    func connect(_ device: ScannedDevice) {
        ble.connect(device)
        observeBLEState()
    }

    func disconnect() {
        ble.disconnect()
        status = FanStatus()
        latest = nil
        hasStarted = false
        discovered = []
    }

    private func observeBLEState() {
        // 通过 Combine-free 轮询方式同步：直接读 ble.state
        bleState = ble.state
        if case .failed(let msg) = ble.state { error = msg }
    }

    // MARK: - 接收设备真实状态
    private func applyRemote(_ s: FanStatus) {
        latest = s
        let now = Date()
        if pendingOps == 0 && now >= coolDownUntil {
            status = s
        } else {
            // 冷却期内：暂存真实状态，冷却结束后用 latest 刷新，避免状态丢失
            status.raw = s.raw
            scheduleApplyLatest()
        }
    }

    /// 冷却期结束后，用最近一次设备真实状态覆盖本地乐观值
    private func scheduleApplyLatest() {
        let remaining = coolDownUntil.timeIntervalSinceNow
        let wait = max(remaining, 0) + 0.05
        Task { @MainActor in
            try? await Task.sleep(nanoseconds: UInt64(wait * 1_000_000_000))
            guard self.pendingOps == 0, let s = self.latest else { return }
            self.status = s
        }
    }

    // MARK: - 发送命令（带本地成功判断 + 乐观更新）
    private func send(_ data: Data, optimistic apply: @escaping () -> Void) {
        // 未连接时仅提示，不改变本地状态（预览模式下也能点，但给出反馈）
        guard connected else {
            showToast("尚未连接风扇，请先点击右上角「连接风扇」")
            return
        }
        let backup = status
        apply()
        pendingOps += 1
        ble.send(data) { [weak self] ok in
            guard let self else { return }
            if !ok {
                self.status = backup
                self.showToast("指令发送失败，请确认风扇在范围内")
            }
            self.pendingOps -= 1
            self.coolDownUntil = Date().addingTimeInterval(1.8)
        }
    }

    private func showToast(_ msg: String) {
        toast = "⚠ " + msg
        Task {
            try? await Task.sleep(nanoseconds: 3_000_000_000)
            if toast != nil { toast = nil }
        }
    }

    // MARK: - 控制动作
    func togglePower() {
        let turningOn = !status.power
        send(turningOn ? FanProtocol.cmdOn() : FanProtocol.cmdOff()) {
            self.status.power.toggle()
            if !self.status.power { self.status.speed = 0 }
            // 开机后主动 query，拉取设备真实状态（power/speed/mode），
            // 避免乐观更新后停在「开机但 speed=0」的错误状态。
            if turningOn {
                self.queryAfterCooldown()
            }
        }
    }

    /// 等冷却期结束后主动 query 一次，拉取设备真实状态
    private func queryAfterCooldown() {
        Task { @MainActor in
            try? await Task.sleep(nanoseconds: 500_000_000)
            self.ble.query()
        }
    }

    /// 档位滑块统一入口：根据当前风模式分派到正确的命令
    func setSpeed(_ gear: Int) {
        let current = status.fanMode
        switch current {
        case .nature, .sleep:
            // 自然风/睡眠风：发档位命令（cmdModeGear）
            setGear(current, gear: gear)
        case .storm:
            // 暴风无独立档位，忽略（或切回标准风）
            break
        case .normal:
            let range = FanMode.normal.gearRange // 1...13
            let g = min(max(gear, range.lowerBound), range.upperBound)
            if g == 13 {
                // 第13档 = 暴风（mode 与 decode 一致为"标准"，靠 speed=13 识别暴风）
                send(FanProtocol.cmdMode(.storm)) {
                    self.status.mode = "标准"
                    self.status.speed = 13
                }
            } else {
                send(FanProtocol.cmdSpeed(g)) {
                    self.status.mode = "标准"
                    self.status.speed = g
                }
            }
        }
    }

    func setMode(_ mode: FanMode) {
        switch mode {
        case .storm:
            // 暴风：mode 与 decode 一致为"标准"，靠 speed=13 识别
            send(FanProtocol.cmdMode(.storm)) {
                self.status.mode = "标准"
                self.status.speed = 13
            }
        case .normal:
            // 参考 web 端：切标准风时，除发 mode=normal 外，还需补发一次对应档位的
            // speed 命令，否则设备不会真正落到目标档位（只切了模式、档位丢失）。
            let target = (status.speed > 0 && status.speed <= 12) ? status.speed : 1
            send(FanProtocol.cmdMode(.normal)) {
                self.status.mode = "标准"
                self.status.speed = target
            }
            Task {
                try? await Task.sleep(nanoseconds: 150_000_000)
                self.send(FanProtocol.cmdSpeed(target)) {
                    self.status.mode = "标准"
                    self.status.speed = target
                }
            }
        case .nature, .sleep:
            send(FanProtocol.cmdMode(mode)) {
                self.status.mode = mode.label
                self.status.speed = 1
            }
        }
    }

    func setGear(_ mode: FanMode, gear: Int) {
        let range = mode.gearRange
        let g = min(max(gear, range.lowerBound), range.upperBound)
        send(FanProtocol.cmdModeGear(mode: mode, gear: g)) {
            self.status.mode = mode.label
            self.status.speed = g
        }
    }

    func setSwing(_ on: Bool) {
        send(FanProtocol.cmdSwing(on)) { self.status.swing = on }
    }

    func setDisplay(_ on: Bool) {
        send(FanProtocol.cmdDisplay(on)) { self.status.display = on }
    }

    func setTimer(_ hours: Int) {
        let h = min(max(hours, 0), 15)
        send(FanProtocol.cmdTimer(h)) { self.status.timer = h }
    }
}
