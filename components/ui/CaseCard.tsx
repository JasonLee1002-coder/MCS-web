import Image from 'next/image'
import { Case } from '@/lib/cases'

interface CaseCardProps {
  data: Case
  className?: string
}

export default function CaseCard({ data, className = '' }: CaseCardProps) {
  return (
    <div className={`group relative overflow-hidden rounded-2xl bg-[var(--bg-card)] border border-white/10 cursor-pointer ${className}`}>
      {/* Gradient placeholder (shown when image fails/missing) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-card)] to-[#1a2540]" />

      {/* Image */}
      <div className="absolute inset-0">
        <Image
          src={data.image}
          alt={data.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).style.opacity = '0'
          }}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <span className="inline-block text-xs px-2 py-1 bg-[var(--accent)]/20 text-[var(--accent)] rounded-full mb-2">
          {data.category}
        </span>
        <h3 className="text-white font-bold text-sm md:text-base leading-snug">{data.title}</h3>
        <p className="text-white/60 text-xs mt-1 line-clamp-2">{data.description}</p>

        {data.metrics && (
          <div className="flex gap-4 mt-3">
            {data.metrics.map((m) => (
              <div key={m.label}>
                <p className="text-[var(--accent)] font-bold text-lg leading-none">{m.value}</p>
                <p className="text-white/40 text-xs mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
