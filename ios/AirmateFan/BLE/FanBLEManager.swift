import Foundation
@preconcurrency import CoreBluetooth

/// BLE 连接状态
enum BLEConnectionState: Equatable {
    case poweredOff
    case idle
    case scanning
    case connecting
    case connected
    case disconnected
    case failed(String)
}

/// 扫描发现的设备
struct ScannedDevice: Identifiable, Equatable {
    let id: UUID            // peripheral.identifier
    let name: String
    let rssi: Int

    static func == (lhs: ScannedDevice, rhs: ScannedDevice) -> Bool { lhs.id == rhs.id }
}

/// 艾美特风扇 CoreBluetooth 管理器（独立直连，不依赖电脑端服务）。
///
/// 关键点：CBCentralManager 使用主队列初始化，因此所有 delegate 回调都在
/// 主线程执行；类标记 @MainActor 与之对齐，避免 Swift 6 并发检查报 data race。
@MainActor
final class FanBLEManager: NSObject, ObservableObject {
    static let shared = FanBLEManager()

    @Published private(set) var state: BLEConnectionState = .idle
    @Published private(set) var discovered: [ScannedDevice] = []

    /// 解码后的最新状态（nil 表示尚未收到）
    var onStatus: ((FanStatus) -> Void)?

    private var central: CBCentralManager!
    private var peripheral: CBPeripheral?
    private var writeChar: CBCharacteristic?
    private var notifyChar: CBCharacteristic?
    private var peripherals: [UUID: CBPeripheral] = [:]

    /// 写模式：本设备需要 withResponse（对应 web 端 response=True），
    /// withoutResponse 会被设备丢弃。默认 withResponse，失败时回退。
    private var preferWithResponse: Bool?

    /// 等待 withResponse 回执的 completion 队列（与每条 writeValue 一一对应，FIFO）
    private var pendingWriteCompletions: [((Bool) -> Void)?] = []

    private override init() {
        super.init()
        central = CBCentralManager(delegate: self, queue: .main)
    }

    // MARK: - 扫描
    func startScan() {
        discovered = []
        guard central.state == .poweredOn else {
            state = .poweredOff
            return
        }
        state = .scanning
        // 不限服务扫描（部分固件不广播 AF51），didDiscover 里按名称过滤 airmate
        central.scanForPeripherals(withServices: nil,
                                   options: [CBCentralManagerScanOptionAllowDuplicatesKey: false])
    }

    func stopScan() {
        central.stopScan()
        if case .scanning = state { state = .idle }
    }

    // MARK: - 连接
    func connect(_ device: ScannedDevice) {
        guard let p = peripherals[device.id] else { return }
        state = .connecting
        central.connect(p, options: nil)
    }

    func disconnect() {
        if let p = peripheral {
            central.cancelPeripheralConnection(p)
        }
        peripheral = nil
        writeChar = nil
        notifyChar = nil
        state = .disconnected
    }

    // MARK: - 发送命令
    func send(_ data: Data, completion: ((Bool) -> Void)? = nil) {
        guard let p = peripheral, let char = writeChar else {
            completion?(false)
            return
        }
        // 本设备需要 withResponse（response=True），默认用它；
        // 仅在探测失败后（didWriteValueFor 收到错误）才回退 withoutResponse。
        let writeType: CBCharacteristicWriteType = (preferWithResponse ?? true) ? .withResponse : .withoutResponse
        if writeType == .withResponse {
            // 入队 completion，等 didWriteValueFor 回调后按 FIFO 取出触发
            pendingWriteCompletions.append(completion)
        }
        p.writeValue(data, for: char, type: writeType)
        if writeType == .withoutResponse {
            // withoutResponse 无回执，乐观认为已发出（实际以设备状态帧为准）
            completion?(true)
        }
    }

    /// 查询状态（连接后先 init 握手，再 query）
    func query() {
        send(FanProtocol.cmdQuery())
    }

    func initHandshake() {
        // init 握手完成后（withResponse 回执成功）再 query，避免两条命令竞争
        send(FanProtocol.cmdInit()) { [weak self] ok in
            guard ok else { return }
            Task { @MainActor in
                self?.query()
            }
        }
    }
}

// MARK: - CBCentralManagerDelegate
// 注意：CBCentralManager 用 .main 队列初始化，回调均已在主线程，
// 这里用 nonisolated + MainActor.assumeIsolated 满足 Swift 6 协议约束。
extension FanBLEManager: CBCentralManagerDelegate {
    nonisolated func centralManagerDidUpdateState(_ central: CBCentralManager) {
        let st = central.state
        Task { @MainActor in
            switch st {
            case .poweredOn:
                if case .poweredOff = self.state { self.state = .idle }
            case .poweredOff, .unauthorized, .unsupported:
                self.state = .poweredOff
            default:
                break
            }
        }
    }

    nonisolated func centralManager(_ central: CBCentralManager,
                                    didDiscover peripheral: CBPeripheral,
                                    advertisementData: [String: Any],
                                    rssi RSSI: NSNumber) {
        let name = (advertisementData[CBAdvertisementDataLocalNameKey] as? String)
            ?? peripheral.name
            ?? "未知设备"
        guard name.lowercased().contains("airmate") else { return }
        let dev = ScannedDevice(id: peripheral.identifier, name: name, rssi: RSSI.intValue)
        Task { @MainActor in
            if let idx = self.discovered.firstIndex(where: { $0.id == dev.id }) {
                self.discovered[idx] = dev
            } else {
                self.discovered.append(dev)
            }
            self.peripherals[dev.id] = peripheral
        }
    }

    nonisolated func centralManager(_ central: CBCentralManager, didConnect peripheral: CBPeripheral) {
        Task { @MainActor in
            self.peripheral = peripheral
            peripheral.delegate = self
            peripheral.discoverServices([FanProtocol.serviceUUID()])
        }
    }

    nonisolated func centralManager(_ central: CBCentralManager,
                                    didFailToConnect peripheral: CBPeripheral,
                                    error: Error?) {
        let msg = error?.localizedDescription ?? "连接失败"
        Task { @MainActor in
            self.state = .failed(msg)
        }
    }

    nonisolated func centralManager(_ central: CBCentralManager,
                                    didDisconnectPeripheral peripheral: CBPeripheral,
                                    error: Error?) {
        let msg = error?.localizedDescription
        Task { @MainActor in
            self.peripheral = nil
            self.writeChar = nil
            self.notifyChar = nil
            if let msg {
                self.state = .failed(msg)
            } else {
                self.state = .disconnected
            }
        }
    }
}

// MARK: - CBPeripheralDelegate
extension FanBLEManager: CBPeripheralDelegate {
    nonisolated func peripheral(_ peripheral: CBPeripheral, didDiscoverServices error: Error?) {
        guard error == nil else { return }
        guard let service = peripheral.services?.first(where: { $0.uuid == FanProtocol.serviceUUID() }) else { return }
        peripheral.discoverCharacteristics([FanProtocol.writeUUID(), FanProtocol.notifyUUID()], for: service)
    }

    nonisolated func peripheral(_ peripheral: CBPeripheral,
                                didDiscoverCharacteristicsFor service: CBService,
                                error: Error?) {
        guard error == nil else { return }
        Task { @MainActor in
            for char in service.characteristics ?? [] {
                if char.uuid == FanProtocol.writeUUID() {
                    self.writeChar = char
                } else if char.uuid == FanProtocol.notifyUUID() {
                    self.notifyChar = char
                    // 先订阅通知，等 didUpdateNotificationStateFor 确认成功后再发 init/query
                    peripheral.setNotifyValue(true, for: char)
                }
            }
            if self.writeChar != nil && self.notifyChar != nil {
                self.state = .connected
            }
        }
    }

    nonisolated func peripheral(_ peripheral: CBPeripheral,
                                didUpdateNotificationStateFor characteristic: CBCharacteristic,
                                error: Error?) {
        let ok = (error == nil)
        Task { @MainActor in
            if characteristic.uuid == FanProtocol.notifyUUID(), ok {
                self.state = .connected
                // 通知订阅成功后，握手初始化（init 完成后内部会自动 query）
                print("[BLE] 通知订阅成功，发送 init")
                self.initHandshake()
            }
        }
    }

    nonisolated func peripheral(_ peripheral: CBPeripheral,
                                didUpdateValueFor characteristic: CBCharacteristic,
                                error: Error?) {
        if let error {
            print("[BLE] didUpdateValue error: \(error.localizedDescription)")
            return
        }
        guard let value = characteristic.value else { return }
        if characteristic.uuid == FanProtocol.notifyUUID() {
            let hex = value.map { String(format: "%02X", $0) }.joined(separator: " ")
            print("[BLE] 收到 notify 帧(\(value.count)字节): \(hex)")
            if let status = FanProtocol.decode(value) {
                Task { @MainActor in
                    self.onStatus?(status)
                }
            } else {
                print("[BLE] decode 失败（checksum 不匹配或长度不足）")
            }
        }
    }

    nonisolated func peripheral(_ peripheral: CBPeripheral,
                                didWriteValueFor characteristic: CBCharacteristic,
                                error: Error?) {
        let failed = (error != nil)
        let msg = error?.localizedDescription ?? ""
        Task { @MainActor in
            if failed {
                // withResponse 写入失败：若尚未确定写模式，回退到 withoutResponse
                if self.preferWithResponse == nil {
                    self.preferWithResponse = false
                    print("[BLE] withResponse 写入失败，回退 withoutResponse: \(msg)")
                }
            } else {
                // withResponse 写入成功：确认使用 withResponse
                self.preferWithResponse = true
            }
            // 按 FIFO 取出对应这条命令的 completion
            let completion = self.pendingWriteCompletions.first ?? nil
            if !self.pendingWriteCompletions.isEmpty {
                self.pendingWriteCompletions.removeFirst()
            }
            completion?(!failed)
        }
    }
}
