'use client'

import { useState } from 'react'

const VENUE_OPTIONS = [
  '工廠 / 製造業', '移工宿舍', '醫院 / 診所', '軍方場域', '辦公大樓',
  '餐廳 / 外帶店', '幽靈廚房', '校園', '長照機構', '其他',
]

const PRODUCT_OPTIONS = [
  '冷凍微波機', '智慧取物櫃（GraBox）', '蒸氣拉麵機', '蒸氣便當機', 'AI 勞動力方案', '幽靈廚房設備組合', '不確定，需要建議',
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', company: '', venue: '', product: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const caseId = `MCS-${Date.now()}`
      const res = await fetch('/api/ai-consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caseId,
          name: form.name,
          contact: form.phone,
          institution: form.company,
          venue: form.venue,
          situation: form.product,
          description: form.message,
          keyword: form.product,
          contactMethod: 'phone',
          sourceUrl: '/contact',
          aiSummary: `聯絡表單：${form.venue}場域，需求：${form.product}，訊息：${form.message}`,
        }),
      })
      if (res.ok) setStatus('success')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <main className="min-h-screen bg-[#0d1a2d] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-6">✅</div>
          <h1 className="text-2xl font-bold text-slate-100 mb-3">收到你的訊息了！</h1>
          <p className="text-slate-400 leading-relaxed mb-8">
            業務顧問將在 2 個工作天內聯繫你。如需緊急諮詢，歡迎直接 LINE 聯繫。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://lin.ee/mcstation"
              className="px-6 py-3 rounded-xl font-bold text-white text-sm"
              style={{ background: '#06C755' }}>
              LINE 立即聯繫
            </a>
            <a href="/"
              className="px-6 py-3 rounded-xl font-bold text-sm border border-slate-600 text-slate-300 hover:border-slate-400 transition-colors">
              返回首頁
            </a>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0d1a2d] text-slate-100">
      <section className="max-w-2xl mx-auto px-6 pt-28 pb-20">
        <h1 className="text-4xl font-black mb-3" style={{ color: '#FF6B35' }}>聯絡我們</h1>
        <p className="text-slate-400 mb-10">填寫以下表單，業務顧問將在 2 個工作天內與你聯繫。</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              聯絡人姓名 <span style={{ color: '#FF6B35' }}>*</span>
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              placeholder="王大明"
              className="w-full rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 outline-none focus:ring-2 transition-all"
              style={{ background: '#0f1f36', border: '1px solid rgba(255,107,53,0.2)' }}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              手機號碼 <span style={{ color: '#FF6B35' }}>*</span>
            </label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
              placeholder="0912-345-678"
              className="w-full rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 outline-none transition-all"
              style={{ background: '#0f1f36', border: '1px solid rgba(255,107,53,0.2)' }}
            />
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              公司 / 單位名稱 <span style={{ color: '#FF6B35' }}>*</span>
            </label>
            <input
              type="text"
              required
              value={form.company}
              onChange={e => setForm(p => ({ ...p, company: e.target.value }))}
              placeholder="XX 製造股份有限公司"
              className="w-full rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 outline-none transition-all"
              style={{ background: '#0f1f36', border: '1px solid rgba(255,107,53,0.2)' }}
            />
          </div>

          {/* Venue */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              場域類型 <span style={{ color: '#FF6B35' }}>*</span>
            </label>
            <select
              required
              value={form.venue}
              onChange={e => setForm(p => ({ ...p, venue: e.target.value }))}
              className="w-full rounded-xl px-4 py-3 text-sm text-slate-100 outline-none transition-all appearance-none"
              style={{ background: '#0f1f36', border: '1px solid rgba(255,107,53,0.2)' }}
            >
              <option value="">請選擇場域類型</option>
              {VENUE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          {/* Product */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">有興趣的設備</label>
            <select
              value={form.product}
              onChange={e => setForm(p => ({ ...p, product: e.target.value }))}
              className="w-full rounded-xl px-4 py-3 text-sm text-slate-100 outline-none transition-all appearance-none"
              style={{ background: '#0f1f36', border: '1px solid rgba(255,107,53,0.2)' }}
            >
              <option value="">請選擇（可略）</option>
              {PRODUCT_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">需求說明</label>
            <textarea
              rows={4}
              value={form.message}
              onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
              placeholder="請描述您的場域情況、人數、需求等，讓我們更準確地為您規劃方案..."
              className="w-full rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 outline-none resize-none transition-all"
              style={{ background: '#0f1f36', border: '1px solid rgba(255,107,53,0.2)' }}
            />
          </div>

          {status === 'error' && (
            <p className="text-red-400 text-sm">送出失敗，請稍後再試或直接 LINE 聯繫我們。</p>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full py-4 rounded-xl font-bold text-white text-base transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ background: '#FF6B35' }}
          >
            {status === 'sending' ? '送出中...' : '送出需求 →'}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-700/40">
          <p className="text-slate-400 text-sm mb-4">或直接聯繫業務顧問：</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="https://lin.ee/mcstation"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-sm text-white"
              style={{ background: '#06C755' }}>
              <span>LINE 立即諮詢</span>
            </a>
            <a href="mailto:henry.ho@transtep.com"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-sm border border-slate-600 text-slate-300 hover:border-slate-400 transition-colors">
              henry.ho@transtep.com
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
