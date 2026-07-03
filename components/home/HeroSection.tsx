import RoleButton from '@/components/ui/RoleButton'

const roles = [
  { role: 'venue' as const, label: '我是場地主', sublabel: '評估場地收益、安裝設備', emoji: '🏢', href: '/ai-advisor?role=venue' },
  { role: 'brand' as const, label: '我是品牌商', sublabel: '上架產品、拓展通路', emoji: '🏷️', href: '/ai-advisor?role=brand' },
  { role: 'franchise' as const, label: '我要加盟合作', sublabel: '自己當老闆、設備創業', emoji: '🤝', href: '/ai-advisor?role=franchise' },
  { role: 'custom' as const, label: '我要客製化', sublabel: '特殊需求、客製設備', emoji: '⚙️', href: '/ai-advisor?role=custom' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background video */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-25"
        poster="/images/hero-poster.jpg"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E1A]/60 via-[#0A0E1A]/30 to-[#0A0E1A]" />

      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#00C6AD]/8 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-[#F5A623]/5 blur-[100px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <p className="text-xs font-semibold tracking-[0.4em] text-[var(--accent)] uppercase mb-6 opacity-80">
          銓幻元科技 · mcstation.ai
        </p>
        <h1 className="shimmer-text text-5xl md:text-7xl font-black leading-tight mb-6">
          線下自助服務<br />一站式整合商
        </h1>
        <p className="text-lg md:text-xl text-white/55 mb-10 max-w-2xl mx-auto leading-relaxed">
          GraBox 取餐櫃 · 冷凍微波販賣機 · 智慧設備 · POS 系統整合。<br className="hidden md:block" />
          從硬體部署到後台管理，銓幻元讓你的場域智慧升級。
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href="#services"
            className="px-8 py-3.5 rounded-full bg-[var(--accent)] text-[#0A0E1A] font-bold text-base hover:opacity-90 transition-opacity"
          >
            瞭解服務方案
          </a>
          <a
            href="/ai-advisor"
            className="px-8 py-3.5 rounded-full border border-white/30 text-white font-medium text-base hover:bg-white/10 transition-colors"
          >
            AI 顧問諮詢 →
          </a>
        </div>

        {/* Role selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {roles.map((r) => (
            <RoleButton key={r.role} {...r} />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs">
        <span>探索更多</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" style={{ animation: 'bounce-slow 2s ease-in-out infinite' }} />
      </div>
    </section>
  )
}
