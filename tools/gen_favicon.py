#!/usr/bin/env python3
"""从 AI 生成的源图生成多分辨率 favicon.ico 与 favicon.png。

用法:
    python3 tools/gen_favicon.py

默认读取 static/favicon-source.png（建议 1024x1024 以上），输出到 static/ 目录：
    - favicon.ico : 含 16/24/32/48/64/128/256 多分辨率 ICO
    - favicon.png : 256x256 PNG

如没有源图，可先用 image_gen 等工具生成并保存为 static/favicon-source.png。
"""
import io
import os
import struct
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATIC_DIR = os.path.join(ROOT, "static")
TOOLS_DIR = os.path.dirname(os.path.abspath(__file__))
SOURCE = os.path.join(TOOLS_DIR, "favicon-source.png")
ICO_OUT = os.path.join(STATIC_DIR, "favicon.ico")
PNG_OUT = os.path.join(STATIC_DIR, "favicon.png")
SIZES = [16, 24, 32, 48, 64, 128, 256]


def build_ico(source_path: str, ico_path: str, sizes=None) -> list[Image.Image]:
    if sizes is None:
        sizes = SIZES
    src = Image.open(source_path).convert("RGBA")
    imgs = [src.resize((s, s), Image.LANCZOS) for s in sizes]

    pngs = []
    for im in imgs:
        buf = io.BytesIO()
        im.save(buf, format="PNG")
        pngs.append(buf.getvalue())

    data = struct.pack("<HHH", 0, 1, len(imgs))
    offset = 6 + len(imgs) * 16
    for im, png in zip(imgs, pngs):
        w, h = im.size
        bw = 0 if w >= 256 else w
        bh = 0 if h >= 256 else h
        data += struct.pack("<BBBBHHII", bw, bh, 0, 0, 1, 32, len(png), offset)
        offset += len(png)
    for png in pngs:
        data += png

    with open(ico_path, "wb") as f:
        f.write(data)
    return imgs


def main():
    if not os.path.exists(SOURCE):
        print(f"[!] 未找到源图: {SOURCE}")
        print("    请先用 image_gen 等工具生成 1024x1024 图标并保存为该路径")
        return

    imgs = build_ico(SOURCE, ICO_OUT)
    imgs[-1].save(PNG_OUT, format="PNG")

    print(f"[✓] {ICO_OUT} ({len(SIZES)} sizes: {SIZES})")
    print(f"[✓] {PNG_OUT} (256x256)")


if __name__ == "__main__":
    main()
