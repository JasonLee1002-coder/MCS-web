'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { label: '服務方案', href: '/#services' },
  { label: '成功案例', href: '/#cases' },
  { label: '產品介紹', href: '/#products' },
  { label: '關於我們', href: '/#about' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0E1A]/90 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="text-[var(--accent)]">銓幻元</span>
          <span className="text-white/70 ml-1 text-sm font-normal">mcstation.ai</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="px-4 py-2 text-sm text-white/70 hover:text-[var(--accent)] hover:bg-white/5 rounded-lg transition-colors"
            >
              {r.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/ai-advisor"
          className="hidden md:block px-5 py-2 bg-[var(--accent)] text-[#0A0E1A] font-semibold text-sm rounded-full hover:brightness-110 transition"
        >
          AI 諮詢 →
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white/70 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0A0E1A]/95 backdrop-blur-md border-b border-white/10 px-6 pb-4">
          {navLinks.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="block py-3 text-sm text-white/70 border-b border-white/5 last:border-0"
              onClick={() => setMenuOpen(false)}
            >
              {r.label}
            </Link>
          ))}
          <Link
            href="/ai-advisor"
            className="block mt-4 text-center py-2.5 bg-[var(--accent)] text-[#0A0E1A] font-semibold text-sm rounded-full"
            onClick={() => setMenuOpen(false)}
          >
            AI 諮詢 →
          </Link>
        </div>
      )}
    </header>
  )
}
