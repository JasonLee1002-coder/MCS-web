"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

function openYuzu() {
  const btn = document.getElementById("yuzu-ai-btn");
  if (btn) btn.click();
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "首頁", href: "/#hero" },
    { label: "服務方案", href: "/#services" },
    { label: "客戶實績", href: "/cases" },
    { label: "產品", href: "/products/grabox" },
    { label: "部落格", href: "/blog" },
    { label: "關於我們", href: "/#about" },
    { label: "常見問題", href: "/#faq" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/mcs-logo.png"
              alt="MCS - Meta Clearing Station 銓幻元科技股份有限公司"
              width={180}
              height={60}
              className="h-14 w-auto"
              priority
            />
            <span className="text-mcs-blue-dark font-bold text-base leading-tight hidden sm:block">
              銓幻元科技<br />股份有限公司
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) =>
              item.href.startsWith("/") ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-mcs-orange transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-mcs-orange transition-colors"
                >
                  {item.label}
                </a>
              )
            )}
            <button
              onClick={openYuzu}
              className="text-sm font-medium text-gray-700 hover:text-mcs-orange transition-colors"
            >
              聯絡我們
            </button>
            <button
              onClick={openYuzu}
              className="bg-mcs-orange text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-mcs-orange-light transition-colors flex items-center gap-1.5"
            >
              <span>🍊</span> 問 Yuzu
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <nav className="md:hidden pb-4 border-t border-gray-100">
            {navItems.map((item) =>
              item.href.startsWith("/") ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-3 px-2 text-sm font-medium text-gray-700 hover:text-mcs-orange"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="block py-3 px-2 text-sm font-medium text-gray-700 hover:text-mcs-orange"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              )
            )}
            <button
              className="block w-full text-left py-3 px-2 text-sm font-medium text-gray-700 hover:text-mcs-orange"
              onClick={() => { setMenuOpen(false); openYuzu(); }}
            >
              聯絡我們
            </button>
            <button
              className="block w-full mt-2 bg-mcs-orange text-white px-5 py-2 rounded-full text-sm font-medium text-center hover:bg-mcs-orange-light"
              onClick={() => { setMenuOpen(false); openYuzu(); }}
            >
              🍊 問 Yuzu
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
