'use client'
import { useRef } from 'react'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { products } from '@/lib/products'
import ProductCard from '@/components/ui/ProductCard'

export default function ProductsSlider() {
  const sliderRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    sliderRef.current?.scrollBy({ left: dir === 'right' ? 420 : -420, behavior: 'smooth' })
  }

  return (
    <section className="py-24 overflow-hidden">
      {/* Header — no eyebrow */}
      <div className="px-6 max-w-[1400px] mx-auto flex items-end justify-between mb-10">
        <h2 className="text-4xl md:text-5xl font-black text-white">
          智慧設備<br />
          <span className="text-white/32">一次看清楚</span>
        </h2>

        <div className="hidden md:flex gap-2">
          {(['left', 'right'] as const).map((dir) => (
            <button
              key={dir}
              onClick={() => scroll(dir)}
              aria-label={dir === 'left' ? '向左滑動' : '向右滑動'}
              className="w-10 h-10 rounded-full border border-white/12 text-white/45 hover:border-[#00C6AD]/55 hover:text-[#00C6AD] hover:bg-[#00C6AD]/[0.08] transition-all duration-200 flex items-center justify-center"
            >
              {dir === 'left'
                ? <CaretLeft size={15} weight="bold" />
                : <CaretRight size={15} weight="bold" />
              }
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal slider */}
      <div
        ref={sliderRef}
        className="flex gap-6 px-6 overflow-x-auto scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex-shrink-0 w-0 md:w-[max(0px,calc((100vw-1400px)/2))]" />
        {products.map((p) => (
          <ProductCard key={p.id} data={p} />
        ))}
        <div className="flex-shrink-0 w-6" />
      </div>
    </section>
  )
}
