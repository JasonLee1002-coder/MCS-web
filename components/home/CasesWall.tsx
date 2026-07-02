'use client'
import { motion } from 'framer-motion'
import { cases } from '@/lib/cases'
import CaseCard from '@/components/ui/CaseCard'

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.65, delay, ease: EASE },
})

export default function CasesWall() {
  const heroCase = cases.find((c) => c.size === 'hero')!
  const mediumCases = cases.filter((c) => c.size === 'medium')
  const smallCases = cases.filter((c) => c.size === 'small')

  return (
    <section className="py-24 px-6 max-w-[1400px] mx-auto">

      {/* Section header — no eyebrow */}
      <motion.div {...fadeUp()} className="mb-12">
        <h2 className="text-4xl md:text-5xl font-black text-white">
          真實案例，<br />
          <span className="text-white/32">看見改變</span>
        </h2>
      </motion.div>

      {/* Magazine grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

        {/* Hero case: 2 cols, tall */}
        <motion.div {...fadeUp(0.05)} className="col-span-2 md:col-span-2 h-[300px] md:h-[480px]">
          <CaseCard data={heroCase} className="h-full" />
        </motion.div>

        {mediumCases.map((c, i) => (
          <motion.div key={c.id} {...fadeUp(0.1 + i * 0.08)} className="h-[200px] md:h-[230px]">
            <CaseCard data={c} className="h-full" />
          </motion.div>
        ))}

        {smallCases.map((c, i) => (
          <motion.div key={c.id} {...fadeUp(0.18 + i * 0.08)} className="h-[180px] md:h-[200px]">
            <CaseCard data={c} className="h-full" />
          </motion.div>
        ))}
      </div>

      {/* Stats bar */}
      <motion.div {...fadeUp(0.3)} className="mt-4">
        <div className="relative rounded-2xl overflow-hidden h-[160px] md:h-[200px] bg-[#111827] border border-white/10">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-30">
            <source src="/videos/cases-reel.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E1A]/88 to-transparent" />
          <div className="absolute inset-0 flex items-center px-10">
            <div>
              <p className="text-3xl md:text-4xl font-black text-white">
                全台 <span className="text-[#00C6AD]">500+</span> 台設備
              </p>
              <p className="text-white/42 mt-1.5 text-sm">持續擴張中 · 服務 30+ 產業別</p>
            </div>
          </div>
        </div>
      </motion.div>

    </section>
  )
}
