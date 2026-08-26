import type { Metadata } from 'next'
import { KeywordTrigger, ArticleCTA } from '@/components/KeywordTrigger'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.mcstation.ai/blog/frozen-vending-vs-regular-vending' },
  title: '冷凍販賣機 vs 一般販賣機：哪個適合你的場域？完整比較指南 | 銓幻元',
  description: '冷凍販賣機與一般常溫販賣機的全面比較：選機邏輯、場域適配、投資成本、維護差異。工廠、宿舍、醫院、辦公室，哪個場域選哪種機型？一文看懂。',
}

export default function Article() {
  return (
    <main className="min-h-screen bg-[#0d1a2d] text-slate-100">
      <article className="max-w-2xl mx-auto px-6 py-16">
        <div className="flex flex-wrap gap-2 mb-6">
          {['冷凍販賣機', '選型指南', '場域規劃'].map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,107,53,0.12)', color: '#FF6B35' }}>{tag}</span>
          ))}
        </div>
        <h1 className="text-3xl font-bold mb-3 text-slate-100">
          <KeywordTrigger keyword="冷凍販賣機" slug="frozen-microwave" /> vs 一般販賣機：哪個適合你的場域？完整比較指南
        </h1>
        <p className="text-slate-500 text-sm mb-10">2026-07-03 · 8 分鐘閱讀</p>

        <div className="space-y-7 text-slate-300 leading-relaxed">

          <p>
            採購販賣機之前，最常碰到的第一個問題就是：「要選冷凍型還是常溫型？」
            這個問題沒有標準答案，但有清晰的選擇邏輯。錯誤的機型會讓使用率低、補貨浪費、
            最終變成廠區角落的廢鐵。本文從場域需求出發，幫你做出最適合的選擇。
          </p>

          <ArticleCTA keyword="冷凍販賣機" slug="frozen-microwave" />

          <h2 className="text-xl font-bold text-slate-100 mt-10">先搞清楚：兩種機型的根本差異</h2>
          <div className="rounded-xl overflow-hidden border border-slate-700">
            <table className="w-full text-sm">
              <thead style={{ background: '#1e293b' }}>
                <tr>
                  <th className="text-left px-4 py-3 text-slate-300">比較項目</th>
                  <th className="text-left px-4 py-3 text-slate-300">一般販賣機（常溫/冷藏）</th>
                  <th className="text-left px-4 py-3 text-[#FF6B35]">冷凍販賣機</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['溫控範圍', '常溫 or 4–8°C（冷藏）', '-18°C 以下（冷凍）'],
                  ['食材類型', '飲料、零食、涼食便當', '冷凍便當、熟食料理包、冰品'],
                  ['食材保存期', '1–3 天（需每日補貨）', '3–6 個月（低頻補貨）'],
                  ['補貨頻率', '每日或每 2 日', '每週或每 2 週'],
                  ['加熱功能', '無（需另備微波爐）', '部分機型內建微波加熱'],
                  ['電費（月）', '較低', '較高（低溫壓縮機常時運轉）'],
                  ['設備售價', '較低', '較高（冷凍結構與溫控成本）'],
                  ['月租費', '較低', '較高'],
                  ['適合場域', '辦公室、學校、捷運站', '工廠、宿舍、醫院、軍方'],
                ].map(([item, normal, frozen], i) => (
                  <tr key={i} style={{ borderTop: '1px solid #1e293b', background: i % 2 === 0 ? '#0f1f36' : '#0d1a2d' }}>
                    <td className="px-4 py-3 text-slate-300 font-medium">{item}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{normal}</td>
                    <td className="px-4 py-3 text-[#FF6B35] font-semibold text-xs">{frozen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-10">場域決策樹：你的場域適合哪種？</h2>
          <div className="space-y-4">
            {[
              {
                condition: '✅ 選冷凍販賣機的場域',
                items: [
                  '工廠夜班（22:00 後無人補貨，需自助熱食）',
                  '移工宿舍（飲食文化差異大，東南亞冷凍料理有需求）',
                  '醫院護理宿舍（24 小時值班，廚房外承包不進去）',
                  '軍方場域（門禁嚴格，外送不可能進入）',
                  '長照機構（補貨人力少，需要低頻維護）',
                  '偏遠地區工地（補貨車 1 週才來一次）',
                ],
                color: 'rgba(34,197,94,0.1)',
                border: 'rgba(34,197,94,0.3)',
              },
              {
                condition: '✅ 選一般販賣機的場域',
                items: [
                  '辦公室（白天補貨方便，主要賣飲料咖啡）',
                  '學校（學生消費力有限，接受飲料零食）',
                  '捷運站（流量大，週轉快，常溫商品翻台率高）',
                  '百貨公司（品牌飲料為主，不需要加熱需求）',
                  '健身房（運動飲料、補給品，常溫即可）',
                ],
                color: 'rgba(59,130,246,0.1)',
                border: 'rgba(59,130,246,0.3)',
              },
            ].map(({ condition, items, color, border }) => (
              <div key={condition} className="rounded-xl p-4" style={{ background: color, border: `1px solid ${border}` }}>
                <p className="font-bold text-slate-100 mb-3">{condition}</p>
                <ul className="space-y-1">
                  {items.map(item => (
                    <li key={item} className="text-slate-300 text-sm">• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-10">5 個關鍵判斷指標</h2>
          <div className="space-y-4">
            {[
              {
                num: '01',
                title: '使用者需要熱食嗎？',
                content: '這是最核心的問題。如果你的場域使用者在夜班、醫院值班、或宿舍生活，他們需要的是「能加熱的正餐」，不是零食飲料。這種需求只有冷凍販賣機能滿足。',
              },
              {
                num: '02',
                title: '每天有人補貨嗎？',
                content: '一般販賣機的常溫商品和冷藏便當保存期短，需要每日或每 2 日補貨。如果你的場域偏遠、補貨人力少、或夜間無人值守，冷凍機的 2 週補貨頻率更現實。',
              },
              {
                num: '03',
                title: '日均使用人次多少？',
                content: '100 人以下場域：一般機型即可，冷凍機成本回收較慢。100–300 人：冷凍機開始有競爭力，熱食需求明顯。300 人以上：冷凍機是首選，使用率高、補貨效率好。',
              },
              {
                num: '04',
                title: '附近有便利商店嗎？',
                content: '距離知名超商 5 分鐘步行以內：一般飲料零食機競爭力弱（消費者會走去超商），但冷凍熱食機仍有差異化（超商微波要錢且麻煩）。距離超過 10 分鐘：任何機型都有需求。',
              },
              {
                num: '05',
                title: '預算和回收期期望是多少？',
                content: '冷凍機前期投入高（設備 + 食材冷鏈），但食材損耗率低（冷凍不會過期）。一般機前期便宜，但食材損耗高（常溫便當賣不完就丟掉）。長期來看，日均 80 次以上場域，冷凍機 ROI 通常更好。',
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

          <h2 className="text-xl font-bold text-slate-100 mt-10">混合配置：最常見的最佳解</h2>
          <p>
            實際上，許多場域的最優解是「冷凍機 + 飲料機」混合配置。以一個 300 人工廠為例：
          </p>
          <div className="rounded-xl p-5 border" style={{ background: '#0f1f36', borderColor: 'rgba(255,107,53,0.2)' }}>
            <h3 className="font-bold text-[#FF6B35] mb-3">混合配置範例：300 人製造業工廠</h3>
            <div className="text-sm space-y-2">
              <p><span className="text-slate-400">設備 A：</span><span className="text-slate-200">2 台<KeywordTrigger keyword="冷凍販賣機" slug="frozen-microwave" />（含微波功能）→ 熱食便當、料理包</span></p>
              <p><span className="text-slate-400">設備 B：</span><span className="text-slate-200">1 台飲料機 → 茶、咖啡、碳酸飲料</span></p>
              <p><span className="text-slate-400">補貨頻率：</span><span className="text-slate-200">冷凍機每 10 天、飲料機每 3 天</span></p>
              <p><span className="text-slate-400">營收結構：</span><span className="text-slate-200">熱食料理包週轉快、單價高，通常是混合配置中營收佔比較高的品項；飲料機則負責高頻率的小額消費</span></p>
              <p className="text-slate-500 text-xs mt-2">* 此為配置邏輯示意，實際營收依場域人流、單價與品項組合而異，建議洽詢顧問依你的場域試算</p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-8">常見問題（FAQ）</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Q：冷凍販賣機一定比較耗電嗎？',
                a: '比一般冷藏機稍多，但差距不大。冷凍機的月均電費會比同容量冷藏機高一些，但在多數場域裡電費佔營運成本的比重不高，通常不是選機的關鍵因素。',
              },
              {
                q: 'Q：冷凍食材難取得嗎？',
                a: '台灣冷凍食品供應鏈成熟，銓幻元有合作的食材供應商（台式、東南亞、素食等），可直接對接。若自行採購，好市多、全聯、冷凍食材批發商都有穩定貨源。',
              },
              {
                q: 'Q：一台機器可以同時賣冷凍和常溫嗎？',
                a: '可以，部分機型支援分區溫控（上半部冷凍、下半部常溫）。銓幻元有雙溫區機型，適合既需要熱食又需要飲料的場域，節省空間和管理複雜度。',
              },
              {
                q: 'Q：一般販賣機可以改裝成冷凍機嗎？',
                a: '技術上不建議。冷凍需要特殊壓縮機、隔熱設計、溫控系統，改裝成本接近新機。若有需求，建議直接租賃冷凍機，不需要前期投入。',
              },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-xl p-4" style={{ background: '#1e293b' }}>
                <p className="font-semibold text-slate-200 mb-2 text-sm">{q}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl p-5 my-6 text-center" style={{ background: '#0f2744', border: '1px solid rgba(255,107,53,0.3)' }}>
            <p className="text-lg font-bold text-slate-200 mb-2">不確定選哪種？3 分鐘讓 AI 幫你判斷</p>
            <p className="text-slate-400 text-sm mb-5">告訴 AI 顧問你的場域類型、人數、補貨條件，立刻得到個人化推薦</p>
            <a href="/products/frozen-microwave?ai=1"
              className="inline-block px-8 py-3 rounded-xl font-bold text-white" style={{ background: '#FF6B35' }}>
              立即諮詢 AI 顧問 →
            </a>
          </div>

        </div>

          <p className="text-slate-400 text-sm my-6">
            對應機型規格：<a href="/products/frozen-vending" style={{ color: '#FF6B35' }} className="hover:underline">冷凍與冷凍微波全系列 8 款比較</a>。
          </p>
        <div className="mt-12 pt-8 border-t border-slate-700/40">
          <a href="/blog" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">← 返回知識庫</a>
        </div>
      </article>
    </main>
  )
}
