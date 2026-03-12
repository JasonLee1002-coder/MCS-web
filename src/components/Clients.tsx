"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion";

const clients = [
  { name: "麗嬰國際 Funbox Toys", id: "funbox" },
  { name: "麥味登 MWD（揚秦國際）", id: "mwd" },
  { name: "日本首都高速公路", id: "expressway" },
  { name: "鼎新電腦", id: "funbox" },
  { name: "靈知科技 × 長林旅店", id: "hotel" },
  { name: "玩具加乘", id: "toyplus" },
];

export default function Clients() {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-center text-sm font-medium text-gray-400 uppercase tracking-widest mb-8">
            信賴銓幻元的企業夥伴
          </h2>
        </ScrollReveal>
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6" staggerDelay={0.08}>
          {clients.map((c) => (
            <StaggerItem key={c.name}>
              <Link
                href={`/cases#${c.id}`}
                className="flex items-center justify-center h-20 rounded-xl border border-gray-100 hover:border-mcs-orange/30 hover:shadow-lg transition-all duration-300 px-4 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-mcs-orange/0 to-mcs-orange/0 group-hover:from-mcs-orange/5 group-hover:to-transparent transition-all duration-500" />
                <span className="text-sm font-medium text-gray-500 group-hover:text-mcs-orange transition-colors text-center leading-tight relative z-10">
                  {c.name.split("（")[0].split("×")[0].trim()}
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <ScrollReveal delay={0.3} className="text-center mt-8">
          <motion.div whileHover={{ x: 5 }} className="inline-block">
            <Link
              href="/cases"
              className="inline-flex items-center gap-2 text-mcs-orange hover:text-mcs-orange-light font-medium text-sm transition-colors"
            >
              查看完整客戶實績
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
