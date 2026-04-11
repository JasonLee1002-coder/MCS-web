// Taiwan R&D Illustration

export default function TWRDIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 400"
      width="100%"
      height="100%"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="twBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1B3A5C" />
          <stop offset="100%" stopColor="#0F2440" />
        </linearGradient>
        <linearGradient id="twOrange" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E8751A" />
          <stop offset="100%" stopColor="#FF9A44" />
        </linearGradient>
        <filter id="twGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <style>{`
          @keyframes twP{0%,100%{opacity:.3}50%{opacity:1}}
          @keyframes twD{0%{stroke-dashoffset:20}100%{stroke-dashoffset:0}}
          @keyframes twF{0%,100%{opacity:.15}50%{opacity:.7}}
          .tw-a{animation:twP 2s ease-in-out infinite}
          .tw-b{animation:twP 2s ease-in-out .5s infinite}
          .tw-c{animation:twP 2s ease-in-out 1s infinite}
          .tw-d{animation:twP 2s ease-in-out 1.5s infinite}
          .tw-dash{stroke-dasharray:8 8;animation:twD 1.2s linear infinite}
          .tw-dash2{stroke-dasharray:5 10;animation:twD 2s linear infinite}
          .tw-fade{animation:twF 3s ease-in-out infinite}
          .tw-fade2{animation:twF 3s ease-in-out 1s infinite}
          .tw-fade3{animation:twF 3s ease-in-out 2s infinite}
        `}</style>
      </defs>

      {/* Background */}
      <rect width="600" height="400" fill="url(#twBg)" />

      {/* Grid */}
      {Array.from({ length: 29 }, (_, i) => (
        <line key={`gh${i}`} x1="0" y1={i * 14} x2="600" y2={i * 14}
          stroke="#1E4570" strokeWidth="0.3" opacity="0.4" />
      ))}
      {Array.from({ length: 43 }, (_, i) => (
        <line key={`gv${i}`} x1={i * 14} y1="0" x2={i * 14} y2="400"
          stroke="#1E4570" strokeWidth="0.3" opacity="0.4" />
      ))}

      {/* Mountain silhouette background */}
      <g opacity="0.12">
        <path d="M0 300 L30 260 L60 275 L90 240 L120 255 L150 220 L180 235 L210 200 L240 180 L260 170 L280 160 L300 150 L320 155 L340 165 L360 175 L380 190 L400 200 L420 195 L440 210 L460 225 L480 235 L500 245 L520 255 L540 260 L560 270 L580 265 L600 275 L600 400 L0 400 Z"
          fill="#2A5A8C" />
        <path d="M100 300 L140 270 L170 280 L200 250 L230 240 L250 230 L270 225 L290 215 L310 210 L330 215 L350 225 L370 235 L390 245 L420 255 L450 265 L480 272 L510 278 L540 282 L570 288 L600 292 L600 400 L100 400 Z"
          fill="#234E7A" />
      </g>

      {/* PCB Board border */}
      <rect x="40" y="100" width="520" height="260" rx="8" fill="none"
        stroke="#2A6090" strokeWidth="1.5" opacity="0.6" />
      <rect x="42" y="102" width="516" height="256" rx="6" fill="#0D1F35" opacity="0.5" />

      {/* Corner mounting holes */}
      <circle cx="55" cy="115" r="5" fill="none" stroke="#3A7AB5" strokeWidth="1" />
      <circle cx="55" cy="115" r="2" fill="#1B3A5C" />
      <circle cx="545" cy="115" r="5" fill="none" stroke="#3A7AB5" strokeWidth="1" />
      <circle cx="545" cy="115" r="2" fill="#1B3A5C" />
      <circle cx="55" cy="345" r="5" fill="none" stroke="#3A7AB5" strokeWidth="1" />
      <circle cx="55" cy="345" r="2" fill="#1B3A5C" />
      <circle cx="545" cy="345" r="5" fill="none" stroke="#3A7AB5" strokeWidth="1" />
      <circle cx="545" cy="345" r="2" fill="#1B3A5C" />

      {/* Circuit traces - left */}
      <line x1="70" y1="150" x2="200" y2="150" stroke="#E8751A" strokeWidth="1" className="tw-a" />
      <line x1="70" y1="170" x2="180" y2="170" stroke="white" strokeWidth="0.5" opacity="0.5" className="tw-b" />
      <line x1="70" y1="190" x2="160" y2="190" stroke="white" strokeWidth="0.5" opacity="0.35" />
      <line x1="70" y1="210" x2="200" y2="210" stroke="#E8751A" strokeWidth="0.8" className="tw-c" />
      <line x1="70" y1="230" x2="170" y2="230" stroke="white" strokeWidth="0.5" opacity="0.45" />
      <line x1="70" y1="250" x2="190" y2="250" stroke="white" strokeWidth="0.5" opacity="0.3" />
      <line x1="70" y1="270" x2="200" y2="270" stroke="#E8751A" strokeWidth="0.7" className="tw-a" />

      {/* Circuit traces - right */}
      <line x1="400" y1="150" x2="530" y2="150" stroke="white" strokeWidth="0.5" opacity="0.45" />
      <line x1="420" y1="170" x2="530" y2="170" stroke="#E8751A" strokeWidth="0.8" className="tw-b" />
      <line x1="410" y1="190" x2="530" y2="190" stroke="white" strokeWidth="0.5" opacity="0.35" />
      <line x1="400" y1="210" x2="530" y2="210" stroke="white" strokeWidth="0.5" opacity="0.55" />
      <line x1="420" y1="230" x2="530" y2="230" stroke="#E8751A" strokeWidth="0.7" className="tw-c" />
      <line x1="400" y1="270" x2="530" y2="270" stroke="white" strokeWidth="0.5" opacity="0.35" />
      <line x1="410" y1="310" x2="530" y2="310" stroke="#E8751A" strokeWidth="0.8" className="tw-a" />

      {/* Routing polylines */}
      <polyline points="200,150 220,150 220,180 260,180" fill="none"
        stroke="#E8751A" strokeWidth="1" className="tw-a" />
      <polyline points="180,170 210,170 210,200 250,200" fill="none"
        stroke="white" strokeWidth="0.5" opacity="0.45" />
      <polyline points="200,210 230,210 230,240 260,240" fill="none"
        stroke="#E8751A" strokeWidth="0.8" className="tw-b" />
      <polyline points="200,270 240,270 240,300 260,300" fill="none"
        stroke="white" strokeWidth="0.5" opacity="0.55" />
      <polyline points="370,180 390,180 390,150 400,150" fill="none"
        stroke="white" strokeWidth="0.5" opacity="0.45" />
      <polyline points="370,240 400,240 400,230 420,230" fill="none"
        stroke="#E8751A" strokeWidth="0.8" className="tw-c" />
      <polyline points="370,300 395,300 395,310 410,310" fill="none"
        stroke="#E8751A" strokeWidth="0.7" className="tw-a" />

      {/* Data flow animated paths */}
      <path d="M210 160 Q 240 140 280 160" fill="none" stroke="#4FC3F7"
        strokeWidth="1.5" className="tw-dash" filter="url(#twGlow)" />
      <path d="M350 160 Q 380 140 410 160" fill="none" stroke="#4FC3F7"
        strokeWidth="1.5" className="tw-dash" filter="url(#twGlow)" />
      <path d="M320 130 L320 110 Q 320 100 330 100 L450 100" fill="none"
        stroke="#4FC3F7" strokeWidth="1" className="tw-dash2" filter="url(#twGlow)" />
      <path d="M300 350 L300 370 Q 300 380 310 380 L460 380" fill="none"
        stroke="#4FC3F7" strokeWidth="1" className="tw-dash2" filter="url(#twGlow)" />

      {/* Main Microchip - Central Processor */}
      <rect x="260" y="160" width="110" height="80" rx="4" fill="#0D2540"
        stroke="#E8751A" strokeWidth="1.5" />
      <rect x="270" y="170" width="90" height="60" rx="2" fill="#132F50"
        stroke="#2A5A8C" strokeWidth="0.5" />

      {/* Chip pins - top */}
      {[280, 296, 312, 328, 344].map((x, i) => (
        <rect key={`pt${i}`} x={x} y="155" width="6" height="8" rx="1"
          fill="#E8751A" opacity="0.7" />
      ))}
      {/* Chip pins - bottom */}
      {[280, 296, 312, 328, 344].map((x, i) => (
        <rect key={`pb${i}`} x={x} y="237" width="6" height="8" rx="1"
          fill="#E8751A" opacity="0.7" />
      ))}
      {/* Chip pins - left */}
      {[175, 190, 205, 220].map((y, i) => (
        <rect key={`pl${i}`} x="253" y={y} width="8" height="6" rx="1"
          fill="#E8751A" opacity="0.7" />
      ))}
      {/* Chip pins - right */}
      {[175, 190, 205, 220].map((y, i) => (
        <rect key={`pr${i}`} x="369" y={y} width="8" height="6" rx="1"
          fill="#E8751A" opacity="0.7" />
      ))}

      {/* Chip interior grid */}
      <line x1="280" y1="170" x2="280" y2="230" stroke="#1E4570" strokeWidth="0.5" opacity="0.6" />
      <line x1="300" y1="170" x2="300" y2="230" stroke="#1E4570" strokeWidth="0.5" opacity="0.6" />
      <line x1="320" y1="170" x2="320" y2="230" stroke="#1E4570" strokeWidth="0.5" opacity="0.6" />
      <line x1="340" y1="170" x2="340" y2="230" stroke="#1E4570" strokeWidth="0.5" opacity="0.6" />
      <line x1="270" y1="190" x2="360" y2="190" stroke="#1E4570" strokeWidth="0.5" opacity="0.6" />
      <line x1="270" y1="210" x2="360" y2="210" stroke="#1E4570" strokeWidth="0.5" opacity="0.6" />

      {/* Chip core glow */}
      <rect x="295" y="183" width="40" height="34" rx="3" fill="#E8751A" opacity="0.08" className="tw-b" />
      <rect x="302" y="189" width="26" height="22" rx="2" fill="none"
        stroke="#E8751A" strokeWidth="1" className="tw-a" filter="url(#twGlow)" />

      {/* CPU label */}
      <text x="315" y="203" textAnchor="middle" fill="#E8751A" fontSize="7"
        fontFamily="monospace" opacity="0.9">CPU</text>

      {/* Small chips */}
      <rect x="90" y="150" width="55" height="40" rx="3" fill="#0D2540"
        stroke="#3A7AB5" strokeWidth="1" />
      <rect x="96" y="156" width="43" height="28" rx="1" fill="#0F2745" />
      <text x="117" y="173" textAnchor="middle" fill="#4FC3F7" fontSize="6"
        fontFamily="monospace" opacity="0.8">MEM</text>

      <rect x="90" y="210" width="55" height="40" rx="3" fill="#0D2540"
        stroke="#3A7AB5" strokeWidth="1" />
      <rect x="96" y="216" width="43" height="28" rx="1" fill="#0F2745" />
      <text x="117" y="233" textAnchor="middle" fill="#4FC3F7" fontSize="6"
        fontFamily="monospace" opacity="0.8">I/O</text>

      <rect x="455" y="150" width="55" height="40" rx="3" fill="#0D2540"
        stroke="#3A7AB5" strokeWidth="1" />
      <rect x="461" y="156" width="43" height="28" rx="1" fill="#0F2745" />
      <text x="482" y="173" textAnchor="middle" fill="#4FC3F7" fontSize="6"
        fontFamily="monospace" opacity="0.8">NET</text>

      <rect x="455" y="210" width="55" height="40" rx="3" fill="#0D2540"
        stroke="#3A7AB5" strokeWidth="1" />
      <rect x="461" y="216" width="43" height="28" rx="1" fill="#0F2745" />
      <text x="482" y="233" textAnchor="middle" fill="#4FC3F7" fontSize="6"
        fontFamily="monospace" opacity="0.8">PWR</text>

      {/* Small memory chips bottom */}
      <rect x="130" y="300" width="35" height="25" rx="2" fill="#0D2540"
        stroke="#2A6090" strokeWidth="0.8" />
      <rect x="135" y="304" width="25" height="17" rx="1" fill="#0F2745" />
      <rect x="165" y="300" width="35" height="25" rx="2" fill="#0D2540"
        stroke="#2A6090" strokeWidth="0.8" />
      <rect x="170" y="304" width="25" height="17" rx="1" fill="#0F2745" />
      <rect x="200" y="300" width="35" height="25" rx="2" fill="#0D2540"
        stroke="#2A6090" strokeWidth="0.8" />
      <rect x="205" y="304" width="25" height="17" rx="1" fill="#0F2745" />

      {/* Solder points */}
      {[
        [145, 165], [210, 145], [395, 145], [460, 165],
        [145, 235], [210, 265], [395, 265], [460, 235],
        [300, 130], [300, 380],
      ].map(([cx, cy], i) => (
        <circle key={`sp${i}`} cx={cx} cy={cy} r="3" fill="#E8751A"
          opacity="0.7" className={["tw-a","tw-b","tw-c","tw-d"][i % 4]} />
      ))}

      {/* Status LEDs */}
      <circle cx="80" cy="310" r="4" fill="#00FF88" opacity="0.7" className="tw-a" />
      <circle cx="80" cy="310" r="7" fill="none" stroke="#00FF88" strokeWidth="0.5"
        opacity="0.3" className="tw-a" />
      <circle cx="95" cy="310" r="4" fill="#E8751A" opacity="0.7" className="tw-b" />
      <circle cx="95" cy="310" r="7" fill="none" stroke="#E8751A" strokeWidth="0.5"
        opacity="0.3" className="tw-b" />
      <circle cx="110" cy="310" r="4" fill="#4FC3F7" opacity="0.7" className="tw-c" />
      <circle cx="110" cy="310" r="7" fill="none" stroke="#4FC3F7" strokeWidth="0.5"
        opacity="0.3" className="tw-c" />

      {/* Taiwan badge */}
      <rect x="430" y="295" width="100" height="50" rx="6" fill="#0D2540"
        stroke="#E8751A" strokeWidth="1" opacity="0.9" />
      <text x="480" y="315" textAnchor="middle" fill="#E8751A" fontSize="9"
        fontFamily="monospace" fontWeight="bold">TAIWAN R&amp;D</text>
      <text x="480" y="330" textAnchor="middle" fill="white" fontSize="7"
        fontFamily="monospace" opacity="0.7">ISO 9001 CERTIFIED</text>

      {/* Title overlay */}
      <rect x="40" y="55" width="200" height="35" rx="4" fill="#0D2540" opacity="0.85" />
      <text x="55" y="71" fill="#E8751A" fontSize="11" fontFamily="monospace"
        fontWeight="bold">台灣研發中心</text>
      <text x="55" y="84" fill="white" fontSize="8" fontFamily="monospace"
        opacity="0.7">Taiwan R&amp;D Center · IoT Solutions</text>
    </svg>
  );
}
