"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      r: number;
      dx: number;
      dy: number;
      alpha: number;
    }[] = [];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    let animId: number;
    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 117, 26, ${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      }
      animId = requestAnimationFrame(draw);
    }
    draw();

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
    />
  );
}

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#060d1a] flex items-center justify-center px-4">
      {/* Radial glow background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#E8751A] opacity-[0.06] blur-[120px]" />
        <div className="absolute left-1/4 top-1/4 w-[400px] h-[400px] rounded-full bg-[#0F2440] opacity-30 blur-[80px]" />
      </div>

      <FloatingParticles />

      <div className="relative z-10 text-center max-w-xl mx-auto">
        {/* 404 glowing number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mb-2 select-none"
        >
          <span
            className="text-[10rem] sm:text-[14rem] font-black leading-none"
            style={{
              background: "linear-gradient(135deg, #E8751A 30%, #ff9f4a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 32px rgba(232,117,26,0.55))",
            }}
          >
            404
          </span>
        </motion.div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="h-px w-48 mx-auto mb-8 bg-gradient-to-r from-transparent via-[#E8751A] to-transparent"
        />

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-2xl sm:text-3xl font-bold text-white mb-4"
        >
          此頁面已下架
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-gray-400 mb-10 text-base sm:text-lg leading-relaxed"
        >
          您要找的頁面可能已移動、調整或暫時下架。
          <br />
          歡迎從以下頁面繼續探索 MCS 銓幻元科技。
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/"
            className="relative group inline-flex items-center justify-center gap-2 bg-[#E8751A] text-white px-8 py-3 rounded-full font-semibold overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_24px_rgba(232,117,26,0.5)]"
          >
            <span className="relative z-10">回首頁</span>
          </Link>
          <Link
            href="/cases"
            className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 hover:border-white/40 transition-all"
          >
            客戶實績
          </Link>
          <Link
            href="/products/grabox"
            className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 hover:border-white/40 transition-all"
          >
            GraBox 智取櫃
          </Link>
        </motion.div>

        {/* Brand watermark */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-xs text-white/20 tracking-widest uppercase"
        >
          MCS · 銓幻元科技 · mcstation.ai
        </motion.p>
      </div>
    </div>
  );
}
