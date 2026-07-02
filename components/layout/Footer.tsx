'use client'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()
  // Hide footer on ai-advisor page (full-screen experience)
  if (pathname?.startsWith('/ai-advisor')) return null

  return (
    <footer className="border-t border-white/10 bg-[#060A14] py-12 mt-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-8">
        <div>
          <p className="text-lg font-bold text-[var(--accent)]">銓幻元科技</p>
          <p className="text-sm text-white/50 mt-1">META CLEARING STATION PTE. LTD.</p>
          <p className="text-sm text-white/40 mt-4">138 Cecil Street, #13-02, Singapore</p>
          <p className="text-sm text-white/40">台北市大同區長安西路78巷4弄10號1樓</p>
          <p className="text-sm text-white/40 mt-2">service@transtep.com</p>
          <p className="text-sm text-white/40">業務：henry.ho@transtep.com</p>
          <div className="flex gap-3 mt-3">
            <a href="https://lin.ee/mcstation"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white"
              style={{ background: '#06C755' }}>
              LINE 諮詢
            </a>
            <a href="/contact"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white/70 border border-white/20 hover:border-white/40 transition-colors">
              聯絡我們
            </a>
          </div>
        </div>
        <div className="flex gap-12 text-sm text-white/50">
          <div className="flex flex-col gap-2">
            <p className="text-white/80 font-medium mb-1">產品</p>
            <a href="/ai-advisor?role=venue" className="hover:text-[var(--accent)] transition-colors">GraBox 取餐櫃</a>
            <a href="/ai-advisor?role=venue" className="hover:text-[var(--accent)] transition-colors">冷凍微波機</a>
            <a href="/ai-advisor?role=brand" className="hover:text-[var(--accent)] transition-colors">智慧販賣機</a>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-white/80 font-medium mb-1">合作</p>
            <a href="/ai-advisor?role=venue" className="hover:text-[var(--accent)] transition-colors">我是場地主</a>
            <a href="/ai-advisor?role=brand" className="hover:text-[var(--accent)] transition-colors">我是品牌商</a>
            <a href="/ai-advisor?role=franchise" className="hover:text-[var(--accent)] transition-colors">加盟合作</a>
            <a href="/ai-advisor?role=custom" className="hover:text-[var(--accent)] transition-colors">客製化</a>
          </div>
        </div>
        <p className="text-xs text-white/30 self-end">
          © 2026 銓幻元科技 mcstation.ai. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
