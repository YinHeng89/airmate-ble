import SwiftUI

/// 主控制页（精确复刻 web 端 index.html 结构 + style.css 液态玻璃风）
struct ControlView: View {
    @EnvironmentObject private var controller: FanController
    @State private var showScanner = false
    @State private var selectedTab = 0
    @State private var previousTab = 0

    private var status: FanStatus { controller.status }
    private var mode: FanMode { status.fanMode }
    private let stormGear = 13

    var body: some View {
        TabView(selection: $selectedTab) {
            Tab("标准风", systemImage: "fan", value: 0) {
                mainContent
            }
            Tab("自然风", systemImage: "leaf", value: 1) {
                mainContent
            }
            Tab("睡眠风", systemImage: "moon", value: 2) {
                mainContent
            }
            Tab("暴风", systemImage: "wind", value: 3, role: .search) {
                Color.clear
            }
        }
        .tint(.airmatePrimary)
        .onChange(of: selectedTab) { _, newValue in
            if newValue == 3 {
                // 暴风是独立按钮：点击后切暴风模式，selection 弹回上一个 tab
                controller.setMode(.storm)
                selectedTab = previousTab
            } else {
                previousTab = newValue
                if let m = tabTagToMode(newValue) {
                    controller.setMode(m)
                }
            }
        }
        .onChange(of: status.mode) { _, _ in syncTabFromDevice() }
        .onChange(of: status.speed) { _, _ in syncTabFromDevice() }
        .sheet(isPresented: $showScanner) {
            ConnectionView(dismiss: { showScanner = false })
                .environmentObject(controller)
        }
        .overlay(alignment: .bottom) {
            if let toast = controller.toast {
                toastPill(toast)
                    .padding(.bottom, 76)
            }
        }
    }

    /// 主内容（风扇 + 档位 + 开关，四个 tab 共享）
    private var mainContent: some View {
        ZStack {
            backgroundGradient.ignoresSafeArea()

            ScrollView {
                VStack(spacing: 16) {
                    header
                    fanArea
                    speedCard
                    switchCard
                    rawCard
                    Spacer(minLength: 24)
                }
                .padding(.horizontal, 16)
                .padding(.top, 8)
                .padding(.bottom, 16)
                .fixedSize(horizontal: false, vertical: true)
            }
        }
    }

    private func tabTagToMode(_ tag: Int) -> FanMode? {
        switch tag {
        case 0: return .normal
        case 1: return .nature
        case 2: return .sleep
        case 3: return .storm
        default: return nil
        }
    }

    /// 设备状态回传后，让底部 Tab 高亮跟随真实风模式。
    /// 暴风（mode=标准 + speed=13）时高亮「标准风」Tab（因为暴风是独立按钮，不常亮）。
    private func syncTabFromDevice() {
        if mode == .normal && status.speed == stormGear {
            selectedTab = 0  // 暴风：暴风按钮不常亮，标准风 tab 保持
        } else {
            let tag: Int
            switch mode {
            case .normal: tag = 0
            case .nature: tag = 1
            case .sleep:  tag = 2
            case .storm:  tag = 0
            }
            if tag != 3 {  // 3 是暴风，正常情况不会作为选中态
                selectedTab = tag
                previousTab = tag
            }
        }
    }

    // MARK: - 背景
    private var backgroundGradient: some View {
        GeometryReader { g in
            ZStack(alignment: .topLeading) {
                LinearGradient(colors: [Color(hex: 0xeef2fb), Color(hex: 0xf1edf6), Color(hex: 0xeaf1f8)],
                               startPoint: .topLeading, endPoint: .bottomTrailing)
                // 两道光斑：用相对屏宽的尺寸，offset 用负值往屏幕外推，不撑大 ZStack
                Ellipse().fill(Color(hex: 0x5e7ce2).opacity(0.18))
                    .frame(width: g.size.width * 0.9, height: g.size.width * 0.6)
                    .blur(radius: 40)
                    .offset(x: -g.size.width * 0.3, y: -g.size.height * 0.2)
                Ellipse().fill(Color(hex: 0xa877da).opacity(0.16))
                    .frame(width: g.size.width * 0.8, height: g.size.width * 0.55)
                    .blur(radius: 40)
                    .offset(x: g.size.width * 0.4, y: g.size.height * 0.5)
            }
            .frame(width: g.size.width, height: g.size.height)
        }
        .ignoresSafeArea()
    }

    // MARK: - header（标题 + 状态点 + 连接按钮）
    private var header: some View {
        HStack {
            Text("AIRMATE 风扇")
                .font(.system(size: 20, weight: .bold))
            Spacer()
            Button {
                if controller.connected { controller.disconnect() } else { showScanner = true }
            } label: {
                statusPill
            }
            .buttonStyle(.plain)
        }
        .padding(.top, 8)
    }

    private var statusPill: some View {
        HStack(spacing: 7) {
            Circle()
                .fill(controller.connected ? Color(hex: 0x2bb673) : Color(hex: 0xb8bdc7))
                .frame(width: 8, height: 8)
                .shadow(color: controller.connected ? Color(hex: 0x2bb673).opacity(0.3) : .clear, radius: 4)
            Text(controller.connected ? "已连接" : "未连接")
                .font(.system(size: 13))
                .foregroundStyle(Color.mutedText)
        }
        .padding(.horizontal, 14)
        .padding(.vertical, 6)
        .background(Color.white.opacity(0.62), in: Capsule())
        .overlay(Capsule().strokeBorder(Color.white.opacity(0.6), lineWidth: 1))
    }

    // MARK: - 风扇区域
    private var fanArea: some View {
        VStack(spacing: 20) {
            FanBladesView(power: status.power, speed: status.speed, mode: mode)
                .frame(width: fanSize, height: fanSize)
                .onTapGesture { controller.togglePower() }

            // 状态文字
            fanStatusLabel

            // 扇叶样式切换（暂注释，默认端正样式）
            // HStack(spacing: 8) {
            //     styleButton("端正", style: "a")
            //     styleButton("斜叶", style: "b")
            // }
        }
        .padding(.top, 4)
    }

    private var fanStatusLabel: some View {
        Text(fanStatusText)
            .font(.system(size: 15, weight: .semibold))
            .foregroundStyle(status.power ? Color.airmatePrimary : Color.mutedText)
            .padding(.horizontal, 20)
            .padding(.vertical, 6)
            .background(Color.white.opacity(0.62), in: Capsule())
            .overlay(Capsule().strokeBorder(Color.white.opacity(0.6), lineWidth: 1))
    }

    /// 风扇尺寸：固定 220pt（避免 UIScreen 在某些模式下返回物理像素导致撑爆布局）
    private var fanSize: CGFloat { 220 }

    private var fanStatusText: String {
        if !status.power { return "已关机" }
        if status.speed == 0 { return "待机" }
        if mode == .normal && status.speed == stormGear { return "暴风" }
        if mode != .normal { return "\(mode.label) · \(status.speed) 档" }
        return "标准风 · \(status.speed) 档"
    }

    // MARK: - 风速卡片
    private var speedCard: some View {
        card {
            VStack(alignment: .leading, spacing: 14) {
                gearSlider
            }
        }
    }

    private var gearSlider: some View {
        let range = mode.gearRange
        let count = range.count
        return VStack(spacing: 8) {
            // 档位文字 + 当前档
            HStack {
                Text("档位")
                    .font(.system(size: 13))
                    .foregroundStyle(Color.mutedText)
                Spacer()
                Text("\(status.gear) 档")
                    .font(.system(size: 13, weight: .semibold))
                    .foregroundStyle(Color.airmatePrimary)
            }
            // 刻度点（用 HStack 等分布局，不撑爆宽度）
            HStack(spacing: 0) {
                ForEach(0..<count, id: \.self) { i in
                    Circle()
                        .fill(i <= (status.gear - range.lowerBound) ? Color.airmatePrimary : Color(hex: 0xd2d7df))
                        .frame(width: 12, height: 12)
                        .overlay(Circle().strokeBorder(Color.white, lineWidth: 2))
                        .frame(maxWidth: .infinity)
                }
            }
            // Slider（系统组件，自带宽度约束）
            Slider(
                value: Binding(
                    get: { Double(status.gear - range.lowerBound) },
                    set: { controller.setSpeed(range.lowerBound + Int($0.rounded())) }
                ),
                in: 0...Double(max(count - 1, 1)),
                step: 1
            )
            .tint(.airmatePrimary)
        }
    }

    // MARK: - 开关卡片（含定时）
    private var switchCard: some View {
        card {
            VStack(spacing: 0) {
                switchRow("左右摆头", isOn: status.swing) { controller.setSwing($0) }
                Divider().opacity(0.5)
                switchRow("屏显", isOn: status.display) { controller.setDisplay($0) }
                Divider().opacity(0.5)
                timerRow
            }
        }
    }

    private func switchRow(_ title: String, isOn: Bool, action: @escaping (Bool) -> Void) -> some View {
        HStack {
            Text(title).font(.system(size: 15))
            Spacer()
            Toggle("", isOn: Binding(get: { isOn }, set: action))
                .labelsHidden()
                .tint(.airmatePrimary)
        }
        .padding(.vertical, 12)
    }

    // MARK: - 定时行（下拉直接发指令，无设置按钮）
    private var timerRow: some View {
        HStack {
            Text("定时关机").font(.system(size: 15))
            Spacer()
            Picker("", selection: Binding(
                get: { status.timer },
                set: { controller.setTimer($0) }
            )) {
                Text("取消").tag(0)
                ForEach(1...15, id: \.self) { h in
                    Text("\(h) 小时").tag(h)
                }
            }
            .pickerStyle(.menu)
            .tint(.airmatePrimary)
        }
        .padding(.vertical, 12)
    }

    // MARK: - 原始数据卡片
    private var rawCard: some View {
        card {
            VStack(alignment: .leading, spacing: 8) {
                Text("原始数据").font(.system(size: 14, weight: .medium)).foregroundStyle(Color.mutedText)
                Text(status.raw.isEmpty ? "—" : status.raw)
                    .font(.system(size: 11))
                    .foregroundStyle(Color.mutedText)
                    .frame(maxWidth: .infinity, alignment: .center)
                    .padding(10)
                    .background(Color(hex: 0xf1f3f7).opacity(0.7), in: RoundedRectangle(cornerRadius: 12))
            }
        }
    }

    // MARK: - 卡片容器
    private func card<Content: View>(@ViewBuilder content: () -> Content) -> some View {
        content()
            .padding(20)
            .background(Color.white.opacity(0.62), in: RoundedRectangle(cornerRadius: 22))
            .overlay(RoundedRectangle(cornerRadius: 22).strokeBorder(Color.white.opacity(0.6), lineWidth: 1))
            .shadow(color: Color(hex: 0x1f2733).opacity(0.10), radius: 12, y: 4)
    }

    // MARK: - toast
    private func toastPill(_ msg: String) -> some View {
        Text(msg)
            .font(.system(size: 13))
            .foregroundStyle(Color.mutedText)
            .padding(.horizontal, 18)
            .padding(.vertical, 10)
            .background(Color.white.opacity(0.62), in: Capsule())
            .overlay(Capsule().strokeBorder(Color.white.opacity(0.6), lineWidth: 1))
            .shadow(color: Color.black.opacity(0.10), radius: 10, y: 4)
            .padding(.bottom, 24)
            .transition(.move(edge: .bottom).combined(with: .opacity))
    }
}
