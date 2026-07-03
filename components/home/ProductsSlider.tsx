'use client'
import { useRef } from 'react'
import { products } from '@/lib/products'
import ProductCard from '@/components/ui/ProductCard'

export default function ProductsSlider() {
  const sliderRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    sliderRef.current?.scrollBy({ left: dir === 'right' ? 420 : -420, behavior: 'smooth' })
  }

  return (
    <section id="products" className="py-24 overflow-hidden">
      {/* Header */}
      <div className="px-6 max-w-7xl mx-auto flex items-end justify-between mb-10">
        <div>
          <p className="text-xs tracking-[0.3em] text-[var(--accent)] uppercase mb-3">Our Products</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            智慧設備<br />
            <span className="text-white/40">一次看清楚</span>
          </h2>
        </div>
        <div className="hidden md:flex gap-2">
          {(['left', 'right'] as const).map((dir) => (
            <button
              key={dir}
              onClick={() => scroll(dir)}
              className="w-10 h-10 rounded-full border border-white/20 text-white/60 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors flex items-center justify-center"
            >
              {dir === 'left' ? '←' : '→'}
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
        <div className="flex-shrink-0 w-0 md:w-[max(0px,calc((100vw-1280px)/2))]" />
        {products.map((p) => (
          <ProductCard key={p.id} data={p} />
        ))}
        <div className="flex-shrink-0 w-6" />
      </div>
    </section>
  )
}
