'use client'
import Image from 'next/image'
import { Case } from '@/lib/cases'

interface CaseCardProps {
  data: Case
  className?: string
}

const categoryAccent: Record<string, string> = {
  '餐飲連鎖': '#00C6AD',
  '零售':     '#F5A623',
  '交通樞紐': '#7B61FF',
  '辦公室':   '#00C6AD',
  '場館':     '#F5A623',
  '校園':     '#00C6AD',
}

const picsumSeeds: Record<string, string> = {
  '餐飲連鎖': 'restaurant-chain-fast-food',
  '零售':     'convenience-store-interior',
  '交通樞紐': 'train-station-platform',
  '辦公室':   'modern-office-building',
  '場館':     'sports-venue-indoor',
  '校園':     'university-campus-building',
}

export default function CaseCard({ data, className = '' }: CaseCardProps) {
  const accent = categoryAccent[data.category] ?? '#00C6AD'
  const seed = picsumSeeds[data.category] ?? 'vending-machine-store'

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-[#111827] border border-white/10 cursor-pointer ${className}`}
    >
      {/* Photo */}
      <div className="absolute inset-0">
        <Image
          src={data.image}
          alt={data.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${seed}/640/420`
          }}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A]/90 via-[#0A0E1A]/25 to-transparent" />

      {/* Hover tint */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: `${accent}0d` }}
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <span
          className="inline-block text-[11px] px-2.5 py-1 rounded-full mb-2.5 font-semibold"
          style={{ background: `${accent}1e`, color: accent }}
        >
          {data.category}
        </span>
        <h3 className="text-white font-bold text-sm md:text-[0.95rem] leading-snug">{data.title}</h3>
        <p className="text-white/52 text-xs mt-1 line-clamp-2">{data.description}</p>

        {data.metrics && (
          <div className="flex gap-5 mt-3">
            {data.metrics.map((m) => (
              <div key={m.label}>
                <p className="font-bold text-lg leading-none" style={{ color: accent }}>{m.value}</p>
                <p className="text-white/38 text-[11px] mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
