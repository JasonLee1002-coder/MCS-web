"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import LanguageSwitcher from "@/components/LanguageSwitcher";

function openYuzu() {
  const btn = document.getElementById("yuzu-ai-btn");
  if (btn) btn.click();
}

interface NavChild {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const { lang } = useLanguage();
  const tr = translations[lang];

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 200);
    setScrolled(latest > 50);
  });

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems: NavItem[] = [
    { label: tr.nav.home,       href: "/#hero" },
    { label: tr.nav.services,   href: "/#services" },
    { label: tr.nav.consulting, href: "/#consulting" },
    { label: tr.nav.cases,      href: "/cases" },
    {
      label: tr.nav.products,
      href: "/products/frozen-microwave",
      children: [
        { label: "📦 GraBox " + (lang === "zh" ? "智取櫃" : lang === "ja" ? "スマートキャビネット" : lang === "id" ? "Lemari Pintar" : "Smart Cabinet"), href: "/products/grabox" },
        { label: "❄️ " + (lang === "zh" ? "冷凍微波販賣機" : lang === "ja" ? "冷凍電子レンジ自販機" : lang === "id" ? "Vending Microwave Beku" : "Frozen Microwave Vending"), href: "/products/frozen-microwave" },
      ],
    },
    { label: tr.nav.blog,  href: "/blog" },
    { label: tr.nav.about, href: "/#about" },
    { label: tr.nav.faq,   href: "/#faq" },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-100/50"
          : "bg-transparent"
      }`}
      initial={{ y: 0 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo + Company Name */}
          <Link href="/" className="flex items-center gap-3 group relative">
            <div className="relative">
              <div className="logo-ambient-glow" />
              <div className="logo-glow-ring" />
              <motion.div
                whileHover={{ scale: 1.06 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative z-10"
              >
                <Image
                  src="/images/mcs-logo.png"
                  alt="MCS - Meta Clearing Station Pte. Ltd."
                  width={180}
                  height={60}
                  className={`h-14 w-auto transition-[filter] duration-500 ${
                    scrolled
                      ? "drop-shadow-[0_0_6px_rgba(232,117,26,0.2)] group-hover:drop-shadow-[0_0_12px_rgba(232,117,26,0.4)]"
                      : "brightness-125 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] group-hover:drop-shadow-[0_0_18px_rgba(232,117,26,0.6)]"
                  }`}
                  priority
                />
              </motion.div>
            </div>
            <motion.div
              className="hidden sm:block leading-tight"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className={`font-bold text-sm logo-text-shimmer ${scrolled ? "logo-text-shimmer-dark" : "logo-text-shimmer-light"}`}>
                {lang === "zh" ? "銓幻元科技" : "Meta Clearing Station"}
              </div>
              <div className={`text-[10px] font-medium tracking-wide ${scrolled ? "text-gray-400" : "text-white/40"}`}>
                {lang === "zh" ? "META CLEARING STATION PTE. LTD." : lang === "ja" ? "シンガポール法人" : lang === "id" ? "Terdaftar ACRA Singapura" : "Singapore · ACRA 202316403G"}
              </div>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="主導覽列">
            {navItems.map((item) => {
              if (item.children) {
                return (
                  <div
                    key={item.href}
                    className="relative"
                    ref={dropdownRef}
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button
                      className={`text-sm font-medium transition-colors relative group flex items-center gap-1 ${
                        scrolled ? "text-gray-700 hover:text-mcs-orange" : "text-white/80 hover:text-white"
                      }`}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      aria-haspopup="menu"
                      aria-expanded={dropdownOpen}
                    >
                      {item.label}
                      <svg className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mcs-orange transition-all duration-300 group-hover:w-full" />
                    </button>
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.15 }}
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-3 text-sm text-gray-700 hover:bg-mcs-orange/5 hover:text-mcs-orange transition-colors"
                              onClick={() => setDropdownOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              const NavTag = item.href.startsWith("/") && !item.href.includes("#") ? Link : "a";
              return (
                <NavTag
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors relative group ${
                    scrolled ? "text-gray-700 hover:text-mcs-orange" : "text-white/80 hover:text-white"
                  }`}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mcs-orange transition-all duration-300 group-hover:w-full" />
                </NavTag>
              );
            })}

            {/* Language Switcher */}
            <LanguageSwitcher dark={!scrolled} />

            {/* Ask Yuzu */}
            <motion.button
              onClick={openYuzu}
              className="btn-shine bg-mcs-orange text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-mcs-orange-light transition-all flex items-center gap-1.5 shadow-lg shadow-mcs-orange/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>🍊</span>
              {lang === "zh" ? "問 Yuzu" : lang === "ja" ? "Yuzuに聞く" : lang === "id" ? "Tanya Yuzu" : "Ask Yuzu"}
            </motion.button>
          </nav>

          {/* Mobile: Language + Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher dark={!scrolled} />
            <button
              className="p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <svg className={`w-6 h-6 transition-colors ${scrolled ? "text-gray-900" : "text-white"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              aria-label="Mobile menu"
              className="md:hidden pb-4 border-t border-gray-100 bg-white/95 backdrop-blur-xl rounded-b-2xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {navItems.map((item, i) => {
                if (item.children) {
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <div className="py-2 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">
                        {item.label}
                      </div>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block py-2.5 px-6 text-sm font-medium text-gray-700 hover:text-mcs-orange hover:bg-mcs-orange/5 rounded-lg transition-all"
                          onClick={() => setMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  );
                }

                const NavTag = item.href.startsWith("/") && !item.href.includes("#") ? Link : "a";
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <NavTag
                      href={item.href}
                      className="block py-3 px-4 text-sm font-medium text-gray-700 hover:text-mcs-orange hover:bg-mcs-orange/5 rounded-lg transition-all"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </NavTag>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (navItems.length + 1) * 0.05 }}
                className="px-4 mt-2"
              >
                <button
                  className="block w-full bg-mcs-orange text-white px-5 py-2.5 rounded-full text-sm font-medium text-center hover:bg-mcs-orange-light transition-colors"
                  onClick={() => { setMenuOpen(false); openYuzu(); }}
                >
                  🍊 {lang === "zh" ? "問 Yuzu" : lang === "ja" ? "Yuzuに聞く" : lang === "id" ? "Tanya Yuzu" : "Ask Yuzu"}
                </button>
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
