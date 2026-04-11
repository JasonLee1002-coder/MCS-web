export default function GlobalBridgeIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 300"
      width="100%"
      height="100%"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gbSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a1628" />
          <stop offset="60%" stopColor="#0F2440" />
          <stop offset="100%" stopColor="#162d50" />
        </linearGradient>
        <linearGradient id="gbLand" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a3a5c" />
          <stop offset="100%" stopColor="#15304d" />
        </linearGradient>
        <linearGradient id="gbConn" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E8751A" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#ffaa55" />
          <stop offset="100%" stopColor="#E8751A" stopOpacity="0.9" />
        </linearGradient>
        <filter id="gbGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="gbBlur">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <pattern id="gbGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1a3355"
            strokeWidth="0.5" opacity="0.25" />
        </pattern>
        <style>{`
          @keyframes gbP{0%,100%{opacity:.2}50%{opacity:.9}}
          @keyframes gbD{0%{stroke-dashoffset:48}100%{stroke-dashoffset:0}}
          @keyframes gbD2{0%{stroke-dashoffset:0}100%{stroke-dashoffset:48}}
          .gb-a{animation:gbP 2.5s ease-in-out infinite}
          .gb-b{animation:gbP 2.5s ease-in-out .7s infinite}
          .gb-c{animation:gbP 2.5s ease-in-out 1.4s infinite}
          .gb-flow{stroke-dasharray:8 16;animation:gbD 1.8s linear infinite}
          .gb-flow2{stroke-dasharray:6 12;animation:gbD2 2.2s linear infinite}
        `}</style>
      </defs>

      {/* Background */}
      <rect width="800" height="300" fill="url(#gbSky)" />
      <rect width="800" height="300" fill="url(#gbGrid)" />

      {/* Ambient glow center */}
      <ellipse cx="400" cy="200" rx="220" ry="70" fill="#E8751A"
        fillOpacity="0.06" filter="url(#gbBlur)" />

      {/* === ASIA-PACIFIC LANDMASSES === */}

      {/* China mainland */}
      <path d="M 450 20 Q 500 30 550 25 Q 610 18 660 35 Q 690 48 710 42 Q 730 55 735 72 Q 712 88 688 80 Q 658 92 636 74 Q 598 86 558 68 Q 518 62 488 48 Q 460 38 450 20 Z"
        fill="url(#gbLand)" stroke="#2a5580" strokeWidth="0.8" opacity="0.65" />

      {/* Korea */}
      <path d="M 700 48 Q 712 54 716 72 Q 713 82 706 87 Q 700 76 695 64 Q 697 54 700 48 Z"
        fill="url(#gbLand)" stroke="#2a5580" strokeWidth="0.5" opacity="0.5" />

      {/* Japan */}
      <path d="M 730 52 Q 742 58 746 75 Q 749 92 751 102 Q 746 107 741 96 Q 736 80 729 64 Z"
        fill="url(#gbLand)" stroke="#2a5580" strokeWidth="0.5" opacity="0.5" />
      <path d="M 751 102 Q 756 116 759 132 Q 756 137 751 127 Q 749 116 749 106 Z"
        fill="url(#gbLand)" stroke="#2a5580" strokeWidth="0.5" opacity="0.5" />

      {/* Taiwan — highlighted */}
      <path d="M 658 98 Q 667 93 672 104 Q 676 118 671 129 Q 666 134 661 127 Q 657 116 659 106 Z"
        fill="url(#gbLand)" stroke="#E8751A" strokeWidth="1.5" opacity="0.9" />

      {/* Vietnam */}
      <path d="M 508 88 Q 520 98 525 118 Q 530 142 528 162 Q 525 178 520 188 Q 517 177 514 160 Q 509 140 507 118 Q 505 98 508 88 Z"
        fill="url(#gbLand)" stroke="#2a5580" strokeWidth="0.5" opacity="0.5" />

      {/* Thailand / Malay Peninsula */}
      <path d="M 458 68 Q 474 80 484 102 Q 490 122 488 142 Q 485 158 480 168 Q 477 172 475 182 Q 473 175 470 160 Q 467 140 464 118 Q 460 98 454 82 Z"
        fill="url(#gbLand)" stroke="#2a5580" strokeWidth="0.5" opacity="0.5" />
      <path d="M 463 168 Q 469 174 471 190 Q 473 212 472 228 Q 469 238 467 248 Q 465 242 463 226 Q 461 210 460 194 Q 459 179 463 168 Z"
        fill="url(#gbLand)" stroke="#2a5580" strokeWidth="0.8" opacity="0.6" />

      {/* Singapore area */}
      <ellipse cx="468" cy="252" rx="9" ry="5" fill="url(#gbLand)"
        stroke="#E8751A" strokeWidth="1.2" opacity="0.9" />

      {/* Philippines */}
      <path d="M 618 152 Q 624 148 630 160 Q 628 176 624 186 Q 619 181 617 170 Z"
        fill="url(#gbLand)" stroke="#2a5580" strokeWidth="0.5" opacity="0.4" />

      {/* Borneo */}
      <path d="M 528 208 Q 550 198 572 210 Q 582 226 577 246 Q 566 262 546 260 Q 529 252 524 236 Q 524 220 528 208 Z"
        fill="url(#gbLand)" stroke="#2a5580" strokeWidth="0.5" opacity="0.4" />

      {/* India hint */}
      <path d="M 348 58 Q 380 48 400 64 Q 411 80 415 102 Q 418 122 410 142 Q 400 156 390 146 Q 380 130 374 110 Q 369 88 354 74 Z"
        fill="url(#gbLand)" stroke="#2a5580" strokeWidth="0.5" opacity="0.28" />

      {/* === CONNECTION LINES (SG ↔ TW) === */}

      {/* Primary arc - orange */}
      <path d="M 468 252 Q 520 198 562 168 Q 600 138 638 118 Q 654 110 664 112"
        fill="none" stroke="url(#gbConn)" strokeWidth="2.5"
        filter="url(#gbGlow)" opacity="0.85" />

      {/* Animated dashes - SG to TW */}
      <path d="M 468 252 Q 520 198 562 168 Q 600 138 638 118 Q 654 110 664 112"
        fill="none" stroke="#E8751A" strokeWidth="2" className="gb-flow"
        filter="url(#gbGlow)" />

      {/* Secondary arc - white */}
      <path d="M 468 252 Q 502 178 544 138 Q 580 98 622 88 Q 650 83 664 110"
        fill="none" stroke="white" strokeWidth="1.2" opacity="0.35" />

      {/* Animated dashes - TW to SG */}
      <path d="M 664 112 Q 650 83 622 88 Q 580 98 544 138 Q 502 178 468 252"
        fill="none" stroke="#4FC3F7" strokeWidth="1.5" className="gb-flow2"
        filter="url(#gbGlow)" opacity="0.6" />

      {/* === NODE MARKERS === */}

      {/* Singapore node */}
      <circle cx="468" cy="252" r="6" fill="#E8751A" className="gb-a"
        filter="url(#gbGlow)" />
      <circle cx="468" cy="252" r="12" fill="none" stroke="#E8751A"
        strokeWidth="0.8" opacity="0.4" className="gb-b" />
      <circle cx="468" cy="252" r="20" fill="none" stroke="#E8751A"
        strokeWidth="0.4" opacity="0.2" className="gb-c" />

      {/* Taiwan node */}
      <circle cx="664" cy="112" r="6" fill="#E8751A" className="gb-b"
        filter="url(#gbGlow)" />
      <circle cx="664" cy="112" r="12" fill="none" stroke="#E8751A"
        strokeWidth="0.8" opacity="0.4" className="gb-c" />
      <circle cx="664" cy="112" r="20" fill="none" stroke="#E8751A"
        strokeWidth="0.4" opacity="0.2" className="gb-a" />

      {/* Data packets on arc */}
      <circle cx="0" cy="0" r="3" fill="#ffaa55" filter="url(#gbGlow)">
        <animateMotion
          path="M 468 252 Q 520 198 562 168 Q 600 138 638 118 Q 654 110 664 112"
          dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="0" cy="0" r="3" fill="#4FC3F7" filter="url(#gbGlow)">
        <animateMotion
          path="M 664 112 Q 650 83 622 88 Q 580 98 544 138 Q 502 178 468 252"
          dur="3.5s" repeatCount="indefinite" />
      </circle>

      {/* === LABELS === */}

      {/* Singapore label */}
      <rect x="404" y="244" width="58" height="22" rx="3"
        fill="#0D2540" opacity="0.85" />
      <text x="433" y="256" textAnchor="middle" fill="#E8751A" fontSize="8"
        fontFamily="monospace" fontWeight="bold">Singapore</text>
      <text x="433" y="263" textAnchor="middle" fill="white" fontSize="6"
        fontFamily="monospace" opacity="0.6">HQ · 2023</text>

      {/* Taiwan label */}
      <rect x="672" y="104" width="58" height="22" rx="3"
        fill="#0D2540" opacity="0.85" />
      <text x="701" y="116" textAnchor="middle" fill="#E8751A" fontSize="8"
        fontFamily="monospace" fontWeight="bold">Taiwan</text>
      <text x="701" y="123" textAnchor="middle" fill="white" fontSize="6"
        fontFamily="monospace" opacity="0.6">R&amp;D Center</text>

      {/* Center label */}
      <rect x="532" y="175" width="90" height="28" rx="5"
        fill="#0D2540" opacity="0.9" stroke="#E8751A" strokeWidth="0.5" />
      <text x="577" y="187" textAnchor="middle" fill="#E8751A" fontSize="8"
        fontFamily="monospace" fontWeight="bold">MCS Network</text>
      <text x="577" y="198" textAnchor="middle" fill="white" fontSize="6.5"
        fontFamily="monospace" opacity="0.7">Asia-Pacific Bridge</text>

      {/* Stars */}
      <circle cx="38" cy="22" r="1" fill="white" fillOpacity="0.5" className="gb-a" />
      <circle cx="170" cy="14" r="1" fill="white" fillOpacity="0.45" className="gb-b" />
      <circle cx="390" cy="20" r="1" fill="white" fillOpacity="0.5" className="gb-c" />
      <circle cx="760" cy="18" r="1" fill="white" fillOpacity="0.45" className="gb-a" />
      <circle cx="80" cy="40" r="0.8" fill="white" fillOpacity="0.35" className="gb-b" />
      <circle cx="290" cy="35" r="0.8" fill="white" fillOpacity="0.35" className="gb-c" />
      <circle cx="720" cy="44" r="0.8" fill="white" fillOpacity="0.35" className="gb-a" />

      {/* Bottom border line */}
      <line x1="0" y1="288" x2="800" y2="288"
        stroke="#E8751A" strokeWidth="0.5" strokeOpacity="0.2" />
      <rect x="0" y="288" width="800" height="12" fill="#E8751A" fillOpacity="0.03" />
    </svg>
  );
}
