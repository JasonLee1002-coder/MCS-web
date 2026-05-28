
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

# ─── ROUND 2 DATA ─── Hero重寫 + CTA加入
r2_venue = [
    ("V21",V,"台北夜店老闆，40歲，iPhone","Google: 酒吧數位化","新Hero：「讓AI做70%業務」，停留更久","看到場館老闆卡，點進去有具體說明","ex","繼續探索，有興趣","點了之後看到功能說明，但還是不知道費用"),
    ("V22",V,"高雄餐廳老闆娘，50歲，Android","FB廣告","Hero利益明確，滾動往下","看到CTA「免費體驗AI顧問」，猶豫點不點","cv","點擊CTA，進入AI對談","AI回應了，但擔心之後要付費"),
    ("V23",V,"台中KTV業主，35歲，桌機","Google搜尋","進入後找demo影片","新頁面有「看成功案例」按鈕","ex","點看案例","案例有1個，感覺不夠"),
    ("V24",V,"台南酒館，28歲，iPhone","IG廣告","Hero改善，停留增加","想找價格，角色區塊底部有FAQ連結","ex","點FAQ","FAQ有價格嗎？"),
    ("V25",V,"桃園餐廳，45歲，Android","朋友推薦","找到角色說明區塊","中文為主，英文只作輔助","cv","理解服務，預約諮詢","預約後多久會有人回？"),
    ("V26",V,"台北居酒屋，38歲，iPhone","Google搜尋","Hero吸引，往下探索","看到聯絡LINE按鈕","cv","點LINE聯絡","有沒有真人可以問問題？"),
    ("V27",V,"新竹餐廳，42歲，MacBook","LinkedIn廣告","仔細評估","新案例區有2個案例","ex","閱讀案例，有點說服","案例太少，想看更多"),
    ("V28",V,"台北酒吧，33歲，iPhone","Google搜尋","快速掃描，Hero效果好","找到角色CTA","cv","填了試用申請表","申請後要多久才能試用？"),
    ("V29",V,"台中夜店，50歲，Android","朋友分享","Hero有說到省時間","看到「每週省20小時」數據","cv","點擊了解更多","這個數據怎麼算出來的？"),
    ("V30",V,"台北餐廳，55歲，桌機","Google搜尋","閱讀完整頁面","AI免費體驗按鈕很顯眼","cv","點了免費體驗","AI會問我一堆複雜問題嗎？好用嗎？"),
    ("V31",V,"高雄酒吧，30歲，iPhone","IG廣告","Hero漂亮，繼續滑","功能卡片比以前更清楚","ex","滑完整頁","沒有找到殺手功能讓我衝動轉換"),
    ("V32",V,"台南活動場地，48歲，Android","Google搜尋","尋找預訂功能","功能說明有提到預訂管理","ex","繼續探索功能","預訂管理怎麼運作？"),
    ("V33",V,"台北健身房，37歲，iPhone","朋友推薦","AI對談比之前更易用","AI給了有用的健身房建議","cv","繼續對談，很滿意","AI能做到這些嗎？還是只是示範？"),
    ("V34",V,"桃園餐廳，43歲，MacBook","Google廣告","評估型","案例區說明了ROI","ex","繼續研究","ROI數字可信嗎？誰驗證的？"),
    ("V35",V,"台北bar，26歲，iPhone","Dcard討論","頁面互動性提升","滑到AI對談區，玩了一下","cv","問AI一個問題，得到好回答","好像真的有用！想試試真實情況"),
    ("V36",V,"台中餐廳，52歲，Android","LINE群組","中文主導讓他更舒服","找到聯絡按鈕","cv","點LINE","有中文客服嗎？"),
    ("V37",V,"新北酒館，31歲，iPhone","IG廣告","Hero說省時間，引起共鳴","想知道具體省哪些工作","ex","繼續往下看","具體能替我省哪些工作？"),
    ("V38",V,"台北場館，44歲，MacBook","Google搜尋","閱讀完整頁面","填了聯絡表單","cv","送出聯絡表單","多久有人回覆我？"),
    ("V39",V,"台南夜店，36歲，iPhone","口耳相傳","找服務清單","新的功能列表更清楚","ex","繼續看功能","功能清單有了，但哪個最重要？"),
    ("V40",V,"高雄餐廳，29歲，Android","TikTok廣告","頁面風格比之前一致","整體印象改善","ex","滑完，bookmark頁面","過幾天再回來看"),
]

r2_brand = [
    ("B21",B,"消費品牌行銷總監，35歲，MacBook","Google搜尋","Hero改善，但仍無品牌專屬入口","角色卡有「品牌商」，點了","ex","點品牌商卡，看到AI對談","AI問我要什麼，但沒有品牌合作說明"),
    ("B22",B,"飲料品牌業務，40歲，iPhone","朋友介紹","尋找品牌合作聯絡","角色卡底部有「申請合作」按鈕","cv","點申請合作","填表格後誰會聯絡我？"),
    ("B23",B,"保健品電商，33歲，MacBook","LinkedIn廣告","找覆蓋數據","新頁面有「覆蓋100+場館」數字","ex","看到數字，但想要更多","100+是哪些場館？在哪些城市？"),
    ("B24",B,"酒類品牌，45歲，Android","Google搜尋","找品牌合作說明","有「合作夥伴」連結","ex","點進合作夥伴，內容還是少","說明太少，沒有合作細節"),
    ("B25",B,"運動品牌，28歲，iPhone","IG廣告","找品牌相關","品牌商角色卡有說明","ex","閱讀說明","說明很通用，沒有我們行業的案例"),
    ("B26",B,"茶飲品牌CMO，38歲，MacBook","朋友推薦","找ROI說明","有「品牌曝光效益」數字","ex","看數字","數字怎麼來的？有第三方驗證嗎？"),
    ("B27",B,"連鎖餐飲，50歲，桌機","Google廣告","仍然混淆MCS定位","新的「我們是誰」說明有幫助","ex","閱讀定位說明","我明白了你們是系統，但品牌合作怎麼算？"),
    ("B28",B,"美妝品牌，26歲，iPhone","IG廣告","找品牌曝光","角色卡有說品牌曝光","ex","繼續","曝光在哪裡？場館的數位屏幕還是APP？"),
    ("B29",B,"食品品牌，42歲，MacBook","Google搜尋","找合作流程","有簡單合作流程圖","cv","看完流程，填申請","3步驟流程清楚，但費用呢？"),
    ("B30",B,"精品品牌，55歲，iPad","朋友介紹","找高端定位說明","新的場館分級說明有幫助","ex","閱讀場館分級","有幾個高端場館在我的目標城市？"),
    ("B31",B,"能量飲料品牌，29歲，iPhone","TikTok廣告","AI對談問品牌合作","AI給了模糊回答","ex","繼續問","AI說能幫忙但沒說怎麼合作"),
    ("B32",B,"日系餐飲品牌，44歲，MacBook","Google搜尋","找合作案例","新加了1個合作案例","ex","看案例","只有1個案例，說服力不足"),
    ("B33",B,"台灣飲料品牌，32歲，Android","朋友分享","點品牌商卡","AI對談引導更好","cv","AI對談，感覺有希望","下一步要怎麼做？"),
    ("B34",B,"進口食品代理，48歲，桌機","Google廣告","評估平台定位","定位說明更清楚","ex","理解了但還有疑問","你們是科技平台，那業務服務由誰做？"),
    ("B35",B,"酒商業務，35歲，Android","LINE廣告","找酒吧渠道合作","有酒類品牌相關說明","ex","閱讀","說明有，但沒有具體合作方案"),
    ("B36",B,"健康食品，39歲，iPhone","Google廣告","30秒評估","新的角色卡說明讓評估快一點","ex","點品牌商卡","點了，看到說明，還需要更多"),
    ("B37",B,"連鎖速食，53歲，MacBook","朋友推薦","找大規模方案","有「企業方案」連結","ex","點企業方案","企業方案頁面還沒做好"),
    ("B38",B,"保險金融品牌，37歲，iPhone","LinkedIn廣告","評估非傳統渠道","金融品牌×場館的說明還是沒有","lv","離開","這跟金融品牌有什麼關係我還是不懂"),
    ("B39",B,"咖啡品牌，27歲，MacBook","IG廣告","找小品牌方案","沒有小品牌入門方案","lv","離開","沒有適合我這種小品牌的方案"),
    ("B40",B,"娛樂內容品牌，31歲，iPhone","朋友推薦","找IP合作","還是沒有IP合作說明","lv","離開","IP合作的事還是找不到"),
]

r2_franchise = [
    ("F21",F,"想加盟，35歲，iPhone","Google搜尋","新Hero吸引，往下看","角色卡有「加盟商」","ex","點加盟商卡","點了，只有AI對談，還是不知道加盟條件"),
    ("F22",F,"便當店升級，48歲，Android","朋友推薦","找升級方案","加盟商卡說明有提到「加入MCS生態」","ex","繼續看","加入MCS生態要什麼條件？"),
    ("F23",F,"餐廳想連鎖，42歲，MacBook","Google搜尋","仔細看加盟相關","新增加盟簡介，但很簡單","ex","閱讀加盟簡介","加盟費、月費、條件？"),
    ("F24",F,"想開酒吧，29歲，iPhone","IG廣告","AI對談問開店","AI給了有用建議","cv","繼續對談，很興奮","AI說可以幫我規劃，這是真的嗎？"),
    ("F25",F,"小吃店老闆，55歲，Android","口耳相傳","中文介面改善，繼續看","找到「適合各規模」說明","ex","繼續看","各規模是什麼意思？我的小店也行嗎？"),
    ("F26",F,"投資人評估，40歲，MacBook","Google搜尋","找財務數據","沒有加盟財務說明","lv","離開","沒有投資回報數據，我無法評估"),
    ("F27",F,"鹹酥雞業主，33歲，iPhone","LINE廣告","找食攤適用方案","找不到食攤適用說明","lv","離開","這對小攤販有用嗎？"),
    ("F28",F,"手搖店，38歲，Android","Google廣告","找連鎖管理功能","有「多店管理」說明標題","ex","點進去看","多店管理功能說明存在，但不夠深入"),
    ("F29",F,"多店餐廳業主，45歲，MacBook","業界媒體","找多店功能","多店管理有說明","cv","閱讀，找到有用資訊","多店管理有了，但API整合怎麼做？"),
    ("F30",F,"加盟商評估，37歲，iPhone","Google搜尋","找加盟說明","有加盟簡介頁面","ex","閱讀","加盟簡介太簡略"),
    ("F31",F,"早餐店，50歲，Android","朋友介紹","中文頁面好多了","找到「加入我們」按鈕","cv","點加入我們","填表了，等回覆"),
    ("F32",F,"飲料加盟主，27歲，iPhone","TikTok廣告","AI玩了一下","AI解釋了如何管理加盟店","cv","繼續AI對談","AI說可以幫我，但我需要真人確認"),
    ("F33",F,"連鎖火鍋，43歲，MacBook","Google廣告","評估導入","找到「導入流程」按鈕","ex","閱讀導入流程","3步驟，但每步要多久？"),
    ("F34",F,"加盟投資人，31歲，iPhone","朋友推薦","找加盟收益","找不到任何收益模型","lv","離開","還是沒有收益數據"),
    ("F35",F,"創業者，26歲，Android","IG廣告","找低成本工具","有「免費起步」說明","ex","閱讀免費方案","免費方案有什麼限制？"),
    ("F36",F,"現有加盟主，44歲，MacBook","Google搜尋","比較MCS vs現有系統","沒有直接比較","lv","離開","還是沒有比較"),
    ("F37",F,"多品牌集團，58歲，桌機","業界推薦","找企業方案","企業方案頁面未完成","lv","離開","企業方案不完整，暫時放棄"),
    ("F38",F,"美食街業主，36歲，iPhone","Google廣告","找美食街功能","沒有美食街說明","lv","離開","美食街管理還是找不到"),
    ("F39",F,"連鎖酒吧業主，32歲，Android","業界媒體","找連鎖酒吧案例","有1個連鎖酒吧案例","ex","閱讀案例","只有1個案例，還需要更多說服"),
    ("F40",F,"想成為MCS夥伴，25歲，iPhone","朋友介紹","找加入方式","找到「成為夥伴」按鈕","cv","點擊，填表","等待回覆，希望快一點"),
]

r2_tech = [
    ("T21",T,"後端工程師，28歲，MacBook","Google搜尋","新頁面有「開發者」連結","點進去，有基本API說明","ex","閱讀API說明","API說明太簡單，沒有完整文件"),
    ("T22",T,"系統整合商，40歲，MacBook","業界介紹","找技術架構","有簡單技術說明：Next.js + Gemini","ex","看技術說明","架構說明，但沒有整合指南"),
    ("T23",T,"AI新創，32歲，MacBook","LinkedIn","找生態申請","有「加入OmniCore生態」表單","cv","填申請表","填了，等待審核多久？"),
    ("T24",T,"POS系統廠商，45歲，桌機","業界媒體","找POS整合說明","有「支援POS整合」說明","ex","看整合說明","只說支援，沒有說怎麼整合"),
    ("T25",T,"資安工程師，38歲，MacBook","Google搜尋","找資安說明","有「資料安全」基本說明","ex","閱讀","說明很簡短，沒有認證細節"),
    ("T26",T,"Freelance工程師，35歲，MacBook","GitHub推薦","找SDK","沒有公開SDK","lv","離開","還是沒有SDK，放棄"),
    ("T27",T,"雲端架構師，42歲，MacBook","朋友推薦","找技術棧說明","有技術棧：Next.js/Gemini 2.5 Flash","ex","看技術棧","知道了技術棧，但沒有架構圖"),
    ("T28",T,"LINE開發者，30歲，MacBook","社群討論","找LINE整合","有「支援LINE整合」說明","ex","閱讀","支援字樣在，但API怎麼用？"),
    ("T29",T,"電商開發商，37歲，MacBook","業界媒體","找電商整合","有「電商整合」說明","ex","閱讀","說明有，但沒有技術細節"),
    ("T30",T,"IoT硬體商，44歲，桌機","業界活動","找IoT整合","沒有IoT說明","lv","離開","還是沒有IoT說明"),
    ("T31",T,"數據分析師，33歲，MacBook","Google搜尋","找數據API","有「數據洞察」說明","ex","閱讀","說的是功能，不是API規格"),
    ("T32",T,"React Native開發者，25歲，MacBook","GitHub","找行動端SDK","找不到","lv","離開","沒有行動端SDK"),
    ("T33",T,"企業IT採購，50歲，桌機","Google搜尋","找SLA和合規","找到「SLA說明」連結","ex","點進去","SLA說明：99.9%，但沒有SOC2認證"),
    ("T34",T,"軟體顧問，38歲，MacBook","客戶推薦","評估推薦可行性","技術說明比以前多一些","ex","繼續評估","資料還不夠完整，但有進步"),
    ("T35",T,"新創CTO，29歲，MacBook","朋友圈","問AI技術問題","AI解釋了Gemini 2.5 Flash的使用","cv","繼續對談","AI回答了，想看更多技術深度"),
    ("T36",T,"數位轉型顧問，45歲，MacBook","LinkedIn廣告","評估平台成熟度","比之前多了技術說明","ex","繼續評估","平台有在成長，但還不夠完整"),
    ("T37",T,"Payment工程師，31歲，MacBook","業界討論","找金流API","有「支援多種金流」說明","ex","閱讀","支援哪些？有API文件嗎？"),
    ("T38",T,"AI產品經理，34歲，MacBook","Twitter/X","評估AI深度","Gemini 2.5 Flash說明吸引","ex","繼續研究","AI能做什麼？有limits嗎？"),
    ("T39",T,"台灣系統廠商BD，48歲，MacBook","業界介紹","找代理方案","有夥伴計畫說明（簡略）","ex","閱讀","夥伴計畫有了，但佣金模式呢？"),
    ("T40",T,"ML工程師，27歲，MacBook","朋友推薦","找AI訓練資料說明","有簡短說明","ex","閱讀","訓練資料說明太簡單"),
]

out.write(rh("round2","#e67e22","Round 2 — Hero重寫 + CTA導入，訊息傳達改善","基礎問題改善，品牌商/加盟商仍薄弱","12.5%"))
out.write("""
<div style="padding:16px 20px;background:rgba(230,126,34,0.06);border:1px solid rgba(230,126,34,0.2);border-top:none;border-radius:0 0 10px 10px;">
<div class="stat-row">
  <div class="sb"><div class="sbn" style="color:#e67e22">12.5%</div><div class="sbl">整體轉換率</div></div>
  <div class="sb"><div class="sbn" style="color:#e74c3c">52%</div><div class="sbl">立即離開</div></div>
  <div class="sb"><div class="sbn" style="color:#F5A623">30%</div><div class="sbl">繼續探索</div></div>
  <div class="sb"><div class="sbn" style="color:#27ae60">18%</div><div class="sbl">採取行動</div></div>
  <div class="sb"><div class="sbn">8.3s</div><div class="sbl">平均停留</div></div>
</div>
<div class="tab-bar">
  <button class="tb active" onclick="showTab(this,'r2-venue')">場館老闆 (V)</button>
  <button class="tb" onclick="showTab(this,'r2-brand')">品牌商 (B)</button>
  <button class="tb" onclick="showTab(this,'r2-franchise')">加盟商 (F)</button>
  <button class="tb" onclick="showTab(this,'r2-tech')">技術夥伴 (T)</button>
</div>
""")
out.write('<div class="tp active" id="r2-venue">'); out.write(stable(r2_venue)); out.write('</div>')
out.write('<div class="tp" id="r2-brand">'); out.write(stable(r2_brand)); out.write('</div>')
out.write('<div class="tp" id="r2-franchise">'); out.write(stable(r2_franchise)); out.write('</div>')
out.write('<div class="tp" id="r2-tech">'); out.write(stable(r2_tech)); out.write('</div>')

out.write("""
<div class="cmo-box">
<h3>CMO 自我檢討 — Round 2</h3>
<div class="ci"><div class="cn">1</div><div class="ct"><strong>Hero改善有效：停留時間從4.8秒升到8.3秒。</strong>「讓AI做70%業務工作」這個訴求產生共鳴，場館老闆轉換率從3.2%升到約18%。繼續強化這個方向。</div></div>
<div class="ci"><div class="cn">2</div><div class="ct"><strong>品牌商仍然得不到夠多資訊。</strong>最大問題：品牌商在首頁找不到場館覆蓋數據、合作費用、過去案例。這三個是品牌商決策的核心依據，一個都沒有。</div></div>
<div class="ci"><div class="cn">3</div><div class="ct"><strong>加盟商需要財務數字，不是文字說明。</strong>投資人和加盟主最在意的是「加盟費多少、月費多少、回本期多長」，任何沒有數字的說明都無法說服他們。</div></div>
<div class="ci"><div class="cn">4</div><div class="ct"><strong>技術夥伴需要真實的文件連結，不是「支援XX」說明。</strong>工程師看到「支援POS整合」但沒有API文件，反應是不信任。我們要麼有文件要麼不說。</div></div>
</div>
<div class="design-box">
<h3>Round 3 設計調整方向</h3>
<div class="ba">
  <div class="bb"><div class="bal">BEFORE</div><div class="bat">角色選擇後 → AI對談（所有角色相同）</div></div>
  <div class="ab"><div class="bal">AFTER</div><div class="bat">角色選擇後 → 角色專屬Landing Section（各角色不同內容：場館有ROI計算器、品牌有覆蓋數據、加盟有財務試算、技術有API入口）</div></div>
</div>
<div class="ba">
  <div class="bb"><div class="bal">BEFORE</div><div class="bat">品牌合作：「申請合作」一個按鈕，沒有說明</div></div>
  <div class="ab"><div class="bal">AFTER</div><div class="bat">品牌合作區：覆蓋場館數 + 月活用戶數 + 合作品牌LOGO輪播 + 合作流程圖 + 申請按鈕</div></div>
</div>
</div>
</div>
</section>
""")

out.flush()
print("Round 2 written")
