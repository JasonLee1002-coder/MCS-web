'use client'
import { useEffect, useRef } from 'react'
import { cases } from '@/lib/cases'
import CaseCard from '@/components/ui/CaseCard'

export default function CasesWall() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        })
      },
      { threshold: 0.1 }
    )
    const els = sectionRef.current?.querySelectorAll('.reveal')
    els?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const heroCase = cases.find((c) => c.size === 'hero')!
  const mediumCases = cases.filter((c) => c.size === 'medium')
  const smallCases = cases.filter((c) => c.size === 'small')

  return (
    <section id="cases" ref={sectionRef} className="py-24 px-6 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="reveal mb-12">
        <p className="text-xs tracking-[0.3em] text-[var(--accent)] uppercase mb-3">Success Stories</p>
        <h2 className="text-4xl md:text-5xl font-black text-white">
          真實案例，<br />
          <span className="text-white/40">看見改變</span>
        </h2>
      </div>

      {/* Magazine grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Hero case — spans 2 cols, 2 rows */}
        <div className="reveal col-span-2 md:col-span-2 h-[300px] md:h-[480px]" style={{ transitionDelay: '0.1s' }}>
          <CaseCard data={heroCase} className="h-full" />
        </div>

        {/* Medium cases */}
        {mediumCases.map((c, i) => (
          <div key={c.id} className="reveal h-[200px] md:h-[230px]" style={{ transitionDelay: `${0.2 + i * 0.1}s` }}>
            <CaseCard data={c} className="h-full" />
          </div>
        ))}

        {/* Small cases */}
        {smallCases.map((c, i) => (
          <div key={c.id} className="reveal h-[180px] md:h-[200px]" style={{ transitionDelay: `${0.4 + i * 0.1}s` }}>
            <CaseCard data={c} className="h-full" />
          </div>
        ))}
      </div>

      {/* Video reel bar */}
      <div className="reveal mt-4" style={{ transitionDelay: '0.6s' }}>
        <div className="relative rounded-2xl overflow-hidden h-[160px] md:h-[200px] bg-[var(--bg-card)] border border-white/10">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-40">
            <source src="/videos/cases-reel.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E1A]/80 to-transparent" />
          <div className="absolute inset-0 flex items-center px-10">
            <div>
              <p className="text-3xl md:text-4xl font-black text-white">全台 <span className="text-[var(--accent)]">500+</span> 台設備</p>
              <p className="text-white/50 mt-1">持續擴張中 · 服務 30+ 產業別</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
