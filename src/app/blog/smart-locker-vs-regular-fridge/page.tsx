import type { Metadata } from 'next'
import { KeywordTrigger, ArticleCTA } from '@/components/KeywordTrigger'

export const metadata: Metadata = {
  title: '智慧取物冰箱 vs 一般冰箱：餐廳外帶哪個更適合？完整比較 | 銓幻元',
  description: '餐廳放一台普通冰箱讓顧客自取外帶，真的夠嗎？智慧取物冰箱 vs 一般冰箱的完整比較：保溫時間、訂單整合、人力需求、盜取風險、投資回報全面分析。',
}

export default function Article() {
  return (
    <main className="min-h-screen bg-[#0d1a2d] text-slate-100">
      <article className="max-w-2xl mx-auto px-6 py-16">
        <div className="flex flex-wrap gap-2 mb-6">
          {['智慧取物櫃', '餐廳外帶', '選型比較'].map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,107,53,0.12)', color: '#FF6B35' }}>{tag}</span>
          ))}
        </div>
        <h1 className="text-3xl font-bold mb-3 text-slate-100">
          <KeywordTrigger keyword="智慧取物櫃" />（智取冰箱）vs 一般冰箱：餐廳外帶哪個更適合？完整比較
        </h1>
        <p className="text-slate-500 text-sm mb-10">2026-07-03 · 7 分鐘閱讀</p>

        <div className="space-y-7 text-slate-300 leading-relaxed">
          <p>
            許多餐廳老闆在解決外帶等待問題時，第一個想到的方案是「在前台放一台冰箱讓顧客自取」。
            這個想法的出發點對，但執行細節差很多。一台普通冰箱沒有訂單管理、沒有取餐驗證、
            沒有保溫功能，實際上反而會製造更多麻煩。
          </p>
          <p>
            本文完整比較<KeywordTrigger keyword="智慧取物櫃" />（智取冰箱）和一般冰箱在餐廳外帶場域的差異，
            幫助餐廳做出正確的設備選擇。
          </p>

          <ArticleCTA keyword="智慧取物櫃" />

          <h2 className="text-xl font-bold text-slate-100 mt-10">完整比較表</h2>
          <div className="rounded-xl overflow-hidden border border-slate-700">
            <table className="w-full text-sm">
              <thead style={{ background: '#1e293b' }}>
                <tr>
                  <th className="text-left px-4 py-3 text-slate-300">比較項目</th>
                  <th className="text-left px-4 py-3 text-slate-300">一般冰箱</th>
                  <th className="text-left px-4 py-3 text-[#FF6B35]">智慧取物櫃</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['訂單整合', '無（只是儲物空間）', '自動分格，POS/外送平台直通'],
                  ['取餐驗證', '無（誰都可以取）', '個人取餐碼，防錯防盜'],
                  ['顧客通知', '無（要自己等或電話問）', '系統自動推播 LINE 通知'],
                  ['保溫功能', '冷藏（4°C），不適合熱食', '恆溫 65°C，熱食品質保持'],
                  ['保溫時間', '不適用（食物會冷）', '60 分鐘恆溫'],
                  ['格口管理', '無區隔（餐點堆在一起）', 'S/M/L 獨立格口，避免混淆'],
                  ['使用記錄', '無', '每筆取餐時間戳記，可稽核'],
                  ['外送員流程', '無（還是要員工交接）', '外送員掃碼自取，0 人力'],
                  ['設備費用', 'NT$8,000–25,000（買斷）', 'NT$4,200/月起（月租）'],
                  ['安裝難度', '即插即用', '需 POS 串接（1–2 天）'],
                ].map(([item, normal, smart], i) => (
                  <tr key={i} style={{ borderTop: '1px solid #1e293b', background: i % 2 === 0 ? '#0f1f36' : '#0d1a2d' }}>
                    <td className="px-4 py-3 text-slate-300 font-medium">{item}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{normal}</td>
                    <td className="px-4 py-3 text-[#FF6B35] font-semibold text-xs">{smart}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-10">一般冰箱的 5 個實際問題</h2>
          <div className="space-y-4">
            {[
              { title: '問題 1：顧客拿錯別人的餐', content: '冰箱裡沒有個人化標示，尖峰時段 6 個便當放在裡面，顧客很容易拿到不是自己的那份。員工還是需要介入確認，沒有節省人力。' },
              { title: '問題 2：熱食放進去變冷食', content: '一般冰箱溫度 4°C，熱食放進去 10 分鐘後就接近室溫，再冷藏就沒辦法復熱。這根本不是外帶熱食的解法。' },
              { title: '問題 3：無法整合外送平台訂單', content: 'Uber Eats 訂單進來，外送員到了還是要員工確認、找餐、交接，冰箱完全無法幫你解決外送員的等待問題。' },
              { title: '問題 4：顧客不知道餐好了沒', content: '沒有推播通知機制，顧客要自己打電話問，或者一直在店外等。這與「讓顧客自在等待、適時來取」的目標完全背道而馳。' },
              { title: '問題 5：食品安全風險', content: '餐點放進冰箱後，溫度短時間內快速下降，食品安全區間（65°C 以上）完全無法維持。若顧客超時取餐，有食安疑慮。' },
            ].map(({ title, content }) => (
              <div key={title} className="rounded-xl p-4" style={{ background: '#1e0a0a', border: '1px solid rgba(239,68,68,0.15)' }}>
                <p className="font-bold text-red-300 mb-2 text-sm">{title}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{content}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-10">什麼時候一般冰箱才適合？</h2>
          <p>一般冰箱不是沒有用武之地，但適用場景有限：</p>
          <ul className="list-disc pl-6 space-y-2 text-slate-300">
            <li>主要販售冷食（沙拉、飲料、甜點）且客流量小（每日 &lt; 30 單）</li>
            <li>餐廳規模極小（單人經營），暫時性解決方案</li>
            <li>搭配智取櫃使用：冷食區用冰箱，熱食區用智取櫃</li>
          </ul>
          <p className="text-slate-400 text-sm mt-3">
            如果你的外帶訂單以熱食為主，或者每日外帶訂單超過 20 單，智慧取物櫃的 ROI 通常優於一般冰箱。
          </p>

          <h2 className="text-xl font-bold text-slate-100 mt-8">真實換算：從冰箱升級到智取櫃</h2>
          <div className="rounded-xl p-5 border" style={{ background: '#0f1f36', borderColor: 'rgba(255,107,53,0.2)' }}>
            <h3 className="font-bold text-[#FF6B35] mb-3">台南日式便當店（外帶訂單：45 單/日）</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500 text-xs font-medium mb-2">使用一般冰箱時</p>
                <div className="space-y-1 text-xs text-slate-400">
                  <p>前台每日處理外帶：55 分鐘</p>
                  <p>顧客投訴拿錯餐：月均 6 次</p>
                  <p>熱食變冷食投訴：月均 9 次</p>
                  <p>Google 評分：3.8 ★</p>
                </div>
              </div>
              <div>
                <p className="text-[#FF6B35] text-xs font-medium mb-2">換裝智取櫃後</p>
                <div className="space-y-1 text-xs text-slate-300">
                  <p>前台每日處理外帶：12 分鐘</p>
                  <p>取錯餐事件：0 次</p>
                  <p>熱食品質投訴：0 次</p>
                  <p>Google 評分：4.5 ★</p>
                </div>
              </div>
            </div>
            <p className="text-slate-500 text-xs mt-3">* 月租費 NT$4,200，月省人力成本 NT$7,900，第 1 個月即正回報</p>
          </div>

          <div className="rounded-xl p-5 my-6 text-center" style={{ background: '#0f2744', border: '1px solid rgba(255,107,53,0.3)' }}>
            <p className="text-lg font-bold text-slate-200 mb-2">適合你的是智取櫃還是冰箱？3 分鐘 AI 顧問幫你判斷</p>
            <p className="text-slate-400 text-sm mb-5">告訴我們外帶訂單量、熱食比例、現有 POS 系統，AI 立刻給出推薦</p>
            <a href="/products/grabox?ai=1&utm_source=blog&utm_medium=article-bottom&utm_campaign=vs-fridge"
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
