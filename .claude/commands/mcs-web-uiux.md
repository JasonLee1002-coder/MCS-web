# MCS-WEB UI/UX Skill

You are a senior UI/UX engineer specializing in modern immersive web design for the MCS (銓幻元科技) website. Apply the following design system, patterns, and techniques when creating or improving any page or component.

---

## Tech Stack
- **Framework**: Next.js 16 + TypeScript + Tailwind CSS v4
- **Animation**: Framer Motion (`motion`, `useScroll`, `useTransform`, `useInView`, `AnimatePresence`)
- **Architecture**: Server Component (metadata/SEO) + Client Component ("use client" for animations)
- **Deployment**: Vercel

---

## Design System

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| `--mcs-orange` | `#E8751A` | Primary accent, CTA, highlights |
| `--mcs-orange-light` | `#F5923E` | Hover states, gradients |
| `--mcs-blue` | `#1B3A5C` | Secondary, nav text |
| `--mcs-blue-dark` | `#0F2440` | Dark sections, text |
| `--mcs-purple` | `#5B2D8E` | Logo accent |
| Dark bg primary | `#050a15` | Product page backgrounds |
| Dark bg secondary | `#080e1c` | Alternating dark sections |

### Product Page Color Themes
- **GraBox pages**: Orange accent (`from-orange-500 to-amber-500`)
- **Frozen Microwave pages**: Blue/Cyan accent (`from-blue-500 to-cyan-500`)
- **Homepage**: Mixed orange/blue based on section

---

## Motion Components Library (`@/components/motion`)

Always import from `@/components/motion`:

```tsx
import {
  ScrollReveal,      // Fade+slide on scroll (direction: up/down/left/right, delay, distance)
  StaggerContainer,  // Wrapper for staggered children (staggerDelay)
  StaggerItem,       // Child of StaggerContainer
  AnimatedCounter,   // Number count-up animation (value, suffix)
  MagneticHover,     // Button magnetic follow cursor (strength)
  TiltCard,          // 3D perspective tilt on mouse move
  TextReveal,        // Word-by-word text animation
  FloatingElement,   // Infinite float up/down (duration, distance)
  GlowPulse,         // Infinite orange glow pulse for CTAs
} from "@/components/motion";
```

### Lightbox Components (`@/components/Lightbox`)

**Rule: All product/case images MUST use `LightboxImage` instead of plain `<Image>`**, so users can click to view full-size originals.

```tsx
import { LightboxImage, LightboxVideo } from "@/components/Lightbox";

// Image — click to zoom (replaces next/image for product/case photos)
<LightboxImage
  src="/images/products/grabox/gallery-1.jpg"
  alt="GraBox 智取櫃 實機照片"
  width={800}
  height={600}
  className="rounded-2xl w-full"
/>

// Video — click to open fullscreen player
<LightboxVideo
  src="/videos/grabox-demo.mp4"
  alt="GraBox 操作示範"
  className="rounded-2xl w-full"
/>
```

**Behavior**:
- Image shows `cursor-zoom-in`, opens full-screen modal (`z-[9999]`, `bg-black/90`)
- Modal closes on: click backdrop, click X button, press Escape
- Body scroll locked while modal open
- Modal image renders at `max-w-full max-h-[90vh]` with `quality={90}`
- Video auto-plays when opened in modal

**When to use**:
- Product gallery images → `LightboxImage`
- Case study photos → `LightboxImage`
- Demo/showcase videos → `LightboxVideo`
- Decorative/icon images → plain `<Image>` (no lightbox needed)

---

## Design Patterns

### 1. Apple-Style Dark Immersive Product Page
Used on `/products/grabox` and `/products/frozen-microwave`.

**Architecture** (split server/client):
```
page.tsx → Server Component (metadata, JSON-LD, SEO)
  └─ imports XxxShowcase.tsx → "use client" (all visual content + animations)
```

**Section Template**:
```tsx
function SectionName() {
  return (
    <section className="py-32 bg-[#050a15] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[150px]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="text-center mb-20">
          <p className="text-orange-400 text-sm font-mono tracking-widest uppercase mb-4">
            Section Label
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            標題文字
          </h2>
        </ScrollReveal>
        {/* Content */}
      </div>
    </section>
  );
}
```

**CinematicHero Pattern**:
- Full-viewport dark bg with animated grid pattern + radial glows
- `useScroll` + `useTransform` for parallax opacity/scale/y
- Product image wrapped in `FloatingElement`
- Floating spec badges (`bg-white/5 backdrop-blur-md border border-white/10`)
- Staggered entrance animations with increasing delays
- Scroll indicator at bottom (bouncing mouse icon)
- `GlowPulse` wrapped CTA button

**Glass Card Pattern**:
```tsx
<div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8
  hover:bg-white/[0.06] transition-all duration-500 group relative overflow-hidden">
  {/* Hover glow */}
  <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100
    transition-opacity duration-500 blur-3xl" />
  <div className="relative z-10">
    {/* Content */}
  </div>
</div>
```

**Section Divider**:
```tsx
<div className="relative py-4 bg-[#050a15]">
  <div className="max-w-3xl mx-auto px-8">
    <div className="h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
  </div>
</div>
```

### 2. Bento Grid Layout (Homepage Services)
- 6-column CSS grid: first 2 items span 3 cols (featured), rest span 2 cols
- Full-bleed background images with dark gradient overlay
- Animated conic-gradient border rotating on hover
- Numbered circle badges (01-06)
- `TiltCard` wrapper for 3D perspective

### 3. Glassmorphism Cards (Clients, Light Sections)
```tsx
<div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl
  hover:shadow-[0_4px_20px_rgba(232,117,26,0.15)] transition-all">
```

### 4. Logo Effects
- Ambient glow pulse animation (`logo-ambient-glow` CSS class)
- Shimmer gradient text (`logo-text-shimmer` + `shimmer-slide` keyframe)
- `brightness-125` filter on dark backgrounds
- `drop-shadow` with orange tint, intensifies on hover
- Spring-based hover scale (`whileHover={{ scale: 1.06 }}`)

### 5. Back-to-Top Button with Scroll Progress (`@/components/BackToTop`)

**Rule: Already global in `layout.tsx` — do NOT add per-page.** Only one instance site-wide.

```tsx
// In src/app/layout.tsx (already included):
import BackToTop from "@/components/BackToTop";
// renders <BackToTop /> alongside <Header /> and <Footer />
```

**Component features**:
- **Position**: Fixed `bottom-28 left-6 z-[90]` (bottom-left, above mobile nav)
- **Visibility**: Appears after scrolling 400px (`scrollY > 400`)
- **Click**: `window.scrollTo({ top: 0, behavior: "smooth" })`
- **Spring entrance/exit**: `AnimatePresence` with spring physics (`stiffness: 260, damping: 20`), slides in from left
- **Hover**: `whileHover={{ scale: 1.15 }}`, `whileTap={{ scale: 0.85 }}`

**Animation layers (5 layers, inside→out)**:

| Layer | Element | Animation | Timing |
|-------|---------|-----------|--------|
| 1 | **Arrow** (white chevron-up SVG) | `y: [0, -4, 0, -2, 0]` double-bounce | 1.2s infinite |
| 2 | **Button body** (`w-14 h-14` orange gradient circle) | `y: [0, -5, 0, -2, 0]` periodic hop | 2.5s infinite + 1.5s pause |
| 3 | **Progress ring** (SVG `r=24`) | `strokeDashoffset` tracks scroll % | passive scroll listener |
| 4 | **Glow pulse** (`inset-[-8px]`, blur-lg) | `scale: [1, 1.35, 1]` + `opacity: [0.5, 0.9, 0.5]` | 2s infinite |
| 5a | **Ripple ring 1** (`inset-[-14px]`, border-2) | `scale: [1, 1.6, 1]` + `opacity: [0.6, 0, 0.6]` | 3s infinite |
| 5b | **Ripple ring 2** (`inset-[-10px]`, border-1) | `scale: [1, 1.4, 1]` + `opacity: [0.4, 0, 0.4]` | 3s infinite, delay 1.5s |

**Key implementation**:
```tsx
// Scroll progress tracking
const circumference = 2 * Math.PI * 24;
const strokeDashoffset = circumference * (1 - progress);
// progress = scrollY / (docHeight - windowHeight), range 0→1

// SVG progress ring
<svg className="absolute inset-[-3px] w-[62px] h-[62px] -rotate-90">
  <circle r="24" stroke="rgba(255,255,255,0.15)" strokeWidth="3" fill="none" />
  <circle r="24" stroke="white" strokeWidth="3" strokeDasharray={circumference}
    strokeDashoffset={strokeDashoffset} strokeLinecap="round" />
</svg>

// Double ripple rings (water-ripple effect, offset timing)
<motion.div className="absolute inset-[-14px] rounded-full border-2 border-mcs-orange/40"
  animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
  transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }} />
<motion.div className="absolute inset-[-10px] rounded-full border border-orange-400/30"
  animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
  transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1.5 }} />

// Button body periodic bounce (hop then rest)
<motion.div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-mcs-orange to-orange-500 ..."
  animate={{ y: [0, -5, 0, -2, 0] }}
  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}>

// Arrow energetic double-bounce
<motion.svg animate={{ y: [0, -4, 0, -2, 0] }}
  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}>
```

**Shadow glow levels**:
- Default: `shadow-[0_0_24px_rgba(232,117,26,0.6)]`
- Hover: `shadow-[0_0_40px_rgba(232,117,26,0.8)]`

**Hover tooltip**: "回到頂部 ↑" white pill badge, appears on right side (`left-full ml-3`)

---

## CSS Techniques (in globals.css)

### Shimmer Text
```css
@keyframes shimmer-slide {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
.logo-text-shimmer {
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer-slide 4s linear infinite;
}
```

### Gradient Border Animation
```css
/* Rotating conic gradient on hover */
background: conic-gradient(from var(--angle), transparent 60%, rgba(232,117,26,0.3));
animation: rotate-gradient 3s linear infinite;
```

### Glow Effects
```css
/* Radial glow behind elements */
background: radial-gradient(ellipse at center, rgba(232,117,26,0.15) 0%, transparent 70%);
/* Box shadow glow */
box-shadow: 0 0 20px rgba(232,117,26,0.3);
/* Drop shadow on images */
filter: drop-shadow(0 0 12px rgba(232,117,26,0.4));
```

---

## Framer Motion Recipes

### Scroll-Driven Parallax Hero
```tsx
const ref = useRef(null);
const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
const y = useTransform(scrollYProgress, [0, 0.5], [0, -60]);
```

### Staggered Entrance
```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.3 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
/>
```

### Floating Spec Badge
```tsx
<motion.div
  className="absolute -right-4 top-1/4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2"
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 1.5, duration: 0.6 }}
>
  <span className="text-orange-400 font-bold">VALUE</span>
  <span className="text-white/50 ml-2">Label</span>
</motion.div>
```

### AnimatePresence for Modals/Dropdowns
```tsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.15 }}
    />
  )}
</AnimatePresence>
```

---

## Responsive Breakpoints
- Mobile first approach
- `sm:` (640px) — tablet adjustments
- `md:` (768px) — 2-column layouts, desktop nav
- `lg:` (1024px) — 3-column grids, side-by-side hero
- Max container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

---

## SEO Architecture
- Every page: `export const metadata: Metadata` with title, description, keywords, canonical, openGraph
- Product pages: Product + BreadcrumbList + FAQPage JSON-LD schemas
- Blog: BlogPosting JSON-LD with author, datePublished
- Sitemap: `src/app/sitemap.ts` auto-discovers blog posts
- IndexNow: `scripts/seo-submit.js` for instant submission

---

## Rules & Conventions
1. **Priority order always**: GraBox 智取櫃 > 冷凍販賣機 > 冷凍微波機
2. **Never show prices** — create "come ask us" atmosphere
3. **No Transtep/龍雲 branding** — only MCS 銓幻元科技
4. **Don't highlight factory name** — only 台灣在地製造
5. **Server + Client split** for pages with animations (SEO metadata in server, visuals in client)
6. **Orange (#E8751A)** is the brand color, use it as primary accent
7. **Keep dark product pages consistent** — same bg colors, same glass card patterns
8. **All images must have descriptive alt text** for SEO
9. **Internal linking** — every page should link to at least 2 other pages
10. **Framer Motion** for all animations — no raw CSS animations except shimmer/glow keyframes
