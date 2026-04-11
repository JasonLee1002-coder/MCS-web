export default function SGHQIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 260" width="100%" height="100%" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sgSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a1628" />
          <stop offset="100%" stopColor="#0F2440" />
        </linearGradient>
        <linearGradient id="sgBuild" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e3f60" />
          <stop offset="100%" stopColor="#0d1e33" />
        </linearGradient>
        <filter id="sgBlur"><feGaussianBlur stdDeviation="10" /></filter>
        <style>{`
          @keyframes sgP{0%,100%{opacity:.25}50%{opacity:.85}}
          @keyframes sgD{0%{stroke-dashoffset:50}100%{stroke-dashoffset:0}}
          .sga{animation:sgP 2.8s ease-in-out infinite}
          .sgb{animation:sgP 2.8s ease-in-out infinite .6s}
          .sgc{animation:sgP 2.8s ease-in-out infinite 1.2s}
          .sgd{animation:sgP 2.8s ease-in-out infinite 1.8s}
          .sge{stroke-dasharray:5 4;animation:sgD 1.8s linear infinite}
        `}</style>
      </defs>
      <rect width="600" height="260" fill="url(#sgSky)" />
      <line x1="0" y1="65" x2="600" y2="65" stroke="#E8751A" strokeWidth="0.3" strokeOpacity="0.07"/>
      <line x1="0" y1="130" x2="600" y2="130" stroke="#E8751A" strokeWidth="0.3" strokeOpacity="0.07"/>
      <line x1="0" y1="195" x2="600" y2="195" stroke="#E8751A" strokeWidth="0.3" strokeOpacity="0.07"/>
      <line x1="120" y1="0" x2="120" y2="260" stroke="#E8751A" strokeWidth="0.3" strokeOpacity="0.07"/>
      <line x1="240" y1="0" x2="240" y2="260" stroke="#E8751A" strokeWidth="0.3" strokeOpacity="0.07"/>
      <line x1="360" y1="0" x2="360" y2="260" stroke="#E8751A" strokeWidth="0.3" strokeOpacity="0.07"/>
      <line x1="480" y1="0" x2="480" y2="260" stroke="#E8751A" strokeWidth="0.3" strokeOpacity="0.07"/>
      <ellipse cx="300" cy="260" rx="200" ry="55" fill="#E8751A" fillOpacity="0.1" filter="url(#sgBlur)"/>
      <rect x="20" y="155" width="25" height="105" fill="#0c1e32"/>
      <rect x="50" y="140" width="20" height="120" fill="#0c1e32"/>
      <rect x="545" y="160" width="28" height="100" fill="#0c1e32"/>
      <rect x="578" y="145" width="20" height="115" fill="#0c1e32"/>
      <rect x="75" y="60" width="65" height="200" fill="url(#sgBuild)"/>
      <rect x="75" y="57" width="65" height="4" fill="#E8751A"/>
      <rect x="80" y="68" width="13" height="12" fill="#E8751A" fillOpacity="0.3" className="sga"/>
      <rect x="98" y="68" width="13" height="12" fill="#E8751A" fillOpacity="0.3" className="sgb"/>
      <rect x="116" y="68" width="13" height="12" fill="#E8751A" fillOpacity="0.3" className="sgc"/>
      <rect x="80" y="88" width="13" height="12" fill="#E8751A" fillOpacity="0.22" className="sgb"/>
      <rect x="98" y="88" width="13" height="12" fill="#E8751A" fillOpacity="0.22" className="sgc"/>
      <rect x="116" y="88" width="13" height="12" fill="#E8751A" fillOpacity="0.22" className="sga"/>
      <rect x="80" y="108" width="13" height="12" fill="#E8751A" fillOpacity="0.16" className="sgc"/>
      <rect x="98" y="108" width="13" height="12" fill="#E8751A" fillOpacity="0.16" className="sga"/>
      <rect x="116" y="108" width="13" height="12" fill="#E8751A" fillOpacity="0.16" className="sgb"/>
      <rect x="80" y="128" width="13" height="12" fill="#E8751A" fillOpacity="0.12" className="sgd"/>
      <rect x="98" y="128" width="13" height="12" fill="#E8751A" fillOpacity="0.12" className="sga"/>
      <rect x="116" y="128" width="13" height="12" fill="#E8751A" fillOpacity="0.12" className="sgb"/>
      <rect x="260" y="16" width="85" height="244" fill="url(#sgBuild)"/>
      <rect x="260" y="12" width="85" height="5" fill="#E8751A"/>
      <rect x="265" y="24" width="11" height="11" fill="#E8751A" fillOpacity="0.32" className="sga"/>
      <rect x="280" y="24" width="11" height="11" fill="#E8751A" fillOpacity="0.32" className="sgb"/>
      <rect x="295" y="24" width="11" height="11" fill="#E8751A" fillOpacity="0.32" className="sgc"/>
      <rect x="310" y="24" width="11" height="11" fill="#E8751A" fillOpacity="0.32" className="sgd"/>
      <rect x="325" y="24" width="11" height="11" fill="#E8751A" fillOpacity="0.32" className="sga"/>
      <rect x="265" y="41" width="11" height="11" fill="#E8751A" fillOpacity="0.25" className="sgb"/>
      <rect x="280" y="41" width="11" height="11" fill="#E8751A" fillOpacity="0.25" className="sgc"/>
      <rect x="295" y="41" width="11" height="11" fill="#E8751A" fillOpacity="0.25" className="sgd"/>
      <rect x="310" y="41" width="11" height="11" fill="#E8751A" fillOpacity="0.25" className="sga"/>
      <rect x="325" y="41" width="11" height="11" fill="#E8751A" fillOpacity="0.25" className="sgb"/>
      <rect x="265" y="58" width="11" height="11" fill="#E8751A" fillOpacity="0.2" className="sgc"/>
      <rect x="280" y="58" width="11" height="11" fill="#E8751A" fillOpacity="0.2" className="sgd"/>
      <rect x="295" y="58" width="11" height="11" fill="#E8751A" fillOpacity="0.2" className="sga"/>
      <rect x="310" y="58" width="11" height="11" fill="#E8751A" fillOpacity="0.2" className="sgb"/>
      <rect x="325" y="58" width="11" height="11" fill="#E8751A" fillOpacity="0.2" className="sgc"/>
      <rect x="265" y="75" width="11" height="11" fill="#E8751A" fillOpacity="0.15" className="sgd"/>
      <rect x="280" y="75" width="11" height="11" fill="#E8751A" fillOpacity="0.15" className="sga"/>
      <rect x="295" y="75" width="11" height="11" fill="#E8751A" fillOpacity="0.15" className="sgb"/>
      <rect x="310" y="75" width="11" height="11" fill="#E8751A" fillOpacity="0.15" className="sgc"/>
      <rect x="325" y="75" width="11" height="11" fill="#E8751A" fillOpacity="0.15" className="sgd"/>
      <rect x="450" y="70" width="76" height="190" fill="url(#sgBuild)"/>
      <rect x="450" y="66" width="76" height="4" fill="#E8751A"/>
      <rect x="455" y="78" width="13" height="12" fill="#E8751A" fillOpacity="0.26" className="sgb"/>
      <rect x="473" y="78" width="13" height="12" fill="#E8751A" fillOpacity="0.26" className="sgc"/>
      <rect x="491" y="78" width="13" height="12" fill="#E8751A" fillOpacity="0.26" className="sga"/>
      <rect x="509" y="78" width="13" height="12" fill="#E8751A" fillOpacity="0.26" className="sgd"/>
      <rect x="455" y="97" width="13" height="12" fill="#E8751A" fillOpacity="0.2" className="sgc"/>
      <rect x="473" y="97" width="13" height="12" fill="#E8751A" fillOpacity="0.2" className="sgd"/>
      <rect x="491" y="97" width="13" height="12" fill="#E8751A" fillOpacity="0.2" className="sga"/>
      <rect x="509" y="97" width="13" height="12" fill="#E8751A" fillOpacity="0.2" className="sgb"/>
      <rect x="455" y="116" width="13" height="12" fill="#E8751A" fillOpacity="0.15" className="sga"/>
      <rect x="473" y="116" width="13" height="12" fill="#E8751A" fillOpacity="0.15" className="sgb"/>
      <rect x="491" y="116" width="13" height="12" fill="#E8751A" fillOpacity="0.15" className="sgc"/>
      <rect x="175" y="95" width="52" height="165" fill="url(#sgBuild)"/>
      <rect x="175" y="92" width="52" height="3" fill="#E8751A" fillOpacity="0.7"/>
      <rect x="180" y="102" width="11" height="11" fill="#E8751A" fillOpacity="0.2" className="sgc"/>
      <rect x="196" y="102" width="11" height="11" fill="#E8751A" fillOpacity="0.2" className="sga"/>
      <rect x="212" y="102" width="11" height="11" fill="#E8751A" fillOpacity="0.2" className="sgb"/>
      <rect x="180" y="119" width="11" height="11" fill="#E8751A" fillOpacity="0.15" className="sgd"/>
      <rect x="196" y="119" width="11" height="11" fill="#E8751A" fillOpacity="0.15" className="sga"/>
      <rect x="380" y="88" width="48" height="172" fill="url(#sgBuild)"/>
      <rect x="380" y="85" width="48" height="3" fill="#E8751A" fillOpacity="0.7"/>
      <rect x="385" y="95" width="11" height="11" fill="#E8751A" fillOpacity="0.18" className="sgb"/>
      <rect x="401" y="95" width="11" height="11" fill="#E8751A" fillOpacity="0.18" className="sgc"/>
      <rect x="385" y="112" width="11" height="11" fill="#E8751A" fillOpacity="0.14" className="sga"/>
      <rect x="401" y="112" width="11" height="11" fill="#E8751A" fillOpacity="0.14" className="sgb"/>
      <line x1="0" y1="218" x2="600" y2="218" stroke="#E8751A" strokeWidth="0.5" strokeOpacity="0.2" className="sge"/>
      <line x1="0" y1="234" x2="600" y2="234" stroke="#3B82F6" strokeWidth="0.4" strokeOpacity="0.12" className="sge"/>
      <circle cx="108" cy="88" r="3" fill="#E8751A" className="sga"/>
      <circle cx="108" cy="88" r="7" fill="none" stroke="#E8751A" strokeWidth="0.5" strokeOpacity="0.35"/>
      <circle cx="303" cy="36" r="4" fill="#E8751A" className="sgb"/>
      <circle cx="303" cy="36" r="9" fill="none" stroke="#E8751A" strokeWidth="0.5" strokeOpacity="0.35"/>
      <circle cx="488" cy="95" r="3" fill="#E8751A" className="sgc"/>
      <circle cx="488" cy="95" r="7" fill="none" stroke="#E8751A" strokeWidth="0.5" strokeOpacity="0.35"/>
      <line x1="108" y1="88" x2="303" y2="36" stroke="#E8751A" strokeWidth="0.4" strokeOpacity="0.18"/>
      <line x1="303" y1="36" x2="488" y2="95" stroke="#E8751A" strokeWidth="0.4" strokeOpacity="0.18"/>
      <circle cx="38" cy="22" r="1" fill="white" fillOpacity="0.55" className="sga"/>
      <circle cx="170" cy="14" r="1" fill="white" fillOpacity="0.5" className="sgb"/>
      <circle cx="390" cy="20" r="1" fill="white" fillOpacity="0.55" className="sgc"/>
      <circle cx="555" cy="30" r="1" fill="white" fillOpacity="0.5" className="sgd"/>
      <line x1="0" y1="254" x2="600" y2="254" stroke="#E8751A" strokeWidth="0.5" strokeOpacity="0.25"/>
      <rect x="0" y="254" width="600" height="6" fill="#E8751A" fillOpacity="0.04"/>
    </svg>
  );
}
