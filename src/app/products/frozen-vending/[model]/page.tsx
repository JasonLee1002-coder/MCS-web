import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SpecTable } from '@/components/SpecTable'
import {
  MODELS, SERIES, DISCLAIMER, ADOPTION_STEPS, FM_COMMON, FREEZER_COMMON,
  getModel, modelsBySeries,
} from '@/data/frozen-vending-models'

const BASE = 'https://www.mcstation.ai'

export const dynamicParams = false

export function generateStaticParams() {
  return MODELS.map(m => ({ model: m.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ model: string }> }): Promise<Metadata> {
  const { model } = await params
  const m = getModel(model)
  if (!m) return {}
  const s = SERIES[m.series]
  return {
    // 標題自帶型號，不套「%s | 銓幻元科技 MCS」模板——型號詞是這頁的主詞，
    // 模板會把它擠出中文 SERP 的顯示長度。
    title: { absolute: `${m.code} 規格：${s.name}${m.positioning.slice(0, 14)}… | 銓幻元科技 MCS` },
    description: `${m.code} ${s.name}完整規格：${m.differentiator}。以下為產品文件標示值，非本公司實測值；實際交付規格以正式報價與訂單為準。`,
    keywords: [m.code, `${m.code} 規格`, `${m.code} 尺寸`, s.name, '冷凍智能販賣機', '冷凍微波販賣機'],
    alternates: { canonical: `${BASE}/products/frozen-vending/${m.slug}` },
    openGraph: {
      title: `${m.code}｜${m.positioning}`,
      description: `${s.name}。${m.differentiator}。`,
      url: `${BASE}/products/frozen-vending/${m.slug}`,
      type: 'article',
    },
  }
}

export default async function ModelPage({ params }: { params: Promise<{ model: string }> }) {
  const { model } = await params
  const m = getModel(model)
  if (!m) notFound()

  const s = SERIES[m.series]
  const siblings = modelsBySeries(m.series).filter(x => x.slug !== m.slug)
  const common = m.series === 'frozen-microwave' ? FM_COMMON : FREEZER_COMMON
  const unlisted = m.specs.filter(r => r.value === null)
  const sourceLabel =
    `資料來源：〈冷凍與冷凍微波智能販賣機 全系列規格簡報〉V1.0（2026-08-19）第 ${m.sourcePage} 頁。` +
    `下列數值為設備規格標示值，非本公司於台灣環境的實測結果。`

  // 沒有公開價格就不放 offers。Google 把 price:0 解讀為免費，
  // price:"洽詢" 或不填 lowPrice 的 AggregateOffer 同樣不合規。
  // 代價是不具 Product rich result 資格，但保留合法的 Product 語意。
  // manufacturer／countryOfOrigin 一併不填：製造歸屬未經書面確認。
  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: m.name,
    model: m.code,
    sku: m.code,
    category: s.name,
    description: `${m.positioning}。${m.differentiator}。`,
    url: `${BASE}/products/frozen-vending/${m.slug}`,
    additionalProperty: m.specs
      .filter(r => r.value !== null)
      .map(r => ({ '@type': 'PropertyValue', name: r.label, value: r.value })),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '產品', item: `${BASE}/products/frozen-vending` },
      { '@type': 'ListItem', position: 2, name: s.name, item: `${BASE}/products/frozen-vending/${s.key === 'frozen-microwave' ? 'fm-series' : 'fz-series'}` },
      { '@type': 'ListItem', position: 3, name: m.code, item: `${BASE}/products/frozen-vending/${m.slug}` },
    ],
  }

  return (
    <main className="min-h-screen" style={{ background: '#0B1524' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <article className="max-w-3xl mx-auto px-5 py-14">
        <nav className="text-xs text-slate-500 mb-6">
          <Link href="/products/frozen-vending" className="hover:text-slate-300">全系列</Link>
          <span className="mx-2">/</span>
          <Link
            href={`/products/frozen-vending/${m.series === 'frozen-microwave' ? 'fm-series' : 'fz-series'}`}
            className="hover:text-slate-300"
          >{s.name}</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-400">{m.code}</span>
        </nav>

        <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#FF6B35' }}>
          {s.name}
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 leading-snug mb-4">{m.name}</h1>

        {/* facts-first 摘要：AI 檢索最容易引用的是「問題標題＋緊接著的短答案」 */}
        <p className="text-slate-300 leading-relaxed mb-2">{m.positioning}。</p>
        <p className="text-slate-400 text-sm leading-relaxed mb-10">
          與同系列其他型號的主要差異：{m.differentiator}。建議先評估的方向是{m.evaluateFor}。
        </p>

        <h2 className="text-lg font-bold text-slate-100 mb-4">規格</h2>
        <SpecTable rows={m.specs} sourceLabel={sourceLabel} />

        {unlisted.length > 0 && (
          <>
            <h2 className="text-lg font-bold text-slate-100 mt-10 mb-3">產品文件未載項目</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              下列項目在產品文件中未載明，本頁不作推估：
              <span className="text-slate-200">{unlisted.map(r => r.label).join('、')}</span>。
              需要這些數值時，請由專人向產品端確認後提供。
            </p>
          </>
        )}

        <h2 className="text-lg font-bold text-slate-100 mt-10 mb-3">本款配置</h2>
        <ul className="text-slate-300 text-sm list-disc pl-5 space-y-1.5">
          {m.uniqueFeatures.map(f => <li key={f}>{f}</li>)}
        </ul>
        <p className="text-slate-500 text-xs mt-4 leading-relaxed">
          {s.name}共同項目：{common.join('、')}。共同項目依產品文件之系列敘述整理，個別型號的實際配置以交付規格為準。
        </p>

        <h2 className="text-lg font-bold text-slate-100 mt-10 mb-3">導入前要確認的事</h2>
        <ol className="text-slate-300 text-sm list-decimal pl-5 space-y-1.5">
          {ADOPTION_STEPS.map(step => <li key={step}>{step}</li>)}
        </ol>

        <h2 className="text-lg font-bold text-slate-100 mt-10 mb-3">同系列其他型號</h2>
        <ul className="space-y-2">
          {siblings.map(x => (
            <li key={x.slug}>
              <Link
                href={`/products/frozen-vending/${x.slug}`}
                className="text-sm hover:underline"
                style={{ color: '#FF6B35' }}
              >
                {x.code}：{x.differentiator}
              </Link>
            </li>
          ))}
        </ul>

        <div className="rounded-xl p-5 mt-12" style={{ background: '#0f2744', border: '1px solid rgba(255,107,53,0.3)' }}>
          <p className="text-slate-200 font-bold mb-2">要確認這款適不適合你的場地？</p>
          <p className="text-slate-400 text-sm mb-4 leading-relaxed">
            機身尺寸能不能進場、電源迴路夠不夠、你的商品包裝能不能適配，這三件事決定可行性，需要看現場條件才談得準。
          </p>
          <Link
            href="/#contact"
            className="inline-block px-6 py-2.5 rounded-lg font-bold text-white text-sm"
            style={{ background: '#FF6B35' }}
          >
            聯絡我們安排場勘 →
          </Link>
        </div>

        <p className="text-slate-500 text-xs mt-10 leading-relaxed">{DISCLAIMER}</p>
      </article>
    </main>
  )
}
