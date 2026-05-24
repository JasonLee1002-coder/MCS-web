'use client'

interface DemoModeToggleProps {
  isDemo: boolean
  onToggle: () => void
}

export default function DemoModeToggle({ isDemo, onToggle }: DemoModeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`
        fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold
        transition-all duration-300 shadow-xl
        ${isDemo
          ? 'bg-[var(--accent-warm)] text-[#0A0E1A] shadow-[0_0_24px_rgba(245,166,35,0.4)]'
          : 'bg-[#111827] border border-white/20 text-white/60 hover:border-white/40 hover:text-white'
        }
      `}
    >
      <span>💼</span>
      {isDemo ? '業務模式 ON' : '業務模式'}
    </button>
  )
}
