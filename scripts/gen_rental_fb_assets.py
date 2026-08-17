# -*- coding: utf-8 -*-
"""
產出兩處租屋分租 PO 文所需的 FB 圖片包。
- 照片統一裁切/壓縮成 FB 友善尺寸（1440px 長邊，JPEG q88）
- 平面圖加註「分租範圍」
- 依 PO 順序重新命名
用法：python scripts/gen_rental_fb_assets.py
"""
import os, shutil
from PIL import Image, ImageDraw, ImageFont

BASE = r"G:\我的雲端硬碟\2025_銓幻元_MCS相關資料\臨時紀錄雜事"
D1 = os.path.join(BASE, "租屋-大坪林站-01")
D2 = os.path.join(BASE, "租屋-南京東路六段")
STILLS = (r"C:\Users\JasonLee\AppData\Local\Temp\claude"
          r"\C--Users-JasonLee-claude-code-projects-CMO"
          r"\35d992e8-a9a9-46d3-b48b-9c198003f672\scratchpad\stills")
OUT = os.path.join(BASE, "FB分租PO_20260817")
O1 = os.path.join(OUT, "01_大坪林站", "圖片")
O2 = os.path.join(OUT, "02_南京東路六段", "圖片")
for d in (O1, O2):
    os.makedirs(d, exist_ok=True)

FONT = r"C:\Windows\Fonts\msjhbd.ttc"   # 微軟正黑體 Bold


def fit(src, dst, long_edge=1440, q=88):
    im = Image.open(src).convert("RGB")
    w, h = im.size
    s = long_edge / max(w, h)
    if s < 1:
        im = im.resize((round(w * s), round(h * s)), Image.LANCZOS)
    im.save(dst, "JPEG", quality=q, optimize=True)
    return im.size


def annotate_plan(src, dst):
    """在平面圖上標出分租範圍與共用區，並蓋掉手寫感的空白處。"""
    im = Image.open(src).convert("RGB")
    W, H = im.size
    # 放大到 1600 寬方便加字
    scale = 1600 / W
    im = im.resize((1600, round(H * scale)), Image.LANCZOS)
    W, H = im.size
    d = ImageDraw.Draw(im, "RGBA")
    f_big = ImageFont.truetype(FONT, 46)
    f_mid = ImageFont.truetype(FONT, 34)
    f_sm = ImageFont.truetype(FONT, 28)

    # 半透明色塊：分租側（粉紅線左下）
    # 粉紅線在原圖 y≈0.55H、右轉點 x≈0.48W
    d.rectangle([int(W * 0.18), int(H * 0.56), int(W * 0.48), int(H * 0.78)],
                fill=(255, 64, 180, 46))
    d.rectangle([int(W * 0.07), int(H * 0.78), int(W * 0.42), int(H * 0.90)],
                fill=(255, 64, 180, 40))

    def tag(x, y, text, bg, fg="white", font=f_mid, pad=14):
        bbox = d.textbbox((0, 0), text, font=font)
        tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
        d.rounded_rectangle([x, y, x + tw + pad * 2, y + th + pad * 2],
                            radius=10, fill=bg)
        d.text((x + pad, y + pad - bbox[1]), text, font=fg and fg or "white",
               fill=fg) if False else d.text((x + pad, y + pad - bbox[1]),
                                             text, font=font, fill=fg)

    tag(int(W * 0.20), int(H * 0.60), "分租範圍", (214, 20, 130, 235), font=f_big)
    tag(int(W * 0.20), int(H * 0.685), "一間可上鎖的獨立空間", (214, 20, 130, 200))
    tag(int(W * 0.09), int(H * 0.80), "側院", (214, 20, 130, 200), font=f_sm)
    tag(int(W * 0.60), int(H * 0.14), "共用：辦公區 / 茶水間 / 衛浴", (25, 40, 70, 215))
    tag(int(W * 0.60), int(H * 0.62), "共用：玻璃會議室", (25, 40, 70, 215))
    tag(int(W * 0.02), int(H * 0.02), "範圍提案，非最終約定——實際怎麼切現場一起看了再談",
        (20, 20, 20, 225), font=f_sm)
    im.save(dst, "JPEG", quality=90, optimize=True)


PLAN1 = [
    ("35126_0.jpg",  D1,     "02_建物外觀_綠意巷道.jpg"),
    ("35124_0.jpg",  D1,     "03_專屬車位_前庭車庫.jpg"),
    ("35125_0.jpg",  D1,     "04_側院綠意.jpg"),
    ("dpl_126s.jpg", STILLS, "05_室內_木地板獨立空間.jpg"),
    ("dpl_36s.jpg",  STILLS, "06_室內_白牆與玻璃隔間.jpg"),
    ("dpl_92s.jpg",  STILLS, "07_室內_後段空間.jpg"),
    ("dpl_155s.jpg", STILLS, "08_後方陽台通道.jpg"),
    ("35084.jpg",    D1,     "09_大坪林站5號出口.jpg"),
    ("35120_0.jpg",  D1,     "10_巷內環境.jpg"),
    ("35121_0.jpg",  D1,     "11_轉角街景.jpg"),
]

PLAN2 = [
    ("30341_0.jpg", D2,     "02_大樓外觀_南京實業廣場.jpg"),
    ("njd_32s.jpg", STILLS, "03_整層空間_三面採光.jpg"),
    ("njd_20s.jpg", STILLS, "04_整層空間_全景.jpg"),
    ("njd_44s.jpg", STILLS, "05_整層空間_窗景.jpg"),
    ("njd_60s.jpg", STILLS, "06_整層空間_開放格局.jpg"),
    ("30347_0.jpg", D2,     "07_大廳與電梯.jpg"),
    ("30349_0.jpg", D2,     "08_客梯與客貨梯.jpg"),
    ("30367.jpg",   D2,     "09_管理處.jpg"),
    ("30343.jpg",   D2,     "10_騎樓通道.jpg"),
    ("30340_0.jpg", D2,     "11_周邊_堤頂交流道與內科指標.jpg"),
]


def run(plan, outdir):
    done = []
    for name, src_dir, newname in plan:
        src = os.path.join(src_dir, name)
        if not os.path.exists(src):
            print("  ! 找不到", src)
            continue
        dst = os.path.join(outdir, newname)
        size = fit(src, dst)
        done.append((newname, size))
        print("  ✓", newname, size)
    return done


if __name__ == "__main__":
    print("大坪林：")
    run(PLAN1, O1)
    annotate_plan(
        os.path.join(D1, "大坪林站layout(粉紅色圈起來是分租別人範圍).jpg"),
        os.path.join(O1, "12_平面圖_分租範圍標註.jpg"))
    print("  ✓ 12_平面圖_分租範圍標註.jpg")
    print("南京東路六段：")
    run(PLAN2, O2)
    print("\n輸出：", OUT)
