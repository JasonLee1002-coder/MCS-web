import type { Metadata } from 'next'
import { KeywordTrigger, ArticleCTA } from '@/components/KeywordTrigger'

export const metadata: Metadata = {
  title: '餐廳導入智慧取物櫃：外帶免排隊的完整解決方案與投資報酬分析 | 銓幻元',
  description: '餐廳外帶尖峰時段排隊 15 分鐘是常態？智慧取物櫃讓外帶自取等待時間降至 30 秒，同時釋放 1–2 人力。本文提供選型指南、真實案例與 ROI 試算。',
}

export default function Article() {
  return (
    <main className="min-h-screen bg-[#0d1a2d] text-slate-100">
      <article className="max-w-2xl mx-auto px-6 py-16">
        <div className="flex flex-wrap gap-2 mb-6">
          {['智慧取物櫃', '餐廳外帶', '無人取餐'].map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,107,53,0.12)', color: '#FF6B35' }}>{tag}</span>
          ))}
        </div>
        <h1 className="text-3xl font-bold mb-3 text-slate-100">
          餐廳導入<KeywordTrigger keyword="智慧取物櫃" />：外帶免排隊的完整解決方案與投資報酬分析
        </h1>
        <p className="text-slate-500 text-sm mb-10">2026-07-03 · 6 分鐘閱讀</p>

        <div className="space-y-7 text-slate-300 leading-relaxed">

          <p>
            台灣餐廳外帶比例在 2026 年已佔整體營收的 38–52%（依業態不同），但大多數餐廳的取餐流程仍停留在「員工叫號、顧客等待」的人工模式。
            尖峰時段 1 個員工同時要應付 4–6 組外帶顧客，手忙腳亂之餘還要維持內用服務品質。
          </p>
          <p>
            銓幻元<KeywordTrigger keyword="智慧取物櫃" />方案已協助超過 120 間台灣餐廳解決這個問題。
            本文整理選型重點、常見踩坑和實際 ROI，幫助餐廳老闆做決策。
          </p>

          <ArticleCTA keyword="智慧取物櫃" />

          <h2 className="text-xl font-bold text-slate-100 mt-10">餐廳外帶面臨的 3 個核心痛點</h2>
          <div className="space-y-4">
            {[
              {
                num: '01',
                title: '尖峰時段的人力瓶頸',
                content: '午餐 12:00–13:00、晚餐 18:00–19:30 是外帶高峰，但這兩個時段同時也是內用最忙的時候。一個人既要出餐給外帶顧客，又要服務內用桌位，效率必然下降。',
              },
              {
                num: '02',
                title: '外帶等待造成的差評',
                content: '「等了 15 分鐘才拿到餐，一星差評。」這類 Google 評論對餐廳殺傷力極大。外帶顧客沒有內用的用餐體驗補償，對等待的忍耐度更低。',
              },
              {
                num: '03',
                title: '外送平台訂單與現場訂單衝突',
                content: 'Uber Eats 訂單突然湧入，同時現場顧客在等，廚房哪邊先出？沒有系統協助排序，員工只能憑感覺，失誤率和漏單率都會提高。',
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

          <h2 className="text-xl font-bold text-slate-100 mt-10">
            <KeywordTrigger keyword="智慧取物櫃" />怎麼解決這些問題？
          </h2>
          <p>核心邏輯是「把取餐這個動作從員工手中完全移走」：</p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong className="text-slate-100">線上預訂同步分格</strong>：Uber Eats / foodpanda / 自家 App 訂單確認時，系統自動分配格號</li>
            <li><strong className="text-slate-100">廚房出餐掃格</strong>：廚師備好後掃描格號放入，系統自動推播「您的餐點已備好」給顧客</li>
            <li><strong className="text-slate-100">顧客 30 秒自取</strong>：手機收到取餐碼，到機台掃一下，開格拿走，全程不需要員工介入</li>
            <li><strong className="text-slate-100">外送員同樣適用</strong>：外送員用平台 App QR Code 取餐，不需要等員工確認</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-100 mt-10">選型重點：餐廳場域的特殊需求</h2>
          <div className="rounded-xl overflow-hidden border border-slate-700">
            <table className="w-full text-sm">
              <thead style={{ background: '#1e293b' }}>
                <tr>
                  <th className="text-left px-4 py-3 text-slate-300">選型項目</th>
                  <th className="text-left px-4 py-3 text-slate-300">餐廳必看重點</th>
                  <th className="text-left px-4 py-3 text-[#FF6B35]">銓幻元規格</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['保溫時間', '熱食離開廚房到取走最多 40 分鐘', '60 分鐘恆溫保持 65°C+'],
                  ['格子大小', '便當盒/飲料/多人餐都要放得進', '三種格型：S/M/L 可混搭'],
                  ['POS 整合', '結帳後自動分格，不需要手動輸入', '支援 Winfood/iCHEF/橘子/自建'],
                  ['外送平台對接', 'Uber Eats/foodpanda 訂單直通', 'API 已預建，1-2 天完成串接'],
                  ['佔地面積', '餐廳空間寸土寸金', '最小方案 0.5m×0.6m（10格）'],
                  ['外觀客製', '要符合餐廳風格', '可客製門板顏色和品牌 Logo'],
                ].map(([item, req, spec], i) => (
                  <tr key={i} style={{ borderTop: '1px solid #1e293b', background: i % 2 === 0 ? '#0f1f36' : '#0d1a2d' }}>
                    <td className="px-4 py-3 text-slate-300 font-medium">{item}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{req}</td>
                    <td className="px-4 py-3 text-[#FF6B35] font-semibold text-xs">{spec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-8">真實案例：台北中山區日式定食（3 家門市）</h2>
          <p>
            台北中山區某日式定食連鎖（客單價 NT$280，外帶佔 55%），2025 年 Q3 在旗艦店試裝 20 格<KeywordTrigger keyword="智慧取物櫃" />：
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>外帶平均等待時間：8.4 分鐘 → <strong className="text-[#FF6B35]">1.1 分鐘</strong></li>
            <li>外帶員工需求：2 人 → <strong className="text-[#FF6B35]">0.5 人</strong>（現有員工兼辦）</li>
            <li>外帶 Google 評分關鍵詞：「外帶很快」出現次數增加 340%</li>
            <li>外帶訂單比例：55% → <strong className="text-[#FF6B35]">63%</strong>（顧客因為方便而主動增加外帶頻率）</li>
            <li>月省人力成本：約 NT$35,000</li>
            <li>設備月租費：NT$4,200</li>
            <li>結論：<strong className="text-[#FF6B35]">1 個月內正回報，3 個月後展開全門市導入</strong></li>
          </ul>

          <h2 className="text-xl font-bold text-slate-100 mt-8">常見問題（FAQ）</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Q：顧客不會用取物機怎麼辦？',
                a: '導入初期有 5–10% 顧客需要引導，通常 2 週後就完全習慣。銓幻元提供教學小卡和收銀台 QR Code 說明影片。從我們的客戶數據看，65 歲以上顧客的使用率在第 2 個月就達到 80%+。',
              },
              {
                q: 'Q：熱食放太久會冷掉嗎？',
                a: '保溫格維持 65°C，標準取餐時間在 30 分鐘內，品質無虞。若顧客超過 40 分鐘未取，系統會推播第二次提醒。超過 60 分鐘可設定自動退款或轉為外送。',
              },
              {
                q: 'Q：機台壞掉怎麼辦，餐廳會癱瘓嗎？',
                a: '銓幻元提供 4 小時緊急維修（大台北地區），其他縣市 8 小時內。機台可設定「備援模式」，故障時改回員工人工出餐，不影響營業。',
              },
              {
                q: 'Q：租賃方案最短合約是多少？',
                a: '最短 6 個月，含安裝、系統、維護、POS 串接一次費用（NT$3,000）。超過 12 個月簽約可享 8 折月費，超過 24 個月可選擇換購買斷。',
              },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-xl p-4" style={{ background: '#1e293b' }}>
                <p className="font-semibold text-slate-200 mb-2 text-sm">{q}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl p-5 my-6 text-center" style={{ background: '#0f2744', border: '1px solid rgba(255,107,53,0.3)' }}>
            <p className="text-lg font-bold text-slate-200 mb-2">有場域需求？直接跟 AI 顧問說，3 分鐘整理你的方案</p>
            <p className="text-slate-400 text-sm mb-5">告訴我們門市數量、日均外帶訂單、現有 POS 系統，AI 立刻給出最適合的取物櫃配置</p>
            <a href="/solutions/smart-locker?utm_source=blog&utm_medium=article-bottom&utm_campaign=restaurant-takeout"
              className="inline-block px-8 py-3 rounded-xl font-bold text-white" style={{ background: '#FF6B35' }}>
              立即諮詢 AI 顧問 →
            </a>
          </div>

        </div>
        <div className="mt-12 pt-8 border-t border-slate-700/40">
          <a href="/blog" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">← 返回知識庫</a>
        </div>
      </article>
    </main>
  )
}
