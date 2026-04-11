export default function SGHQIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 260" width="100%" height="100%" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sgSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#060d1f" />
          <stop offset="55%" stopColor="#0a1628" />
          <stop offset="100%" stopColor="#0d1e38" />
        </linearGradient>
        <linearGradient id="sgWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d2040" />
          <stop offset="100%" stopColor="#060f20" />
        </linearGradient>
        <linearGradient id="sgBldA" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e3f60" />
          <stop offset="100%" stopColor="#0c1e35" />
        </linearGradient>
        <linearGradient id="sgBldB" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#172e4a" />
          <stop offset="100%" stopColor="#0a1828" />
        </linearGradient>
        <linearGradient id="sgMBS" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a3d60" />
          <stop offset="100%" stopColor="#0c2240" />
        </linearGradient>
        <radialGradient id="sgGlow" cx="50%" cy="100%" r="60%">
          <stop offset="0%" stopColor="#E8751A" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#E8751A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sgMoonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E8751A" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#E8751A" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#E8751A" stopOpacity="0" />
        </radialGradient>
        <filter id="sgBlur2"><feGaussianBlur stdDeviation="8" /></filter>
        <filter id="sgBlur4"><feGaussianBlur stdDeviation="4" /></filter>
        <filter id="sgBlur1"><feGaussianBlur stdDeviation="1.5" /></filter>
        <clipPath id="sgClip"><rect width="600" height="260" /></clipPath>
        <style>{`
          @keyframes sgWin{0%,100%{opacity:.18}50%{opacity:.85}}
          @keyframes sgWin2{0%,100%{opacity:.12}50%{opacity:.7}}
          @keyframes sgPulse{0%,100%{opacity:.3;r:4}50%{opacity:1;r:6}}
          @keyframes sgDash{0%{stroke-dashoffset:60}100%{stroke-dashoffset:0}}
          @keyframes sgFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
          @keyframes sgWave{0%{transform:translateX(0)}100%{transform:translateX(-40px)}}
          @keyframes sgFlicker{0%,95%,100%{opacity:1}96%,98%{opacity:.4}}
          .sg-wa{animation:sgWin 2.4s ease-in-out infinite}
          .sg-wb{animation:sgWin 2.4s ease-in-out .5s infinite}
          .sg-wc{animation:sgWin 2.4s ease-in-out 1s infinite}
          .sg-wd{animation:sgWin 2.4s ease-in-out 1.5s infinite}
          .sg-we{animation:sgWin2 3s ease-in-out .3s infinite}
          .sg-wf{animation:sgWin2 3s ease-in-out .8s infinite}
          .sg-pulse{animation:sgPulse 2s ease-in-out infinite}
          .sg-pulse2{animation:sgPulse 2s ease-in-out .7s infinite}
          .sg-pulse3{animation:sgPulse 2s ease-in-out 1.4s infinite}
          .sg-dash{stroke-dasharray:8 6;animation:sgDash 2s linear infinite}
          .sg-float{animation:sgFloat 4s ease-in-out infinite}
          .sg-wave{animation:sgWave 6s linear infinite}
          .sg-flicker{animation:sgFlicker 8s ease-in-out infinite}
        `}</style>
      </defs>
      <g clipPath="url(#sgClip)">

      {/* Sky */}
      <rect width="600" height="260" fill="url(#sgSky)" />

      {/* Stars */}
      {[
        [22,14],[58,8],[95,18],[145,6],[200,12],[255,8],[310,16],[355,5],[398,14],[440,9],
        [475,18],[510,7],[545,15],[575,10],[35,30],[120,25],[180,32],[270,28],[380,24],[490,30]
      ].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r={i%3===0?1.2:0.7} fill="white"
          fillOpacity={0.3+0.3*(i%3)} className={["sg-wa","sg-wb","sg-wc","sg-wd"][i%4]} />
      ))}

      {/* Moon / atmosphere orb */}
      <circle cx="520" cy="35" r="22" fill="url(#sgMoonGlow)" filter="url(#sgBlur4)" />
      <circle cx="520" cy="35" r="8" fill="#E8751A" fillOpacity="0.6" />
      <circle cx="520" cy="35" r="5" fill="#E8751A" fillOpacity="0.9" className="sg-flicker" />

      {/* Ambient city glow on horizon */}
      <ellipse cx="300" cy="200" rx="280" ry="60" fill="url(#sgGlow)" filter="url(#sgBlur2)" />

      {/* === WATER === */}
      <rect x="0" y="205" width="600" height="55" fill="url(#sgWater)" />
      {/* Water shimmer lines */}
      <g className="sg-wave" opacity="0.12">
        {[0,40,80,120,160,200,240,280,320,360,400,440,480,520,560,600,640].map((x,i)=>(
          <line key={i} x1={x} y1={215+((i%3)*4)} x2={x+28} y2={215+((i%3)*4)}
            stroke="white" strokeWidth="0.8" />
        ))}
      </g>
      <g className="sg-wave" opacity="0.08" style={{animationDelay:"3s"}}>
        {[20,60,100,140,180,220,260,300,340,380,420,460,500,540,580].map((x,i)=>(
          <line key={i} x1={x} y1={228+((i%2)*5)} x2={x+20} y2={228+((i%2)*5)}
            stroke="white" strokeWidth="0.6" />
        ))}
      </g>

      {/* Building reflections in water */}
      <rect x="270" y="207" width="18" height="35" fill="#E8751A" fillOpacity="0.06" />
      <rect x="295" y="207" width="14" height="28" fill="#1e3f60" fillOpacity="0.12" />
      <rect x="315" y="207" width="18" height="28" fill="#1e3f60" fillOpacity="0.12" />
      <rect x="185" y="207" width="20" height="22" fill="#1e3f60" fillOpacity="0.1" />

      {/* === BACKGROUND BUILDINGS (far) === */}
      {/* Far left cluster */}
      <rect x="0" y="158" width="18" height="47" fill="url(#sgBldB)" opacity="0.5" />
      <rect x="20" y="148" width="22" height="57" fill="url(#sgBldB)" opacity="0.5" />
      <rect x="44" y="162" width="16" height="43" fill="url(#sgBldB)" opacity="0.4" />
      {/* Far right cluster */}
      <rect x="555" y="155" width="20" height="50" fill="url(#sgBldB)" opacity="0.5" />
      <rect x="578" y="145" width="22" height="60" fill="url(#sgBldB)" opacity="0.5" />

      {/* Mid bg buildings */}
      <rect x="62" y="140" width="28" height="65" fill="url(#sgBldA)" opacity="0.6" />
      <rect x="92" y="128" width="24" height="77" fill="url(#sgBldA)" opacity="0.6" />
      <rect x="118" y="145" width="20" height="60" fill="url(#sgBldA)" opacity="0.55" />
      <rect x="450" y="138" width="28" height="67" fill="url(#sgBldA)" opacity="0.6" />
      <rect x="480" y="128" width="22" height="77" fill="url(#sgBldA)" opacity="0.6" />
      <rect x="504" y="148" width="18" height="57" fill="url(#sgBldA)" opacity="0.55" />
      <rect x="524" y="138" width="25" height="67" fill="url(#sgBldA)" opacity="0.5" />

      {/* === MAIN BUILDINGS === */}

      {/* Left tower cluster */}
      <rect x="64" y="70" width="62" height="135" fill="url(#sgBldA)" />
      <rect x="64" y="67" width="62" height="4" fill="#E8751A" fillOpacity="0.8" />
      {/* Windows left tower */}
      {[78,94,110,126].map((y,r)=>
        [70,80,90,100,110,118].map((x,c)=>(
          <rect key={`lt${r}${c}`} x={x} y={y} width="7" height="9"
            fill="#E8751A" fillOpacity={0.12+0.1*(r%2)}
            className={["sg-wa","sg-wb","sg-wc","sg-wd","sg-we","sg-wf"][c]} />
        ))
      )}
      {/* Antenna */}
      <line x1="95" y1="40" x2="95" y2="67" stroke="#E8751A" strokeWidth="1.5" opacity="0.6" />
      <circle cx="95" cy="38" r="3" fill="#E8751A" opacity="0.9" className="sg-pulse" />
      <circle cx="95" cy="38" r="8" fill="none" stroke="#E8751A" strokeWidth="0.5" opacity="0.3" />

      {/* Second left building */}
      <rect x="142" y="95" width="50" height="110" fill="url(#sgBldA)" />
      <rect x="142" y="92" width="50" height="3" fill="#E8751A" fillOpacity="0.6" />
      {[106,120,134,148,162].map((y,r)=>
        [148,160,172,184].map((x,c)=>(
          <rect key={`lb${r}${c}`} x={x} y={y} width="8" height="8"
            fill="#E8751A" fillOpacity={0.1+0.08*(c%2)}
            className={["sg-wb","sg-wc","sg-wa","sg-wd"][c%4]} />
        ))
      )}

      {/* === MARINA BAY SANDS (centre hero) === */}
      {/* Tower 1 */}
      <rect x="245" y="58" width="24" height="148" fill="url(#sgMBS)" />
      {/* Tower 2 */}
      <rect x="278" y="50" width="24" height="156" fill="url(#sgMBS)" />
      {/* Tower 3 */}
      <rect x="311" y="62" width="24" height="144" fill="url(#sgMBS)" />
      {/* Sky deck / roof boat */}
      <path d="M238 50 Q268 38 300 34 Q332 38 342 50 L342 58 L238 58 Z" fill="#1a3a5c" />
      <rect x="238" y="54" width="104" height="5" fill="#E8751A" fillOpacity="0.7" />
      {/* Sky deck detail */}
      <ellipse cx="290" cy="44" rx="48" ry="8" fill="#1d4060" stroke="#E8751A" strokeWidth="0.5" strokeOpacity="0.4" />
      {/* Infinity pool shimmer on deck */}
      <rect x="255" y="40" width="70" height="3" fill="#4FC3F7" fillOpacity="0.25" rx="1" />
      {/* MBS Windows */}
      {[74,90,106,122,138,154,170,186].map((y,r)=>(
        <g key={`mbs${r}`}>
          <rect x="249" y={y} width="16" height="10" fill="#E8751A"
            fillOpacity={0.1+0.06*(r%3)} className={["sg-wa","sg-wb","sg-wc"][r%3]} />
          <rect x="282" y={y} width="16" height="10" fill="#E8751A"
            fillOpacity={0.12+0.06*((r+1)%3)} className={["sg-wb","sg-wc","sg-wa"][r%3]} />
          <rect x="315" y={y} width="16" height="10" fill="#E8751A"
            fillOpacity={0.1+0.06*((r+2)%3)} className={["sg-wc","sg-wa","sg-wb"][r%3]} />
        </g>
      ))}
      {/* MBS glow */}
      <rect x="238" y="50" width="106" height="156" fill="#E8751A" fillOpacity="0.03" />

      {/* Right tower cluster */}
      <rect x="390" y="82" width="52" height="123" fill="url(#sgBldA)" />
      <rect x="390" y="79" width="52" height="3" fill="#E8751A" fillOpacity="0.6" />
      {[92,106,120,134,148,162].map((y,r)=>
        [396,408,420,432].map((x,c)=>(
          <rect key={`rb${r}${c}`} x={x} y={y} width="9" height="8"
            fill="#E8751A" fillOpacity={0.1+0.07*(c%2)}
            className={["sg-wc","sg-wd","sg-wb","sg-wa"][c%4]} />
        ))
      )}

      <rect x="448" y="68" width="60" height="137" fill="url(#sgBldA)" />
      <rect x="448" y="65" width="60" height="3" fill="#E8751A" fillOpacity="0.7" />
      {[80,96,112,128,144,160].map((y,r)=>
        [454,466,478,490,500].map((x,c)=>(
          <rect key={`rr${r}${c}`} x={x} y={y} width="8" height="9"
            fill="#E8751A" fillOpacity={0.1+0.07*(r%3)}
            className={["sg-wa","sg-wc","sg-wb","sg-wd","sg-we"][c%5]} />
        ))
      )}
      {/* Right antenna */}
      <line x1="478" y1="38" x2="478" y2="65" stroke="#E8751A" strokeWidth="1.5" opacity="0.6" />
      <circle cx="478" cy="36" r="3" fill="#E8751A" opacity="0.9" className="sg-pulse2" />
      <circle cx="478" cy="36" r="8" fill="none" stroke="#E8751A" strokeWidth="0.5" opacity="0.3" />

      {/* Singapore Flyer (ferris wheel) - right */}
      <circle cx="552" cy="145" r="30" fill="none" stroke="#2a5080" strokeWidth="1.5" opacity="0.7" />
      <circle cx="552" cy="145" r="30" fill="none" stroke="#E8751A" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" className="sg-dash" />
      {/* Spokes */}
      {[0,45,90,135].map((a,i)=>(
        <line key={`spoke${i}`}
          x1={552+30*Math.cos(a*Math.PI/180)} y1={145+30*Math.sin(a*Math.PI/180)}
          x2={552+30*Math.cos((a+180)*Math.PI/180)} y2={145+30*Math.sin((a+180)*Math.PI/180)}
          stroke="#2a5080" strokeWidth="0.8" opacity="0.6" />
      ))}
      {/* Gondolas */}
      {[0,60,120,180,240,300].map((a,i)=>(
        <rect key={`gondola${i}`}
          x={552+28*Math.cos(a*Math.PI/180)-4}
          y={145+28*Math.sin(a*Math.PI/180)-3}
          width="8" height="6" rx="1" fill="#1a3a5c"
          stroke="#E8751A" strokeWidth="0.5" fillOpacity="0.8" />
      ))}
      <circle cx="552" cy="145" r="4" fill="#E8751A" fillOpacity="0.6" />
      {/* Ferris wheel support */}
      <line x1="542" y1="175" x2="532" y2="205" stroke="#2a5080" strokeWidth="2" opacity="0.6" />
      <line x1="562" y1="175" x2="572" y2="205" stroke="#2a5080" strokeWidth="2" opacity="0.6" />

      {/* === NETWORK NODES / DATA CONNECTIONS === */}
      <circle cx="95" cy="38" r="3" fill="#E8751A" opacity="0" /> {/* anchor already drawn */}
      <line x1="95" y1="38" x2="290" y2="34" stroke="#E8751A" strokeWidth="0.4" strokeOpacity="0.2" />
      <line x1="290" y1="34" x2="478" y2="36" stroke="#E8751A" strokeWidth="0.4" strokeOpacity="0.2" />
      {/* Data flow arc */}
      <path d="M 95 38 Q 192 10 290 34 Q 384 10 478 36"
        fill="none" stroke="#E8751A" strokeWidth="0.8" strokeOpacity="0.15"
        strokeDasharray="6 8" className="sg-dash" />

      {/* Horizon line */}
      <line x1="0" y1="205" x2="600" y2="205" stroke="#E8751A" strokeWidth="0.4" strokeOpacity="0.25" />

      {/* SG label */}
      <rect x="240" y="216" width="100" height="28" rx="6" fill="#0a1628" fillOpacity="0.85"
        stroke="#E8751A" strokeWidth="0.5" strokeOpacity="0.4" />
      <text x="290" y="228" textAnchor="middle" fill="#E8751A" fontSize="8"
        fontFamily="monospace" fontWeight="bold" className="sg-float">SINGAPORE HQ</text>
      <text x="290" y="239" textAnchor="middle" fill="white" fontSize="6.5"
        fontFamily="monospace" fillOpacity="0.5">Meta Clearing Station Pte. Ltd.</text>

      </g>
    </svg>
  );
}
