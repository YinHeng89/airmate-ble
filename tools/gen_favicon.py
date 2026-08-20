#!/usr/bin/env python3
"""生成 AIRMATE 风扇控制 favicon (.ico 多分辨率) + 源 SVG。

图标风格与网页一致：深蓝灰渐变环形背景 + 五叶风扇叶片（沿用页面叶片 path 形）。
不依赖 cairosvg，用 Pillow 程序化绘制。
"""
import math
import io
from PIL import Image, ImageDraw

# 页面叶片 path 的关键控制点（viewBox 1024，中心 512,512），归一化到 [-1,1]
# 取 path 采样点近似：M20 0 ... 单片叶片轮廓（外缘 -> 回中心）
BLADE_PTS = [
    (20, 0), (55, -20), (110, -105), (145, -225), (175, -330),
    (175, -410), (135, -430), (95, -450), (40, -390), (0, -305),
    (-45, -210), (-45, -110), (0, -20), (5, -10), (12, -4), (20, 0),
]


def norm_blade(scale, blade_w=0.92):
    """把叶片采样点映射到以中心(0,0)、半径1为单位的坐标，blade_w 控制叶片宽度占比。"""
    out = []
    for x, y in BLADE_PTS:
        # 页面对叶片整体 scale(0.92)，且从 512,512 平移
        nx = (x * blade_w) / 512.0
        ny = (y * blade_w) / 512.0
        out.append((nx, ny))
    return out


def draw_fan(size):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    cx = cy = size / 2.0
    R = size / 2.0

    # 背景圆环（深蓝灰渐变用双环模拟）
    bg_outer = (33, 42, 58, 255)       # #212A3A
    bg_inner = (45, 56, 74, 255)       # 略亮
    d.ellipse([0, 0, size, size], fill=bg_outer)
    d.ellipse([size * 0.10, size * 0.10, size * 0.90, size * 0.90], fill=bg_inner)

    # 叶片颜色（与页面 #AAB3C0 -> #919BA8 一致，整体偏亮以便在深色底上可见）
    blade_fill = (190, 200, 214, 255)
    blade_edge = (150, 162, 178, 255)

    blade = norm_blade(scale=1.0, blade_w=0.92)
    # 叶片最大径向约 175*0.92/512 ≈ 0.314，放大到占内圈半径的 ~0.82
    radial = (size * 0.40) / 0.314

    for k in range(5):
        ang = -90 + k * 72  # 与页面第一片 -90 一致
        rad = math.radians(ang)
        ca, sa = math.cos(rad), math.sin(rad)
        poly = []
        for (nx, ny) in blade:
            # 旋转
            rx = nx * ca - ny * sa
            ry = nx * sa + ny * ca
            px = cx + rx * radial
            py = cy + ry * radial
            poly.append((px, py))
        d.polygon(poly, fill=blade_fill, outline=blade_edge)

    # 中心轴
    hub_r = size * 0.10
    d.ellipse([cx - hub_r, cy - hub_r, cx + hub_r, cy + hub_r], fill=(225, 232, 242, 255))
    dot_r = size * 0.035
    d.ellipse([cx - dot_r, cy - dot_r, cx + dot_r, cy + dot_r], fill=bg_outer)

    return img


def main():
    sizes = [16, 24, 32, 48, 64, 128, 256]
    imgs = [draw_fan(s).convert("RGBA") for s in sizes]

    # Pillow 12 的 append_images 对 ICO 多分辨率支持不稳定，
    # 这里直接把每帧存为 PNG 数据后手动拼装标准 Windows ICO 文件。
    import os
    static_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "static")
    os.makedirs(static_dir, exist_ok=True)

    write_ico(os.path.join(static_dir, "favicon.ico"), imgs)
    print("written static/favicon.ico sizes", sizes)

    # 同时导出一份 PNG（便于直接用）
    draw_fan(256).save(os.path.join(static_dir, "favicon.png"), format="PNG")
    print("written static/favicon.png")

    # 导出源 SVG（用页面原始叶片 path，便于后续手动调整）
    svg = build_svg()
    with open(os.path.join(static_dir, "favicon.svg"), "w", encoding="utf-8") as f:
        f.write(svg)
    print("written static/favicon.svg")


def build_svg():
    blade_path = ("M20 0 C55 -20,110 -105,145 -225 C175 -330,175 -410,135 -430 "
                  "C95 -450,40 -390,0 -305 C-45 -210,-45 -110,0 -20 "
                  "C5 -10,12 -4,20 0 Z")
    blades = ""
    for k in range(5):
        ang = -90 + k * 72
        blades += (f'<g transform="rotate({ang}) scale(0.92)">'
                   f'<path d="{blade_path}" fill="#BEC8D6" stroke="#96A2B2" stroke-width="3"/>'
                   f'</g>')
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
  <defs>
    <radialGradient id="bg" cx="50%" cy="42%" r="60%">
      <stop offset="0%" stop-color="#2D384A"/>
      <stop offset="100%" stop-color="#212A3A"/>
    </radialGradient>
  </defs>
  <circle cx="128" cy="128" r="128" fill="url(#bg)"/>
  <circle cx="128" cy="128" r="112" fill="#2D384A"/>
  <g transform="translate(128 128)">
    {blades}
    <circle cx="0" cy="0" r="26" fill="#E1E8F2"/>
    <circle cx="0" cy="0" r="9" fill="#212A3A"/>
  </g>
</svg>'''


def write_ico(path, imgs):
    """手动拼装含 PNG 帧的 Windows ICO 文件（支持任意尺寸、含 256px）。"""
    import struct
    pngs = []
    for im in imgs:
        buf = io.BytesIO()
        im.save(buf, format="PNG")
        pngs.append(buf.getvalue())

    count = len(imgs)
    data = struct.pack("<HHH", 0, 1, count)
    offset = 6 + count * 16

    for i, im in enumerate(imgs):
        w, h = im.size
        bw = 0 if w >= 256 else w
        bh = 0 if h >= 256 else h
        size = len(pngs[i])
        # ICO 目录项格式: width, height, colors, reserved, planes, bpp, size, offset
        data += struct.pack("<BBBBHHII", bw, bh, 0, 0, 1, 32, size, offset)
        offset += size

    for png in pngs:
        data += png

    with open(path, "wb") as f:
        f.write(data)


if __name__ == "__main__":
    main()
