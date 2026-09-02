import type { Metadata } from 'next'
import { KeywordTrigger, ArticleCTA } from '@/components/KeywordTrigger'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.mcstation.ai/blog/frozen-vending-military-closed-venue' },
  title: '軍方封閉場域的冷凍食品補給：無人值守完整方案與採購流程說明',
  description: '軍營、兵器廠、後勤基地等封閉場域，夜間餐食問題長年無解。本文說明適合軍方場域的冷凍販賣機規格、採購流程、安全規範與實際案例。',
}

export default function Article() {
  return (
    <main className="min-h-screen bg-[#0d1a2d] text-slate-100">
      <article className="max-w-2xl mx-auto px-6 py-16">
        <div className="flex flex-wrap gap-2 mb-6">
          {['冷凍販賣機', '軍方場域', '封閉場域'].map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,107,53,0.12)', color: '#FF6B35' }}>{tag}</span>
          ))}
        </div>
        <h1 className="text-3xl font-bold mb-3 text-slate-100">
          軍方封閉場域的冷凍食品補給：<KeywordTrigger keyword="冷凍販賣機" slug="frozen-microwave" />無人值守完整方案
        </h1>
        <p className="text-slate-500 text-sm mb-10">2026-07-03 · 6 分鐘閱讀</p>

        <div className="space-y-7 text-slate-300 leading-relaxed">

          <p>
            軍方場域（軍營、後勤基地、役男訓練中心、武器倉庫等）有幾個特殊性：
            24 小時都有人員值守、廚房只在特定時段供餐、門禁嚴格使外部外送不可能進入。
            夜間值班士兵或職業軍人，餓了只能吃軍人福利社的泡麵或自備零食。
          </p>
          <p>
            銓幻元自 2024 年起開始接觸軍方場域需求，已服務多個軍方相關場域，使用<KeywordTrigger keyword="冷凍販賣機" slug="frozen-microwave" />。
            本文針對想進入這個市場的設備採購官或後勤主管，提供完整的評估框架。
          </p>

          <ArticleCTA keyword="冷凍販賣機" slug="frozen-microwave" />

          <h2 className="text-xl font-bold text-slate-100 mt-10">軍方場域的 4 個特殊規格要求</h2>
          <div className="space-y-4">
            {[
              {
                title: '1. 無網路 / 離線運作能力',
                content: '部分軍方場域（尤其是武器庫、山地基地）限制無線網路接入。冷凍販賣機必須支援「離線模式」：本地端儲存交易記錄，聯網時再同步上傳。銓幻元所有機台標配離線運作能力，斷網後可持續正常運作 72 小時，復網後自動同步。',
              },
              {
                title: '2. 國家採購法合規',
                content: '政府採購依政府採購法的公告金額級距決定招標方式，實際級距請以主管機關公告為準。銓幻元已取得政府採購網廠商資格，可配合以下方式採購：公開招標、限制性招標（依規定比價）、文件備齊：規格書、報價單、型錄、政府電子採購平台完整資料。',
              },
              {
                title: '3. 資安與存取紀錄要求',
                content: '軍方場域要求完整的使用者存取紀錄（誰在什麼時間取用了什麼）。銓幻元機台支援軍方識別卡（IC 卡）刷卡取餐，每筆交易完整記錄並可匯出 CSV，符合後勤稽核需求。',
              },
              {
                title: '4. 強固型外殼與防破壞設計',
                content: '軍事場域環境條件較嚴苛，同時也需要考慮設備被惡意破壞的可能性。銓幻元軍方版機台採用 3mm 鋼板外殼（一般版為 1.5mm），正面玻璃換為強化玻璃，鎖具升級為雙重鎖定機制。',
              },
            ].map(({ title, content }) => (
              <div key={title} className="p-4 rounded-xl" style={{ background: '#0f1f36', border: '1px solid rgba(255,107,53,0.1)' }}>
                <p className="font-bold text-slate-200 mb-2 text-sm">{title}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{content}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-10">軍方場域規格對比表</h2>
          <div className="rounded-xl overflow-hidden border border-slate-700">
            <table className="w-full text-sm">
              <thead style={{ background: '#1e293b' }}>
                <tr>
                  <th className="text-left px-4 py-3 text-slate-300">規格</th>
                  <th className="text-left px-4 py-3 text-slate-300">一般版</th>
                  <th className="text-left px-4 py-3 text-[#FF6B35]">軍方版</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['外殼厚度', '1.5mm 冷軋鋼板', '3mm 防彈鋼板'],
                  ['玻璃材質', '強化玻璃 6mm', '強化玻璃 12mm'],
                  ['離線運作', '24 小時', '72 小時以上'],
                  ['識別方式', '手機/現金', '+軍方 IC 卡感應'],
                  ['存取記錄', '雲端 30 天', '本地 + 雲端 365 天'],
                  ['網路連接', 'WiFi / 4G', '+有線乙太網路（CAT6）'],
                  ['操作溫度', '0–50°C', '-10–55°C'],
                  ['噪音等級', '≤ 45dB', '≤ 42dB（靜音馬達）'],
                  ['政府採購資格', '✅', '✅ + 額外安全認證'],
                ].map(([spec, standard, military], i) => (
                  <tr key={i} style={{ borderTop: '1px solid #1e293b', background: i % 2 === 0 ? '#0f1f36' : '#0d1a2d' }}>
                    <td className="px-4 py-3 text-slate-300 font-medium">{spec}</td>
                    <td className="px-4 py-3 text-slate-500">{standard}</td>
                    <td className="px-4 py-3 text-[#FF6B35] font-semibold">{military}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-8">採購流程說明（軍方場域）</h2>
          <ol className="list-decimal pl-6 space-y-4">
            <li>
              <strong className="text-slate-100">需求評估</strong>（2–4 週）：
              銓幻元指派專員進行場域實地勘察，確認電力需求、網路條件、人流估算，提供書面評估報告。
            </li>
            <li>
              <strong className="text-slate-100">規格書確認</strong>（1–2 週）：
              依採購法規格書格式提供完整技術文件，含圖面、認證書、效能數據。
            </li>
            <li>
              <strong className="text-slate-100">採購程序</strong>（4–12 週，依金額）：
              配合國防部或各軍種後勤署的採購作業時程。銓幻元有專人協助文件準備。
            </li>
            <li>
              <strong className="text-slate-100">安裝與驗收</strong>（1–2 天）：
              現場安裝、系統設定、人員操作說明，提供驗收報告供主計核銷。
            </li>
            <li>
              <strong className="text-slate-100">保固與維護</strong>：
              2 年原廠保固（軍方版延長至 3 年），季度預防性保養，48 小時緊急維修承諾。
            </li>
          </ol>

          <h2 className="text-xl font-bold text-slate-100 mt-8">常見問題（FAQ）</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Q：機台內的食材補給誰來負責？',
                a: '兩種模式：（1）軍方自行採購冷凍食品，由後勤人員每日或每 2 日補貨；（2）銓幻元搭配食材供應商，定期配送至軍營門口，由後勤人員接收後補入機台。多數基地選擇（1），補貨作業 15–20 分鐘。',
              },
              {
                q: 'Q：機台可以設定只限特定人員使用嗎？',
                a: '可以。軍方 IC 卡模式下，僅已登記卡號的人員才能使用機台。同時可設定每人每日消費上限，防止過度使用。',
              },
              {
                q: 'Q：食材費用誰出？',
                a: '有三種模式：（1）自費：士兵自行付費，機台收入歸軍方或福利社；（2）補貼制：軍方按月提供福利點數；（3）全免費：部分特種部隊值班場域，全額由軍方支付食材費用。',
              },
              {
                q: 'Q：進口軍事場域需要特殊許可嗎？',
                a: '銓幻元服務人員進入軍事管制區需配合軍方申請訪客通行證，安裝作業前會提交人員名單。這是標準程序，並不影響安裝時程。',
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
            <p className="text-slate-400 text-sm mb-5">告訴我們場域類型、值班人數、網路條件，AI 立刻給出軍方場域專屬配置建議</p>
            <a href="/products/frozen-microwave?ai=1"
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
