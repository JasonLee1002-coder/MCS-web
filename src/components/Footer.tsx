"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/motion";

export default function Footer() {
  return (
    <footer className="bg-mcs-blue-dark text-gray-400 py-12 relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-mcs-orange/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="text-white font-bold text-lg mb-2">MCS 銓幻元科技</div>
              <div className="text-sm leading-relaxed">
                <p>銓幻元科技股份有限公司</p>
                <p className="text-gray-500 text-xs mt-0.5">Meta Clearing Station Pte. Ltd. 台灣分公司</p>
                <p className="mt-2">103 台北市大同區長安西路78巷4弄10號1樓</p>
                <p className="mt-1">
                  <a
                    href="mailto:service@transtep.com"
                    className="hover:text-mcs-orange transition-colors duration-300"
                  >
                    service@transtep.com
                  </a>
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div className="text-white font-semibold mb-2">快速導覽</div>
              <ul className="text-sm space-y-1.5">
                {[
                  { label: "首頁", href: "#hero" },
                  { label: "服務方案", href: "#services" },
                  { label: "客戶實績", href: "/cases", isLink: true },
                  { label: "GraBox AI 智取櫃", href: "/products/grabox", isLink: true },
                  { label: "冷凍微波販賣機", href: "/products/frozen-microwave", isLink: true },
                  { label: "關於我們", href: "#about" },
                  { label: "常見問題", href: "#faq" },
                  { label: "聯絡我們", href: "#contact" },
                ].map((item) => (
                  <li key={item.label}>
                    {item.isLink ? (
                      <Link href={item.href} className="hover:text-mcs-orange transition-colors duration-300 inline-block hover:translate-x-1 transform">
                        {item.label}
                      </Link>
                    ) : (
                      <a href={item.href} className="hover:text-mcs-orange transition-colors duration-300 inline-block hover:translate-x-1 transform">
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <div className="text-white font-semibold mb-2">產品與服務</div>
              <ul className="text-sm space-y-1.5">
                <li>
                  <Link href="/products/grabox" className="hover:text-mcs-orange transition-colors duration-300 inline-block hover:translate-x-1 transform">
                    GraBox AI 智取櫃
                  </Link>
                </li>
                <li>
                  <Link href="/products/frozen-microwave" className="hover:text-mcs-orange transition-colors duration-300 inline-block hover:translate-x-1 transform">
                    冷凍微波販賣機
                  </Link>
                </li>
                {["智慧販賣機", "自助服務機 Kiosk", "OEM/ODM 貼牌客製", "POS/KDS 系統串接", "雲端營運管理平台"].map((item) => (
                  <li key={item} className="hover:text-gray-300 transition-colors duration-300">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>

        {/* Divider + Copyright */}
        <div className="border-t border-gray-700/50 pt-6 text-sm text-center">
          &copy; {new Date().getFullYear()}{" "}
          <Link href="/blog" className="text-gray-400 hover:text-gray-300 no-underline transition-colors duration-300">
            銓幻元科技股份有限公司
          </Link>{" "}
          Meta Clearing Station Pte. Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
