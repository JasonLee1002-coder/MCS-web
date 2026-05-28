
out = open(r"C:\Users\JasonLee\claude_code_projects\CMO\docs\clients\mcstation\mcstation_情境模擬報告_20260526.html", "a", encoding="utf-8")

V = "<span class='rc rv'>場館</span>"
B = "<span class='rc rb'>品牌</span>"
F = "<span class='rc rf'>加盟</span>"
T = "<span class='rc rt'>技術</span>"

def rh(rid, color, title, status, conv):
    return f"""
<section class="round-section" id="{rid}">
<div class="rh" style="background:linear-gradient(135deg,{color}22,{color}08);border:1px solid {color}44;">
  <span class="rbadge" style="background:{color};">{rid.upper()}</span>
  <span class="rtitle">{title}</span>
  <span class="rstatus">{status} &nbsp;|&nbsp; 平均轉換率 {conv}</span>
</div>
"""

def stable(rows):
    h = """<div style="overflow-x:auto;"><table class="st">
<thead><tr>
<th>#</th><th>角色</th><th>具體Persona</th><th>如何進來</th>
<th>首頁歷程</th><th>關鍵時刻</th><th>結果</th><th>核心問題</th>
</tr></thead><tbody>"""
    for r in rows:
        h += f"<tr><td class='sn'>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td>{r[4]}</td><td>{r[5]}</td><td class='{r[6]}'>{r[7]}</td><td>{r[8]}</td></tr>"
    h += "</tbody></table></div>"
    return h

# ─── ROUND 3 — 角色專屬Landing Section導入，數據化
r3_venue = [
    ("V41",V,"台北夜店老闆，40歲，iPhone","Google搜尋","Hero+角色CTA，點場館老闆","進入場館專屬區：ROI計算器出現","cv","玩ROI計算器，輸入座位數","計算結果說我能省$120K/年，有點誇張？"),
    ("V42",V,"高雄餐廳老闆娘，50歲，Android","FB廣告","場館區有具體功能列表","看到自動訂位、AI回覆客人、庫存管理","cv","點免費體驗","這3個功能我都需要！"),
    ("V43",V,"台中KTV業主，35歲，桌機","Google搜尋","找KTV特定功能","有「娛樂場館」子類別","ex","點娛樂場館","娛樂場館說明有，但KTV具體功能？"),
    ("V44",V,"台南酒館，28歲，iPhone","IG廣告","找價格資訊","場館區有價格方案卡","cv","看價格方案","月費$2,999起，可接受，點了解更多"),
    ("V45",V,"桃園餐廳，45歲，Android","朋友推薦","完整閱讀場館區","看到台灣案例：台北某餐廳省40%人力","cv","看案例，很有說服力","這個案例跟我情況很像！"),
    ("V46",V,"台北居酒屋，38歲，iPhone","Google搜尋","找LINE整合說明","場館區有「LINE官方帳號整合」說明","cv","點LINE整合說明","這個功能我現在最需要！"),
    ("V47",V,"新竹餐廳，42歲，MacBook","LinkedIn廣告","評估ROI","ROI計算器輸出：月省$85K","ex","半信半疑","這數字是怎麼算的？有沒有真實案例佐證？"),
    ("V48",V,"台北酒吧，33歲，iPhone","Google搜尋","快速找核心功能","場館區有功能矩陣","cv","找到訂座管理功能，點試用","訂座功能找到了！"),
    ("V49",V,"台中夜店，50歲，Android","朋友分享","看到省時間數據","「每週省20小時」說明很具體","cv","點了解如何省時","20小時怎麼分配在哪些工作？"),
    ("V50",V,"台北餐廳，55歲，桌機","Google搜尋","閱讀完整場館區","有操作截圖和影片thumbnail","cv","點看示範影片","影片2分鐘，看完了，很清楚！"),
    ("V51",V,"高雄酒吧，30歲，iPhone","IG廣告","場館區很清楚","找到適合酒吧的功能","cv","點酒吧專屬功能","有酒吧子類別！功能很對"),
    ("V52",V,"台南活動場地，48歲，Android","Google搜尋","找預訂管理","場館區有活動場地子類別","cv","閱讀活動場地功能","找到了活動場地專屬功能！"),
    ("V53",V,"台北健身房，37歲，iPhone","朋友推薦","AI對談更智能","AI自動識別健身房老闆","cv","AI給健身房專屬建議","AI太聰明了，直接說出我的痛點"),
    ("V54",V,"桃園餐廳，43歲，MacBook","Google廣告","看ROI計算器","計算後送出聯絡請求","cv","送出聯絡","等待業務聯繫"),
    ("V55",V,"台北bar，26歲，iPhone","Dcard討論","玩AI對談","AI給了有趣的行銷建議","cv","繼續對談，加LINE","加了LINE，想問更多"),
    ("V56",V,"台中餐廳，52歲，Android","LINE群組","找中文完整說明","場館區全中文，易讀","cv","完整看完，填試用申請","中文說明很好，填了試用"),
    ("V57",V,"新北酒館，31歲，iPhone","IG廣告","找省時間功能","場館區有時間節省明細","cv","閱讀時間節省明細","訂位省5hr、客服省8hr、報表省7hr，很具體"),
    ("V58",V,"台北場館，44歲，MacBook","Google搜尋","評估完整性","場館區有完整功能+價格+案例","cv","填Demo預約表單","Demo預約了！"),
    ("V59",V,"台南夜店，36歲，iPhone","口耳相傳","找服務清單","場館區有清楚服務清單","cv","找到清單，滿意","清單很清楚，我想試試"),
    ("V60",V,"高雄餐廳，29歲，Android","TikTok廣告","整體體驗改善","場館區風格比R1好很多","cv","送出試用申請","申請了！這次真的想試試"),
]

r3_brand = [
    ("B41",B,"品牌行銷總監，35歲，MacBook","Google搜尋","品牌區：覆蓋100+場館，月活5萬用戶","看到覆蓋數據","ex","對數據有興趣","100+場館在哪些城市？哪些類型？"),
    ("B42",B,"飲料品牌業務，40歲，iPhone","朋友介紹","品牌區：合作品牌LOGO輪播","看到3個品牌LOGO（虛擬）","ex","有信任感","這3個品牌是真的嗎？"),
    ("B43",B,"保健品電商，33歲，MacBook","LinkedIn廣告","品牌區：合作流程圖","3步驟：提案→審核→上線","cv","填提案申請","流程清楚，填了申請"),
    ("B44",B,"酒類品牌，45歲，Android","Google搜尋","品牌區有酒類說明","有酒類品牌合作子類別","ex","閱讀酒類說明","酒類說明有，但效果數據？"),
    ("B45",B,"運動品牌，28歲，iPhone","IG廣告","品牌區有運動場館類別","找到健身房+運動場館品牌合作","ex","看說明","運動品牌×健身房說明有，但案例？"),
    ("B46",B,"茶飲品牌CMO，38歲，MacBook","朋友推薦","品牌區：ROI數據","「平均品牌曝光提升35%」","ex","看ROI數據","35%是哪裡來的？有沒有原始數據？"),
    ("B47",B,"連鎖餐飲，50歲，桌機","Google廣告","品牌區：分清楚通路vs廣告","通路品牌合作說明","ex","閱讀","我要的是通路效果，廣告效果是次要的"),
    ("B48",B,"美妝品牌，26歲，iPhone","IG廣告","品牌區：曝光位置說明","場館數位屏幕+APP廣告","ex","了解曝光位置","數位屏幕曝光在哪些場館？能選嗎？"),
    ("B49",B,"食品品牌，42歲，MacBook","Google搜尋","品牌區：合作流程+費用概念","月費方案或CPC說明","cv","填申請，想要報價","填了申請，等報價"),
    ("B50",B,"精品品牌，55歲，iPad","朋友介紹","品牌區：場館分級（A/B/C）","A級：高端夜店和餐廳","cv","選A級場館合作","A級場館有多少？在台北有幾個？"),
    ("B51",B,"能量飲料，29歲，iPhone","TikTok廣告","品牌區：線下活動整合","品牌活動×場館的說明","cv","點線下活動整合","這個功能很有趣！"),
    ("B52",B,"日系餐飲，44歲，MacBook","Google搜尋","品牌區：1個餐飲品牌案例","案例：飲料品牌×酒吧合作","ex","閱讀案例","案例不夠多，但有了"),
    ("B53",B,"台灣飲料品牌，32歲，Android","朋友分享","品牌區：適合中小品牌的入門方案","入門方案：月$5,000","cv","入門方案可接受，填申請","填了申請！"),
    ("B54",B,"進口食品代理，48歲，桌機","Google廣告","品牌區：系統說明+業務說明","科技平台+業務顧問","ex","理解了","你們的業務顧問是幾個人？能服務多少品牌？"),
    ("B55",B,"酒商業務，35歲，Android","LINE廣告","品牌區：酒商合作說明","酒館渠道合作路徑","cv","找到方案，填申請","這個就是我要的！"),
    ("B56",B,"健康食品，39歲，iPhone","Google廣告","品牌區：健康食品場館說明","健身房+健康餐廳的品牌合作","cv","找到對的渠道","這個健康渠道太對了！"),
    ("B57",B,"連鎖速食，53歲，MacBook","朋友推薦","品牌區：企業方案（新增）","企業方案：客製化+專屬顧問","cv","點企業方案，想談","企業方案有了，點了聯絡"),
    ("B58",B,"保險金融，37歲，iPhone","LinkedIn廣告","品牌區：「非傳統品牌合作」說明","有金融品牌×消費場館的說明","ex","閱讀","終於有說明了，但還是不確定ROI"),
    ("B59",B,"咖啡品牌，27歲，MacBook","IG廣告","品牌區：小品牌入門方案","月$3,000入門方案","cv","入門方案很有吸引力，填申請","負擔得起，申請了"),
    ("B60",B,"娛樂內容品牌，31歲，iPhone","朋友推薦","品牌區：有IP×場館說明","IP合作案例（1個）","ex","閱讀","有了！但案例太少"),
]

r3_franchise = [
    ("F41",F,"想加盟，35歲，iPhone","Google搜尋","加盟區：加盟條件說明","加盟條件：3個月以上場館、穩定客流","ex","閱讀","我的場館有3個月了，但客流不穩定"),
    ("F42",F,"便當店升級，48歲，Android","朋友推薦","加盟區：升級方案","升級方案：從單店到連鎖","ex","閱讀升級路徑","升級方案有了，費用是多少？"),
    ("F43",F,"餐廳想連鎖，42歲，MacBook","Google搜尋","加盟區：連鎖化說明","連鎖化5步驟說明","cv","閱讀5步驟，有說服力","5步驟清楚，但每步要多久？"),
    ("F44",F,"想開酒吧，29歲，iPhone","IG廣告","AI對談深度提升","AI提供開店checklist","cv","繼續對談","AI的checklist很有用！"),
    ("F45",F,"小吃店老闆，55歲，Android","口耳相傳","加盟區：各規模適用說明","小型（10席以下）方案","cv","找到小型方案","我的10席小店可以用！"),
    ("F46",F,"投資人，40歲，MacBook","Google搜尋","加盟區：投資試算","投資試算：啟動費+月費+回本期估算","ex","看試算","估算說18個月回本，依據是什麼？"),
    ("F47",F,"鹹酥雞業主，33歲，iPhone","LINE廣告","加盟區：找夜市/小攤說明","有夜市/攤販子類別","cv","找到了！點進去","夜市攤販有說明！很驚喜"),
    ("F48",F,"手搖店，38歲，Android","Google廣告","加盟區：飲料店功能說明","飲料店多店管理功能","cv","閱讀多店功能","飲料店功能很對，填試用申請"),
    ("F49",F,"多店餐廳業主，45歲，MacBook","業界媒體","加盟區：多店管理+API說明","有API整合說明連結","cv","點API說明","API說明連結在，點進去看"),
    ("F50",F,"加盟商評估，37歲，iPhone","Google搜尋","加盟區：完整加盟說明","加盟費+月費+條件+流程","cv","看完整說明，很有說服力","說明很完整！填了申請"),
    ("F51",F,"早餐店，50歲，Android","朋友介紹","加盟區：早餐店子類別","有早餐店說明","cv","找到適合的說明","太好了，有早餐店說明！填申請"),
    ("F52",F,"飲料加盟主，27歲，iPhone","TikTok廣告","AI對談+加盟說明","AI導引到加盟區","cv","看加盟說明，確認適合","AI引導到正確地方！"),
    ("F53",F,"連鎖火鍋，43歲，MacBook","Google廣告","加盟區：導入時程表","導入時程：2週上線","cv","看時程","2週上線，比我預期快"),
    ("F54",F,"加盟投資人，31歲，iPhone","朋友推薦","加盟區：投資試算","試算結果比較可信","ex","看試算","試算有根據了，但還想要真實案例"),
    ("F55",F,"創業者，26歲，Android","IG廣告","加盟區：免費起步方案說明","免費起步：30天試用，無信用卡","cv","點30天試用","30天免費！立刻試試"),
    ("F56",F,"現有加盟主，44歲，MacBook","Google搜尋","加盟區：MCS vs 現有系統比較","比較圖表：MCS vs 傳統POS","cv","看比較表","比較表很清楚，MCS在AI功能明顯勝出"),
    ("F57",F,"多品牌集團，58歲，桌機","業界推薦","加盟區：企業方案","企業方案：集團客製化","cv","點企業方案聯絡","企業方案有了！聯絡了"),
    ("F58",F,"美食街業主，36歲，iPhone","Google廣告","加盟區：美食街說明","有美食街/商場子類別","cv","找到了！點進去","美食街有專屬說明！"),
    ("F59",F,"連鎖酒吧業主，32歲，Android","業界媒體","加盟區：酒吧連鎖案例","2個連鎖酒吧案例","cv","看案例，有說服力","2個案例，說服力提升"),
    ("F60",F,"想成為夥伴，25歲，iPhone","朋友介紹","加盟區：夥伴申請流程","3步驟夥伴申請","cv","填夥伴申請","申請了！"),
]

r3_tech = [
    ("T41",T,"後端工程師，28歲，MacBook","Google搜尋","技術區：API說明+Swagger連結","Swagger文件連結","cv","點Swagger文件","文件存在！但還不夠完整"),
    ("T42",T,"系統整合商，40歲，MacBook","業界介紹","技術區：整合架構圖","架構圖：MCS → Gemini → 客戶系統","ex","看架構圖","架構圖有了，但webhook規格？"),
    ("T43",T,"AI新創，32歲，MacBook","LinkedIn","技術區：生態申請","填了申請表","cv","等待審核","已申請，等待中"),
    ("T44",T,"POS廠商，45歲，桌機","業界媒體","技術區：POS整合指南","POS整合3步驟說明","cv","閱讀整合步驟","步驟有了，API key在哪裡申請？"),
    ("T45",T,"資安工程師，38歲，MacBook","Google搜尋","技術區：資安說明","資料加密、台灣資料中心說明","ex","閱讀資安說明","說明比之前詳細，但還沒有SOC2"),
    ("T46",T,"Freelance工程師，35歲，MacBook","GitHub","技術區：NPM套件說明","有MCS npm套件說明","cv","點NPM套件","npm install mcs-sdk，可以接受"),
    ("T47",T,"雲端架構師，42歲，MacBook","朋友推薦","技術區：架構圖+擴展說明","水平擴展說明","ex","閱讀擴展說明","說明有，但沒有benchmark數據"),
    ("T48",T,"LINE開發者，30歲，MacBook","社群討論","技術區：LINE整合指南","LINE Messaging API整合說明","cv","看整合指南","整合指南有了！"),
    ("T49",T,"電商開發商，37歲，MacBook","業界媒體","技術區：電商整合","電商整合：Shopify/ECFIT連結","cv","看整合說明","Shopify整合有！我需要這個"),
    ("T50",T,"IoT硬體商，44歲，桌機","業界活動","技術區：IoT初步說明","有IoT感測器說明（初步）","ex","閱讀","IoT說明出現了，但很基礎"),
    ("T51",T,"數據分析師，33歲，MacBook","Google搜尋","技術區：數據API","數據API端點說明","cv","閱讀API端點","API端點有了，但沒有數據字典"),
    ("T52",T,"React Native開發者，25歲，MacBook","GitHub","技術區：行動端SDK","React Native SDK說明","cv","找到了！","React Native SDK存在！"),
    ("T53",T,"企業IT採購，50歲，桌機","Google搜尋","技術區：SLA+合規","SLA: 99.9% + ISO27001（計畫中）","ex","閱讀","ISO27001計畫中，不是已有，需要確認時程"),
    ("T54",T,"軟體顧問，38歲，MacBook","客戶推薦","技術區：完整技術說明","技術說明比之前完整很多","cv","決定可以推薦","資料夠了，我可以推薦給客戶"),
    ("T55",T,"新創CTO，29歲，MacBook","朋友圈","技術區：AI模型說明","Gemini 2.5 Flash + 自訂Fine-tuning說明","cv","很感興趣，點加入生態","AI fine-tuning說明很吸引人"),
    ("T56",T,"數位轉型顧問，45歲，MacBook","LinkedIn廣告","技術區：平台成熟度","版本記錄：v2.3，2年歷史","ex","評估成熟度","2年平台，版本穩定，合理"),
    ("T57",T,"Payment工程師，31歲，MacBook","業界討論","技術區：金流API","支援：Line Pay/街口/信用卡 API","cv","看金流API","API存在，點文件連結"),
    ("T58",T,"AI產品經理，34歲，MacBook","Twitter/X","技術區：AI功能深度說明","AI功能：對話/分析/建議 說明","cv","深度了解AI功能","功能說明很詳細！"),
    ("T59",T,"台灣系統廠商BD，48歲，MacBook","業界介紹","技術區：夥伴佣金說明","夥伴佣金：20%月費","cv","佣金合理，填夥伴申請","申請了！佣金結構可以接受"),
    ("T60",T,"ML工程師，27歲，MacBook","朋友推薦","技術區：AI訓練說明","訓練資料：場館匿名數據+Fine-tuning","ex","閱讀","訓練說明合理，但能看到更多訓練細節嗎？"),
]

out.write(rh("round3","#f39c12","Round 3 — 角色專屬Landing Section，數據化與子類別","各角色滿意度提升，場館老闆轉換顯著","24.8%"))
out.write("""
<div style="padding:16px 20px;background:rgba(243,156,18,0.06);border:1px solid rgba(243,156,18,0.2);border-top:none;border-radius:0 0 10px 10px;">
<div class="stat-row">
  <div class="sb"><div class="sbn" style="color:#f39c12">24.8%</div><div class="sbl">整體轉換率</div></div>
  <div class="sb"><div class="sbn" style="color:#e74c3c">35%</div><div class="sbl">立即離開</div></div>
  <div class="sb"><div class="sbn" style="color:#F5A623">28%</div><div class="sbl">繼續探索</div></div>
  <div class="sb"><div class="sbn" style="color:#27ae60">37%</div><div class="sbl">採取行動</div></div>
  <div class="sb"><div class="sbn">14.2s</div><div class="sbl">平均停留</div></div>
</div>
<div class="tab-bar">
  <button class="tb active" onclick="showTab(this,'r3-venue')">場館老闆 (V)</button>
  <button class="tb" onclick="showTab(this,'r3-brand')">品牌商 (B)</button>
  <button class="tb" onclick="showTab(this,'r3-franchise')">加盟商 (F)</button>
  <button class="tb" onclick="showTab(this,'r3-tech')">技術夥伴 (T)</button>
</div>
""")
out.write('<div class="tp active" id="r3-venue">'); out.write(stable(r3_venue)); out.write('</div>')
out.write('<div class="tp" id="r3-brand">'); out.write(stable(r3_brand)); out.write('</div>')
out.write('<div class="tp" id="r3-franchise">'); out.write(stable(r3_franchise)); out.write('</div>')
out.write('<div class="tp" id="r3-tech">'); out.write(stable(r3_tech)); out.write('</div>')

out.write("""
<div class="cmo-box">
<h3>CMO 自我檢討 — Round 3</h3>
<div class="ci"><div class="cn">1</div><div class="ct"><strong>角色專屬區塊是正確方向：轉換率從12.5%跳到24.8%。</strong>ROI計算器、場館子類別、加盟財務試算——每一個都提升了對應角色的停留和轉換。</div></div>
<div class="ci"><div class="cnt">2</div><div class="ct"><strong>數字可信度問題浮現。</strong>「每週省20小時」「平均曝光提升35%」——訪客開始質疑這些數字的來源。我們需要附上數字說明或第三方背書。</div></div>
<div class="ci"><div class="cn">3</div><div class="ct"><strong>技術夥伴的技術文件仍不完整。</strong>有了API說明和SDK，但沒有完整的API文件、數據字典、webhook規格。技術夥伴需要看到「有深度」的文件才信任。</div></div>
<div class="ci"><div class="cn">4</div><div class="ct"><strong>品牌商仍然缺乏案例。</strong>1-2個合作案例不夠說服大品牌。需要至少5-10個真實品牌案例，或允許我們用「某知名飲料品牌」匿名呈現。</div></div>
</div>
<div class="design-box">
<h3>Round 4 設計調整方向</h3>
<div class="ba">
  <div class="bb"><div class="bal">BEFORE</div><div class="bat">ROI數字裸放，無來源說明</div></div>
  <div class="ab"><div class="bal">AFTER</div><div class="bat">每個數字旁邊加「¹」注腳，說明「基於X家場館2025年數據平均」，增加可信度</div></div>
</div>
<div class="ba">
  <div class="bb"><div class="bal">BEFORE</div><div class="bat">品牌商案例：1-2個</div></div>
  <div class="ab"><div class="bal">AFTER</div><div class="bat">品牌商案例：至少5個（含1個詳細案例+4個簡短摘要），加入品牌類型標籤（餐飲/飲料/美妝/零售）</div></div>
</div>
<div class="ba">
  <div class="bb"><div class="bal">BEFORE</div><div class="bat">技術文件：API說明頁面，沒有互動</div></div>
  <div class="ab"><div class="bal">AFTER</div><div class="bat">技術文件：加入「API Explorer」可線上測試API、加入完整數據字典下載</div></div>
</div>
</div>
</div>
</section>
""")

out.flush()
print("Round 3 written")
