import type { Metadata } from 'next'
import { KeywordTrigger, ArticleCTA } from '@/components/KeywordTrigger'

export const metadata: Metadata = {
  title: '連鎖早午餐導入智慧取物櫃：週末人潮如何不塞爆？完整攻略 | 銓幻元',
  description: '早午餐週末排隊 40 分鐘是常態，但真正的瓶頸不在廚房，在取餐流程。智慧取物櫃如何讓連鎖早午餐的翻桌率提升 35%？含導入成本與 3 個月效果數據。',
}

export default function Article() {
  return (
    <main className="min-h-screen bg-[#0d1a2d] text-slate-100">
      <article className="max-w-2xl mx-auto px-6 py-16">
        <div className="flex flex-wrap gap-2 mb-6">
          {['智慧取物櫃', '早午餐', '連鎖餐飲'].map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,107,53,0.12)', color: '#FF6B35' }}>{tag}</span>
          ))}
        </div>
        <h1 className="text-3xl font-bold mb-3 text-slate-100">
          連鎖早午餐導入<KeywordTrigger keyword="智慧取物櫃" />：週末人潮如何不塞爆？完整攻略
        </h1>
        <p className="text-slate-500 text-sm mb-10">2026-07-03 · 6 分鐘閱讀</p>

        <div className="space-y-7 text-slate-300 leading-relaxed">
          <p>
            台灣早午餐市場在 2026 年已超過 NT$200 億，是餐飲業成長最快的品類之一。
            但高需求也帶來高壓力：週末早午餐的等待時間平均 35–50 分鐘，其中廚房出餐約佔 20 分鐘，
            「等員工叫號、確認、交餐」這個環節往往佔了剩餘的 15–30 分鐘。
          </p>
          <p>
            問題不在廚房，在取餐流程。<KeywordTrigger keyword="智慧取物櫃" />把這個環節自動化，
            讓顧客手機接到通知自行取餐，員工專注在出餐和內用服務。
          </p>

          <ArticleCTA keyword="智慧取物櫃" />

          <h2 className="text-xl font-bold text-slate-100 mt-10">早午餐連鎖的 3 個特殊挑戰</h2>
          <div className="space-y-4">
            {[
              { num: '01', title: '週末外帶需求集中爆發', content: '外帶需求不是平均分布的。週末 10:00–13:00 佔一週外帶量的 45%，而這個時段同時也是內用最滿的時段，員工根本分不了身。' },
              { num: '02', title: '多品項訂單容易出錯', content: '早午餐品項複雜（主食×配菜×飲料×加蛋），4 人份套餐可能有 12 個品項。員工在尖峰時段對叫號的注意力本來就有限，出餐錯誤率在週末高峰可達 8–12%。' },
              { num: '03', title: '外帶和內用顧客同時等', content: '外帶顧客在店外等、內用顧客在店內等上菜，員工同時被兩邊叫，哪邊都照顧不好。外帶顧客等太久會走人，內用顧客服務品質也下降。' },
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

          <h2 className="text-xl font-bold text-slate-100 mt-10">早午餐場域的智取櫃導入邏輯</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong className="text-slate-100">點餐時自動分配格號</strong>：線上訂單確認時系統分格，現場點餐員POS 按確認後自動分格</li>
            <li><strong className="text-slate-100">廚房出餐順序優化</strong>：系統依格號順序出餐，廚師只需掃格號放入，不需判斷叫哪個號</li>
            <li><strong className="text-slate-100">顧客接到通知再來取</strong>：顧客可以在附近逛、在車上等，手機收到 LINE 通知再進來，不需要在店內排隊</li>
            <li><strong className="text-slate-100">外帶等待從被動到主動</strong>：顧客主動選擇何時取餐，減少「等到不耐煩就走人」的流失</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-100 mt-10">真實案例：台中連鎖早午餐（5 家門市）</h2>
          <div className="rounded-xl p-5 border" style={{ background: '#0f1f36', borderColor: 'rgba(255,107,53,0.2)' }}>
            <h3 className="font-bold text-[#FF6B35] mb-3">2025 Q3 旗艦店試裝，2025 Q4 全門市展開</h3>
            <div className="text-sm space-y-2">
              <p><span className="text-slate-400">導入前週末外帶等待：</span><span className="text-slate-200">38 分鐘（平均）</span></p>
              <p><span className="text-slate-400">導入後週末外帶等待：</span><span className="text-[#FF6B35] font-bold">14 分鐘（顧客可先離開等通知）</span></p>
              <p><span className="text-slate-400">外帶出錯率：</span><span className="text-[#FF6B35] font-bold">8.4% → 1.1%（格口獨立防混淆）</span></p>
              <p><span className="text-slate-400">週末翻桌率：</span><span className="text-[#FF6B35] font-bold">提升 35%（顧客不在店內等，桌子更快轉）</span></p>
              <p><span className="text-slate-400">設備（20 格）月租：</span><span className="text-slate-200">NT$4,200/台</span></p>
              <p><span className="text-slate-400">月省人力成本：</span><span className="text-slate-200">NT$28,000（週末加派人力減少 1 人）</span></p>
              <p><span className="text-slate-400">回收期：</span><span className="text-[#FF6B35] font-bold">導入第 1 個月即正回報</span></p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-8">連鎖品牌的特殊優勢：跨店標準化</h2>
          <p>
            連鎖品牌導入智取櫃的最大優勢是「跨店標準化」。銓幻元智取系統支援：
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>同一個管理後台監控所有門市的取物情況</li>
            <li>每間店的設備規格統一，員工培訓成本低</li>
            <li>跨店 App 整合：同一個品牌 App 訂單，任何門市取餐都走同一套流程</li>
            <li>數據彙整：哪間店的外帶週轉率最高？AI 分析給出展店建議</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-100 mt-8">常見問題（FAQ）</h2>
          <div className="space-y-4">
            {[
              { q: 'Q：早午餐早上 8 點就開，需要特殊設定嗎？', a: '不需要。智取系統 24 小時運行，早上 8 點照常接單分格。保溫格從第一個訂單放入就開始計時，系統自動管理每格的等待時間。' },
              { q: 'Q：外帶袋子不規則，可以放進格口嗎？', a: 'L 格尺寸為 30cm × 35cm × 25cm，可容納大多數早午餐套餐（含飲料杯）。訂購前銓幻元會依照你的菜單和包裝尺寸確認格型配比，確保放得進去。' },
              { q: 'Q：顧客超過 60 分鐘沒取怎麼辦？', a: '系統在 30 分鐘和 55 分鐘各推播一次提醒。超過 60 分鐘可設定自動開鎖讓員工重新處理，或整份退款。實際上超過 60 分鐘未取的比例 < 2%。' },
              { q: 'Q：可以和我們現有的 POS 系統整合嗎？', a: '銓幻元支援主流 POS：iCHEF、Winfood、橘子、微碧。如果你使用的是自建系統，銓幻元提供 API 文件，技術介接約 3–5 個工作天。' },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-xl p-4" style={{ background: '#1e293b' }}>
                <p className="font-semibold text-slate-200 mb-2 text-sm">{q}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl p-5 my-6 text-center" style={{ background: '#0f2744', border: '1px solid rgba(255,107,53,0.3)' }}>
            <p className="text-lg font-bold text-slate-200 mb-2">你的早午餐店適合幾格？AI 顧問幫你算</p>
            <p className="text-slate-400 text-sm mb-5">告訴我們門市數、週末外帶訂單量、現有 POS，AI 立刻給出配置方案</p>
            <a href="/solutions/smart-locker?utm_source=blog&utm_medium=article-bottom&utm_campaign=brunch-chain"
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
