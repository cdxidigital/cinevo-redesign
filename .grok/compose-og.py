#!/usr/bin/env python3
"""Compose CINEVO share cards from cinema stills + the faceted play mark."""
from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image, ImageChops, ImageDraw, ImageEnhance, ImageFilter, ImageFont

ROOT = Path("/workspace")
FONT_B = ROOT / ".grok/fonts/extras/ttf/InterDisplay-SemiBold.ttf"
STILL_OG = ROOT / "public/stills/hero-theater.jpg"
STILL_BANNER = ROOT / "public/stills/hero-theater.jpg"
WORD_SRC = ROOT / "attachments/logo-reversed-white.png"
OUT_OG = ROOT / ".grok/og.jpg.tmp"
OUT_BANNER = ROOT / ".grok/x-banner.jpg.tmp"

PINK = (255, 77, 165, 255)
PURPLE = (139, 47, 255, 255)
CYAN = (85, 207, 255, 255)
BLUE = (62, 142, 255, 255)
ORANGE = (255, 159, 28, 255)
MAGENTA = (193, 59, 224, 255)


def cover_crop(src: Image.Image, w: int, h: int, bias_x: float = 0.5, bias_y: float = 0.5) -> Image.Image:
    img = src.convert("RGB")
    scale = max(w / img.width, h / img.height)
    nw, nh = int(round(img.width * scale)), int(round(img.height * scale))
    img = img.resize((nw, nh), Image.Resampling.LANCZOS)
    left = int((nw - w) * bias_x)
    top = int((nh - h) * bias_y)
    left = max(0, min(left, nw - w))
    top = max(0, min(top, nh - h))
    return img.crop((left, top, left + w, top + h))


def grain(img: Image.Image, amount: int = 11) -> Image.Image:
    noise = Image.effect_noise(img.size, amount).convert("L")
    noise = noise.point(lambda p: 128 + (p - 128) // 3)
    return Image.blend(img, Image.merge("RGB", (noise, noise, noise)), 0.06)


def leaks(size: tuple[int, int]) -> Image.Image:
    w, h = size
    layer = Image.new("RGB", size, (0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.ellipse((int(w * 0.30), int(-h * 0.20), int(w * 0.84), int(h * 0.52)), fill=(70, 36, 150))
    d.ellipse((int(w * 0.42), int(-h * 0.16), int(w * 0.76), int(h * 0.36)), fill=(70, 170, 210))
    d.ellipse((int(-w * 0.10), int(h * 0.35), int(w * 0.28), int(h * 1.08)), fill=(180, 50, 120))
    d.ellipse((int(w * 0.72), int(h * 0.52), int(w * 1.16), int(h * 1.22)), fill=(180, 110, 30))
    return layer.filter(ImageFilter.GaussianBlur(max(48, w // 16)))


def cinematic_grade(img: Image.Image, brightness: float = 0.62, leak_mix: float = 0.22) -> Image.Image:
    img = ImageEnhance.Color(img).enhance(0.55)
    img = ImageEnhance.Contrast(img).enhance(1.18)
    img = ImageEnhance.Brightness(img).enhance(brightness)
    wash = Image.new("RGB", img.size, (22, 14, 32))
    img = Image.blend(img, wash, 0.12)
    leak = leaks(img.size)
    screened = ImageChops.screen(img, leak)
    img = Image.blend(img, screened, leak_mix)
    vig = Image.new("L", img.size, 0)
    vd = ImageDraw.Draw(vig)
    vd.ellipse(
        (int(img.width * 0.02), int(img.height * 0.03), int(img.width * 0.98), int(img.height * 0.97)),
        fill=255,
    )
    vig = vig.filter(ImageFilter.GaussianBlur(36))
    black = Image.new("RGB", img.size, (12, 10, 14))
    img = Image.composite(img, black, vig)
    return grain(img)


def draw_mark(height: int) -> Image.Image:
    scale = 4
    h = height * scale
    w = int(round(h * 110 / 135))
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    a = (0, 0)
    c = (0, h - 1)
    b = (w - 1, h // 2)
    g = ((a[0] + b[0] + c[0]) / 3.0, (a[1] + b[1] + c[1]) / 3.0)
    left_m = ((a[0] + c[0]) / 2.0, (a[1] + c[1]) / 2.0)
    top_m = ((a[0] + b[0]) / 2.0, (a[1] + b[1]) / 2.0)
    bot_m = ((c[0] + b[0]) / 2.0, (c[1] + b[1]) / 2.0)
    d.polygon([a, b, c], fill=PURPLE)
    d.polygon([a, left_m, g], fill=PINK)
    d.polygon([a, top_m, g], fill=PURPLE)
    d.polygon([b, top_m, g], fill=CYAN)
    d.polygon([b, bot_m, g], fill=BLUE)
    d.polygon([c, bot_m, g], fill=ORANGE)
    d.polygon([c, left_m, g], fill=MAGENTA)
    return img.resize((max(1, w // scale), max(1, h // scale)), Image.Resampling.LANCZOS)


def bbox_alpha(im: Image.Image, pad: int = 0) -> Image.Image:
    box = im.split()[-1].getbbox()
    if not box:
        return im
    x0, y0, x1, y1 = box
    x0, y0 = max(0, x0 - pad), max(0, y0 - pad)
    x1, y1 = min(im.width, x1 + pad), min(im.height, y1 + pad)
    return im.crop((x0, y0, x1, y1))


def extract_wordmark() -> Image.Image:
    src = Image.open(WORD_SRC).convert("RGBA")
    crop = src.crop((301, 73, 624, 142))
    arr = np.asarray(crop).astype(np.float32)
    rgb = arr[..., :3]
    bg = np.array([26, 26, 30], dtype=np.float32)
    lum = rgb.max(axis=2)
    a = np.clip((lum - bg.max()) / (255.0 - bg.max()), 0, 1)
    a = np.where(lum < 70, 0.0, a)
    a3 = np.maximum(a, 1e-6)[..., None]
    color = np.clip((rgb - bg * (1.0 - a[..., None])) / a3, 0, 255)
    out = np.dstack([color, a * 255]).astype(np.uint8)
    return bbox_alpha(Image.fromarray(out, "RGBA"), pad=1)


def tracked_text(draw: ImageDraw.ImageDraw, text: str, font, x: float, y: float, fill, tracking: float = 0) -> float:
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + tracking
    return x


def tracked_width(draw: ImageDraw.ImageDraw, text: str, font, tracking: float = 0) -> float:
    if not text:
        return 0.0
    return sum(draw.textlength(ch, font=font) for ch in text) + tracking * (len(text) - 1)


def paste_center(base: Image.Image, overlay: Image.Image, cx: int, cy: int) -> None:
    base.alpha_composite(overlay, (int(cx - overlay.width / 2), int(cy - overlay.height / 2)))


def glow_layer(src: Image.Image, radius: int, color: tuple[int, int, int, int]) -> Image.Image:
    alpha = src.split()[-1]
    layer = Image.new("RGBA", src.size, color)
    layer.putalpha(alpha)
    return layer.filter(ImageFilter.GaussianBlur(radius))


def compose_og() -> None:
    w, h = 1200, 630
    base = cover_crop(Image.open(STILL_OG), w, h, bias_x=0.5, bias_y=0.46)
    base = cinematic_grade(base, brightness=0.64, leak_mix=0.18)
    canvas = base.convert("RGBA")

    mark = draw_mark(136)
    word = extract_wordmark()
    target_w = 620
    scale = target_w / word.width
    word = word.resize((target_w, max(1, int(round(word.height * scale)))), Image.Resampling.LANCZOS)

    tag_font = ImageFont.truetype(str(FONT_B), 26)
    scratch = ImageDraw.Draw(Image.new("RGB", (10, 10)))
    tag = "Your media. Your moment."
    tag_track = 1.4
    tag_w = tracked_width(scratch, tag, tag_font, tag_track)

    gap_m, gap_t = 16, 14
    block_h = mark.height + gap_m + word.height + gap_t + 26
    y0 = int((h - block_h) / 2) - 6
    cx = w // 2

    bloom = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    bd = ImageDraw.Draw(bloom)
    bd.ellipse((cx - 300, y0 - 30, cx + 300, y0 + block_h + 40), fill=(20, 10, 28, 110))
    bloom = bloom.filter(ImageFilter.GaussianBlur(36))
    canvas = Image.alpha_composite(canvas, bloom)

    paste_center(canvas, glow_layer(mark, 12, (139, 47, 255, 140)), cx, y0 + mark.height // 2)
    paste_center(canvas, mark, cx, y0 + mark.height // 2)

    wy = y0 + mark.height + gap_m
    paste_center(canvas, glow_layer(word, 5, (0, 0, 0, 160)), cx, wy + word.height // 2)
    paste_center(canvas, word, cx, wy + word.height // 2)

    rgb = canvas.convert("RGB")
    draw = ImageDraw.Draw(rgb)
    ty = wy + word.height + gap_t
    tracked_text(draw, tag, tag_font, (w - tag_w) / 2, ty, (232, 230, 236), tag_track)

    rgb.save(OUT_OG, "JPEG", quality=90, optimize=True, subsampling=1)


def compose_banner() -> None:
    w, h = 1200, 264
    base = cover_crop(Image.open(STILL_BANNER), w, h, bias_x=0.42, bias_y=0.40)
    base = cinematic_grade(base, brightness=0.58, leak_mix=0.14)
    grad = Image.new("L", (w, h))
    gp = grad.load()
    for x in range(w):
        t = min(1.0, max(0.0, (x - 40) / (w * 0.70)))
        v = int(175 * (1 - t) + 40 * t)
        for y in range(h):
            gp[x, y] = v
    black = Image.new("RGB", (w, h), (10, 8, 12))
    base = Image.composite(black, base, grad)

    canvas = base.convert("RGBA")
    mark = draw_mark(84)
    word = extract_wordmark()
    target_w = 292
    scale = target_w / word.width
    word = word.resize((target_w, max(1, int(round(word.height * scale)))), Image.Resampling.LANCZOS)

    x0, y0 = 48, 28
    gap = 14
    row_h = max(mark.height, word.height)
    my = y0 + (row_h - mark.height) // 2
    wy = y0 + (row_h - word.height) // 2
    wx = x0 + mark.width + gap

    canvas.alpha_composite(glow_layer(mark, 8, (139, 47, 255, 150)), (x0, my))
    canvas.alpha_composite(mark, (x0, my))
    canvas.alpha_composite(word, (wx, wy))

    rgb = canvas.convert("RGB")
    draw = ImageDraw.Draw(rgb)
    tag_font = ImageFont.truetype(str(FONT_B), 18)
    tag = "Your media. Your moment."
    ty = y0 + row_h + 12
    tracked_text(draw, tag, tag_font, wx, ty, (214, 212, 220), 0.9)

    assert wx + word.width < 600, wx + word.width
    assert ty + 20 < 211, ty + 20
    assert y0 + row_h < 132 + 20  # lockup body stays near/above midline

    rgb.save(OUT_BANNER, "JPEG", quality=90, optimize=True, subsampling=1)


if __name__ == "__main__":
    compose_og()
    compose_banner()
    for p in (OUT_OG, OUT_BANNER):
        im = Image.open(p)
        print(p.name, im.size, p.stat().st_size // 1024, "KB")
