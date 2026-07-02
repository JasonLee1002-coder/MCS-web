import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { Product } from '@/lib/products'

export default function ProductCard({ data }: { data: Product }) {
  return (
    <div className="group flex-shrink-0 w-[320px] md:w-[380px] relative overflow-hidden rounded-2xl bg-[#111827] border border-white/10 hover:border-[#00C6AD]/38 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(0,198,173,0.09)]">

      {/* Image */}
      <div className="relative h-[220px] overflow-hidden bg-gradient-to-br from-[#1a2540] to-[#111827]">
        <Image
          src={data.image}
          alt={data.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111827]/75" />
        <span className="absolute top-4 left-4 px-3 py-1 bg-[#00C6AD]/12 border border-[#00C6AD]/22 rounded-full text-[11px] text-[#00C6AD] font-semibold">
          {data.highlight}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-[1.2rem] font-bold text-white mb-1">{data.name}</h3>
        <p className="text-sm text-[#00C6AD]/75 mb-3">{data.tagline}</p>
        <p className="text-sm text-white/42 leading-relaxed mb-5">{data.description}</p>

        {/* Specs: clean 2x2 grid */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-3 mb-5 pb-5 border-b border-white/[0.07]">
          {data.specs.map((s) => (
            <div key={s.label}>
              <p className="text-[10px] text-white/32 uppercase tracking-widest">{s.label}</p>
              <p className="text-xs text-white/78 font-medium mt-0.5">{s.value}</p>
            </div>
          ))}
        </div>

        <Link
          href={`/ai-advisor?role=${data.targetRoles[0]}&product=${data.id}`}
          className="flex items-center justify-center gap-2 py-2.5 bg-[#00C6AD]/10 text-[#00C6AD] rounded-xl text-sm font-semibold hover:bg-[#00C6AD] hover:text-[#0A0E1A] transition-all duration-200 group/cta"
        >
          AI 諮詢這款設備
          <ArrowRight
            size={14}
            weight="bold"
            className="group-hover/cta:translate-x-0.5 transition-transform duration-200"
          />
        </Link>
      </div>
    </div>
  )
}
