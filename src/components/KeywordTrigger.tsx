'use client'

// Maps keyword text → /solutions/[slug]
const KEYWORD_TO_SLUG: Record<string, string> = {
  '冷凍微波機':   'frozen-microwave',
  '冷凍機':       'frozen-microwave',
  '蒸氣拉麵機':   'steam-ramen',
  '蒸氣便當':     'steam-bento',
  '智慧取物櫃':   'smart-locker',
  '智取物流櫃':   'smart-locker',
  '取物櫃':       'smart-locker',
  'GraBox':       'smart-locker',
  'AI 勞動力':    'ai-labor',
  '幽靈廚房':     'ghost-kitchen',
  '幽靈廚房設備': 'ghost-kitchen',
  '智慧販賣機':   'frozen-microwave',
  '自助取餐':     'smart-locker',
}

interface KeywordTriggerProps {
  keyword: string
  slug?: string  // override auto-mapping
}

export function KeywordTrigger({ keyword, slug }: KeywordTriggerProps) {
  const target = slug ?? KEYWORD_TO_SLUG[keyword] ?? 'frozen-microwave'
  const href = `/solutions/${target}?utm_source=article&utm_medium=keyword-trigger&utm_campaign=${encodeURIComponent(keyword)}`

  return (
    <a
      href={href}
      className="keyword-trigger"
      style={{
        color: '#FF6B35',
        textDecoration: 'underline',
        textUnderlineOffset: '3px',
        textDecorationColor: 'rgba(255,107,53,0.4)',
        fontWeight: 600,
        cursor: 'pointer',
        borderRadius: '3px',
        padding: '0 2px',
        transition: 'background 0.2s, color 0.2s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.background = 'rgba(255,107,53,0.12)'
        el.style.textDecorationColor = '#FF6B35'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.background = 'transparent'
        el.style.textDecorationColor = 'rgba(255,107,53,0.4)'
      }}
    >
      {keyword}
    </a>
  )
}

// CTA block at bottom of article
export function ArticleCTA({ keyword, slug }: KeywordTriggerProps) {
  const target = slug ?? KEYWORD_TO_SLUG[keyword] ?? 'frozen-microwave'
  const href = `/solutions/${target}?utm_source=article&utm_medium=article-cta&utm_campaign=${encodeURIComponent(keyword)}`

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(255,107,53,0.08) 0%, rgba(255,107,53,0.03) 100%)',
      border: '1px solid rgba(255,107,53,0.2)',
      borderLeft: '3px solid #FF6B35',
      borderRadius: '10px',
      padding: '18px 20px',
      margin: '2.5rem 0',
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
    }}>
      <span style={{ fontSize: 24, flexShrink: 0 }}>💡</span>
      <div style={{ flex: 1 }}>
        <div style={{ color: '#FFD4C2', fontSize: 14, fontWeight: 700, marginBottom: 3 }}>
          您的場域符合文章描述的情境嗎？
        </div>
        <div style={{ color: '#64748b', fontSize: 12 }}>
          30 秒讓銓幻元 AI 顧問分析最適方案，不用填表單
        </div>
      </div>
      <a
        href={href}
        style={{
          background: '#FF6B35',
          color: '#fff',
          borderRadius: '8px',
          padding: '9px 16px',
          fontSize: 13,
          fontWeight: 700,
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        諮詢 AI →
      </a>
    </div>
  )
}
