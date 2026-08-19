import type { Metadata } from 'next'
import { KeywordTrigger, ArticleCTA } from '@/components/KeywordTrigger'

export const metadata: Metadata = {
  title: '校園智慧取物櫃：大學、科大學生餐食自動化完整指南 | 銓幻元',
  description: '大學餐廳午餐排隊 20 分鐘是常態，課間 10 分鐘根本不夠。校園智慧取物系統讓學生手機訂餐、課後取餐，免排隊、免等待。含費用試算與學校採購說明。',
}

export default function Article() {
  return (
    <main className="min-h-screen bg-[#0d1a2d] text-slate-100">
      <article className="max-w-2xl mx-auto px-6 py-16">
        <div className="flex flex-wrap gap-2 mb-6">
          {['智慧取物櫃', '校園', '學校餐飲'].map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,107,53,0.12)', color: '#FF6B35' }}>{tag}</span>
          ))}
        </div>
        <h1 className="text-3xl font-bold mb-3 text-slate-100">
          校園<KeywordTrigger keyword="智慧取物櫃" />：大學、科大學生餐食自動化完整指南
        </h1>
        <p className="text-slate-500 text-sm mb-10">2026-07-03 · 6 分鐘閱讀</p>

        <div className="space-y-7 text-slate-300 leading-relaxed">
          <p>
            台灣大專院校的午餐問題長年被忽視：學生在 11:50–13:10 的 80 分鐘裡，要排隊點餐、等餐、取餐、找位子、吃完，
            留給真正吃飯的時間只有 20–30 分鐘。許多學生乾脆跳過午餐或選擇買便利商店食品。
          </p>
          <p>
            智慧取物系統讓學生在課前訂餐，課後直接掃碼取餐，不用排隊，不用等。
            餐廳不需要增加人力，尖峰時段的人潮壓力也大幅下降。
          </p>

          <ArticleCTA keyword="智慧取物櫃" />

          <h2 className="text-xl font-bold text-slate-100 mt-10">校園場域的 4 個特殊條件</h2>
          <div className="space-y-4">
            {[
              { num: '01', title: '用餐時段極度集中', content: '12:00–12:30 全校學生集中用餐，餐廳人流是一天其他時間的 5–8 倍。30 分鐘內要服務 2,000 人，用傳統方式永遠不夠。智取系統讓學生可以在 10:00–11:50 先訂餐，12:00 後陸續取餐，分散人流。' },
              { num: '02', title: '學生付款方式多元', content: '學生支付習慣：行動支付（LINE Pay/街口）65%、學生證感應 20%、現金 15%。智取系統全部支援，學生不需要帶現金或另辦卡。' },
              { num: '03', title: '校方採購有規範', content: '公立大學屬政府機構，設備採購需配合政府採購法。銓幻元已有學校採購案例，可提供規格書、投標文件、政府電子採購平台資格，協助學校總務處完成採購流程。' },
              { num: '04', title: '夜間宿舍有餐食需求', content: '大學宿舍深夜有學生需要吃東西（讀書、打工返回），但宿舍廚房限制使用。冷凍販賣機配合智取系統可解決宿舍深夜餐食問題。' },
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

          <h2 className="text-xl font-bold text-slate-100 mt-10">校園場域配置建議</h2>
          <div className="rounded-xl overflow-hidden border border-slate-700">
            <table className="w-full text-sm">
              <thead style={{ background: '#1e293b' }}>
                <tr>
                  <th className="text-left px-4 py-3 text-slate-300">位置</th>
                  <th className="text-left px-4 py-3 text-slate-300">設備建議</th>
                  <th className="text-left px-4 py-3 text-[#FF6B35]">預期效益</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['學生餐廳入口', '智慧取物櫃 40–60 格', '午餐等待 20 分鐘 → 3 分鐘'],
                  ['圖書館門口', '智慧取物櫃 20 格', '自習室學生不用去餐廳'],
                  ['宿舍大廳', '冷凍販賣機 × 1', '深夜餐食需求覆蓋'],
                  ['體育館附近', '飲料 + 輕食智取', '運動後補給自助取'],
                ].map(([location, device, benefit], i) => (
                  <tr key={i} style={{ borderTop: '1px solid #1e293b', background: i % 2 === 0 ? '#0f1f36' : '#0d1a2d' }}>
                    <td className="px-4 py-3 text-slate-300 font-medium text-xs">{location}</td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{device}</td>
                    <td className="px-4 py-3 text-[#FF6B35] font-semibold text-xs">{benefit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-8">學校採購 SOP（公立大學）</h2>
          <ol className="list-decimal pl-6 space-y-3">
            <li><strong className="text-slate-100">需求確認</strong>：總務處聯繫銓幻元，確認場域評估、設備規格、預算範圍</li>
            <li><strong className="text-slate-100">規格書準備</strong>：銓幻元提供符合政府採購法格式的規格書，含技術規格、認證文件、效能數據</li>
            <li><strong className="text-slate-100">採購程序</strong>：依政府採購法的公告金額級距選擇公開招標或限制性招標</li>
            <li><strong className="text-slate-100">安裝與驗收</strong>：1–2 天安裝，提供驗收報告，學生餐廳不需要停業</li>
            <li><strong className="text-slate-100">App 整合</strong>：對接學校現有的學生 App 或餐廳訂餐系統，通常 3–5 工作天完成</li>
          </ol>

          <h2 className="text-xl font-bold text-slate-100 mt-8">大型校園（8,000 人規模）導入的典型效果方向</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>午餐尖峰排隊：預訂取餐的學生可直接掃碼取餐，跳過現場排隊隊伍</li>
            <li>設備配置：以 8,000 人規模校園來說，智取 60 格 × 2 台可分散尖峰時段的取餐人流</li>
            <li>餐廳座位運用：學生等餐時間縮短，用餐可用時間相對增加，有助於座位週轉</li>
            <li>學生餐飲滿意度：排隊等待是校園餐飲滿意度調查中常見的扣分項，縮短等待通常能帶動整體滿意度提升</li>
          </ul>
          <p className="text-slate-500 text-xs">* 實際效果依校園人數、餐廳規模與現行流程而異，銓幻元已有學校採購案例，建議洽詢顧問依貴校情況評估</p>

          <div className="rounded-xl p-5 my-6 text-center" style={{ background: '#0f2744', border: '1px solid rgba(255,107,53,0.3)' }}>
            <p className="text-lg font-bold text-slate-200 mb-2">學校場域規劃，AI 顧問幫你提案</p>
            <p className="text-slate-400 text-sm mb-5">告訴我們在校人數、餐廳規模、採購預算，AI 立刻給出完整配置方案</p>
            <a href="/products/grabox?ai=1&utm_source=blog&utm_medium=article-bottom&utm_campaign=campus"
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
