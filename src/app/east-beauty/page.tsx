"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ── Fade-in ── */
function useFadeIn(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("eb-visible"); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

/* ── Counter ── */
function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let cur = 0; const step = Math.ceil(to / 50);
        const t = setInterval(() => { cur = Math.min(cur + step, to); setV(cur); if (cur >= to) clearInterval(t); }, 28);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{prefix}{v}{suffix}</span>;
}

/* ── Data ── */
const RENDERS = [
  { src: "/images/eastbeauty/render1.png", label: "用餐區 × 接待台" },
  { src: "/images/eastbeauty/render3.png", label: "入口自助服務區" },
  { src: "/images/eastbeauty/render2.png", label: "吧檯工作站" },
  { src: "/images/eastbeauty/render4.png", label: "全景用餐空間" },
  { src: "/images/eastbeauty/render5.png", label: "設備導入後視角" },
  { src: "/images/eastbeauty/render6.png", label: "候位區設計" },
];

const SEMI_STATIONS = [
  {
    num: "01",
    icon: "📱",
    name: "自助點餐",
    human: "引導入座",
    machine: "Kiosk 自選菜單 · 桌邊 QR 碼點餐",
    color: "#f5c842",
    saving: "省 1 位點餐人員",
  },
  {
    num: "02",
    icon: "🍵",
    name: "自助調飲",
    human: "補充原料",
    machine: "自助智慧茶飲機自動調配 · 出杯計量",
    color: "#f5c842cc",
    saving: "省 1 位吧台人員",
  },
  {
    num: "03",
    icon: "🍜",
    name: "自助蒸煮",
    human: "放入密封杯",
    machine: "自動蒸煮計時 · 到點提醒",
    color: "#f5c84299",
    saving: "省 1 位廚師",
  },
  {
    num: "04",
    icon: "❄️",
    name: "冷凍自取 + 蒸煮",
    human: "確認取餐",
    machine: "GraBox 冷凍艙掃碼開艙 → 自助放入蒸煮機 3 分鐘出餐",
    color: "#f5c84266",
    saving: "省 1 位服務員",
  },
  {
    num: "05",
    icon: "💳",
    name: "自助繳費結帳",
    human: "確認訂單",
    machine: "現金 / 信用卡 / 悠遊卡 / LINE Pay · 自助繳費訂餐機",
    color: "#f5c84233",
    saving: "省 1 位收銀員",
  },
];

const DEVICES = [
  {
    src: "/images/eastbeauty/device_coffee_machine.jpg",
    fallback: "/images/eastbeauty/ref_wmf.jpg",
    name: "自助咖啡機",
    badge: "自助",
    badgeColor: "#06c167",
    desc: "WMF 德國商用級 · 全自動研磨萃取 · 掃碼點單出杯",
    tag: "德國 WMF 合作設備",
  },
  {
    src: "/images/eastbeauty/device_tea_dispenser.jpg",
    fallback: "/images/eastbeauty/milk_tea2.jpg",
    name: "自助智慧茶飲機",
    badge: "自助",
    badgeColor: "#06c167",
    desc: "1.5m 商用落地 · 多口味自動調配 · 員工補料即可",
    tag: "索迪科技 合作設備",
  },
  {
    src: "/images/eastbeauty/device_milk_tea_v2.jpg",
    fallback: "/images/eastbeauty/ref_milk_tea.jpg",
    name: "桌上型奶茶機",
    badge: "自助",
    badgeColor: "#06c167",
    desc: "觸控選飲 · 精準泵管調配 · 多料自動混合出杯",
    tag: "MCS 雲端串接",
  },
  {
    src: "/images/eastbeauty/device_ramen_steamer.jpg",
    fallback: "/images/eastbeauty/ramen_bowl.jpg",
    name: "桌上蒸煮拉麵機",
    badge: "自助",
    badgeColor: "#06c167",
    desc: "咖啡機造型 · 觸控選品 · 蒸氣噴嘴自動蒸煮密封碗 · 3 分鐘出餐",
    tag: "必搭 GraBox 冷凍艙",
  },
  {
    src: "/images/eastbeauty/sat_v2_grabox_frozen.jpg",
    fallback: "/images/eastbeauty/locker_001.jpg",
    name: "GraBox 冷凍自取冰櫃",
    badge: "⭐ MCS 自研",
    badgeColor: "#f5c842",
    desc: "-18°C 冷凍艙 + 冷藏層 · 掃碼自開艙 · 存放冷凍拉麵碗 / 港點杯",
    tag: "🏭 台灣自主製造 · 搭配蒸煮機",
  },
  {
    src: "/images/eastbeauty/device_grabox_ambient.jpg",
    fallback: "/images/eastbeauty/grabox_mwd_real.jpg",
    name: "GraBox 常溫雙面智取櫃",
    badge: "⭐ MCS 自研",
    badgeColor: "#f5c842",
    desc: "嵌入外牆式 · 員工內側裝單 · 顧客外側掃碼取餐 · 12 格獨立電鎖",
    tag: "🏭 台灣自主製造 · 雙面貫穿設計",
  },
  {
    src: "/images/eastbeauty/device_kiosk.jpg",
    fallback: "/images/eastbeauty/scene2.png",
    name: "自助繳費訂餐機",
    badge: "自助",
    badgeColor: "#06c167",
    desc: "紙鈔投入 · 自動找零 · 先付後取 · 信用卡 / 悠遊卡 / LINE Pay 全支援",
    tag: "💵 移工現金族首選 · 長者友善",
  },
  {
    src: "/images/eastbeauty/device_microwave_locker.jpg",
    fallback: "/images/eastbeauty/setup2.png",
    name: "自助微波取餐櫃",
    badge: "⭐ MCS 自研",
    badgeColor: "#f5c842",
    desc: "掃碼自動開門 · 自動微波加熱 · 顧客自取",
    tag: "🏭 台灣自主製造",
  },
  {
    src: "/images/eastbeauty/device_vending_machine.jpg",
    fallback: "/images/eastbeauty/scene1.png",
    name: "觸控螢幕智慧販賣機",
    badge: "自助",
    badgeColor: "#06c167",
    desc: "21吋全觸控介面 · 掃碼 / NFC 結帳 · AI 補貨預測",
    tag: "MCS 雲端串接",
  },
];

const PHASES = [
  { num: "01", name: "駁二旗艦 POC", timeline: "2026 Q3", items: ["完整自助模組導入", "MCS 平台串接驗證", "消費數據蒐集分析", "SOP 標準化建立"] },
  { num: "02", name: "選點升級", timeline: "2026 Q4 – 2027 Q1", items: ["複製自助模組", "2-3 個新據點", "品牌識別統一", "2 人運作目標"] },
  { num: "03", name: "規模複製", timeline: "2027+", items: ["全台 AI 餐廳授權", "MCS SaaS 管理", "數據驅動菜單優化", "對外招商複製"] },
];

/* ═══════════════ PAGE ═══════════════ */
export default function EastBeautyPage() {
  const [activeRender, setActiveRender] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const sCore = useFadeIn();
  const sBrand = useFadeIn();
  const sFlagship = useFadeIn();
  const sDevices = useFadeIn();
  const sLocker = useFadeIn();
  const sRamen = useFadeIn();
  const sAi = useFadeIn();
  const sStrategy = useFadeIn();
  const s1000hero = useFadeIn();
  const s1000body = useFadeIn();
  const sSatellite1 = useFadeIn();
  const sSatellite2 = useFadeIn();

  useEffect(() => {
    const handle = () => {
      if (heroRef.current) heroRef.current.style.backgroundPositionY = `${window.scrollY * 0.3}px`;
    };
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{background:#faf8f3;color:#1a1a1a;font-family:var(--font-noto-tc),'Noto Sans TC',sans-serif;}
        /* 此頁隱藏全站 Yuzu AI 泡泡 */
        button[aria-label="Yuzu AI 顧問"]{display:none!important;}

        .eb-fade{opacity:0;transform:translateY(28px);transition:opacity .65s ease,transform .65s ease;}
        .eb-visible{opacity:1;transform:none;}
        .eb-fade .eb-fade{transition-delay:.1s;}
        .eb-fade .eb-fade .eb-fade{transition-delay:.2s;}

        /* NAV */
        .eb-nav{
          position:fixed;top:0;left:0;right:0;z-index:100;
          display:flex;align-items:center;justify-content:space-between;
          padding:12px 32px;
          background:rgba(10,22,40,.93);backdrop-filter:blur(12px);
          border-bottom:1px solid rgba(245,200,66,.18);
        }
        .eb-nav-brand{font-weight:700;color:#f5c842;font-size:.88rem;letter-spacing:.03em;}
        .eb-nav-sub{font-size:.65rem;color:rgba(255,255,255,.45);margin-left:10px;}
        .eb-nav-links{display:flex;gap:20px;}
        .eb-nav-links a{color:rgba(255,255,255,.65);font-size:.76rem;text-decoration:none;transition:color .2s;letter-spacing:.04em;}
        .eb-nav-links a:hover{color:#f5c842;}
        @media(max-width:650px){.eb-nav-links{display:none;}}

        /* HERO */
        .eb-hero{
          min-height:100vh;
          background:linear-gradient(to bottom,rgba(10,22,40,.88) 0%,rgba(10,22,40,.6) 55%,rgba(10,22,40,.95) 100%),
            url('/images/eastbeauty/semi_auto_hero.jpg') center/cover no-repeat,
            url('/images/eastbeauty/render3.png') center/cover no-repeat;
          display:flex;flex-direction:column;justify-content:center;align-items:center;
          text-align:center;padding:100px 24px 72px;position:relative;
        }
        .eb-hero-eyebrow{
          display:inline-flex;align-items:center;gap:8px;margin-bottom:24px;
          background:rgba(245,200,66,.12);border:1px solid rgba(245,200,66,.35);
          border-radius:999px;padding:5px 18px;
          font-size:.72rem;font-weight:700;color:#f5c842;letter-spacing:.12em;
        }
        .eb-hero h1{
          font-family:var(--font-playfair),'Playfair Display',serif;
          font-size:clamp(2.4rem,6vw,4.6rem);font-weight:900;
          color:#fff;line-height:1.1;margin-bottom:20px;
        }
        .eb-hero h1 em{color:#f5c842;font-style:normal;}
        .eb-hero-tagline{
          font-size:clamp(1.1rem,2.2vw,1.5rem);
          color:rgba(255,255,255,.85);margin-bottom:10px;font-weight:500;
        }
        .eb-hero-sub{color:rgba(255,255,255,.55);font-size:.92rem;margin-bottom:32px;font-style:italic;}
        .eb-hero-mcs{
          display:inline-flex;align-items:center;gap:10px;
          background:rgba(10,22,40,.7);border:1px solid rgba(245,200,66,.3);
          border-radius:8px;padding:10px 22px;
          font-size:.84rem;color:rgba(255,255,255,.85);
        }
        .eb-hero-mcs strong{color:#f5c842;}
        .eb-scroll{
          position:absolute;bottom:24px;left:50%;transform:translateX(-50%);
          color:rgba(255,255,255,.38);font-size:.66rem;letter-spacing:.1em;
          display:flex;flex-direction:column;align-items:center;gap:5px;
          animation:ebBounce 2.2s ease-in-out infinite;
        }
        @keyframes ebBounce{0%,100%{transform:translateX(-50%) translateY(0);}50%{transform:translateX(-50%) translateY(7px);}}

        /* SECTION */
        .eb-section{max-width:1100px;margin:0 auto;padding:76px 24px;}
        .eb-label{font-size:.68rem;font-weight:700;letter-spacing:.14em;color:#b8860b;text-transform:uppercase;margin-bottom:8px;}
        .eb-title{
          font-family:var(--font-playfair),'Playfair Display',serif;
          font-size:clamp(1.65rem,3.2vw,2.5rem);font-weight:700;color:#0d2240;
          line-height:1.22;margin-bottom:14px;
        }
        .eb-title em{color:#b8860b;font-style:normal;}
        .eb-rule{width:52px;height:3px;background:#f5c842;border-radius:2px;margin-bottom:28px;}
        .eb-lead{color:#444;line-height:1.85;max-width:660px;margin-bottom:32px;font-size:.95rem;}

        /* BG VARIANTS */
        .bg-warm{background:#f2ede2;}
        .bg-navy{background:#0d2240;}
        .bg-deep{background:#080f1a;}

        /* ── CORE CONCEPT — 自助 ── */
        .eb-core-wrap{background:linear-gradient(135deg,#080f1a 0%,#0d2240 60%,#122d50 100%);padding:80px 24px;}
        .eb-core-inner{max-width:1100px;margin:0 auto;}
        .eb-core-badge{
          display:inline-flex;align-items:center;gap:8px;margin-bottom:22px;
          background:rgba(6,193,103,.15);border:1px solid rgba(6,193,103,.4);
          border-radius:999px;padding:6px 18px;
          font-size:.72rem;font-weight:700;color:#06c167;letter-spacing:.1em;
        }
        .eb-core-title{
          font-family:var(--font-playfair),'Playfair Display',serif;
          font-size:clamp(2rem,4.5vw,3.8rem);font-weight:900;
          color:#fff;line-height:1.1;margin-bottom:20px;
        }
        .eb-core-title em{color:#f5c842;font-style:normal;}
        .eb-core-sub{color:rgba(255,255,255,.7);font-size:1rem;line-height:1.85;max-width:640px;margin-bottom:48px;}
        .eb-core-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:48px;}
        @media(max-width:750px){.eb-core-grid{grid-template-columns:1fr;}}
        .eb-core-card{
          background:rgba(255,255,255,.04);border:1px solid rgba(245,200,66,.15);
          border-radius:12px;padding:24px 22px;
        }
        .eb-core-card-num{font-size:2.8rem;font-weight:900;color:rgba(245,200,66,.18);font-variant-numeric:tabular-nums;line-height:1;margin-bottom:8px;}
        .eb-core-card-title{font-weight:700;color:#f5c842;margin-bottom:6px;font-size:.95rem;}
        .eb-core-card-desc{font-size:.82rem;color:rgba(255,255,255,.6);line-height:1.7;}

        /* ── SEMI stations ── */
        .eb-stations{display:flex;flex-direction:column;gap:0;position:relative;}
        .eb-stations::before{
          content:'';position:absolute;left:28px;top:0;bottom:0;
          width:2px;background:linear-gradient(to bottom,#f5c842,#f5c84220);
        }
        .eb-station{display:flex;gap:20px;align-items:flex-start;padding:20px 0;}
        .eb-station-dot{
          flex-shrink:0;width:44px;height:44px;border-radius:50%;
          display:flex;align-items:center;justify-content:center;
          background:#080f1a;border:2px solid #f5c842;
          font-size:1.1rem;position:relative;z-index:1;
        }
        .eb-station-body{
          flex:1;background:rgba(255,255,255,.04);border:1px solid rgba(245,200,66,.12);
          border-radius:10px;padding:16px 20px;
          display:flex;align-items:center;gap:16px;flex-wrap:wrap;
        }
        .eb-station-name{font-weight:700;color:#fff;font-size:.95rem;flex:0 0 140px;}
        .eb-station-split{display:flex;gap:12px;flex:1;flex-wrap:wrap;}
        .eb-station-half{flex:1;min-width:150px;}
        .eb-station-half-label{font-size:.65rem;letter-spacing:.08em;font-weight:700;text-transform:uppercase;margin-bottom:3px;}
        .eb-station-half.human .eb-station-half-label{color:#94a3b8;}
        .eb-station-half.machine .eb-station-half-label{color:#06c167;}
        .eb-station-half-text{font-size:.8rem;line-height:1.5;}
        .eb-station-half.human .eb-station-half-text{color:rgba(255,255,255,.6);}
        .eb-station-half.machine .eb-station-half-text{color:rgba(255,255,255,.88);}
        .eb-station-saving{
          flex-shrink:0;background:rgba(6,193,103,.1);border:1px solid rgba(6,193,103,.3);
          border-radius:6px;padding:4px 12px;font-size:.72rem;font-weight:700;color:#06c167;
          white-space:nowrap;
        }

        /* ── DEVICES ── */
        .eb-devices-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
        @media(max-width:900px){.eb-devices-grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:540px){.eb-devices-grid{grid-template-columns:1fr;}}
        .eb-device{
          background:#fff;border-radius:12px;overflow:hidden;
          border:1px solid #e8e0d0;
          box-shadow:0 2px 14px rgba(13,34,64,.07);
          transition:transform .2s,box-shadow .2s;position:relative;
        }
        .eb-device:hover{transform:translateY(-4px);box-shadow:0 10px 32px rgba(13,34,64,.14);}
        .eb-device-img{aspect-ratio:4/3;position:relative;background:#f2ede2;}
        .eb-device-badge{
          position:absolute;top:10px;left:10px;z-index:10;
          font-size:.65rem;font-weight:900;padding:3px 10px;border-radius:4px;
          letter-spacing:.06em;
        }
        .eb-device-body{padding:16px 18px;}
        .eb-device-name{font-weight:700;color:#0d2240;margin-bottom:4px;}
        .eb-device-desc{font-size:.78rem;color:#666;line-height:1.6;}
        .eb-device-tag{
          display:inline-block;margin-top:8px;
          background:#fef8dc;color:#8a6800;
          font-size:.67rem;font-weight:700;padding:2px 8px;border-radius:4px;
          border:1px solid #f5c84255;
        }

        /* ── RAMEN SECTION ── */
        .eb-ramen-wrap{background:#f2ede2;padding:80px 24px;}
        .eb-ramen-inner{max-width:1100px;margin:0 auto;}
        .eb-ramen-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:start;}
        @media(max-width:750px){.eb-ramen-grid{grid-template-columns:1fr;}}
        .eb-ramen-steps{display:flex;flex-direction:column;gap:14px;}
        .eb-ramen-step{
          display:flex;gap:14px;align-items:flex-start;
          background:#fff;border:1px solid #e8e0d0;border-radius:8px;padding:14px 16px;
        }
        .eb-ramen-step-num{
          width:32px;height:32px;border-radius:50%;flex-shrink:0;
          background:#0d2240;color:#f5c842;
          display:flex;align-items:center;justify-content:center;
          font-weight:900;font-size:.8rem;
        }
        .eb-ramen-step-text strong{display:block;color:#0d2240;font-size:.88rem;margin-bottom:2px;}
        .eb-ramen-step-text span{color:#666;font-size:.78rem;line-height:1.5;}
        .eb-video-wrap{border-radius:10px;overflow:hidden;border:2px solid #e8e0d0;}

        /* ── GRABOX SPOTLIGHT ── */
        .eb-locker-wrap{background:linear-gradient(135deg,#080f1a 0%,#0d2240 100%);padding:80px 24px;}
        .eb-locker-inner{max-width:1100px;margin:0 auto;}
        .eb-locker-badge{
          display:inline-flex;align-items:center;gap:8px;margin-bottom:18px;
          background:rgba(245,200,66,.18);border:1px solid rgba(245,200,66,.5);
          border-radius:999px;padding:5px 16px;
          font-size:.7rem;font-weight:700;color:#f5c842;letter-spacing:.1em;
        }
        .eb-locker-title{
          font-family:var(--font-playfair),'Playfair Display',serif;
          font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;color:#fff;
          margin-bottom:12px;line-height:1.2;
        }
        .eb-locker-title em{color:#f5c842;font-style:normal;}
        .eb-locker-sub{color:rgba(255,255,255,.65);margin-bottom:36px;line-height:1.8;max-width:580px;}
        .eb-locker-photos{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;}
        @media(max-width:700px){.eb-locker-photos{grid-template-columns:1fr 1fr;}}
        .eb-locker-photo{border-radius:8px;overflow:hidden;position:relative;aspect-ratio:4/3;}
        .eb-locker-feats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:28px;}
        @media(max-width:800px){.eb-locker-feats{grid-template-columns:repeat(2,1fr);}}
        .eb-locker-feat{
          background:rgba(255,255,255,.05);border:1px solid rgba(245,200,66,.18);
          border-radius:8px;padding:16px;text-align:center;
        }
        .eb-locker-feat-icon{font-size:1.5rem;margin-bottom:8px;}
        .eb-locker-feat-title{font-size:.8rem;font-weight:700;color:#f5c842;margin-bottom:3px;}
        .eb-locker-feat-desc{font-size:.72rem;color:rgba(255,255,255,.58);line-height:1.5;}
        .eb-oem-pill{
          display:inline-flex;align-items:center;gap:6px;margin-top:22px;
          background:rgba(245,200,66,.12);border:1px solid #f5c842;
          border-radius:6px;padding:8px 18px;
          font-size:.8rem;font-weight:700;color:#f5c842;
        }

        /* ── PHASES ── */
        .eb-phases{display:flex;flex-direction:column;gap:0;position:relative;}
        .eb-phases::before{content:'';position:absolute;left:36px;top:0;bottom:0;width:2px;background:linear-gradient(to bottom,#f5c842,#f5c84222);}
        .eb-phase{display:flex;gap:22px;align-items:flex-start;padding:24px 0;}
        .eb-phase-num{
          flex-shrink:0;width:56px;height:56px;border-radius:50%;
          display:flex;align-items:center;justify-content:center;
          font-family:var(--font-playfair),'Playfair Display',serif;
          font-size:1.1rem;font-weight:900;
          background:#0d2240;color:#f5c842;border:2px solid #f5c842;
          position:relative;z-index:1;
        }
        .eb-phase-body{flex:1;background:#fff;border:1px solid #e8e0d0;border-radius:10px;padding:18px 22px;}
        .eb-phase-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px;}
        .eb-phase-name{font-weight:700;color:#0d2240;}
        .eb-phase-time{font-size:.75rem;color:#b8860b;font-weight:700;}
        .eb-phase-items{display:flex;flex-wrap:wrap;gap:7px;}
        .eb-phase-item{background:#faf8f3;border:1px solid #e8e0d0;border-radius:4px;font-size:.76rem;color:#444;padding:4px 10px;}

        /* ── ROI ── */
        .eb-roi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
        @media(max-width:700px){.eb-roi-grid{grid-template-columns:1fr;}}
        .eb-roi-card{background:#0d2240;border-radius:12px;padding:26px 22px;border-top:3px solid #f5c842;}
        .eb-roi-icon{font-size:1.9rem;margin-bottom:10px;}
        .eb-roi-num{font-size:2.2rem;font-weight:900;color:#f5c842;font-variant-numeric:tabular-nums;}
        .eb-roi-label{font-size:.8rem;color:rgba(255,255,255,.72);margin-top:6px;line-height:1.6;}

        /* ── 移工宿舍商機 ── */
        .eb-worker-wrap{background:#0a1020;padding:80px 24px;}
        .eb-worker-inner{max-width:1100px;margin:0 auto;}
        .eb-worker-eyebrow{font-size:.72rem;letter-spacing:.2em;text-transform:uppercase;color:#f5c842;margin-bottom:12px;}
        .eb-worker-title{font-family:var(--font-playfair),'Playfair Display',serif;font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;color:#fff;line-height:1.25;margin-bottom:8px;}
        .eb-worker-title em{color:#f5c842;font-style:normal;}
        .eb-worker-sub{color:rgba(255,255,255,.6);font-size:.92rem;line-height:1.8;max-width:700px;margin-bottom:40px;}
        .eb-worker-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:48px;}
        @media(max-width:600px){.eb-worker-stats{grid-template-columns:1fr 1fr;}}
        .eb-worker-stat{background:rgba(245,200,66,.06);border:1px solid rgba(245,200,66,.2);border-radius:10px;padding:20px 16px;text-align:center;}
        .eb-worker-stat-num{font-size:1.9rem;font-weight:900;color:#f5c842;font-variant-numeric:tabular-nums;}
        .eb-worker-stat-label{font-size:.72rem;color:rgba(255,255,255,.55);margin-top:6px;line-height:1.5;}
        .eb-worker-photos{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:48px;}
        @media(max-width:700px){.eb-worker-photos{grid-template-columns:1fr 1fr;}}
        .eb-worker-photo{position:relative;aspect-ratio:4/3;border-radius:10px;overflow:hidden;}
        .eb-worker-photo img{width:100%;height:100%;object-fit:cover;}
        .eb-worker-photo-cap{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,.75));padding:10px 12px;font-size:.68rem;color:rgba(255,255,255,.8);}
        .eb-worker-models{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:48px;}
        @media(max-width:750px){.eb-worker-models{grid-template-columns:1fr;}}
        .eb-worker-model{background:#111827;border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:24px 20px;position:relative;overflow:hidden;}
        .eb-worker-model.highlight{border-color:rgba(245,200,66,.4);background:rgba(245,200,66,.04);}
        .eb-worker-model-badge{font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:3px 10px;border-radius:20px;display:inline-block;margin-bottom:12px;}
        .eb-worker-model h4{font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px;}
        .eb-worker-model p{font-size:.78rem;color:rgba(255,255,255,.6);line-height:1.7;margin-bottom:12px;}
        .eb-worker-model-devices{font-size:.7rem;color:#f5c842;background:rgba(245,200,66,.08);border-radius:6px;padding:8px 12px;line-height:1.8;}
        .eb-worker-xmart{display:flex;gap:16px;align-items:flex-start;background:rgba(120,80,200,.08);border:1px solid rgba(120,80,200,.25);border-radius:12px;padding:24px;margin-bottom:32px;}
        @media(max-width:600px){.eb-worker-xmart{flex-direction:column;}}
        .eb-worker-xmart-logo{flex:0 0 100px;border-radius:8px;overflow:hidden;}
        .eb-worker-xmart-logo img{width:100%;display:block;}
        .eb-worker-xmart-body h4{font-size:1rem;font-weight:700;color:#c084fc;margin-bottom:6px;}
        .eb-worker-xmart-body p{font-size:.8rem;color:rgba(255,255,255,.65);line-height:1.75;}
        .eb-worker-xmart-body ul{margin-top:8px;padding-left:16px;}
        .eb-worker-xmart-body li{font-size:.78rem;color:rgba(255,255,255,.6);line-height:1.8;}

        /* ── CTA ── */
        .eb-cta{background:linear-gradient(135deg,#080f1a 0%,#0d2240 100%);padding:80px 24px;text-align:center;}
        .eb-cta-title{
          font-family:var(--font-playfair),'Playfair Display',serif;
          font-size:clamp(1.8rem,4vw,3rem);font-weight:900;color:#fff;margin-bottom:14px;
        }
        .eb-cta-title em{color:#f5c842;font-style:normal;}
        .eb-cta-sub{color:rgba(255,255,255,.68);font-size:.95rem;margin-bottom:36px;line-height:1.8;max-width:600px;margin-left:auto;margin-right:auto;}
        .eb-btn{
          display:inline-block;background:#f5c842;color:#0d2240;
          font-weight:700;font-size:.95rem;padding:14px 40px;border-radius:6px;
          text-decoration:none;letter-spacing:.04em;transition:background .2s,transform .15s;
        }
        .eb-btn:hover{background:#ffd84a;transform:translateY(-2px);}
        .eb-contact{margin-top:28px;color:rgba(255,255,255,.45);font-size:.78rem;line-height:2;}
        .eb-footer{background:#040a12;text-align:center;padding:24px;color:rgba(255,255,255,.25);font-size:.68rem;}

        /* ── 千店計畫 ── */
        .eb-1000-wrap{
          background:linear-gradient(180deg,#040a12 0%,#0a1830 40%,#0d2240 100%);
          padding:0;overflow:hidden;
        }
        .eb-1000-hero{
          position:relative;min-height:60vh;
          display:flex;flex-direction:column;justify-content:center;align-items:center;
          text-align:center;padding:80px 24px 60px;
          background:linear-gradient(to bottom,rgba(4,10,18,.3) 0%,rgba(4,10,18,.7) 100%);
        }
        .eb-1000-hero-bg{position:absolute;inset:0;z-index:0;}
        .eb-1000-hero-content{position:relative;z-index:1;}
        .eb-1000-eyebrow{
          display:inline-flex;align-items:center;gap:8px;margin-bottom:20px;
          background:rgba(245,200,66,.15);border:1px solid rgba(245,200,66,.45);
          border-radius:999px;padding:6px 20px;
          font-size:.72rem;font-weight:700;color:#f5c842;letter-spacing:.14em;
        }
        .eb-1000-title{
          font-family:var(--font-playfair),'Playfair Display',serif;
          font-size:clamp(3rem,8vw,7rem);font-weight:900;
          color:#fff;line-height:.95;margin-bottom:12px;
          text-shadow:0 4px 40px rgba(0,0,0,.6);
        }
        .eb-1000-title em{color:#f5c842;font-style:normal;}
        .eb-1000-title .sub{font-size:clamp(1.2rem,3vw,2.2rem);display:block;color:rgba(255,255,255,.75);margin-top:8px;font-weight:700;}
        .eb-1000-tagline{font-size:1rem;color:rgba(255,255,255,.6);margin-top:16px;font-style:italic;}

        /* stats bar */
        .eb-1000-stats{
          display:flex;justify-content:center;gap:0;
          border-top:1px solid rgba(245,200,66,.15);
          border-bottom:1px solid rgba(245,200,66,.15);
          background:rgba(0,0,0,.3);
        }
        .eb-1000-stat{
          flex:1;max-width:220px;
          padding:24px 16px;text-align:center;
          border-right:1px solid rgba(245,200,66,.12);
        }
        .eb-1000-stat:last-child{border-right:none;}
        .eb-1000-stat-num{font-size:2.2rem;font-weight:900;color:#f5c842;font-variant-numeric:tabular-nums;line-height:1;}
        .eb-1000-stat-label{font-size:.72rem;color:rgba(255,255,255,.55);margin-top:4px;line-height:1.4;}

        /* body */
        .eb-1000-body{max-width:1100px;margin:0 auto;padding:64px 24px;}

        /* pillar grid */
        .eb-pillar-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(245,200,66,.12);border:1px solid rgba(245,200,66,.12);border-radius:12px;overflow:hidden;margin-bottom:56px;}
        @media(max-width:750px){.eb-pillar-grid{grid-template-columns:1fr;}}
        .eb-pillar{background:#080f1a;padding:28px 24px;}
        .eb-pillar-icon{font-size:2rem;margin-bottom:12px;}
        .eb-pillar-title{font-weight:700;color:#f5c842;font-size:1rem;margin-bottom:8px;}
        .eb-pillar-desc{font-size:.82rem;color:rgba(255,255,255,.65);line-height:1.75;}
        .eb-pillar-tag{
          display:inline-block;margin-top:12px;
          background:rgba(245,200,66,.1);border:1px solid rgba(245,200,66,.25);
          border-radius:4px;padding:3px 10px;
          font-size:.68rem;font-weight:700;color:#f5c842;
        }

        /* supply chain visual */
        .eb-supply-chain{
          background:rgba(255,255,255,.03);border:1px solid rgba(245,200,66,.1);
          border-radius:12px;padding:28px 32px;margin-bottom:48px;
        }
        .eb-supply-flow{
          display:flex;align-items:center;justify-content:center;
          gap:0;flex-wrap:wrap;margin-top:20px;
        }
        .eb-supply-node{
          background:#0d2240;border:1px solid rgba(245,200,66,.25);
          border-radius:10px;padding:16px 18px;text-align:center;
          min-width:130px;flex-shrink:0;
        }
        .eb-supply-node-icon{font-size:1.6rem;margin-bottom:6px;}
        .eb-supply-node-title{font-size:.78rem;font-weight:700;color:#f5c842;}
        .eb-supply-node-desc{font-size:.66rem;color:rgba(255,255,255,.5);margin-top:2px;line-height:1.4;}
        .eb-supply-arrow{
          font-size:1.2rem;color:#f5c842;padding:0 8px;flex-shrink:0;
        }
        @media(max-width:700px){.eb-supply-arrow{transform:rotate(90deg);padding:6px 0;}}

        /* sub-brand */
        .eb-subbrand{
          display:grid;grid-template-columns:1fr 1fr;gap:32px;align-items:center;
          margin-bottom:48px;
        }
        @media(max-width:700px){.eb-subbrand{grid-template-columns:1fr;}}
        .eb-subbrand-img{border-radius:10px;overflow:hidden;position:relative;aspect-ratio:4/3;}
        .eb-subbrand-text{}
        .eb-subbrand-badge{
          display:inline-flex;align-items:center;gap:6px;margin-bottom:14px;
          background:rgba(6,193,103,.12);border:1px solid rgba(6,193,103,.35);
          border-radius:999px;padding:4px 14px;
          font-size:.68rem;font-weight:700;color:#06c167;letter-spacing:.08em;
        }
        .eb-subbrand-title{
          font-family:var(--font-playfair),'Playfair Display',serif;
          font-size:clamp(1.4rem,2.5vw,2rem);font-weight:700;color:#fff;margin-bottom:12px;
        }
        .eb-subbrand-title em{color:#f5c842;font-style:normal;}
        .eb-subbrand-desc{font-size:.85rem;color:rgba(255,255,255,.65);line-height:1.8;margin-bottom:16px;}
        .eb-subbrand-points{display:flex;flex-direction:column;gap:8px;}
        .eb-subbrand-point{
          display:flex;align-items:flex-start;gap:10px;
          font-size:.8rem;color:rgba(255,255,255,.75);
        }
        .eb-subbrand-point-dot{width:6px;height:6px;border-radius:50%;background:#f5c842;flex-shrink:0;margin-top:6px;}

        /* HQ flywheel */
        .eb-flywheel{
          background:linear-gradient(135deg,rgba(13,34,64,.8) 0%,rgba(8,15,26,.9) 100%);
          border:1px solid rgba(245,200,66,.18);border-radius:16px;
          padding:36px 32px;text-align:center;
        }
        .eb-flywheel-title{
          font-family:var(--font-playfair),'Playfair Display',serif;
          font-size:1.5rem;font-weight:700;color:#fff;margin-bottom:8px;
        }
        .eb-flywheel-title em{color:#f5c842;font-style:normal;}
        .eb-flywheel-sub{font-size:.82rem;color:rgba(255,255,255,.55);margin-bottom:28px;}
        .eb-flywheel-steps{
          display:flex;justify-content:center;align-items:center;
          flex-wrap:wrap;gap:0;
        }
        .eb-fw-step{text-align:center;padding:12px 16px;min-width:110px;}
        .eb-fw-icon{font-size:1.5rem;margin-bottom:6px;}
        .eb-fw-title{font-size:.72rem;font-weight:700;color:#f5c842;}
        .eb-fw-desc{font-size:.64rem;color:rgba(255,255,255,.5);line-height:1.4;margin-top:2px;}
        .eb-fw-arrow{font-size:1rem;color:rgba(245,200,66,.4);padding:0 2px;align-self:center;}
        @media(max-width:600px){.eb-fw-arrow{transform:rotate(90deg);}}

        /* franchise card */
        .eb-franchise-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:48px;}
        @media(max-width:650px){.eb-franchise-grid{grid-template-columns:1fr;}}
        .eb-franchise-img{border-radius:10px;overflow:hidden;position:relative;aspect-ratio:16/9;}
        .eb-franchise-card{
          background:rgba(255,255,255,.04);border:1px solid rgba(245,200,66,.15);
          border-radius:10px;padding:24px;
          display:flex;flex-direction:column;justify-content:space-between;
        }
        .eb-franchise-card-title{font-weight:700;color:#f5c842;font-size:1.05rem;margin-bottom:10px;}
        .eb-franchise-card-items{display:flex;flex-direction:column;gap:7px;}
        .eb-franchise-card-item{
          display:flex;align-items:flex-start;gap:8px;
          font-size:.8rem;color:rgba(255,255,255,.72);
        }
        .eb-franchise-card-item::before{content:'✓';color:#06c167;flex-shrink:0;font-weight:700;}
        .eb-franchise-card-bottom{
          margin-top:16px;padding-top:14px;
          border-top:1px solid rgba(245,200,66,.12);
          font-size:.72rem;color:rgba(255,255,255,.4);
        }

        /* ── GALLERY ── */
        .eb-gallery-main{aspect-ratio:16/9;position:relative;border-radius:12px;overflow:hidden;box-shadow:0 12px 40px rgba(13,34,64,.22);margin-bottom:14px;}
        .eb-gallery-thumbs{display:flex;gap:10px;overflow-x:auto;padding-bottom:4px;}
        .eb-gallery-thumb{flex-shrink:0;width:130px;height:78px;border-radius:6px;overflow:hidden;cursor:pointer;opacity:.5;transition:opacity .2s;border:2px solid transparent;position:relative;}
        .eb-gallery-thumb.on{opacity:1;border-color:#f5c842;}

        /* ── KPI row ── */
        .eb-kpis{display:flex;gap:20px;flex-wrap:wrap;margin-top:28px;}
        .eb-kpi{flex:1;min-width:110px;background:#fff;border:1px solid #e8e0d0;border-top:3px solid #f5c842;border-radius:8px;padding:14px 16px;text-align:center;}
        .eb-kpi-num{font-size:1.85rem;font-weight:900;color:#0d2240;line-height:1;}
        .eb-kpi-label{font-size:.7rem;color:#888;margin-top:3px;}

        /* ── SATELLITE SECTION ── */
        .eb-satellite-wrap{background:#0d2240;padding:0;}
        .eb-satellite-inner{max-width:1100px;margin:0 auto;padding:72px 32px;}
        .eb-satellite-eyebrow{font-size:.68rem;letter-spacing:.15em;text-transform:uppercase;color:#f5c842aa;font-weight:700;margin-bottom:12px;}
        .eb-satellite-title{font-size:clamp(1.7rem,4vw,2.8rem);font-weight:900;color:#fff;line-height:1.2;margin-bottom:16px;}
        .eb-satellite-title em{color:#f5c842;font-style:normal;}
        .eb-satellite-rule{width:52px;height:3px;background:linear-gradient(90deg,#f5c842,transparent);border-radius:2px;margin-bottom:24px;}
        .eb-satellite-lead{color:rgba(255,255,255,.72);font-size:.95rem;line-height:1.9;max-width:700px;margin-bottom:40px;}
        .eb-satellite-lead strong{color:#f5c842;}

        /* GraBox concept card */
        .eb-grabox-concept{display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-bottom:48px;align-items:center;}
        @media(max-width:700px){.eb-grabox-concept{grid-template-columns:1fr;}}
        .eb-grabox-concept-img{position:relative;height:320px;border-radius:14px;overflow:hidden;border:1px solid rgba(245,200,66,.25);}
        .eb-grabox-concept-body{color:rgba(255,255,255,.85);}
        .eb-grabox-concept-badge{display:inline-block;background:#f5c842;color:#0d2240;font-size:.68rem;font-weight:700;letter-spacing:.06em;padding:3px 10px;border-radius:20px;margin-bottom:12px;}
        .eb-grabox-concept-title{font-size:1.35rem;font-weight:800;color:#fff;margin-bottom:12px;line-height:1.3;}
        .eb-grabox-concept-title em{color:#f5c842;font-style:normal;}
        .eb-grabox-concept-desc{font-size:.88rem;line-height:1.9;color:rgba(255,255,255,.7);margin-bottom:20px;}
        .eb-grabox-flows{display:flex;flex-direction:column;gap:8px;}
        .eb-grabox-flow{display:flex;align-items:flex-start;gap:10px;font-size:.82rem;color:rgba(255,255,255,.75);}
        .eb-grabox-flow-icon{width:28px;height:28px;border-radius:50%;background:rgba(245,200,66,.15);border:1px solid rgba(245,200,66,.3);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:.85rem;}
        .eb-grabox-flow-text strong{color:#f5c842;display:block;margin-bottom:2px;font-size:.78rem;}

        /* Uber Eats banner */
        .eb-ubereats-banner{position:relative;height:260px;border-radius:14px;overflow:hidden;margin-bottom:48px;border:1px solid rgba(6,193,103,.3);}
        .eb-ubereats-overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(13,34,64,.9) 40%,transparent);z-index:1;display:flex;flex-direction:column;justify-content:center;padding:32px;}
        .eb-ubereats-badge{display:inline-flex;align-items:center;gap:6px;background:#06c167;color:#fff;font-size:.7rem;font-weight:700;padding:3px 10px;border-radius:20px;margin-bottom:10px;width:fit-content;}
        .eb-ubereats-title{font-size:1.2rem;font-weight:800;color:#fff;line-height:1.4;margin-bottom:8px;}
        .eb-ubereats-title em{color:#06c167;font-style:normal;}
        .eb-ubereats-desc{font-size:.8rem;color:rgba(255,255,255,.7);max-width:380px;line-height:1.7;}

        /* Scenarios grid */
        .eb-scenarios-label{font-size:.7rem;letter-spacing:.12em;color:rgba(255,255,255,.4);text-transform:uppercase;font-weight:700;margin-bottom:18px;}
        .eb-scenarios-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin-bottom:48px;}
        @media(max-width:600px){.eb-scenarios-grid{grid-template-columns:1fr;}}
        .eb-scenario-card{position:relative;height:220px;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,.08);cursor:default;}
        .eb-scenario-card:hover .eb-scenario-overlay{background:linear-gradient(0deg,rgba(13,34,64,.92) 0%,rgba(13,34,64,.5) 60%,transparent 100%);}
        .eb-scenario-overlay{position:absolute;inset:0;background:linear-gradient(0deg,rgba(13,34,64,.88) 0%,rgba(13,34,64,.35) 60%,transparent 100%);z-index:1;transition:background .3s;}
        .eb-scenario-content{position:absolute;bottom:0;left:0;right:0;z-index:2;padding:16px;}
        .eb-scenario-num{font-size:.62rem;color:#f5c84288;letter-spacing:.1em;font-weight:700;margin-bottom:4px;}
        .eb-scenario-name{font-size:1rem;font-weight:800;color:#fff;margin-bottom:4px;}
        .eb-scenario-desc{font-size:.73rem;color:rgba(255,255,255,.65);line-height:1.6;}
        .eb-scenario-tag{display:inline-block;background:rgba(245,200,66,.18);border:1px solid rgba(245,200,66,.3);color:#f5c842;font-size:.62rem;padding:2px 8px;border-radius:10px;margin-top:6px;}

        /* Page 2: scenarios 5-7 + network map */
        .eb-satellite-p2{background:#111d2e;padding:72px 0;}
        .eb-satellite-p2-inner{max-width:1100px;margin:0 auto;padding:0 32px;}
        .eb-scenarios-3col{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:48px;}
        @media(max-width:700px){.eb-scenarios-3col{grid-template-columns:1fr;}}
        .eb-network-map{position:relative;border-radius:16px;overflow:hidden;border:1px solid rgba(245,200,66,.2);}
        .eb-network-map-img{width:100%;height:auto;display:block;}
        .eb-network-caption{text-align:center;font-size:.75rem;color:rgba(255,255,255,.4);margin-top:12px;}
        .eb-satellite-divider{width:100%;height:1px;background:linear-gradient(90deg,transparent,rgba(245,200,66,.25),transparent);margin:48px 0;}
      `}</style>

      {/* NAV */}
      <nav className="eb-nav">
        <div>
          <span className="eb-nav-brand">東方美 × MCS 銓幻元</span>
          <span className="eb-nav-sub">自助科技餐廳</span>
        </div>
        <div className="eb-nav-links">
          <a href="#concept">自助概念</a>
          <a href="#flagship">旗艦店</a>
          <a href="#devices">設備陣列</a>
          <a href="#strategy">展店策略</a>
          <a href="#thousand" style={{ color: "#f5c842", fontWeight: 700 }}>千店計畫</a>
          <a href="#satellite">衛星擴散網</a>
          <a href="#cta">洽談合作</a>
        </div>
      </nav>

      {/* ① HERO */}
      <section className="eb-hero" ref={heroRef}>
        <div className="eb-hero-eyebrow">✦ STRATEGY PRESENTATION 2026 ✦</div>
        <h1>東方美 × <em>MCS 銓幻元</em></h1>
        <p className="eb-hero-tagline">新型態 <strong style={{ color: "#06c167" }}>自助</strong> 科技餐廳發展策略</p>
        <p className="eb-hero-sub">從一家店的試驗，到一個可複製的系統</p>
        <div className="eb-hero-mcs">
          <span>🤖</span>
          <span>技術核心：<strong>MCS 銓幻元 — AI 及平台管理中心</strong></span>
        </div>
        <div className="eb-scroll">SCROLL ↓</div>
      </section>

      {/* ② 自助核心概念 */}
      <div className="eb-core-wrap" id="concept">
        <div ref={sCore} className="eb-fade eb-core-inner">
          <div className="eb-core-badge">💡 CORE CONCEPT — 自助模式</div>
          <div className="eb-core-title">
            <em>自助</em>，才是<br />快速展店的關鍵
          </div>
          <p className="eb-core-sub">
            全自動太貴、太複雜，全人工太貴、太難複製。<br />
            <strong style={{ color: "#f5c842" }}>自助 = 機器做重複的事，人做有溫度的事。</strong><br />
            成本低、人力少、SOP 標準化——讓每一個新據點都能在 3 天內複製開業。
          </p>
          <div className="eb-core-grid">
            {[
              { n: "40", s: "%", title: "人力成本降低", desc: "5 個自助站點取代傳統 5 個工作崗位，2 人即可運作全店" },
              { n: "3", s: "天", title: "展店複製速度", desc: "標準化 SOP + 模組化設備，新據點可快速複製上線" },
              { n: "2", s: "x", title: "翻桌率提升", desc: "零等待取餐、自助點餐，縮短每桌平均停留時間" },
            ].map((c, i) => (
              <div key={i} className="eb-core-card">
                <div className="eb-core-card-num">{c.n}{c.s}</div>
                <div className="eb-core-card-title">{c.title}</div>
                <div className="eb-core-card-desc">{c.desc}</div>
              </div>
            ))}
          </div>

          {/* 五大自助站 */}
          <div style={{ marginBottom: "16px" }}>
            <div style={{ color: "rgba(255,255,255,.45)", fontSize: ".7rem", letterSpacing: ".12em", fontWeight: 700, textTransform: "uppercase", marginBottom: "20px" }}>
              五大自助服務站
            </div>
            <div className="eb-stations">
              {SEMI_STATIONS.map((s, i) => (
                <div key={i} className="eb-station">
                  <div className="eb-station-dot">{s.icon}</div>
                  <div className="eb-station-body">
                    <div className="eb-station-name">{s.name}</div>
                    <div className="eb-station-split">
                      <div className="eb-station-half human">
                        <div className="eb-station-half-label">人力</div>
                        <div className="eb-station-half-text">{s.human}</div>
                      </div>
                      <div className="eb-station-half machine">
                        <div className="eb-station-half-label">機器</div>
                        <div className="eb-station-half-text">{s.machine}</div>
                      </div>
                    </div>
                    <div className="eb-station-saving">✓ {s.saving}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ③ 品牌現況 */}
      <div ref={sBrand} className="eb-fade">
        <section className="eb-section">
          <div className="eb-label">BRAND OVERVIEW</div>
          <div className="eb-title">東方美，<em>為什麼是最佳起點？</em></div>
          <div className="eb-rule" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "start" }}>
            <div>
              <p className="eb-lead">
                東方美擁有成熟選址能力、穩定客群與完整供應鏈。
                以東方美作為自助 AI 模組的 <strong>第一個驗證場域</strong>，
                在既有客流中蒐集數據、修正 SOP，再以標準化方式複製展店。
                風險最低，學習最快。
              </p>
              <div className="eb-kpis">
                <div className="eb-kpi"><div className="eb-kpi-num"><Counter to={40} suffix="%" /></div><div className="eb-kpi-label">人力成本可降低</div></div>
                <div className="eb-kpi"><div className="eb-kpi-num"><Counter to={2} suffix="人" /></div><div className="eb-kpi-label">全店運作人數</div></div>
                <div className="eb-kpi"><div className="eb-kpi-num"><Counter to={3} suffix="天" /></div><div className="eb-kpi-label">新店複製速度</div></div>
              </div>
            </div>
            <div>
              <div style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid #e8e0d0" }}>
                <Image src="/images/eastbeauty/site_exterior.jpg" alt="駁二特區場地" width={500} height={340} style={{ width: "100%", height: "auto", display: "block" }} />
              </div>
              <p style={{ fontSize: ".73rem", color: "#999", marginTop: "6px", textAlign: "center" }}>▲ 高雄駁二特區 — 旗艦示範店場址</p>
            </div>
          </div>
        </section>
      </div>

      {/* ④ 旗艦示範店 */}
      <div className="bg-warm">
        <div ref={sFlagship} className="eb-fade">
          <section className="eb-section" id="flagship">
            <div className="eb-label">KAOHSIUNG PIER-2 FLAGSHIP</div>
            <div className="eb-title">駁二旗艦 — <em>自助 POC 示範店</em></div>
            <div className="eb-rule" />
            <div className="eb-gallery-main">
              <Image src={RENDERS[activeRender].src} alt={RENDERS[activeRender].label} fill style={{ objectFit: "cover" }} />
            </div>
            <div className="eb-gallery-thumbs">
              {RENDERS.map((r, i) => (
                <div key={i} className={`eb-gallery-thumb${activeRender === i ? " on" : ""}`} onClick={() => setActiveRender(i)}>
                  <Image src={r.src} alt={r.label} fill style={{ objectFit: "cover" }} />
                </div>
              ))}
            </div>
            <p style={{ fontSize: ".74rem", color: "#999", textAlign: "center", marginTop: "8px" }}>▲ {RENDERS[activeRender].label}（3D 設計渲染圖）</p>
          </section>
        </div>
      </div>

      {/* ⑤ 自助設備陣列 */}
      <div ref={sDevices} className="eb-fade">
        <section className="eb-section" id="devices">
          <div className="eb-label">SMART SELF-SERVICE DEVICES</div>
          <div className="eb-title">九大<em>自助設備</em></div>
          <div className="eb-rule" />
          <p className="eb-lead">
            每一台設備都代表一個可以省下的人力崗位。
            全部由 <strong>MCS 銓幻元 AI 管理中台</strong>統一串接，
            讓 2 人就能管理一整間餐廳。
          </p>
          <div className="eb-devices-grid">
            {DEVICES.map((d, i) => (
              <div key={i} className="eb-device" style={d.badge.includes("⭐") ? { border: "2px solid #f5c842" } : {}}>
                <div className="eb-device-badge" style={{ background: d.badgeColor, color: d.badge.includes("⭐") ? "#0d2240" : "#fff" }}>
                  {d.badge}
                </div>
                <div className="eb-device-img">
                  <Image src={d.src} alt={d.name} fill style={{ objectFit: "cover" }}
                    onError={(e) => { (e.target as HTMLImageElement).src = d.fallback; }} />
                </div>
                <div className="eb-device-body">
                  <div className="eb-device-name">{d.name}</div>
                  <div className="eb-device-desc">{d.desc}</div>
                  <div className="eb-device-tag">{d.tag}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ⑥ 自助蒸煮拉麵機 */}
      <div className="eb-ramen-wrap">
        <div ref={sRamen} className="eb-fade eb-ramen-inner">
          <div className="eb-label">SEMI-AUTO RAMEN</div>
          <div className="eb-title">自助<em>蒸煮拉麵機</em></div>
          <div className="eb-rule" />
          <div className="eb-ramen-grid">
            <div>
              <p className="eb-lead" style={{ marginBottom: "24px" }}>
                員工只需將密封杯放入蒸煮艙，
                機器自動計時、加熱、完成後提醒取出。
                <strong>零廚藝門檻、出品穩定、複製容易</strong>——
                這就是自助的精髓。
              </p>
              <div className="eb-ramen-steps">
                {[
                  { n: "1", strong: "選品擺入", span: "員工將密封杯（拉麵/港點多口味）放入蒸煮艙" },
                  { n: "2", strong: "一鍵啟動", span: "選擇品項，機器自動設定時間與溫度" },
                  { n: "3", strong: "全自動蒸煮", span: "倒計時完成，蜂鳴提醒取出，品質每次一致" },
                  { n: "4", strong: "裝盤出餐", span: "員工取出擺盤直接送桌，或顧客自行從蒸煮機取出食用" },
                ].map((s, i) => (
                  <div key={i} className="eb-ramen-step">
                    <div className="eb-ramen-step-num">{s.n}</div>
                    <div className="eb-ramen-step-text"><strong>{s.strong}</strong><span>{s.span}</span></div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "20px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Image src="/images/eastbeauty/ramen_cups.jpg" alt="密封杯裝食材" width={280} height={210} style={{ borderRadius: "8px", border: "1px solid #e8e0d0", objectFit: "contain", background: "#faf8f4" }} />
                <Image src="/images/eastbeauty/ramen_bowl.jpg" alt="完成品" width={280} height={210} style={{ borderRadius: "8px", border: "1px solid #e8e0d0", objectFit: "contain", background: "#faf8f4" }} />
              </div>
            </div>
            <div>
              <div className="eb-video-wrap">
                <video
                  src="/images/eastbeauty/ramen_machine.mp4"
                  autoPlay muted loop playsInline
                  style={{ width: "100%", display: "block" }}
                />
              </div>
              <p style={{ fontSize: ".72rem", color: "#888", textAlign: "center", marginTop: "6px" }}>▲ 自助蒸煮機實機操作示意</p>
              <div style={{ marginTop: "16px" }} className="eb-video-wrap">
                <video
                  src="/images/eastbeauty/ramen_machine2.mp4"
                  autoPlay muted loop playsInline
                  style={{ width: "100%", display: "block" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ⑦ GraBox 智取櫃 */}
      <div className="eb-locker-wrap">
        <div ref={sLocker} className="eb-fade eb-locker-inner">
          <div className="eb-locker-badge">⭐ MCS 銓幻元 自主研發</div>
          <div className="eb-locker-title">GraBox <em>雙面智取櫃</em> — 我們的核心武器</div>
          <p className="eb-locker-sub">
            100% 台灣自主研發製造，不是外購、不是貼牌。
            GraBox 是自助取餐站的關鍵設備——
            顧客掃碼即自動開艙，員工只需補貨，零人力守候。
          </p>
          <div className="eb-locker-photos">
            {[
              { src: "/images/eastbeauty/locker_001.jpg", label: "夜景概念圖" },
              { src: "/images/eastbeauty/locker_003.jpg", label: "霓虹夜間效果" },
              { src: "/images/eastbeauty/locker_002.jpg", label: "日間實景" },
            ].map((img, i) => (
              <div key={i} className="eb-locker-photo">
                <Image src={img.src} alt={img.label} fill style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent,rgba(0,0,0,.7)", padding: "10px 12px 8px", fontSize: ".7rem", color: "rgba(255,255,255,.85)" }}>{img.label}</div>
              </div>
            ))}
          </div>
          <div className="eb-locker-feats">
            {[
              { icon: "🏭", title: "台灣自主製造", desc: "硬體 + 韌體 + 雲端全自研" },
              { icon: "❄️", title: "冷凍 / 冷藏智取艙", desc: "-18°C 冷凍 + 4°C 冷藏 · LED 照明 · 食品安全" },
              { icon: "📱", title: "掃碼自動開艙", desc: "LINE / QR Code 零接觸取餐 · 冷凍碗搭配蒸煮機" },
              { icon: "☁️", title: "MCS 雲端串接", desc: "即時庫存 · 遠端補貨提醒" },
            ].map((f, i) => (
              <div key={i} className="eb-locker-feat">
                <div className="eb-locker-feat-icon">{f.icon}</div>
                <div className="eb-locker-feat-title">{f.title}</div>
                <div className="eb-locker-feat-desc">{f.desc}</div>
              </div>
            ))}
          </div>
          <div><div className="eb-oem-pill">🔧 OEM / ODM 客製貼牌 · 日本市場已導入</div></div>
        </div>
      </div>

      {/* ⑧ AI 管理平台 */}
      <div ref={sAi} className="eb-fade">
        <section className="eb-section" id="ai">
          <div className="eb-label">AI PLATFORM</div>
          <div className="eb-title">MCS 銓幻元 — <em>AI 及平台管理中心</em></div>
          <div className="eb-rule" />
          <div style={{ marginBottom: "32px" }}>
            <Image src="/images/eastbeauty/eb_ecosystem.png" alt="生態系統圖" width={1000} height={420}
              style={{ width: "100%", height: "auto", borderRadius: "10px", border: "1px solid #e8e0d0" }} />
          </div>
          <div style={{ background: "#0d2240", borderRadius: "12px", padding: "28px 32px" }}>
            <div style={{ color: "#f5c842", fontWeight: 700, marginBottom: "12px" }}>全流程串接 — 零人力節點</div>
            <div style={{ color: "rgba(255,255,255,.78)", fontSize: ".88rem", lineHeight: 2 }}>
              顧客進場 → Kiosk 點餐 / QR 桌邊點餐 → MCS 後台派單 →
              蒸煮機備餐 + 茶飲機出杯 → GraBox 冰櫃入庫 →
              顧客掃碼取餐 → LINE Pay 結帳 → 數據回傳 → AI 分析優化菜單
            </div>
          </div>
        </section>
      </div>

      {/* ⑨ 展店策略 */}
      <div className="bg-warm">
        <div ref={sStrategy} className="eb-fade">
          <section className="eb-section" id="strategy">
            <div className="eb-label">EXPANSION STRATEGY</div>
            <div className="eb-title">以東方美為基地，<em>滾動式 AI 展店</em></div>
            <div className="eb-rule" />
            <p className="eb-lead">
              先以駁二旗艦驗證自助模組，數據成熟後再複製——
              每一個新據點都帶著上一個場域的學習，越開越快、越開越穩。
            </p>
            <div className="eb-phases">
              {PHASES.map((p, i) => (
                <div key={i} className="eb-phase">
                  <div className="eb-phase-num">{p.num}</div>
                  <div className="eb-phase-body">
                    <div className="eb-phase-header">
                      <div className="eb-phase-name">{p.name}</div>
                      <div className="eb-phase-time">{p.timeline}</div>
                    </div>
                    <div className="eb-phase-items">{p.items.map((item, j) => <div key={j} className="eb-phase-item">✓ {item}</div>)}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* ⑩ 10億千店計畫 */}
      <div className="eb-1000-wrap" id="thousand">

        {/* HERO BANNER */}
        <div className="eb-1000-hero">
          <div className="eb-1000-hero-bg">
            <Image src="/images/eastbeauty/thousand_stores_hero.jpg" alt="千店計畫" fill
              style={{ objectFit: "cover", opacity: .45 }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          </div>
          <div ref={s1000hero} className="eb-fade eb-1000-hero-content">
            <div className="eb-1000-eyebrow">🚀 VISION 2027+ — 終極目標</div>
            <div className="eb-1000-title">
              <em>10億</em><br />
              <span className="sub">千店計畫</span>
            </div>
            <p className="eb-1000-tagline">每家只需 100 萬貸款 · 2 人運作 · 3 天開業</p>
          </div>
        </div>

        {/* STATS */}
        <div className="eb-1000-stats">
          {[
            { num: "100", unit: "萬", label: "每店最低貸款門檻" },
            { num: "2",   unit: "人", label: "全店最低運作人力" },
            { num: "1000",unit: "家", label: "千店展店目標" },
            { num: "10",  unit: "億", label: "品牌估值目標" },
          ].map((s, i) => (
            <div key={i} className="eb-1000-stat">
              <div className="eb-1000-stat-num"><Counter to={parseInt(s.num)} suffix={s.unit} /></div>
              <div className="eb-1000-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* BODY */}
        <div ref={s1000body} className="eb-fade eb-1000-body">

          {/* 三大支柱 */}
          <div style={{ marginBottom: "16px" }}>
            <div className="eb-label" style={{ color: "#f5c842aa" }}>THREE PILLARS</div>
            <div className="eb-title" style={{ color: "#fff", marginBottom: "28px" }}>千店成立的<em>三大基礎</em></div>
          </div>
          <div className="eb-pillar-grid">
            {[
              {
                icon: "💰",
                title: "低門檻開店",
                desc: "每家店只需貸款 100 萬即可啟動。\n小坪數（15–30坪）、少人力（2人）、設備自助化，大幅壓低固定成本，讓加盟者快速回本、獲利。",
                tag: "貸款 100萬起",
              },
              {
                icon: "🚛",
                title: "東方美實業 物流支援",
                desc: "東方美實業提供上百台車隊，每日定時配送新鮮半成品到各加盟店。店家無需採購、備料、處理食材——只需蒸煮、烤、擺盤，SOP 極度簡化。",
                tag: "每日新鮮配送",
              },
              {
                icon: "🤖",
                title: "MCS AI 持續優化",
                desc: "每家店的銷售數據、備料消耗、顧客行為，全部即時回報 MCS 管理中台。AI 不斷分析 → 總部修改細部流程 → 推送給所有門店，越開越聰明。",
                tag: "AI 即時回報總部",
              },
            ].map((p, i) => (
              <div key={i} className="eb-pillar">
                <div className="eb-pillar-icon">{p.icon}</div>
                <div className="eb-pillar-title">{p.title}</div>
                <div className="eb-pillar-desc" style={{ whiteSpace: "pre-line" }}>{p.desc}</div>
                <div className="eb-pillar-tag">{p.tag}</div>
              </div>
            ))}
          </div>

          {/* 供應鏈飛輪 */}
          <div className="eb-supply-chain">
            <div style={{ color: "#f5c842", fontWeight: 700, fontSize: "1rem", marginBottom: "6px" }}>供應鏈飛輪 — 越多店越強壯</div>
            <div style={{ color: "rgba(255,255,255,.5)", fontSize: ".78rem", marginBottom: "20px" }}>東方美實業 × MCS AI 中台 × 千家門店，形成自我強化的飛輪效應</div>
            <div style={{ marginBottom: "20px", borderRadius: "8px", overflow: "hidden" }}>
              <Image src="/images/eastbeauty/supply_chain_hub.jpg" alt="物流供應鏈" width={1000} height={400}
                style={{ width: "100%", height: "auto", display: "block" }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            </div>
            <div className="eb-supply-flow">
              {[
                { icon: "🏭", title: "東方美實業總部", desc: "中央廚房 · 備料" },
                { icon: "🚛", title: "上百台車隊", desc: "每日定時配送" },
                { icon: "🍜", title: "千家門店", desc: "蒸煮烤 · 自助出餐" },
                { icon: "📊", title: "AI 數據回報", desc: "即時回傳 MCS" },
                { icon: "⚙️", title: "流程持續優化", desc: "AI 推送新 SOP" },
              ].map((n, i, arr) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 0 }}>
                  <div className="eb-supply-node">
                    <div className="eb-supply-node-icon">{n.icon}</div>
                    <div className="eb-supply-node-title">{n.title}</div>
                    <div className="eb-supply-node-desc">{n.desc}</div>
                  </div>
                  {i < arr.length - 1 && <div className="eb-supply-arrow">→</div>}
                </div>
              ))}
            </div>
          </div>

          {/* 副品牌咖啡茶飲 BAR */}
          <div style={{ marginBottom: "16px" }}>
            <div className="eb-label" style={{ color: "#f5c842aa" }}>SUB-BRAND EXPANSION</div>
            <div className="eb-title" style={{ color: "#fff", marginBottom: "24px" }}>副品牌：<em>自助咖啡茶飲 BAR</em></div>
          </div>
          <div className="eb-subbrand">
            <div className="eb-subbrand-img">
              <Image src="/images/eastbeauty/coffee_bar_subbrand.jpg" alt="茶飲 BAR 副品牌" fill
                style={{ objectFit: "cover" }}
                onError={(e) => { (e.target as HTMLImageElement).src = "/images/eastbeauty/locker_001.jpg"; }} />
            </div>
            <div className="eb-subbrand-text">
              <div className="eb-subbrand-badge">🔀 副品牌策略</div>
              <div className="eb-subbrand-title">以主店為基地，<br /><em>向外輻射擴充</em></div>
              <p className="eb-subbrand-desc">
                每家東方美 AI 門店，同時作為「自助咖啡茶飲 BAR」的後勤據點——
                提供設備存貨、補貨、清潔維護服務，讓副品牌 BAR 可以用極低成本快速落地，
                形成主副品牌相互支撐的最強連鎖網絡。
              </p>
              <div className="eb-subbrand-points">
                {[
                  "主店承擔庫存與補貨責任，BAR 只需專注銷售",
                  "自助設備（茶飲機 + 咖啡機）+ 1 人即可操作",
                  "品牌共用 MCS AI 後台，數據統一管理",
                  "副品牌可快速進駐商圈、辦公樓、學區等高流量點",
                  "主副品牌形成「實體後勤網」× 「數位 AI 網」雙層防禦",
                ].map((pt, i) => (
                  <div key={i} className="eb-subbrand-point">
                    <div className="eb-subbrand-point-dot" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 加盟店 + 飛輪收尾 */}
          <div className="eb-flywheel">
            <div className="eb-flywheel-title">從一家店，到<em>最強 AI 餐飲連鎖</em></div>
            <p className="eb-flywheel-sub">每開一家新店，整個系統就變得更聰明、更有競爭力</p>
            <div className="eb-flywheel-steps">
              {[
                { icon: "🏪", title: "加盟店開業", desc: "100萬貸款 · 2人啟動" },
                { icon: "🚛", title: "每日配送", desc: "東方美車隊 · 半成品到店" },
                { icon: "🤖", title: "AI 數據回收", desc: "MCS 即時分析" },
                { icon: "⚙️", title: "流程優化", desc: "推送全體門店" },
                { icon: "📈", title: "品牌增值", desc: "規模越大越強" },
                { icon: "☕", title: "BAR 副品牌", desc: "主店輻射擴充" },
              ].map((s, i, arr) => (
                <div key={i} style={{ display: "flex", alignItems: "center" }}>
                  <div className="eb-fw-step">
                    <div className="eb-fw-icon">{s.icon}</div>
                    <div className="eb-fw-title">{s.title}</div>
                    <div className="eb-fw-desc">{s.desc}</div>
                  </div>
                  {i < arr.length - 1 && <div className="eb-fw-arrow">→</div>}
                </div>
              ))}
            </div>
          </div>

          {/* 加盟店外觀 + 開店條件 */}
          <div className="eb-franchise-grid">
            <div className="eb-franchise-img">
              <Image src="/images/eastbeauty/franchise_store_small.jpg" alt="加盟門店示意" fill
                style={{ objectFit: "cover" }}
                onError={(e) => { (e.target as HTMLImageElement).src = "/images/eastbeauty/scene2.png"; }} />
            </div>
            <div className="eb-franchise-card">
              <div>
                <div className="eb-franchise-card-title">💼 加盟開店條件</div>
                <div className="eb-franchise-card-items">
                  {[
                    "貸款 100 萬即可啟動，門檻低",
                    "小坪數（15–30 坪）· 租金成本低",
                    "MCS 自助設備一站到位",
                    "東方美實業每日供應半成品",
                    "無需廚師資格，SOP 極度標準化",
                    "GraBox 智取櫃 + 茶飲機 + 蒸煮機即為完整配備",
                    "副品牌 BAR 可同址延伸，提升坪效",
                  ].map((item, i) => (
                    <div key={i} className="eb-franchise-card-item">{item}</div>
                  ))}
                </div>
              </div>
              <div className="eb-franchise-card-bottom">
                目標：全台 1,000 家門店 · 品牌估值 10 億 · 打造台灣最強 AI 餐飲連鎖
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ⑪ GraBox 雙面智取櫃 衛星擴散網 — Page 1 */}
      <div className="eb-satellite-wrap" id="satellite">
        <div className="eb-satellite-inner">
          <div ref={sSatellite1} className="eb-fade">
            <div className="eb-satellite-eyebrow">GRABOX SATELLITE NETWORK</div>
            <div className="eb-satellite-title">雙面智取櫃 <em>衛星擴散網</em></div>
            <div className="eb-satellite-rule" />
            <p className="eb-satellite-lead">
              GraBox 不只是東方美餐廳內的設備——<br />
              它是可以<strong>獨立部署到任何場域</strong>的「無人餐飲衛星站」。<br />
              消費者用手機 QR 掃碼，自動開艙取飲料、取冷凍拉麵碗；
              現場有蒸煮機，3 分鐘自助加熱，24H 無人看守。<br />
              以東方美旗艦為<strong>母艦補貨中心</strong>，向外輻射衛星，打造最密集的 AI 餐飲毛細網。
            </p>

            {/* GraBox 概念圖 + 使用流程 */}
            <div className="eb-grabox-concept">
              <div className="eb-grabox-concept-img">
                <Image src="/images/eastbeauty/sat_v2_grabox_frozen.jpg" alt="GraBox 冷凍自取冰櫃" fill
                  style={{ objectFit: "cover" }}
                  onError={(e) => { (e.target as HTMLImageElement).src = "/images/eastbeauty/grabox_cold_unit.jpg"; }} />
              </div>
              <div className="eb-grabox-concept-body">
                <div className="eb-grabox-concept-badge">⭐ MCS 銓幻元 自研產品</div>
                <div className="eb-grabox-concept-title">GraBox <em>冷凍 · 冷藏</em> 自取冰櫃<br />掃碼自取 · 搭配蒸煮機 · 24H 無人運作</div>
                <div className="eb-grabox-concept-desc">
                  台灣自主研發製造的智慧取餐設備。上層冷藏區（4°C）放飲料、瓶裝茶、珍奶；
                  下層冷凍區（-18°C）放密封拉麵碗、港點杯——取出後直接放入旁邊的蒸煮機。
                  掃碼下單 → 指定艙門自動彈開 → 取冷凍碗 → 蒸煮機 3 分鐘 → 開吃。
                </div>
                <div className="eb-grabox-flows">
                  {[
                    { icon: "📱", strong: "Step 1 — 掃碼點餐", text: "LINE / QR Code 選品付款，系統指定艙號" },
                    { icon: "❄️", strong: "Step 2 — 自動開艙", text: "指定艙門自動解鎖，顧客直接取出商品" },
                    { icon: "♨️", strong: "Step 3 — 自助蒸煮", text: "冷凍拉麵碗放入現場蒸煮機，3 分鐘完成" },
                    { icon: "🚴", strong: "Uber Eats 模式", text: "外送騎士掃碼取單，直接帶走無需等待" },
                  ].map((f, i) => (
                    <div key={i} className="eb-grabox-flow">
                      <div className="eb-grabox-flow-icon">{f.icon}</div>
                      <div className="eb-grabox-flow-text"><strong>{f.strong}</strong>{f.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Uber Eats Banner */}
            <div className="eb-ubereats-banner">
              <Image src="/images/eastbeauty/sat_v2_ubereats.jpg" alt="Uber Eats × GraBox" fill
                style={{ objectFit: "cover" }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              <div className="eb-ubereats-overlay">
                <div className="eb-ubereats-badge">🚴 Uber Eats × GraBox</div>
                <div className="eb-ubereats-title">外送平台整合 — <em>騎士掃碼即取，零等待</em></div>
                <div className="eb-ubereats-desc">
                  GraBox 與 Uber Eats / Foodpanda 串接後，騎士到達衛星站掃碼，
                  對應訂單艙門自動開啟，直接取走。不需廚房、不需等候——
                  衛星站同時服務到店顧客與外送平台，<strong style={{ color: "#06c167" }}>坪效翻倍</strong>。
                </div>
              </div>
            </div>

            {/* 衛星場景 01–04 */}
            <div className="eb-scenarios-label">✦ 衛星擴散場景 — 第一波（01–04）</div>
            <div className="eb-scenarios-grid">
              {[
                {
                  src: "/images/eastbeauty/sat_v3_hotel.jpg",
                  fallback: "/images/eastbeauty/render1.png",
                  num: "01",
                  name: "中小型旅館 · 民宿",
                  devices: "自助咖啡機 + 冷藏自取冰櫃",
                  desc: "50 房以下旅館無超商進駐資格，GraBox 無 MG 門檻，1 天安裝即上線",
                  tag: "藍海 · 1,500 家目標",
                },
                {
                  src: "/images/eastbeauty/sat_v3_dorm.jpg",
                  fallback: "/images/eastbeauty/render2.png",
                  num: "02",
                  name: "大學學生宿舍",
                  devices: "冷凍自取冰櫃 + 桌上蒸煮拉麵機",
                  desc: "宵夜高需求：取冷凍拉麵碗 → 蒸煮機 3 分鐘，深夜 24H 無人運作",
                  tag: "夜間高頻 · 黏著度高",
                },
                {
                  src: "/images/eastbeauty/sat_v3_worker.jpg",
                  fallback: "/images/eastbeauty/render3.png",
                  num: "03",
                  name: "移工宿舍 · 廠區",
                  devices: "冷凍自取冰櫃 + 桌上蒸煮拉麵機 + 智慧販賣機",
                  desc: "透過仲介公司批量談點，多語介面，班次輪替 24H 穩定消費",
                  tag: "仲介通路 · 批量落地",
                },
                {
                  src: "/images/eastbeauty/sat_v3_clinic.jpg",
                  fallback: "/images/eastbeauty/render4.png",
                  num: "04",
                  name: "診所候診區",
                  devices: "冷藏自取冰櫃 + 自助咖啡機",
                  desc: "候診時間長，家屬消費意願強，院長一人拍板即可導入，決策快",
                  tag: "高客單 · 決策快",
                },
              ].map((s, i) => (
                <div key={i} className="eb-scenario-card">
                  <Image src={s.src} alt={s.name} fill style={{ objectFit: "cover" }}
                    onError={(e) => { (e.target as HTMLImageElement).src = s.fallback; }} />
                  <div className="eb-scenario-overlay" />
                  <div className="eb-scenario-content">
                    <div className="eb-scenario-num">SATELLITE {s.num}</div>
                    <div className="eb-scenario-name">{s.name}</div>
                    <div style={{ fontSize: ".65rem", color: "#f5c842aa", marginBottom: "3px" }}>📦 {s.devices}</div>
                    <div className="eb-scenario-desc">{s.desc}</div>
                    <div className="eb-scenario-tag">{s.tag}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ⑪ GraBox 衛星擴散網 — Page 2 */}
      <div className="eb-satellite-p2">
        <div className="eb-satellite-p2-inner">
          <div ref={sSatellite2} className="eb-fade">

            {/* 衛星場景 05–08 */}
            <div className="eb-scenarios-label" style={{ marginBottom: "18px" }}>✦ 衛星擴散場景 — 第二波（05–08）</div>
            <div className="eb-scenarios-grid">
              {[
                {
                  src: "/images/eastbeauty/sat_v3_cowork.jpg",
                  fallback: "/images/eastbeauty/scene1.png",
                  num: "05",
                  name: "共享辦公 · WeWork",
                  devices: "自助智慧茶飲機 + 冷藏自取冰櫃",
                  desc: "早午餐 + 下午茶一站滿足，精品咖啡茶飲 + 健康零食，高客單消費者",
                  tag: "精準客群 · 高客單",
                },
                {
                  src: "/images/eastbeauty/sat_v3_office.jpg",
                  fallback: "/images/eastbeauty/scene2.png",
                  num: "06",
                  name: "企業大樓 · 商辦",
                  devices: "冷凍自取冰櫃 + 桌上蒸煮拉麵機 + 自助微波取餐櫃",
                  desc: "午餐高峰取代外送，冷凍便當蒸煮即食，福委採購月票批量方案",
                  tag: "午餐峰值 · 企業採購",
                },
                {
                  src: "/images/eastbeauty/sat_v3_community.jpg",
                  fallback: "/images/eastbeauty/locker_outside.jpg",
                  num: "07",
                  name: "社區 · 公寓大廳",
                  devices: "冷藏自取冰櫃 + 智慧販賣機",
                  desc: "居民下班取飲料、宵夜，物管室旁 24H 落地，全年齡友善操作",
                  tag: "社區鄰里 · 高黏著",
                },
                {
                  src: "/images/eastbeauty/sat_v3_hospital.jpg",
                  fallback: "/images/eastbeauty/render1.png",
                  num: "08",
                  name: "醫院 · 家屬等候區",
                  devices: "冷藏自取冰櫃 + 自助咖啡機",
                  desc: "家屬等待時間長、消費力強，冷熱飲 + 健康輕食組合，院內空缺大",
                  tag: "新增場域 · 高潛力",
                },
              ].map((s, i) => (
                <div key={i} className="eb-scenario-card">
                  <Image src={s.src} alt={s.name} fill style={{ objectFit: "cover" }}
                    onError={(e) => { (e.target as HTMLImageElement).src = s.fallback; }} />
                  <div className="eb-scenario-overlay" />
                  <div className="eb-scenario-content">
                    <div className="eb-scenario-num">SATELLITE {s.num}</div>
                    <div className="eb-scenario-name">{s.name}</div>
                    <div style={{ fontSize: ".65rem", color: "#f5c842aa", marginBottom: "3px" }}>📦 {s.devices}</div>
                    <div className="eb-scenario-desc">{s.desc}</div>
                    <div className="eb-scenario-tag">{s.tag}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="eb-satellite-divider" />

            {/* 衛星網絡地圖 */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div className="eb-satellite-eyebrow">NETWORK MAP</div>
              <div className="eb-satellite-title" style={{ fontSize: "clamp(1.4rem,3vw,2.2rem)" }}>
                東方美旗艦 × <em>8 大衛星節點</em><br />
                <span style={{ fontSize: ".6em", color: "rgba(255,255,255,.5)", fontWeight: 400 }}>以主店為母艦，向外擴散，形成最密集的 AI 餐飲毛細網</span>
              </div>
            </div>
            {/* SVG 衛星網絡圖 — 純程式碼，中文文字 100% 正確 */}
            <div className="eb-network-map" style={{ background: "#0a1628", borderRadius: "16px", overflow: "hidden", padding: "8px" }}>
              <svg viewBox="0 0 900 520" style={{ width: "100%", height: "auto", display: "block" }}
                xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#f5c842" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#f5c842" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#1a3a5c" stopOpacity="1" />
                    <stop offset="100%" stopColor="#0d2240" stopOpacity="1" />
                  </radialGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>

                {/* 背景 */}
                <rect width="900" height="520" fill="#0a1628" />

                {/* 標題 */}
                <text x="450" y="38" textAnchor="middle" fill="#f5c842" fontSize="15" fontWeight="700" fontFamily="'Noto Sans TC', sans-serif" letterSpacing="2">
                  雙面智取櫃 衛星擴散網
                </text>
                <text x="450" y="58" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="'Noto Sans TC', sans-serif">
                  GraBox Satellite Network — 以東方美旗艦為母艦，向外輻射 8 大場域
                </text>

                {/* 連線 — 中心到各衛星 */}
                {[
                  [450, 280, 180, 140], [450, 280, 310, 100], [450, 280, 590, 100], [450, 280, 720, 140],
                  [450, 280, 760, 280], [450, 280, 680, 410], [450, 280, 310, 410], [450, 280, 140, 300],
                ].map(([x1,y1,x2,y2], i) => (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="#f5c842" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="5 4" />
                ))}

                {/* 中心光暈 */}
                <circle cx="450" cy="280" r="70" fill="url(#centerGlow)" />
                <circle cx="450" cy="280" r="46" fill="#0d2240" stroke="#f5c842" strokeWidth="2" filter="url(#glow)" />
                <circle cx="450" cy="280" r="43" fill="#0d2240" stroke="#f5c842" strokeOpacity="0.4" strokeWidth="1" />
                <text x="450" y="271" textAnchor="middle" fill="#f5c842" fontSize="18">🏪</text>
                <text x="450" y="287" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700" fontFamily="'Noto Sans TC', sans-serif">東方美</text>
                <text x="450" y="299" textAnchor="middle" fill="#f5c842" fontSize="8" fontFamily="'Noto Sans TC', sans-serif">AI 旗艦主店</text>
                <text x="450" y="311" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7.5" fontFamily="'Noto Sans TC', sans-serif">MCS AI 管理中台</text>

                {/* 8 個衛星節點 */}
                {[
                  { x: 180, y: 140, icon: "🏨", name: "中小旅館", sub: "民宿", num: "01" },
                  { x: 310, y: 100, icon: "🎓", name: "學生宿舍", sub: "大學校園", num: "02" },
                  { x: 590, y: 100, icon: "🏭", name: "移工宿舍", sub: "廠區", num: "03" },
                  { x: 720, y: 140, icon: "🏥", name: "診所候診", sub: "醫療場域", num: "04" },
                  { x: 760, y: 280, icon: "💼", name: "共享辦公", sub: "WeWork", num: "05" },
                  { x: 680, y: 410, icon: "🏢", name: "企業大樓", sub: "商辦", num: "06" },
                  { x: 310, y: 410, icon: "🏘️", name: "社區大廳", sub: "公寓", num: "07" },
                  { x: 140, y: 300, icon: "🏥", name: "醫院", sub: "家屬候診", num: "08" },
                ].map((n) => (
                  <g key={n.num}>
                    <circle cx={n.x} cy={n.y} r="38" fill="url(#nodeGlow)" stroke="#f5c842" strokeOpacity="0.45" strokeWidth="1.5" />
                    <text x={n.x} y={n.y - 8} textAnchor="middle" fontSize="16">{n.icon}</text>
                    <text x={n.x} y={n.y + 7} textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700" fontFamily="'Noto Sans TC', sans-serif">{n.name}</text>
                    <text x={n.x} y={n.y + 19} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7.5" fontFamily="'Noto Sans TC', sans-serif">{n.sub}</text>
                    {/* 編號 badge */}
                    <circle cx={n.x + 26} cy={n.y - 26} r="10" fill="#f5c842" />
                    <text x={n.x + 26} y={n.y - 22} textAnchor="middle" fill="#0d2240" fontSize="8" fontWeight="900" fontFamily="monospace">{n.num}</text>
                    {/* GraBox 小 icon */}
                    <rect x={n.x - 14} y={n.y + 24} width="28" height="12" rx="4" fill="rgba(245,200,66,0.12)" stroke="#f5c842" strokeOpacity="0.3" strokeWidth="1" />
                    <text x={n.x} y={n.y + 33} textAnchor="middle" fill="#f5c842" fontSize="7" fontFamily="'Noto Sans TC', sans-serif">GraBox ❄</text>
                  </g>
                ))}

                {/* 底部說明 */}
                <text x="450" y="500" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="'Noto Sans TC', sans-serif">
                  ▲ 以東方美 AI 主店為核心，8 大場域輻射部署 · MCS 銓幻元 統一管理
                </text>
              </svg>
            </div>
            <div className="eb-network-caption">▲ 雙面智取櫃衛星擴散網 — 以東方美 AI 主店為核心，8 大場域輻射部署</div>

            <div style={{ marginTop: "40px", background: "rgba(245,200,66,.06)", border: "1px solid rgba(245,200,66,.2)", borderRadius: "12px", padding: "28px 32px" }}>
              <div style={{ color: "#f5c842", fontWeight: 700, fontSize: "1rem", marginBottom: "10px" }}>💡 衛星站商業模式</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                {[
                  { icon: "🏭", title: "主店負責補貨", desc: "每日從旗艦店配送，衛星站無需獨立備料" },
                  { icon: "📱", title: "MCS 統一管理", desc: "所有衛星站庫存、銷售由 AI 中台即時監控" },
                  { icon: "💰", title: "場地方分潤", desc: "場地業主收取租金或銷售分成，零風險導入" },
                  { icon: "🔧", title: "MCS 維護保障", desc: "硬體維修、韌體更新、設備監控全包" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "10px" }}>
                    <div style={{ fontSize: "1.2rem", flexShrink: 0 }}>{item.icon}</div>
                    <div>
                      <div style={{ color: "#f5c842", fontWeight: 700, fontSize: ".82rem", marginBottom: "4px" }}>{item.title}</div>
                      <div style={{ color: "rgba(255,255,255,.6)", fontSize: ".78rem", lineHeight: 1.7 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ⑫ 移工宿舍商機 */}
      <div className="eb-worker-wrap" id="worker">
        <div className="eb-worker-inner">
          <div className="eb-worker-eyebrow">SATELLITE DEEP DIVE · 移工宿舍</div>
          <h2 className="eb-worker-title">被低估的<em>龐大藍海</em><br />移工宿舍 — 全台 75 萬人的日常剛需</h2>
          <p className="eb-worker-sub">
            台灣移工人口超過 75 萬，集中居住於工廠附屬宿舍與專業移工宿舍，
            多數地點遠離超商、禁止自炊。這些宿舍的公共區域空間大、人流密集、
            消費需求高，卻長期缺乏優質的餐飲與茶飲解方——這就是 MCS 的機會。
          </p>

          {/* 市場數字 */}
          <div className="eb-worker-stats">
            <div className="eb-worker-stat">
              <div className="eb-worker-stat-num">75萬+</div>
              <div className="eb-worker-stat-label">台灣在台移工人口<br/>東南亞籍為主</div>
            </div>
            <div className="eb-worker-stat">
              <div className="eb-worker-stat-num">26萬</div>
              <div className="eb-worker-stat-label">居住於雇主提供<br/>集中式宿舍</div>
            </div>
            <div className="eb-worker-stat">
              <div className="eb-worker-stat-num">3班制</div>
              <div className="eb-worker-stat-label">輪班制度 · 24H<br/>消費需求不間斷</div>
            </div>
            <div className="eb-worker-stat">
              <div className="eb-worker-stat-num">禁自炊</div>
              <div className="eb-worker-stat-label">多數宿舍規定禁止<br/>自行烹煮食物</div>
            </div>
            <div className="eb-worker-stat">
              <div className="eb-worker-stat-num">仲介談</div>
              <div className="eb-worker-stat-label">透過仲介公司<br/>批量洽談進駐點</div>
            </div>
            <div className="eb-worker-stat">
              <div className="eb-worker-stat-num">高頻消費</div>
              <div className="eb-worker-stat-label">飲料 · 熱食 · 零食<br/>日均 2-3 次消費</div>
            </div>
          </div>

          {/* 照片牆：AI 情境圖 + 真實場地 */}
          <div className="eb-worker-photos">
            <div className="eb-worker-photo">
              <Image src="/images/eastbeauty/sat_v3_worker.jpg" alt="移工宿舍 MCS 自助站 AI 情境圖" fill style={{ objectFit: "cover" }} />
              <div className="eb-worker-photo-cap">🤖 MCS 自助站部署情境示意</div>
            </div>
            <div className="eb-worker-photo">
              <Image src="/images/eastbeauty/worker_dorm_ext.jpg" alt="現代移工宿舍外觀" fill style={{ objectFit: "cover" }} />
              <div className="eb-worker-photo-cap">現代移工宿舍建築外觀</div>
            </div>
            <div className="eb-worker-photo">
              <Image src="/images/eastbeauty/worker_dorm_int2.jpg" alt="宿舍公共區域" fill style={{ objectFit: "cover" }} />
              <div className="eb-worker-photo-cap">空置公共區域 — 待活化的黃金空間</div>
            </div>
          </div>

          {/* XMART 合作說明 */}
          <div className="eb-worker-xmart">
            <div className="eb-worker-xmart-logo">
              <Image src="/images/eastbeauty/xmart_brand.jpg" alt="XMART 艾克市" width={100} height={130} style={{ objectFit: "cover", borderRadius: "8px" }} />
            </div>
            <div className="eb-worker-xmart-body">
              <h4>🤝 策略合作夥伴：XMART 艾克市 — 台灣唯一東南亞選品連鎖超商</h4>
              <p>
                XMART 艾克市專注服務移工族群，已在新竹湖口、明湖等移工聚集地開設據點，
                深耕東南亞選品與社群連結。MCS × XMART 合作模式：
              </p>
              <ul>
                <li>在 XMART 店內設置 MCS 自助咖啡茶飲角（設備導入、收益分潤）</li>
                <li>XMART 協助洽談宿舍進駐，MCS 提供設備與雲端管理系統</li>
                <li>雙品牌互補：東南亞零食選品 × MCS 熱食熱飲自助站</li>
              </ul>
            </div>
          </div>

          {/* 三大進駐模式 */}
          <div style={{ marginBottom: "24px" }}>
            <div className="eb-scenarios-label">✦ 三大進駐模式 — 彈性切入，依場域選擇</div>
          </div>
          <div className="eb-worker-models">
            {/* 模式 A */}
            <div className="eb-worker-model">
              <span className="eb-worker-model-badge" style={{ background: "rgba(120,80,200,.2)", color: "#c084fc" }}>模式 A · XMART 異業合作</span>
              <h4>進駐 XMART 門店角落</h4>
              <p>
                在現有 XMART 艾克市門店內規劃 2–3 坪角落，導入 MCS 自助茶飲吧，
                共享客流、共享空間，快速驗證移工族群消費力。
              </p>
              <div className="eb-worker-model-devices">
                📦 設備：自助智慧茶飲機 + 桌上奶茶機<br/>
                🏢 談判對象：XMART 總部<br/>
                ⚡ 啟動速度：最快（店面已存在）
              </div>
            </div>
            {/* 模式 B */}
            <div className="eb-worker-model highlight">
              <span className="eb-worker-model-badge" style={{ background: "rgba(245,200,66,.2)", color: "#f5c842" }}>⭐ 模式 B · 宿舍小角落進駐</span>
              <h4>宿舍公共區設備組合站</h4>
              <p>
                直接與宿舍管理方或仲介公司簽約，在公共區域建立
                MCS 自助飲食站，利用宿舍龐大人流創造穩定收入。
                透過仲介通路可快速批量複製到多個宿舍點位。
              </p>
              <div className="eb-worker-model-devices">
                📦 設備：冷凍自取冰櫃 + 桌上蒸煮拉麵機 + 智慧販賣機<br/>
                🏢 談判對象：宿舍業主 / 仲介公司<br/>
                ⚡ 啟動速度：1 天安裝上線
              </div>
            </div>
            {/* 模式 C */}
            <div className="eb-worker-model">
              <span className="eb-worker-model-badge" style={{ background: "rgba(6,193,103,.15)", color: "#06c167" }}>模式 C · 獨立茶飲吧</span>
              <h4>MCS 品牌自助咖啡茶飲吧</h4>
              <p>
                在宿舍一樓空置公共空間建立完整 MCS 自助茶飲吧，
                提供咖啡、奶茶、熱食一站式服務，東南亞口味客製化，
                打造移工族群的日常「第三空間」。
              </p>
              <div className="eb-worker-model-devices">
                📦 設備：自助智慧茶飲機 + 自助咖啡機 + 冷凍自取冰櫃 + 蒸煮機<br/>
                🏢 談判對象：宿舍業主（租賃空間）<br/>
                ⚡ 啟動速度：3–5 天裝潢布置
              </div>
            </div>
          </div>

          {/* 現金流程情境圖 */}
          <div style={{ marginBottom: "32px" }}>
            <div className="eb-scenarios-label" style={{ marginBottom: "14px" }}>✦ MCS 特色流程 — 現金先付，掃碼後取</div>
            <div style={{ position: "relative", borderRadius: "12px", overflow: "hidden", aspectRatio: "16/9" }}>
              <Image src="/images/eastbeauty/worker_cash_flow.jpg" alt="移工現金繳費→掃碼取物流程" fill style={{ objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,.55) 0%, transparent 40%, transparent 60%, rgba(0,0,0,.55) 100%)" }} />
              <div style={{ position: "absolute", left: "24px", top: "50%", transform: "translateY(-50%)", color: "#fff" }}>
                <div style={{ fontSize: ".65rem", letterSpacing: ".15em", color: "#f5c842", marginBottom: "6px" }}>STEP 1</div>
                <div style={{ fontSize: "1rem", fontWeight: 700, lineHeight: 1.4 }}>投現金<br/>點餐 / 選飲料</div>
                <div style={{ fontSize: ".7rem", color: "rgba(255,255,255,.7)", marginTop: "4px" }}>繳費訂餐機<br/>紙鈔投入 · 自動找零</div>
              </div>
              <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", fontSize: "1.8rem" }}>→</div>
              <div style={{ position: "absolute", right: "24px", top: "50%", transform: "translateY(-50%)", color: "#fff", textAlign: "right" }}>
                <div style={{ fontSize: ".65rem", letterSpacing: ".15em", color: "#f5c842", marginBottom: "6px" }}>STEP 2</div>
                <div style={{ fontSize: "1rem", fontWeight: 700, lineHeight: 1.4 }}>憑收據掃碼<br/>自取食物飲料</div>
                <div style={{ fontSize: ".7rem", color: "rgba(255,255,255,.7)", marginTop: "4px" }}>GraBox 智取櫃<br/>販賣機 · 蒸煮機</div>
              </div>
            </div>
            <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.4)", textAlign: "center", marginTop: "8px" }}>
              ▲ 移工無信用卡也能完整使用 — 現金投入 → 系統記帳 → 掃碼自取，全程無需店員
            </div>
          </div>

          <div style={{ background: "rgba(6,193,103,.06)", border: "1px solid rgba(6,193,103,.2)", borderRadius: "10px", padding: "20px 24px", fontSize: ".82rem", color: "rgba(255,255,255,.7)", lineHeight: "1.85" }}>
            💡 <strong style={{ color: "#06c167" }}>關鍵優勢：</strong>
            移工族群高度集中、作息規律、24H 輪班消費、禁自炊形成剛性需求。
            相較於零售型超商需要 MG 保障、高租金，MCS 設備零門檻、一天上線，
            與宿舍業主採收益分潤模式，雙方零風險啟動。仲介公司洽談一次可批量鋪設多點，
            實現指數型擴張。
          </div>
        </div>
      </div>

      {/* ⑬ CTA */}
      <div className="eb-cta" id="cta">
        <div className="eb-cta-title">準備好見證 <em>東方美 2.0</em>？</div>
        <p className="eb-cta-sub">
          邀請您親臨駁二旗艦，體驗 2 人如何運作一間完整的科技餐廳。<br />
          自助不是未來，是現在就能部署的商業模型。
        </p>
        <a className="eb-btn" href="mailto:service@mcstation.ai">預約參訪 / 洽談合作</a>
        <div className="eb-contact">
          MCS 銓幻元科技股份有限公司 &nbsp;|&nbsp; service@mcstation.ai &nbsp;|&nbsp; www.mcstation.ai
        </div>
      </div>

      <footer className="eb-footer">
        © 2026 東方美 × MCS 銓幻元科技股份有限公司 · 本頁為策略簡報用途
      </footer>
    </>
  );
}
