'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

const services = [
  {
    title: 'GraBox 智取櫃',
    subtitle: 'AI 訂餐 | 自助取餐',
    description: '結合 AI 技術的智慧取餐櫃，提供 LINE / APP 掃碼取餐，與 POS 系統無縫整合。尖峰時段出餐效率提升 40%。',
    image: '/images/01_grabox_main.png',
    tags: ['LINE 取餐', 'QR Code', 'POS 整合'],
  },
  {
    title: '冷凍微波販賣機',
    subtitle: '24hr 無人熱食供應',
    description: '內建微波爐，冷凍食品即買即熱。適合交通樞紐、醫院、校園、24 小時場域，無需人力駐守。',
    image: '/images/03_smart_vending.png',
    tags: ['-18°C 冷凍', '90 秒加熱', '24hr 營運'],
  },
  {
    title: 'OEM / ODM 貼牌客製',
    subtitle: '台灣設計製造',
    description: '從外觀設計到軟體介面，全程客製化。支援企業品牌貼牌需求，打造專屬智慧設備。',
    image: '/images/05_oem_factory.png',
    tags: ['品牌客製', '硬體設計', '軟體整合'],
  },
  {
    title: 'POS / KDS 系統串接',
    subtitle: '餐飲零售數位化',
    description: '提供 POS 點餐系統、KDS 廚房顯示系統完整串接，讓餐飲零售業者輕鬆實現數位轉型。',
    image: '/images/04_pos_kds.png',
    tags: ['POS 整合', 'KDS', '即時訂單'],
  },
  {
    title: 'OmniCore 後台平台',
    subtitle: '即時數據 · 智能管理',
    description: '統一後台管理平台，即時監控設備狀態、庫存水位、銷售報表，支援多台設備跨場域管理。',
    image: '/images/06_dashboard.png',
    tags: ['即時監控', '庫存管理', '銷售報表'],
  },
  {
    title: '企業會員系統整合',
    subtitle: 'ERP | 商務流程自動化',
    description: '整合企業會員管理、ERP 系統、商務流程自動化與資料分析平台，建立完整數位會員經營體系。',
    image: '/images/07_membership_app.png',
    tags: ['會員管理', 'ERP 整合', 'LINE 串接'],
  },
]

export default function ServicesSection() {
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
    <section id="services" ref={sectionRef} className="py-24 px-6 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="reveal mb-16 text-center">
        <p className="text-xs tracking-[0.3em] text-[var(--accent)] uppercase mb-3">Our Services</p>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
          六大服務方案
        </h2>
        <p className="text-white/50 text-lg max-w-2xl mx-auto">
          從硬體設備到後台系統，銓幻元提供一站式線下自助服務整合，為各產業打造智慧化營運體驗。
        </p>
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <div
            key={service.title}
            className="reveal group bg-[var(--bg-card)] border border-white/8 rounded-2xl overflow-hidden hover:border-[var(--accent)]/40 transition-all duration-300 hover:-translate-y-1"
            style={{ transitionDelay: `${i * 0.08}s` }}
          >
            {/* Image */}
            <div className="relative h-44 overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-xs text-[var(--accent)] mb-1 font-medium">{service.subtitle}</p>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed mb-4">{service.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-white/8 text-white/60 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
