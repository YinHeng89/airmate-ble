import SwiftUI

/// 设备扫描 / 连接页：手机直接扫描附近的艾美特风扇。
struct ConnectionView: View {
    @EnvironmentObject private var controller: FanController
    var dismiss: (() -> Void)?

    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                if !controller.hasStarted {
                    onboarding
                } else {
                    deviceList
                }
            }
            .navigationTitle("Airmate 风扇")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarLeading) {
                    Button("关闭") { dismiss?() }
                }
            }
        }
        .onChange(of: controller.connected) { _, connected in
            if connected {
                // 连接成功震动反馈
                UINotificationFeedbackGenerator().notificationOccurred(.success)
                dismiss?()
            }
        }
    }

    // MARK: - 引导
    private var onboarding: some View {
        VStack(spacing: 20) {
            Image(systemName: "fanblades")
                .font(.system(size: 64))
                .foregroundStyle(.tint)
            Text("直接连接风扇")
                .font(.title2.weight(.semibold))
            Text("打开风扇电源，手机会通过蓝牙扫描并直连，无需任何电脑或网络。")
                .font(.subheadline)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
                .padding(.horizontal, 32)
            Button {
                controller.startScan()
            } label: {
                Text("开始扫描")
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 14)
                    .background(Color.accentColor, in: RoundedRectangle(cornerRadius: 12))
                    .foregroundStyle(.white)
            }
            .padding(.horizontal, 32)
            .padding(.top, 8)

            if case .poweredOff = controller.bleState {
                Text("⚠ 请先在系统设置中开启蓝牙")
                    .font(.footnote)
                    .foregroundStyle(.red)
                    .padding(.top, 8)
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .center)
    }

    // MARK: - 设备列表
    @ViewBuilder
    private var deviceList: some View {
        switch controller.bleState {
        case .poweredOff:
            VStack(spacing: 12) {
                Image(systemName: "bluetooth")
                    .font(.largeTitle)
                    .foregroundStyle(.red)
                Text("蓝牙未开启")
                    .font(.headline)
                Text("请在 iPhone 设置中打开蓝牙后重试")
                    .font(.footnote)
                    .foregroundStyle(.secondary)
                Button("重试") { controller.startScan() }
                    .padding(.top, 4)
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
        case .scanning, .connecting:
            List {
                if controller.discovered.isEmpty {
                    HStack {
                        Spacer()
                        ProgressView()
                            .padding(.trailing, 8)
                        Text(controller.bleState == .connecting ? "连接中…" : "正在扫描附近的风扇…")
                            .foregroundStyle(.secondary)
                        Spacer()
                    }
                } else {
                    ForEach(controller.discovered) { dev in
                        Button {
                            controller.connect(dev)
                        } label: {
                            HStack {
                                Image(systemName: "fanblades")
                                    .foregroundStyle(.tint)
                                VStack(alignment: .leading) {
                                    Text(dev.name).font(.body.weight(.medium))
                                    Text("RSSI \(dev.rssi) dBm")
                                        .font(.caption)
                                        .foregroundStyle(.secondary)
                                }
                                Spacer()
                                if controller.bleState == .connecting {
                                    ProgressView()
                                }
                            }
                        }
                    }
                }
            }
            .listStyle(.insetGrouped)
            .refreshable { controller.startScan() }
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button { controller.startScan() } label: { Image(systemName: "arrow.clockwise") }
                }
            }
        case .failed(let msg):
            VStack(spacing: 12) {
                Image(systemName: "exclamationmark.triangle")
                    .font(.largeTitle)
                    .foregroundStyle(.orange)
                Text("连接失败")
                    .font(.headline)
                Text(msg).font(.footnote).foregroundStyle(.secondary).multilineTextAlignment(.center)
                Button("重新扫描") { controller.startScan() }
                    .padding(.top, 4)
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
        case .idle where controller.scanDidTimeout:
            // 扫描超时且未找到设备
            VStack(spacing: 12) {
                Image(systemName: "fanblades")
                    .font(.largeTitle)
                    .foregroundStyle(.secondary)
                Text("未找到设备")
                    .font(.headline)
                Text("请确认风扇已开机，并靠近手机后重试")
                    .font(.footnote)
                    .foregroundStyle(.secondary)
                    .multilineTextAlignment(.center)
                Button("重新扫描") { controller.startScan() }
                    .buttonStyle(.borderedProminent)
                    .padding(.top, 4)
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
        default:
            EmptyView()
        }
    }
}
