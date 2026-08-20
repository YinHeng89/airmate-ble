import SwiftUI

/// 主控制页（复刻 web 端 index.html 结构 + style.css 液态玻璃风）
/// 布局：header → 风扇 → 档位卡片 → 风模式卡片 → 开关卡片(摆头/屏显/定时) → 原始数据
struct ControlView: View {
    @EnvironmentObject private var controller: FanController
    @State private var showScanner = false
    /// 拖动中的本地档位（仅在拖动时覆盖显示，松手才真正下发指令）
    @State private var dragGear: Int? = nil

    private var status: FanStatus { controller.status }
    private var mode: FanMode { status.fanMode }
    private let stormGear = 13

    var body: some View {
        ZStack {
            backgroundGradient.ignoresSafeArea()

            ScrollView {
                VStack(spacing: 16) {
                    header
                    fanArea
                    speedCard
                    modeCard
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
        .ignoresSafeArea(edges: .bottom)
        .sheet(isPresented: $showScanner) {
            ConnectionView(dismiss: { showScanner = false })
                .environmentObject(controller)
        }
        .overlay(alignment: .bottom) {
            if let toast = controller.toast {
                toastPill(toast)
            }
        }
    }

    // MARK: - 背景
    private var backgroundGradient: some View {
        GeometryReader { g in
            ZStack(alignment: .topLeading) {
                LinearGradient(colors: [Color(hex: 0xeef2fb), Color(hex: 0xf1edf6), Color(hex: 0xeaf1f8)],
                               startPoint: .topLeading, endPoint: .bottomTrailing)
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
                .foregroundStyle(Color(hex: 0x1f2733))
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
        FanBladesView(power: status.power, speed: status.speed, mode: mode)
            .frame(width: fanSize, height: fanSize)
            .onTapGesture { controller.togglePower() }
            // 状态文字悬浮在风扇底部外缘（与 web 端 .fan-status 的 bottom: -6px 一致）
            .overlay(alignment: .bottom) {
                fanStatusLabel
                    // 负值让标签向下突出风扇外缘
                    .padding(.bottom, -14)
            }
            .padding(.top, 4)
            // 状态文字需要渲染在风扇下方，留出空间让标签不遮挡「风速」卡片（并让下方卡片上移）
            .padding(.bottom, 22)
    }

    private var fanStatusLabel: some View {
        Text(fanStatusText)
            .font(.system(size: 14, weight: .semibold))
            .foregroundStyle(status.power ? Color.airmatePrimary : Color.mutedText)
            .padding(.horizontal, 18)
            .padding(.vertical, 6)
            // 液态玻璃背景：backdrop-blur + 半透明白
            .background {
                Capsule()
                    .fill(Color.white.opacity(0.62))
                    .overlay(
                        Capsule().strokeBorder(Color.white.opacity(0.85), lineWidth: 0.5)
                    )
                    .background(
                        Capsule()
                            .fill(.ultraThinMaterial)
                    )
            }
            // 顶部高光内描边（仿 web 端 --glass-hi: inset 0 1px 1px rgba(255,255,255,.85)）
            .overlay(
                Capsule()
                    .strokeBorder(
                        LinearGradient(
                            colors: [Color.white.opacity(0.85), Color.white.opacity(0.0)],
                            startPoint: .top, endPoint: .bottom
                        ),
                        lineWidth: 1
                    )
            )
            .shadow(color: Color.black.opacity(0.10), radius: 8, y: 3)
    }

    /// 风扇尺寸：固定 220pt
    private var fanSize: CGFloat { 220 }

    private var fanStatusText: String {
        if !controller.connected { return "未连接" }
        if !status.power { return "已关机" }
        if status.speed == 0 { return "待机" }
        if mode == .normal && status.speed == stormGear { return "暴风" }
        if mode != .normal { return "\(mode.label) · \(status.speed) 档" }
        return "标准风 · \(status.speed) 档"
    }

    // MARK: - 档位卡片（还原 web 端「风速」滑块：横线 + 刻度点 + 可拖动圆形 thumb）
    private var speedCard: some View {
        card {
            VStack(alignment: .leading, spacing: 0) {
                Text("风速").font(.system(size: 14, weight: .medium)).foregroundStyle(Color.mutedText)
                gearSlider
            }
        }
    }

    private var gearSlider: some View {
        let range = mode.gearRange
        let count = range.count
        // 拖动中用本地 dragGear，未拖动时用设备真实档位
        let displayGear = dragGear ?? status.gear
        let idx = min(max(displayGear - range.lowerBound, 0), max(count - 1, 0))
        let denominator = CGFloat(max(count - 1, 1))
        // thumb 半宽，用于把圆形 thumb 中心定位到首/末刻度（web 端 padding 0 22px 效果）
        let thumbHalf: CGFloat = 20

        return GeometryReader { geo in
            let trackWidth = geo.size.width - thumbHalf * 2
            ZStack(alignment: .leading) {
                // 轨道横线（6px 圆角灰线）
                Capsule()
                    .fill(Color(hex: 0x1f2733).opacity(0.10))
                    .frame(height: 6)
                    .frame(width: trackWidth)
                    .frame(maxHeight: .infinity)
                    .offset(x: thumbHalf)

                // 刻度点
                ForEach(0..<count, id: \.self) { i in
                    Circle()
                        .fill(i <= idx ? Color.airmatePrimary : Color(hex: 0xd2d7df))
                        .frame(width: 12, height: 12)
                        .overlay(Circle().strokeBorder(Color.white, lineWidth: 2))
                        .position(x: thumbHalf + trackWidth * CGFloat(i) / denominator, y: geo.size.height / 2)
                }

                // 可拖动圆形 thumb（含档位数字）
                Text("\(displayGear)")
                    .font(.system(size: 16, weight: .bold))
                    .foregroundStyle(.white)
                    .frame(width: 40, height: 40)
                    .background(
                        LinearGradient(colors: [.airmatePrimary, .airmatePrimaryHover],
                                       startPoint: .topLeading, endPoint: .bottomTrailing),
                        in: Circle()
                    )
                    .overlay(Circle().strokeBorder(Color.white, lineWidth: 3))
                    .shadow(color: Color.airmatePrimary.opacity(0.35), radius: 8, y: 3)
                    .position(x: thumbHalf + trackWidth * CGFloat(idx) / denominator, y: geo.size.height / 2)
                    .gesture(
                        DragGesture(minimumDistance: 0)
                            .onChanged { v in
                                let ratio = min(max((v.location.x - thumbHalf) / trackWidth, 0), 1)
                                let gear = range.lowerBound + Int((ratio * CGFloat(count - 1)).rounded())
                                // 拖动中：只更新本地视觉 + 轻震动，不下发指令
                                if dragGear != gear {
                                    dragGear = gear
                                    UIImpactFeedbackGenerator(style: .light).impactOccurred()
                                }
                            }
                            .onEnded { _ in
                                // 松手：才真正下发一次档位指令
                                if let g = dragGear {
                                    controller.setSpeed(g)
                                }
                                dragGear = nil
                            }
                    )
            }
            // 点击轨道任意位置直接跳到对应档位（不依赖拖拽）
            .contentShape(Rectangle())
            .onTapGesture { location in
                let ratio = min(max((location.x - thumbHalf) / trackWidth, 0), 1)
                let gear = range.lowerBound + Int((ratio * CGFloat(count - 1)).rounded())
                UIImpactFeedbackGenerator(style: .light).impactOccurred()
                controller.setSpeed(gear)
            }
        }
        .frame(height: 44)
        .padding(.top, 6)
    }

    // MARK: - 风模式卡片（放档位下面）
    private var modeCard: some View {
        card {
            VStack(alignment: .leading, spacing: 14) {
                Text("风模式").font(.system(size: 14, weight: .medium)).foregroundStyle(Color.mutedText)
                HStack(spacing: 10) {
                    ForEach([FanMode.normal, .nature, .sleep, .storm], id: \.self) { m in
                        modeButton(m)
                    }
                }
            }
        }
    }

    private func modeButton(_ m: FanMode) -> some View {
        let active: Bool
        if m == .storm {
            // 暴风：标准风 mode + 13 档
            active = (mode == .normal && status.speed == stormGear)
        } else if m == .normal {
            // 标准风：mode==标准 且 非 13 档
            active = (mode == .normal && status.speed != stormGear)
        } else {
            active = (mode == m)
        }
        return Button {
            UIImpactFeedbackGenerator(style: .light).impactOccurred()
            controller.setMode(m)
        } label: {
            Text(m.label)
                .font(.system(size: 13, weight: .semibold))
                .frame(maxWidth: .infinity)
                .padding(.vertical, 13)
                .foregroundStyle(active ? .white : Color(hex: 0x1f2733))
                .background(
                    active
                    ? AnyShapeStyle(LinearGradient(colors: [.airmatePrimary, .airmatePrimaryHover],
                                                   startPoint: .topLeading, endPoint: .bottomTrailing))
                    : AnyShapeStyle(Color.white.opacity(0.62))
                )
                .clipShape(RoundedRectangle(cornerRadius: 16))
                .overlay(RoundedRectangle(cornerRadius: 16).strokeBorder(active ? Color.clear : Color.white.opacity(0.6), lineWidth: 1))
                .shadow(color: active ? Color.airmatePrimary.opacity(0.3) : Color.black.opacity(0.05), radius: 8, y: 3)
        }
        .buttonStyle(.plain)
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
            Text(title).font(.system(size: 15)).foregroundStyle(Color(hex: 0x1f2733))
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
            Text("定时关机").font(.system(size: 15)).foregroundStyle(Color(hex: 0x1f2733))
            Spacer()
            Picker("", selection: Binding(
                get: { status.timer },
                set: {
                    UIImpactFeedbackGenerator(style: .light).impactOccurred()
                    controller.setTimer($0)
                }
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
