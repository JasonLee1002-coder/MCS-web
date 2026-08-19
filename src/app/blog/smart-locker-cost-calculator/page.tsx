import type { Metadata } from 'next'
import { KeywordTrigger, ArticleCTA } from '@/components/KeywordTrigger'

export const metadata: Metadata = {
  title: '智慧取物櫃費用試算：月租 vs 買斷，你的場域哪個划算？| 銓幻元',
  description: '智慧取物櫃月租多少？買斷要多少錢？本文提供 2026 年最新費用試算表，依場域人數、外帶訂單量、POS 系統類型給出個人化估算，幫你在簽約前做好財務規劃。',
}

export default function Article() {
  return (
    <main className="min-h-screen bg-[#0d1a2d] text-slate-100">
      <article className="max-w-2xl mx-auto px-6 py-16">
        <div className="flex flex-wrap gap-2 mb-6">
          {['智慧取物櫃', '費用試算', '投資分析'].map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,107,53,0.12)', color: '#FF6B35' }}>{tag}</span>
          ))}
        </div>
        <h1 className="text-3xl font-bold mb-3 text-slate-100">
          <KeywordTrigger keyword="智慧取物櫃" />費用試算：月租 vs 買斷，你的場域哪個划算？
        </h1>
        <p className="text-slate-500 text-sm mb-10">2026-07-03 · 7 分鐘閱讀</p>

        <div className="space-y-7 text-slate-300 leading-relaxed">
          <p>
            「<KeywordTrigger keyword="智慧取物櫃" />一個月要多少錢？」是採購時最直接的問題。
            但正確的回答不是一個數字，而是取決於你的場域大小、格數需求、是否需要 POS 整合，
            以及你選擇月租還是買斷。
          </p>
          <p>
            本文提供 2026 年銓幻元最新費用結構，並附上 4 種場域的詳細試算，
            幫你在接觸業務前就做好財務預期。
          </p>

          <ArticleCTA keyword="智慧取物櫃" />

          <h2 className="text-xl font-bold text-slate-100 mt-10">費用結構總覽</h2>
          <div className="rounded-xl overflow-hidden border border-slate-700">
            <table className="w-full text-sm">
              <thead style={{ background: '#1e293b' }}>
                <tr>
                  <th className="text-left px-4 py-3 text-slate-300">費用項目</th>
                  <th className="text-left px-4 py-3 text-slate-300">月租方案</th>
                  <th className="text-left px-4 py-3 text-[#FF6B35]">買斷方案</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['設備費（10–20 格）', 'NT$3,200/月', 'NT$85,000–120,000'],
                  ['設備費（20–40 格）', 'NT$4,200–5,500/月', 'NT$120,000–180,000'],
                  ['設備費（40–60 格）', 'NT$6,500–8,000/月', 'NT$180,000–260,000'],
                  ['安裝費', '含在月費中', 'NT$5,000（一次）'],
                  ['POS 串接費', 'NT$3,000（一次）', 'NT$3,000（一次）'],
                  ['外送平台串接', '免費（預建）', '免費（預建）'],
                  ['月度系統維護', '含在月費中', 'NT$0（保固期內）'],
                  ['保固年限', '月租期間全含', '2 年原廠保固'],
                ].map(([item, lease, buy], i) => (
                  <tr key={i} style={{ borderTop: '1px solid #1e293b', background: i % 2 === 0 ? '#0f1f36' : '#0d1a2d' }}>
                    <td className="px-4 py-3 text-slate-300 font-medium text-xs">{item}</td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{lease}</td>
                    <td className="px-4 py-3 text-[#FF6B35] font-semibold text-xs">{buy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-10">4 種場域費用試算</h2>

          {[
            {
              title: '場域 A：小型餐廳（日均外帶 25 單，10 格）',
              details: [
                ['月租費（10 格）', 'NT$3,200'],
                ['POS 串接（一次）', 'NT$3,000（第 1 個月）'],
                ['月省人力成本（30 分/天 × 22 天）', 'NT$4,026'],
                ['月費淨支出', 'NT$3,200 - NT$4,026 = 正回報 NT$826/月'],
              ],
              highlight: '第 1 個月起即正回報（扣除 POS 串接費後約 4 個月）',
            },
            {
              title: '場域 B：連鎖早午餐（週末外帶 80 單/日，20 格）',
              details: [
                ['月租費（20 格）', 'NT$4,200'],
                ['月省人力成本（65 分/天 × 8 週末）', 'NT$9,456'],
                ['翻桌率提升估計月增收入', 'NT$18,000'],
                ['月淨效益', 'NT$4,200 成本 vs NT$27,456 效益'],
              ],
              highlight: '投入 NT$4,200，月效益 NT$27,456，ROI 554%',
            },
            {
              title: '場域 C：辦公大樓（180 人，35 格）',
              details: [
                ['月租費（35 格）', 'NT$5,500'],
                ['月省前台外送接收時間（60 分× 22 天）', 'NT$4,026'],
                ['員工午餐滿意度提升（難量化）', '—'],
                ['月淨成本', 'NT$5,500 - NT$4,026 = NT$1,474/月'],
              ],
              highlight: '每位員工每月分攤約 NT$8.2，午餐等待縮短有助於員工滿意度',
            },
            {
              title: '場域 D：幽靈廚房（3 個取餐點，各 20 格）',
              details: [
                ['月租費（20 格 × 3 台）', 'NT$4,200 × 3 = NT$12,600'],
                ['外送員協調成本節省（月均 24 小時）', 'NT$4,392'],
                ['訂單錯誤成本節省（月均 8 次退款）', 'NT$2,400'],
                ['月淨成本', 'NT$12,600 - NT$6,792 = NT$5,808/月'],
              ],
              highlight: '多場域協調效益顯著，3 台統一管理成本低',
            },
          ].map(({ title, details, highlight }) => (
            <div key={title} className="rounded-xl p-5 border" style={{ background: '#0f1f36', borderColor: 'rgba(255,107,53,0.15)' }}>
              <h3 className="font-bold text-slate-100 mb-3 text-sm">{title}</h3>
              <div className="text-sm space-y-1.5 mb-3">
                {details.map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-2">
                    <span className="text-slate-400 text-xs">{label}</span>
                    <span className="text-slate-200 text-xs font-medium text-right">{value}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-lg px-3 py-2 text-xs font-bold" style={{ background: 'rgba(255,107,53,0.12)', color: '#FF6B35' }}>
                → {highlight}
              </div>
            </div>
          ))}

          <h2 className="text-xl font-bold text-slate-100 mt-8">月租 vs 買斷：損益平衡點</h2>
          <p>以 20 格智取櫃為例（月租 NT$4,200 vs 買斷 NT$120,000）：</p>
          <div className="rounded-xl p-5 border" style={{ background: '#0f1f36', borderColor: 'rgba(255,107,53,0.2)' }}>
            <div className="text-sm space-y-2">
              <p><span className="text-slate-400">買斷前期多支出：</span><span className="text-slate-200">NT$120,000</span></p>
              <p><span className="text-slate-400">每月月費節省：</span><span className="text-slate-200">NT$4,200</span></p>
              <p><span className="text-slate-400">損益平衡：</span><span className="text-[#FF6B35] font-bold">NT$120,000 ÷ NT$4,200 = 28.6 個月（約 2.4 年）</span></p>
              <p><span className="text-slate-400">建議：</span><span className="text-slate-200">確定使用超過 2.4 年 → 考慮買斷；不確定 → 先月租試用</span></p>
            </div>
          </div>

          <div className="rounded-xl p-5 my-6 text-center" style={{ background: '#0f2744', border: '1px solid rgba(255,107,53,0.3)' }}>
            <p className="text-lg font-bold text-slate-200 mb-2">你的場域費用？AI 顧問幫你精算</p>
            <p className="text-slate-400 text-sm mb-5">告訴我們場域類型、外帶訂單量、格數需求，AI 立刻給出個人化費用試算</p>
            <a href="/products/grabox?ai=1&utm_source=blog&utm_medium=article-bottom&utm_campaign=cost-calculator"
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
