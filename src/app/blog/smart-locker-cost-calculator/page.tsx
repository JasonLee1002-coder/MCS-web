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
        {/* 2026-08-23 GEO：H1 下方補一段直接回答。
            實測 transtep 與李奇申.com 的文章都是「H1 → 一句直接回答」，
            Gemini 引用率 16/18 與 11/12；本站原本開頭是重述問題，引用率 5/16。 */}
        <div className="rounded-xl p-5 mb-10" style={{ background: '#0f1f36', borderLeft: '2px solid #FF6B35' }}>
          <p className="text-slate-200 leading-relaxed text-[15px]">簡單的判斷是：<strong className="text-slate-100">看你打算用多久</strong>。預計使用時間短、或場域還在試水溫，租賃把風險留在月費裡；使用年限長且點位穩定，買斷過了損益平衡點之後每年都在省。真正的變數不是設備價格，而是你現在花在人力交付上的時間成本——那才是這台設備要取代的東西。</p>
        </div>

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
                  ['設備費（10–20 格）', '月費最低，無前期支出', '前期一次支出，長期總成本較低'],
                  ['設備費（20–40 格）', '月費隨格數上升', '前期支出隨格數上升'],
                  ['設備費（40–60 格）', '月費隨格數上升', '前期支出隨格數上升'],
                  ['安裝費', '含在月費中', '一次性計費'],
                  ['POS 串接費', '一次性計費', '一次性計費'],
                  ['外送平台串接', '免費（預建）', '免費（預建）'],
                  ['月度系統維護', '含在月費中', '保固期內不另計'],
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
                ['支出項', '設備月租（10 格）＋ POS 串接一次性費用'],
                ['節省項', '外帶交付佔用的人力時間 × 每日單量 × 營業天數'],
                ['怎麼判斷', '把省下的人力工時換算成你自己的時薪成本，與月租相比'],
              ],
              highlight: '單量越集中在尖峰、人力越貴，回收越快。實際數字需代入你自己的時薪與單量。',
            },
            {
              title: '場域 B：連鎖早午餐（週末外帶 80 單/日，20 格）',
              details: [
                ['支出項', '設備月租（20 格）'],
                ['節省項', '週末尖峰外帶交付佔用的人力時間'],
                ['增益項', '外帶動線與內用分流後的翻桌變化'],
                ['怎麼判斷', '週末尖峰兩小時的實際單量是關鍵變數，平日單量參考價值低'],
              ],
              highlight: '這類場域的效益幾乎全部集中在週末尖峰，用平均值評估會嚴重失真。',
            },
            {
              title: '場域 C：辦公大樓（180 人，35 格）',
              details: [
                ['支出項', '設備月租（35 格）'],
                ['節省項', '前台代收外送所佔用的時間'],
                ['難量化項', '員工午餐等待縮短帶來的滿意度'],
                ['怎麼判斷', '把淨成本除以在職人數，看每人每月分攤是否可接受'],
              ],
              highlight: '辦公場域通常不是靠賺價差回收，而是看每人分攤成本是否低到可以當福利支出。',
            },
            {
              title: '場域 D：幽靈廚房（3 個取餐點，各 20 格）',
              details: [
                ['支出項', '設備月租 × 取餐點數'],
                ['節省項', '外送員等待與協調所佔用的時間'],
                ['節省項', '取錯餐造成的退款與重做'],
                ['怎麼判斷', '點位越多，統一管理的邊際效益越明顯'],
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
          <p>以 20 格智取櫃為例，月租與買斷的差別在於支出的時間分布：</p>
          <div className="rounded-xl p-5 border" style={{ background: '#0f1f36', borderColor: 'rgba(255,107,53,0.2)' }}>
            <div className="text-sm space-y-2">
              <p><span className="text-slate-400">買斷：</span><span className="text-slate-200">前期一次支出，之後不再付月費</span></p>
              <p><span className="text-slate-400">月租：</span><span className="text-slate-200">前期近乎為零，但月費持續發生</span></p>
              <p><span className="text-slate-400">損益平衡：</span><span className="text-[#FF6B35] font-bold">買斷的前期支出 ÷ 每月省下的月費 ＝ 幾個月後兩者打平</span></p>
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
