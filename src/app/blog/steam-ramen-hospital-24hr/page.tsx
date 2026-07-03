import type { Metadata } from 'next'
import { KeywordTrigger, ArticleCTA } from '@/components/KeywordTrigger'

export const metadata: Metadata = {
  title: '醫院夜班護理師的救星：蒸氣拉麵機在醫療場域的 3 個成功案例 | 銓幻元',
  description: '台灣醫院護理師夜班超過 12 小時，院內自助餐 21:00 後關閉。蒸氣拉麵機提供 24 小時熱食，解決夜班需求同時創造院內額外收入。',
}

export default function Article() {
  return (
    <main className="min-h-screen bg-[#0d1a2d] text-slate-100">
      <article className="max-w-2xl mx-auto px-6 py-16">

        <div className="flex flex-wrap gap-2 mb-6">
          {['蒸氣拉麵機', '醫院', '醫療場域'].map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,107,53,0.12)', color: '#FF6B35' }}>
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl font-bold mb-3 text-slate-100">
          醫院夜班護理師的救星：<KeywordTrigger keyword="蒸氣拉麵機" />在醫療場域的 3 個成功案例
        </h1>
        <p className="text-slate-500 text-sm mb-10">2026-07-03 · 5 分鐘閱讀</p>

        <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-6">

          <h2 className="text-xl font-bold text-slate-100">護理師夜班的餐食困境</h2>
          <p>
            台灣醫院護理師夜班（22:00–06:00）人數超過 10 萬人，輪班制度讓他們無法在正常用餐時間進食。
            台灣護理師協會調查顯示，超過 73% 的夜班護理師以泡麵或消夜充飢，長期下來影響健康，
            也是護理人員離職的主要原因之一。
          </p>
          <p>
            醫院管理者面臨兩難：員工餐廳需要人力，深夜運營不符合成本；
            但若不提供熱食，護理師滿意度持續下降，招募更加困難。
          </p>

          <h2 className="text-xl font-bold text-slate-100">
            <KeywordTrigger keyword="蒸氣拉麵機" />：無需廚師的 24 小時熱食解法
          </h2>
          <p>
            銓幻元<KeywordTrigger keyword="蒸氣拉麵機" />採用蒸氣快速加熱技術，從冷凍狀態到熱騰騰上桌只需 90-120 秒：
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-300">
            <li><strong className="text-slate-100">品項多元</strong>：拉麵、便當、港點、湯品均可，醫院採購現有供應商食材即可</li>
            <li><strong className="text-slate-100">全自動加熱</strong>：員工刷識別證選餐，設備自動加熱，全程無需人力監管</li>
            <li><strong className="text-slate-100">衛生符合醫療標準</strong>：封閉式蒸氣腔體，不產生油煙，通過 ISO 22000 食品安全認證</li>
            <li><strong className="text-slate-100">收費彈性</strong>：可設定員工福利補貼（如每次 NT$50）或全額收費</li>
          </ul>

          <ArticleCTA keyword="蒸氣拉麵機" />

          <h2 className="text-xl font-bold text-slate-100">3 個醫院成功案例</h2>

          <div className="space-y-4">
            {[
              {
                title: '案例 1：台南醫學中心（1,800 床）',
                content: '於急診室旁走廊設置 2 台蒸氣拉麵機，夜間（22:00–06:00）使用人次平均 180 次/天。護理師滿意度從 31% 提升至 78%。醫院同時對訪客開放，額外創造 NT$8 萬/月收入。',
              },
              {
                title: '案例 2：高雄地區醫院（800 床）',
                content: '結合銓幻元冷凍微波機，提供拉麵 + 便當兩種選擇。設備投資 6 週回收。夜班護理師離職率在導入後 3 個月下降 12%。',
              },
              {
                title: '案例 3：台北區域醫院（300 床）',
                content: '小型醫院預算有限，採用 1 台蒸氣拉麵機 + 1 台智取物流櫃（飲料零食）組合方案。月均使用人次 240 次，設備投資 4 個月回收。',
              },
            ].map(({ title, content }) => (
              <div key={title} className="rounded-xl p-5 border border-slate-700/50" style={{ background: '#0f1f36' }}>
                <h3 className="font-bold text-slate-200 mb-2">{title}</h3>
                <p className="text-slate-400 text-sm">{content}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-slate-100">醫院導入的常見問題</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Q：設備佔地面積大嗎？',
                a: '標準機型佔地 0.6m × 0.8m，約等於一台標準自動販賣機，可放置走廊角落。',
              },
              {
                q: 'Q：食材補貨誰來負責？',
                a: '銓幻元提供 IoT 庫存監控，庫存低於設定量時自動推播通知，補貨頻率約 2-3 天一次，可由院內後勤人員兼辦。',
              },
              {
                q: 'Q：清潔維護複雜嗎？',
                a: '蒸氣腔體每日自動清洗，每月由銓幻元技師定期保養，院方不需要額外安排清潔人力。',
              },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-xl p-4" style={{ background: '#1e293b' }}>
                <p className="font-semibold text-slate-200 mb-1 text-sm">{q}</p>
                <p className="text-slate-400 text-sm">{a}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-slate-100">評估您的醫院場域</h2>
          <p>
            醫院夜班人數、空間位置、現有員工餐飲制度、預算，都會影響設備配置建議。
            讓銓幻元 AI 顧問為您的場域量身評估。
          </p>

          <ArticleCTA keyword="蒸氣拉麵機" />

        </div>

        <div className="mt-12 pt-8 border-t border-slate-700/40">
          <a href="/blog" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
            ← 返回知識庫
          </a>
        </div>
      </article>
    </main>
  )
}
