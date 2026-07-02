import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '銓幻元產品線 | 冷凍販賣機 · 智慧取物櫃 · 蒸氣加熱設備',
  description: '銓幻元科技全產品線：冷凍微波機、智慧取物櫃（GraBox）、蒸氣拉麵機、蒸氣便當機、AI 無人倉儲設備。依場域選型，附規格與 AI 顧問諮詢。',
}

const PRODUCTS = [
  {
    keyword: 'frozen-microwave',
    name: '冷凍微波機',
    subtitle: '24 小時自助冷凍熱食',
    icon: '❄️',
    specs: ['-18°C 冷凍儲存', '內建微波加熱 90 秒', '最多 60 格容量', 'IoT 庫存監控'],
    venues: ['工廠夜班', '移工宿舍', '軍方場域', '長照機構'],
    highlight: '設備投資 3 個月回收',
  },
  {
    keyword: 'smart-locker',
    name: '智慧取物櫃 GraBox',
    subtitle: '無人取餐 · 60 分鐘保溫',
    icon: '📦',
    specs: ['65°C 恆溫保持', 'S/M/L 三種格型', 'POS / 外送平台 API 串接', '手機 QR Code 取餐'],
    venues: ['餐廳外帶', '辦公大樓', '幽靈廚房', '校園'],
    highlight: '外帶等待從 8.4 分鐘降至 1.1 分鐘',
  },
  {
    keyword: 'steam-ramen',
    name: '蒸氣拉麵機',
    subtitle: '60 秒熱騰騰拉麵',
    icon: '🍜',
    specs: ['蒸氣加熱 60 秒', '24 小時自助', '多口味冷凍麵體', '無須廚師'],
    venues: ['醫院', '宿舍', '夜班場域', '軍方'],
    highlight: '護理師深夜最受歡迎的熱食',
  },
  {
    keyword: 'steam-bento',
    name: '蒸氣便當機',
    subtitle: '企業員工餐食自動化',
    icon: '🍱',
    specs: ['蒸氣均勻加熱', '大容量 80 格', '企業福利點數整合', '多語言介面'],
    venues: ['工廠', '企業辦公室', '校園', '醫院'],
    highlight: '人力需求降至零，24 小時自助',
  },
  {
    keyword: 'ai-labor',
    name: 'AI 勞動力方案',
    subtitle: '一台設備頂三人力',
    icon: '🤖',
    specs: ['AI 排班管理', '場域流量分析', '設備組合規劃', '人力替代試算'],
    venues: ['餐飲連鎖', '企業食堂', '幽靈廚房', '大型活動'],
    highlight: '台灣缺工 15 萬，AI 設備立即到位',
  },
  {
    keyword: 'ghost-kitchen',
    name: '幽靈廚房設備組合',
    subtitle: '中央廚房 × 多點配送',
    icon: '👻',
    specs: ['冷凍運輸鏈整合', '多場域同步取餐', '外送平台直通', 'AI 銷量預測'],
    venues: ['幽靈廚房', '中央廚房', '企業餐飲', '多場域連鎖'],
    highlight: '一個廚房服務 5 個場域',
  },
]

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#0d1a2d] text-slate-100">
      <section className="max-w-5xl mx-auto px-6 pt-28 pb-16">
        <h1 className="text-4xl font-black mb-4" style={{ color: '#FF6B35' }}>產品線</h1>
        <p className="text-xl text-slate-300 max-w-2xl">
          銓幻元提供 6 種智慧餐飲自動化設備，覆蓋從冷凍儲存到加熱取餐的完整流程。
          每種設備針對不同場域最佳化，點擊了解詳情或直接諮詢 AI 顧問。
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          {PRODUCTS.map(({ keyword, name, subtitle, icon, specs, venues, highlight }) => (
            <div key={keyword} className="rounded-2xl overflow-hidden" style={{ background: '#0f1f36', border: '1px solid rgba(255,107,53,0.12)' }}>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{icon}</span>
                  <div>
                    <h2 className="text-lg font-bold text-slate-100">{name}</h2>
                    <p className="text-sm text-slate-400">{subtitle}</p>
                  </div>
                </div>

                <div className="rounded-lg p-3 mb-4 text-xs font-semibold text-center" style={{ background: 'rgba(255,107,53,0.1)', color: '#FF6B35' }}>
                  {highlight}
                </div>

                <div className="mb-4">
                  <p className="text-xs text-slate-500 mb-2 font-medium">主要規格</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {specs.map(spec => (
                      <div key={spec} className="flex items-center gap-1.5 text-xs text-slate-300">
                        <span style={{ color: '#FF6B35' }}>✓</span>{spec}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-5">
                  <p className="text-xs text-slate-500 mb-2 font-medium">適合場域</p>
                  <div className="flex flex-wrap gap-1.5">
                    {venues.map(venue => (
                      <span key={venue} className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,107,53,0.08)', color: '#FF6B35' }}>
                        {venue}
                      </span>
                    ))}
                  </div>
                </div>

                <Link href={`/solutions/${keyword}`}
                  className="block w-full text-center py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: '#FF6B35' }}>
                  了解更多 → 諮詢 AI 顧問
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12 text-center border-t border-slate-700/40">
        <p className="text-slate-400 mb-2">不確定哪款適合你的場域？</p>
        <h2 className="text-2xl font-bold text-slate-100 mb-6">讓 AI 顧問幫你分析</h2>
        <Link href="/ai-advisor"
          className="inline-block px-10 py-4 rounded-full font-bold text-white"
          style={{ background: '#FF6B35' }}>
          開始 AI 諮詢（免費）→
        </Link>
      </section>
    </main>
  )
}
