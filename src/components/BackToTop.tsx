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

  const circumference = 2 * Math.PI * 20;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-[90] group"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
          aria-label="回到頂部"
        >
          {/* Glow behind */}
          <div className="absolute inset-0 rounded-full bg-mcs-orange/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-150" />

          {/* Button body */}
          <div className="relative w-12 h-12 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg shadow-mcs-orange/20 border border-mcs-orange/30 flex items-center justify-center group-hover:border-mcs-orange/60 group-hover:shadow-mcs-orange/40 transition-all duration-300">
            {/* Progress ring */}
            <svg className="absolute inset-0 w-12 h-12 -rotate-90" viewBox="0 0 48 48">
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-200/30"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="url(#progress-gradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{ transition: "stroke-dashoffset 0.1s ease" }}
              />
              <defs>
                <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#E8751A" />
                  <stop offset="100%" stopColor="#F5923E" />
                </linearGradient>
              </defs>
            </svg>

            {/* Arrow icon */}
            <svg
              className="w-5 h-5 text-mcs-orange group-hover:text-mcs-orange-light transition-colors relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
