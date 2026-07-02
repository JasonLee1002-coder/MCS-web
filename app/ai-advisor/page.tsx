import type { Metadata } from 'next'
import { AIChatWindow } from '@/components/AIChatWindow'

export const metadata: Metadata = {
  title: 'AI 場域顧問 | 銓幻元科技',
  description: '與銓幻元 AI 顧問對話，了解智取物流櫃、冷凍微波機等餐飲自助化解決方案。',
}

export default function AiAdvisorPage() {
  return (
    <main className="min-h-screen bg-[#0d1a2d] text-white flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">銓幻元 AI 場域顧問</h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          告訴我您的場域需求，AI 助理將為您分析最適合的智慧餐飲自助化方案。
        </p>
      </div>

      <div className="w-full max-w-lg">
        <AIChatWindow
          keyword="智慧餐飲自助化"
          brand="mcstation"
          sourceSlug="/ai-advisor"
          openOnLoad={true}
          embedded={true}
        />
      </div>
    </main>
  )
}
