'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const roles = [
  { label: '場地主', href: '/ai-advisor?role=venue' },
  { label: '品牌商', href: '/ai-advisor?role=brand' },
  { label: '加盟合作', href: '/ai-advisor?role=franchise' },
  { label: '客製化', href: '/ai-advisor?role=custom' },
]

function MCSLogo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-xl bg-[#00C6AD] flex items-center justify-center shadow-sm">
        <span className="text-white font-black text-sm leading-none">M</span>
      </div>
      <div className="flex flex-col leading-none">
        <span className={`font-black text-sm tracking-tight ${dark ? 'text-gray-800' : 'text-white'}`}>銓幻元科技</span>
        <span className={`text-[10px] font-medium ${dark ? 'text-gray-400' : 'text-white/50'}`}>mcstation.ai</span>
      </div>
    </Link>
  )
}

function AdvisorNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
        {/* Back button */}
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-500 hover:text-[#00C6AD] transition-colors px-3 py-2 rounded-xl hover:bg-gray-50 group"
        >
          <svg
            width="20" height="20" fill="none" stroke="currentColor"
            strokeWidth="2.5" viewBox="0 0 24 24"
            className="group-hover:-translate-x-0.5 transition-transform"
          >
            <path d="M19 12H5M5 12l7-7M5 12l7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-sm font-semibold">返回首頁</span>
        </Link>

        <div className="w-px h-6 bg-gray-200" />

        <MCSLogo dark />

        {/* Role quick links */}
        <nav className="hidden lg:flex items-center gap-1 ml-6">
          {roles.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-[#00C6AD] hover:bg-[#00C6AD]/8 rounded-lg transition-colors"
            >
              {r.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto">
          <div className="flex items-center gap-2 bg-[#00C6AD]/10 text-[#00C6AD] px-3 py-1.5 rounded-full text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C6AD] animate-pulse" />
            AI 顧問上線中
          </div>
        </div>
      </div>
    </header>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isAdvisor = pathname?.startsWith('/ai-advisor')

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  if (isAdvisor) return <AdvisorNav />

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0E1A]/90 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <MCSLogo />

        <nav className="hidden md:flex items-center gap-1">
          {roles.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="px-4 py-2 text-sm text-white/70 hover:text-[var(--accent)] hover:bg-white/5 rounded-lg transition-colors"
            >
              {r.label}
            </Link>
          ))}
          <Link
            href="/blog"
            className="px-4 py-2 text-sm text-white/70 hover:text-[var(--accent)] hover:bg-white/5 rounded-lg transition-colors"
          >
            知識庫
          </Link>
        </nav>

        <Link
          href="/ai-advisor"
          className="hidden md:block px-5 py-2 bg-[var(--accent)] text-[#0A0E1A] font-semibold text-sm rounded-full hover:brightness-110 transition"
        >
          AI 諮詢 →
        </Link>

        <button
          className="md:hidden text-white/70 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#0A0E1A]/95 backdrop-blur-md border-b border-white/10 px-6 pb-4">
          {roles.map((r) => (
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
