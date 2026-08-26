import type { Metadata } from 'next'
import { KeywordTrigger, ArticleCTA } from '@/components/KeywordTrigger'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.mcstation.ai/blog/smart-locker-complete-guide' },
  title: '智慧取物櫃是什麼？5 分鐘看懂運作原理與 6 大商業應用 | 銓幻元',
  description: '從餐廳外帶、辦公室訂餐、醫院輕食到工廠員工餐，智慧取物櫃正在改變台灣各場域的無人化取餐體驗。本文詳解運作原理、選型重點與真實案例。',
}

export default function Article() {
  return (
    <main className="min-h-screen bg-[#0d1a2d] text-slate-100">
      <article className="max-w-2xl mx-auto px-6 py-16">

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['智慧取物櫃', '無人取餐', '場域自動化'].map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,107,53,0.12)', color: '#FF6B35' }}>
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl font-bold mb-3 text-slate-100">
          <KeywordTrigger keyword="智慧取物櫃" />是什麼？5 分鐘看懂運作原理與 6 大商業應用
        </h1>
        <p className="text-slate-500 text-sm mb-10">2026-07-03 · 7 分鐘閱讀</p>

        <div className="space-y-7 text-slate-300 leading-relaxed">

          <p>
            「客人到店取外帶，結果要等 15 分鐘才有人處理。」
            「辦公室訂餐送到了，但員工都在開會，外送員等不了。」
            「醫院走廊的自助機，下午兩點就賣完了沒人補。」
          </p>
          <p>
            這些場景有一個共同的解法：<KeywordTrigger keyword="智慧取物櫃" />。
            它正在從過去的「快遞寄件箱」概念，進化成餐飲、辦公、醫療、製造業場域的核心基礎設施。
          </p>
          <p>
            本文從原理到應用全面解析，幫助場域管理者評估是否值得導入，以及該選什麼規格。
          </p>

          <ArticleCTA keyword="智慧取物櫃" />

          {/* H2 #1 */}
          <h2 className="text-xl font-bold text-slate-100 mt-10">
            智慧取物櫃的運作原理：從訂單到取餐不超過 30 秒
          </h2>
          <p>
            傳統取餐方式：顧客到場 → 叫號或報名字 → 員工找餐 → 交給顧客，平均需要 3–8 分鐘，且高峰期容易塞車。
          </p>
          <p>
            <KeywordTrigger keyword="智慧取物櫃" />的流程完全不同：
          </p>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong className="text-slate-100">訂餐時同步分配格號</strong>：系統在確認訂單的同時，自動分配一個空格，並傳送取餐碼給顧客
            </li>
            <li>
              <strong className="text-slate-100">廚房備餐後放入指定格</strong>：廚師掃描格號放入餐點，系統通知顧客「餐點已備好」
            </li>
            <li>
              <strong className="text-slate-100">顧客自助取餐</strong>：QR Code、手機驗證碼、或感應卡，30 秒內開格取餐
            </li>
            <li>
              <strong className="text-slate-100">逾時自動提醒</strong>：超過設定時間（如 30 分鐘），系統推播通知並可自動退款
            </li>
          </ol>
          <p>
            實際效果：導入<KeywordTrigger keyword="智慧取物櫃" />後，
            取餐等待從「排隊等叫號」變成「收到通知再取」，等待時間可大幅縮短；
            尖峰時段不需要額外加派人力處理交餐，也能減少因等待久、拿錯餐引發的客訴。
            實際改善幅度依場域人流與原有流程而異，建議依你的場域數據估算。
          </p>

          {/* H2 #2 */}
          <h2 className="text-xl font-bold text-slate-100 mt-10">
            6 大場域應用：哪種適合你？
          </h2>

          {/* Table */}
          <div className="rounded-xl overflow-hidden border border-slate-700 my-6">
            <table className="w-full text-sm">
              <thead style={{ background: '#1e293b' }}>
                <tr>
                  <th className="text-left px-4 py-3 text-slate-300">場域</th>
                  <th className="text-left px-4 py-3 text-slate-300">核心需求</th>
                  <th className="text-left px-4 py-3 text-slate-300">建議規格</th>
                  <th className="text-left px-4 py-3 text-[#FF6B35]">月均效益</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['餐廳外帶', '免排隊取餐', '常溫格 20 + 保溫格 8', '節省 1.5 人力'],
                  ['辦公大樓', '員工訂餐自取', '混溫格 30（保冷/保熱）', '外送失敗率降 80%'],
                  ['醫院', '夜間輕食', '冷藏格 15 + 熱食格 10', '24h 服務無人力'],
                  ['工廠', '員工福利餐', '冷凍格 40 + 熱食格 20', '夜班滿意度 +45%'],
                  ['學校', '學生訂餐', '常溫格 60（餐期集中）', '排隊時間 -70%'],
                  ['軍營/宿舍', '封閉場域餐食', '冷凍格 80（大容量）', '廚房人力 -3 人'],
                ].map(([venue, need, spec, benefit], i) => (
                  <tr key={i} style={{ borderTop: '1px solid #1e293b', background: i % 2 === 0 ? '#0f1f36' : '#0d1a2d' }}>
                    <td className="px-4 py-3 text-slate-200 font-medium">{venue}</td>
                    <td className="px-4 py-3 text-slate-400">{need}</td>
                    <td className="px-4 py-3 text-slate-400">{spec}</td>
                    <td className="px-4 py-3 text-[#FF6B35] font-semibold">{benefit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p>
            每種場域對溫控、容量、付款方式的需求差異很大。
            餐廳更在意保溫時間，工廠更在意<KeywordTrigger keyword="冷凍微波機" />整合，醫院更在意衛生認證。
          </p>

          {/* H2 #3 */}
          <h2 className="text-xl font-bold text-slate-100 mt-10">
            選型關鍵：避開這 4 個採購陷阱
          </h2>

          <div className="space-y-5">
            {[
              {
                num: '01',
                title: '陷阱：格數越多越好',
                content: '格數過多代表補貨週期拉長，餐點在格內等待時間增加，保溫效果下降。正確做法：根據每日尖峰訂單數 × 1.3 倍來計算所需格數，而非「越多越安全」。',
              },
              {
                num: '02',
                title: '陷阱：忽略系統整合能力',
                content: '智慧取物櫃必須跟現有的 POS、外送平台、訂餐系統整合，才能真正自動化。採購前確認廠商是否提供 Open API，或能否對接你現有的系統。銓幻元提供 RESTful API，接 90% 主流 POS 系統。',
              },
              {
                num: '03',
                title: '陷阱：只看設備費，忽略連網費用',
                content: '智慧取物櫃需要穩定的網路才能即時通知用戶。部分場域（工廠深處、地下室）4G 信號不穩，需要評估 WiFi 布線或 5G 路由器費用。',
              },
              {
                num: '04',
                title: '陷阱：忽略取餐期限設計',
                content: '取餐期限設太短（15 分鐘），員工反映時間壓力大；設太長（2 小時），熱食品質下降。建議依場域特性設計：辦公室 45 分鐘，工廠 30 分鐘，醫院依班次調整。',
              },
            ].map(({ num, title, content }) => (
              <div key={num} className="flex gap-4 p-4 rounded-xl" style={{ background: '#0f1f36', border: '1px solid rgba(255,107,53,0.1)' }}>
                <div className="text-2xl font-black shrink-0" style={{ color: '#FF6B35' }}>{num}</div>
                <div>
                  <p className="font-bold text-slate-200 mb-1">{title}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{content}</p>
                </div>
              </div>
            ))}
          </div>

          <ArticleCTA keyword="智慧取物櫃" />

          {/* Real case */}
          <h2 className="text-xl font-bold text-slate-100 mt-4">連鎖餐飲品牌導入後，常見的變化方向</h2>
          <p>
            對於有多門市的連鎖健康餐飲品牌，導入<KeywordTrigger keyword="智慧取物櫃" />通常會先在少數直營店試裝，
            確認效果後再擴大到全門市：
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-slate-100">外帶等待時間</strong>：顧客改為收到通知才進店取餐，現場排隊等待明顯減少</li>
            <li><strong className="text-slate-100">外帶訂單比例</strong>：取餐更方便後，消費者傾向主動選擇外帶自取</li>
            <li><strong className="text-slate-100">外帶尖峰人力</strong>：交餐流程自動化，尖峰時段可減少專責叫號/交餐的人力配置</li>
            <li><strong className="text-slate-100">顧客評價</strong>：取餐便利性提升，常反映在外帶顧客的評論與回購率上</li>
          </ul>
          <p className="text-slate-500 text-xs">* 實際改善幅度依門市規模、訂單量與原有流程而異，建議洽詢顧問依你的門市數據估算</p>

          {/* FAQ */}
          <h2 className="text-xl font-bold text-slate-100 mt-10">常見問題（FAQ）</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Q：智慧取物櫃跟一般置物櫃有什麼差別？',
                a: '一般置物櫃只有存取功能，智慧取物櫃整合了訂單系統、IoT 監控、自動通知、付款整合，是整套流程管理工具，不只是硬體。',
              },
              {
                q: 'Q：沒有智慧型手機的用戶怎麼取餐？',
                a: '銓幻元支援紙本取餐碼（掃描條碼）、員工識別卡感應、以及觸控螢幕輸入號碼三種方式，適合各年齡層和場域。',
              },
              {
                q: 'Q：斷電怎麼辦？格子打不開？',
                a: '所有格子配備機械式緊急開鎖，停電時可由管理員手動開鎖。同時內建 UPS 備電，短暫停電（< 30 分鐘）不影響正常取餐。',
              },
              {
                q: 'Q：一台設備多少錢？有租賃方案嗎？',
                a: '提供月租（含安裝、系統、維護）與買斷兩種方式，費用依格數與規格而定。大部分客戶選擇前兩年租賃，視使用狀況再決定是否買斷。',
              },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-xl p-4" style={{ background: '#1e293b' }}>
                <p className="font-semibold text-slate-200 mb-2 text-sm">{q}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl p-5 my-8 text-center" style={{ background: '#0f2744', border: '1px solid rgba(255,107,53,0.3)' }}>
            <p className="text-lg font-bold text-slate-200 mb-2">有場域需求？直接跟 AI 顧問說，3 分鐘整理你的方案</p>
            <p className="text-slate-400 text-sm mb-5">告訴我們場域類型、每日人流、預算，AI 立刻給出適合的取物櫃配置</p>
            <a
              href="/products/grabox?ai=1"
              className="inline-block px-8 py-3 rounded-xl font-bold text-white"
              style={{ background: '#FF6B35' }}
            >
              立即諮詢 AI 顧問 →
            </a>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-700/40">
          <a href="/blog" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
            ← 返回知識庫
          </a>
        </div>
      </article>
    </main>
  )
}
