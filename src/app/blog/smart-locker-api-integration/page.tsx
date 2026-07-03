import type { Metadata } from 'next'
import { KeywordTrigger, ArticleCTA } from '@/components/KeywordTrigger'

export const metadata: Metadata = {
  title: '智慧取物櫃 API 整合指南：POS、外送平台、自建系統串接說明 | 銓幻元',
  description: '智慧取物櫃要發揮最大效益，API 整合是關鍵。本文說明銓幻元取物系統與 iCHEF、Winfood、Uber Eats、foodpanda 以及自建系統的整合方式與串接時程。',
}

export default function Article() {
  return (
    <main className="min-h-screen bg-[#0d1a2d] text-slate-100">
      <article className="max-w-2xl mx-auto px-6 py-16">
        <div className="flex flex-wrap gap-2 mb-6">
          {['智慧取物櫃', 'API整合', '技術文件'].map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,107,53,0.12)', color: '#FF6B35' }}>{tag}</span>
          ))}
        </div>
        <h1 className="text-3xl font-bold mb-3 text-slate-100">
          <KeywordTrigger keyword="智慧取物櫃" /> API 整合指南：POS、外送平台、自建系統串接說明
        </h1>
        <p className="text-slate-500 text-sm mb-10">2026-07-03 · 8 分鐘閱讀</p>

        <div className="space-y-7 text-slate-300 leading-relaxed">
          <p>
            <KeywordTrigger keyword="智慧取物櫃" />不串 API 就只是一個「附鎖的保溫箱」。
            真正的效益來自系統整合：訂單進來自動分格、格口開啟自動通知顧客、外送員掃碼直接取餐。
            這些流程的自動化程度，決定了取物系統能省多少人力。
          </p>
          <p>
            本文針對非技術背景的餐廳老闆和採購主管，說明銓幻元<KeywordTrigger keyword="智慧取物櫃" />的 API 整合邏輯，
            以及各種系統的串接方式和時程。
          </p>

          <ArticleCTA keyword="智慧取物櫃" />

          <h2 className="text-xl font-bold text-slate-100 mt-10">API 整合的 3 個核心流程</h2>
          <div className="space-y-4">
            {[
              { step: 'Step 1', title: '訂單 → 自動分格', desc: '當顧客在 POS 結帳或外送平台下單後，銓幻元系統收到訂單資訊，自動分配一個格口並回傳格號。廚房螢幕或印表機同時顯示「格 A3 — 王大明的訂單」，廚師備餐後直接放入 A3 格口。' },
              { step: 'Step 2', title: '放入 → 自動通知', desc: '廚師放入食物並掃描格口 QR Code 確認放入（或由感應器自動偵測），系統立即推播 LINE 訊息給顧客：「您的餐點已放入 A3 格，請掃碼取餐。」' },
              { step: 'Step 3', title: '掃碼 → 自動開格', desc: '顧客收到通知後，在機台螢幕掃描手機 QR Code，對應格口自動開啟。外送員也使用同樣流程，無需員工介入。' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="p-4 rounded-xl" style={{ background: '#0f1f36', border: '1px solid rgba(255,107,53,0.1)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: 'rgba(255,107,53,0.2)', color: '#FF6B35' }}>{step}</span>
                  <p className="font-bold text-slate-100">{title}</p>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-10">支援的整合系統與串接時程</h2>
          <div className="rounded-xl overflow-hidden border border-slate-700">
            <table className="w-full text-sm">
              <thead style={{ background: '#1e293b' }}>
                <tr>
                  <th className="text-left px-4 py-3 text-slate-300">系統</th>
                  <th className="text-left px-4 py-3 text-slate-300">整合方式</th>
                  <th className="text-left px-4 py-3 text-[#FF6B35]">串接時程</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['iCHEF POS', 'Webhook 推送訂單 → 自動分格', '1 個工作天'],
                  ['Winfood POS', 'API 輪詢 + Webhook 雙模式', '1–2 個工作天'],
                  ['橘子 POS', '標準 REST API 串接', '1–2 個工作天'],
                  ['微碧 POS', '合作商串接，預建', '半天'],
                  ['Uber Eats', '官方 API 授權（需餐廳端申請）', '3–5 個工作天'],
                  ['foodpanda', '官方 API 授權', '3–5 個工作天'],
                  ['自建 App/系統', '銓幻元提供 REST API 文件', '5–10 個工作天'],
                  ['LINE 官方帳號', '打通取餐碼通知', '1 個工作天'],
                ].map(([sys, method, time], i) => (
                  <tr key={i} style={{ borderTop: '1px solid #1e293b', background: i % 2 === 0 ? '#0f1f36' : '#0d1a2d' }}>
                    <td className="px-4 py-3 text-slate-300 font-medium text-xs">{sys}</td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{method}</td>
                    <td className="px-4 py-3 text-[#FF6B35] font-semibold text-xs">{time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-8">沒有系統整合可以用嗎？</h2>
          <p>
            可以，但效益打折。銓幻元提供「手動分格」備援模式：
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>員工在管理後台手動輸入顧客電話，系統分配格號並推播通知</li>
            <li>適合剛導入、尚未完成 API 串接的過渡期</li>
            <li>缺點：每筆訂單需要員工手動操作（約 20 秒），無法完全省人力</li>
            <li>建議：先用手動模式試裝 2 週，確認使用率後再進行 API 串接</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-100 mt-8">自建系統 API 規格說明（技術摘要）</h2>
          <div className="rounded-xl p-4" style={{ background: '#1e293b', fontFamily: 'monospace' }}>
            <p className="text-xs text-slate-400 mb-3">// 建立取餐單（POST /api/v1/lockers/orders）</p>
            <div className="text-xs space-y-1 text-slate-300">
              <p><span className="text-[#FF6B35]">POST</span> https://api.mcstation.ai/v1/lockers/orders</p>
              <p className="text-slate-500 mt-2">// Request Body</p>
              <p>{'{'}</p>
              <p className="pl-4"><span className="text-yellow-400">"terminal_id"</span>: <span className="text-green-400">"LOCKER-001"</span>,</p>
              <p className="pl-4"><span className="text-yellow-400">"order_id"</span>: <span className="text-green-400">"ORD-20260703-001"</span>,</p>
              <p className="pl-4"><span className="text-yellow-400">"customer_phone"</span>: <span className="text-green-400">"0912345678"</span>,</p>
              <p className="pl-4"><span className="text-yellow-400">"items"</span>: [<span className="text-green-400">"排骨便當 × 2"</span>],</p>
              <p className="pl-4"><span className="text-yellow-400">"slot_size"</span>: <span className="text-green-400">"M"</span></p>
              <p>{'}'}</p>
              <p className="text-slate-500 mt-2">// Response</p>
              <p>{'{'}</p>
              <p className="pl-4"><span className="text-yellow-400">"slot_id"</span>: <span className="text-green-400">"A3"</span>,</p>
              <p className="pl-4"><span className="text-yellow-400">"pickup_code"</span>: <span className="text-green-400">"https://qr.mcstation.ai/A3XYZ"</span>,</p>
              <p className="pl-4"><span className="text-yellow-400">"expires_at"</span>: <span className="text-green-400">"2026-07-03T14:30:00+08:00"</span></p>
              <p>{'}'}</p>
            </div>
          </div>
          <p className="text-xs text-slate-500">* 完整 API 文件（含 Webhook、格口狀態查詢、取消訂單）於簽約後提供</p>

          <div className="rounded-xl p-5 my-6 text-center" style={{ background: '#0f2744', border: '1px solid rgba(255,107,53,0.3)' }}>
            <p className="text-lg font-bold text-slate-200 mb-2">你的系統可以串接嗎？AI 顧問幫你確認</p>
            <p className="text-slate-400 text-sm mb-5">告訴我們現有的 POS 系統和外送平台，AI 立刻給出整合可行性評估</p>
            <a href="/solutions/smart-locker?utm_source=blog&utm_medium=article-bottom&utm_campaign=api-integration"
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
