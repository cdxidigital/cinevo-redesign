#!/usr/bin/env python3
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

FONT = Path("/workspace/.grok/fonts/extras/ttf/InterDisplay-ExtraBold.ttf")
FONT_B = Path("/workspace/.grok/fonts/extras/ttf/InterDisplay-Bold.ttf")
STILL = Path("/workspace/public/stills/hero-theater.jpg")
GLOW = Path("/workspace/public/stills/screen-glow.jpg")
OUT_OG = Path("/workspace/.grok/og.jpg.tmp")
OUT_BANNER = Path("/workspace/.grok/x-banner.jpg.tmp")


def cover_crop(src: Image.Image, w: int, h: int) -> Image.Image:
    img = src.convert("RGB")
    scale = max(w / img.width, h / img.height)
    nw, nh = int(img.width * scale), int(img.height * scale)
    img = img.resize((nw, nh), Image.Resampling.LANCZOS)
    left = (nw - w) // 2
    top = (nh - h) // 2
    return img.crop((left, top, left + w, top + h))


def grade(img: Image.Image, brightness=0.62, contrast=1.18, color=0.38) -> Image.Image:
    img = ImageEnhance.Color(img).enhance(color)
    img = ImageEnhance.Contrast(img).enhance(contrast)
    img = ImageEnhance.Brightness(img).enhance(brightness)
    return img


def grain(img: Image.Image, amount=12) -> Image.Image:
    noise = Image.effect_noise(img.size, amount).convert("L")
    noise = noise.point(lambda p: 128 + (p - 128) // 3)
    return Image.blend(img, Image.merge("RGB", (noise, noise, noise)), 0.08)


def draw_tracked(draw: ImageDraw.ImageDraw, text: str, font, x, y, fill, tracking=0):
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + tracking
    return x


def tracked_width(draw, text, font, tracking=0):
    if not text:
        return 0
    return sum(draw.textlength(ch, font=font) for ch in text) + tracking * (len(text) - 1)


def compose_og():
    w, h = 1200, 630
    base = cover_crop(Image.open(STILL), w, h)
    base = grade(base, brightness=0.55, contrast=1.22, color=0.32)
    overlay = Image.new("RGB", (w, h), (0, 0, 0))
    base = Image.blend(base, overlay, 0.28)
    # letterbox
    draw = ImageDraw.Draw(base)
    draw.rectangle((0, 0, w, 36), fill=(0, 0, 0))
    draw.rectangle((0, h - 48, w, h), fill=(0, 0, 0))
    base = grain(base)

    draw = ImageDraw.Draw(base)
    eyebrow = ImageFont.truetype(str(FONT_B), 15)
    title = ImageFont.truetype(str(FONT), 96)
    tag = ImageFont.truetype(str(FONT_B), 34)

    eye = "A PRIVATE CINEMA"
    eye_track = 8
    eye_w = tracked_width(draw, eye, eyebrow, eye_track)
    title_track = -4
    title_w = tracked_width(draw, "CINEVO", title, title_track)
    tag_w = draw.textlength("Cinema, Reinvented.", tag)

    block_h = 15 + 28 + 96 + 18 + 34
    y0 = (h - block_h) // 2 - 6
    draw_tracked(draw, eye, eyebrow, (w - eye_w) / 2, y0, (210, 210, 210), eye_track)
    draw_tracked(draw, "CINEVO", title, (w - title_w) / 2, y0 + 43, (255, 255, 255), title_track)
    draw.text(((w - tag_w) / 2, y0 + 43 + 96 + 14), "Cinema, Reinvented.", font=tag, fill=(245, 245, 245))

    base.save(OUT_OG, "JPEG", quality=90, optimize=True, subsampling=1)


def compose_banner():
    w, h = 1200, 264
    base = cover_crop(Image.open(GLOW), w, h)
    base = grade(base, brightness=0.5, contrast=1.2, color=0.28)
    # left-weighted gradient so type reads
    grad = Image.new("L", (w, h))
    gp = grad.load()
    for x in range(w):
        # 0.55 on the left, fading to 0.15 on the right
        t = min(1.0, x / (w * 0.7))
        v = int(140 * (1 - t) + 30 * t)
        for y in range(h):
            gp[x, y] = v
    black = Image.new("RGB", (w, h), (0, 0, 0))
    base = Image.composite(black, base, grad)
    base = grain(base, amount=10)

    draw = ImageDraw.Draw(base)
    title = ImageFont.truetype(str(FONT), 64)
    tag = ImageFont.truetype(str(FONT_B), 22)
    title_track = -2
    title_w = tracked_width(draw, "CINEVO", title, title_track)

    # lockup in left half, above midline, top/left margins
    x0 = 56
    y0 = 42
    draw_tracked(draw, "CINEVO", title, x0, y0, (255, 255, 255), title_track)
    draw.text((x0, y0 + 72), "Cinema, Reinvented.", font=tag, fill=(210, 210, 210))
    # sanity: title must end before x=600 and y=211
    assert x0 + title_w < 600, title_w
    assert y0 + 72 + 22 < 211

    base.save(OUT_BANNER, "JPEG", quality=90, optimize=True, subsampling=1)


if __name__ == "__main__":
    compose_og()
    compose_banner()
    for p in (OUT_OG, OUT_BANNER):
        im = Image.open(p)
        print(p.name, im.size, p.stat().st_size // 1024, "KB")
