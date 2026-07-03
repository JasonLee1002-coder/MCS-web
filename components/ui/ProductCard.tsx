import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/lib/products'

export default function ProductCard({ data }: { data: Product }) {
  return (
    <div className="group flex-shrink-0 w-[320px] md:w-[380px] relative overflow-hidden rounded-2xl bg-[var(--bg-card)] border border-white/10 hover:border-[var(--accent)]/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,198,173,0.1)]">
      {/* Image */}
      <div className="relative h-[220px] overflow-hidden bg-gradient-to-br from-[#1a2540] to-[var(--bg-card)]">
        <Image
          src={data.image}
          alt={data.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg-card)]" />
        {/* highlight badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-[var(--accent)]/20 border border-[var(--accent)]/30 rounded-full text-xs text-[var(--accent)] font-semibold">
          {data.highlight}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-1">{data.name}</h3>
        <p className="text-sm text-[var(--accent)]/80 mb-3">{data.tagline}</p>
        <p className="text-sm text-white/50 leading-relaxed mb-5">{data.description}</p>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          {data.specs.map((s) => (
            <div key={s.label} className="bg-white/5 rounded-lg px-3 py-2">
              <p className="text-xs text-white/40">{s.label}</p>
              <p className="text-xs text-white font-medium mt-0.5">{s.value}</p>
            </div>
          ))}
        </div>

        <Link
          href={`/ai-advisor?role=${data.targetRoles[0]}&product=${data.id}`}
          className="block text-center py-2.5 bg-[var(--accent)]/10 text-[var(--accent)] rounded-xl text-sm font-semibold hover:bg-[var(--accent)] hover:text-[#0A0E1A] transition-colors"
        >
          AI 諮詢這款設備 →
        </Link>
      </div>
    </div>
  )
}
