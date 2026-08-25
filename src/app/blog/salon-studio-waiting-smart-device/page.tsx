import type { Metadata } from 'next'
import { KeywordTrigger, ArticleCTA } from '@/components/KeywordTrigger'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.mcstation.ai/blog/salon-studio-waiting-smart-device' },
  title: '美容美髮工作室候場空間怎麼配置？智慧設備選型指南 | 銓幻元',
  description: '美髮、美甲、按摩、寵物美容等個人工作室的候場空間，怎麼在不佔人力、不破壞店面調性的前提下提升客人等候體驗？智慧販賣機、GraBox智取櫃選型與配色建議。',
}

export default function Article() {
  return (
    <main className="min-h-screen bg-[#0d1a2d] text-slate-100">
      <article className="max-w-2xl mx-auto px-6 py-16">
        <div className="flex flex-wrap gap-2 mb-6">
          {['美容美髮工作室', '候場空間', '智慧販賣機'].map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,107,53,0.12)', color: '#FF6B35' }}>{tag}</span>
          ))}
        </div>
        <h1 className="text-3xl font-bold mb-3 text-slate-100">
          美容美髮工作室候場空間怎麼配置？<KeywordTrigger keyword="智慧販賣機" />選型指南
        </h1>
        <p className="text-slate-500 text-sm mb-10">2026-07-19 · 8 分鐘閱讀</p>

        <div className="space-y-7 text-slate-300 leading-relaxed">

          <p>
            美髮沙龍的染燙等待、美甲工作室的乾甲時間、按摩館的候場空檔、寵物美容的等待接送——
            這些個人工作室的候場時間短則 15 分鐘，長則 1 小時以上。
            客人坐在候場區滑手機打發時間，店家人力卻全部投入在服務中的客人身上，
            沒有多餘人手顧茶水、補飲料、收銀結帳。
          </p>
          <p>
            這正是<KeywordTrigger keyword="智慧販賣機" />與<KeywordTrigger keyword="GraBox" />
            適合的場景：不用額外雇工讀生顧候場區，也能讓客人候場時有事可做、有東西可喝，
            同時設備外觀還能配合店面調性，不會讓精心設計的空間感覺突兀。
          </p>

          <ArticleCTA keyword="智慧販賣機" />

          <h2 className="text-xl font-bold text-slate-100 mt-10">個人工作室候場空間的 4 個痛點</h2>
          <div className="space-y-4">
            {[
              {
                num: '01',
                title: '客人候場滑手機沒事做',
                content: '染燙、乾甲、按摩前的空檔時間，客人多半只能滑手機或發呆。想喝杯飲料提升等候體驗，但店家沒有販售管道，客人也不好意思開口麻煩正在忙的美髮師/美甲師去倒水。',
              },
              {
                num: '02',
                title: '店家人力全部在服務客人，沒空顧茶水',
                content: '個人工作室往往只有 1–3 位服務人員，每個人手上都在做客人的頭髮、指甲或身體，沒有多餘人力去顧候場區的茶水、補貨、收銀，這件事一直被犧牲掉。',
              },
              {
                num: '03',
                title: '設備要融入店面調性，不能太突兀',
                content: '美容美髮工作室通常花了不少心思在裝潢與品牌調性上，若候場區擺一台外觀突兀的傳統販賣機，反而會破壞整體質感，這也是店家遲遲不敢導入設備的主因之一。',
              },
              {
                num: '04',
                title: '工作室坪數有限，很難再擠出設備空間',
                content: '多數個人工作室坪數本來就吃緊，候場區常常只有一張沙發加茶几的空間，很難想像還能塞進一台設備，這使得店家往往連評估都懶得評估，直接放棄這個念頭。',
              },
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

          <h2 className="text-xl font-bold text-slate-100 mt-10">設備怎麼融入店面調性？</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong className="text-slate-100">機身外觀客製貼膜</strong>：可選擇霧面黑、木紋、莫蘭迪色系等貼膜，配合工作室的裝潢色調，不做成一眼看出是「投幣式販賣機」的樣子</li>
            <li><strong className="text-slate-100">尺寸壓縮到最小</strong>：小型款機身可壓縮到約 1 坪內，放在候場沙發旁或轉角，不佔用主要動線</li>
            <li><strong className="text-slate-100">選品符合客群調性</strong>：美髮沙龍可放氣泡水、精品咖啡膠囊；美甲工作室可放小份量茶飲；寵物美容可放寵物零食、濕紙巾等周邊小物</li>
            <li><strong className="text-slate-100">GraBox 取件延伸應用</strong>：客人預購的護髮油、指甲油、寵物用品等商品，可透過<KeywordTrigger keyword="GraBox" />
              預先放入，客人到店直接掃碼取件，不需要店家在服務空檔中斷手邊工作去找貨</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-100 mt-10">工作室類型與設備配置建議</h2>
          <div className="rounded-xl overflow-hidden border border-slate-700">
            <table className="w-full text-sm">
              <thead style={{ background: '#1e293b' }}>
                <tr>
                  <th className="text-left px-4 py-3 text-slate-300">工作室類型</th>
                  <th className="text-left px-4 py-3 text-slate-300">候場特性</th>
                  <th className="text-left px-4 py-3 text-slate-300">建議設備</th>
                  <th className="text-left px-4 py-3 text-[#FF6B35]">選品建議</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['美髮沙龍', '候場 30–90 分鐘（染燙）', '智慧販賣機（小型款）', '氣泡水、咖啡膠囊、小點心'],
                  ['美甲/美睫工作室', '候場 15–40 分鐘（乾甲）', '智慧販賣機（迷你款）', '手搖飲、茶飲、指甲保養小物'],
                  ['按摩/放鬆館', '候場 10–20 分鐘', '智慧販賣機（迷你款）', '溫感茶飲、舒緩系保健品'],
                  ['寵物美容工作室', '飼主候場等接送', '智慧販賣機＋GraBox', '寵物零食、濕紙巾、預購用品取件'],
                ].map(([type, feature, device, note], i) => (
                  <tr key={i} style={{ borderTop: '1px solid #1e293b', background: i % 2 === 0 ? '#0f1f36' : '#0d1a2d' }}>
                    <td className="px-4 py-3 text-slate-300 font-medium">{type}</td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{feature}</td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{device}</td>
                    <td className="px-4 py-3 text-[#FF6B35] font-semibold text-xs">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-8">假設情境試算（僅供參考，非實際數據）</h2>
          <div className="rounded-xl p-5 border" style={{ background: '#0f1f36', borderColor: 'rgba(255,107,53,0.2)' }}>
            <h3 className="font-bold text-[#FF6B35] mb-3">試算情境：一間日均接待 25 位客人的美髮沙龍</h3>
            <div className="text-sm space-y-2">
              <p><span className="text-slate-400">設備：</span><span className="text-slate-200">智慧販賣機迷你款 1 台（約 0.5 坪）</span></p>
              <p className="text-slate-300">產值取決於候場人次、停留時間與品項結構，本站不提供客單價與銷售額的假設數字。</p>
              
              <p><span className="text-slate-400">店家需投入人力：</span><span className="text-slate-200">補貨約每週 1 次，不影響服務中人員</span></p>
              <p className="text-slate-500 text-xs mt-2">* 以上為假設情境試算，用來說明估算邏輯，非真實客戶數據。實際銷售會依候場人數、選品、客群而不同，建議以自身工作室實際條件代入評估。</p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-8">常見問題（FAQ）</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Q：工作室只有小小的候場沙發區，真的放得下設備嗎？',
                a: '迷你款機身可壓縮到約 0.5 坪，放在沙發旁或轉角綽綽有餘。若真的完全沒有多餘空間，也可以先從 GraBox 智取櫃的預購取件功能開始，不做現場零售陳列。',
              },
              {
                q: 'Q：機身可以客製化外觀嗎？會不會跟店裡的裝潢風格衝突？',
                a: '可以透過貼膜訂製機身外觀（顏色、質感、LOGO），多數工作室會選擇跟裝潢色調一致的霧面或木紋款式，融入整體空間而非另外突兀的一塊。',
              },
              {
                q: 'Q：客人結帳/服務都是預約制，設備需要單獨收款系統嗎？',
                a: '設備本身支援行動支付與現場單獨結帳，不需要跟工作室既有的預約/服務結帳系統整合，客人自行掃碼付款即可，不會增加店家的收銀工作。',
              },
              {
                q: 'Q：這種規模的工作室，導入設備真的划算嗎？',
                a: '主要效益不是直接的銷售額，而是提升候場體驗、減少店家人力被打斷去顧茶水的頻率。是否划算建議依自身候場人流量與客單價，用文中的試算邏輯代入估算後再決定。',
              },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-xl p-4" style={{ background: '#1e293b' }}>
                <p className="font-semibold text-slate-200 mb-2 text-sm">{q}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl p-5 my-6 text-center" style={{ background: '#0f2744', border: '1px solid rgba(255,107,53,0.3)' }}>
            <p className="text-lg font-bold text-slate-200 mb-2">工作室候場區想升級？AI 顧問 3 分鐘給你方案</p>
            <p className="text-slate-400 text-sm mb-5">告訴我們工作室類型、候場坪數、日均接待人數，AI 立刻給出最適合的設備與外觀配置</p>
            <a href="/products/frozen-microwave?ai=1&utm_source=blog&utm_medium=article-bottom&utm_campaign=salon-studio-waiting"
              className="inline-block px-8 py-3 rounded-xl font-bold text-white" style={{ background: '#FF6B35' }}>
              立即諮詢 AI 顧問 →
            </a>
          </div>

        </div>

          <p className="text-slate-400 text-sm my-6">
            對應機型規格：<a href="/products/frozen-vending/mcs-fz10" style={{ color: '#FF6B35' }} className="hover:underline">MCS-FZ10 850mm 窄機身規格</a>。
          </p>
        <div className="mt-12 pt-8 border-t border-slate-700/40">
          <a href="/blog" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">← 返回知識庫</a>
        </div>
      </article>
    </main>
  )
}
