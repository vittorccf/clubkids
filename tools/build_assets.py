# -*- coding: utf-8 -*-
"""Pipeline de assets da landing Club Kids / Cluby Pride (estetica P&B editorial).

Ferramenta de desenvolvimento (nao entra no build do site). A partir das
fotos originais em ../references, gera os assets otimizados em ../public:
recorta a estrela do logo, otimiza fotos e flyer, e desenha a imagem OpenGraph
e os favicons em preto e branco.

Uso:
    pip install pillow
    python tools/build_assets.py   # rode a partir da raiz do projeto (site/)

Requer Windows pelas fontes do sistema (C:/Windows/Fonts) usadas na imagem OG.
"""
import os
from PIL import Image, ImageDraw, ImageFont, ImageChops

# Caminhos derivados da localizacao deste arquivo (tools/), nao do CWD,
# para que o script funcione independente de onde for invocado.
TOOLS_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(TOOLS_DIR)              # raiz do projeto (site/)
REF = os.path.join(ROOT, "..", "references")   # fotos originais (fora do projeto)
PUB = os.path.join(ROOT, "public")             # assets publicados
IMG = os.path.join(PUB, "img")
os.makedirs(IMG, exist_ok=True)

RED = (232, 25, 63)
PAPER = (244, 242, 236)
BG = (11, 11, 11)

def font(path, size):
    return ImageFont.truetype(os.path.join("C:/Windows/Fonts", path), size)

# ---------- 1. Estrela vermelha (acento unico) ----------
im = Image.open(os.path.join(REF, "LOGO PNG", "2.png")).convert("RGBA")
im = im.crop(im.getchannel("A").getbbox())
h = 760
star_red = im.resize((int(im.width * h / im.height), h), Image.LANCZOS)
star_red.save(os.path.join(IMG, "star-red.webp"), "WEBP", quality=88, method=6)
print("star-red.webp ok")

# ---------- 2. Flyer oficial (peca do hero) ----------
fly = Image.open(os.path.join(REF, "vitas_house", "vitas_house_gyn.jpeg")).convert("RGB")
fly.save(os.path.join(IMG, "flyer.jpg"), "JPEG", quality=86, optimize=True, progressive=True)
print("flyer.jpg", fly.size)

# ---------- 3. Galeria (resize; o P&B e aplicado por CSS) ----------
gallery = [
    ("CLUB KIDS!_/CLUBKIDS 02.08.25/EQ9A6890.jpg", "01-retrato.jpg"),
    ("CLUB KIDS!_/CLUB KIDS 16.08L25/_2EQ9A8240_2.jpg", "02-crowd.jpg"),
    ("CLUB KIDS!_/CLUB KIDS 13.12.24/Clubkids - ft @micaellrodrigues (64 de 175) JPG.jpg", "03-dupla.jpg"),
    ("CLUB KIDS!_/CLUBKIDS 02.08.25/EQ9A6917.jpg", "04-dj.jpg"),
    ("CLUB KIDS!_/CLUBKIDS 02.08.25/EQ9A7001.jpg", "05-dj-neon.jpg"),
    ("CLUB KIDS!_/CLUB KIDS 16.08L25/EQ9A8615.jpg", "06-set.jpg"),
    ("CLUB KIDS!_/CLUB KIDS 16.08L25/_2EQ9A8597_2.jpg", "07-festa.jpg"),
    ("CLUB KIDS!_/CLUB KIDS 16.08L25/EQ9A8378.jpg", "08-maos.jpg"),
    ("CLUB KIDS!_/CLUBKIDS 14.06.25/CLUBKIDS3EQ9A0493.JPG", "09-flores.jpg"),
]
MAX = 1400
for src, name in gallery:
    p = os.path.join(IMG, name)
    if os.path.exists(p):
        continue
    g = Image.open(os.path.join(REF, src)).convert("RGB")
    w, ht = g.size
    sc = min(MAX / w, MAX / ht, 1.0)
    g = g.resize((int(w * sc), int(ht * sc)), Image.LANCZOS)
    g.save(p, "JPEG", quality=82, optimize=True, progressive=True)
print("galeria ok")

# ---------- 4. OG image 1200x630 (P&B editorial) ----------
og = Image.new("RGB", (1200, 630), BG)
d = ImageDraw.Draw(og)
# moldura editorial
d.rectangle([24, 24, 1176, 606], outline=(60, 60, 60), width=2)
# tipografia serif (Times bold imita o Didone do flyer)
f_kick = font("arialbd.ttf", 24)
f_disp = font("timesbd.ttf", 96)
f_info = font("ariblk.ttf", 26)
def center(text, fnt, y, fill):
    w = d.textlength(text, font=fnt)
    d.text(((1200 - w) / 2, y), text, font=fnt, fill=fill)
center("CLUB KIDS GOIÂNIA APRESENTA", f_kick, 92, (150, 150, 150))
center("CLUBY PRIDE", f_disp, 150, PAPER)
center("VITA'S HOUSE", f_disp, 280, PAPER)
# estrela vermelha entre o titulo e a info
sr = star_red.resize((int(star_red.width * 96 / star_red.height), 96), Image.LANCZOS)
og.paste(sr, ((1200 - sr.width) // 2, 410), sr)
center("SÁB 20 JUN 2026   .   VERNISSAGE CLUB   .   GOIÂNIA", f_info, 530, PAPER)
# grao sutil
noise = Image.effect_noise((1200, 630), 22).convert("L")
og = ImageChops.overlay(og, Image.merge("RGB", (noise, noise, noise)))
og.save(os.path.join(PUB, "og.jpg"), "JPEG", quality=88, optimize=True)
print("og.jpg ok")

# ---------- 5. Favicon (estrela vermelha) ----------
for sz, out in ((180, "apple-touch-icon.png"), (32, "favicon.png")):
    fav = Image.new("RGBA", (sz, sz), (11, 11, 11, 255))
    pad = int(sz * 0.12)
    st = star_red.resize((int(star_red.width * (sz - pad * 2) / star_red.height), sz - pad * 2), Image.LANCZOS)
    fav.paste(st, ((sz - st.width) // 2, (sz - st.height) // 2), st)
    fav.save(os.path.join(PUB, out))
print("favicons ok")

# limpa assets nao usados na nova estetica
for old in ["star-yellow.webp", "hero-bg.webp"]:
    p = os.path.join(IMG, old)
    if os.path.exists(p):
        os.remove(p)
        print("removido", old)
print("OK")
