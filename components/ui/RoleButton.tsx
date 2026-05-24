'use client'
import Link from 'next/link'

interface RoleButtonProps {
  role: 'venue' | 'brand' | 'franchise' | 'custom'
  label: string
  sublabel: string
  emoji: string
  href: string
}

const gradients = {
  venue:     'from-[#00C6AD]/20 to-[#00C6AD]/5 hover:from-[#00C6AD]/30 border-[#00C6AD]/30 hover:border-[#00C6AD]/60',
  brand:     'from-[#F5A623]/20 to-[#F5A623]/5 hover:from-[#F5A623]/30 border-[#F5A623]/30 hover:border-[#F5A623]/60',
  franchise: 'from-[#7B61FF]/20 to-[#7B61FF]/5 hover:from-[#7B61FF]/30 border-[#7B61FF]/30 hover:border-[#7B61FF]/60',
  custom:    'from-[#FF6B6B]/20 to-[#FF6B6B]/5 hover:from-[#FF6B6B]/30 border-[#FF6B6B]/30 hover:border-[#FF6B6B]/60',
}

export default function RoleButton({ role, label, sublabel, emoji, href }: RoleButtonProps) {
  return (
    <Link
      href={href}
      className={`
        group relative flex flex-col items-center gap-3 p-6 rounded-2xl
        bg-gradient-to-b ${gradients[role]}
        border transition-all duration-300
        hover:scale-105 hover:shadow-2xl active:scale-100
      `}
    >
      <span className="text-4xl">{emoji}</span>
      <span className="text-base font-bold text-white">{label}</span>
      <span className="text-xs text-white/50 text-center leading-relaxed">{sublabel}</span>
      <span className="absolute bottom-3 right-4 text-white/20 text-xs group-hover:text-white/60 transition-colors">→</span>
    </Link>
  )
}
