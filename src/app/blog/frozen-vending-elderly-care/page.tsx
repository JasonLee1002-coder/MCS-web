import type { Metadata } from 'next'
import { KeywordTrigger, ArticleCTA } from '@/components/KeywordTrigger'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.mcstation.ai/blog/frozen-vending-elderly-care' },
  title: '長照機構冷凍販賣機：24 小時銀髮族餐食供應完整指南 | 銓幻元',
  description: '長照機構、護理之家、日照中心的餐食供應有嚴格規範。冷凍販賣機如何在符合長照法規的前提下，解決夜間照護人員餐食和補充性點心需求？含真實案例。',
}

export default function Article() {
  return (
    <main className="min-h-screen bg-[#0d1a2d] text-slate-100">
      <article className="max-w-2xl mx-auto px-6 py-16">
        <div className="flex flex-wrap gap-2 mb-6">
          {['冷凍販賣機', '長照機構', '銀髮族'].map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,107,53,0.12)', color: '#FF6B35' }}>{tag}</span>
          ))}
        </div>
        <h1 className="text-3xl font-bold mb-3 text-slate-100">
          長照機構<KeywordTrigger keyword="冷凍販賣機" slug="frozen-microwave" />：24 小時銀髮族餐食供應完整指南
        </h1>
        <p className="text-slate-500 text-sm mb-10">2026-07-03 · 7 分鐘閱讀</p>

        <div className="space-y-7 text-slate-300 leading-relaxed">
          <p>
            台灣 65 歲以上人口在 2026 年已突破 20%，長照機構（護理之家、養護中心、日照中心）
            面臨雙重壓力：照護人力短缺，同時還要負責 24 小時的餐食供應。
            深夜班的照護員在顧好院民的同時，自己也需要補充體力，卻找不到熱食。
          </p>
          <p>
            <KeywordTrigger keyword="冷凍販賣機" slug="frozen-microwave" />在長照場域的應用主要有兩個面向：
            照護員的夜班餐食，以及院民補充性點心的自助供應（需搭配軟硬兼施的介入設計）。
          </p>

          <ArticleCTA keyword="冷凍販賣機" slug="frozen-microwave" />

          <h2 className="text-xl font-bold text-slate-100 mt-10">長照場域的特殊性：與工廠場域的差異</h2>
          <div className="rounded-xl overflow-hidden border border-slate-700">
            <table className="w-full text-sm">
              <thead style={{ background: '#1e293b' }}>
                <tr>
                  <th className="text-left px-4 py-3 text-slate-300">比較項目</th>
                  <th className="text-left px-4 py-3 text-slate-300">工廠場域</th>
                  <th className="text-left px-4 py-3 text-[#FF6B35]">長照場域</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['主要使用者', '夜班員工', '照護員（員工）+ 院民家屬'],
                  ['使用時間', '夜間尖峰', '全天均勻分散'],
                  ['食材需求', '一般冷凍便當', '低鈉、低糖、流質友善選項'],
                  ['法規限制', '食安法規', '長照機構設置標準＋食安法'],
                  ['補貨頻率', '每週或兩週', '每週（新鮮感較重要）'],
                  ['設備外觀要求', '無特別要求', '需符合機構環境（不刺眼、不嚇人）'],
                ].map(([item, factory, care], i) => (
                  <tr key={i} style={{ borderTop: '1px solid #1e293b', background: i % 2 === 0 ? '#0f1f36' : '#0d1a2d' }}>
                    <td className="px-4 py-3 text-slate-300 font-medium text-xs">{item}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{factory}</td>
                    <td className="px-4 py-3 text-[#FF6B35] font-semibold text-xs">{care}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-10">長照場域的 2 種應用模式</h2>
          <div className="space-y-5">
            <div className="rounded-xl p-5" style={{ background: '#0f1f36', border: '1px solid rgba(255,107,53,0.12)' }}>
              <h3 className="font-bold text-[#FF6B35] mb-2">模式 A：照護員專用（主要用途）</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-3">
                機台設置在員工休息室或護理站附近，僅供照護人員使用（IC 卡門禁限制）。
                品項以照護員需求為主：冷凍便當、熱湯、能量飲料。這個應用和工廠場域邏輯相同，
                銓幻元在多個照護機構場域已有導入此模式的經驗。
              </p>
              <div className="text-xs text-slate-300 space-y-1">
                <p>✓ 解決夜班照護員深夜餐食問題</p>
                <p>✓ 提升照護員工作滿意度，降低離職率</p>
                <p>✓ 不需要特別考慮院民食安規範</p>
              </div>
            </div>
            <div className="rounded-xl p-5" style={{ background: '#0f1f36', border: '1px solid rgba(255,107,53,0.12)' }}>
              <h3 className="font-bold text-[#FF6B35] mb-2">模式 B：家屬/訪客區點心站</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-3">
                機台設置在訪客接待區，供院民家屬購買帶入的點心飲料。
                機台選品需考慮「哪些食品適合帶給長者」，建議搭配機構營養師意見。
                此模式機構可獲得額外收入來源，不需要額外人力管理。
              </p>
              <div className="text-xs text-slate-300 space-y-1">
                <p>✓ 家屬探視時方便購買適合的點心</p>
                <p>✓ 機構增加收入，減少外部零食帶入的衛生疑慮</p>
                <p>✓ 食材選品需符合長者飲食建議</p>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-10">長照場域適合的食材清單</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { cat: '✅ 推薦品項', items: ['低鈉冷凍便當（鈉含量 < 600mg）', '軟質蒸糕/饅頭（吞嚥友善）', '即溶麥片/燕麥', '低糖飲料/無糖豆漿', '健康能量棒（照護員用）'] },
              { cat: '❌ 不建議品項', items: ['高鈉醃製食品', '高糖甜食/含糖飲料（糖尿病院民）', '硬質零食（牙齒問題）', '酒精類飲品', '需要院民自行操作微波的熱食（安全考量）'] },
            ].map(({ cat, items }) => (
              <div key={cat} className="rounded-xl p-4" style={{ background: '#1e293b' }}>
                <p className="font-bold text-slate-200 mb-2 text-sm">{cat}</p>
                <ul className="space-y-1">
                  {items.map(item => <li key={item} className="text-slate-400 text-xs">• {item}</li>)}
                </ul>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-8">成本結構：50 人護理之家要算哪些項目</h2>
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
            <p className="text-lg font-bold text-slate-200 mb-2">長照場域規劃，AI 顧問提供合規建議</p>
            <p className="text-slate-400 text-sm mb-5">告訴我們機構類型、床位數、照護員人數，AI 立刻給出符合長照法規的設備方案</p>
            <a href="/products/frozen-microwave?ai=1"
              className="inline-block px-8 py-3 rounded-xl font-bold text-white" style={{ background: '#FF6B35' }}>
              立即諮詢 AI 顧問 →
            </a>
          </div>
        </div>

          <p className="text-slate-400 text-sm my-6">
            對應機型規格：<a href="/products/frozen-vending/mcs-fz21s" style={{ color: '#FF6B35' }} className="hover:underline">MCS-FZ21S 保溫取貨箱規格</a>。
          </p>
        <div className="mt-12 pt-8 border-t border-slate-700/40">
          <a href="/blog" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">← 返回知識庫</a>
        </div>
      </article>
    </main>
  )
}
