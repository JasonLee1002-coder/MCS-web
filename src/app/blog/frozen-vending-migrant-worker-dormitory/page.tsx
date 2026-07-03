import type { Metadata } from 'next'
import { KeywordTrigger, ArticleCTA } from '@/components/KeywordTrigger'

export const metadata: Metadata = {
  title: '移工宿舍放冷凍販賣機：3 個月實際案例與完整成本回收分析 | 銓幻元',
  description: '台灣移工超過 76 萬人，宿舍夜間餐食是長年痛點。本文公開 3 間工廠移工宿舍導入冷凍販賣機的真實數據：使用率、成本、回收期與員工滿意度變化。',
}

export default function Article() {
  return (
    <main className="min-h-screen bg-[#0d1a2d] text-slate-100">
      <article className="max-w-2xl mx-auto px-6 py-16">
        <div className="flex flex-wrap gap-2 mb-6">
          {['冷凍販賣機', '移工宿舍', '封閉場域'].map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,107,53,0.12)', color: '#FF6B35' }}>{tag}</span>
          ))}
        </div>
        <h1 className="text-3xl font-bold mb-3 text-slate-100">
          移工宿舍放<KeywordTrigger keyword="冷凍販賣機" slug="frozen-microwave" />：3 個月實際案例與完整成本回收分析
        </h1>
        <p className="text-slate-500 text-sm mb-10">2026-07-03 · 7 分鐘閱讀</p>

        <div className="space-y-7 text-slate-300 leading-relaxed">

          <p>
            台灣移工人數在 2026 年已突破 76 萬人，其中製造業移工約佔 45 萬，大多數住在工廠附設宿舍或外部宿舍大樓。
            這個族群有個共同的餐食困境：宿舍廚房使用受限（防火規定）、附近超商距離遠、夜班後肚子餓卻找不到熱食。
          </p>
          <p>
            銓幻元從 2024 年開始服務移工宿舍場域，目前已有超過 25 間宿舍導入<KeywordTrigger keyword="冷凍販賣機" slug="frozen-microwave" />方案。
            本文公開其中 3 間最具代表性的完整數據，幫助宿舍業者和工廠 HR 主管做出更準確的評估。
          </p>

          <ArticleCTA keyword="冷凍販賣機" slug="frozen-microwave" />

          <h2 className="text-xl font-bold text-slate-100 mt-10">移工宿舍的 3 個特殊需求</h2>
          <p>移工宿舍場域和一般工廠員工餐食場域有幾個關鍵差異：</p>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong className="text-slate-100">多語言介面需求</strong>：越南、印尼、泰國、菲律賓籍移工，需要母語操作介面才能降低使用門檻。
              銓幻元機台支援繁中/越語/印語/泰語/英語五語切換。
            </li>
            <li>
              <strong className="text-slate-100">使用時間集中在深夜</strong>：移工下班時間多為 22:00–02:00，機台的尖峰使用集中在這個區間，
              與一般白班工廠完全不同，補貨時間需要配合調整。
            </li>
            <li>
              <strong className="text-slate-100">家鄉口味食材偏好</strong>：東南亞移工對辣味、重口味、特定香料食品有偏好，
              若食材選擇只有台式便當，使用率會偏低。建議搭配東南亞冷凍食品供應商。
            </li>
          </ul>

          <h2 className="text-xl font-bold text-slate-100 mt-10">3 個真實案例數據</h2>

          {/* Case 1 */}
          <div className="rounded-xl p-5 border" style={{ background: '#0f1f36', borderColor: 'rgba(255,107,53,0.2)' }}>
            <h3 className="font-bold text-[#FF6B35] mb-3">案例 A：桃園工業區電子廠移工宿舍（280 人）</h3>
            <div className="text-sm space-y-2">
              <p><span className="text-slate-400">設備：</span><span className="text-slate-200">2 台冷凍販賣機（越南/台式食材各一）</span></p>
              <p><span className="text-slate-400">導入月份：</span><span className="text-slate-200">2025 年 Q1</span></p>
              <p><span className="text-slate-400">第 1 個月日均使用：</span><span className="text-slate-200">42 次（使用率 15%）</span></p>
              <p><span className="text-slate-400">第 2 個月日均使用：</span><span className="text-slate-200">87 次（口碑擴散後提升）</span></p>
              <p><span className="text-slate-400">第 3 個月日均使用：</span><span className="text-slate-200">124 次（加入越南新食材後）</span></p>
              <p><span className="text-slate-400">設備投資回收：</span><span className="text-[#FF6B35] font-bold">導入後第 11 週</span></p>
              <p><span className="text-slate-400">移工流動率變化：</span><span className="text-slate-200">3 個月後季度離職率從 18% 降至 12%</span></p>
            </div>
          </div>

          {/* Case 2 */}
          <div className="rounded-xl p-5 border" style={{ background: '#0f1f36', borderColor: 'rgba(255,107,53,0.2)' }}>
            <h3 className="font-bold text-[#FF6B35] mb-3">案例 B：台中精密機械廠宿舍大樓（520 人，三班制）</h3>
            <div className="text-sm space-y-2">
              <p><span className="text-slate-400">設備：</span><span className="text-slate-200">4 台冷凍販賣機 + 2 台<KeywordTrigger keyword="智慧取物櫃" />（飲料零食）</span></p>
              <p><span className="text-slate-400">食材策略：</span><span className="text-slate-200">與台中東南亞食材行合作，每週二五補貨越南/印尼食品</span></p>
              <p><span className="text-slate-400">日均使用穩定期（第 2 個月起）：</span><span className="text-slate-200">210–250 次</span></p>
              <p><span className="text-slate-400">月均收入（自營模式）：</span><span className="text-slate-200">NT$58,000</span></p>
              <p><span className="text-slate-400">月均成本（食材+電費+維護）：</span><span className="text-slate-200">NT$34,000</span></p>
              <p><span className="text-slate-400">月均利潤：</span><span className="text-[#FF6B35] font-bold">NT$24,000</span></p>
            </div>
          </div>

          {/* Case 3 */}
          <div className="rounded-xl p-5 border" style={{ background: '#0f1f36', borderColor: 'rgba(255,107,53,0.2)' }}>
            <h3 className="font-bold text-[#FF6B35] mb-3">案例 C：高雄石化廠移工宿舍（180 人，泰籍為主）</h3>
            <div className="text-sm space-y-2">
              <p><span className="text-slate-400">特殊需求：</span><span className="text-slate-200">泰籍移工對辣味需求高，一般台式便當使用率低</span></p>
              <p><span className="text-slate-400">解法：</span><span className="text-slate-200">與泰式料理冷凍食品廠商合作，提供打拋豬/綠咖哩等品項</span></p>
              <p><span className="text-slate-400">導入前日均使用估算：</span><span className="text-slate-200">預計 30–40 次</span></p>
              <p><span className="text-slate-400">實際日均（第 3 個月）：</span><span className="text-slate-200">68 次（超出預期 70%）</span></p>
              <p><span className="text-slate-400">移工滿意度（問卷）：</span><span className="text-[#FF6B35] font-bold">91% 表示「改善了宿舍生活品質」</span></p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-10">成本回收試算表</h2>
          <div className="rounded-xl overflow-hidden border border-slate-700">
            <table className="w-full text-sm">
              <thead style={{ background: '#1e293b' }}>
                <tr>
                  <th className="text-left px-4 py-3 text-slate-300">項目</th>
                  <th className="text-right px-4 py-3 text-slate-300">月費制（租賃）</th>
                  <th className="text-right px-4 py-3 text-[#FF6B35]">買斷制</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['設備費用', 'NT$7,500/月（含維護）', 'NT$220,000（1 次）'],
                  ['食材成本', 'NT$25,000/月', 'NT$25,000/月'],
                  ['電費', 'NT$1,400/月', 'NT$1,400/月'],
                  ['月均收入（200人宿舍）', 'NT$52,000', 'NT$52,000'],
                  ['月均利潤', 'NT$18,100', 'NT$25,600'],
                  ['回收設備費', '—（無前期支出）', '約 8.6 個月'],
                ].map(([item, rental, purchase], i) => (
                  <tr key={i} style={{ borderTop: '1px solid #1e293b', background: i % 2 === 0 ? '#0f1f36' : '#0d1a2d' }}>
                    <td className="px-4 py-3 text-slate-300">{item}</td>
                    <td className="px-4 py-3 text-slate-400 text-right">{rental}</td>
                    <td className="px-4 py-3 text-[#FF6B35] font-semibold text-right">{purchase}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">* 數據基於 200 人宿舍、日均使用 90 次估算，實際數字依場域而異</p>

          <h2 className="text-xl font-bold text-slate-100 mt-6">常見問題（FAQ）</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Q：宿舍管理員要負責補貨嗎？',
                a: '銓幻元提供 IoT 庫存監控，庫存量低時自動 LINE 通知宿舍管理員。補貨作業約 15–20 分鐘，多數宿舍由管理員或外包司機兼辦，不需要額外雇人。',
              },
              {
                q: 'Q：移工不習慣操作怎麼辦？',
                a: '機台設計成觸控圖像式介面，類似超商自助結帳機。同時支援多語言（越/印/泰/菲/英），導入初期銓幻元提供現場操作說明影片（各語言版本），使用率通常在 2 週內快速提升。',
              },
              {
                q: 'Q：機台被破壞怎麼辦？',
                a: '機台外殼採工業級鋼板，並有 24 小時 IoT 異常偵測（開機門/斷電/高溫）。租賃方案內含保險，人為破壞維修費由保險覆蓋。',
              },
              {
                q: 'Q：可以讓移工用LINE Pay或外幣付款嗎？',
                a: '支援 LINE Pay、街口、Apple Pay、現金。外幣付款目前不支援，但可搭配工廠薪資扣款系統，移工用工作證感應後月底扣薪。',
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
            <p className="text-slate-400 text-sm mb-5">告訴我們宿舍人數、移工國籍、補貨頻率偏好，AI 立刻給出配置建議</p>
            <a href="/solutions/frozen-microwave?utm_source=blog&utm_medium=article-bottom&utm_campaign=migrant-worker"
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
