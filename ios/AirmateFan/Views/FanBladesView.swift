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

/// 五叶风扇可视化 —— 完全复刻 web 端 index.html + style.css 结构
/// 结构：fan-ring（液态玻璃外罩）→ fan-disc（底盘 SVG）→ 5 片 blade → fan-hub（中心圆）
struct FanBladesView: View {
    let power: Bool
    let speed: Int
    let mode: FanMode

    @State private var angle: Double = 0
    /// 上次帧的时间戳（用于按真实时间差推进角度，转速稳定不跳变）
    @State private var lastTick: Date? = nil
    /// 当前转速系数（0~1）：用于缓启/缓停的平滑过渡
    @State private var speedFactor: Double = 0
    /// 当前实际动画时长（秒）：向目标时长平滑过渡，实现调速时的平滑加速/减速
    @State private var currentDuration: Double = 3.2

    private var isSpinning: Bool { power && speed > 0 }
    /// 目标动画时长（由 speed 决定）：时长越短转速越快
    private var targetDuration: Double { max(0.4, 3.2 - Double(speed) * 0.22) }

    /// 缓启/缓停的速率：每秒系数变化量（约 1.2s 完成一次 0↔1 过渡）
    private let rampRate: Double = 0.85
    /// 调速过渡速率：每秒向目标时长逼近的比例（越大越快）
    /// 1.8 让模式切换这种大跨度转速变化也有明显、柔和的过渡（约 0.5~0.8s 完成）
    private let durationRamp: Double = 1.8

    var body: some View {
        GeometryReader { geo in
            let size = min(geo.size.width, geo.size.height)
            ZStack {
                // 1. 外罩圆环（液态玻璃盘）
                fanRing(size: size)

                // 2. 底盘（四层同心圆，与 web fan-disc-svg 一致）
                fanDisc(size: size)

                // 3. 叶片组（5 片，整体旋转 angle）
                // drawingGroup 将叶片组预渲染成位图，旋转时只做 GPU transform，
                // 避免每帧重新光栅化贝塞尔曲线，消除掉帧。
                ZStack {
                    ForEach(0..<5) { i in
                        bladeShape(size: size)
                            .rotationEffect(.degrees(bladeAngles[i]))
                    }
                }
                .frame(width: size, height: size)
                .drawingGroup()
                .rotationEffect(.degrees(angle))

                // 4. 中心 hub（44px 圆 + 16px 内芯，与 web .fan-hub 一致）
                fanHub(size: size)
            }
            .frame(width: size, height: size)
            .position(x: geo.size.width / 2, y: geo.size.height / 2)
        }
        .aspectRatio(1, contentMode: .fit)
        // 持续驱动的 TimelineView：每帧按真实时间差推进角度，并用 speedFactor 做缓启/缓停。
        // 目标：转=1，停=0；speedFactor 每帧向目标平滑逼近，避免突然启动/停止。
        .overlay {
            TimelineView(.animation(minimumInterval: 1.0 / 60.0)) { context in
                Color.clear
                    .onAppear { lastTick = context.date }
                    .onChange(of: context.date) { _, newDate in
                        let dt = lastTick.map { newDate.timeIntervalSince($0) } ?? 0
                        lastTick = newDate
                        advance(by: dt)
                    }
            }
        }
        .onChange(of: isSpinning) { _, spinning in
            // 切换瞬间重置时间基准，避免 dt 计算跳变
            lastTick = nil
        }
    }

    /// 每帧推进：speedFactor 平滑逼近目标值，currentDuration 平滑逼近目标时长，再按两者旋转
    private func advance(by dt: Double) {
        // 1. 缓启/缓停系数
        let target: Double = isSpinning ? 1 : 0
        if speedFactor < target {
            speedFactor = min(speedFactor + rampRate * dt, target)
        } else if speedFactor > target {
            speedFactor = max(speedFactor - rampRate * dt, target)
        }
        // 2. 调速平滑过渡：仅在「正在旋转」时让 currentDuration 跟随 targetDuration。
        //    缓停/关机时冻结 currentDuration（保持关停前的转速），只用 speedFactor 降速，
        //    避免「先突变再降速」的怪现象。
        if isSpinning && currentDuration != targetDuration {
            let diff = targetDuration - currentDuration
            currentDuration += diff * durationRamp * dt
            // 足够接近时直接落到目标，避免无限逼近
            if abs(currentDuration - targetDuration) < 0.01 {
                currentDuration = targetDuration
            }
        }
        // 3. 推进角度：每转一圈 360°，按 currentDuration 与 speedFactor 换算
        if speedFactor > 0 {
            angle = (angle + dt / currentDuration * 360 * speedFactor).truncatingRemainder(dividingBy: 360)
        }
    }

    /// 5 片叶片的内部旋转角（web 端：-90, -18, 54, 126, 198，各相差 72°）
    private let bladeAngles: [Double] = [-90, -18, 54, 126, 198]

    // MARK: - 外罩圆环（.fan-ring：玻璃盘 + 开机蓝紫描边/光晕）
    private func fanRing(size: CGFloat) -> some View {
        Circle()
            .fill(Color.white.opacity(0.62))
            .overlay(
                Circle().strokeBorder(power ? Color.airmatePrimary : Color.white.opacity(0.6), lineWidth: 1)
            )
            .shadow(color: power ? Color.airmatePrimary.opacity(0.35) : Color.black.opacity(0.10),
                    radius: power ? 36 : 12, y: 4)
    }

    // MARK: - 底盘（.fan-disc-svg，viewBox 320，中心 160）
    // outer r150 / inner r138(stroke) / hub r34 / center r10
    private func fanDisc(size: CGFloat) -> some View {
        // web 端 viewBox 320，底盘直径 320 即 100%；此处 size 即外罩内径
        let r = size / 2
        return ZStack {
            Circle()
                .fill(power ? Color.airmatePrimary.opacity(0.06) : Color(hex: 0x1f2733).opacity(0.04))
                .frame(width: size * (150.0 / 160.0), height: size * (150.0 / 160.0))
            Circle()
                .stroke(power ? Color.airmatePrimary.opacity(0.18) : Color(hex: 0x1f2733).opacity(0.10), lineWidth: 1)
                .frame(width: size * (138.0 / 160.0), height: size * (138.0 / 160.0))
            Circle()
                .fill(power ? Color.airmatePrimary : Color(hex: 0xe9ecf2))
                .overlay(Circle().stroke(power ? Color.clear : Color(hex: 0x1f2733).opacity(0.10), lineWidth: 2))
                .frame(width: size * (34.0 / 160.0), height: size * (34.0 / 160.0))
            Circle()
                .fill(power ? Color.white : Color(hex: 0xc2c8d2))
                .frame(width: size * (10.0 / 160.0), height: size * (10.0 / 160.0))
        }
    }

    // MARK: - 中心 hub（.fan-hub：44px 圆 + .hub-icon 16px 内芯）
    // 注意：web 端底盘 svg 里已有 hub r34，此处 .fan-hub 是独立叠加的 44px 圆
    private func fanHub(size: CGFloat) -> some View {
        ZStack {
            Circle()
                .fill(power
                      ? AnyShapeStyle(LinearGradient(colors: [.airmatePrimary, .airmatePrimaryHover],
                                                     startPoint: .topLeading, endPoint: .bottomTrailing))
                      : AnyShapeStyle(Color.white))
                .overlay(Circle().strokeBorder(power ? Color.clear : Color(hex: 0x1f2733).opacity(0.08), lineWidth: 1))
                .frame(width: size * (44.0 / 220.0), height: size * (44.0 / 220.0))
                .shadow(color: power ? Color.airmatePrimary.opacity(0.35) : Color.black.opacity(0.05), radius: 6, y: 3)
            Circle()
                .fill(power ? Color.white : Color(hex: 0xc8ccd4))
                .frame(width: size * (16.0 / 220.0), height: size * (16.0 / 220.0))
        }
    }

    // MARK: - 叶片（复刻 web 端 blade 的 SVG path）
    // web 端：viewBox 1024，叶片 path 以中心 (512,512) 为原点；5 片分别 rotate(-90/-18/54/126/198) 后 scale(0.92)
    private func bladeShape(size: CGFloat) -> some View {
        // 叶片坐标系：中心 (cx, cy)，path 坐标是「相对中心」的（如 M20 0 表示中心右侧 20 处）
        // web 端 blade 容器宽 60% 高 50%，svg viewBox 1024 全幅 → 叶片实际占据约 0.42 * size 的垂直跨度
        // 这里用 scale 把 1024 viewBox 的 path 缩放到 size，再额外乘 0.92（web 端 blade 内部 scale(0.92)）
        let cx = size / 2
        let cy = size / 2
        let s = size / 1024.0 * 0.92

        return ZStack {
            // 叶片填充（灰渐变 / 开机蓝紫）
            BladeFillPath(scale: s, cx: cx, cy: cy)
                .fill(
                    power
                    ? AnyShapeStyle(Color.airmatePrimary)
                    : AnyShapeStyle(LinearGradient(colors: [Color(hex: 0xAAB3C0), Color(hex: 0x919BA8)],
                                                   startPoint: .topLeading, endPoint: .bottomTrailing))
                )
            // 白色高光描边（stroke 2.5，round）
            BladeHighlightPath(scale: s, cx: cx, cy: cy)
                .stroke(Color.white.opacity(power ? 0.9 : 0.85), style: StrokeStyle(lineWidth: 2.5, lineCap: .round))
        }
        .frame(width: size, height: size)
    }
}

// MARK: - 叶片填充 path（复刻 web 端 blade-fill 的精确贝塞尔曲线，以 (cx,cy) 为中心按 scale 变换）
private struct BladeFillPath: Shape {
    let scale: CGFloat
    let cx: CGFloat
    let cy: CGFloat

    func path(in rect: CGRect) -> Path {
        // web 端 path（相对中心 512,512 的坐标）：
        // M20 0 C55 -20,110 -105,145 -225 C175 -330,175 -410,135 -430
        // C95 -450,40 -390,0 -305 C-45 -210,-45 -110,0 -20 C5 -10,12 -4,20 0 Z
        func P(_ x: CGFloat, _ y: CGFloat) -> CGPoint {
            CGPoint(x: cx + x * scale, y: cy + y * scale)
        }
        var p = Path()
        p.move(to: P(20, 0))
        p.addCurve(to: P(145, -225),
                   control1: P(55, -20), control2: P(110, -105))
        p.addCurve(to: P(135, -430),
                   control1: P(175, -330), control2: P(175, -410))
        p.addCurve(to: P(0, -305),
                   control1: P(95, -450), control2: P(40, -390))
        p.addCurve(to: P(0, -20),
                   control1: P(-45, -210), control2: P(-45, -110))
        p.addCurve(to: P(20, 0),
                   control1: P(5, -10), control2: P(12, -4))
        p.closeSubpath()
        return p
    }
}

// MARK: - 叶片高光 path（复刻 web 端 blade-highlight）
private struct BladeHighlightPath: Shape {
    let scale: CGFloat
    let cx: CGFloat
    let cy: CGFloat

    func path(in rect: CGRect) -> Path {
        // web 端高光 path：M8 -18 C-15 -105,-8 -190,28 -280 C55 -350,90 -395,125 -420
        func P(_ x: CGFloat, _ y: CGFloat) -> CGPoint {
            CGPoint(x: cx + x * scale, y: cy + y * scale)
        }
        var p = Path()
        p.move(to: P(8, -18))
        p.addCurve(to: P(28, -280),
                   control1: P(-15, -105), control2: P(-8, -190))
        p.addCurve(to: P(125, -420),
                   control1: P(55, -350), control2: P(90, -395))
        return p
    }
}

#Preview {
    ZStack { Color(hex: 0xeef1f6).ignoresSafeArea() }
        .overlay(FanBladesView(power: true, speed: 6, mode: .normal))
}
