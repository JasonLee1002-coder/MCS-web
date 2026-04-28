"use client";

import { motion } from "framer-motion";

// Satellite nodes around the central OmniCore hub
const NODES = [
  { id: "grabox", label: "GraBox", sub: "智取櫃", color: "#E8751A", angle: -90, radius: 150, icon: "📦" },
  { id: "vending", label: "販賣機", sub: "冷凍·常溫", color: "#3B82F6", angle: -30, radius: 150, icon: "🏪" },
  { id: "erp", label: "ERP", sub: "富士通·鼎新", color: "#8B5CF6", angle: 30, radius: 150, icon: "🏭" },
  { id: "member", label: "會員電商", sub: "Ocard·91APP", color: "#10B981", angle: 90, radius: 150, icon: "👤" },
  { id: "payment", label: "金流支付", sub: "LINE Pay·悠遊卡", color: "#F59E0B", angle: 150, radius: 150, icon: "💳" },
  { id: "logistics", label: "物流場域", sub: "Lalamove·員工卡", color: "#06B6D4", angle: 210, radius: 150, icon: "🚚" },
];

// Floating metric bubbles
const METRICS = [
  { text: "200台 在線", x: 82, y: 8, delay: 0 },
  { text: "↑ 98.7% 正常率", x: 60, y: 88, delay: 0.4 },
  { text: "AI 補貨預測 ✓", x: 2, y: 45, delay: 0.8 },
];

function polarToCartesian(angleDeg: number, radius: number, cx = 200, cy = 200) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

// Animated dot travelling along a path
function FlowDot({ x1, y1, x2, y2, color, delay }: {
  x1: number; y1: number; x2: number; y2: number; color: string; delay: number;
}) {
  return (
    <motion.circle
      r={3}
      fill={color}
      opacity={0.9}
      animate={{
        cx: [x1, x2, x1],
        cy: [y1, y2, y1],
        opacity: [0, 0.9, 0.9, 0],
      }}
      transition={{
        duration: 2.4,
        delay,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.45, 0.55, 1],
      }}
    />
  );
}

export default function OmniCoreViz() {
  const cx = 200;
  const cy = 200;

  return (
    <div className="relative w-full max-w-[440px] aspect-square mx-auto select-none">
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(232,117,26,0.08) 0%, transparent 70%)" }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg viewBox="0 0 400 400" className="w-full h-full" style={{ overflow: "visible" }}>
        <defs>
          {/* Radial glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="softglow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Gradient for center node */}
          <radialGradient id="centerGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ff9640" />
            <stop offset="100%" stopColor="#c05510" />
          </radialGradient>

          {/* Grid pattern */}
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
          </pattern>
        </defs>

        {/* Background grid */}
        <rect width="400" height="400" fill="url(#grid)" rx="16" />

        {/* Connection lines + flow dots */}
        {NODES.map((node, i) => {
          const pos = polarToCartesian(node.angle, node.radius, cx, cy);
          return (
            <g key={node.id}>
              {/* Static dashed line */}
              <motion.line
                x1={cx} y1={cy} x2={pos.x} y2={pos.y}
                stroke={node.color}
                strokeWidth="1.2"
                strokeDasharray="5 5"
                strokeOpacity="0.35"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              />
              {/* Flowing dot */}
              <FlowDot
                x1={cx} y1={cy}
                x2={pos.x} y2={pos.y}
                color={node.color}
                delay={i * 0.4}
              />
            </g>
          );
        })}

        {/* Center pulse ring (outer) */}
        <motion.circle
          cx={cx} cy={cy} r={46}
          fill="none"
          stroke="#E8751A"
          strokeWidth="1"
          strokeOpacity={0.3}
          animate={{ r: [46, 56, 46], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
        />

        {/* Center pulse ring (inner) */}
        <motion.circle
          cx={cx} cy={cy} r={38}
          fill="none"
          stroke="#E8751A"
          strokeWidth="1.5"
          strokeOpacity={0.5}
          animate={{ r: [38, 46, 38], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
        />

        {/* Center node background */}
        <circle cx={cx} cy={cy} r={38} fill="url(#centerGrad)" filter="url(#glow)" />
        <circle cx={cx} cy={cy} r={38} fill="none" stroke="#ff9640" strokeWidth="1.5" strokeOpacity={0.8} />

        {/* Center text */}
        <text x={cx} y={cy - 8} textAnchor="middle" fill="white" fontSize="11" fontWeight="800" letterSpacing="1">
          OmniCore
        </text>
        <text x={cx} y={cy + 6} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="7" fontWeight="500">
          AI Retail OS
        </text>
        <text x={cx} y={cy + 16} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="6">
          MCS 銓幻元
        </text>

        {/* Satellite nodes */}
        {NODES.map((node, i) => {
          const pos = polarToCartesian(node.angle, node.radius, cx, cy);
          return (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.12 }}
            >
              {/* Node glow */}
              <circle cx={pos.x} cy={pos.y} r={22} fill={node.color} opacity={0.12} />
              {/* Node circle */}
              <circle
                cx={pos.x} cy={pos.y} r={18}
                fill="#0e1520"
                stroke={node.color}
                strokeWidth="1.5"
                filter="url(#softglow)"
              />
              {/* Icon */}
              <text x={pos.x} y={pos.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="11">
                {node.icon}
              </text>
              {/* Label */}
              <text
                x={pos.x}
                y={pos.y + (pos.y > cy ? 26 : -22)}
                textAnchor="middle"
                fill={node.color}
                fontSize="8"
                fontWeight="700"
              >
                {node.label}
              </text>
              <text
                x={pos.x}
                y={pos.y + (pos.y > cy ? 35 : -13)}
                textAnchor="middle"
                fill="rgba(255,255,255,0.4)"
                fontSize="6"
              >
                {node.sub}
              </text>
            </motion.g>
          );
        })}

        {/* Floating metric tags */}
        {METRICS.map((m, i) => (
          <motion.g
            key={m.text}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: [0, 1, 1, 0.7, 1] }}
            transition={{ duration: 3, delay: 1.2 + m.delay, repeat: Infinity, repeatDelay: 4 }}
          >
            <rect
              x={`${m.x}%`} y={`${m.y}%`}
              width={m.text.length * 6.2 + 10}
              height={18}
              rx={9}
              fill="rgba(14,21,32,0.92)"
              stroke="rgba(232,117,26,0.4)"
              strokeWidth="1"
            />
            <text
              x={`${m.x}%`} y={`${m.y}%`}
              dx={m.text.length * 3.1 + 5}
              dy={12}
              textAnchor="middle"
              fill="#f5a87a"
              fontSize="7"
              fontWeight="600"
            >
              {m.text}
            </text>
          </motion.g>
        ))}
      </svg>

      {/* "LIVE" indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5">
        <motion.div
          className="w-2 h-2 rounded-full bg-green-400"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
        <span className="text-xs text-green-400 font-mono font-semibold">LIVE</span>
      </div>
    </div>
  );
}
