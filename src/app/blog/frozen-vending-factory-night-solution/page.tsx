import type { Metadata } from 'next'
import { KeywordTrigger, ArticleCTA } from '@/components/KeywordTrigger'

export const metadata: Metadata = {
  title: '工廠夜班餐食問題怎麼解？冷凍販賣機完整方案指南 | 銓幻元',
  description: '台灣製造業夜班人數超過 30 萬，廚房 22:00 關閉後無熱食供應。冷凍販賣機如何解決工廠夜班餐食困境？本文提供場域規劃、設備選型、投資試算完整指南。',
}

export default function Article() {
  return (
    <main className="min-h-screen bg-[#0d1a2d] text-slate-100">
      <article className="max-w-2xl mx-auto px-6 py-16">
        <div className="flex flex-wrap gap-2 mb-6">
          {['冷凍販賣機', '工廠夜班', '封閉場域'].map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,107,53,0.12)', color: '#FF6B35' }}>{tag}</span>
          ))}
        </div>
        <h1 className="text-3xl font-bold mb-3 text-slate-100">
          工廠夜班餐食問題怎麼解？<KeywordTrigger keyword="冷凍販賣機" slug="frozen-microwave" />完整方案指南
        </h1>
        <p className="text-slate-500 text-sm mb-10">2026-07-03 · 7 分鐘閱讀</p>

        <div className="space-y-7 text-slate-300 leading-relaxed">
          <p>
            台灣製造業三班制工廠的夜班人員（22:00–06:00）長期面臨同一個困境：員工餐廳在 22:00 關閉，
            附近超商距離遠，外送平台不進廠區，深夜肚子餓只能吃自備零食或泡麵。
            這個問題不只影響員工健康，更直接拉高夜班拒絕率和整體離職率。
          </p>
          <p>
            銓幻元服務超過 80 個封閉工廠場域，其中 60% 以上是為了解決夜班餐食而導入<KeywordTrigger keyword="冷凍販賣機" slug="frozen-microwave" />。
            本文整理完整的解決邏輯、設備規劃和投資試算。
          </p>

          <ArticleCTA keyword="冷凍販賣機" slug="frozen-microwave" />

          <h2 className="text-xl font-bold text-slate-100 mt-10">工廠夜班餐食的 4 大困境</h2>
          <div className="space-y-4">
            {[
              { num: '01', title: '廚房關閉，無熱食供應', content: '大多數工廠員工餐廳在 21:00–22:00 關閉，夜班員工從 22:00 上班到隔天 06:00，長達 8 小時沒有正餐供應。部分廠商在茶水間提供微波爐，但需要員工自備食物，不切實際。' },
              { num: '02', title: '外送進不來', content: '工廠有安全管制，外送員不能隨意進入廠區。即使可以在門口取餐，夜班員工通常無法在 30 分鐘內出廠取餐，實際可行性低。' },
              { num: '03', title: '附近超商太遠', content: '工業區規劃通常讓超商距離工廠步行 10–20 分鐘以上。夜班員工利用 10 分鐘休息時間根本無法往返，等到下班才能買食物已是凌晨。' },
              { num: '04', title: '夜班申請率低，留才困難', content: '食物是夜班人員考量是否接受夜班的重要因素。銓幻元客戶調查顯示，改善夜班餐食後，夜班申請率平均提升 18–25%，夜班離職率下降 30% 以上。' },
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

          <h2 className="text-xl font-bold text-slate-100 mt-10">冷凍販賣機怎麼解決這些問題？</h2>
          <p>核心邏輯是「把廚房功能壓縮進一台機器，24 小時自助運作」：</p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong className="text-slate-100">無人值守，隨時取餐</strong>：機台 24 小時運作，夜班員工下班前、凌晨休息時間都可以使用</li>
            <li><strong className="text-slate-100">冷凍保存 + 微波加熱</strong>：食材低溫保存，取出後 90 秒微波加熱，與廚房出品品質相近</li>
            <li><strong className="text-slate-100">補貨頻率低</strong>：冷凍食材保存期長達 3–6 個月，每週或每 2 週補貨一次，不需要每日管理</li>
            <li><strong className="text-slate-100">多語言介面</strong>：支援繁中、越語、印語、泰語、英語，移工同樣可輕鬆操作</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-100 mt-10">工廠場域設備規劃指南</h2>
          <div className="rounded-xl overflow-hidden border border-slate-700">
            <table className="w-full text-sm">
              <thead style={{ background: '#1e293b' }}>
                <tr>
                  <th className="text-left px-4 py-3 text-slate-300">夜班人數</th>
                  <th className="text-left px-4 py-3 text-slate-300">建議設備</th>
                  <th className="text-left px-4 py-3 text-slate-300">配置位置</th>
                  <th className="text-left px-4 py-3 text-[#FF6B35]">預期日均使用</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['50 人以下', '1 台（40 格）', '廠區茶水間', '15–25 次'],
                  ['50–150 人', '1–2 台（60 格）', '員工餐廳旁', '35–65 次'],
                  ['150–300 人', '2–3 台', '多點分布（每棟1台）', '65–120 次'],
                  ['300 人以上', '3 台以上', '多棟廠房分布', '120 次+'],
                ].map(([size, equip, location, usage], i) => (
                  <tr key={i} style={{ borderTop: '1px solid #1e293b', background: i % 2 === 0 ? '#0f1f36' : '#0d1a2d' }}>
                    <td className="px-4 py-3 text-slate-300 font-medium">{size}</td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{equip}</td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{location}</td>
                    <td className="px-4 py-3 text-[#FF6B35] font-semibold text-xs">{usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-8">投資試算：150 人工廠夜班場域</h2>
          <div className="rounded-xl p-5 border" style={{ background: '#0f1f36', borderColor: 'rgba(255,107,53,0.2)' }}>
            <h3 className="font-bold text-[#FF6B35] mb-3">試算情境：桃園工廠，夜班 150 人，2 台冷凍販賣機</h3>
            <div className="text-sm space-y-2">
              <p><span className="text-slate-400">設備月租費：</span><span className="text-slate-200">NT$7,500 × 2 = NT$15,000/月</span></p>
              <p><span className="text-slate-400">食材月均成本：</span><span className="text-slate-200">NT$28,000/月（自採，含冷凍便當+零食）</span></p>
              <p><span className="text-slate-400">電費：</span><span className="text-slate-200">NT$2,800/月</span></p>
              <p><span className="text-slate-400">月均銷售收入（日均 80 次 × NT$90）：</span><span className="text-slate-200">NT$216,000</span></p>
              <p><span className="text-slate-400">月均毛利：</span><span className="text-[#FF6B35] font-bold">NT$170,200</span></p>
              <p><span className="text-slate-400">夜班申請率提升（從 60% → 78%）：</span><span className="text-slate-200">少招 18% 的人力缺口</span></p>
              <p className="text-slate-500 text-xs mt-2">* 若工廠以員工福利形式提供（每人每月 NT$300 補貼），月支出增加 NT$45,000 但員工滿意度大幅提升</p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-8">食材選擇建議（工廠夜班場域）</h2>
          <p>根據銓幻元工廠客戶的銷售數據，夜班場域最受歡迎的品項：</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { rank: '#1', item: '冷凍便當（台式滷肉飯/排骨飯）', ratio: '35%' },
              { rank: '#2', item: '冷凍麵食（拉麵/牛肉麵）', ratio: '22%' },
              { rank: '#3', item: '冷凍點心（水餃/包子）', ratio: '18%' },
              { rank: '#4', item: '零食飲料（咖啡/能量飲）', ratio: '15%' },
              { rank: '#5', item: '東南亞料理（移工偏好）', ratio: '10%' },
            ].map(({ rank, item, ratio }) => (
              <div key={rank} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: '#1e293b' }}>
                <span className="font-black text-sm" style={{ color: '#FF6B35' }}>{rank}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-300 truncate">{item}</p>
                  <p className="text-xs text-slate-500">{ratio}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-8">常見問題（FAQ）</h2>
          <div className="space-y-4">
            {[
              { q: 'Q：夜班只有 30–50 人，也值得裝嗎？', a: '30 人以上通常可以支持 1 台機器的基本使用率（每台日均 15–20 次）。銓幻元有 30 人小廠場域，月均利潤約 NT$8,000，加上夜班留才效益，多數客戶認為划算。也可選擇月租制，降低前期風險。' },
              { q: 'Q：廠區電力夠嗎？需要特別拉線嗎？', a: '一台冷凍販賣機（含微波）最大功率約 1,500W，使用一般 110V/15A 插座即可。多數工廠廠區都有足夠電源，安裝前銓幻元會確認電力需求，通常不需要特別拉線。' },
              { q: 'Q：機台放在哪個位置最有效？', a: '建議放在夜班員工動線最頻繁的地方：員工餐廳入口、更衣室附近、夜班休息室。避免放在角落或人流不易到達的地方，這是影響使用率最大的因素。' },
              { q: 'Q：員工可以用公司福利點數消費嗎？', a: '可以。銓幻元支援工廠員工識別卡（IC 卡）消費，消費金額可對應薪資福利補貼或月底扣薪，不需要員工個人手機或現金，方便快速。' },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-xl p-4" style={{ background: '#1e293b' }}>
                <p className="font-semibold text-slate-200 mb-2 text-sm">{q}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl p-5 my-6 text-center" style={{ background: '#0f2744', border: '1px solid rgba(255,107,53,0.3)' }}>
            <p className="text-lg font-bold text-slate-200 mb-2">工廠夜班場域規劃，AI 顧問 3 分鐘給方案</p>
            <p className="text-slate-400 text-sm mb-5">告訴我們夜班人數、廠區棟數、目前餐食安排，AI 立刻給出最適合的配置建議</p>
            <a href="/solutions/frozen-microwave?utm_source=blog&utm_medium=article-bottom&utm_campaign=factory-night"
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
