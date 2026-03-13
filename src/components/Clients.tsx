"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
  TiltCard,
} from "@/components/motion";

const clients = [
  {
    name: "麗嬰國際 Funbox Toys",
    id: "funbox",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1014.625 7.5H12m0-2.625A2.625 2.625 0 009.375 7.5H12m0-2.625V7.5m0 0H3.375c-.621 0-1.125.504-1.125 1.125v3.5c0 .621.504 1.125 1.125 1.125H12m0-5.75h8.625c.621 0 1.125.504 1.125 1.125v3.5c0 .621.504 1.125-1.125 1.125H12" />
      </svg>
    ),
    tag: "玩具零售",
  },
  {
    name: "麥味登 MWD（揚秦國際）",
    id: "mwd",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.379a48.474 48.474 0 00-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12" />
      </svg>
    ),
    tag: "連鎖餐飲",
  },
  {
    name: "日本首都高速公路",
    id: "expressway",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.264.26-2.467.732-3.559" />
      </svg>
    ),
    tag: "海外交通",
  },
  {
    name: "鼎新電腦",
    id: "funbox",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
      </svg>
    ),
    tag: "企業軟體",
  },
  {
    name: "靈知科技 × 長林旅店",
    id: "hotel",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
    tag: "智慧旅宿",
  },
  {
    name: "玩具加乘",
    id: "toyplus",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    tag: "玩具電商",
  },
];

export default function Clients() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-gray-50/80 via-white to-gray-50/50">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #E8751A 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        {/* Soft radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-radial from-mcs-orange/[0.04] via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-mcs-orange/10 text-mcs-orange mb-4">
              Trusted Partners
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
              信賴銓幻元的企業夥伴
            </h2>
            <p className="mt-3 text-gray-500 text-sm max-w-md mx-auto">
              從零售到餐飲、從國內到海外，多元產業的共同選擇
            </p>
          </div>
        </ScrollReveal>

        {/* Client Cards Grid */}
        <StaggerContainer
          className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
          staggerDelay={0.1}
        >
          {clients.map((c) => (
            <StaggerItem key={c.name}>
              <TiltCard>
                <Link
                  href={`/cases#${c.id}`}
                  className="group relative block rounded-2xl p-5 sm:p-6 h-full
                    bg-white/70 backdrop-blur-md
                    border border-white/60
                    shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]
                    hover:shadow-[0_4px_20px_rgba(232,117,26,0.15),0_0_0_1px_rgba(232,117,26,0.12)]
                    hover:border-mcs-orange/30
                    transition-all duration-500 ease-out
                    overflow-hidden"
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-mcs-orange/0 via-mcs-orange/0 to-mcs-orange/0 group-hover:from-mcs-orange/[0.04] group-hover:via-transparent group-hover:to-mcs-orange/[0.02] transition-all duration-700" />

                  {/* Animated border glow on hover */}
                  <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-mcs-orange/20 via-mcs-orange/5 to-mcs-orange/20 blur-sm -z-10" />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center text-center gap-3">
                    {/* Icon circle */}
                    <div className="flex items-center justify-center w-14 h-14 rounded-xl
                      bg-gradient-to-br from-gray-50 to-gray-100
                      group-hover:from-mcs-orange/10 group-hover:to-mcs-orange/5
                      text-gray-400 group-hover:text-mcs-orange
                      shadow-sm group-hover:shadow-md group-hover:shadow-mcs-orange/10
                      transition-all duration-500
                      ring-1 ring-gray-100 group-hover:ring-mcs-orange/20"
                    >
                      {c.icon}
                    </div>

                    {/* Name */}
                    <span className="text-sm sm:text-base font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-300 leading-tight">
                      {c.name.split("（")[0].split("×")[0].trim()}
                    </span>

                    {/* Tag */}
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-400 group-hover:bg-mcs-orange/10 group-hover:text-mcs-orange transition-all duration-300">
                      {c.tag}
                    </span>

                    {/* Arrow indicator */}
                    <motion.div
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <svg className="w-4 h-4 text-mcs-orange/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </motion.div>
                  </div>
                </Link>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA Link */}
        <ScrollReveal delay={0.4} className="text-center mt-12">
          <motion.div whileHover={{ x: 6 }} className="inline-block">
            <Link
              href="/cases"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full
                bg-white/80 backdrop-blur-sm
                border border-gray-200 hover:border-mcs-orange/40
                shadow-sm hover:shadow-md hover:shadow-mcs-orange/10
                text-gray-600 hover:text-mcs-orange
                font-medium text-sm
                transition-all duration-300"
            >
              查看完整客戶實績
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
