import type { Metadata } from 'next'
import Link from 'next/link'
import type { SeriesKey } from '@/data/frozen-vending-models'
import { SERIES, DISCLAIMER, modelsBySeries, FM_COMMON, FREEZER_COMMON } from '@/data/frozen-vending-models'

const BASE = 'https://www.mcstation.ai'
const KEY: SeriesKey = 'freezer'
const SLUG = 'fz-series'

export const metadata: Metadata = {
  title: { absolute: '冷凍智能販賣機 FZ 系列：5 款型號規格比較 | 銓幻元科技 MCS' },
  description: '冷凍智能販賣機 FZ 系列 5 款：標準款、保溫取貨箱、側面取貨、49 吋廣告屏、窄機身。貨道、容量、取貨方式與尺寸完整比較。',
  keywords: ['冷凍販賣機', '冷凍智能販賣機', '冰品販賣機', '冷凍販賣機規格', 'FZ 系列'],
  alternates: { canonical: `${BASE}/products/frozen-vending/${SLUG}` },
  openGraph: {
    title: '冷凍智能販賣機 FZ 系列｜5 款比較',
    description: '冷凍智能販賣機 FZ 系列 5 款：標準款、保溫取貨箱、側面取貨、49 吋廣告屏、窄機身。貨道、容量、取貨方式與尺寸完整比較。',
    url: `${BASE}/products/frozen-vending/${SLUG}`,
  },
}

export default function Page() {
  const s = SERIES[KEY]
  const models = modelsBySeries(KEY)
  const common = KEY === 'frozen-microwave' ? FM_COMMON : FREEZER_COMMON

  // 系列頁用 CollectionPage + ItemList，不在這裡另造一份 Product 實體——
  // 每個型號只有一個 Product，在它自己的頁面上。
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: s.name,
    url: `${BASE}/products/frozen-vending/${SLUG}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: models.length,
      itemListElement: models.map((m, i) => ({
        '@type': 'ListItem', position: i + 1, name: m.code,
        url: `${BASE}/products/frozen-vending/${m.slug}`,
      })),
    },
  }

  return (
    <main className="min-h-screen" style={{ background: '#0B1524' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="max-w-3xl mx-auto px-5 py-14">
        <nav className="text-xs text-slate-500 mb-6">
          <Link href="/products/frozen-vending" className="hover:text-slate-300">全系列</Link>
          <span className="mx-2">/</span><span className="text-slate-400">{s.name}</span>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 leading-snug mb-4">冷凍智能販賣機 FZ 系列：5 款型號規格比較</h1>
        <p className="text-slate-300 leading-relaxed mb-2">本系列共 {models.length} 款。{s.oneLiner}</p>
        <p className="text-slate-400 text-sm leading-relaxed mb-10">
          什麼時候選這個系列：{s.chooseWhen}。以下數值取自產品文件的規格標示值，非本公司實測值。
        </p>

        <h2 className="text-lg font-bold text-slate-100 mb-4">{models.length} 款差在哪</h2>
        <div className="space-y-3 mb-10">
          {models.map(m => (
            <div key={m.slug} className="rounded-lg p-4" style={{ background: '#0f1f36', border: '1px solid #1e293b' }}>
              <Link href={`/products/frozen-vending/${m.slug}`} className="font-semibold hover:underline" style={{ color: '#FF6B35' }}>
                {m.code}
              </Link>
              <p className="text-slate-300 text-sm mt-1 leading-relaxed">{m.differentiator}。</p>
              <p className="text-slate-500 text-xs mt-1">先評估方向：{m.evaluateFor}</p>
            </div>
          ))}
        </div>

        <h2 className="text-lg font-bold text-slate-100 mb-3">本系列共同項目</h2>
        <ul className="text-slate-300 text-sm list-disc pl-5 space-y-1.5 mb-2">
          {common.map(f => <li key={f}>{f}</li>)}
        </ul>
        <p className="text-slate-500 text-xs leading-relaxed mb-10">
          共同項目依產品文件之系列敘述整理。個別型號的實際配置仍以交付規格為準，並非每一項都在每一款的規格頁逐一載明。
        </p>

        <h2 className="text-lg font-bold text-slate-100 mb-3">另一個系列</h2>
        <p className="text-slate-400 text-sm leading-relaxed mb-10">
          {KEY === 'frozen-microwave'
            ? <>只賣冰品與冷凍食品、不需要現場加熱，看 <Link href="/products/frozen-vending/fz-series" className="hover:underline" style={{ color: '#FF6B35' }}>冷凍系列 5 款</Link>。</>
            : <>需要下單後現場加熱出餐，看 <Link href="/products/frozen-vending/fm-series" className="hover:underline" style={{ color: '#FF6B35' }}>冷凍微波系列 3 款</Link>。</>}
        </p>

        <div className="rounded-xl p-5" style={{ background: '#0f2744', border: '1px solid rgba(255,107,53,0.3)' }}>
          <p className="text-slate-200 font-bold mb-2">要確認哪一款進得了你的場地？</p>
          <p className="text-slate-400 text-sm mb-4 leading-relaxed">機身尺寸、電源迴路與商品適配，這三件事看現場才談得準。</p>
          <Link href="/#contact" className="inline-block px-6 py-2.5 rounded-lg font-bold text-white text-sm" style={{ background: '#FF6B35' }}>
            聯絡我們安排場勘 →
          </Link>
        </div>

        <p className="text-slate-500 text-xs mt-10 leading-relaxed">{DISCLAIMER}</p>
      </div>
    </main>
  )
}
