"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "framer-motion";

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

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 200);
    setScrolled(latest > 50);
  });

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close dropdown on click outside
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
    { label: "首頁", href: "/#hero" },
    { label: "服務方案", href: "/#services" },
    { label: "客戶實績", href: "/cases" },
    {
      label: "產品",
      href: "/products/frozen-microwave",
      children: [
        { label: "📦 GraBox 智取櫃", href: "/products/grabox" },
        { label: "❄️ 冷凍微波販賣機", href: "/products/frozen-microwave" },
      ],
    },
    { label: "關於我們", href: "/#about" },
    { label: "常見問題", href: "/#faq" },
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
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group relative">
            {/* Logo with glow effects */}
            <div className="relative">
              {/* Ambient glow - always visible, intensifies on hover */}
              <div className="logo-ambient-glow" />
              {/* Hover ring glow */}
              <div className="logo-glow-ring" />
              <motion.div
                whileHover={{ scale: 1.06 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative z-10"
              >
                <Image
                  src="/images/mcs-logo.png"
                  alt="MCS - Meta Clearing Station 銓幻元科技股份有限公司"
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
            <motion.span
              className={`font-bold text-base leading-tight hidden sm:block logo-text-shimmer ${
                scrolled ? "logo-text-shimmer-dark" : "logo-text-shimmer-light"
              }`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              銓幻元科技<br />股份有限公司
            </motion.span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              // Items with dropdown
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
                        scrolled
                          ? "text-gray-700 hover:text-mcs-orange"
                          : "text-white/80 hover:text-white"
                      }`}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      {item.label}
                      <svg className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
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

              // Regular items
              const NavTag = item.href.startsWith("/") && !item.href.includes("#") ? Link : "a";
              return (
                <NavTag
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors relative group ${
                    scrolled
                      ? "text-gray-700 hover:text-mcs-orange"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mcs-orange transition-all duration-300 group-hover:w-full" />
                </NavTag>
              );
            })}
            <button
              onClick={openYuzu}
              className={`text-sm font-medium transition-colors ${
                scrolled
                  ? "text-gray-700 hover:text-mcs-orange"
                  : "text-white/80 hover:text-white"
              }`}
            >
              聯絡我們
            </button>
            <motion.button
              onClick={openYuzu}
              className="btn-shine bg-mcs-orange text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-mcs-orange-light transition-all flex items-center gap-1.5 shadow-lg shadow-mcs-orange/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>🍊</span> 問 Yuzu
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className={`w-6 h-6 transition-colors ${scrolled ? "text-gray-900" : "text-white"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              className="md:hidden pb-4 border-t border-gray-100 bg-white/95 backdrop-blur-xl rounded-b-2xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {navItems.map((item, i) => {
                // Items with children - show as group in mobile
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
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
              >
                <button
                  className="block w-full text-left py-3 px-4 text-sm font-medium text-gray-700 hover:text-mcs-orange hover:bg-mcs-orange/5 rounded-lg transition-all"
                  onClick={() => { setMenuOpen(false); openYuzu(); }}
                >
                  聯絡我們
                </button>
              </motion.div>
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
                  🍊 問 Yuzu
                </button>
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
