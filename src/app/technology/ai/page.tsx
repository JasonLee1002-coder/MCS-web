import type { Metadata } from 'next'
import AICapabilityShowcase from '@/components/AICapabilityShowcase'
import { AI_CAPABILITY_FAQS } from '@/data/ai-capabilities'

const BASE = 'https://www.mcstation.ai'
const URL = `${BASE}/technology/ai`

export const metadata: Metadata = {
  title: { absolute: 'AI 技術能量：從事件匯流到語音問答的四層架構 | 銓幻元科技 MCS' },
  description:
    '多數「導入 AI」失敗不是模型不夠好，是資料沒串起來。銓幻元的 AI 能力分四層：事件匯流、語意檢索、異常偵測與需求預測、語音互動，並說明三個設計取捨與各自的代價。',
  keywords: [
    'AI 導入', '零售 AI', '門市 AI', 'AI 代理人', '自然語言查詢營運數據',
    '需求預測', '異常偵測', 'POS 系統整合', 'AI 語音助理', '智慧零售 AI',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: 'AI 技術能量｜從事件匯流到語音問答',
    description: '功能清單誰都列得出來，講清楚取捨與代價才是技術能量。',
    url: URL,
    type: 'article',
  },
}

export default function Page() {
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: AI_CAPABILITY_FAQS.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  // 只描述我們提供的服務能力，不宣告製造者、不放價格。
  // 與 2026-08-20 兩個產品頁移除 offers/manufacturer 的處理一致。
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI 系統整合與導入評估',
    serviceType: '零售與餐飲場域的 AI 能力導入',
    provider: { '@type': 'Organization', name: '銓幻元科技股份有限公司', url: BASE },
    areaServed: 'TW',
    description:
      '事件匯流、語意檢索、異常偵測與需求預測、語音互動四層能力，對接既有 POS／廚房／庫存與設備系統，不要求汰換現有系統。',
    url: URL,
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '首頁', item: `${BASE}/` },
      { '@type': 'ListItem', position: 2, name: 'AI 技術能量', item: URL },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <AICapabilityShowcase />
    </>
  )
}
