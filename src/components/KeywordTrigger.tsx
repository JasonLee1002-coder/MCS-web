'use client'

// Maps keyword text → 站內既有頁面。
// 2026-08-19 修：原本一律指向 /solutions/{slug}，但那是 transtep 的動態路由，
// mcstation.ai 從來沒有 /solutions/frozen-microwave、/solutions/smart-locker，
// 導致 blog 內所有關鍵字連結與文末 CTA 全部 404（實測 mcstation.ai/solutions/frozen-microwave）。
// 現在一律解析成本站真實存在的產品頁。
const KEYWORD_TO_SLUG: Record<string, string> = {
  '冷凍微波機':   'frozen-microwave',
  '冷凍販賣機':   'frozen-microwave',
  '冷凍機':       'frozen-microwave',
  '蒸氣拉麵機':   'frozen-microwave',
  '蒸氣便當':     'frozen-microwave',
  '智慧販賣機':   'frozen-microwave',
  '智慧取物櫃':   'smart-locker',
  '智取物流櫃':   'smart-locker',
  '取物櫃':       'smart-locker',
  'GraBox':       'smart-locker',
  '幽靈廚房':     'smart-locker',
  '幽靈廚房設備': 'smart-locker',
  '自助取餐':     'smart-locker',
  'AI 勞動力':    'ai-labor',
}

// slug → 本站實際路由（唯一真相；新增產品頁時只改這裡）
const SLUG_TO_PATH: Record<string, string> = {
  'frozen-microwave': '/products/frozen-microwave',
  'smart-locker':     '/products/grabox',
  'ai-labor':         '/#platform',
}

const DEFAULT_PATH = '/products/frozen-microwave'

/**
 * 組出站內連結。
 * autoOpenAi=true 時帶 ?ai=1，落地頁會自動展開小龍 AI 顧問——
 * 只給文末「諮詢 AI」用；行文中的關鍵字連結不該強制彈出對話框。
 */
function buildHref(target: string, medium: string, campaign: string, autoOpenAi: boolean) {
  const base = SLUG_TO_PATH[target] ?? DEFAULT_PATH
  const [path, hash] = base.split('#')
  const params = new URLSearchParams()
  if (autoOpenAi) params.set('ai', '1')
  params.set('utm_source', 'article')
  params.set('utm_medium', medium)
  params.set('utm_campaign', campaign)
  return `${path}?${params.toString()}${hash ? '#' + hash : ''}`
}

interface KeywordTriggerProps {
  keyword: string
  slug?: string  // override auto-mapping
}

export function KeywordTrigger({ keyword, slug }: KeywordTriggerProps) {
  const target = slug ?? KEYWORD_TO_SLUG[keyword] ?? 'frozen-microwave'
  const href = buildHref(target, 'keyword-trigger', keyword, false)

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
  const href = buildHref(target, 'article-cta', keyword, true)

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
