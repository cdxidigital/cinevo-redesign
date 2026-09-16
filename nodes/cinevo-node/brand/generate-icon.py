#!/usr/bin/env python3
"""Draw the CINEVO Node mark and emit PNG, ICO, and ICNS."""
from __future__ import annotations

import struct
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent
BLACK = (11, 11, 11, 255)
WHITE = (245, 245, 245, 255)
BLUE = (59, 123, 255, 255)
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"


def rounded_mask(size: int, radius: int) -> Image.Image:
    m = Image.new("L", (size, size), 0)
    d = ImageDraw.Draw(m)
    d.rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=255)
    return m


def draw_mark(size: int) -> Image.Image:
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    radius = max(2, round(size * 0.22))
    body = Image.new("RGBA", (size, size), BLACK)
    img.paste(body, (0, 0), rounded_mask(size, radius))
    d = ImageDraw.Draw(img)

    # Letterbox bars — a 2.39:1 screen inside the mark
    bar = max(1, round(size * 0.07))
    inset = max(1, round(size * 0.12))
    d.rectangle((inset, inset, size - inset, inset + bar), fill=WHITE)
    d.rectangle((inset, size - inset - bar, size - inset, size - inset), fill=BLUE)

    font_size = int(size * (0.52 if size >= 64 else 0.58))
    try:
        font = ImageFont.truetype(FONT, font_size)
    except OSError:
        font = ImageFont.load_default()
    letter = "C"
    bbox = d.textbbox((0, 0), letter, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x = (size - tw) / 2 - bbox[0]
    y = (size - th) / 2 - bbox[1] + size * 0.02
    d.text((x, y), letter, font=font, fill=WHITE)
    if size >= 64:
        img = img.filter(ImageFilter.UnsharpMask(radius=1, percent=80, threshold=2))
        img.putalpha(rounded_mask(size, radius))
    return img


def write_icns(path: Path, pngs: dict[str, bytes]) -> None:
    chunks = []
    for tag, data in pngs.items():
        size = 8 + len(data)
        chunks.append(tag.encode("ascii") + struct.pack(">I", size) + data)
    body = b"".join(chunks)
    path.write_bytes(b"icns" + struct.pack(">I", 8 + len(body)) + body)


def main() -> None:
    ROOT.mkdir(parents=True, exist_ok=True)
    sizes = [16, 32, 48, 64, 128, 256, 512, 1024]
    rasters = {s: draw_mark(s) for s in sizes}
    for s, im in rasters.items():
        im.save(ROOT / f"icon-{s}.png", "PNG")
    rasters[256].save(ROOT / "icon.png", "PNG")
    rasters[32].save(ROOT / "favicon.png", "PNG")
    rasters[256].save(
        ROOT / "icon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)],
    )
    icns_map = {
        "icp4": rasters[16],
        "icp5": rasters[32],
        "icp6": rasters[64],
        "ic07": rasters[128],
        "ic08": rasters[256],
        "ic09": rasters[512],
        "ic10": rasters[1024],
        "ic11": rasters[32],
        "ic12": rasters[64],
        "ic13": rasters[256],
        "ic14": rasters[512],
    }
    pngs = {}
    for tag, im in icns_map.items():
        buf = __import__("io").BytesIO()
        im.save(buf, "PNG")
        pngs[tag] = buf.getvalue()
    write_icns(ROOT / "AppIcon.icns", pngs)
    print("wrote CINEVO icons in", ROOT)


if __name__ == "__main__":
    main()
