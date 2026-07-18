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
  /** 業務軌別：IoT無人商店／SEO顧問服務 */
  category?: 'IoT無人商店' | 'SEO顧問服務'
}

interface LeadConfirmCardProps {
  data: LeadData
  onSubmit: (data: LeadData) => Promise<void>
  onRevise: () => void
}

const PLACEHOLDER_CONTACT = '待業務致電確認'
const CONTACT_METHODS: LeadData['contactMethod'][] = ['電話', 'LINE', 'Email']
const ACCENT = '#E8751A' // mcs-orange，沿用 mcstation.ai 品牌主色

export function LeadConfirmCard({ data, onSubmit, onRevise }: LeadConfirmCardProps) {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState<LeadData>({ ...data })

  // 聯絡方式缺（僅有 placeholder）時，預設進入可編輯狀態，方便使用者補上
  const contactMissing = !form.contact?.trim() || form.contact === PLACEHOLDER_CONTACT
  const [editing, setEditing] = useState(contactMissing)

  async function handleSubmit() {
    setSubmitting(true)
    const clean: LeadData = {
      ...form,
      name: form.name?.trim() || '現場聯絡人',
      contact: form.contact?.trim() || PLACEHOLDER_CONTACT,
    }
    await onSubmit(clean)
    setSubmitted(true)
    setSubmitting(false)
  }

  if (submitted) {
    const viaLine = !contactMissing
    return (
      <div className="rounded-xl p-4 my-3 text-center bg-mcs-orange/5 border border-mcs-orange/40">
        <div className="text-2xl mb-2">✅</div>
        <p className="font-bold mb-1 text-mcs-orange">已為您記錄！</p>
        <p className="text-gray-500 text-sm">
          {viaLine
            ? `顧問將盡快透過 ${form.contactMethod} 與您聯繫。`
            : '專人將主動與您聯繫，感謝您的諮詢。'}
        </p>
      </div>
    )
  }

  const labelCls = 'text-gray-500 text-xs'
  const inputCls = 'w-full rounded-md px-2 py-1.5 text-sm text-gray-800 outline-none mt-0.5 border border-gray-200 focus:border-mcs-orange'

  return (
    <div className="rounded-xl p-4 my-3 bg-white border border-mcs-orange/30 shadow-sm">
      <p className="text-xs font-bold mb-3 tracking-wider text-mcs-orange">
        📋 小龍幫您整理如下，確認後送出：
      </p>

      {editing ? (
        <div className="space-y-2 mb-3">
          <div>
            <span className={labelCls}>場域</span>
            <input className={inputCls} value={form.venue}
              onChange={e => setForm({ ...form, venue: e.target.value })} />
          </div>
          <div>
            <span className={labelCls}>需求</span>
            <input className={inputCls} value={form.need}
              onChange={e => setForm({ ...form, need: e.target.value })} />
          </div>
          <div>
            <span className={labelCls}>稱呼</span>
            <input className={inputCls} value={form.name} placeholder="您的稱呼"
              onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <span className={labelCls}>聯絡方式</span>
            <div className="flex gap-1.5 mt-0.5 mb-1">
              {CONTACT_METHODS.map(mth => (
                <button key={mth} type="button" onClick={() => setForm({ ...form, contactMethod: mth })}
                  className="flex-1 py-1 rounded-md text-xs font-semibold transition-colors"
                  style={{
                    background: form.contactMethod === mth ? ACCENT : '#ffffff',
                    color: form.contactMethod === mth ? '#ffffff' : '#6b7280',
                    border: `1px solid ${form.contactMethod === mth ? ACCENT : '#e5e7eb'}`,
                  }}>
                  {mth}
                </button>
              ))}
            </div>
            <input className={inputCls}
              value={form.contact === PLACEHOLDER_CONTACT ? '' : form.contact}
              placeholder={`您的${form.contactMethod}（可留空，改由專人致電）`}
              onChange={e => setForm({ ...form, contact: e.target.value })} />
          </div>
        </div>
      ) : (
        <div className="rounded-lg p-3 mb-3 text-sm space-y-1 bg-mcs-gray">
          {form.category && <p className="text-gray-400 text-[11px]">類型：{form.category}</p>}
          {form.institution && <p className="text-gray-500">單位：<span className="text-gray-800">{form.institution}</span></p>}
          <p className="text-gray-500">場域：<span className="text-gray-800">{form.venue}</span></p>
          <p className="text-gray-500">需求：<span className="text-gray-800">{form.need}</span></p>
          {form.headcount && <p className="text-gray-500">人流：<span className="text-gray-800">{form.headcount}</span></p>}
          <p className="text-gray-500">聯絡：<span className="text-gray-800">{form.name || '現場聯絡人'}｜{form.contactMethod} {form.contact}</span></p>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={editing ? onRevise : () => setEditing(true)}
          className="flex-1 py-2 rounded-lg text-sm font-semibold border border-gray-300 text-gray-500 bg-transparent hover:bg-gray-50"
        >
          {editing ? '↩ 返回對話' : '✏️ 修改'}
        </button>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="flex-1 py-2 rounded-lg text-sm font-bold text-white bg-mcs-orange hover:bg-mcs-orange-light disabled:opacity-70"
        >
          {submitting ? '送出中...' : '確認送出 →'}
        </button>
      </div>
    </div>
  )
}
