# -*- coding: utf-8 -*-
"""
產出兩處租屋分租 PO 文的 FB 封面圖卡（1200x1200）。
用 Playwright 渲染 HTML，中文字才會銳利（AI 生圖的中文不可靠）。
用法：python scripts/gen_rental_fb_covers.py
"""
import os, base64
from playwright.sync_api import sync_playwright

BASE = r"G:\我的雲端硬碟\2025_銓幻元_MCS相關資料\臨時紀錄雜事"
OUT = os.path.join(BASE, "FB分租PO_20260817")
O1 = os.path.join(OUT, "01_大坪林站", "圖片")
O2 = os.path.join(OUT, "02_南京東路五段", "圖片")

CARDS = [
    dict(bg=os.path.join(O1, "06_建物外觀_綠意巷道.jpg"),
         kicker="新店 · 中興路三段220巷",
         big="大坪林站<br>走路 3 分鐘",
         sub="一樓 · 前庭平面車位 · 側院 · 共用玻璃會議室",
         price="找夥伴一起用　每月分擔 36,000",
         note="無管理費 · 2–3 人分攤 · 8/25 起可進駐",
         accent="#12b981",
         out=os.path.join(O1, "01_封面圖卡.jpg")),
    dict(bg=os.path.join(O2, "02_大樓外觀_南京實業廣場.jpg"),
         kicker="台北松山 · 南京東路五段 356 號",
         big="南京實業廣場<br>開放式辦公空間",
         sub="電梯商辦 · 有管理處 · 客貨梯 · 三面採光",
         price="找夥伴一起用　每月分擔 ＿＿＿",
         note="南京三民站約 530 公尺 · 現況已清空",
         accent="#3b82f6",
         out=os.path.join(O2, "01_封面圖卡.jpg")),
]

TPL = """
<!doctype html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1200px;height:1200px;overflow:hidden}
body{font-family:"Microsoft JhengHei","PingFang TC",sans-serif;
     background:#0b0f14;position:relative;color:#fff}
.bg{position:absolute;inset:0;background-image:url('data:image/jpeg;base64,__B64__');
    background-size:cover;background-position:center}
.veil{position:absolute;inset:0;
  background:linear-gradient(178deg,rgba(6,10,16,.30) 0%,rgba(6,10,16,.52) 38%,
             rgba(6,10,16,.90) 74%,rgba(6,10,16,.97) 100%)}
.wrap{position:absolute;inset:0;padding:78px 76px;display:flex;flex-direction:column;
      justify-content:flex-end}
.kicker{font-size:30px;letter-spacing:.22em;color:__ACCENT__;font-weight:700;
        margin-bottom:22px}
.big{font-size:104px;line-height:1.13;font-weight:900;letter-spacing:-.02em;
     text-shadow:0 6px 40px rgba(0,0,0,.6)}
.rule{width:132px;height:7px;background:__ACCENT__;margin:36px 0 30px;border-radius:4px}
.sub{font-size:38px;line-height:1.55;font-weight:600;color:#e8eef5}
.price{margin-top:38px;display:inline-block;align-self:flex-start;
       background:__ACCENT__;color:#04120c;font-size:41px;font-weight:900;
       padding:22px 34px;border-radius:16px;letter-spacing:.01em}
.note{margin-top:26px;font-size:29px;color:#a9b8c8;font-weight:600}
.tag{position:absolute;top:66px;left:76px;background:rgba(255,255,255,.94);
     color:#0b0f14;font-size:32px;font-weight:900;padding:16px 30px;border-radius:999px;
     letter-spacing:.06em}
</style></head><body>
<div class="bg"></div><div class="veil"></div>
<div class="tag">分租 · 找夥伴</div>
<div class="wrap">
  <div class="kicker">__KICKER__</div>
  <div class="big">__BIG__</div>
  <div class="rule"></div>
  <div class="sub">__SUB__</div>
  <div class="price">__PRICE__</div>
  <div class="note">__NOTE__</div>
</div></body></html>
"""


def build(card, page):
    with open(card["bg"], "rb") as f:
        b64 = base64.b64encode(f.read()).decode()
    html = (TPL.replace("__B64__", b64)
               .replace("__ACCENT__", card["accent"])
               .replace("__KICKER__", card["kicker"])
               .replace("__BIG__", card["big"])
               .replace("__SUB__", card["sub"])
               .replace("__PRICE__", card["price"])
               .replace("__NOTE__", card["note"]))
    page.set_content(html, wait_until="load")
    page.wait_for_timeout(350)
    png = card["out"].replace(".jpg", ".png")
    page.screenshot(path=png)
    from PIL import Image
    Image.open(png).convert("RGB").save(card["out"], "JPEG", quality=92, optimize=True)
    os.remove(png)
    print("  ✓", card["out"])


if __name__ == "__main__":
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width": 1200, "height": 1200},
                        device_scale_factor=1)
        for c in CARDS:
            build(c, pg)
        b.close()
