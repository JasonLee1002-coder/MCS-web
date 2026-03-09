"use client";

import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [justAppeared, setJustAppeared] = useState(false);

  useEffect(() => {
    let wasVisible = false;
    const onScroll = () => {
      const show = window.scrollY > 400;
      if (show && !wasVisible) {
        setJustAppeared(true);
        setTimeout(() => setJustAppeared(false), 2000);
      }
      wasVisible = show;
      setVisible(show);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 left-6 z-50 bg-mcs-blue-dark/80 hover:bg-mcs-blue-dark text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 ${justAppeared ? "animate-bounce" : ""}`}
      aria-label="回到頂部"
      title="回到頂部"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  );
}
