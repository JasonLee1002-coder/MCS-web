"use client";

import { motion } from "framer-motion";

const NODES = [
  { id: "grabox",   label: "GraBox",    sub: "智取櫃",       color: "#E8751A", angle: -90,  r: 170 },
  { id: "vending",  label: "販賣機",    sub: "冷凍·常溫",    color: "#38BDF8", angle: -30,  r: 170 },
  { id: "erp",      label: "ERP",       sub: "富士通·鼎新",  color: "#A78BFA", angle:  30,  r: 170 },
  { id: "member",   label: "會員電商",  sub: "Ocard·91APP",  color: "#34D399", angle:  90,  r: 170 },
  { id: "payment",  label: "金流支付",  sub: "LINE Pay·悠遊卡", color: "#FBBF24", angle: 150, r: 170 },
  { id: "logistics",label: "物流場域",  sub: "Lalamove·員工卡", color: "#22D3EE", angle: 210, r: 170 },
];

const METRICS = [
  { text: "200台 在線", dx: 18, dy: -10, color: "#E8751A" },
  { text: "↑ 98.7% 正常率", dx: -10, dy: 14, color: "#FBBF24" },
  { text: "AI 補貨預測 ✓", dx: -8, dy: -12, color: "#34D399" },
];

function polar(angleDeg: number, radius: number, cx = 240, cy = 240) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
}

function FlowDot({ x1, y1, x2, y2, color, delay }: {
  x1: number; y1: number; x2: number; y2: number; color: string; delay: number;
}) {
  return (
    <motion.circle r={4} fill={color}
      animate={{ cx: [x1, x2, x1], cy: [y1, y2, y1], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 2.6, delay, repeat: Infinity, ease: "linear", times: [0, 0.4, 0.6, 1] }}
    />
  );
}

export default function OmniCoreViz() {
  const cx = 240; const cy = 240;

  return (
    <div className="relative w-full max-w-[520px] aspect-square mx-auto select-none">

      {/* Outer ambient glow */}
      <div className="absolute inset-0 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(232,117,26,0.12) 0%, rgba(56,189,248,0.06) 50%, transparent 75%)" }} />

      {/* Slow-rotation outer ring decoration */}
      <motion.div
        className="absolute inset-[5%] rounded-full border border-white/[0.06]"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{ borderStyle: "dashed" }}
      />
      <motion.div
        className="absolute inset-[12%] rounded-full border border-white/[0.04]"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        style={{ borderStyle: "dashed" }}
      />

      <svg viewBox="0 0 480 480" className="w-full h-full" style={{ overflow: "visible" }}>
        <defs>
          {/* Strong glow filter */}
          <filter id="glow-strong" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="8" result="blur1" />
            <feGaussianBlur stdDeviation="3" result="blur2" in="SourceGraphic" />
            <feMerge><feMergeNode in="blur1" /><feMergeNode in="blur2" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-soft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-text" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          {/* Center gradient — radial orange */}
          <radialGradient id="cg" cx="38%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffb347" />
            <stop offset="55%" stopColor="#E8751A" />
            <stop offset="100%" stopColor="#8B3A00" />
          </radialGradient>

          {/* Center inner highlight */}
          <radialGradient id="ch" cx="35%" cy="30%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>

          {/* Node gradient per color (index-based) */}
          {NODES.map((n) => (
            <radialGradient key={`ng-${n.id}`} id={`ng-${n.id}`} cx="38%" cy="32%" r="65%">
              <stop offset="0%" stopColor={n.color + "ff"} />
              <stop offset="60%" stopColor={n.color + "cc"} />
              <stop offset="100%" stopColor={n.color + "44"} />
            </radialGradient>
          ))}

          {/* Node inner highlight */}
          <radialGradient id="nh" cx="35%" cy="28%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>

          {/* Line gradients */}
          {NODES.map((n) => {
            const pos = polar(n.angle, n.r, cx, cy);
            return (
              <linearGradient key={`lg-${n.id}`} id={`lg-${n.id}`}
                x1={cx} y1={cy} x2={pos.x} y2={pos.y}
                gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#E8751A" stopOpacity="0.6" />
                <stop offset="100%" stopColor={n.color} stopOpacity="0.5" />
              </linearGradient>
            );
          })}

          {/* Subtle grid bg */}
          <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0L0 0 0 24" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
          </pattern>
        </defs>

        {/* Background */}
        <rect width="480" height="480" fill="url(#grid)" rx="20" />

        {/* Connection lines */}
        {NODES.map((n) => {
          const pos = polar(n.angle, n.r, cx, cy);
          return (
            <motion.line key={`line-${n.id}`}
              x1={cx} y1={cy} x2={pos.x} y2={pos.y}
              stroke={`url(#lg-${n.id})`}
              strokeWidth="2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          );
        })}

        {/* Flow dots */}
        {NODES.map((n, i) => {
          const pos = polar(n.angle, n.r, cx, cy);
          return (
            <FlowDot key={`dot-${n.id}`}
              x1={cx} y1={cy} x2={pos.x} y2={pos.y}
              color={n.color} delay={i * 0.45}
            />
          );
        })}

        {/* ── Center pulse rings ── */}
        {[70, 58, 48].map((r, i) => (
          <motion.circle key={`pulse-${i}`} cx={cx} cy={cy} r={r}
            fill="none" stroke="#E8751A" strokeWidth="1.2"
            animate={{ r: [r, r + 14, r], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", delay: i * 0.7 }}
          />
        ))}

        {/* Center node — base shadow */}
        <circle cx={cx} cy={cy} r={50} fill="#E8751A" opacity={0.18} filter="url(#glow-strong)" />

        {/* Center node — main sphere */}
        <circle cx={cx} cy={cy} r={48} fill="url(#cg)" />

        {/* Center node — 3D inner highlight */}
        <circle cx={cx} cy={cy} r={48} fill="url(#ch)" />

        {/* Center node — rim */}
        <circle cx={cx} cy={cy} r={48} fill="none" stroke="rgba(255,200,120,0.7)" strokeWidth="1.5" />

        {/* Center text */}
        <text x={cx} y={cy - 12} textAnchor="middle" fill="white"
          fontSize="16" fontWeight="900" letterSpacing="0.5"
          filter="url(#glow-text)" style={{ fontFamily: "sans-serif" }}>
          OmniCore
        </text>
        <text x={cx} y={cy + 5} textAnchor="middle" fill="rgba(255,255,255,0.85)"
          fontSize="9.5" fontWeight="600" letterSpacing="1" style={{ fontFamily: "sans-serif" }}>
          AI Retail OS
        </text>
        <text x={cx} y={cy + 18} textAnchor="middle" fill="rgba(255,200,120,0.7)"
          fontSize="7.5" fontWeight="500" style={{ fontFamily: "sans-serif" }}>
          MCS 銓幻元
        </text>

        {/* ── Satellite nodes ── */}
        {NODES.map((n, i) => {
          const pos = polar(n.angle, n.r, cx, cy);
          const labelAbove = pos.y < cy - 10;
          const labelBelow = pos.y > cy + 10;
          const labelY = labelAbove ? pos.y - 38 : labelBelow ? pos.y + 38 : pos.y;
          const subY = labelAbove ? pos.y - 26 : labelBelow ? pos.y + 50 : pos.y + 14;

          return (
            <motion.g key={n.id}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}>

              {/* Outer glow halo */}
              <circle cx={pos.x} cy={pos.y} r={34} fill={n.color} opacity={0.1} filter="url(#glow-soft)" />

              {/* Outer ring */}
              <motion.circle cx={pos.x} cy={pos.y} r={32} fill="none"
                stroke={n.color} strokeWidth="1" strokeOpacity={0.4}
                animate={{ r: [32, 38, 32], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: i * 0.5 }}
              />

              {/* Main sphere shadow */}
              <circle cx={pos.x} cy={pos.y} r={27} fill={n.color} opacity={0.25} filter="url(#glow-soft)" />

              {/* Main sphere */}
              <circle cx={pos.x} cy={pos.y} r={26} fill={`url(#ng-${n.id})`} />
              <circle cx={pos.x} cy={pos.y} r={26} fill="url(#nh)" />
              <circle cx={pos.x} cy={pos.y} r={26} fill="none"
                stroke={n.color} strokeWidth="1.5" strokeOpacity={0.8} />

              {/* Icon area — dark inner circle */}
              <circle cx={pos.x} cy={pos.y} r={17} fill="rgba(5,10,20,0.55)" />

              {/* Label */}
              <text x={pos.x} y={labelY} textAnchor="middle"
                fill={n.color} fontSize="11" fontWeight="800"
                filter="url(#glow-text)" style={{ fontFamily: "sans-serif" }}>
                {n.label}
              </text>
              <text x={pos.x} y={subY} textAnchor="middle"
                fill="rgba(255,255,255,0.5)" fontSize="7.5" fontWeight="400"
                style={{ fontFamily: "sans-serif" }}>
                {n.sub}
              </text>
            </motion.g>
          );
        })}

        {/* ── Floating metric tags ── */}
        {[
          { text: "200台 在線",    x: 370, y: 60,  color: "#E8751A" },
          { text: "↑ 98.7% 正常率", x: 340, y: 420, color: "#FBBF24" },
          { text: "AI 補貨預測 ✓", x: 28,  y: 220, color: "#34D399" },
        ].map((m, i) => {
          const w = m.text.length * 7.5 + 16;
          return (
            <motion.g key={m.text}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0.8, 1] }}
              transition={{ duration: 3.5, delay: 1.4 + i * 0.5, repeat: Infinity, repeatDelay: 5 }}>
              <rect x={m.x} y={m.y} width={w} height={20} rx={10}
                fill="rgba(8,14,26,0.92)"
                stroke={m.color} strokeWidth="1" strokeOpacity={0.7} />
              <text x={m.x + w / 2} y={m.y + 13.5} textAnchor="middle"
                fill={m.color} fontSize="8.5" fontWeight="700"
                style={{ fontFamily: "sans-serif" }}>
                {m.text}
              </text>
            </motion.g>
          );
        })}
      </svg>

      {/* LIVE badge */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/50 border border-white/10 rounded-full px-2.5 py-1 backdrop-blur-sm">
        <motion.div className="w-2 h-2 rounded-full bg-emerald-400"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.1, repeat: Infinity }} />
        <span className="text-xs text-emerald-400 font-mono font-bold tracking-widest">LIVE</span>
      </div>
    </div>
  );
}
