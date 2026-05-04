# B2B Navigation Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans

**Goal:** Add sticky section nav, hero quick-picks, and floating CTA to mcstation.ai so B2B buyers can self-navigate instead of being forced to scroll top-to-bottom.

**Architecture:** All changes inside `src/app/intro/page.tsx`. Three new inline components (SectionNav, HeroQuickPicks, FloatingCTA) added at the top of the file, then inserted into JSX.

**Tech Stack:** React, framer-motion, Tailwind CSS — all already in use in this file.

---

### Task 1: Add anchor IDs to the 4 target sections

**Files:**
- Modify: `src/app/intro/page.tsx` (lines 2323, 2460, 2810, 3166, 3612)

- [ ] Add `id="products"` to the 5-Layer Stack section (line 2323)
- [ ] Add `id="platform"` to OmniCore section (line 2460)
- [ ] Add `id="cases"` to 成功案例 section (line 3166)
- [ ] Add `id="contact"` to Contact section (line 3612)
- [ ] Commit: `feat: add anchor IDs to intro page sections`

### Task 2: SectionNav sticky bar

**Files:**
- Modify: `src/app/intro/page.tsx` — add SectionNav component + insert after hero

- [ ] Write SectionNav component (scroll-triggered, highlights active section)
- [ ] Insert `<SectionNav />` between hero `</section>` and 5-Layer section
- [ ] Commit: `feat: sticky section nav for B2B wayfinding`

### Task 3: Hero quick-pick buttons

**Files:**
- Modify: `src/app/intro/page.tsx` — add 3 pill buttons below CTA in hero

- [ ] Add quick-pick row below CTA: GraBox | 冷凍微波販賣機 | OmniCore 平台
- [ ] Commit: `feat: hero quick-pick product buttons`

### Task 4: Floating consultation button

**Files:**
- Modify: `src/app/intro/page.tsx` — add FloatingCTA component, insert before closing `</div>`

- [ ] Write FloatingCTA component (appears after 300px scroll, links to #contact)
- [ ] Insert `<FloatingCTA />` at bottom of JSX
- [ ] Commit: `feat: floating contact CTA button`
