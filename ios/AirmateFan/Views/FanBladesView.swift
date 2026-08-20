import SwiftUI

// MARK: - 与 web 端 style.css 一致的颜色
extension Color {
    init(hex: UInt32) {
        let r = Double((hex >> 16) & 0xFF) / 255.0
        let g = Double((hex >> 8) & 0xFF) / 255.0
        let b = Double(hex & 0xFF) / 255.0
        self.init(red: r, green: g, blue: b)
    }
    static let airmatePrimary = Color(hex: 0x3b6ef5)
    static let airmatePrimaryHover = Color(hex: 0x2f5fe0)
    static let mutedText = Color(hex: 0x8a909c)
}

/// 五叶风扇可视化（基于传入 rect 的归一化坐标，保证叶片正确居中显示）
struct FanBladesView: View {
    let power: Bool
    let speed: Int
    let mode: FanMode

    @State private var angle: Double = 0

    private var isSpinning: Bool { power && speed > 0 }
    private var duration: Double { max(0.4, 3.2 - Double(speed) * 0.22) }

    var body: some View {
        GeometryReader { geo in
            let size = min(geo.size.width, geo.size.height)
            ZStack {
                // 外罩圆环
                Circle()
                    .fill(Color.white.opacity(0.62))
                    .overlay(Circle().strokeBorder(power ? Color.airmatePrimary : Color.white.opacity(0.6), lineWidth: 1))
                    .shadow(color: power ? Color.airmatePrimary.opacity(0.35) : Color.black.opacity(0.10),
                            radius: power ? 36 : 12, y: 4)

                // 底盘四层（基于 size 归一化）
                fanDisc(size: size)

                // 叶片组（基于 size 归一化，旋转）
                ZStack {
                    ForEach(0..<5) { i in
                        bladeShape(size: size)
                            .rotationEffect(.degrees(Double(i) * 72 - 90))
                    }
                }
                .frame(width: size, height: size)
                .rotationEffect(.degrees(angle))

                // 中心 hub
                Circle()
                    .fill(power
                          ? LinearGradient(colors: [.airmatePrimary, .airmatePrimaryHover],
                                           startPoint: .topLeading, endPoint: .bottomTrailing)
                          : LinearGradient(colors: [.white, Color(hex: 0xe9ecf2)],
                                           startPoint: .top, endPoint: .bottom))
                    .overlay(Circle().strokeBorder(power ? Color.clear : Color.black.opacity(0.10), lineWidth: 1))
                    .frame(width: size * 0.20, height: size * 0.20)
                    .shadow(color: power ? Color.airmatePrimary.opacity(0.35) : Color.black.opacity(0.05),
                            radius: 16, y: 3)

                Circle()
                    .fill(power ? Color.white : Color(hex: 0xc8ccd4))
                    .frame(width: size * 0.072, height: size * 0.072)
            }
            .frame(width: size, height: size)
            .position(x: geo.size.width / 2, y: geo.size.height / 2)
            .onAppear { restartAnimation() }
            .onChange(of: isSpinning) { _, _ in restartAnimation() }
            .onChange(of: duration) { _, _ in restartAnimation() }
        }
        .aspectRatio(1, contentMode: .fit)
    }

    // MARK: - 底盘（outer / inner / hub / center，基于 size 归一化）
    private func fanDisc(size: CGFloat) -> some View {
        ZStack {
            Circle()
                .fill(power ? Color.airmatePrimary.opacity(0.06) : Color.black.opacity(0.04))
                .frame(width: size * 0.937, height: size * 0.937)
            Circle()
                .stroke(power ? Color.airmatePrimary.opacity(0.18) : Color.black.opacity(0.10), lineWidth: 1)
                .frame(width: size * 0.863, height: size * 0.863)
            Circle()
                .fill(power ? Color.airmatePrimary : Color(hex: 0xe9ecf2))
                .overlay(Circle().stroke(power ? Color.clear : Color.black.opacity(0.10), lineWidth: 2))
                .frame(width: size * 0.213, height: size * 0.213)
            Circle()
                .fill(power ? Color.white : Color(hex: 0xc2c8d2))
                .frame(width: size * 0.063, height: size * 0.063)
        }
    }

    // MARK: - 叶片（归一化：path 基于传入 rect 中心 + 比例）
    /// size: 叶片容器尺寸。叶片从中心(0.5,0.5) 向上延伸到 (0.5, 0.07)
    private func bladeShape(size: CGFloat) -> some View {
        // 把 path 坐标系转为：中心 (0.5w, 0.5h)，叶片占据约 0.5w × 0.86h
        // web 端 viewBox 1024，叶片坐标 512±x、512-y → 归一化到 rect
        let w = size
        let h = size
        let cx = w * 0.5
        let cy = h * 0.5
        // 统一缩放：web 端叶片垂直跨度约 430 单位（512→82），在 1024 viewBox 占 0.42，
        // 叶片总高（上下两片）占 0.84。让叶片在风扇尺寸里垂直占 0.84（与 web 一致）。
        let s = size * 0.84 / 1024.0

        return ZStack {
            // 叶片填充（银灰渐变 / 开机蓝紫）
            BladePath(scale: s, cx: cx, cy: cy)
                .fill(
                    power
                    ? AnyShapeStyle(Color.airmatePrimary)
                    : AnyShapeStyle(LinearGradient(colors: [Color(hex: 0xAAB3C0), Color(hex: 0x919BA8)],
                                                   startPoint: .topLeading, endPoint: .bottomTrailing))
                )
            // 白色高光描边
            BladeHighlightPath(scale: s, cx: cx, cy: cy)
                .stroke(Color.white.opacity(power ? 0.9 : 0.85), style: StrokeStyle(lineWidth: 2.0, lineCap: .round))
        }
        .frame(width: w, height: h)
    }

    private func restartAnimation() {
        guard isSpinning else {
            withAnimation(.linear(duration: 0.4)) {
                angle = angle.truncatingRemainder(dividingBy: 360)
            }
            return
        }
        withAnimation(.linear(duration: duration).repeatForever(autoreverses: false)) {
            angle += 360
        }
    }
}

/// 叶片填充 path（保留贝塞尔曲线，以 (cx, cy) 为中心按 scale 变换）
private struct BladePath: Shape {
    let scale: CGFloat
    let cx: CGFloat
    let cy: CGFloat

    func path(in rect: CGRect) -> Path {
        func P(_ x: CGFloat, _ y: CGFloat) -> CGPoint {
            CGPoint(x: cx + (x - 512) * scale, y: cy + (y - 512) * scale)
        }
        var p = Path()
        p.move(to: P(532, 512))
        p.addCurve(to: P(657, 287),
                   control1: P(567, 492),
                   control2: P(622, 407))
        p.addCurve(to: P(647, 82),
                   control1: P(687, 182),
                   control2: P(687, 102))
        p.addCurve(to: P(512, 207),
                   control1: P(607, 62),
                   control2: P(552, 122))
        p.addCurve(to: P(512, 492),
                   control1: P(467, 302),
                   control2: P(467, 402))
        p.addCurve(to: P(532, 512),
                   control1: P(517, 502),
                   control2: P(524, 508))
        p.closeSubpath()
        return p
    }
}

/// 叶片高光 path（保留贝塞尔曲线）
private struct BladeHighlightPath: Shape {
    let scale: CGFloat
    let cx: CGFloat
    let cy: CGFloat

    func path(in rect: CGRect) -> Path {
        func P(_ x: CGFloat, _ y: CGFloat) -> CGPoint {
            CGPoint(x: cx + (x - 512) * scale, y: cy + (y - 512) * scale)
        }
        var p = Path()
        p.move(to: P(520, 494))
        p.addCurve(to: P(540, 232),
                   control1: P(497, 407),
                   control2: P(504, 322))
        p.addCurve(to: P(637, 92),
                   control1: P(567, 162),
                   control2: P(602, 117))
        return p
    }
}

#Preview {
    ZStack { Color(hex: 0xeef1f6).ignoresSafeArea() }
        .overlay(FanBladesView(power: true, speed: 6, mode: .normal))
}