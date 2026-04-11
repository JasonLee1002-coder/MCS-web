// Taiwan R&D Center Illustration — PCB / IoT Tech Theme

export default function TWRDIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 400" width="100%" height="100%" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="twBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a1628" />
          <stop offset="100%" stopColor="#060e1c" />
        </linearGradient>
        <linearGradient id="twChip" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0d2540" />
          <stop offset="100%" stopColor="#091a30" />
        </linearGradient>
        <linearGradient id="twPCB" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#081520" />
          <stop offset="100%" stopColor="#050e18" />
        </linearGradient>
        <radialGradient id="twCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E8751A" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#E8751A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="twBlue" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4FC3F7" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#4FC3F7" stopOpacity="0" />
        </radialGradient>
        <filter id="twGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="twGlow4">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="twBlur6"><feGaussianBlur stdDeviation="6" /></filter>
        <style>{`
          @keyframes twA{0%,100%{opacity:.25}50%{opacity:1}}
          @keyframes twB{0%,100%{opacity:.2}50%{opacity:.85}}
          @keyframes twD{0%{stroke-dashoffset:40}100%{stroke-dashoffset:0}}
          @keyframes twD2{0%{stroke-dashoffset:0}100%{stroke-dashoffset:40}}
          @keyframes twP{0%,100%{r:3;opacity:.4}50%{r:5;opacity:1}}
          @keyframes twScan{0%{transform:translateY(0);opacity:.7}100%{transform:translateY(80px);opacity:0}}
          @keyframes twBit{0%,100%{opacity:0}10%,90%{opacity:.7}}
          .tw-a{animation:twA 2s ease-in-out infinite}
          .tw-b{animation:twA 2s ease-in-out .5s infinite}
          .tw-c{animation:twA 2s ease-in-out 1s infinite}
          .tw-d{animation:twA 2s ease-in-out 1.5s infinite}
          .tw-e{animation:twB 3s ease-in-out .2s infinite}
          .tw-f{animation:twB 3s ease-in-out .8s infinite}
          .tw-dash{stroke-dasharray:7 7;animation:twD 1.4s linear infinite}
          .tw-dash2{stroke-dasharray:5 10;animation:twD2 2s linear infinite}
          .tw-pulse{animation:twP 1.8s ease-in-out infinite}
          .tw-pb{animation:twP 1.8s ease-in-out .6s infinite}
          .tw-pc{animation:twP 1.8s ease-in-out 1.2s infinite}
          .tw-scan{animation:twScan 2.5s ease-in-out infinite}
          .tw-bit{animation:twBit 1.5s steps(1,end) infinite}
          .tw-bit2{animation:twBit 1.5s steps(1,end) .3s infinite}
          .tw-bit3{animation:twBit 1.5s steps(1,end) .6s infinite}
        `}</style>
      </defs>

      {/* Background */}
      <rect width="600" height="400" fill="url(#twBg)" />

      {/* Subtle grid */}
      {Array.from({length:20},(_,i)=>(
        <line key={`gh${i}`} x1="0" y1={i*21} x2="600" y2={i*21}
          stroke="#0d2035" strokeWidth="0.5" />
      ))}
      {Array.from({length:30},(_,i)=>(
        <line key={`gv${i}`} x1={i*21} y1="0" x2={i*21} y2="400"
          stroke="#0d2035" strokeWidth="0.5" />
      ))}

      {/* PCB board */}
      <rect x="30" y="60" width="540" height="310" rx="10" fill="url(#twPCB)"
        stroke="#0d3050" strokeWidth="2" />
      <rect x="32" y="62" width="536" height="306" rx="8" fill="none"
        stroke="#0a2540" strokeWidth="0.5" />

      {/* Corner vias */}
      {[[50,80],[550,80],[50,350],[550,350]].map(([x,y],i)=>(
        <g key={`via${i}`}>
          <circle cx={x} cy={y} r="8" fill="none" stroke="#1a4060" strokeWidth="1.5" />
          <circle cx={x} cy={y} r="4" fill="#0a1e30" stroke="#E8751A" strokeWidth="0.8" strokeOpacity="0.5" />
          <circle cx={x} cy={y} r="1.5" fill="#E8751A" fillOpacity="0.4" />
        </g>
      ))}

      {/* === MAIN CPU CHIP (centre) === */}
      {/* Core glow */}
      <circle cx="300" cy="210" r="80" fill="url(#twCore)" filter="url(#twBlur6)" />
      <circle cx="300" cy="210" r="50" fill="url(#twBlue)" filter="url(#twBlur6)" />

      {/* Chip body */}
      <rect x="240" y="155" width="120" height="110" rx="6" fill="url(#twChip)"
        stroke="#E8751A" strokeWidth="1.5" filter="url(#twGlow)" />
      <rect x="248" y="163" width="104" height="94" rx="4" fill="#060f1a"
        stroke="#1a3a5c" strokeWidth="0.8" />

      {/* Chip inner grid lines */}
      {[172,182,192,202,212,222,232,242].map((y,i)=>(
        <line key={`cl${i}`} x1="250" y1={y} x2="350" y2={y}
          stroke="#0d2535" strokeWidth="0.5" />
      ))}
      {[258,268,278,288,298,308,318,328,338].map((x,i)=>(
        <line key={`cg${i}`} x1={x} y1="165" x2={x} y2="255"
          stroke="#0d2535" strokeWidth="0.5" />
      ))}

      {/* CPU core boxes */}
      <rect x="260" y="172" width="36" height="30" rx="2" fill="#0d2035" stroke="#1e4060" strokeWidth="0.8" />
      <rect x="304" y="172" width="36" height="30" rx="2" fill="#0d2035" stroke="#1e4060" strokeWidth="0.8" />
      <rect x="260" y="210" width="36" height="30" rx="2" fill="#0d2035" stroke="#1e4060" strokeWidth="0.8" />
      <rect x="304" y="210" width="36" height="30" rx="2" fill="#0d2035" stroke="#1e4060" strokeWidth="0.8" />

      {/* Core labels */}
      <text x="278" y="191" textAnchor="middle" fill="#4FC3F7" fontSize="7" fontFamily="monospace" opacity="0.8" className="tw-e">CPU0</text>
      <text x="322" y="191" textAnchor="middle" fill="#4FC3F7" fontSize="7" fontFamily="monospace" opacity="0.8" className="tw-f">CPU1</text>
      <text x="278" y="229" textAnchor="middle" fill="#E8751A" fontSize="7" fontFamily="monospace" opacity="0.8" className="tw-e">GPU</text>
      <text x="322" y="229" textAnchor="middle" fill="#4FC3F7" fontSize="7" fontFamily="monospace" opacity="0.8" className="tw-f">DSP</text>

      {/* Scan line over chip */}
      <rect x="248" y="163" width="104" height="3" fill="#4FC3F7" fillOpacity="0.4"
        className="tw-scan" filter="url(#twGlow)" />

      {/* Chip label */}
      <text x="300" y="260" textAnchor="middle" fill="#E8751A" fontSize="9"
        fontFamily="monospace" fontWeight="bold" opacity="0.9">MCS-AI-SoC</text>

      {/* Chip pins — top */}
      {[255,267,279,291,303,315,327,339].map((x,i)=>(
        <g key={`pt${i}`}>
          <rect x={x} y="148" width="6" height="9" rx="1" fill="#1a3a5c" stroke="#E8751A" strokeWidth="0.5" strokeOpacity="0.5" />
          <line x1={x+3} y1="157" x2={x+3} y2="163" stroke="#E8751A" strokeWidth="0.5" strokeOpacity="0.4" />
        </g>
      ))}
      {/* Chip pins — bottom */}
      {[255,267,279,291,303,315,327,339].map((x,i)=>(
        <g key={`pb${i}`}>
          <rect x={x} y="257" width="6" height="9" rx="1" fill="#1a3a5c" stroke="#E8751A" strokeWidth="0.5" strokeOpacity="0.5" />
          <line x1={x+3} y1="257" x2={x+3} y2="263" stroke="#E8751A" strokeWidth="0.5" strokeOpacity="0.4" />
        </g>
      ))}
      {/* Chip pins — left */}
      {[168,180,192,204,216,228,240].map((y,i)=>(
        <g key={`pl${i}`}>
          <rect x="231" y={y} width="9" height="6" rx="1" fill="#1a3a5c" stroke="#E8751A" strokeWidth="0.5" strokeOpacity="0.5" />
          <line x1="240" y1={y+3} x2="248" y2={y+3} stroke="#E8751A" strokeWidth="0.5" strokeOpacity="0.4" />
        </g>
      ))}
      {/* Chip pins — right */}
      {[168,180,192,204,216,228,240].map((y,i)=>(
        <g key={`pr${i}`}>
          <rect x="360" y={y} width="9" height="6" rx="1" fill="#1a3a5c" stroke="#E8751A" strokeWidth="0.5" strokeOpacity="0.5" />
          <line x1="352" y1={y+3} x2="360" y2={y+3} stroke="#E8751A" strokeWidth="0.5" strokeOpacity="0.4" />
        </g>
      ))}

      {/* === MEMORY CHIPS (left) === */}
      <rect x="70" y="140" width="80" height="55" rx="4" fill="url(#twChip)" stroke="#3A7AB5" strokeWidth="1" />
      <rect x="76" y="146" width="68" height="43" rx="2" fill="#060f1a" />
      {[152,162,172,180].map((y,r)=>
        [80,92,104,116,128].map((x,c)=>(
          <rect key={`m1${r}${c}`} x={x} y={y} width="8" height="6" rx="1"
            fill="#4FC3F7" fillOpacity="0.15"
            className={["tw-a","tw-b","tw-c","tw-d","tw-e"][c]} />
        ))
      )}
      <text x="110" y="205" textAnchor="middle" fill="#4FC3F7" fontSize="7" fontFamily="monospace" opacity="0.7">DDR5-RAM</text>

      {/* SECOND MEMORY */}
      <rect x="70" y="220" width="80" height="55" rx="4" fill="url(#twChip)" stroke="#3A7AB5" strokeWidth="1" />
      <rect x="76" y="226" width="68" height="43" rx="2" fill="#060f1a" />
      {[232,242,252,260].map((y,r)=>
        [80,92,104,116,128].map((x,c)=>(
          <rect key={`m2${r}${c}`} x={x} y={y} width="8" height="6" rx="1"
            fill="#4FC3F7" fillOpacity="0.12"
            className={["tw-b","tw-c","tw-a","tw-e","tw-d"][c]} />
        ))
      )}
      <text x="110" y="282" textAnchor="middle" fill="#4FC3F7" fontSize="7" fontFamily="monospace" opacity="0.7">FLASH</text>

      {/* === NETWORK CHIP (right) === */}
      <rect x="450" y="140" width="80" height="55" rx="4" fill="url(#twChip)" stroke="#3A7AB5" strokeWidth="1" />
      <rect x="456" y="146" width="68" height="43" rx="2" fill="#060f1a" />
      {[152,164,176].map((y,r)=>
        [460,474,488,502].map((x,c)=>(
          <rect key={`n1${r}${c}`} x={x} y={y} width="10" height="8" rx="1"
            fill="#E8751A" fillOpacity="0.12"
            className={["tw-c","tw-a","tw-d","tw-b"][c]} />
        ))
      )}
      <text x="490" y="205" textAnchor="middle" fill="#E8751A" fontSize="7" fontFamily="monospace" opacity="0.7">5G/WiFi</text>

      {/* POWER CHIP (right bottom) */}
      <rect x="450" y="220" width="80" height="55" rx="4" fill="url(#twChip)" stroke="#3A7AB5" strokeWidth="1" />
      <rect x="456" y="226" width="68" height="43" rx="2" fill="#060f1a" />
      {[236,248,260].map((y,r)=>
        [460,476,492,508].map((x,c)=>(
          <rect key={`p1${r}${c}`} x={x} y={y} width="10" height="8" rx="1"
            fill="#E8751A" fillOpacity="0.1"
            className={["tw-d","tw-b","tw-c","tw-a"][c]} />
        ))
      )}
      <text x="490" y="282" textAnchor="middle" fill="#E8751A" fontSize="7" fontFamily="monospace" opacity="0.7">PMIC</text>

      {/* === PCB TRACES === */}
      {/* Left mem → CPU */}
      <polyline points="150,167 200,167 200,192 231,192" fill="none"
        stroke="#E8751A" strokeWidth="1.2" className="tw-a" />
      <polyline points="150,185 190,185 190,210 231,210" fill="none"
        stroke="#4FC3F7" strokeWidth="0.8" className="tw-c" />
      <polyline points="150,247 195,247 195,228 231,228" fill="none"
        stroke="#4FC3F7" strokeWidth="0.8" className="tw-b" />

      {/* Right chips → CPU */}
      <polyline points="450,167 410,167 410,192 369,192" fill="none"
        stroke="#E8751A" strokeWidth="1.2" className="tw-b" />
      <polyline points="450,183 415,183 415,210 369,210" fill="none"
        stroke="#4FC3F7" strokeWidth="0.8" className="tw-d" />
      <polyline points="450,247 420,247 420,228 369,228" fill="none"
        stroke="#4FC3F7" strokeWidth="0.8" className="tw-a" />

      {/* Animated data flows */}
      <polyline points="150,167 231,192" fill="none" stroke="#E8751A"
        strokeWidth="2" className="tw-dash" filter="url(#twGlow)" opacity="0.7" />
      <polyline points="450,167 369,192" fill="none" stroke="#E8751A"
        strokeWidth="2" className="tw-dash2" filter="url(#twGlow)" opacity="0.7" />

      {/* Top traces */}
      <line x1="60" y1="110" x2="240" y2="110" stroke="#E8751A" strokeWidth="0.8" className="tw-a" />
      <line x1="240" y1="110" x2="240" y2="148" stroke="#E8751A" strokeWidth="0.8" className="tw-a" />
      <line x1="60" y1="120" x2="220" y2="120" stroke="#4FC3F7" strokeWidth="0.6" className="tw-c" />
      <line x1="360" y1="110" x2="540" y2="110" stroke="#E8751A" strokeWidth="0.8" className="tw-b" />
      <line x1="360" y1="110" x2="360" y2="148" stroke="#E8751A" strokeWidth="0.8" className="tw-b" />
      <line x1="380" y1="120" x2="540" y2="120" stroke="#4FC3F7" strokeWidth="0.6" className="tw-d" />

      {/* Bottom traces */}
      <line x1="60" y1="310" x2="240" y2="310" stroke="#E8751A" strokeWidth="0.8" className="tw-c" />
      <line x1="240" y1="266" x2="240" y2="310" stroke="#E8751A" strokeWidth="0.8" className="tw-c" />
      <line x1="360" y1="310" x2="540" y2="310" stroke="#E8751A" strokeWidth="0.8" className="tw-d" />
      <line x1="360" y1="266" x2="360" y2="310" stroke="#E8751A" strokeWidth="0.8" className="tw-d" />

      {/* Animated flow on top trace */}
      <line x1="60" y1="110" x2="540" y2="110" stroke="#4FC3F7"
        strokeWidth="1.5" className="tw-dash" filter="url(#twGlow)" opacity="0.4" />

      {/* Solder vias on traces */}
      {[[150,167],[150,185],[150,247],[450,167],[450,183],[450,247],
        [200,167],[190,185],[195,247],[410,167],[415,183],[420,247]].map(([x,y],i)=>(
        <circle key={`sv${i}`} cx={x} cy={y} r="3" fill="#E8751A"
          fillOpacity="0.6" className={["tw-a","tw-b","tw-c","tw-pulse"][i%4]} />
      ))}

      {/* === STATUS INDICATORS === */}
      <g transform="translate(60,330)">
        {[["PWR","#00FF88"],["NET","#E8751A"],["SYS","#4FC3F7"],["AI","#E8751A"]].map(([label,color],i)=>(
          <g key={`led${i}`} transform={`translate(${i*60},0)`}>
            <circle cx="8" cy="8" r="5" fill={color} fillOpacity="0.8"
              className={["tw-a","tw-b","tw-c","tw-d"][i]} />
            <circle cx="8" cy="8" r="9" fill="none" stroke={color}
              strokeWidth="0.5" fillOpacity="0" opacity="0.2" />
            <text x="20" y="12" fill={color} fontSize="7" fontFamily="monospace" opacity="0.7">{label}</text>
          </g>
        ))}
      </g>

      {/* Binary display */}
      <rect x="360" y="325" width="180" height="24" rx="4" fill="#060f1a" stroke="#1a3a5c" strokeWidth="0.8" />
      {["1","0","1","1","0","0","1","0","1","1","0","1","0","0","1","0","1","1","0","1"].map((b,i)=>(
        <text key={`bin${i}`} x={366+i*8.5} y="341" fill={b==="1"?"#E8751A":"#1a3a5c"}
          fontSize="8" fontFamily="monospace"
          className={["tw-bit","tw-bit2","tw-bit3"][i%3]}>{b}</text>
      ))}

      {/* Title */}
      <rect x="30" y="68" width="165" height="28" rx="4" fill="#060f1a" fillOpacity="0.9"
        stroke="#1a3a5c" strokeWidth="0.8" />
      <text x="44" y="80" fill="#E8751A" fontSize="9" fontFamily="monospace" fontWeight="bold">台灣研發中心</text>
      <text x="44" y="91" fill="white" fontSize="7" fontFamily="monospace" fillOpacity="0.5">Taiwan R&amp;D · IoT Engineering</text>

      </svg>
  );
}
