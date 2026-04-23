import { readFileSync, writeFileSync } from 'fs';

const file = 'C:/Users/JasonLee/claude_code_projects/MCS_web/src/app/intro/page.tsx';
const content = readFileSync(file, 'utf8');

const START = '// ─── OmniCore Module Illustrations (SVG) ─────────────────────────────────────';
const END_MARKER = 'const MODULE_ILLUSTRATIONS = [\n  IllustrationDeviceMonitor,\n  IllustrationReports,\n  IllustrationAlerts,\n  IllustrationFoodSafety,\n  IllustrationReplenishment,\n  IllustrationPromotions,\n  IllustrationLoyalty,\n  IllustrationMultiTenant,\n];';

const startIdx = content.indexOf(START);
const endIdx = content.indexOf(END_MARKER) + END_MARKER.length;

const newBlock = `// ─── OmniCore Module Illustrations (Animated SVG + Framer Motion) ──────────────

function IllustrationDeviceMonitor() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="200" fill="#EFF6FF" rx="12"/>
      {[0,1,2,3,4,5].map(i => {
        const x = 24 + (i % 3) * 100, y = 20 + Math.floor(i/3) * 80;
        const ok = [0,1,3,5].includes(i);
        return (
          <g key={i}>
            <rect x={x} y={y} width="80" height="60" rx="8" fill="white" stroke={ok?"#2563EB":"#F59E0B"} strokeWidth="1.5"/>
            <rect x={x+6} y={y+8} width="48" height="28" rx="4" fill={ok?"#DBEAFE":"#FEF3C7"}/>
            <motion.circle cx={x+66} cy={y+14} r="6" fill={ok?"#22C55E":"#EF4444"}
              animate={{ scale: ok ? [1,1.35,1] : [1,0.8,1] }}
              transition={{ duration: 2+i*0.3, repeat: Infinity, ease:"easeInOut", delay: i*0.25 }}
              style={{ transformBox:"fill-box", transformOrigin:"center" }}
            />
            <motion.circle cx={x+66} cy={y+14} r="14" fill={ok?"#22C55E":"#EF4444"}
              animate={{ scale:[1,1.8], opacity:[0.35,0] }}
              transition={{ duration:1.8, repeat:Infinity, delay: i*0.3 }}
              style={{ transformBox:"fill-box", transformOrigin:"center" }}
            />
            <rect x={x+6} y={y+42} width="28" height="4" rx="2" fill="#93C5FD"/>
          </g>
        );
      })}
      <motion.circle cx="310" cy="100" r="38" fill="#2563EB"
        animate={{ scale:[1,1.15,1], opacity:[0.1,0.22,0.1] }}
        transition={{ duration:2.5, repeat:Infinity }}
        style={{ transformBox:"fill-box", transformOrigin:"center" }}
      />
      <circle cx="310" cy="100" r="14" fill="#2563EB"/>
      <path d="M303 100 L317 100 M310 93 L310 107" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      {[[164,50],[164,150],[204,100]].map(([ex,ey],i) => (
        <motion.line key={i} x1="310" y1="100" x2={ex} y2={ey}
          stroke="#2563EB" strokeWidth="1.5" strokeDasharray="4 3"
          initial={{ pathLength:0 }} animate={{ pathLength:1 }}
          transition={{ duration:0.8, delay:0.2+i*0.2 }}
        />
      ))}
      <motion.circle cx="310" cy="100" r="52" fill="none" stroke="#2563EB" strokeWidth="1.5"
        animate={{ scale:[0.85,1.3], opacity:[0.3,0] }}
        transition={{ duration:2.5, repeat:Infinity }}
        style={{ transformBox:"fill-box", transformOrigin:"center" }}
      />
    </svg>
  );
}

function IllustrationReports() {
  const bars = [90,60,110,75,130,85,140];
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="200" fill="#F5F3FF" rx="12"/>
      {bars.map((h,i) => (
        <motion.rect key={i} x={30+i*40} y={160-h} width="24" height={h} rx="4"
          fill={i===6?"#7C3AED":i===4?"#A78BFA":"#C4B5FD"}
          initial={{ scaleY:0 }} animate={{ scaleY:1 }}
          transition={{ duration:0.6, delay:0.1+i*0.08, ease:[0.22,1,0.36,1] }}
          style={{ transformBox:"fill-box", transformOrigin:"bottom" }}
        />
      ))}
      <motion.polyline points="42,70 82,100 122,50 162,85 202,20 242,55 282,10"
        fill="none" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength:0, opacity:0 }} animate={{ pathLength:1, opacity:1 }}
        transition={{ duration:1.2, delay:0.75, ease:"easeOut" }}
      />
      <motion.polygon points="282,10 295,6 289,18" fill="#7C3AED"
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.95 }}
      />
      {[0,1,2].map(i => (
        <motion.rect key={i} x="308" y={20+i*50} width="76" height="40" rx="8"
          fill="white" stroke="#DDD6FE" strokeWidth="1.5"
          initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }}
          transition={{ duration:0.45, delay:0.25+i*0.15 }}
        />
      ))}
      <rect x="316" y="28" width="30" height="6" rx="3" fill="#7C3AED"/>
      <rect x="316" y="38" width="50" height="4" rx="2" fill="#C4B5FD"/>
      <rect x="316" y="78" width="22" height="6" rx="3" fill="#A78BFA"/>
      <rect x="316" y="88" width="42" height="4" rx="2" fill="#C4B5FD"/>
      <rect x="316" y="128" width="38" height="6" rx="3" fill="#7C3AED"/>
      <rect x="316" y="138" width="52" height="4" rx="2" fill="#DDD6FE"/>
      <line x1="22" y1="162" x2="298" y2="162" stroke="#C4B5FD" strokeWidth="1.5"/>
    </svg>
  );
}

function IllustrationAlerts() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="200" fill="#FFF7ED" rx="12"/>
      {[60,74,88].map((r,i) => (
        <motion.circle key={i} cx="140" cy="100" r={r} fill="none" stroke="#F97316" strokeWidth="1.5"
          animate={{ scale:[1,1.18], opacity:[0.3,0] }}
          transition={{ duration:2, repeat:Infinity, delay:i*0.55 }}
          style={{ transformBox:"fill-box", transformOrigin:"center" }}
        />
      ))}
      <motion.g
        animate={{ rotate:[-14,14,-14,14,-7,7,0] }}
        transition={{ duration:1.8, repeat:Infinity, repeatDelay:2.5 }}
        style={{ transformBox:"fill-box", transformOrigin:"140px 80px" }}
      >
        <path d="M120 105 Q120 80 140 78 Q160 80 160 105 L165 115 H115 Z" fill="#F97316"/>
        <rect x="130" y="115" width="20" height="6" rx="3" fill="#EA580C"/>
        <circle cx="140" cy="120" r="5" fill="#EA580C"/>
        <polygon points="140,58 148,72 132,72" fill="#EF4444"/>
        <line x1="140" y1="62" x2="140" y2="68" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="140" cy="71" r="1.2" fill="white"/>
      </motion.g>
      {[0,1,2].map(i => (
        <motion.rect key={i} x="220" y={25+i*57} width="150" height="48" rx="10"
          fill="white" stroke="#FDBA74" strokeWidth="1.5"
          initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }}
          transition={{ duration:0.5, delay:0.15+i*0.18, ease:[0.22,1,0.36,1] }}
        />
      ))}
      <rect x="232" y="35" width="16" height="16" rx="4" fill="#06B6D4"/>
      <rect x="254" y="37" width="72" height="5" rx="2.5" fill="#374151"/>
      <rect x="254" y="46" width="50" height="4" rx="2" fill="#9CA3AF"/>
      <rect x="232" y="92" width="16" height="16" rx="4" fill="#EF4444"/>
      <rect x="254" y="94" width="88" height="5" rx="2.5" fill="#374151"/>
      <rect x="254" y="103" width="62" height="4" rx="2" fill="#9CA3AF"/>
      <rect x="232" y="148" width="16" height="16" rx="4" fill="#22C55E"/>
      <rect x="254" y="150" width="60" height="5" rx="2.5" fill="#374151"/>
      <rect x="254" y="159" width="78" height="4" rx="2" fill="#9CA3AF"/>
    </svg>
  );
}

function IllustrationFoodSafety() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="200" fill="#F0FDF4" rx="12"/>
      <rect x="40" y="30" width="28" height="110" rx="14" fill="#D1FAE5" stroke="#059669" strokeWidth="2"/>
      <rect x="50" y="55" width="8" height="70" rx="4" fill="#A7F3D0"/>
      <motion.rect x="50" y="55" width="8" height="70" rx="4" fill="#10B981"
        initial={{ scaleY:0 }} animate={{ scaleY:1 }}
        transition={{ duration:1.2, delay:0.3, ease:[0.22,1,0.36,1] }}
        style={{ transformBox:"fill-box", transformOrigin:"bottom" }}
      />
      <circle cx="54" cy="135" r="14" fill="#10B981"/>
      <circle cx="54" cy="135" r="8" fill="#059669"/>
      <motion.circle cx="54" cy="135" r="22" fill="none" stroke="#10B981" strokeWidth="2"
        animate={{ scale:[1,1.5], opacity:[0.5,0] }}
        transition={{ duration:1.8, repeat:Infinity }}
        style={{ transformBox:"fill-box", transformOrigin:"center" }}
      />
      <rect x="86" y="110" width="130" height="60" rx="8" fill="#DCFCE7" stroke="#86EFAC" strokeWidth="1.5" strokeDasharray="5 3"/>
      <motion.polyline points="86,100 108,95 130,98 152,92 174,96 186,94 216,97"
        fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round"
        initial={{ pathLength:0 }} animate={{ pathLength:1 }}
        transition={{ duration:1.4, delay:0.6 }}
      />
      <motion.circle cx="250" cy="80" r="32" fill="#059669"
        animate={{ scale:[1,1.05,1] }}
        transition={{ duration:2.5, repeat:Infinity }}
        style={{ transformBox:"fill-box", transformOrigin:"center" }}
      />
      <motion.path d="M236 80 L246 90 L264 68"
        stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"
        initial={{ pathLength:0 }} animate={{ pathLength:1 }}
        transition={{ duration:0.55, delay:1.2 }}
      />
      {[[320,40],[360,100],[310,155],[370,155]].map(([cx,cy],i) => (
        <motion.g key={i}
          animate={{ rotate:[0,360] }}
          transition={{ duration:9+i*2.5, repeat:Infinity, ease:"linear" }}
          style={{ transformBox:"fill-box", transformOrigin:cx+"px "+cy+"px" }}
        >
          <line x1={cx-12} y1={cy} x2={cx+12} y2={cy} stroke="#93C5FD" strokeWidth="2" strokeLinecap="round"/>
          <line x1={cx} y1={cy-12} x2={cx} y2={cy+12} stroke="#93C5FD" strokeWidth="2" strokeLinecap="round"/>
          <line x1={cx-8} y1={cy-8} x2={cx+8} y2={cy+8} stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1={cx+8} y1={cy-8} x2={cx-8} y2={cy+8} stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round"/>
        </motion.g>
      ))}
    </svg>
  );
}

function IllustrationReplenishment() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="200" fill="#F0FDFA" rx="12"/>
      {[0,1,2].map(row => (
        <g key={row}>
          <rect x="20" y={20+row*52} width="180" height="42" rx="4" fill="white" stroke="#5EEAD4" strokeWidth="1.5"/>
          {[0,1,2].map(col => {
            const fills = [[0.9,0.7,0.2],[0.6,0.9,0.4],[0.3,0.6,0.85]];
            const f = fills[row][col];
            const color = f>0.6?"#0D9488":f>0.35?"#F59E0B":"#EF4444";
            return (
              <g key={col}>
                <rect x={28+col*55} y={28+row*52} width="40" height="6" rx="3" fill="#E2E8F0"/>
                <motion.rect x={28+col*55} y={28+row*52} width={40*f} height="6" rx="3" fill={color}
                  initial={{ scaleX:0 }} animate={{ scaleX:1 }}
                  transition={{ duration:0.7, delay:0.1+row*0.15+col*0.1, ease:[0.22,1,0.36,1] }}
                  style={{ transformBox:"fill-box", transformOrigin:"left" }}
                />
              </g>
            );
          })}
        </g>
      ))}
      <motion.circle cx="256" cy="80" r="36" fill="#CCFBF1"
        animate={{ scale:[1,1.07,1] }} transition={{ duration:2.5, repeat:Infinity }}
        style={{ transformBox:"fill-box", transformOrigin:"center" }}
      />
      <circle cx="256" cy="80" r="24" fill="#0D9488" opacity="0.15"/>
      <ellipse cx="256" cy="78" rx="16" ry="18" fill="none" stroke="#0D9488" strokeWidth="2.5"/>
      <path d="M248 66 Q256 58 264 66" fill="none" stroke="#0D9488" strokeWidth="2" strokeLinecap="round"/>
      <line x1="240" y1="76" x2="272" y2="76" stroke="#0D9488" strokeWidth="1.5" strokeDasharray="3 2"/>
      {[{cx:248,cy:82},{cx:264,cy:82},{cx:256,cy:90}].map(({cx,cy},i) => (
        <motion.circle key={i} cx={cx} cy={cy} r="3" fill="#0D9488"
          animate={{ scale:[1,1.6,1], opacity:[1,0.4,1] }}
          transition={{ duration:1.4, repeat:Infinity, delay:i*0.3 }}
          style={{ transformBox:"fill-box", transformOrigin:"center" }}
        />
      ))}
      <motion.path d="M294 80 L320 80" stroke="#0D9488" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength:0 }} animate={{ pathLength:1 }}
        transition={{ duration:0.5, delay:0.9 }}
      />
      <motion.polygon points="320,74 332,80 320,86" fill="#0D9488"
        initial={{ opacity:0 }} animate={{ opacity:1 }}
        transition={{ delay:1.4 }}
      />
      <rect x="336" y="30" width="52" height="100" rx="8" fill="white" stroke="#5EEAD4" strokeWidth="1.5"/>
      {[0,1,2,3].map(i => (
        <motion.g key={i}
          initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }}
          transition={{ duration:0.35, delay:1.1+i*0.13 }}
        >
          <circle cx="347" cy={50+i*22} r="5" fill={i<3?"#0D9488":"#E2E8F0"}/>
          {i<3 && <path d={"M344 "+(50+i*22)+" L346 "+(52+i*22)+" L350 "+(48+i*22)} stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>}
          <rect x="356" y={46+i*22} width="24" height="4" rx="2" fill={i<3?"#5EEAD4":"#E2E8F0"}/>
        </motion.g>
      ))}
      <motion.g initial={{ x:-30, opacity:0 }} animate={{ x:0, opacity:1 }}
        transition={{ duration:0.7, delay:0.3, ease:[0.22,1,0.36,1] }}
      >
        <rect x="20" y="168" width="60" height="24" rx="4" fill="#0D9488"/>
        <rect x="54" y="162" width="26" height="30" rx="4" fill="#0D9488"/>
        <circle cx="30" cy="194" r="6" fill="#1E293B"/>
        <circle cx="70" cy="194" r="6" fill="#1E293B"/>
        <circle cx="30" cy="194" r="3" fill="#5EEAD4"/>
        <circle cx="70" cy="194" r="3" fill="#5EEAD4"/>
      </motion.g>
      <motion.polyline points="50,180 110,175 145,168 175,178"
        fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="5 3"
        initial={{ pathLength:0 }} animate={{ pathLength:1 }}
        transition={{ duration:0.8, delay:1.0 }}
      />
      {[[110,175],[145,168],[175,178]].map(([x,y],i) => (
        <motion.circle key={i} cx={x} cy={y} r="4" fill="#F59E0B"
          initial={{ scale:0 }} animate={{ scale:1 }}
          transition={{ delay:1.1+i*0.2, type:"spring", stiffness:400 }}
          style={{ transformBox:"fill-box", transformOrigin:"center" }}
        />
      ))}
    </svg>
  );
}

function IllustrationPromotions() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="200" fill="#FFF1F2" rx="12"/>
      <motion.g animate={{ y:[0,-5,0] }} transition={{ duration:2.8, repeat:Infinity, ease:"easeInOut" }}>
        <path d="M60 40 L160 40 L200 100 L160 160 L60 160 L20 100 Z" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2"/>
        <circle cx="78" cy="58" r="8" fill="#EF4444"/>
        <text x="65" y="115" fontSize="40" fontWeight="bold" fill="#EF4444" fontFamily="sans-serif">%</text>
      </motion.g>
      <motion.g
        animate={{ rotate:[0,360] }}
        transition={{ duration:14, repeat:Infinity, ease:"linear" }}
        style={{ transformBox:"fill-box", transformOrigin:"240px 70px" }}
      >
        {[0,45,90,135,180,225,270,315].map((deg,i) => {
          const rad = deg*Math.PI/180;
          return <line key={i}
            x1={240+36*Math.cos(rad)} y1={70+36*Math.sin(rad)}
            x2={240+52*Math.cos(rad)} y2={70+52*Math.sin(rad)}
            stroke="#FCA5A5" strokeWidth="2.5" strokeLinecap="round"/>;
        })}
      </motion.g>
      <motion.circle cx="240" cy="70" r="44" fill="#DC2626"
        animate={{ scale:[1,1.07,1] }} transition={{ duration:1.8, repeat:Infinity }}
        style={{ transformBox:"fill-box", transformOrigin:"center" }}
      />
      <circle cx="240" cy="70" r="36" fill="#EF4444"/>
      <text x="220" y="62" fontSize="20" fontWeight="bold" fill="white" fontFamily="sans-serif">10%</text>
      <text x="222" y="82" fontSize="12" fill="#FCA5A5" fontFamily="sans-serif">OFF</text>
      <motion.rect x="300" y="30" width="80" height="56" rx="10" fill="white" stroke="#FECACA" strokeWidth="1.5"
        initial={{ opacity:0, y:-12 }} animate={{ opacity:1, y:0 }}
        transition={{ duration:0.5, delay:0.2 }}
      />
      <circle cx="340" cy="58" r="18" fill="#FEE2E2"/>
      <circle cx="340" cy="58" r="14" fill="white" stroke="#EF4444" strokeWidth="2"/>
      <motion.line x1="340" y1="50" x2="340" y2="58" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"
        animate={{ rotate:[0,360] }} transition={{ duration:60, repeat:Infinity, ease:"linear" }}
        style={{ transformBox:"fill-box", transformOrigin:"340px 58px" }}
      />
      <line x1="340" y1="58" x2="347" y2="63" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round"/>
      <motion.rect x="212" y="128" width="168" height="58" rx="10" fill="white" stroke="#FECACA" strokeWidth="1.5"
        initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
        transition={{ duration:0.5, delay:0.4 }}
      />
      <rect x="222" y="140" width="40" height="8" rx="4" fill="#EF4444"/>
      <rect x="222" y="152" width="60" height="5" rx="2.5" fill="#FCA5A5"/>
      <rect x="222" y="162" width="44" height="5" rx="2.5" fill="#FECACA"/>
      <rect x="290" y="138" width="80" height="6" rx="3" fill="#E5E7EB"/>
      <motion.rect x="290" y="148" width="80" height="5" rx="2.5" fill="#EF4444" opacity="0.7"
        initial={{ scaleX:0 }} animate={{ scaleX:1 }}
        transition={{ duration:0.8, delay:0.9 }}
        style={{ transformBox:"fill-box", transformOrigin:"left" }}
      />
      <rect x="290" y="157" width="60" height="4" rx="2" fill="#E5E7EB"/>
      <motion.rect x="20" y="170" width="80" height="24" rx="12" fill="#DC2626"
        initial={{ scale:0 }} animate={{ scale:1 }}
        transition={{ type:"spring", stiffness:300, delay:0.6 }}
        style={{ transformBox:"fill-box", transformOrigin:"left center" }}
      />
      <text x="32" y="186" fontSize="11" fontWeight="bold" fill="white" fontFamily="sans-serif">BUY 1 GET 1</text>
    </svg>
  );
}

function IllustrationLoyalty() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="200" fill="#EEF2FF" rx="12"/>
      {[
        {x:30, color:"#B45309", light:"#FEF3C7"},
        {x:110, color:"#9CA3AF", light:"#F1F5F9"},
        {x:190, color:"#D97706", light:"#FEF9C3"},
      ].map(({x,color,light},i) => (
        <motion.g key={i}
          initial={{ opacity:0, y:24, scale:0.6 }} animate={{ opacity:1, y:0, scale:1 }}
          transition={{ duration:0.6, delay:0.08+i*0.18, type:"spring", stiffness:240 }}
          style={{ transformBox:"fill-box", transformOrigin:"center" }}
        >
          <circle cx={x+30} cy={80} r={20+i*6} fill={light} stroke={color} strokeWidth="2.5"/>
          <circle cx={x+30} cy={80} r={12+i*4} fill={color} opacity="0.7"/>
          <polygon points={(x+30)+","+(64-i*2)+" "+(x+33+i)+","+(72+i)+" "+(x+41+i)+","+(72+i)+" "+(x+35+i*1.5)+","+(78+i)+" "+(x+37+i)+","+(86+i)+" "+(x+30)+",82 "+(x+23-i)+","+(86+i)+" "+(x+25-i*1.5)+","+(78+i)+" "+(x+19-i)+","+(72+i)+" "+(x+27-i)+","+(72+i)}
            fill="white" opacity="0.85"/>
          <rect x={x+14} y={104} width="32" height="18" rx="9" fill={color}/>
        </motion.g>
      ))}
      {[260,285,310,335,360].map((cx,i) => (
        <motion.polygon key={i}
          points={cx+",55 "+(cx+5)+",67 "+(cx+17)+",67 "+(cx+8)+",75 "+(cx+11)+",87 "+cx+",80 "+(cx-11)+",87 "+(cx-8)+",75 "+(cx-17)+",67 "+(cx-5)+",67"}
          fill={i<3?"#6366F1":"#E0E7FF"}
          initial={{ scale:0, opacity:0 }} animate={{ scale:1, opacity:1 }}
          transition={{ duration:0.4, delay:0.5+i*0.12, type:"spring", stiffness:350 }}
          style={{ transformBox:"fill-box", transformOrigin:"center" }}
        />
      ))}
      <motion.g initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }}
        transition={{ duration:0.5, delay:0.85 }}
      >
        <rect x="240" y="100" width="140" height="64" rx="12" fill="#06C755"/>
        <path d="M252 164 L246 178 L264 164 Z" fill="#06C755"/>
        <circle cx="262" cy="132" r="6" fill="white"/>
        <circle cx="282" cy="132" r="6" fill="white"/>
        <circle cx="302" cy="132" r="6" fill="white"/>
        <rect x="252" y="110" width="112" height="14" rx="4" fill="white" opacity="0.3"/>
      </motion.g>
      <rect x="18" y="148" width="200" height="12" rx="6" fill="#C7D2FE"/>
      <motion.rect x="18" y="148" width="130" height="12" rx="6" fill="#6366F1"
        initial={{ scaleX:0 }} animate={{ scaleX:1 }}
        transition={{ duration:1.0, delay:0.95, ease:[0.22,1,0.36,1] }}
        style={{ transformBox:"fill-box", transformOrigin:"left" }}
      />
      <circle cx="148" cy="154" r="8" fill="white" stroke="#6366F1" strokeWidth="2.5"/>
      <motion.g initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }}
        transition={{ delay:1.5, type:"spring" }}
        style={{ transformBox:"fill-box", transformOrigin:"left center" }}
      >
        <rect x="18" y="168" width="100" height="24" rx="12" fill="#6366F1"/>
        <text x="28" y="184" fontSize="11" fontWeight="bold" fill="white" fontFamily="sans-serif">+18 pts earned</text>
      </motion.g>
    </svg>
  );
}

function IllustrationMultiTenant() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="200" fill="#F8FAFC" rx="12"/>
      <motion.g animate={{ scale:[1,1.03,1] }} transition={{ duration:3.5, repeat:Infinity }}
        style={{ transformBox:"fill-box", transformOrigin:"200px 44px" }}
      >
        <ellipse cx="200" cy="40" rx="60" ry="28" fill="#E2E8F0"/>
        <ellipse cx="175" cy="46" rx="44" ry="22" fill="#CBD5E1"/>
        <ellipse cx="225" cy="46" rx="44" ry="22" fill="#CBD5E1"/>
        <ellipse cx="200" cy="50" rx="70" ry="25" fill="#94A3B8"/>
        <text x="180" y="54" fontSize="11" fontWeight="bold" fill="white" fontFamily="sans-serif">OmniCore</text>
      </motion.g>
      {[[115,72,80,110],[200,75,200,110],[285,72,320,110]].map(([x1,y1,x2,y2],i) => (
        <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 3"
          initial={{ pathLength:0 }} animate={{ pathLength:1 }}
          transition={{ duration:0.6, delay:0.25+i*0.15 }}
        />
      ))}
      {[
        {x:30, color:"#E8751A", bg:"#FFF7ED", label:"EB+"},
        {x:150, color:"#7C3AED", bg:"#F5F3FF", label:"翔耀"},
        {x:270, color:"#0891B2", bg:"#ECFEFF", label:"Client C"},
      ].map(({x,color,bg,label},i) => (
        <motion.g key={i}
          initial={{ opacity:0, y:22 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.5, delay:0.55+i*0.15, ease:[0.22,1,0.36,1] }}
        >
          <rect x={x} y={110} width="100" height="70" rx="10" fill={bg} stroke={color} strokeWidth="2"/>
          <rect x={x} y={110} width="100" height="22" rx="10" fill={color}/>
          <rect x={x} y={120} width="100" height="12" fill={color}/>
          <text x={x+50} y={125} fontSize="10" fontWeight="bold" fill="white" fontFamily="sans-serif" textAnchor="middle">{label}</text>
          <rect x={x+10} y={140} width="50" height="4" rx="2" fill={color} opacity="0.4"/>
          <rect x={x+10} y={148} width="36" height="4" rx="2" fill={color} opacity="0.3"/>
          <rect x={x+10} y={156} width="44" height="4" rx="2" fill={color} opacity="0.4"/>
          <motion.g
            animate={{ rotate:[-5,5,-5] }}
            transition={{ duration:3+i*0.6, repeat:Infinity, ease:"easeInOut", delay:i*0.5 }}
            style={{ transformBox:"fill-box", transformOrigin:(x+80)+"px 147px" }}
          >
            <rect x={x+70} y={138} width="20" height="16" rx="3" fill="white" stroke={color} strokeWidth="1.5"/>
            <path d={"M"+(x+76)+" 138 Q"+(x+80)+" 130 "+(x+84)+" 138"} fill="none" stroke={color} strokeWidth="1.5"/>
            <circle cx={x+80} cy={147} r="3" fill={color}/>
          </motion.g>
        </motion.g>
      ))}
      <motion.path d="M192 58 L200 56 L208 58 L208 68 Q208 74 200 76 Q192 74 192 68 Z"
        fill="#1E293B" opacity="0.7"
        animate={{ scale:[1,1.12,1] }} transition={{ duration:2.2, repeat:Infinity }}
        style={{ transformBox:"fill-box", transformOrigin:"center" }}
      />
      <text x="197" y="69" fontSize="7" fontWeight="bold" fill="#64748B" fontFamily="sans-serif">JWT</text>
    </svg>
  );
}

const MODULE_ILLUSTRATIONS = [
  IllustrationDeviceMonitor,
  IllustrationReports,
  IllustrationAlerts,
  IllustrationFoodSafety,
  IllustrationReplenishment,
  IllustrationPromotions,
  IllustrationLoyalty,
  IllustrationMultiTenant,
];`;

const newContent = content.slice(0, startIdx) + newBlock + content.slice(endIdx);
writeFileSync(file, newContent);
console.log('Done. Size:', newContent.length, '(was', content.length + ')');
