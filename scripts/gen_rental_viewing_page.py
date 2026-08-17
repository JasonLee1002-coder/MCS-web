# -*- coding: utf-8 -*-
"""
產出「看屋頁」單一 HTML（自帶所有圖片與影片，可直接發布成 Artifact）。
用法：python scripts/gen_rental_viewing_page.py
"""
import os, base64, glob, io
from PIL import Image

BASE = r"G:\我的雲端硬碟\2025_銓幻元_MCS相關資料\臨時紀錄雜事"
OUT = os.path.join(BASE, "FB分租PO_20260817")
IMG1 = os.path.join(OUT, "01_大坪林站", "圖片")
IMG2 = os.path.join(OUT, "02_南京東路五段", "圖片")
CLIPS = (r"C:\Users\JasonLee\AppData\Local\Temp\claude"
         r"\C--Users-JasonLee-claude-code-projects-CMO"
         r"\35d992e8-a9a9-46d3-b48b-9c198003f672\scratchpad\clips")
HTML_OUT = os.path.join(OUT, "看屋頁.html")

CAPTION = {
    "02_平面圖_專用與共用範圍.jpg": "平面圖：粉紅＝分租給夥伴的專用範圍，深藍＝共用",
    "03_室內_獨立空間.jpg": "室內：木地板的獨立空間",
    "04_室內_白牆與玻璃隔間.jpg": "白牆、軌道燈與玻璃隔間",
    "05_室內_後段空間.jpg": "後段空間",
    "06_建物外觀_綠意巷道.jpg": "建物外觀與巷道",
    "07_前庭車位.jpg": "前庭車位，有雨遮",
    "08_後方通道.jpg": "後方通道",
    "09_側院_現況搬遷中.jpg": "側院（拍攝時前一位租客搬遷中）",
    "10_大坪林站5號出口.jpg": "大坪林站 5 號出口",
    "11_巷內環境.jpg": "巷內環境",
    "12_轉角街景.jpg": "轉角街景",
    "02_大樓外觀_南京實業廣場.jpg": "南京實業廣場外觀",
    "03_整層空間_三面採光.jpg": "室內：既有吧台與窗邊",
    "04_整層空間_全景.jpg": "開放式格局全景",
    "05_整層空間_窗景.jpg": "窗邊採光",
    "06_整層空間_開放格局.jpg": "無隔間，座位自己配",
    "07_大廳與電梯.jpg": "一樓大廳",
    "08_客梯與客貨梯.jpg": "客梯與客貨梯各一支",
    "09_管理處.jpg": "管理處，白天有人在櫃檯（是否代收信件包裹待確認）",
    "10_騎樓通道.jpg": "騎樓通道",
    "11_周邊_堤頂交流道與內科指標.jpg": "周邊道路與交流道指標",
}


def img_b64(path, width=780, q=72):
    im = Image.open(path).convert("RGB")
    w, h = im.size
    if w > width:
        im = im.resize((width, round(h * width / w)), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=q, optimize=True, progressive=True)
    return base64.b64encode(buf.getvalue()).decode(), im.size


def vid_b64(path):
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode()


def gallery(imgdir, skip=("01_封面圖卡.jpg",)):
    out = []
    for p in sorted(glob.glob(os.path.join(imgdir, "*.jpg"))):
        name = os.path.basename(p)
        if name in skip:
            continue
        b64, (w, h) = img_b64(p)
        cap = CAPTION.get(name, "")
        out.append(
            f'<figure class="shot"><img loading="lazy" width="{w}" height="{h}" '
            f'src="data:image/jpeg;base64,{b64}" alt="{cap}">'
            f'<figcaption>{cap}</figcaption></figure>')
    return "\n".join(out)


def spec(rows):
    """rows: (label, value, pending?)"""
    out = []
    for label, value, pending in rows:
        v = (f'<span class="pending">待補</span>' if pending
             else f'<span class="v">{value}</span>')
        extra = f' <span class="vnote">{value}</span>' if (pending and value) else ""
        out.append(f'<div class="row"><dt>{label}</dt><dd>{v}{extra}</dd></div>')
    return "\n".join(out)


SPEC_A = [
    ("月租金", "36,000 元（團隊總額）", False),
    ("管理費", "無", False),
    ("押金", "談定後補", True),
    ("可進駐", "2026/8/25 起", False),
    ("捷運", "大坪林站 298 公尺，走路 3、4 分鐘", False),
    ("公車", "中興路三段站 153 公尺", False),
    ("樓層", "1F／4 層公寓", False),
    ("全戶建物", "32.10 坪（本次只分租其中一部分）", False),
    ("專用範圍坪數", "看屋現場丈量", True),
    ("車位", "前庭平面車位一個，使用方式一起談", True),
    ("衛浴", "共用", False),
    ("寵物", "依主約不可", False),
    ("工商登記", "要看主約與建物法定用途", True),
]

SPEC_B = [
    ("地址", "台北市松山區南京東路五段 356 號｜南京實業廣場", False),
    ("捷運", "南京三民站約 530 公尺，走路 7、8 分鐘", False),
    ("格局", "開放式無隔間，現況已清空", False),
    ("電梯", "客梯、客貨梯各一支", False),
    ("月租金", "", True),
    ("管理費", "", True),
    ("押金", "", True),
    ("可進駐", "", True),
    ("樓層", "是否整層待確認", True),
    ("室內坪數", "含計算口徑", True),
    ("空調", "中央空調，供應時段與加班費", True),
    ("車位", "", True),
    ("工商登記", "", True),
]

LEDGER_A_OWN = ["一間可上鎖的獨立空間", "側院（範圍依平面圖）"]
LEDGER_A_SHARE = ["前庭車庫與車位", "玻璃隔間會議室", "茶水間", "衛浴", "庭院"]
LEDGER_B_OWN = ["開放區內的座位範圍（現場劃分，尚未定案）"]
LEDGER_B_SHARE = ["茶水間", "公共走道", "大樓公設", "客梯／客貨梯"]


def ledger(own, share):
    o = "".join(f"<li>{x}</li>" for x in own)
    s = "".join(f"<li>{x}</li>" for x in share)
    return f"""
    <div class="ledger">
      <div class="col own"><h4>你專用</h4><ul>{o}</ul></div>
      <div class="col share"><h4>大家共用</h4><ul>{s}</ul></div>
    </div>"""


def build():
    cov1, _ = img_b64(os.path.join(IMG1, "01_封面圖卡.jpg"), 900, 78)
    cov2, _ = img_b64(os.path.join(IMG2, "01_封面圖卡.jpg"), 900, 78)
    v1 = vid_b64(os.path.join(CLIPS, "dapinglin_32s.mp4"))
    v2 = vid_b64(os.path.join(CLIPS, "nanjing_34s.mp4"))
    g1, g2 = gallery(IMG1), gallery(IMG2)

    html = TEMPLATE
    for k, v in [("__COV1__", cov1), ("__COV2__", cov2),
                 ("__VID1__", v1), ("__VID2__", v2),
                 ("__GAL1__", g1), ("__GAL2__", g2),
                 ("__SPEC1__", spec(SPEC_A)), ("__SPEC2__", spec(SPEC_B)),
                 ("__LED1__", ledger(LEDGER_A_OWN, LEDGER_A_SHARE)),
                 ("__LED2__", ledger(LEDGER_B_OWN, LEDGER_B_SHARE))]:
        html = html.replace(k, v)
    with open(HTML_OUT, "w", encoding="utf-8") as f:
        f.write(html)
    mb = os.path.getsize(HTML_OUT) / 1024 / 1024
    print(f"✓ {HTML_OUT}  ({mb:.2f} MB)")
    if mb > 15:
        print("  ⚠ 超過 Artifact 16MB 上限，需再壓縮")


TEMPLATE = r"""<title>兩處空間找夥伴</title>
<style>
:root{
  --paper:#F6F7F8; --card:#FFFFFF; --ink:#141920; --ink-2:#4A5560; --ink-3:#7B8894;
  --line:#DEE3E8; --line-2:#EDF0F3;
  --moss:#1F7A5A; --moss-soft:#E4F0EB;
  --steel:#2B5FAD; --steel-soft:#E5EDF8;
  --pink:#C81E82; --pink-soft:#FBE7F3;
  --amber:#8A6100; --amber-soft:#FBF0D6;
  --accent:var(--moss); --accent-soft:var(--moss-soft);
}
@media (prefers-color-scheme:dark){
 :root:not([data-theme="light"]){
  --paper:#0E1216; --card:#161C22; --ink:#EAEFF4; --ink-2:#A9B6C2; --ink-3:#77848F;
  --line:#28313A; --line-2:#1E262E;
  --moss:#5CC79C; --moss-soft:#12291F;
  --steel:#7FADF0; --steel-soft:#121E2E;
  --pink:#F17FC0; --pink-soft:#2A1220;
  --amber:#E7B94E; --amber-soft:#2A2113;
 }
}
:root[data-theme="dark"]{
  --paper:#0E1216; --card:#161C22; --ink:#EAEFF4; --ink-2:#A9B6C2; --ink-3:#77848F;
  --line:#28313A; --line-2:#1E262E;
  --moss:#5CC79C; --moss-soft:#12291F;
  --steel:#7FADF0; --steel-soft:#121E2E;
  --pink:#F17FC0; --pink-soft:#2A1220;
  --amber:#E7B94E; --amber-soft:#2A2113;
}
*{box-sizing:border-box}
body{margin:0;background:var(--paper);color:var(--ink);
  font-family:"PingFang TC","Noto Sans TC","Microsoft JhengHei","Hiragino Sans TC",sans-serif;
  font-size:16.5px;line-height:1.75;-webkit-font-smoothing:antialiased}
.num{font-family:ui-monospace,"SF Mono",Menlo,Consolas,monospace;
  font-variant-numeric:tabular-nums;letter-spacing:-.01em}
.wrap{max-width:840px;margin:0 auto;padding:0 20px}
header.top{border-bottom:1px solid var(--line);background:var(--card)}
.top .wrap{padding-top:34px;padding-bottom:26px}
.eyebrow{font-size:12.5px;letter-spacing:.2em;color:var(--ink-3);font-weight:700;
  margin-bottom:12px}
h1{font-size:clamp(27px,5.4vw,38px);line-height:1.28;margin:0 0 12px;font-weight:800;
  letter-spacing:-.015em;text-wrap:balance}
.lede{color:var(--ink-2);margin:0;max-width:62ch}
nav.jump{display:flex;gap:8px;flex-wrap:wrap;margin-top:22px}
nav.jump a{flex:1 1 210px;text-decoration:none;color:var(--ink);
  border:1px solid var(--line);border-radius:12px;padding:12px 14px;background:var(--paper);
  transition:border-color .15s,transform .15s}
nav.jump a:hover{border-color:var(--accent);transform:translateY(-1px)}
nav.jump a b{display:block;font-size:15.5px}
nav.jump a span{font-size:13px;color:var(--ink-3)}
nav.jump a:focus-visible,summary:focus-visible{outline:2px solid var(--accent);outline-offset:2px}

section.prop{padding:48px 0 8px;border-bottom:1px solid var(--line)}
section.prop.b{--accent:var(--steel);--accent-soft:var(--steel-soft)}
.tagrow{display:flex;align-items:center;gap:10px;margin-bottom:14px;flex-wrap:wrap}
.chip{font-size:12.5px;font-weight:700;padding:4px 11px;border-radius:999px;
  background:var(--accent-soft);color:var(--accent);letter-spacing:.03em}
.chip.warn{background:var(--amber-soft);color:var(--amber)}
h2{font-size:clamp(23px,4.4vw,30px);margin:0 0 10px;font-weight:800;letter-spacing:-.015em;
  text-wrap:balance}
.sub{color:var(--ink-2);margin:0 0 24px;max-width:62ch}
.cover{width:100%;border-radius:14px;display:block;border:1px solid var(--line)}

h3{font-size:13px;letter-spacing:.16em;color:var(--ink-3);font-weight:800;
  margin:38px 0 14px;padding-bottom:8px;border-bottom:1px solid var(--line-2)}

.ledger{display:grid;grid-template-columns:1fr 1fr;gap:14px}
@media(max-width:560px){.ledger{grid-template-columns:1fr}}
.ledger .col{border:1px solid var(--line);border-radius:13px;padding:16px 18px;background:var(--card)}
.ledger .col.own{border-color:var(--pink);background:var(--pink-soft)}
.ledger h4{margin:0 0 9px;font-size:14px;letter-spacing:.08em;font-weight:800}
.ledger .own h4{color:var(--pink)}
.ledger .share h4{color:var(--ink-2)}
.ledger ul{margin:0;padding-left:1.15em}
.ledger li{margin:3px 0}

dl.spec{margin:0;border:1px solid var(--line);border-radius:13px;overflow:hidden;
  background:var(--card)}
dl.spec .row{display:grid;grid-template-columns:8.5em 1fr;gap:14px;
  padding:11px 18px;border-bottom:1px solid var(--line-2)}
dl.spec .row:last-child{border-bottom:0}
@media(max-width:520px){dl.spec .row{grid-template-columns:1fr;gap:2px;padding:12px 16px}}
dl.spec dt{color:var(--ink-3);font-size:14px;font-weight:700}
dl.spec dd{margin:0}
dl.spec .v{font-weight:600}
.pending{display:inline-block;font-size:12.5px;font-weight:800;padding:2px 9px;
  border-radius:999px;background:var(--amber-soft);color:var(--amber)}
.vnote{color:var(--ink-3);font-size:14px;margin-left:6px}

video{width:100%;border-radius:13px;display:block;border:1px solid var(--line);background:#000}
.vcap{font-size:13.5px;color:var(--ink-3);margin:9px 0 0}

.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:14px}
figure.shot{margin:0}
figure.shot img{width:100%;height:auto;border-radius:11px;display:block;
  border:1px solid var(--line);background:var(--line-2)}
figcaption{font-size:13px;color:var(--ink-3);margin-top:7px;line-height:1.5}

.note{border-left:3px solid var(--accent);background:var(--card);border-radius:0 11px 11px 0;
  padding:15px 18px;margin:22px 0}
.note p{margin:0 0 8px}.note p:last-child{margin:0}
.note strong{font-weight:800}

.cta{background:var(--card);border:1px solid var(--line);border-radius:14px;
  padding:22px 22px;margin:30px 0 44px}
.cta h3{margin-top:0;border:0;padding:0}
.cta ol{margin:6px 0 0;padding-left:1.3em}
.cta li{margin:4px 0}
footer{padding:34px 0 60px;color:var(--ink-3);font-size:13.5px}
footer p{margin:0 0 6px;max-width:70ch}
@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
</style>

<header class="top"><div class="wrap">
  <p class="eyebrow">分租 · 找一起用空間的夥伴</p>
  <h1>兩個空間，正在找夥伴一起用</h1>
  <p class="lede">兩處都是我承租的，房東同意分租。找的是一起分擔的夥伴，不是把整層轉手出去。
  下面把專用範圍、共用範圍、費用，還有目前還沒確定的事，都照實列出來——
  標成「待補」的就是還沒確認的，我不會先給一個數字再改。</p>
  <nav class="jump">
    <a href="#a"><b>新店 · 大坪林站 298 公尺</b><span class="num">一樓 · 月 36,000 · 8/25 起可進駐</span></a>
    <a href="#b"><b>台北 · 南京三民站附近</b><span class="num">電梯商辦 · 開放式空間 · 條件確認中</span></a>
  </nav>
</div></header>

<section class="prop a" id="a"><div class="wrap">
  <div class="tagrow"><span class="chip">新店區</span><span class="chip">一樓</span><span class="chip">8/25 可進駐</span></div>
  <h2>大坪林站 298 公尺的一樓空間</h2>
  <p class="sub">中興路三段 220 巷。一樓進出方便，有前庭車庫和綠意側院。
  找 2–3 人的小團隊一起用，每月 36,000（團隊總額，沒有管理費）。</p>
  <img class="cover" src="data:image/jpeg;base64,__COV1__" alt="大坪林一樓空間">

  <h3>你拿到什麼</h3>
  __LED1__
  <div class="note">
    <p><strong>這次分出去的不是整戶。</strong>平面圖上粉紅色那一塊是專用範圍的提案，
    其他區域共用。<strong>平面圖是提案，不是最終約定</strong>——實際怎麼切、你要多大，
    看屋時一起量、一起談。</p>
  </div>

  <h3>條件</h3>
  <dl class="spec">__SPEC1__</dl>

  <h3>空間影片</h3>
  <video controls preload="metadata" playsinline src="data:video/mp4;base64,__VID1__"></video>
  <p class="vcap">32 秒走一遍。拍攝時前一位租客還在搬遷，交屋前會清空。</p>

  <h3>照片</h3>
  <div class="grid">__GAL1__</div>

  <div class="note">
    <p><strong>用途先問一聲。</strong>安靜、人流不大的辦公或工作室型態最合適。
    需要工商登記、對外開課、大量訪客、油煙或會產生噪音的用途，除了主約，
    也要看建物的法定用途和現場規則能不能做，我們一起確認過再簽。依主約不能養寵物。</p>
  </div>
</div></section>

<section class="prop b" id="b"><div class="wrap">
  <div class="tagrow"><span class="chip">松山區</span><span class="chip">電梯商辦</span>
    <span class="chip warn">條件確認中，尚未開放洽詢</span></div>
  <h2>南京三民站附近的開放式商辦</h2>
  <p class="sub">南京東路五段 356 號，南京實業廣場。開放式無隔間、三面採光、現況已清空。</p>
  <div class="note">
    <p><strong>這一案還在確認條件。</strong>租金、樓層、坪數、可進駐日都還沒定案，
    下面標「待補」的就是還沒有答案的部分。先放上來讓你看空間本身，
    數字補齊之後我會更新這一頁，到時候再談比較不會浪費彼此時間。</p>
  </div>
  <img class="cover" src="data:image/jpeg;base64,__COV2__" alt="南京實業廣場開放式辦公空間">

  <h3>你拿到什麼</h3>
  __LED2__

  <h3>條件</h3>
  <dl class="spec">__SPEC2__</dl>

  <h3>空間影片</h3>
  <video controls preload="metadata" playsinline src="data:video/mp4;base64,__VID2__"></video>
  <p class="vcap">34 秒走一遍。現況已清空，既有的辦公櫃體和吧台要留要拆都可以談。</p>

  <h3>照片</h3>
  <div class="grid">__GAL2__</div>

  <div class="note">
    <p><strong>同棟的鄰居。</strong>大樓名錄上有公司行號、基金會、教育單位，也有宗教團體。
    在意環境的話，建議上班時段和傍晚各來看一次。</p>
  </div>
</div></section>

<div class="wrap">
  <div class="cta">
    <h3>想看空間</h3>
    <p>訊息裡先講四件事，我們比較快抓到適不適合：</p>
    <ol>
      <li>你們是做什麼的</li>
      <li>固定幾個人會用</li>
      <li>大概什麼時候要進</li>
      <li>需不需要工商登記或固定車位</li>
    </ol>
    <p style="margin-top:12px">對得上，我們會先把平面圖、完整費用，還有主約裡的分租條款傳給你，再約現場。</p>
    <p style="margin-top:10px"><strong>聯絡：</strong>陳泱璇（電話／LINE 請見貼文），或直接私訊我。</p>
  </div>
</div>

<footer><div class="wrap">
  <p>照片與影片為 2026 年 8 月現況拍攝。大坪林一案拍攝時前一位租客尚在搬遷，交屋前會清空。</p>
  <p>兩案皆為承租人經房東同意的分租，非屋主直租。轉租期間以主租約為準，看屋時可查驗主約到期日與分租條款。</p>
  <p>標示「待補」的欄位表示尚未確認，確認後會更新本頁，不會口頭補一個數字了事。</p>
</div></footer>
"""

if __name__ == "__main__":
    build()
