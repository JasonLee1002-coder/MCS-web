'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const PRODUCTS = [
  { label: '冷凍微波機', desc: '24hr 夜班熱食補給', icon: '❄️', href: '/solutions/frozen-microwave' },
  { label: '智慧取物櫃', desc: '外帶等待 0 分鐘', icon: '📦', href: '/solutions/smart-locker' },
  { label: '蒸氣拉麵機', desc: '現煮口感自動化', icon: '🍜', href: '/solutions/steam-ramen' },
  { label: '蒸氣便當機', desc: '熱便當無人值守', icon: '🍱', href: '/solutions/steam-bento' },
  { label: 'AI 勞動力', desc: '降本增效 30%+', icon: '🤖', href: '/solutions/ai-labor' },
  { label: '幽靈廚房設備', desc: '多平台訂單自動化', icon: '🏗️', href: '/solutions/ghost-kitchen' },
]

const SOLUTIONS = [
  { label: '工廠 / 移工宿舍', icon: '🏭', href: '/solutions?venue=factory' },
  { label: '餐廳 / 外帶店', icon: '🍽️', href: '/solutions?venue=restaurant' },
  { label: '醫院 / 長照機構', icon: '🏥', href: '/solutions?venue=hospital' },
  { label: '軍方 / 封閉場域', icon: '🪖', href: '/solutions?venue=military' },
  { label: '校園 / 學生宿舍', icon: '🎓', href: '/solutions?venue=campus' },
  { label: '辦公大樓', icon: '🏢', href: '/solutions?venue=office' },
]

const CASES_PREVIEW = [
  { label: '桃園電子廠 320 人', result: '夜班覆蓋率 0% → 100%', slug: 'frozen-microwave-factory-night-shift' },
  { label: '台中移工宿舍 520 人', result: '離職率 -8%', slug: 'migrant-dormitory' },
  { label: '新北早午餐連鎖 970 店', result: '外帶等待 8min → 1.1min', slug: 'smart-locker-brunch-chain' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdown, setDropdown] = useState<'products' | 'solutions' | 'cases' | null>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const close = () => setDropdown(null)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0E1A]/95 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight flex-shrink-0">
          <span className="text-[var(--accent)]">銓幻元</span>
          <span className="text-white/60 ml-1 text-sm font-normal">mcstation.ai</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" onClick={e => e.stopPropagation()}>

          {/* 產品 dropdown */}
          <div className="relative">
            <button
              className={`px-4 py-2 text-sm rounded-lg transition-colors flex items-center gap-1 ${
                dropdown === 'products' ? 'text-[var(--accent)] bg-white/5' : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
              onClick={() => setDropdown(dropdown === 'products' ? null : 'products')}
            >
              產品
              <span className="text-xs opacity-50">{dropdown === 'products' ? '▲' : '▼'}</span>
            </button>
            {dropdown === 'products' && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-[#0d1523]/98 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl p-3">
                <p className="text-xs text-white/40 px-2 mb-2 uppercase tracking-widest">全系列設備</p>
                {PRODUCTS.map(p => (
                  <Link
                    key={p.href}
                    href={p.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors"
                    onClick={() => setDropdown(null)}
                  >
                    <span className="text-xl flex-shrink-0">{p.icon}</span>
                    <div>
                      <div className="text-sm font-semibold text-white">{p.label}</div>
                      <div className="text-xs text-white/40">{p.desc}</div>
                    </div>
                  </Link>
                ))}
                <div className="border-t border-white/10 mt-2 pt-2">
                  <Link href="/products" className="block text-center text-xs text-[var(--accent)] py-1.5 hover:underline" onClick={() => setDropdown(null)}>
                    查看所有產品規格 →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* 解決方案 dropdown */}
          <div className="relative">
            <button
              className={`px-4 py-2 text-sm rounded-lg transition-colors flex items-center gap-1 ${
                dropdown === 'solutions' ? 'text-[var(--accent)] bg-white/5' : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
              onClick={() => setDropdown(dropdown === 'solutions' ? null : 'solutions')}
            >
              場域解決方案
              <span className="text-xs opacity-50">{dropdown === 'solutions' ? '▲' : '▼'}</span>
            </button>
            {dropdown === 'solutions' && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-[#0d1523]/98 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl p-3">
                <p className="text-xs text-white/40 px-2 mb-2 uppercase tracking-widest">依場域選擇</p>
                {SOLUTIONS.map(s => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                    onClick={() => setDropdown(null)}
                  >
                    <span className="text-lg">{s.icon}</span>
                    <span className="text-sm text-white/80">{s.label}</span>
                  </Link>
                ))}
                <div className="border-t border-white/10 mt-2 pt-2">
                  <Link href="/solutions" className="block text-center text-xs text-[var(--accent)] py-1.5 hover:underline" onClick={() => setDropdown(null)}>
                    所有解決方案 →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* 成功案例 dropdown */}
          <div className="relative">
            <button
              className={`px-4 py-2 text-sm rounded-lg transition-colors flex items-center gap-1 ${
                dropdown === 'cases' ? 'text-[var(--accent)] bg-white/5' : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
              onClick={() => setDropdown(dropdown === 'cases' ? null : 'cases')}
            >
              成功案例
              <span className="text-xs opacity-50">{dropdown === 'cases' ? '▲' : '▼'}</span>
            </button>
            {dropdown === 'cases' && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-[#0d1523]/98 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl p-3">
                <p className="text-xs text-white/40 px-2 mb-2 uppercase tracking-widest">精選客戶案例</p>
                {CASES_PREVIEW.map(c => (
                  <Link
                    key={c.slug}
                    href={`/cases#${c.slug}`}
                    className="block px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors"
                    onClick={() => setDropdown(null)}
                  >
                    <div className="text-sm font-medium text-white">{c.label}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--accent)' }}>✓ {c.result}</div>
                  </Link>
                ))}
                <div className="border-t border-white/10 mt-2 pt-2">
                  <Link href="/cases" className="block text-center text-xs text-[var(--accent)] py-1.5 hover:underline" onClick={() => setDropdown(null)}>
                    查看所有案例 →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/blog"
            className="px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            知識庫
          </Link>

          <Link
            href="/about"
            className="px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            關於我們
          </Link>
        </nav>

        {/* CTA */}
        <Link
          href="/ai-advisor"
          className="hidden md:block px-5 py-2 font-semibold text-sm rounded-full hover:brightness-110 transition flex-shrink-0"
          style={{ background: 'var(--accent)', color: '#0A0E1A' }}
        >
          AI 諮詢 →
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/70 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="開啟選單"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0A0E1A]/98 backdrop-blur-md border-b border-white/10">
          <div className="px-6 py-4 space-y-1">
            <p className="text-xs text-white/30 uppercase tracking-widest pt-2 pb-1">產品</p>
            {PRODUCTS.map(p => (
              <Link
                key={p.href}
                href={p.href}
                className="flex items-center gap-3 py-2.5 text-sm text-white/70"
                onClick={() => setMenuOpen(false)}
              >
                <span>{p.icon}</span>
                <div>
                  <div className="font-medium text-white/90">{p.label}</div>
                  <div className="text-xs text-white/40">{p.desc}</div>
                </div>
              </Link>
            ))}
            <div className="border-t border-white/10 my-3" />
            <Link href="/solutions" className="block py-2.5 text-sm text-white/70" onClick={() => setMenuOpen(false)}>場域解決方案</Link>
            <Link href="/cases" className="block py-2.5 text-sm text-white/70" onClick={() => setMenuOpen(false)}>成功案例</Link>
            <Link href="/blog" className="block py-2.5 text-sm text-white/70" onClick={() => setMenuOpen(false)}>知識庫</Link>
            <Link href="/about" className="block py-2.5 text-sm text-white/70 border-b border-white/5" onClick={() => setMenuOpen(false)}>關於我們</Link>
            <Link
              href="/ai-advisor"
              className="block mt-4 text-center py-2.5 font-semibold text-sm rounded-full"
              style={{ background: 'var(--accent)', color: '#0A0E1A' }}
              onClick={() => setMenuOpen(false)}
            >
              AI 諮詢 →
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
