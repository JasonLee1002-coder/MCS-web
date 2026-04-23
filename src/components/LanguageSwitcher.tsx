"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage, type Lang } from "@/contexts/LanguageContext";

const LANGS: { code: Lang; flag: string; label: string; short: string }[] = [
  { code: "zh", flag: "🇹🇼", label: "繁體中文", short: "中文" },
  { code: "en", flag: "🇺🇸", label: "English",  short: "EN"   },
  { code: "id", flag: "🇮🇩", label: "Bahasa Indonesia", short: "ID" },
  { code: "ja", flag: "🇯🇵", label: "日本語",   short: "JP"   },
];

const INTRO_LANGS = LANGS.filter((l) => ["zh", "en", "ja"].includes(l.code));

/** Segmented 3D pill — shown on /intro page */
function SegmentedSwitcher({ dark = false }: { dark?: boolean }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className="flex items-center rounded-2xl p-1 gap-0.5"
      style={{
        background: dark
          ? "rgba(255,255,255,0.08)"
          : "rgba(30,30,60,0.07)",
        boxShadow: dark
          ? "inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 8px rgba(0,0,0,0.3)"
          : "inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.12)",
        backdropFilter: "blur(12px)",
      }}
    >
      {INTRO_LANGS.map((l) => {
        const isActive = lang === l.code;
        return (
          <motion.button
            key={l.code}
            onClick={() => setLang(l.code)}
            whileHover={{ y: isActive ? 0 : -1 }}
            whileTap={{ scale: 0.96 }}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold select-none transition-colors duration-150 outline-none"
            style={{
              background: isActive
                ? "linear-gradient(135deg, #E8751A 0%, #F59E0B 100%)"
                : "transparent",
              color: isActive ? "#fff" : dark ? "rgba(255,255,255,0.65)" : "#555",
              boxShadow: isActive
                ? "0 2px 8px rgba(232,117,26,0.45), 0 1px 0 rgba(255,255,255,0.2) inset, 0 -2px 0 rgba(0,0,0,0.15) inset"
                : "none",
              textShadow: isActive ? "0 1px 2px rgba(0,0,0,0.2)" : "none",
            }}
          >
            <span className="text-base leading-none">{l.flag}</span>
            <span className="tracking-wide">{l.short}</span>
            {isActive && (
              <motion.div
                layoutId="lang-active-glow"
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%)",
                }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

/** Compact dropdown — used everywhere else */
function DropdownSwitcher({ dark = false }: { dark?: boolean }) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative z-50">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 select-none ${
          dark
            ? "bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-sm"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
        }`}
        aria-label="Select language"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="hidden sm:inline">{current.short}</span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-3 h-3 opacity-60"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          >
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left ${
                  lang === l.code
                    ? "bg-orange-50 text-orange-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="text-xl leading-none">{l.flag}</span>
                <span className="flex-1">{l.label}</span>
                {lang === l.code && (
                  <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LanguageSwitcher({
  dark = false,
  segmented = false,
}: {
  dark?: boolean;
  segmented?: boolean;
}) {
  if (segmented) return <SegmentedSwitcher dark={dark} />;
  return <DropdownSwitcher dark={dark} />;
}
