import type { Metadata } from 'next'
import { KeywordTrigger, ArticleCTA } from '@/components/KeywordTrigger'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.mcstation.ai/blog/frozen-vending-electricity-maintenance' },
  title: '冷凍販賣機耗電量與維護成本：採購前必看的真實數字',
  description: '冷凍販賣機每月電費多少？維護成本如何計算？本文整理銓幻元多場域營運經驗中的耗電數據、維修頻率、年度維護預算，幫你在採購前做出準確的財務規劃。',
}

export default function Article() {
  return (
    <main className="min-h-screen bg-[#0d1a2d] text-slate-100">
      <article className="max-w-2xl mx-auto px-6 py-16">
        <div className="flex flex-wrap gap-2 mb-6">
          {['冷凍販賣機', '維護成本', '選型指南'].map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,107,53,0.12)', color: '#FF6B35' }}>{tag}</span>
          ))}
        </div>
        <h1 className="text-3xl font-bold mb-3 text-slate-100">
          <KeywordTrigger keyword="冷凍販賣機" slug="frozen-microwave" />耗電量與維護成本：採購前必看的真實數字
        </h1>
        <p className="text-slate-500 text-sm mb-10">2026-07-03 · 7 分鐘閱讀</p>

        <div className="space-y-7 text-slate-300 leading-relaxed">
          <p>
            採購<KeywordTrigger keyword="冷凍販賣機" slug="frozen-microwave" />之前，最常被問到兩個問題：
            「一個月電費要多少？」「維護費用怎麼算？」
            這兩個數字直接影響設備的投資回報計算，卻很少有廠商願意公開真實數據。
          </p>
          <p>
            本文整理銓幻元多場域營運累積的電費數據、維修頻率統計和年度維護費用，
            幫助你在採購前做出更準確的財務規劃。
          </p>

          <ArticleCTA keyword="冷凍販賣機" slug="frozen-microwave" />

          <h2 className="text-xl font-bold text-slate-100 mt-10">耗電量：依額定功率推算</h2>
          <div className="rounded-xl overflow-hidden border border-slate-700">
            <table className="w-full text-sm">
              <thead style={{ background: '#1e293b' }}>
                <tr>
                  <th className="text-left px-4 py-3 text-slate-300">機型</th>
                  <th className="text-left px-4 py-3 text-slate-300">額定功率</th>
                  <th className="text-left px-4 py-3 text-slate-300">日均用電</th>
                  <th className="text-left px-4 py-3 text-[#FF6B35]">月電費</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['標準冷凍機（40 格）', '400W 壓縮機', '7.2 度/天', '以你的電價費率乘上度數'],
                  ['標準冷凍機（40 格）+ 微波', '400W + 900W', '9.1 度/天（含微波加熱）', '以你的電價費率乘上度數'],
                  ['大容量冷凍機（60 格）', '550W 壓縮機', '9.8 度/天', '以你的電價費率乘上度數'],
                  ['軍方版（加強隔熱）', '380W 壓縮機', '6.8 度/天', '以你的電價費率乘上度數'],
                ].map(([model, power, daily, monthly], i) => (
                  <tr key={i} style={{ borderTop: '1px solid #1e293b', background: i % 2 === 0 ? '#0f1f36' : '#0d1a2d' }}>
                    <td className="px-4 py-3 text-slate-300 text-xs">{model}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{power}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{daily}</td>
                    <td className="px-4 py-3 text-[#FF6B35] font-semibold text-xs">{monthly}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">
            * 度數為設計值估算，實際用電依場域溫度、開門頻率、食材補充量而異，夏季通常明顯偏高。電費請以台電當期公告費率自行換算。
          </p>

          <h2 className="text-xl font-bold text-slate-100 mt-8">降低電費的 4 個方法</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong className="text-slate-100">設備擺放位置</strong>：避免放在陽光直射或高溫環境（如廠區熱源附近）。室溫每提高 5°C，壓縮機耗電增加約 8%。</li>
            <li><strong className="text-slate-100">門封條定期檢查</strong>：門封條老化或損壞是最常見的耗電增加原因，每季檢查一次。</li>
            <li><strong className="text-slate-100">避免頻繁開門</strong>：每次開門溫度回復需消耗額外電力。IoT 功能可監控異常開門頻率（防止員工補貨時門未關）。</li>
            <li><strong className="text-slate-100">深夜低負載模式</strong>：銓幻元機台支援深夜（03:00–06:00）壓縮機降頻模式，可再降低一部分用電。</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-100 mt-10">維護成本：實務上會遇到什麼</h2>
          <div className="rounded-xl p-5 border" style={{ background: '#0f1f36', borderColor: 'rgba(255,107,53,0.2)' }}>
            <h3 className="font-bold text-[#FF6B35] mb-3">維護規劃時要先問清楚的幾件事</h3>
            <div className="text-sm space-y-2">
              <p><span className="text-slate-400">故障頻率：</span><span className="text-slate-200">跟場域環境關係很大——粉塵多、溫差大、開關門頻繁的點位，維護間隔要抓密一些</span></p>
              <p><span className="text-slate-400">常見故障部位：</span><span className="text-slate-200">門封條、觸控螢幕、壓縮機。前兩者是耗材性質，換件快；壓縮機停機時間長，要問清楚備品調度</span></p>
              <p><span className="text-slate-400">到場時間：</span><span className="text-slate-200">大台北地區當日可到；外縣市依服務網絡而定，簽約前先確認你的點位涵蓋範圍</span></p>
              <p><span className="text-slate-400">買斷版維修費：</span><span className="text-slate-200">保固期外自行負擔，含零件與人工</span></p>
              <p><span className="text-slate-400">保固期內維修費：</span><span className="text-slate-200">2 年原廠保固覆蓋</span></p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-8">5 年總成本分析（買斷 vs 租賃）</h2>
          <div className="rounded-xl overflow-hidden border border-slate-700">
            <table className="w-full text-sm">
              <thead style={{ background: '#1e293b' }}>
                <tr>
                  <th className="text-left px-4 py-3 text-slate-300">成本項目</th>
                  <th className="text-right px-4 py-3 text-slate-300">買斷（5年）</th>
                  <th className="text-right px-4 py-3 text-[#FF6B35]">租賃（5年）</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['設備費', '前期一次支出', '不需要'],
                  ['月費 × 60 個月', '不需要', '持續發生，五年累積可觀'],
                  ['電費', '兩者相同，依度數與電價', '兩者相同，依度數與電價'],
                  ['保固期外維修（3–5 年）', '自行負擔', '含在月費中'],
                  ['年度保養', '自行負擔，按年計', '含在月費中'],
                  ['五年總持有成本', '較低', '較高，但零前期、可隨時換新'],
                ].map(([item, buy, lease], i) => (
                  <tr key={i} style={{ borderTop: '1px solid #1e293b', background: i % 2 === 0 ? '#0f1f36' : '#0d1a2d' }}>
                    <td className="px-4 py-3 text-slate-300 font-medium">{item}</td>
                    <td className="px-4 py-3 text-slate-400 text-right text-xs">{buy}</td>
                    <td className="px-4 py-3 text-[#FF6B35] font-semibold text-right text-xs">{lease}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">* 使用年限拉長，買斷的總持有成本優勢會越明顯；租賃的優勢則是零前期與隨時換新。實際差額請用你拿到的條件計算。</p>

          <h2 className="text-xl font-bold text-slate-100 mt-8">常見問題（FAQ）</h2>
          <div className="space-y-4">
            {[
              { q: 'Q：停電後食材還能保多久？', a: '銓幻元機台設計在停電 4 小時內，內部溫度不超過 -10°C（外部溫度 25°C 條件下）。超過 4 小時建議由人員確認食材狀態。配備 UPS 不間斷電源的場域（如軍方版）可延長至 6–8 小時。' },
              { q: 'Q：壓縮機壽命多久？', a: '銓幻元使用日本三菱電機壓縮機，設計壽命 10–12 年，日常使用 8–10 年無需更換。壓縮機是設備最貴的零件，保固期內損壞全額更換。' },
              { q: 'Q：月租方案的維護包含什麼？', a: '月租費包含：季度預防性保養（含零件更換）、故障維修（人為損壞除外）、軟體系統更新、IoT 遠端監控服務、24h 客服。每月固定成本清楚，無隱藏費用。' },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-xl p-4" style={{ background: '#1e293b' }}>
                <p className="font-semibold text-slate-200 mb-2 text-sm">{q}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl p-5 my-6 text-center" style={{ background: '#0f2744', border: '1px solid rgba(255,107,53,0.3)' }}>
            <p className="text-lg font-bold text-slate-200 mb-2">想知道你的場域 5 年總成本？AI 顧問幫你算</p>
            <p className="text-slate-400 text-sm mb-5">告訴 AI 你的場域規模和預算需求，立刻得到個人化財務分析</p>
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
