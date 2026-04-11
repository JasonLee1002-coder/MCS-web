"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

export default function Footer() {
  const { lang } = useLanguage();
  const tr = translations[lang].footer;

  return (
    <footer className="bg-mcs-blue-dark text-gray-400 py-12 relative overflow-hidden">
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-mcs-orange/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

            {/* Company Info */}
            <div>
              <div className="text-white font-bold text-base mb-1 tracking-wide">
                META CLEARING STATION PTE. LTD.
              </div>
              <div className="font-mono text-xs text-mcs-orange mb-4 flex items-center gap-1.5">
                <span>🇸🇬</span>
                <span>UEN: 202316403G · Est. 2023</span>
              </div>
              <address className="text-sm leading-relaxed not-italic space-y-2">
                <p className="flex items-start gap-2">
                  <span className="text-base shrink-0">🇸🇬</span>
                  <span className="text-gray-400 text-xs">
                    138 Cecil Street, #13-02, Cecil Court, Singapore 069538
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-base shrink-0">🇹🇼</span>
                  <span className="text-gray-500 text-xs">
                    103 台北市大同區長安西路78巷4弄10號1樓
                  </span>
                </p>
                <p className="flex items-center gap-2 mt-3">
                  <span className="text-base shrink-0">✉</span>
                  <a
                    href="mailto:service@transtep.com"
                    className="text-xs hover:text-mcs-orange transition-colors duration-300"
                  >
                    service@transtep.com
                  </a>
                </p>
              </address>
              {/* ACRA badge */}
              <div className="mt-4 inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1 text-[10px] text-gray-500">
                <svg className="w-3 h-3 text-mcs-orange" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {tr.acraLabel}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div className="text-white font-semibold mb-4 text-sm">{tr.quickLinks}</div>
              <ul className="text-sm space-y-2">
                {[
                  { label: translations[lang].nav.home,       href: "#hero" },
                  { label: translations[lang].nav.services,   href: "#services" },
                  { label: translations[lang].nav.consulting, href: "#consulting" },
                  { label: translations[lang].nav.cases,      href: "/cases", isLink: true },
                  { label: translations[lang].nav.about,      href: "#about" },
                  { label: translations[lang].nav.blog,       href: "/blog", isLink: true },
                  { label: translations[lang].nav.faq,        href: "#faq" },
                  { label: translations[lang].nav.contact,    href: "#contact" },
                ].map((item) => (
                  <li key={item.label}>
                    {item.isLink ? (
                      <Link href={item.href} className="hover:text-mcs-orange transition-colors duration-300 inline-block hover:translate-x-1 transform text-xs">
                        {item.label}
                      </Link>
                    ) : (
                      <a href={item.href} className="hover:text-mcs-orange transition-colors duration-300 inline-block hover:translate-x-1 transform text-xs">
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <nav aria-label="Products navigation">
              <div className="text-white font-semibold mb-4 text-sm">{tr.products}</div>
              <ul className="text-sm space-y-2">
                <li>
                  <Link href="/products/grabox" className="hover:text-mcs-orange transition-colors duration-300 inline-block hover:translate-x-1 transform text-xs">
                    GraBox AI {lang === "zh" ? "智取櫃" : lang === "ja" ? "スマートキャビネット" : lang === "id" ? "Lemari Pintar" : "Smart Cabinet"}
                  </Link>
                </li>
                <li>
                  <Link href="/products/frozen-microwave" className="hover:text-mcs-orange transition-colors duration-300 inline-block hover:translate-x-1 transform text-xs">
                    {lang === "zh" ? "冷凍微波販賣機" : lang === "ja" ? "冷凍電子レンジ自販機" : lang === "id" ? "Vending Microwave Beku" : "Frozen Microwave Vending Machine"}
                  </Link>
                </li>
                {lang === "zh" && [
                  { label: "智慧販賣機", href: "/blog/smart-vending-machine-taiwan-2026" },
                  { label: "自助服務機 Kiosk", href: "/blog/hotel-self-checkin-kiosk" },
                  { label: "OEM/ODM 貼牌客製", href: "/blog/oem-odm-smart-device-taiwan" },
                  { label: "POS/KDS 系統串接", href: "/blog/smart-cabinet-pos-kds-integration" },
                  { label: "雲端營運管理平台", href: "/blog/ivm-cloud-vending-management-platform" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="hover:text-mcs-orange transition-colors duration-300 inline-block hover:translate-x-1 transform text-xs">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </ScrollReveal>

        {/* Copyright */}
        <div className="border-t border-gray-700/50 pt-6 text-xs text-center text-gray-500">
          &copy; {new Date().getFullYear()}{" "}
          <Link href="/" className="text-gray-400 hover:text-gray-300 no-underline transition-colors duration-300">
            Meta Clearing Station Pte. Ltd.
          </Link>
          {" · "}
          <span className="text-gray-600">銓幻元科技股份有限公司</span>
          {" · "}{tr.allRights}
        </div>
      </div>
    </footer>
  );
}
