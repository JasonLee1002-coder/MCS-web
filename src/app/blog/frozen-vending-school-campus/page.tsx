import type { Metadata } from 'next'
import { KeywordTrigger, ArticleCTA } from '@/components/KeywordTrigger'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.mcstation.ai/blog/frozen-vending-school-campus' },
  title: '冷凍便當販賣機進駐學校：大學、高中場域評估完整指南 | 銓幻元',
  description: '學校放冷凍販賣機需要什麼許可？採購程序怎麼走？本文整理大學和高中場域的評估重點、法規說明、食材選擇和真實投資回報，幫助總務主任做出決策。',
}

export default function Article() {
  return (
    <main className="min-h-screen bg-[#0d1a2d] text-slate-100">
      <article className="max-w-2xl mx-auto px-6 py-16">
        <div className="flex flex-wrap gap-2 mb-6">
          {['冷凍販賣機', '校園', '學校餐飲'].map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,107,53,0.12)', color: '#FF6B35' }}>{tag}</span>
          ))}
        </div>
        <h1 className="text-3xl font-bold mb-3 text-slate-100">
          冷凍便當<KeywordTrigger keyword="冷凍販賣機" slug="frozen-microwave" />進駐學校：大學、高中場域評估完整指南
        </h1>
        <p className="text-slate-500 text-sm mb-10">2026-07-03 · 8 分鐘閱讀</p>

        <div className="space-y-7 text-slate-300 leading-relaxed">
          <p>
            在校園放置<KeywordTrigger keyword="冷凍販賣機" slug="frozen-microwave" />的需求正在快速增長：
            學生宿舍深夜需要熱食、夜間讀書室需要餐食補給、下課後餐廳已關閉。
            學校場域和工廠場域的邏輯類似，但有幾個特殊的合規要求需要提前了解。
          </p>
          <p>
            本文整理大學和高中場域的評估重點，包括食品安全法規、採購程序、場域選點，
            以及真實的投資回報數據。
          </p>

          <ArticleCTA keyword="冷凍販賣機" slug="frozen-microwave" />

          <h2 className="text-xl font-bold text-slate-100 mt-10">大學 vs 高中場域的差異</h2>
          <div className="rounded-xl overflow-hidden border border-slate-700">
            <table className="w-full text-sm">
              <thead style={{ background: '#1e293b' }}>
                <tr>
                  <th className="text-left px-4 py-3 text-slate-300">項目</th>
                  <th className="text-left px-4 py-3 text-slate-300">大學 / 科大</th>
                  <th className="text-left px-4 py-3 text-[#FF6B35]">高中（全制）</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['使用對象', '18 歲以上自主管理', '未成年學生（需家長授權）'],
                  ['宿舍需求', '強烈（自主生活）', '有（部分住宿型高中）'],
                  ['食材限制', '一般食品安全法規', '學校午餐法＋教育部規範'],
                  ['採購方式', '政府採購法（公立）', '政府採購法（公立）'],
                  ['設備位置', '宿舍大廳、圖書館、餐廳旁', '宿舍走廊、福利社旁'],
                  ['使用時段', '全天，深夜尖峰', '下課後、宿舍夜間'],
                  ['付款方式', '手機/現金/學生證', '學生證/現金（家長預充值）'],
                ].map(([item, univ, highschool], i) => (
                  <tr key={i} style={{ borderTop: '1px solid #1e293b', background: i % 2 === 0 ? '#0f1f36' : '#0d1a2d' }}>
                    <td className="px-4 py-3 text-slate-300 font-medium text-xs">{item}</td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{univ}</td>
                    <td className="px-4 py-3 text-[#FF6B35] font-semibold text-xs">{highschool}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-10">法規合規重點</h2>
          <div className="space-y-4">
            {[
              {
                title: '大學場域',
                points: [
                  '食品安全衛生管理法：冷凍販賣機食材須符合 CNS 冷凍食品標準，温控須有記錄',
                  '公立大學採購：依政府採購法的公告金額級距決定招標方式，銓幻元可提供完整投標文件',
                  '私立大學採購：依各校自訂採購規範，通常比公立彈性',
                  '販賣機擺設許可：向學校總務處申請，銓幻元協助準備場地申請文件',
                ],
              },
              {
                title: '高中住宿場域',
                points: [
                  '未成年保護：可設定每週消費上限，家長可透過系統查詢消費記錄',
                  '食材限制：教育部建議學校販賣設備不得販售高糖、高鈉零食，冷凍便當需符合學校午餐營養標準（脂肪 ≤ 35%、鈉 ≤ 2000mg）',
                  '使用時段管制：可設定只在放學後和週末開放使用',
                  '家長同意書：銓幻元提供標準版，學校可直接使用',
                ],
              },
            ].map(({ title, points }) => (
              <div key={title} className="rounded-xl p-4" style={{ background: '#0f1f36', border: '1px solid rgba(255,107,53,0.1)' }}>
                <p className="font-bold text-[#FF6B35] mb-3 text-sm">{title}</p>
                <ul className="space-y-1.5">
                  {points.map(p => (
                    <li key={p} className="flex gap-2 text-xs text-slate-300">
                      <span className="shrink-0" style={{ color: '#FF6B35' }}>✓</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-10">校園場域最佳選點建議</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong className="text-slate-100">宿舍大廳（首選）</strong>：24 小時人流，深夜使用率最高，補貨方便，安全管制容易</li>
            <li><strong className="text-slate-100">圖書館入口</strong>：讀書的學生需要補充體力，使用時段集中在晚間</li>
            <li><strong className="text-slate-100">運動場館旁</strong>：運動後飢餓感強，但使用時段較短</li>
            <li><strong className="text-slate-100">避免：室外無遮蔽處</strong>：夏季日曬影響溫控效率，冬天電費增加</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-100 mt-8">投資試算：5,000 人大學宿舍</h2>
          <div className="rounded-xl p-5 border" style={{ background: '#0f1f36', borderColor: 'rgba(255,107,53,0.2)' }}>
            <div className="text-sm space-y-2">
              <p className="text-slate-300">這個場域的成本會由以下幾項決定，實際金額差距很大，需要依現場條件試算：</p>
              <ul className="text-slate-400 list-disc pl-5 space-y-1 mt-2">
                <li>設備取得方式（購置或租賃）與機型、格數、溫層</li>
                <li>商品進貨成本與品項結構</li>
                <li>電費，取決於溫層與現場使用強度</li>
                <li>補貨與維護的人力安排</li>
              </ul>
              <p className="text-slate-500 text-xs mt-3">本站不提供費用數字。實際條件請由專人依您的場地評估後說明。</p>
            
            </div>
          </div>

          <div className="rounded-xl p-5 my-6 text-center" style={{ background: '#0f2744', border: '1px solid rgba(255,107,53,0.3)' }}>
            <p className="text-lg font-bold text-slate-200 mb-2">學校場域採購規劃，AI 顧問提供完整文件</p>
            <p className="text-slate-400 text-sm mb-5">告訴我們學校類型、在校人數、採購預算，AI 立刻給出合規配置方案和採購文件清單</p>
            <a href="/products/frozen-microwave?ai=1&utm_source=blog&utm_medium=article-bottom&utm_campaign=school"
              className="inline-block px-8 py-3 rounded-xl font-bold text-white" style={{ background: '#FF6B35' }}>
              立即諮詢 AI 顧問 →
            </a>
          </div>
        </div>

          <p className="text-slate-400 text-sm my-6">
            對應機型規格：<a href="/products/frozen-vending/mcs-fz21x" style={{ color: '#FF6B35' }} className="hover:underline">MCS-FZ21X 54 貨道規格</a>。
          </p>
        <div className="mt-12 pt-8 border-t border-slate-700/40">
          <a href="/blog" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">← 返回知識庫</a>
        </div>
      </article>
    </main>
  )
}
