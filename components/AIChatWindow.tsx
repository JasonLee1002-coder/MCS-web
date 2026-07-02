'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { useState, useRef, useEffect, useMemo } from 'react'
import { LeadConfirmCard, type LeadData } from './LeadConfirmCard'
import { getOpener, type Brand } from '@/lib/chat-config'

interface AIChatWindowProps {
  keyword: string
  brand?: Brand
  sourceSlug: string
  openOnLoad?: boolean
  embedded?: boolean
}

export function AIChatWindow({
  keyword,
  brand = 'mcstation',
  sourceSlug,
  openOnLoad = false,
  embedded = false,
}: AIChatWindowProps) {
  const [isOpen, setIsOpen] = useState(openOnLoad || embedded)
  const [leadData, setLeadData] = useState<LeadData | null>(null)
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const accent = brand === 'mcstation' ? '#FF6B35' : '#00C6AD'
  const brandName = brand === 'mcstation' ? '銓幻元 AI 助理' : '龍雲數位 AI 助理'

  const initialMessages = useMemo(() => [{
    id: 'init',
    role: 'assistant' as const,
    parts: [{ type: 'text' as const, text: getOpener(keyword, brand) }],
    createdAt: new Date(),
  }], [keyword, brand])

  const transport = useMemo(() => new DefaultChatTransport({
    api: '/api/chat',
    body: { keyword, brand, sourceUrl: sourceSlug },
  }), [keyword, brand, sourceSlug])

  const { messages, sendMessage, status } = useChat({
    messages: initialMessages,
    transport,
  })

  const isStreaming = status === 'streaming' || status === 'submitted'
  const userTurns = messages.filter(m => (m.role as string) === 'user').length
  const MAX_TURNS = 6

  // detect summarize_lead tool output
  useEffect(() => {
    if (leadData) return
    for (const msg of messages) {
      for (const part of msg.parts ?? []) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const p = part as any
        if (p.type === 'tool-summarize_lead' && p.state === 'output-available') {
          setLeadData(p.output as LeadData)
          return
        }
      }
    }
  }, [messages, leadData])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isStreaming])

  function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || isStreaming) return
    sendMessage({ text: input })
    setInput('')
  }

  async function handleLeadSubmit(data: LeadData) {
    const textLines = messages
      .filter(m => (m.role as string) !== 'system')
      .flatMap(m =>
        (m.parts ?? [])
          .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
          .map(p => `[${m.role}] ${p.text}`)
      )
      .join('\n')

    const caseId = `MCS-${Date.now()}`
    await fetch('/api/ai-consult', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        caseId,
        keyword,
        venue: data.venue,
        situation: data.need,
        description: data.headcount ?? '',
        name: data.name,
        contact: data.contact,
        institution: data.institution ?? '',
        sourceUrl: sourceSlug,
        contactMethod: data.contactMethod,
        aiSummary: textLines.slice(0, 2000),
      }),
    })
  }

  // ── Floating trigger button ────────────────────────────
  if (!isOpen && !embedded) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full px-5 py-3 font-bold text-white shadow-lg"
        style={{ background: accent, boxShadow: `0 8px 32px ${accent}60` }}
      >
        💬 AI 顧問諮詢
      </button>
    )
  }

  // ── Shared chat UI ────────────────────────────────────
  const containerStyle: React.CSSProperties = embedded
    ? {
        width: '100%',
        maxHeight: '70vh',
        background: '#0d1a2d',
        border: `1px solid ${accent}40`,
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }
    : {
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 50,
        width: 360,
        maxHeight: '80vh',
        background: '#0d1a2d',
        border: `1px solid ${accent}40`,
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
      }

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 shrink-0"
        style={{ borderBottom: `1px solid ${accent}30` }}
      >
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-green-400" />
          <span className="text-slate-200 font-semibold text-sm">{brandName}</span>
        </div>
        {!embedded && (
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-500 hover:text-slate-300 text-xl leading-none"
          >
            ×
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.filter(m => (m.role as string) !== 'system').map((m) => {
          const textPart = (m.parts ?? []).find(
            (p): p is { type: 'text'; text: string } => p.type === 'text'
          )
          if (!textPart?.text) return null
          const isUser = (m.role as string) === 'user'
          return (
            <div key={m.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div
                className="max-w-[75%] rounded-2xl px-4 py-2 text-sm leading-relaxed whitespace-pre-wrap"
                style={{
                  background: isUser ? accent : '#1e293b',
                  color: isUser ? '#fff' : '#e2e8f0',
                  borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                }}
              >
                {textPart.text}
              </div>
            </div>
          )
        })}

        {leadData && (
          <LeadConfirmCard
            data={leadData}
            sourceUrl={sourceSlug}
            brand={brand}
            onSubmit={handleLeadSubmit}
            onRevise={() => setLeadData(null)}
          />
        )}

        {isStreaming && (
          <div className="text-slate-500 text-xs px-1 animate-pulse">AI 思考中…</div>
        )}

        {userTurns >= MAX_TURNS && !leadData && !isStreaming && (
          <div className="text-xs text-center text-slate-400 py-2">
            已達對話上限，AI 正在幫您整理需求…
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {!leadData && (
        <form
          onSubmit={handleSend}
          className="flex gap-2 p-3 shrink-0"
          style={{ borderTop: `1px solid ${accent}20` }}
        >
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={userTurns >= MAX_TURNS ? '請等待 AI 整理需求…' : '輸入您的問題…'}
            disabled={isStreaming || userTurns >= MAX_TURNS}
            className="flex-1 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none"
            style={{ background: '#1e293b', border: '1px solid #334155' }}
          />
          <button
            type="submit"
            disabled={isStreaming || !input.trim() || userTurns >= MAX_TURNS}
            className="rounded-lg px-3 py-2 text-sm font-bold text-white shrink-0"
            style={{
              background: accent,
              opacity: isStreaming || !input.trim() ? 0.5 : 1,
            }}
          >
            送出
          </button>
        </form>
      )}
    </div>
  )
}
