"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setShow(scrollY > 400);
      setProgress(docHeight > 0 ? scrollY / docHeight : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const circumference = 2 * Math.PI * 24;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-28 left-6 z-[90] group cursor-pointer"
          initial={{ opacity: 0, scale: 0.3, x: -40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.3, x: -40 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.88 }}
          aria-label="回到頂部"
        >
          {/* Persistent pulsing glow ring */}
          <motion.div
            className="absolute inset-[-8px] rounded-full bg-gradient-to-tr from-mcs-orange/30 to-orange-400/20 blur-lg"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Button body */}
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-mcs-orange to-orange-500 shadow-[0_0_20px_rgba(232,117,26,0.5)] group-hover:shadow-[0_0_35px_rgba(232,117,26,0.7)] flex items-center justify-center transition-shadow duration-300">
            {/* Progress ring */}
            <svg className="absolute inset-[-3px] w-[62px] h-[62px] -rotate-90" viewBox="0 0 62 62">
              <circle
                cx="31"
                cy="31"
                r="24"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="3"
              />
              <circle
                cx="31"
                cy="31"
                r="24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{ transition: "stroke-dashoffset 0.15s ease" }}
              />
            </svg>

            {/* Bouncing arrow */}
            <motion.svg
              className="w-6 h-6 text-white relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={3}
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </motion.svg>
          </div>

          {/* Label tooltip */}
          <motion.span
            className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md text-mcs-orange font-bold text-xs px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap border border-mcs-orange/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
            initial={false}
          >
            回到頂部 ↑
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
