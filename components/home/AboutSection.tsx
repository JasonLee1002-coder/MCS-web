'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

const stats = [
  { value: '500+', label: '部署設備台數' },
  { value: '30+', label: '服務產業別' },
  { value: '200+', label: '合作場域' },
  { value: '99.5%', label: '設備在線率' },
]

const strengths = [
  { icon: '🏭', title: '台灣研發製造', desc: '軟硬體設計一條龍，品質可控' },
  { icon: '🤖', title: 'AI 驅動', desc: '智慧化管理，降低人力成本' },
  { icon: '🔗', title: '一站式整合', desc: '從設備到系統，全程陪跑' },
  { icon: '🎨', title: 'OEM/ODM 客製', desc: '品牌貼牌，100% 客製化' },
]

export default function AboutSection() {
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

  return (
    <section id="about" ref={sectionRef} className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left - Text */}
        <div>
          <div className="reveal">
            <p className="text-xs tracking-[0.3em] text-[var(--accent)] uppercase mb-3">About Us</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              關於<br />
              <span className="text-white/40">銓幻元科技</span>
            </h2>
            <p className="text-white/65 text-lg leading-relaxed mb-4">
              <span className="text-white font-semibold">Meta Clearing Station Pte. Ltd.（銓幻元科技）</span>{' '}
              是線下自助服務設備的一站式整合商，專注於 AI 智慧設備與商業系統的深度整合。
            </p>
            <p className="text-white/55 leading-relaxed mb-8">
              從 GraBox 自助取餐櫃、冷凍微波販賣機到智慧販賣機，我們為餐飲連鎖、交通樞紐、辦公室、校園等各類場域提供完整的硬體部署、系統整合與後台管理服務，協助企業實現真正的無人化智慧營運。
            </p>
          </div>

          {/* Strengths */}
          <div className="reveal grid grid-cols-2 gap-4" style={{ transitionDelay: '0.1s' }}>
            {strengths.map((s) => (
              <div key={s.title} className="flex items-start gap-3 p-4 rounded-xl bg-[var(--bg-card)] border border-white/8">
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <p className="text-white font-semibold text-sm">{s.title}</p>
                  <p className="text-white/45 text-xs mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Visual + Stats */}
        <div className="reveal" style={{ transitionDelay: '0.2s' }}>
          <div className="relative rounded-2xl overflow-hidden mb-8">
            <Image
              src="/images/09_ecosystem.png"
              alt="銓幻元 智慧設備生態系統"
              width={600}
              height={400}
              className="w-full h-auto opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A]/60 to-transparent" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-4 rounded-xl bg-[var(--bg-card)] border border-white/8">
                <p className="text-2xl font-black text-[var(--accent)]">{stat.value}</p>
                <p className="text-white/45 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
