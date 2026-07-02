'use client'

import { useState } from 'react'

export interface LeadData {
  venue: string
  need: string
  headcount?: string
  name: string
  contact: string
  contactMethod: 'LINE' | '電話' | 'Email'
  institution?: string
}

interface LeadConfirmCardProps {
  data: LeadData
  sourceUrl: string
  brand: 'longcloud' | 'mcstation'
  onSubmit: (data: LeadData) => Promise<void>
  onRevise: () => void
}

export function LeadConfirmCard({ data, sourceUrl: _sourceUrl, brand, onSubmit, onRevise }: LeadConfirmCardProps) {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const accent = brand === 'mcstation' ? '#FF6B35' : '#00C6AD'

  async function handleSubmit() {
    setSubmitting(true)
    await onSubmit(data)
    setSubmitted(true)
    setSubmitting(false)
  }

  if (submitted) {
    return (
      <div className="rounded-xl p-4 my-3 text-center" style={{ background: '#0f2744', border: `1px solid ${accent}` }}>
        <div className="text-2xl mb-2">✅</div>
        <p className="font-bold mb-1" style={{ color: accent }}>已收到您的需求！</p>
        <p className="text-slate-400 text-sm">顧問將盡快透過 {data.contactMethod} 與您聯繫。</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl p-4 my-3" style={{ background: '#0f2744', border: `1px solid ${accent}40` }}>
      <p className="text-xs font-bold mb-3 tracking-wider" style={{ color: accent }}>
        📋 AI 幫您整理如下，確認後送出：
      </p>
      <div className="rounded-lg p-3 mb-3 text-sm space-y-1" style={{ background: '#1e293b' }}>
        {data.institution && <p className="text-slate-400">單位：<span className="text-slate-200">{data.institution}</span></p>}
        <p className="text-slate-400">場域：<span className="text-slate-200">{data.venue}</span></p>
        <p className="text-slate-400">需求：<span className="text-slate-200">{data.need}</span></p>
        {data.headcount && <p className="text-slate-400">人流：<span className="text-slate-200">{data.headcount}</span></p>}
        <p className="text-slate-400">聯絡：<span className="text-slate-200">{data.name}｜{data.contactMethod} {data.contact}</span></p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onRevise}
          className="flex-1 py-2 rounded-lg text-sm font-semibold border"
          style={{ borderColor: '#475569', color: '#94a3b8', background: 'transparent' }}
        >
          ✏️ 修改
        </button>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="flex-1 py-2 rounded-lg text-sm font-bold text-white"
          style={{ background: accent, opacity: submitting ? 0.7 : 1 }}
        >
          {submitting ? '送出中...' : '確認送出 →'}
        </button>
      </div>
    </div>
  )
}
