import type { Metadata } from 'next'
import { KeywordTrigger, ArticleCTA } from '@/components/KeywordTrigger'

export const metadata: Metadata = {
  title: '冷凍販賣機租賃 vs 買斷：哪個划算？2026 完整費用試算 | 銓幻元',
  description: '冷凍販賣機要租還是買？本文從前期成本、月費結構、回收期、風險承擔四個角度完整分析，附費用試算表，幫你找到最適合場域的財務決策。',
}

export default function Article() {
  return (
    <main className="min-h-screen bg-[#0d1a2d] text-slate-100">
      <article className="max-w-2xl mx-auto px-6 py-16">
        <div className="flex flex-wrap gap-2 mb-6">
          {['冷凍販賣機', '租賃', '投資分析'].map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,107,53,0.12)', color: '#FF6B35' }}>{tag}</span>
          ))}
        </div>
        <h1 className="text-3xl font-bold mb-3 text-slate-100">
          <KeywordTrigger keyword="冷凍販賣機" slug="frozen-microwave" />租賃 vs 買斷：哪個划算？2026 完整費用試算
        </h1>
        <p className="text-slate-500 text-sm mb-10">2026-07-03 · 8 分鐘閱讀</p>

        <div className="space-y-7 text-slate-300 leading-relaxed">

          <p>
            「租賃還是買斷？」是採購<KeywordTrigger keyword="冷凍販賣機" slug="frozen-microwave" />時最常被問到的問題。
            兩種模式各有適合的場景，沒有絕對優劣，但錯誤的選擇會讓你多花 30–50% 的成本或承擔不必要的風險。
          </p>
          <p>
            本文從財務角度完整拆解兩種模式，附上真實試算數據，幫你做出最適合你場域的決策。
          </p>

          <ArticleCTA keyword="冷凍販賣機" slug="frozen-microwave" />

          <h2 className="text-xl font-bold text-slate-100 mt-10">兩種模式的費用結構</h2>
          <div className="rounded-xl overflow-hidden border border-slate-700">
            <table className="w-full text-sm">
              <thead style={{ background: '#1e293b' }}>
                <tr>
                  <th className="text-left px-4 py-3 text-slate-300">費用項目</th>
                  <th className="text-left px-4 py-3 text-slate-300">租賃方案</th>
                  <th className="text-left px-4 py-3 text-[#FF6B35]">買斷方案</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['前期設備費', 'NT$0', 'NT$220,000–380,000'],
                  ['安裝費', '含在月費中', 'NT$5,000–8,000（一次）'],
                  ['月費（含維護）', 'NT$6,500–9,500', 'NT$0（維護另計）'],
                  ['年度保養費', '含在月費中', 'NT$8,000–12,000/年'],
                  ['故障維修費', '含在月費中（保固期內）', 'NT$3,000–15,000/次'],
                  ['合約最短年限', '6 個月', '無限制（設備你的）'],
                  ['設備升級', '合約期滿可換新款', '需自行汰換'],
                  ['提前終止違約金', '剩餘月費 × 50%', '無（設備自有）'],
                ].map(([item, lease, buy], i) => (
                  <tr key={i} style={{ borderTop: '1px solid #1e293b', background: i % 2 === 0 ? '#0f1f36' : '#0d1a2d' }}>
                    <td className="px-4 py-3 text-slate-300 font-medium">{item}</td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{lease}</td>
                    <td className="px-4 py-3 text-[#FF6B35] font-semibold text-xs">{buy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-10">3 年總費用試算（200 人工廠場域）</h2>
          <div className="rounded-xl overflow-hidden border border-slate-700">
            <table className="w-full text-sm">
              <thead style={{ background: '#1e293b' }}>
                <tr>
                  <th className="text-left px-4 py-3 text-slate-300">時間點</th>
                  <th className="text-left px-4 py-3 text-slate-300">租賃累計支出</th>
                  <th className="text-left px-4 py-3 text-[#FF6B35]">買斷累計支出</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['第 1 個月', 'NT$7,500（月費）', 'NT$228,000（設備＋安裝）'],
                  ['第 6 個月', 'NT$45,000', 'NT$233,000'],
                  ['第 12 個月', 'NT$90,000', 'NT$243,000'],
                  ['第 18 個月', 'NT$135,000', 'NT$251,000（含半年保養）'],
                  ['第 24 個月', 'NT$180,000', 'NT$259,000'],
                  ['第 30 個月', 'NT$225,000', 'NT$267,000（含半年保養）'],
                  ['第 36 個月', 'NT$270,000', 'NT$275,000'],
                ].map(([time, lease, buy], i) => (
                  <tr key={i} style={{ borderTop: '1px solid #1e293b', background: i % 2 === 0 ? '#0f1f36' : '#0d1a2d' }}>
                    <td className="px-4 py-3 text-slate-300 font-medium">{time}</td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{lease}</td>
                    <td className="px-4 py-3 text-[#FF6B35] font-semibold text-xs">{buy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">
            * 試算基礎：1 台冷凍販賣機、月費 NT$7,500（含維護）、設備買斷 NT$220,000、安裝 NT$8,000、年保養 NT$10,000。
            <br />* 第 36 個月兩者費用幾乎持平（買斷略低 NT$5,000）。之後買斷每年可節省 NT$80,000 左右。
          </p>

          <h2 className="text-xl font-bold text-slate-100 mt-8">損益平衡點分析</h2>
          <div className="rounded-xl p-5 border" style={{ background: '#0f1f36', borderColor: 'rgba(255,107,53,0.2)' }}>
            <h3 className="font-bold text-[#FF6B35] mb-3">以 NT$7,500/月租賃 vs NT$228,000 買斷為例</h3>
            <div className="text-sm space-y-2">
              <p><span className="text-slate-400">每月費用差：</span><span className="text-slate-200">買斷前期多支出 NT$228,000，但每月少付 NT$7,500</span></p>
              <p><span className="text-slate-400">損益平衡：</span><span className="text-[#FF6B35] font-bold">NT$228,000 ÷ NT$7,500 = 30.4 個月（約 2.5 年）</span></p>
              <p><span className="text-slate-400">結論：</span><span className="text-slate-200">預計使用超過 2.5 年 → 買斷划算；不確定使用年限 → 先租賃</span></p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-8">5 個決策情境指南</h2>
          <div className="space-y-4">
            {[
              {
                situation: '情境 A：工廠/宿舍，確定長期使用',
                recommendation: '建議買斷',
                reason: '場域穩定、使用年限長，2.5 年後每年省 NT$80,000+。若資金有限，可先租賃 1 年確認效果再買斷。',
                color: 'rgba(34,197,94,0.1)',
                border: 'rgba(34,197,94,0.3)',
              },
              {
                situation: '情境 B：新開發場域，不確定使用率',
                recommendation: '強烈建議先租賃',
                reason: '租賃讓你用 6 個月驗證場域。若使用率不達預期（日均 < 40 次），可在合約期滿後不續租，損失最多 NT$45,000，而非 NT$228,000 的設備成本。',
                color: 'rgba(59,130,246,0.1)',
                border: 'rgba(59,130,246,0.3)',
              },
              {
                situation: '情境 C：政府 / 軍方採購',
                recommendation: '視採購法規定',
                reason: '超過 NT$15 萬需走公開招標，買斷通常是預算科目。租賃可能歸入「服務費」科目，反而在年度預算操作上更靈活。請確認各單位的採購法適用規則。',
                color: 'rgba(245,158,11,0.1)',
                border: 'rgba(245,158,11,0.3)',
              },
              {
                situation: '情境 D：連鎖佈點（5 台以上）',
                recommendation: '建議租賃（批量折扣）',
                reason: '5 台以上租賃可談 8 折月費（NT$6,000/台），同時避免大量前期資本支出。設備統一維護、統一管理，比分散買斷更有效率。',
                color: 'rgba(168,85,247,0.1)',
                border: 'rgba(168,85,247,0.3)',
              },
              {
                situation: '情境 E：資金充裕、想自主運營',
                recommendation: '建議買斷',
                reason: '買斷後食材收入 100% 歸自己，月費 0。若日均 80 次、售價平均 NT$100，月收入 NT$240,000，月費節省讓利潤率提升 3–4 個百分點。',
                color: 'rgba(34,197,94,0.1)',
                border: 'rgba(34,197,94,0.3)',
              },
            ].map(({ situation, recommendation, reason, color, border }) => (
              <div key={situation} className="rounded-xl p-4" style={{ background: color, border: `1px solid ${border}` }}>
                <p className="font-bold text-slate-100 mb-1 text-sm">{situation}</p>
                <p className="text-[#FF6B35] font-semibold text-sm mb-2">→ {recommendation}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{reason}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-8">銓幻元的彈性方案</h2>
          <p>銓幻元提供以下商業模式，可依場域需求組合：</p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong className="text-slate-100">短期租賃（6–12 個月）</strong>：驗證場域期，月費最高，但風險最低</li>
            <li><strong className="text-slate-100">長期租賃（24 個月以上）</strong>：月費 85 折，合約期滿可選買斷或換新款</li>
            <li><strong className="text-slate-100">租轉買</strong>：租滿 18 個月後，已繳月費的 40% 可折抵買斷金額</li>
            <li><strong className="text-slate-100">買斷分期</strong>：分 12–24 個月付款，前期壓力小，長期更划算</li>
            <li><strong className="text-slate-100">營運分潤模式（試點場域）</strong>：設備免費，銓幻元抽取 15% 營業額，適合低風險試水場域</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-100 mt-8">常見問題（FAQ）</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Q：租賃合約可以中途終止嗎？',
                a: '可以，但需支付剩餘合約月費的 50% 作為違約金。例如 12 個月合約，第 6 個月終止，需支付 3 個月月費（6÷2=3）。若場域確實關閉（工廠遷廠等），銓幻元有相應的豁免條款，請提前溝通。',
              },
              {
                q: 'Q：買斷後，維修保固是多久？',
                a: '原廠保固 2 年，軍方版延長至 3 年。保固期外的維修採計時計料方式，零件費 + 人工費，通常每次 NT$3,000–8,000。保固期外也可另購年度維護合約（NT$10,000/年）。',
              },
              {
                q: 'Q：買斷後機台折舊怎麼算？',
                a: '冷凍販賣機通常列為固定資產，折舊年限 5–7 年（依會計政策而定）。可作為進項稅額抵扣（5% 進項稅），有助於降低實際採購成本。建議詢問貴公司會計確認。',
              },
              {
                q: 'Q：月費方案包含哪些？不包含哪些？',
                a: '包含：設備租用、定期保養、故障維修（人為損壞除外）、系統軟體更新、遠端監控、24h 客服。不包含：食材採購費、電費、人員補貨工時。即月費只覆蓋「設備」，「營運」費用由客戶自行負擔。',
              },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-xl p-4" style={{ background: '#1e293b' }}>
                <p className="font-semibold text-slate-200 mb-2 text-sm">{q}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl p-5 my-6 text-center" style={{ background: '#0f2744', border: '1px solid rgba(255,107,53,0.3)' }}>
            <p className="text-lg font-bold text-slate-200 mb-2">告訴 AI 顧問你的場域，3 分鐘得到租 vs 買建議</p>
            <p className="text-slate-400 text-sm mb-5">輸入場域人數、預計使用年限、預算，AI 立刻給出最划算的財務建議</p>
            <a href="/products/frozen-microwave?ai=1&utm_source=blog&utm_medium=article-bottom&utm_campaign=lease-vs-buy"
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
