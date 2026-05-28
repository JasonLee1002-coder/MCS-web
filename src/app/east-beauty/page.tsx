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
    name: "半自助點餐",
    human: "引導入座",
    machine: "Kiosk 自選菜單 · 桌邊 QR 碼點餐",
    color: "#f5c842",
    saving: "省 1 位點餐人員",
  },
  {
    num: "02",
    icon: "🍵",
    name: "半自助調飲",
    human: "補充原料",
    machine: "落地茶飲機自動調配 · 出杯計量",
    color: "#f5c842cc",
    saving: "省 1 位吧台人員",
  },
  {
    num: "03",
    icon: "🍜",
    name: "半自助蒸煮",
    human: "放入密封杯",
    machine: "自動蒸煮計時 · 到點提醒",
    color: "#f5c84299",
    saving: "省 1 位廚師",
  },
  {
    num: "04",
    icon: "❄️",
    name: "半自助取餐",
    human: "放入智取冰櫃",
    machine: "GraBox 掃碼自動開艙取餐",
    color: "#f5c84266",
    saving: "省 1 位服務員",
  },
  {
    num: "05",
    icon: "💳",
    name: "半自助結帳",
    human: "確認訂單",
    machine: "LINE Pay / 街口 掃碼 · 系統對帳",
    color: "#f5c84233",
    saving: "省 1 位收銀員",
  },
];

const DEVICES = [
  {
    src: "/images/eastbeauty/device_tea_dispenser.jpg",
    fallback: "/images/eastbeauty/milk_tea2.jpg",
    name: "落地茶飲機",
    badge: "半自助",
    badgeColor: "#06c167",
    desc: "1.5m 商用等級 · 多口味自動調配 · 員工補料即可",
    tag: "索迪科技 合作設備",
  },
  {
    src: "/images/eastbeauty/device_milk_tea.jpg",
    fallback: "/images/eastbeauty/milk_tea_machine.jpg",
    name: "桌上型奶茶機",
    badge: "半自助",
    badgeColor: "#06c167",
    desc: "觸控選飲 · 自動出杯 · 桌邊服務不排隊",
    tag: "MCS 雲端串接",
  },
  {
    src: "/images/eastbeauty/device_ramen_steamer.jpg",
    fallback: "/images/eastbeauty/ramen_bowl.jpg",
    name: "半自助蒸煮拉麵機",
    badge: "半自助",
    badgeColor: "#06c167",
    desc: "密封杯放入 → 自動蒸煮 → 定時提醒 · 零廚藝門檻",
    tag: "員工放杯，機器搞定",
  },
  {
    src: "/images/eastbeauty/locker_003.jpg",
    fallback: "/images/eastbeauty/locker_001.jpg",
    name: "GraBox 智取冰櫃",
    badge: "⭐ MCS 自研",
    badgeColor: "#f5c842",
    desc: "常溫智取 · 掃碼自開艙 · 24H 無人運作",
    tag: "🏭 台灣自主製造",
  },
  {
    src: "/images/eastbeauty/device_kiosk.jpg",
    fallback: "/images/eastbeauty/scene2.png",
    name: "自助點餐 Kiosk",
    badge: "半自助",
    badgeColor: "#06c167",
    desc: "21.5吋觸控 · 多語言 · 叫號 · 整合 MCS 後台",
    tag: "MCS 雲端串接",
  },
  {
    src: "/images/eastbeauty/device_microwave_locker.jpg",
    fallback: "/images/eastbeauty/setup2.png",
    name: "自助微波取餐櫃",
    badge: "半自助",
    badgeColor: "#06c167",
    desc: "掃碼自動開門 · 自動微波 · 顧客自取",
    tag: "MCS 雲端串接",
  },
];

const PHASES = [
  { num: "01", name: "駁二旗艦 POC", timeline: "2026 Q3", items: ["完整半自助模組導入", "MCS 平台串接驗證", "消費數據蒐集分析", "SOP 標準化建立"] },
  { num: "02", name: "選點升級", timeline: "2026 Q4 – 2027 Q1", items: ["複製半自助模組", "2-3 個新據點", "品牌識別統一", "2 人運作目標"] },
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

        /* ── CORE CONCEPT — 半自助 ── */
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
      `}</style>

      {/* NAV */}
      <nav className="eb-nav">
        <div>
          <span className="eb-nav-brand">東方美 × MCS 銓幻元</span>
          <span className="eb-nav-sub">半自助科技餐廳</span>
        </div>
        <div className="eb-nav-links">
          <a href="#concept">半自助概念</a>
          <a href="#flagship">旗艦店</a>
          <a href="#devices">設備陣列</a>
          <a href="#strategy">展店策略</a>
          <a href="#cta">立即洽談</a>
        </div>
      </nav>

      {/* ① HERO */}
      <section className="eb-hero" ref={heroRef}>
        <div className="eb-hero-eyebrow">✦ STRATEGY PRESENTATION 2026 ✦</div>
        <h1>東方美 × <em>MCS 銓幻元</em></h1>
        <p className="eb-hero-tagline">新型態 <strong style={{ color: "#06c167" }}>半自助</strong> 科技餐廳發展策略</p>
        <p className="eb-hero-sub">從一家店的試驗，到一個可複製的系統</p>
        <div className="eb-hero-mcs">
          <span>🤖</span>
          <span>技術核心：<strong>MCS 銓幻元 — AI 及平台管理中心</strong></span>
        </div>
        <div className="eb-scroll">SCROLL ↓</div>
      </section>

      {/* ② 半自助核心概念 */}
      <div className="eb-core-wrap" id="concept">
        <div ref={sCore} className="eb-fade eb-core-inner">
          <div className="eb-core-badge">💡 CORE CONCEPT — 半自助模式</div>
          <div className="eb-core-title">
            <em>半自助</em>，才是<br />快速展店的關鍵
          </div>
          <p className="eb-core-sub">
            全自動太貴、太複雜，全人工太貴、太難複製。<br />
            <strong style={{ color: "#f5c842" }}>半自助 = 機器做重複的事，人做有溫度的事。</strong><br />
            成本低、人力少、SOP 標準化——讓每一個新據點都能在 3 天內複製開業。
          </p>
          <div className="eb-core-grid">
            {[
              { n: "40", s: "%", title: "人力成本降低", desc: "5 個半自助站點取代傳統 5 個工作崗位，2 人即可運作全店" },
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

          {/* 五大半自助站 */}
          <div style={{ marginBottom: "16px" }}>
            <div style={{ color: "rgba(255,255,255,.45)", fontSize: ".7rem", letterSpacing: ".12em", fontWeight: 700, textTransform: "uppercase", marginBottom: "20px" }}>
              五大半自助服務站
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
                以東方美作為半自助 AI 模組的 <strong>第一個驗證場域</strong>，
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
            <div className="eb-title">駁二旗艦 — <em>半自助 POC 示範店</em></div>
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

      {/* ⑤ 半自助設備陣列 */}
      <div ref={sDevices} className="eb-fade">
        <section className="eb-section" id="devices">
          <div className="eb-label">SEMI-AUTO DEVICES</div>
          <div className="eb-title">六大<em>半自助設備</em></div>
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

      {/* ⑥ 半自助蒸煮拉麵機 */}
      <div className="eb-ramen-wrap">
        <div ref={sRamen} className="eb-fade eb-ramen-inner">
          <div className="eb-label">SEMI-AUTO RAMEN</div>
          <div className="eb-title">半自助<em>蒸煮拉麵機</em></div>
          <div className="eb-rule" />
          <div className="eb-ramen-grid">
            <div>
              <p className="eb-lead" style={{ marginBottom: "24px" }}>
                員工只需將密封杯放入蒸煮艙，
                機器自動計時、加熱、完成後提醒取出。
                <strong>零廚藝門檻、出品穩定、複製容易</strong>——
                這就是半自助的精髓。
              </p>
              <div className="eb-ramen-steps">
                {[
                  { n: "1", strong: "選品擺入", span: "員工將密封杯（拉麵/港點多口味）放入蒸煮艙" },
                  { n: "2", strong: "一鍵啟動", span: "選擇品項，機器自動設定時間與溫度" },
                  { n: "3", strong: "全自動蒸煮", span: "倒計時完成，蜂鳴提醒取出，品質每次一致" },
                  { n: "4", strong: "裝盤出餐", span: "員工取出擺盤，放入智取冰櫃或直接送桌" },
                ].map((s, i) => (
                  <div key={i} className="eb-ramen-step">
                    <div className="eb-ramen-step-num">{s.n}</div>
                    <div className="eb-ramen-step-text"><strong>{s.strong}</strong><span>{s.span}</span></div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "20px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Image src="/images/eastbeauty/ramen_cups.jpg" alt="密封杯裝食材" width={200} height={150} style={{ borderRadius: "8px", border: "1px solid #e8e0d0", objectFit: "cover" }} />
                <Image src="/images/eastbeauty/ramen_bowl.jpg" alt="完成品" width={200} height={150} style={{ borderRadius: "8px", border: "1px solid #e8e0d0", objectFit: "cover" }} />
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
              <p style={{ fontSize: ".72rem", color: "#888", textAlign: "center", marginTop: "6px" }}>▲ 半自助蒸煮機實機操作示意</p>
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
          <div className="eb-locker-title">GraBox <em>智取冰櫃</em> — 我們的核心武器</div>
          <p className="eb-locker-sub">
            100% 台灣自主研發製造，不是外購、不是貼牌。
            GraBox 是半自助取餐站的關鍵設備——
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
              { icon: "❄️", title: "常溫智取艙", desc: "獨立恆溫 · LED 照明 · 食品安全" },
              { icon: "📱", title: "掃碼自動開艙", desc: "LINE / QR Code 零接觸取餐" },
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
              先以駁二旗艦驗證半自助模組，數據成熟後再複製——
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

      {/* ⑪ CTA */}
      <div className="eb-cta" id="cta">
        <div className="eb-cta-title">準備好見證 <em>東方美 2.0</em>？</div>
        <p className="eb-cta-sub">
          邀請您親臨駁二旗艦，體驗 2 人如何運作一間完整的科技餐廳。<br />
          半自助不是未來，是現在就能部署的商業模型。
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
