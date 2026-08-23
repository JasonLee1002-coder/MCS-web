import type { Metadata } from 'next'
import Link from 'next/link'
import { MODELS, SERIES, DISCLAIMER, modelsBySeries } from '@/data/frozen-vending-models'

const BASE = 'https://www.mcstation.ai'

export const metadata: Metadata = {
  title: { absolute: '冷凍與冷凍微波智能販賣機全系列：8 款型號規格與選型 | 銓幻元科技 MCS' },
  description:
    '銓幻元冷凍與冷凍微波智能販賣機全系列 8 款型號：冷凍 5 款、冷凍微波 3 款。溫控、貨道、容量、機身尺寸與螢幕規格一次比較。數值為產品文件標示值，非實測值。',
  keywords: ['冷凍販賣機', '冷凍微波販賣機', '智能販賣機型號', '冷凍販賣機規格', '冷凍販賣機比較', '冷凍販賣機尺寸'],
  alternates: { canonical: `${BASE}/products/frozen-vending` },
  openGraph: {
    title: '冷凍與冷凍微波智能販賣機全系列｜8 款型號規格',
    description: '冷凍 5 款＋冷凍微波 3 款，涵蓋窄機身佈點、大螢幕廣告、側面取貨、保溫取貨箱與雙微波。',
    url: `${BASE}/products/frozen-vending`,
  },
}

export default function Page() {
  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '冷凍與冷凍微波智能販賣機 全系列',
    url: `${BASE}/products/frozen-vending`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: MODELS.length,
      itemListElement: MODELS.map((m, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: m.code,
        url: `${BASE}/products/frozen-vending/${m.slug}`,
      })),
    },
  }

  return (
    <main className="min-h-screen" style={{ background: '#0B1524' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />

      <div className="max-w-4xl mx-auto px-5 py-14">
        <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#FF6B35' }}>
          Product Portfolio
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 leading-snug mb-4">
          冷凍與冷凍微波智能販賣機全系列：8 款型號規格與選型
        </h1>
        <p className="text-slate-300 leading-relaxed mb-2">
          共兩個系列、八款機型：冷凍 5 款、冷凍微波 3 款。
        </p>
        <p className="text-slate-400 text-sm leading-relaxed mb-10">
          本頁所有數值取自產品文件的規格標示值，不是本公司在台灣環境的實測結果。產品文件未載的欄位一律標示「產品文件未載」，不作推估。
        </p>

        {/* 先選系列——這是選型的第一個分岔，放在比較表前面 */}
        <h2 className="text-lg font-bold text-slate-100 mb-4">第一步：先決定要不要現場加熱</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {(['frozen-microwave', 'freezer'] as const).map(key => {
            const s = SERIES[key]
            const href = `/products/frozen-vending/${key === 'frozen-microwave' ? 'fm-series' : 'fz-series'}`
            return (
              <Link
                key={key}
                href={href}
                className="block rounded-xl p-5 transition-colors"
                style={{ background: '#0f1f36', border: '1px solid #1e293b' }}
              >
                <p className="font-bold text-slate-100 mb-1">{s.name}（{modelsBySeries(key).length} 款）</p>
                <p className="text-slate-400 text-sm leading-relaxed mb-2">{s.oneLiner}</p>
                <p className="text-sm" style={{ color: '#FF6B35' }}>什麼時候選它：{s.chooseWhen} →</p>
              </Link>
            )
          })}
        </div>

        <h2 className="text-lg font-bold text-slate-100 mb-4">八款一次比較</h2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse min-w-[640px]">
            <thead>
              <tr style={{ background: '#1e293b' }}>
                <th className="text-left px-3 py-3 text-slate-300">型號</th>
                <th className="text-left px-3 py-3 text-slate-300">系列</th>
                <th className="text-left px-3 py-3 text-slate-300">關鍵差異</th>
                <th className="text-left px-3 py-3 text-slate-300">機身尺寸 W×D×H</th>
              </tr>
            </thead>
            <tbody>
              {MODELS.map((m, i) => {
                const size = m.specs.find(r => r.label === '機身尺寸')
                return (
                  <tr key={m.slug} style={{ borderTop: '1px solid #1e293b', background: i % 2 === 0 ? '#0f1f36' : '#0d1a2d' }}>
                    <td className="px-3 py-3 align-top whitespace-nowrap">
                      <Link href={`/products/frozen-vending/${m.slug}`} className="font-semibold hover:underline" style={{ color: '#FF6B35' }}>
                        {m.code}
                      </Link>
                    </td>
                    <td className="px-3 py-3 align-top text-slate-400 whitespace-nowrap">{SERIES[m.series].code}</td>
                    <td className="px-3 py-3 align-top text-slate-300">{m.differentiator}</td>
                    <td className="px-3 py-3 align-top text-slate-400">
                      {size?.value ?? <span className="text-slate-500">產品文件未載</span>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mb-12">
          資料來源：〈冷凍與冷凍微波智能販賣機 全系列規格簡報〉V1.0（2026-08-19）。各型號完整規格與出處頁碼見型號頁。
        </p>

        <h2 className="text-lg font-bold text-slate-100 mb-4">八款各自的定位</h2>
        <div className="space-y-3 mb-12">
          {MODELS.map(m => (
            <div key={m.slug} className="rounded-lg p-4" style={{ background: '#0f1f36', border: '1px solid #1e293b' }}>
              <Link href={`/products/frozen-vending/${m.slug}`} className="font-semibold hover:underline" style={{ color: '#FF6B35' }}>
                {m.code}
              </Link>
              <p className="text-slate-300 text-sm mt-1 leading-relaxed">{m.positioning}。</p>
              <p className="text-slate-500 text-xs mt-1">先評估方向：{m.evaluateFor}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl p-5" style={{ background: '#0f2744', border: '1px solid rgba(255,107,53,0.3)' }}>
          <p className="text-slate-200 font-bold mb-2">不確定該從哪一款開始評估？</p>
          <p className="text-slate-400 text-sm mb-4 leading-relaxed">
            選型的關鍵不在規格表，而在三件現場條件：機台進不進得去、電源迴路夠不夠、你的商品包裝能不能適配。
          </p>
          <Link href="/#contact" className="inline-block px-6 py-2.5 rounded-lg font-bold text-white text-sm" style={{ background: '#FF6B35' }}>
            聯絡我們安排場勘 →
          </Link>
        </div>

        <p className="text-slate-500 text-xs mt-10 leading-relaxed">{DISCLAIMER}</p>
      </div>
    </main>
  )
}
