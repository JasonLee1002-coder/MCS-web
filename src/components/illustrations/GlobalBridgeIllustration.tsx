export default function GlobalBridgeIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 300" width="100%" height="100%" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gbSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#04090f" />
          <stop offset="60%" stopColor="#080f1e" />
          <stop offset="100%" stopColor="#0a1628" />
        </linearGradient>
        <linearGradient id="gbLand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a3a5c" />
          <stop offset="100%" stopColor="#102035" />
        </linearGradient>
        <linearGradient id="gbLandDim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#122840" />
          <stop offset="100%" stopColor="#0a1828" />
        </linearGradient>
        <linearGradient id="gbConn" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E8751A" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#ffaa44" stopOpacity="1" />
          <stop offset="100%" stopColor="#E8751A" stopOpacity="0.8" />
        </linearGradient>
        <radialGradient id="gbSGGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E8751A" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#E8751A" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#E8751A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="gbTWGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E8751A" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#E8751A" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#E8751A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="gbCityGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4FC3F7" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#4FC3F7" stopOpacity="0" />
        </radialGradient>
        <filter id="gbGlow2">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="gbBlur8"><feGaussianBlur stdDeviation="8" /></filter>
        <filter id="gbBlur3"><feGaussianBlur stdDeviation="3" /></filter>
        <pattern id="gbGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0f2035" strokeWidth="0.5" opacity="0.6" />
        </pattern>
        <style>{`
          @keyframes gbPulse{0%,100%{opacity:.2}50%{opacity:1}}
          @keyframes gbRing{0%,100%{r:8;opacity:.8}100%{r:28;opacity:0}}
          @keyframes gbDash{0%{stroke-dashoffset:60}100%{stroke-dashoffset:0}}
          @keyframes gbDash2{0%{stroke-dashoffset:0}100%{stroke-dashoffset:60}}
          @keyframes gbStar{0%,100%{opacity:.15}50%{opacity:.7}}
          .gb-a{animation:gbPulse 2.5s ease-in-out infinite}
          .gb-b{animation:gbPulse 2.5s ease-in-out .8s infinite}
          .gb-c{animation:gbPulse 2.5s ease-in-out 1.6s infinite}
          .gb-flow{stroke-dasharray:10 18;animation:gbDash 2s linear infinite}
          .gb-flow2{stroke-dasharray:7 14;animation:gbDash2 2.5s linear infinite}
          .gb-star{animation:gbStar 4s ease-in-out infinite}
          .gb-star2{animation:gbStar 4s ease-in-out 1.5s infinite}
          .gb-star3{animation:gbStar 4s ease-in-out 3s infinite}
        `}</style>
      </defs>

      {/* Background */}
      <rect width="800" height="300" fill="url(#gbSky)" />
      <rect width="800" height="300" fill="url(#gbGrid)" opacity="0.5" />

      {/* Stars */}
      {[
        [18,12],[45,7],[80,18],[130,9],[175,15],[230,6],[280,14],[335,8],
        [60,28],[150,22],[215,30],[305,25],[32,38],[100,42],[195,35]
      ].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r={i%4===0?1.2:0.7} fill="white"
          fillOpacity={0.3+0.3*(i%3)} className={["gb-star","gb-star2","gb-star3"][i%3]} />
      ))}

      {/* === LANDMASSES === */}

      {/* India */}
      <path d="M 310 40 Q 340 32 365 45 Q 375 60 378 80 Q 382 105 375 125 Q 365 142 355 135 Q 342 120 338 100 Q 332 78 318 62 Z"
        fill="url(#gbLandDim)" stroke="#1a3a58" strokeWidth="0.7" opacity="0.5" />

      {/* Sri Lanka */}
      <ellipse cx="368" cy="148" rx="7" ry="10" fill="url(#gbLandDim)" stroke="#1a3a58" strokeWidth="0.5" opacity="0.4" />

      {/* China mainland — detailed */}
      <path d="M 430 15 Q 470 10 520 18 Q 565 12 610 22 Q 645 30 665 25 Q 690 35 705 28 Q 725 42 730 58 Q 718 72 700 65 Q 675 75 652 62 Q 618 72 585 58 Q 548 65 510 52 Q 475 42 450 30 Z"
        fill="url(#gbLand)" stroke="#2a5070" strokeWidth="0.8" opacity="0.7" />

      {/* South China continuation */}
      <path d="M 450 30 Q 465 45 475 65 Q 480 85 476 100 Q 472 115 465 108 Q 455 90 448 70 Q 440 48 450 30 Z"
        fill="url(#gbLand)" stroke="#2a5070" strokeWidth="0.5" opacity="0.6" />

      {/* Korea */}
      <path d="M 695 28 Q 708 35 714 50 Q 712 65 706 72 Q 700 62 696 50 Q 693 38 695 28 Z"
        fill="url(#gbLand)" stroke="#2a5070" strokeWidth="0.5" opacity="0.55" />

      {/* Japan main island */}
      <path d="M 726 38 Q 740 44 748 60 Q 752 78 754 95 Q 750 102 745 92 Q 740 75 733 58 Q 728 48 726 38 Z"
        fill="url(#gbLand)" stroke="#2a5070" strokeWidth="0.5" opacity="0.55" />
      {/* Japan second island */}
      <path d="M 755 95 Q 760 112 763 130 Q 760 136 756 128 Q 752 115 751 100 Z"
        fill="url(#gbLand)" stroke="#2a5070" strokeWidth="0.5" opacity="0.5" />

      {/* Taiwan — highlighted + slightly enlarged */}
      <path d="M 648 88 Q 658 82 665 90 Q 670 105 667 122 Q 662 130 656 124 Q 650 112 650 98 Z"
        fill="url(#gbLand)" stroke="#E8751A" strokeWidth="2" opacity="0.95" />

      {/* Philippines */}
      <path d="M 615 140 Q 622 134 628 145 Q 626 160 622 170 Q 617 165 614 155 Z"
        fill="url(#gbLandDim)" stroke="#1a3a58" strokeWidth="0.5" opacity="0.45" />
      <path d="M 607 158 Q 612 152 617 162 Q 614 174 609 170 Z"
        fill="url(#gbLandDim)" stroke="#1a3a58" strokeWidth="0.5" opacity="0.4" />

      {/* Vietnam */}
      <path d="M 498 78 Q 510 86 516 106 Q 522 128 520 150 Q 518 168 512 178 Q 508 168 505 150 Q 500 128 496 106 Q 493 86 498 78 Z"
        fill="url(#gbLandDim)" stroke="#1a3a58" strokeWidth="0.5" opacity="0.5" />

      {/* Thailand & Malay Peninsula */}
      <path d="M 450 75 Q 465 88 474 112 Q 480 135 478 155 Q 475 170 471 180 Q 468 173 465 155 Q 460 132 456 110 Q 452 88 447 75 Z"
        fill="url(#gbLandDim)" stroke="#1a3a58" strokeWidth="0.5" opacity="0.5" />
      <path d="M 456 175 Q 463 182 465 198 Q 467 218 466 232 Q 463 242 461 250 Q 458 244 456 230 Q 454 215 453 200 Q 452 185 456 175 Z"
        fill="url(#gbLandDim)" stroke="#1a3a58" strokeWidth="0.8" opacity="0.6" />

      {/* Singapore island */}
      <ellipse cx="462" cy="255" rx="10" ry="5" fill="url(#gbLand)"
        stroke="#E8751A" strokeWidth="1.8" opacity="0.95" />

      {/* Borneo */}
      <path d="M 520 195 Q 545 185 570 195 Q 582 210 578 232 Q 568 248 548 246 Q 530 240 522 224 Q 518 210 520 195 Z"
        fill="url(#gbLandDim)" stroke="#1a3a58" strokeWidth="0.5" opacity="0.45" />

      {/* Sumatra */}
      <path d="M 418 215 Q 435 208 450 225 Q 456 244 451 262 Q 440 268 428 258 Q 416 242 416 228 Z"
        fill="url(#gbLandDim)" stroke="#1a3a58" strokeWidth="0.5" opacity="0.4" />

      {/* Java */}
      <path d="M 455 268 Q 485 264 510 270 Q 520 278 515 285 Q 498 288 472 284 Q 455 278 455 268 Z"
        fill="url(#gbLandDim)" stroke="#1a3a58" strokeWidth="0.5" opacity="0.35" />

      {/* === AMBIENT GLOWS around key nodes === */}
      <ellipse cx="462" cy="255" rx="35" ry="20" fill="url(#gbSGGlow)" filter="url(#gbBlur8)" />
      <ellipse cx="657" cy="106" rx="25" ry="18" fill="url(#gbTWGlow)" filter="url(#gbBlur8)" />

      {/* === CONNECTION ARCS (SG ↔ TW) === */}

      {/* Primary arc — orange */}
      <path d="M 462 255 Q 518 188 560 162 Q 600 136 635 118 Q 650 110 658 106"
        fill="none" stroke="url(#gbConn)" strokeWidth="2.5"
        filter="url(#gbGlow2)" opacity="0.9" />

      {/* Animated data → SG to TW */}
      <path d="M 462 255 Q 518 188 560 162 Q 600 136 635 118 Q 650 110 658 106"
        fill="none" stroke="#E8751A" strokeWidth="2" className="gb-flow"
        filter="url(#gbGlow2)" />

      {/* Secondary arc — blue (TW to SG) */}
      <path d="M 658 106 Q 648 78 615 72 Q 580 68 545 90 Q 510 112 490 148 Q 474 180 462 255"
        fill="none" stroke="#4FC3F7" strokeWidth="1.2"
        className="gb-flow2" filter="url(#gbGlow2)" opacity="0.6" />

      {/* Tertiary subtle arc */}
      <path d="M 462 255 Q 505 175 548 142 Q 585 112 625 96 Q 648 88 658 106"
        fill="none" stroke="white" strokeWidth="0.7" opacity="0.12" />

      {/* === ANIMATED PACKETS === */}
      <circle r="4" fill="#ffaa44" filter="url(#gbGlow2)">
        <animateMotion dur="2.8s" repeatCount="indefinite"
          path="M 462 255 Q 518 188 560 162 Q 600 136 635 118 Q 650 110 658 106" />
      </circle>
      <circle r="3" fill="#4FC3F7" filter="url(#gbGlow2)">
        <animateMotion dur="3.4s" repeatCount="indefinite" begin="1.2s"
          path="M 658 106 Q 648 78 615 72 Q 580 68 545 90 Q 510 112 490 148 Q 474 180 462 255" />
      </circle>
      <circle r="2.5" fill="#ffaa44" filter="url(#gbGlow2)">
        <animateMotion dur="2.8s" repeatCount="indefinite" begin="1.5s"
          path="M 462 255 Q 518 188 560 162 Q 600 136 635 118 Q 650 110 658 106" />
      </circle>

      {/* === NODE MARKERS === */}

      {/* SG node */}
      <circle cx="462" cy="255" r="7" fill="#E8751A" className="gb-a" filter="url(#gbGlow2)" />
      <circle cx="462" cy="255" r="14" fill="none" stroke="#E8751A" strokeWidth="1" opacity="0.35" className="gb-b" />
      <circle cx="462" cy="255" r="22" fill="none" stroke="#E8751A" strokeWidth="0.5" opacity="0.15" className="gb-c" />

      {/* TW node */}
      <circle cx="657" cy="106" r="7" fill="#E8751A" className="gb-b" filter="url(#gbGlow2)" />
      <circle cx="657" cy="106" r="14" fill="none" stroke="#E8751A" strokeWidth="1" opacity="0.35" className="gb-c" />
      <circle cx="657" cy="106" r="22" fill="none" stroke="#E8751A" strokeWidth="0.5" opacity="0.15" className="gb-a" />

      {/* Minor city dots */}
      {[[555,165],[600,140],[625,125]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="2" fill="#4FC3F7"
          fillOpacity="0.4" className={["gb-a","gb-b","gb-c"][i]} />
      ))}

      {/* === LABELS === */}

      {/* SG label */}
      <rect x="392" y="247" width="62" height="32" rx="5"
        fill="#060f1e" fillOpacity="0.92" stroke="#E8751A" strokeWidth="0.8" strokeOpacity="0.5" />
      <text x="423" y="259" textAnchor="middle" fill="#E8751A" fontSize="8.5"
        fontFamily="monospace" fontWeight="bold">Singapore</text>
      <text x="423" y="272" textAnchor="middle" fill="white" fontSize="6.5"
        fontFamily="monospace" fillOpacity="0.5">HQ · UEN 202316403G</text>

      {/* TW label */}
      <rect x="668" y="96" width="62" height="28" rx="5"
        fill="#060f1e" fillOpacity="0.92" stroke="#E8751A" strokeWidth="0.8" strokeOpacity="0.5" />
      <text x="699" y="108" textAnchor="middle" fill="#E8751A" fontSize="8.5"
        fontFamily="monospace" fontWeight="bold">Taiwan</text>
      <text x="699" y="119" textAnchor="middle" fill="white" fontSize="6.5"
        fontFamily="monospace" fillOpacity="0.5">R&amp;D Center</text>

      {/* Centre caption */}
      <rect x="490" y="180" width="108" height="34" rx="7"
        fill="#060f1e" fillOpacity="0.9" stroke="#E8751A" strokeWidth="0.7" strokeOpacity="0.4" />
      <text x="544" y="193" textAnchor="middle" fill="#E8751A" fontSize="9"
        fontFamily="monospace" fontWeight="bold" className="gb-a">MCS Network</text>
      <text x="544" y="207" textAnchor="middle" fill="white" fontSize="7"
        fontFamily="monospace" fillOpacity="0.55">Asia-Pacific Bridge</text>

      {/* Bottom strip */}
      <line x1="0" y1="292" x2="800" y2="292" stroke="#E8751A" strokeWidth="0.4" strokeOpacity="0.15" />
      <rect x="0" y="292" width="800" height="8" fill="#E8751A" fillOpacity="0.025" />

      </svg>
  );
}
