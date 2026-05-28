
out = open(r"C:\Users\JasonLee\claude_code_projects\CMO\docs\clients\mcstation\mcstation_情境模擬報告_20260526.html", "w", encoding="utf-8")

HEAD = """<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>mcstation.ai 訪客情境模擬報告 — 10輪 CMO 迭代分析</title>
<style>
:root {
  --bg:#0a1628;--bg2:#0f1f3d;--bg3:#162544;
  --teal:#00C6AD;--gold:#F5A623;--red:#e74c3c;--green:#27ae60;--purple:#7B61FF;
  --text:#e8eaf6;--text2:#8899aa;--border:rgba(0,198,173,0.2);
}
*{box-sizing:border-box;margin:0;padding:0;}
body{background:var(--bg);color:var(--text);font-family:'Noto Sans TC','Segoe UI',sans-serif;display:flex;min-height:100vh;}
#sidebar{width:210px;min-width:210px;background:var(--bg2);border-right:1px solid var(--border);position:fixed;top:0;left:0;height:100vh;overflow-y:auto;z-index:100;padding:16px 0;}
#sidebar h2{color:var(--teal);font-size:11px;padding:0 14px 10px;border-bottom:1px solid var(--border);letter-spacing:2px;text-transform:uppercase;}
#sidebar a{display:flex;align-items:center;gap:7px;padding:8px 14px;font-size:12px;color:var(--text2);text-decoration:none;transition:all .2s;border-left:3px solid transparent;}
#sidebar a:hover,#sidebar a.active{color:var(--text);background:rgba(0,198,173,0.08);border-left-color:var(--teal);}
.sdot{width:9px;height:9px;border-radius:50%;flex-shrink:0;}
#main{margin-left:210px;flex:1;padding:36px;max-width:calc(100vw - 210px);}
.page-title{font-size:26px;font-weight:700;color:var(--teal);margin-bottom:4px;}
.page-sub{color:var(--text2);font-size:13px;margin-bottom:36px;}
.round-section{margin-bottom:56px;scroll-margin-top:16px;}
.rh{display:flex;align-items:center;gap:12px;padding:14px 20px;border-radius:10px 10px 0 0;margin-bottom:0;}
.rbadge{font-size:12px;font-weight:700;padding:3px 10px;border-radius:20px;background:rgba(255,255,255,0.15);color:#fff;letter-spacing:1px;}
.rtitle{font-size:18px;font-weight:700;color:#fff;}
.rstatus{margin-left:auto;font-size:12px;color:rgba(255,255,255,0.65);}
.tab-bar{display:flex;gap:3px;background:var(--bg3);padding:7px;border-radius:8px;margin:14px 0 10px;flex-wrap:wrap;}
.tb{padding:5px 12px;border:none;border-radius:5px;background:transparent;color:var(--text2);cursor:pointer;font-size:12px;transition:all .2s;}
.tb:hover{background:rgba(0,198,173,0.1);color:var(--text);}
.tb.active{background:var(--teal);color:#000;font-weight:600;}
.tp{display:none;}.tp.active{display:block;}
.st{width:100%;border-collapse:collapse;font-size:12px;margin-bottom:14px;}
.st th{background:rgba(0,198,173,0.12);color:var(--teal);padding:7px 9px;text-align:left;font-weight:600;border-bottom:1px solid var(--border);white-space:nowrap;}
.st td{padding:6px 9px;border-bottom:1px solid rgba(255,255,255,0.04);vertical-align:top;line-height:1.5;}
.st tr:hover td{background:rgba(255,255,255,0.02);}
.sn{color:var(--teal);font-weight:700;white-space:nowrap;}
.cv{color:#27ae60;font-weight:600;}.lv{color:#e74c3c;}.ex{color:#F5A623;}
.cmo-box{background:linear-gradient(135deg,rgba(245,166,35,.08),rgba(245,166,35,.02));border:1px solid rgba(245,166,35,.3);border-radius:10px;padding:18px 22px;margin:18px 0;}
.cmo-box h3{color:var(--gold);font-size:14px;margin-bottom:12px;}
.ci{display:flex;gap:9px;margin-bottom:9px;}
.cn{background:var(--gold);color:#000;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;margin-top:2px;}
.ct{font-size:13px;line-height:1.6;color:var(--text);}
.design-box{background:linear-gradient(135deg,rgba(0,198,173,.07),rgba(0,198,173,.02));border:1px solid rgba(0,198,173,.22);border-radius:10px;padding:18px 22px;margin:14px 0;}
.design-box h3{color:var(--teal);font-size:14px;margin-bottom:12px;}
.ba{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:9px;}
.bb{background:rgba(231,76,60,.09);border:1px solid rgba(231,76,60,.25);border-radius:7px;padding:10px;}
.ab{background:rgba(39,174,96,.09);border:1px solid rgba(39,174,96,.25);border-radius:7px;padding:10px;}
.bal{font-size:10px;font-weight:700;letter-spacing:1px;margin-bottom:5px;}
.bb .bal{color:var(--red);}.ab .bal{color:var(--green);}
.bat{font-size:12.5px;line-height:1.6;color:var(--text);}
.stat-row{display:flex;gap:12px;flex-wrap:wrap;margin:10px 0;}
.sb{background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:10px 14px;text-align:center;min-width:88px;}
.sbn{font-size:22px;font-weight:700;color:var(--teal);}
.sbl{font-size:10px;color:var(--text2);margin-top:2px;}
.rc{display:inline-block;padding:2px 7px;border-radius:9px;font-size:10px;font-weight:600;margin-right:3px;}
.rv{background:rgba(0,198,173,.18);color:var(--teal);}
.rb{background:rgba(245,166,35,.18);color:var(--gold);}
.rf{background:rgba(123,97,255,.18);color:var(--purple);}
.rt{background:rgba(93,173,226,.18);color:#5dade2;}
.trend-wrap{background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:22px;margin:22px 0;}
.trend-wrap h3{color:var(--teal);font-size:15px;margin-bottom:16px;}
.chart-container{position:relative;height:180px;width:100%;}
.bars{display:flex;align-items:flex-end;gap:5px;height:160px;padding:0 8px;}
.bar-group{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;}
.bar{width:100%;border-radius:3px 3px 0 0;position:relative;min-height:4px;}
.bv{font-size:10px;color:#fff;text-align:center;padding-top:3px;font-weight:700;}
.blbl{font-size:10px;color:var(--text2);margin-top:4px;}
.final-section{background:linear-gradient(135deg,var(--bg2),var(--bg3));border:1px solid rgba(0,198,173,.35);border-radius:14px;padding:28px;margin-bottom:56px;}
.final-section h2{font-size:22px;color:var(--teal);margin-bottom:20px;padding-bottom:10px;border-bottom:1px solid var(--border);}
.spec-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px;margin-bottom:22px;}
.spec-card{background:rgba(0,198,173,.05);border:1px solid rgba(0,198,173,.18);border-radius:9px;padding:14px;}
.spec-card h4{color:var(--teal);font-size:12px;margin-bottom:9px;letter-spacing:1px;text-transform:uppercase;}
.spec-card ul{list-style:none;}
.spec-card ul li{font-size:12.5px;line-height:1.8;color:var(--text);padding-left:14px;position:relative;}
.spec-card ul li::before{content:"→";position:absolute;left:0;color:var(--teal);}
.dr{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:22px;}
.kb{background:rgba(39,174,96,.07);border:1px solid rgba(39,174,96,.22);border-radius:9px;padding:14px;}
.db{background:rgba(231,76,60,.07);border:1px solid rgba(231,76,60,.22);border-radius:9px;padding:14px;}
.kb h4{color:var(--green);margin-bottom:9px;font-size:13px;}
.db h4{color:var(--red);margin-bottom:9px;font-size:13px;}
.kb ul,.db ul{list-style:none;}
.kb ul li,.db ul li{font-size:12.5px;line-height:1.8;padding-left:14px;position:relative;color:var(--text);}
.kb ul li::before{content:"✓";position:absolute;left:0;color:var(--green);}
.db ul li::before{content:"✗";position:absolute;left:0;color:var(--red);}
.section-divider{border:none;border-top:1px solid var(--border);margin:30px 0;}
@media(max-width:768px){#sidebar{display:none;}#main{margin-left:0;padding:18px;max-width:100vw;}.ba,.dr{grid-template-columns:1fr;}}
</style>
</head>
<body>
<nav id="sidebar">
  <h2>MCS 情境分析</h2>
  <a href="#round1"><span class="sdot" style="background:#c0392b"></span>Round 1 — 基線</a>
  <a href="#round2"><span class="sdot" style="background:#e67e22"></span>Round 2 — 速度</a>
  <a href="#round3"><span class="sdot" style="background:#f39c12"></span>Round 3 — 訊息</a>
  <a href="#round4"><span class="sdot" style="background:#f1c40f"></span>Round 4 — 角色</a>
  <a href="#round5"><span class="sdot" style="background:#a8d08d"></span>Round 5 — 信任</a>
  <a href="#round6"><span class="sdot" style="background:#52c280"></span>Round 6 — 轉換</a>
  <a href="#round7"><span class="sdot" style="background:#1abc9c"></span>Round 7 — 深化</a>
  <a href="#round8"><span class="sdot" style="background:#27ae60"></span>Round 8 — 精煉</a>
  <a href="#round9"><span class="sdot" style="background:#2980b9"></span>Round 9 — 驗證</a>
  <a href="#round10"><span class="sdot" style="background:#00C6AD"></span>Round 10 — 完成</a>
  <a href="#final" style="margin-top:8px;border-top:1px solid var(--border);padding-top:12px;"><span class="sdot" style="background:linear-gradient(135deg,#00C6AD,#7B61FF)"></span>最終報告</a>
</nav>
<main id="main">
  <div class="page-title">mcstation.ai 首頁訪客情境模擬報告</div>
  <div class="page-sub">CMO 10輪迭代分析 · 4角色 × 20情境 × 10輪 = 800個模擬情境 · 2026-05-26</div>
"""

out.write(HEAD)
print("HEAD written")
out.flush()

# ─────────────────────────────────────────────
# HELPER: round header
def rh(rid, color, title, status, conv):
    return f"""
<section class="round-section" id="{rid}">
<div class="rh" style="background:linear-gradient(135deg,{color}22,{color}08);border:1px solid {color}44;">
  <span class="rbadge" style="background:{color};">{rid.upper()}</span>
  <span class="rtitle">{title}</span>
  <span class="rstatus">{status} &nbsp;|&nbsp; 平均轉換率 {conv}</span>
</div>
"""

# ─────────────────────────────────────────────
# SCENARIO TABLE helper
def stable(rows):
    # rows: list of (num, role_chip, persona, source, journey, moment, result_cls, result, issue)
    h = """<div style="overflow-x:auto;"><table class="st">
<thead><tr>
<th>#</th><th>角色</th><th>具體Persona</th><th>如何進來</th>
<th>首頁歷程</th><th>關鍵時刻</th><th>結果</th><th>核心問題</th>
</tr></thead><tbody>"""
    for r in rows:
        h += f"<tr><td class='sn'>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td>{r[4]}</td><td>{r[5]}</td><td class='{r[6]}'>{r[7]}</td><td>{r[8]}</td></tr>"
    h += "</tbody></table></div>"
    return h

# ─────────────────────────────────────────────
# ROLE CHIPS
V = "<span class='rc rv'>場館</span>"
B = "<span class='rc rb'>品牌</span>"
F = "<span class='rc rf'>加盟</span>"
T = "<span class='rc rt'>技術</span>"

# ─────────────────────────────────────────────
# ROUND 1 DATA — 基線模擬（現況設計，問題最多）
r1_venue = [
    ("V01",V,"台北夜店老闆，40歲，iPhone，週五晚","Google: 酒吧數位化系統","Hero大圖停留3秒，看到OmniCore字樣困惑，滾動到角色卡","看到『場館老闆』卡片，猶豫要不要點","lv","離開","OmniCore是什麼？跟我有關係嗎？"),
    ("V02",V,"高雄餐廳老闆娘，50歲，Android，午後","FB廣告：AI幫你管餐廳","Hero進入，找不到具體功能，文字太多像企業網站","滾動到AI對談區，不知道要問什麼","lv","離開","AI顧問具體能幫我做什麼？"),
    ("V03",V,"台中KTV業主，35歲，桌機，工作時間","Google: KTV管理系統推薦","掃描頁面尋找系統demo或影片","沒有影片demo，找不到實際操作畫面","lv","離開","有沒有實際使用畫面？"),
    ("V04",V,"台南小酒館老闆，28歲，iPhone","Instagram廣告連結","看到漂亮插圖，但不懂OmniCore生態意涵","找不到價格頁面或免費試用按鈕","lv","離開","要多少錢？能免費試用嗎？"),
    ("V05",V,"桃園複合式餐廳，45歲，Android","朋友推薦，直接輸入網址","進入後第一眼看到英文標題，有點不安","找到角色選擇卡才稍微理解","ex","繼續探索","中文版有嗎？服務在台灣嗎？"),
    ("V06",V,"台北居酒屋老闆，38歲，iPhone","Google: 餐廳AI顧問台灣","Hero停留，往下看OmniCore說明","太抽象，找不到聯絡電話或LINE","lv","離開","怎麼跟你們聯絡？"),
    ("V07",V,"新竹科技園區餐廳，42歲，MacBook","LinkedIn廣告","評估型瀏覽，閱讀所有文字","沒有成功案例或客戶見證","lv","離開","有沒有其他餐廳用過的成功案例？"),
    ("V08",V,"台北酒吧老闆，33歲，iPhone","Google: 酒吧數位轉型","快速掃描3秒，看不到明確的產品","角色卡點進去後不知道下一步","lv","離開","點了角色卡之後我應該做什麼？"),
    ("V09",V,"台中夜店老闆，50歲，Android","朋友圈轉發連結","進來就找按鈕，想立刻行動","找不到立即預約或免費諮詢CTA","lv","離開","我要怎麼開始使用？"),
    ("V10",V,"台北餐廳老闆，55歲，桌機","Google搜尋：餐廳管理AI系統","閱讀速度慢，仔細看每個區塊","AI對談框讓他誤以為要付費","lv","離開","用AI顧問要錢嗎？"),
    ("V11",V,"高雄酒吧老闆，30歲，iPhone","IG Reels廣告","被插圖吸引進來，期待看到好玩功能","看到文字密集的OmniCore說明就離開","lv","離開","這是給我玩的還是給大企業的？"),
    ("V12",V,"台南活動場地負責人，48歲，Android","Google: 場地管理系統","想找預訂系統功能","全頁面找不到訂位/預訂相關功能說明","lv","離開","可以幫我管理預訂嗎？"),
    ("V13",V,"台北健身房老闆，37歲，iPhone","朋友推薦","點AI對談，用中文問了一個問題","AI回答了但不知道可信度","ex","繼續探索，但疑慮多","AI給的建議是誰在背後把關？"),
    ("V14",V,"桃園餐廳老闆，43歲，MacBook","Google廣告","仔細閱讀功能區塊","功能描述太通用，感覺跟其他SaaS一樣","lv","離開","你跟別人有什麼不同？"),
    ("V15",V,"台北bar老闆，26歲，iPhone","Dcard討論串連結","快速手指滑動，期待看到好玩互動","頁面互動性低，感覺很靜態","lv","離開","有沒有可以玩的功能或試試看的？"),
    ("V16",V,"台中餐廳，52歲，Android","LINE群組分享","點進來，看了5秒，找不到熟悉的東西","語言偏技術，不友善","lv","離開","看不懂在說什麼"),
    ("V17",V,"新北酒館，31歲，iPhone","IG Story廣告","看到AI兩個字就進來","不清楚AI能幫忙省哪些具體工時","ex","點了AI對談問問看","每天能幫我省多少時間？"),
    ("V18",V,"台北複合式場館，44歲，MacBook","Google: 場館數位化","閱讀完整頁面","對OmniCore生態有點理解但不確定合不合適","ex","填了聯絡表單（若有）","適合我這種規模嗎？"),
    ("V19",V,"台南夜店，36歲，iPhone","朋友口耳相傳","進來找服務項目列表","找不到清楚的服務清單","lv","離開","你們到底提供什麼服務？"),
    ("V20",V,"高雄餐廳，29歲，Android","TikTok廣告","被影片風格吸引進入網站","網站感覺跟TikTok廣告風格落差大","lv","離開","這個網站感覺不像廣告說的那麼酷"),
]
r1_brand = [
    ("B01",B,"消費品牌行銷總監，35歲，MacBook","Google: 場館聯名行銷","進入後找合作方案或B2B入口","完全沒有B2B品牌合作入口","lv","離開","品牌商跟你們怎麼合作？"),
    ("B02",B,"飲料品牌業務，40歲，iPhone","朋友介紹","快速掃描，尋找合作聯絡方式","只看到消費者導向內容","lv","離開","這頁面是給品牌商看的嗎？"),
    ("B03",B,"保健品牌電商負責人，33歲，MacBook","LinkedIn廣告","評估性瀏覽，想了解場館覆蓋數","找不到數據：覆蓋場館數、月流量","lv","離開","你們有多少場館？能覆蓋多少消費者？"),
    ("B04",B,"酒類品牌區域經理，45歲，Android","Google: 酒吧品牌進駐合作","找「合作夥伴」或「品牌商」區塊","完全沒有針對品牌商的內容","lv","離開","你們有接受品牌合作嗎？"),
    ("B05",B,"運動品牌市場部，28歲，iPhone","Instagram廣告","看到AI感興趣，但找不到品牌相關","頁面100%場館導向","lv","離開","這是場館系統還是品牌平台？"),
    ("B06",B,"茶飲品牌CMO，38歲，MacBook","朋友推薦","專業評估，想看ROI數據","沒有任何品牌合作ROI說明","lv","離開","跟你們合作能帶來什麼效益？"),
    ("B07",B,"連鎖餐飲品牌，50歲，桌機","Google廣告","進入尋找加盟or通路拓展資訊","分不清這是場館系統還是通路平台","lv","離開","這是系統商還是通路商？"),
    ("B08",B,"美妝品牌行銷，26歲，iPhone","IG廣告","快速滑動，找品牌曝光機會","找不到任何品牌曝光相關內容","lv","離開","能幫品牌做場館曝光嗎？"),
    ("B09",B,"食品品牌業務總監，42歲，MacBook","Google: 場館行銷合作","尋找合作流程或申請表","沒有品牌入駐流程說明","lv","離開","怎麼申請合作？流程是什麼？"),
    ("B10",B,"精品品牌台灣代理，55歲，iPad","朋友介紹","仔細閱讀，尋找適合高端場館的合作","感覺定位不清，無法判斷品牌契合度","lv","離開","你們的場館定位是高端還是大眾？"),
    ("B11",B,"能量飲料品牌，29歲，iPhone","TikTok廣告","快速掃描","對AI行銷有興趣但不知道如何切入","ex","點AI對談試問","你們可以幫品牌做AI行銷嗎？"),
    ("B12",B,"日系餐飲品牌，44歲，MacBook","Google搜尋","尋找場館數據和合作案例","沒有任何合作案例展示","lv","離開","有沒有跟哪些品牌合作過？"),
    ("B13",B,"台灣在地飲料品牌，32歲，Android","朋友圈轉發","進入，感到困惑，不知道這是給誰的","角色卡有『品牌商』選項，點了","ex","繼續探索","點了品牌商卡後，AI問我要幹嘛，我還是不懂"),
    ("B14",B,"進口食品代理商，48歲，桌機","Google廣告","找分銷或通路合作資訊","這更像個科技公司而非通路夥伴","lv","離開","你們是科技公司還是業務通路？"),
    ("B15",B,"本土酒商業務，35歲，Android","LINE廣告","找酒吧渠道合作","網站太科技感，對傳統酒商不友善","lv","離開","這個對我這種傳統業者有用嗎？"),
    ("B16",B,"健康食品品牌，39歲，iPhone","Google廣告","快速評估，30秒決定","30秒看不到任何品牌合作入口","lv","離開","沒有看到我想要的，走了"),
    ("B17",B,"連鎖速食品牌，53歲，MacBook","朋友推薦","尋找大規模合作方案","頁面感覺是給中小型場館","ex","繼續看，半信半疑","你們能處理大規模品牌部署嗎？"),
    ("B18",B,"保險金融品牌，37歲，iPhone","LinkedIn廣告","評估非傳統行銷渠道","金融業與場館合作邏輯不清晰","lv","離開","場館跟金融品牌有什麼關係？"),
    ("B19",B,"本地咖啡品牌，27歲，MacBook","IG廣告","有興趣，想了解怎麼在場館做推廣","找不到小品牌適合的合作方案","lv","離開","我這種小品牌也可以合作嗎？"),
    ("B20",B,"娛樂內容品牌，31歲，iPhone","朋友推薦","想找場館IP合作","網站沒有提到IP或內容合作","lv","離開","你們有做內容或IP授權合作嗎？"),
]
r1_franchise = [
    ("F01",F,"想加盟連鎖餐飲，35歲，iPhone","Google: 加盟推薦台灣","掃描頁面找加盟資訊","完全沒有加盟相關內容","lv","離開","這裡有加盟機會嗎？"),
    ("F02",F,"便當店業主想升級，48歲，Android","朋友推薦","進來找升級方案或加盟方案","找不到任何加盟或加入說明","lv","離開","我可以加入你們的系統嗎？"),
    ("F03",F,"現有餐廳想加入連鎖，42歲，MacBook","Google: 餐廳連鎖加盟台灣","仔細瀏覽","沒有加盟相關頁面或連結","lv","離開","MCS有加盟體系嗎？"),
    ("F04",F,"想開酒吧，29歲，iPhone","IG廣告","看到AI感興趣","不確定MCS是否提供開店輔導","ex","點AI問","你們可以幫我開一間酒吧嗎？"),
    ("F05",F,"現有小吃店老闆，55歲，Android","朋友口耳相傳","進來，找不到認識的東西","語言太技術化","lv","離開","這個對我有用嗎？"),
    ("F06",F,"投資人評估餐飲加盟，40歲，MacBook","Google: 餐飲加盟投資回報","找投資回報資料","沒有任何財務或加盟費說明","lv","離開","加盟費多少？回本期多長？"),
    ("F07",F,"連鎖鹹酥雞業主，33歲，iPhone","LINE廣告","快速掃描","完全沒有符合他需求的內容","lv","離開","這是給大場館的，不適合我"),
    ("F08",F,"想轉型為連鎖的手搖店，38歲，Android","Google廣告","找連鎖系統","找到的都是AI科技，不是連鎖管理","lv","離開","你們是連鎖管理平台嗎？"),
    ("F09",F,"多店型餐廳業主，45歲，MacBook","業界媒體報導","評估MCS系統是否支援多店管理","找不到多店管理功能說明","ex","繼續探索","支援多店管理嗎？"),
    ("F10",F,"加盟商評估平台，37歲，iPhone","Google搜尋","找MCS加盟說明","完全沒有加盟相關說明","lv","離開","看不到我要的"),
    ("F11",F,"早餐店老闆想轉型，50歲，Android","朋友介紹","進來很迷惑","頁面對傳統餐飲老闆不友善","lv","離開","這個是給做生意的人還是工程師的？"),
    ("F12",F,"飲料店加盟主，27歲，iPhone","TikTok廣告","被AI功能吸引","不清楚AI如何幫助加盟業務","ex","點AI試玩","AI能幫我管理加盟店嗎？"),
    ("F13",F,"連鎖火鍋業主，43歲，MacBook","Google廣告","評估系統導入","找不到導入流程說明","lv","離開","導入要多久？要培訓嗎？"),
    ("F14",F,"想接加盟的投資人，31歲，iPhone","朋友推薦","快速評估","完全看不到加盟收益模型","lv","離開","這個加盟能賺多少？"),
    ("F15",F,"便利商店前員工創業，26歲，Android","IG廣告","想找低成本創業工具","看不到價格，感覺很貴","lv","離開","我負擔得起嗎？"),
    ("F16",F,"現有加盟主評估換平台，44歲，MacBook","Google搜尋","比較MCS與現有系統","沒有競品比較或優勢說明","lv","離開","MCS比現有系統好在哪？"),
    ("F17",F,"多品牌餐飲集團，58歲，桌機","業界推薦","評估集團級導入","找不到企業級方案","lv","離開","你們有企業方案嗎？"),
    ("F18",F,"想做美食街的業主，36歲，iPhone","Google廣告","找美食街管理系統","找不到相關功能","lv","離開","你們管理美食街嗎？"),
    ("F19",F,"連鎖酒吧業主，32歲，Android","業界媒體","找連鎖酒吧管理方案","找不到連鎖酒吧相關案例","lv","離開","有連鎖酒吧的使用案例嗎？"),
    ("F20",F,"想加入MCS體系，25歲，iPhone","朋友介紹","進來尋找如何加入","找不到加入/申請入口","lv","離開","要怎麼成為MCS夥伴？"),
]
r1_tech = [
    ("T01",T,"後端工程師，想了解OmniCore API，28歲，MacBook","Google: OmniCore AI platform","尋找API文件或開發者入口","完全沒有API文件或開發者區","lv","離開","有API可以串接嗎？文件在哪？"),
    ("T02",T,"系統整合商，評估合作，40歲，MacBook","業界介紹","閱讀OmniCore生態說明","說明太模糊，沒有技術細節","ex","繼續探索","技術架構是什麼？"),
    ("T03",T,"AI新創，想進入OmniCore生態，32歲，MacBook","LinkedIn","評估合作可能","找不到技術夥伴申請流程","lv","離開","怎麼申請加入OmniCore生態？"),
    ("T04",T,"POS系統廠商，45歲，桌機","業界媒體","評估整合可能","找不到整合說明或webhook規格","lv","離開","跟我的POS系統可以串接嗎？"),
    ("T05",T,"資安工程師，評估資料安全，38歲，MacBook","Google","找隱私政策和資安說明","找不到資安/GDPR/資料說明","lv","離開","資料怎麼存？有無資安認證？"),
    ("T06",T,"Freelance工程師，35歲，MacBook","GitHub推薦","想找開源元件或SDK","完全沒有開源相關說明","lv","離開","有沒有SDK或開源工具？"),
    ("T07",T,"雲端架構師，42歲，MacBook","朋友推薦","評估技術棧和擴展性","技術棧（Next.js/Gemini）沒有明確說明","ex","繼續探索","底層用什麼技術？能擴展嗎？"),
    ("T08",T,"LINE官方帳號開發者，30歲，MacBook","社群討論","找LINE整合方式","沒有整合生態說明","lv","離開","支援LINE整合嗎？"),
    ("T09",T,"電商系統開發商，37歲，MacBook","業界媒體","評估O2O整合","找不到電商或金流整合說明","lv","離開","支援電商或金流整合嗎？"),
    ("T10",T,"IoT硬體商，44歲，桌機","業界活動","找硬體整合說明","完全沒有硬體或IoT相關內容","lv","離開","你們支援硬體整合嗎？"),
    ("T11",T,"數據分析師，33歲，MacBook","Google","找數據API或分析工具","沒有數據相關說明","lv","離開","能拿到場館數據嗎？"),
    ("T12",T,"React Native開發者，25歲，MacBook","GitHub","找行動端SDK","沒有行動開發相關資訊","lv","離開","有行動端SDK嗎？"),
    ("T13",T,"企業級IT採購，50歲，桌機","Google","評估安全和合規","找不到合規認證或SLA說明","lv","離開","SLA是多少？有沒有SOC2？"),
    ("T14",T,"軟體顧問公司，38歲，MacBook","客戶推薦","評估是否推薦給客戶","沒有足夠技術資料做評估","lv","離開","我無法向客戶推薦沒有技術文件的平台"),
    ("T15",T,"新創CTO，29歲，MacBook","朋友圈","快速評估技術合作","找不到技術合作申請","ex","點AI問技術問題","你們的AI是用什麼模型？"),
    ("T16",T,"數位轉型顧問，45歲，MacBook","LinkedIn廣告","評估平台完整度","頁面資訊不夠完整做評估","lv","離開","這個平台夠成熟嗎？"),
    ("T17",T,"Payment整合工程師，31歲，MacBook","業界討論","找金流整合API","沒有任何金流說明","lv","離開","支援哪些金流？"),
    ("T18",T,"AI產品經理，34歲，MacBook","Twitter/X","評估AI功能深度","AI功能描述太淺，無法評估","ex","繼續瀏覽","AI能做到什麼程度？"),
    ("T19",T,"台灣系統廠商BD，48歲，MacBook","業界介紹","評估代理或合作","找不到夥伴計畫說明","lv","離開","你們有代理商方案嗎？"),
    ("T20",T,"機器學習工程師，27歲，MacBook","朋友推薦","想了解AI訓練資料","完全不清楚AI如何訓練","lv","離開","你們的AI是怎麼訓練的？用什麼資料？"),
]

# Write Round 1
out.write(rh("round1","#c0392b","基線模擬 — 現況設計原封不動","問題密集，轉換極低","3.2%"))
out.write("""
<div style="padding:16px 20px;background:rgba(192,57,43,0.06);border:1px solid rgba(192,57,43,0.2);border-top:none;border-radius:0 0 10px 10px;">
<div class="stat-row">
  <div class="sb"><div class="sbn" style="color:#e74c3c">3.2%</div><div class="sbl">整體轉換率</div></div>
  <div class="sb"><div class="sbn" style="color:#e74c3c">72%</div><div class="sbl">立即離開</div></div>
  <div class="sb"><div class="sbn" style="color:#F5A623">22%</div><div class="sbl">繼續探索</div></div>
  <div class="sb"><div class="sbn" style="color:#27ae60">6%</div><div class="sbl">採取行動</div></div>
  <div class="sb"><div class="sbn">4.8s</div><div class="sbl">平均停留</div></div>
</div>
<div class="tab-bar">
  <button class="tb active" onclick="showTab(this,'r1-venue')">場館老闆 (V)</button>
  <button class="tb" onclick="showTab(this,'r1-brand')">品牌商 (B)</button>
  <button class="tb" onclick="showTab(this,'r1-franchise')">加盟商 (F)</button>
  <button class="tb" onclick="showTab(this,'r1-tech')">技術夥伴 (T)</button>
</div>
""")

out.write('<div class="tp active" id="r1-venue">')
out.write(stable(r1_venue))
out.write('</div>')
out.write('<div class="tp" id="r1-brand">')
out.write(stable(r1_brand))
out.write('</div>')
out.write('<div class="tp" id="r1-franchise">')
out.write(stable(r1_franchise))
out.write('</div>')
out.write('<div class="tp" id="r1-tech">')
out.write(stable(r1_tech))
out.write('</div>')

out.write("""
<div class="cmo-box">
<h3>CMO 自我檢討 — Round 1</h3>
<div class="ci"><div class="cn">1</div><div class="ct"><strong>「OmniCore」品牌名稱對所有訪客而言是障礙。</strong>場館老闆、品牌商、加盟商完全不知道OmniCore是什麼。這個名稱服務的是內部品牌架構，不是訪客心智。Hero區要換掉，改用訪客能理解的利益訴求。</div></div>
<div class="ci"><div class="cn">2</div><div class="ct"><strong>品牌商和加盟商被完全忽略。</strong>80個品牌商/加盟商情境中，100%找不到任何針對他們的內容。這代表設計只考慮了一個角色（場館老闆）。角色選擇卡不夠，要有每個角色的專屬落地頁。</div></div>
<div class="ci"><div class="cn">3</div><div class="ct"><strong>沒有任何轉換行動入口。</strong>整頁找不到「立即試用」「免費諮詢」「預約demo」等CTA。訪客就算有興趣也不知道下一步。</div></div>
<div class="ci"><div class="cn">4</div><div class="ct"><strong>技術夥伴找不到任何技術資料。</strong>20個技術角色，17個因為找不到API文件、技術規格而離開。開發者社群是重要的生態系成長引擎，卻完全沒有對應內容。</div></div>
<div class="ci"><div class="cn">5</div><div class="ct"><strong>頁面停留時間4.8秒，代表Hero就失敗了。</strong>訪客在Hero區就決定走，往下滾的比例極低。Hero必須在3秒內傳達「這是給你的、能幫你做X、立刻試試看」。</div></div>
</div>

<div class="design-box">
<h3>Round 2 設計調整方向</h3>
<div class="ba">
  <div class="bb"><div class="bal">BEFORE — 現況</div><div class="bat">Hero: OmniCore AI生態系 × 場館數位化（英文副標）。訪客不知道這是什麼、跟自己有何關係。</div></div>
  <div class="ab"><div class="bal">AFTER — 調整</div><div class="bat">Hero改為：「<strong>讓AI替你做70%的業務工作</strong>」——直接說出利益。副標依訪客角色動態切換（場館/品牌/加盟/技術）。</div></div>
</div>
<div class="ba">
  <div class="bb"><div class="bal">BEFORE — 現況</div><div class="bat">角色選擇卡 = 唯一的角色分流機制，點了之後只有AI對談。</div></div>
  <div class="ab"><div class="bal">AFTER — 調整</div><div class="bat">每個角色卡點擊後，跳到對應的「角色專屬說明區」，展示具體功能和CTA。</div></div>
</div>
<div class="ba">
  <div class="bb"><div class="bal">BEFORE — 現況</div><div class="bat">沒有明確CTA，訪客不知道下一步。</div></div>
  <div class="ab"><div class="bal">AFTER — 調整</div><div class="bat">Hero加入主CTA「免費體驗AI顧問」＋次CTA「看成功案例」。每個角色區塊底部加入對應CTA（預約demo / 申請合作 / 查看API文件）。</div></div>
</div>
</div>
</div>
</section>
""")

out.flush()
print("Round 1 written")
