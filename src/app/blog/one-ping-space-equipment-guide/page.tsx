import type { Metadata } from 'next'
import { KeywordTrigger, ArticleCTA } from '@/components/KeywordTrigger'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.mcstation.ai/blog/one-ping-space-equipment-guide' },
  title: '1坪店面能放什麼設備？小空間複合式部署完整指南',
  description: '只有1坪、1.5坪、2坪的閒置空間，到底能放哪些自助設備組合？從單一智取櫃到咖啡機加販賣機的複合配置，用坪數對照表告訴你自己的空間夠不夠格當AI勞動力基地。',
}

export default function Article() {
  return (
    <main className="min-h-screen bg-[#0d1a2d] text-slate-100">
      <article className="max-w-2xl mx-auto px-6 py-16">
        <div className="flex flex-wrap gap-2 mb-6">
          {['1坪店面', '設備配置指南', 'AI 勞動力'].map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,107,53,0.12)', color: '#FF6B35' }}>{tag}</span>
          ))}
        </div>
        <h1 className="text-3xl font-bold mb-3 text-slate-100">
          1坪店面能放什麼設備？小空間複合式部署完整指南
        </h1>
        <p className="text-slate-500 text-sm mb-10">2026-07-19 · 9 分鐘閱讀</p>

        <div className="space-y-7 text-slate-300 leading-relaxed">

          <p>
            騎樓一角、店面轉角的畸零空間、辦公室茶水間旁的閒置角落——這些不到 2 坪的小空間，
            過去大概只能拿來堆雜物或乾脆空著。但只要坪數抓得對、設備選得對，
            這些小空間也能變成不用額外雇人顧店、24 小時自己運作的
            <KeywordTrigger keyword="AI 勞動力" />基地。
          </p>
          <p>
            這篇文章不是行銷話術，而是一份實用的空間對照表：你手上的空間到底有幾坪、
            適合放哪些設備組合、需要哪些基礎條件（電力、走道淨寬），看完就能大致判斷
            自己的空間夠不夠格導入設備、該從哪個配置開始。
          </p>

          <ArticleCTA keyword="AI 勞動力" />

          <h2 className="text-xl font-bold text-slate-100 mt-10">小空間業主最常卡關的 4 個問題</h2>
          <div className="space-y-4">
            {[
              {
                num: '01',
                title: '不知道自己的空間算不算「夠格」',
                content: '很多業主看著閒置的畸零角落，心裡想「這麼小應該什麼都放不下」，於是乾脆放棄，繼續閒置。但實際上多數自助設備的機身佔地比想像中小，1 坪空間就足夠放置單一機型。',
              },
              {
                num: '02',
                title: '搞不清楚坪數和設備台數的對應關係',
                content: '網路上找到的設備規格多半只寫機身尺寸，沒有換算成實際需要的「可用坪數」（含走道淨寬、開門迴轉半徑）。業主看規格表也很難直接想像現場能不能放得下。',
              },
              {
                num: '03',
                title: '想要複合配置，但不知道怎麼組合最划算',
                content: '單一設備能做的事有限，業主希望空間坪數夠大時能組合出更完整的服務（例如飲品加輕食），但不清楚哪些設備組合適合放在一起、電力負荷夠不夠。',
              },
              {
                num: '04',
                title: '擔心坪數估錯，白花安裝費又要拆掉重排',
                content: '設備一旦安裝定位，事後想更換配置或擴充台數，往往需要重新配電、重新規劃動線，多花一筆施工費用。業主希望一開始就選對配置，避免後續反覆調整。',
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

          <h2 className="text-xl font-bold text-slate-100 mt-10">坪數對照表：從 1 坪到 3 坪能放什麼</h2>
          <p>以下配置以一般機型的機身尺寸與建議走道淨寬估算，實際仍需以現場丈量為準：</p>
          <div className="rounded-xl overflow-hidden border border-slate-700">
            <table className="w-full text-sm">
              <thead style={{ background: '#1e293b' }}>
                <tr>
                  <th className="text-left px-4 py-3 text-slate-300">可用坪數</th>
                  <th className="text-left px-4 py-3 text-slate-300">建議設備組合</th>
                  <th className="text-left px-4 py-3 text-slate-300">基礎條件</th>
                  <th className="text-left px-4 py-3 text-[#FF6B35]">適合場域</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['1 坪以下', '單一 GraBox 智取櫃（小型款）', '一般家用電即可，不需給水', '住宅大樓門口、辦公室茶水間旁'],
                  ['約 1 坪', '單一智慧販賣機 或 單一智取櫃', '110V／220V 插座、走道淨寬 90cm', '診所候診區、小型店面騎樓'],
                  ['約 1.5 坪', '智慧取物櫃＋小型販賣機', '雙迴路電力、需預留補貨動線', '複合店面、社區型店家'],
                  ['約 2 坪', '智取櫃＋冷凍微波機', '需給排水（冷凍微波機款式視需求）', '員工休息室、社區公設空間'],
                  ['3 坪以上', '智取櫃＋冷凍微波機＋咖啡機／飲料機', '完整水電管線、需獨立補貨動線', '複合式無人店、園區公共空間'],
                ].map(([size, combo, req, venue], i) => (
                  <tr key={i} style={{ borderTop: '1px solid #1e293b', background: i % 2 === 0 ? '#0f1f36' : '#0d1a2d' }}>
                    <td className="px-4 py-3 text-slate-300 font-medium">{size}</td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{combo}</td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{req}</td>
                    <td className="px-4 py-3 text-[#FF6B35] font-semibold text-xs">{venue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-10">
            為什麼<KeywordTrigger keyword="智慧取物櫃" />通常是最好的起步設備？
          </h2>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong className="text-slate-100">佔地最小</strong>：小型款機身可壓縮到 1 坪以內，是所有自助設備中對空間要求最寬鬆的一種</li>
            <li><strong className="text-slate-100">基礎條件最少</strong>：多數款式只需要一般插座供電，不需要給排水管線，施工門檻低</li>
            <li><strong className="text-slate-100">可擴充性高</strong>：先從單一取物櫃開始，日後空間或需求增加，再加裝<KeywordTrigger keyword="智慧販賣機" />或
              冷凍微波機，逐步升級成複合配置，不用一次到位</li>
            <li><strong className="text-slate-100">應用場景廣</strong>：包裹取件、預訂餐點取件、耗材備品取件，同一台設備可以支援多種用途</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-100 mt-8">假設情境試算（僅供參考，非實際數據）</h2>
          <div className="rounded-xl p-5 border" style={{ background: '#0f1f36', borderColor: 'rgba(255,107,53,0.2)' }}>
            <h3 className="font-bold text-[#FF6B35] mb-3">試算情境：1 坪店面轉角，放置單一智取櫃</h3>
            <div className="text-sm space-y-2">
              <p><span className="text-slate-400">設備：</span><span className="text-slate-200">GraBox 智取櫃小型款 1 台</span></p>
              <p><span className="text-slate-400">所需基礎條件：</span><span className="text-slate-200">一般 110V 插座，免給排水，免額外裝修</span></p>
              <p><span className="text-slate-400">假設每日 15 件取件次數：</span><span className="text-slate-200">業主無需在場，系統自動通知取件人</span></p>
              <p><span className="text-slate-400">業主投入人力：</span><span className="text-slate-200">每週補位/巡檢約 1–2 次，無需專人駐點</span></p>
              <p className="text-slate-500 text-xs mt-2">* 以上為假設情境試算，用來說明估算邏輯，非真實客戶數據。實際使用量會依場域人流、用途而不同，建議以自身空間實際條件代入評估。</p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-8">常見問題（FAQ）</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Q：我的空間形狀不方正、是畸零角落，還能放設備嗎？',
                a: '只要淨寬與淨深符合機身尺寸加上基本操作/補貨動線（通常建議至少 90cm 走道淨寬），畸零角落也可以放置。建議直接提供空間照片與丈量尺寸，由 AI 顧問或人員協助判斷可行性。',
              },
              {
                q: 'Q：1 坪空間放得下，但電力只有一般插座夠用嗎？',
                a: '單一智取櫃或小型販賣機多數款式一般插座（110V）即可運作。若要加裝冷凍微波機或多台設備並聯，則需要評估迴路負荷，可能需要另外配電，建議在現勘階段一併確認。',
              },
              {
                q: 'Q：想先放 1 坪試試看，之後生意好要擴充可以嗎？',
                a: '可以。這也是多數業主的做法——先從最小的智取櫃配置起步，累積實際使用數據後，再依據取件/購買頻率決定是否擴充成複合配置，不需要一開始就投入大坪數。',
              },
              {
                q: 'Q：畸零空間的租金/坪效值得投入設備嗎？',
                a: '畸零空間原本多半是完全閒置、沒有產值的角落，導入自助設備不需要額外雇人顧店，即使坪效不如正式店面高，也是把「零產值空間」轉為「有基礎產值空間」，實際是否划算建議依租金與預估使用量個別試算。',
              },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-xl p-4" style={{ background: '#1e293b' }}>
                <p className="font-semibold text-slate-200 mb-2 text-sm">{q}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl p-5 my-6 text-center" style={{ background: '#0f2744', border: '1px solid rgba(255,107,53,0.3)' }}>
            <p className="text-lg font-bold text-slate-200 mb-2">不確定自己的空間夠不夠格？AI 顧問 3 分鐘幫你判斷</p>
            <p className="text-slate-400 text-sm mb-5">告訴我們空間坪數、形狀、現有電力條件，AI 立刻給出最適合的設備配置建議</p>
            <a href="/products/grabox?ai=1"
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
