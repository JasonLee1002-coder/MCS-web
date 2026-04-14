"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem, TiltCard } from "@/components/motion";

const clients = [
  {
    name: "麗嬰國際 Funbox Toys", id: "funbox", tag: "玩具零售",
    highlight: "GraBox 智取櫃無人零售",
    desc: "導入 GraBox AI 智取櫃，實現無人自助取貨，節省人力成本 40%+，提升購物體驗。",
    image: "/images/cards/client-funbox.png",
    icon: (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1014.625 7.5H12m0-2.625A2.625 2.625 0 009.375 7.5H12m0-2.625V7.5m0 0H3.375c-.621 0-1.125.504-1.125 1.125v3.5c0 .621.504 1.125 1.125 1.125H12m0-5.75h8.625c.621 0 1.125.504 1.125 1.125v3.5c0 .621.504 1.125-1.125 1.125H12" /></svg>),
  },
  {
    name: "麥味登 MWD（揚秦國際）", id: "mwd", tag: "連鎖餐飲",
    highlight: "POS/KDS 雲端整合",
    desc: "導入 POS/KDS 雲端系統，整合廚房出餐與前台結帳，全台門店翻桌效率顯著提升。",
    image: "/images/cards/client-mwd.png",
    icon: (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.379a48.474 48.474 0 00-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12" /></svg>),
  },
  {
    name: "日本首都高速公路", id: "expressway", tag: "海外交通",
    highlight: "冷凍微波販賣機海外落地",
    desc: "服務區導入冷凍微波販賣機，實現 24H 無人化服務，解決夜間無人值守痛點。",
    image: "/images/cards/client-expressway.png",
    icon: (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.264.26-2.467.732-3.559" /></svg>),
  },
  {
    name: "鼎新電腦", id: "digiwin", tag: "企業軟體",
    highlight: "ERP 系統深度整合",
    desc: "ERP 系統對接 MCS 設備管理後台，數據全鏈路打通，提升企業數位管理效率。",
    image: "/images/cards/client-digiwin.png",
    icon: (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" /></svg>),
  },
  {
    name: "靈知科技 × 長林旅店", id: "hotel", tag: "智慧旅宿",
    highlight: "自助 Check-in 無人化",
    desc: "導入自助 check-in/out 系統，實現旅宿全流程無人化，旅客滿意度顯著提升。",
    image: "/images/cards/client-hotel.png",
    icon: (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" /></svg>),
  },
  {
    name: "東方美實業", id: "oriental-beauty", tag: "AI餐飲轉型",
    highlight: "A2A超級店長 × 200+門市AI化",
    desc: "導入AI超級店長代理人架構，整合WiXtar POS/KDS/GraBox智取櫃與鼎新ERP，200+連鎖門市實現叫貨預測、SOP語音助理與即時營運決策。",
    image: "/images/cases/oriental-beauty/dongfangmei-cover.jpg",
    icon: (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg>),
  },
  {
    name: "玩具加乘", id: "toyplus", tag: "玩具電商",
    highlight: "O2O 線上線下打通",
    desc: "電商訂單整合線下智取點，透過 GraBox 實現 O2O 購物全流程，取貨零等待。",
    image: "/images/cards/client-toyplus.png",
    icon: (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>),
  },
];

export default function Clients() {
  const [selected, setSelected] = useState<typeof clients[0] | null>(null);
  const [imgZoom, setImgZoom] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") { setImgZoom(false); setSelected(null); } };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const modals = (
    <>
      {/* ===== IMAGE LIGHTBOX ===== */}
      <AnimatePresence>
        {selected && imgZoom && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 cursor-zoom-out"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setImgZoom(false)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image src={selected.image} alt={selected.name} width={1600} height={900}
                className="w-full h-auto" priority />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-mcs-orange/20 border border-mcs-orange/30 text-mcs-orange mb-2">{selected.tag}</span>
                <p className="text-white font-bold text-lg">{selected.name}</p>
                <p className="text-white/60 text-sm mt-1">{selected.highlight}</p>
              </div>
              <button onClick={() => setImgZoom(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== CARD PREVIEW MODAL ===== */}
      <AnimatePresence>
        {selected && !imgZoom && (
          <>
            <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelected(null)} />
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 pointer-events-none">
              <motion.div
                className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl pointer-events-auto"
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 30 }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
                onClick={e => e.stopPropagation()}
              >
                {/* Image — click to zoom */}
                <div className="relative w-full h-52 overflow-hidden cursor-zoom-in group"
                  onClick={() => setImgZoom(true)}>
                  <Image src={selected.image} alt={selected.name} fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500" priority />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {/* Zoom hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/50 backdrop-blur-sm border border-white/40 rounded-full px-4 py-2 flex items-center gap-2 text-white text-sm font-semibold">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                      </svg>
                      點擊放大圖片
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-mcs-orange text-white">{selected.tag}</span>
                  </div>
                </div>

                {/* Close */}
                <button onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition-all">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Body */}
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-mcs-orange/10 border border-mcs-orange/20 flex items-center justify-center text-mcs-orange shrink-0">
                      {selected.icon}
                    </div>
                    <h3 className="text-base font-bold text-gray-900 leading-snug">{selected.name}</h3>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-mcs-orange/10 border border-mcs-orange/20 rounded-full px-3 py-1 text-xs font-semibold text-mcs-orange mb-3">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {selected.highlight}
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">{selected.desc}</p>
                  <div className="flex gap-3">
                    <Link href={`/cases#${selected.id}`} onClick={() => setSelected(null)}
                      className="flex-1 flex items-center justify-center gap-2 bg-mcs-blue-dark text-white px-4 py-3 rounded-xl font-semibold text-sm hover:bg-mcs-blue transition-colors">
                      查看完整案例
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                    <button onClick={() => setSelected(null)}
                      className="px-4 py-3 rounded-xl border border-gray-200 text-gray-400 text-sm hover:bg-gray-50 transition-colors">
                      關閉
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <>
      {mounted && createPortal(modals, document.body)}

      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-gray-50/80 via-white to-gray-50/50">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: `radial-gradient(circle, #E8751A 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-mcs-orange/10 text-mcs-orange mb-4">Trusted Partners</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">信賴銓幻元的企業夥伴</h2>
              <p className="mt-3 text-gray-500 text-sm max-w-md mx-auto">從零售到餐飲、從國內到海外，多元產業的共同選擇</p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6" staggerDelay={0.08}>
            {clients.map((c) => (
              <StaggerItem key={c.name}>
                <TiltCard>
                  <motion.button
                    className="group relative w-full rounded-2xl overflow-hidden cursor-pointer border border-transparent hover:border-mcs-orange/30 transition-all duration-400 bg-white shadow-sm"
                    onClick={() => { setSelected(c); setImgZoom(false); }}
                    whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(232,117,26,0.15)" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  >
                    {/* Card image */}
                    <div className="relative w-full h-32 overflow-hidden">
                      <Image src={c.image} alt={c.name} fill
                        className="object-cover group-hover:scale-110 transition-transform duration-600" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      {/* Expand icon */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="w-6 h-6 rounded-full bg-black/40 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Card info */}
                    <div className="p-4 text-center">
                      <span className="text-xs font-semibold text-gray-900 group-hover:text-mcs-blue-dark leading-tight block mb-1.5">
                        {c.name.split("（")[0].split("×")[0].trim()}
                      </span>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-400 group-hover:bg-mcs-orange/10 group-hover:text-mcs-orange transition-all duration-300">
                        {c.tag}
                      </span>
                    </div>
                  </motion.button>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal delay={0.4} className="text-center mt-12">
            <motion.div whileHover={{ x: 6 }} className="inline-block">
              <Link href="/cases"
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-mcs-orange/40 shadow-sm hover:shadow-md text-gray-600 hover:text-mcs-orange font-medium text-sm transition-all duration-300">
                查看完整客戶實績
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
