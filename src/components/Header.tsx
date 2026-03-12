"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "framer-motion";

function openYuzu() {
  const btn = document.getElementById("yuzu-ai-btn");
  if (btn) btn.click();
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  const navItems = [
    { label: "首頁", href: "/#hero" },
    { label: "服務方案", href: "/#services" },
    { label: "客戶實績", href: "/cases" },
    { label: "產品", href: "/products/grabox" },
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
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/mcs-logo.png"
              alt="MCS - Meta Clearing Station 銓幻元科技股份有限公司"
              width={180}
              height={60}
              className="h-14 w-auto transition-transform duration-300 group-hover:scale-105"
              priority
            />
            <span className={`font-bold text-base leading-tight hidden sm:block transition-colors duration-300 ${
              scrolled ? "text-mcs-blue-dark" : "text-white"
            }`}>
              銓幻元科技<br />股份有限公司
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
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
