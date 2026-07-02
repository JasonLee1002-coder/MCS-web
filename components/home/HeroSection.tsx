'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Buildings, Tag, Handshake, Wrench } from '@phosphor-icons/react'

const roles = [
  { role: 'venue' as const, label: '我是場地主', sublabel: '評估收益、安裝設備', Icon: Buildings, href: '/ai-advisor?role=venue', color: '#00C6AD' },
  { role: 'brand' as const, label: '我是品牌商', sublabel: '上架產品、拓展通路', Icon: Tag, href: '/ai-advisor?role=brand', color: '#F5A623' },
  { role: 'franchise' as const, label: '我要加盟', sublabel: '設備創業、自己當老闆', Icon: Handshake, href: '/ai-advisor?role=franchise', color: '#7B61FF' },
  { role: 'custom' as const, label: '客製化需求', sublabel: '特殊場景、客製設備', Icon: Wrench, href: '/ai-advisor?role=custom', color: '#FF6B6B' },
]

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]
const container = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

export default function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Background video */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-[0.12]"
        poster="/images/hero-poster.jpg"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Gradient: stronger on left, fades right */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E1A] via-[#0A0E1A]/92 to-[#0A0E1A]/55" />

      {/* Ambient glow */}
      <div className="absolute top-1/4 -left-32 w-[520px] h-[520px] rounded-full bg-[#00C6AD]/[0.06] blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[360px] h-[360px] rounded-full bg-[#7B61FF]/[0.05] blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-24 pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ─── Left: copy + role selector ─── */}
          <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col">

            {/* Brand pill */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00C6AD]/10 border border-[#00C6AD]/22 text-[#00C6AD] text-[11px] font-semibold tracking-wide mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C6AD] animate-pulse" />
                銓幻元科技 · mcstation.ai
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-6xl lg:text-[4.25rem] font-black leading-[1.04] tracking-tight mb-6 text-white"
            >
              智慧設備<br />
              <span className="shimmer-text">讓生意更聰明</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base md:text-[1.05rem] text-white/48 mb-10 max-w-[26rem] leading-relaxed"
            >
              GraBox、冷凍微波販賣機、智慧設備一站式服務。告訴 AI 你的需求，3 分鐘找到最適合你的方案。
            </motion.p>

            {/* Role selector 2x2 */}
            <motion.div variants={container} className="grid grid-cols-2 gap-3 max-w-[26rem]">
              {roles.map(({ role, label, sublabel, Icon, href, color }) => (
                <motion.div key={role} variants={fadeUp}>
                  <Link
                    href={href}
                    style={{ '--rc': color } as React.CSSProperties}
                    className="group flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-[var(--rc)]/40 hover:bg-[var(--rc)]/[0.07] transition-all duration-250 hover:-translate-y-0.5"
                  >
                    <span
                      className="mt-0.5 p-1.5 rounded-lg shrink-0"
                      style={{ background: `${color}1a`, color }}
                    >
                      <Icon size={15} weight="bold" />
                    </span>
                    <div>
                      <p className="text-[13px] font-semibold text-white leading-snug">{label}</p>
                      <p className="text-[11px] text-white/38 mt-0.5 leading-relaxed">{sublabel}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ─── Right: product bento ─── */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.25, ease: EASE }}
            className="hidden lg:grid gap-4"
          >
            {/* Hero product card */}
            <div className="relative overflow-hidden rounded-2xl bg-[#111827] border border-white/10 h-[260px] group">
              <Image
                src="/images/products/grabox.jpg"
                alt="GraBox 自助取餐櫃"
                fill
                priority
                className="object-cover opacity-65 transition-transform duration-700 group-hover:scale-[1.03]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/smart-food-locker-delivery/640/420'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A]/90 via-[#0A0E1A]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-[11px] text-[#00C6AD] font-semibold uppercase tracking-[0.15em] mb-1">主打產品</p>
                <h3 className="text-[1.3rem] font-bold text-white leading-snug">GraBox 自助取餐櫃</h3>
                <p className="text-white/45 text-sm mt-1">尖峰出餐效率 +40%</p>
              </div>
            </div>

            {/* Two stat cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative overflow-hidden rounded-2xl bg-[#111827] border border-white/10 h-[140px] p-5">
                <Image
                  src="/images/products/frozen-vending.jpg"
                  alt="冷凍微波販賣機"
                  fill
                  className="object-cover opacity-25"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/vending-machine-frozen-food/320/220'
                  }}
                />
                <div className="absolute inset-0 bg-[#0A0E1A]/55" />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <p className="text-[11px] text-white/38">冷凍微波販賣機</p>
                  <div>
                    <p className="text-[2rem] font-black text-[#7B61FF] leading-none">24hr</p>
                    <p className="text-[11px] text-white/45 mt-1">無人化熱食供應</p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl bg-[#111827] border border-white/10 h-[140px] p-5">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00C6AD]/[0.08] to-transparent" />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <p className="text-[11px] text-white/38">全台設備</p>
                  <div>
                    <p className="text-[2rem] font-black text-[#00C6AD] leading-none">500+</p>
                    <p className="text-[11px] text-white/45 mt-1">台在線運作</p>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {['餐飲', '零售', '辦公', '校園'].map(tag => (
                      <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#00C6AD]/10 text-[#00C6AD]/65">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
