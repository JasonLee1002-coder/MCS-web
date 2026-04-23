/**
 * generate-backend-screenshots.mjs
 * Generates OmniCore backend UI screenshots matching the real MCS IVM system.
 * Run: node generate-backend-screenshots.mjs
 */

import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "public/images/intro");

// ─── Shared shell ─────────────────────────────────────────────────────────────
function shell(content, activeNav) {
  const navItems = [
    { icon: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M2 10a8 8 0 1116 0A8 8 0 012 10zm8-3a1 1 0 100 2 1 1 0 000-2zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"/></svg>`, label: "首頁", key: "home" },
    { icon: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H4a1 1 0 01-1-1z"/></svg>`, label: "數據分析", key: "analytics" },
    { icon: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"/></svg>`, label: "設備名單", key: "devices" },
    { icon: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"/></svg>`, label: "交易紀錄", key: "transactions" },
    { icon: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h3.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-2a4 4 0 00-4-4h-3V4a1 1 0 00-1-1H3z"/></svg>`, label: "運補管理", key: "restocking" },
    { icon: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/></svg>`, label: "Line Notify", key: "notify" },
    { icon: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/></svg>`, label: "店鋪名單", key: "stores" },
  ];
  return `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Microsoft JhengHei',sans-serif;background:#F5F6FA;display:flex;height:100vh;overflow:hidden;font-size:13px;color:#333}
/* Sidebar */
.sb{width:200px;background:#fff;border-right:1px solid #E8ECF0;display:flex;flex-direction:column;height:100vh;flex-shrink:0}
.sb-logo{padding:16px;border-bottom:1px solid #F0F2F5;display:flex;align-items:center;gap:9px}
.sb-mark{width:30px;height:30px;border-radius:7px;background:linear-gradient(135deg,#6C63FF,#8B5CF6);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.sb-mark svg{width:16px;height:16px;fill:white}
.sb-brand{font-size:13px;font-weight:700;color:#1A1D23;line-height:1.2}
.sb-sub{font-size:10px;color:#9CA3AF}
.sb-nav{flex:1;padding:10px 8px;overflow:auto}
.sb-sec{font-size:10px;font-weight:600;color:#9CA3AF;text-transform:uppercase;letter-spacing:.08em;padding:10px 10px 4px}
.ni{display:flex;align-items:center;gap:9px;padding:8px 10px;border-radius:7px;cursor:pointer;color:#6B7280;margin-bottom:1px;transition:all .15s}
.ni svg{width:15px;height:15px;flex-shrink:0}
.ni.active{background:#EEF2FF;color:#6C63FF;font-weight:600}
.ni:not(.active):hover{background:#F9FAFB}
.sb-foot{padding:12px;border-top:1px solid #F0F2F5}
.ua{display:flex;align-items:center;gap:8px}
.av{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#6C63FF,#8B5CF6);display:flex;align-items:center;justify-content:center;font-size:11px;color:#fff;font-weight:700;flex-shrink:0}
.un{font-size:12px;font-weight:600;color:#374151}
.ur{font-size:10px;color:#9CA3AF}
/* Main */
.main{flex:1;display:flex;flex-direction:column;overflow:hidden}
/* Topbar */
.tb{background:#fff;border-bottom:1px solid #E8ECF0;padding:0 20px;height:50px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0}
.tb-bc{display:flex;align-items:center;gap:6px;font-size:12px;color:#9CA3AF}
.tb-bc span{color:#374151;font-weight:600}
.tb-bc svg{width:12px;height:12px;fill:currentColor}
.tb-r{display:flex;align-items:center;gap:8px}
.tb-ico{width:30px;height:30px;border-radius:7px;background:#F5F6FA;border:1px solid #E8ECF0;display:flex;align-items:center;justify-content:center;cursor:pointer;position:relative}
.tb-ico svg{width:15px;height:15px;fill:#6B7280}
.tb-dot{position:absolute;top:5px;right:5px;width:6px;height:6px;background:#EF4444;border-radius:50%;border:1.5px solid #fff}
.tb-tag{font-size:11px;background:#EEF2FF;color:#6C63FF;padding:3px 10px;border-radius:20px;font-weight:600}
/* Content */
.cnt{flex:1;overflow:auto;padding:18px 20px}
/* Cards */
.sgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:16px}
.sc{background:#fff;border-radius:10px;padding:14px 16px;border:1px solid #E8ECF0}
.sl{font-size:11px;color:#9CA3AF;margin-bottom:5px;display:flex;align-items:center;gap:5px}
.sl svg{width:12px;height:12px;fill:#9CA3AF}
.sv{font-size:24px;font-weight:800;color:#1A1D23;line-height:1;margin-bottom:3px}
.sc2{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
.sa{font-size:11px;font-weight:600;display:flex;align-items:center;gap:4px}
.sa.up{color:#10B981} .sa.dn{color:#EF4444} .sa.nt{color:#9CA3AF}
/* Table card */
.card{background:#fff;border-radius:10px;border:1px solid #E8ECF0;overflow:hidden;margin-bottom:12px}
.ch{padding:12px 16px;border-bottom:1px solid #F5F6FA;display:flex;align-items:center;justify-content:space-between;gap:12px}
.ct{font-size:13px;font-weight:700;color:#1A1D23;display:flex;align-items:center;gap:8px}
.ct svg{width:15px;height:15px;fill:#6C63FF}
.cb{padding:14px 16px}
/* Table */
table{width:100%;border-collapse:collapse}
th{text-align:left;padding:7px 12px;font-size:11px;font-weight:600;color:#9CA3AF;text-transform:uppercase;letter-spacing:.05em;background:#FAFBFC;border-bottom:1px solid #E8ECF0;white-space:nowrap}
td{padding:9px 12px;border-bottom:1px solid #F5F6FA;color:#374151;font-size:12px;white-space:nowrap}
tr:last-child td{border-bottom:none}
tr:hover td{background:#FAFBFC}
/* Chips */
.chip{display:inline-flex;align-items:center;padding:2px 7px;border-radius:20px;font-size:10px;font-weight:600;white-space:nowrap}
.c-g{background:#DCFCE7;color:#15803D}
.c-r{background:#FEE2E2;color:#B91C1C}
.c-o{background:#FEF3C7;color:#B45309}
.c-b{background:#DBEAFE;color:#1D4ED8}
.c-p{background:#EDE9FE;color:#6D28D9}
.c-gr{background:#F3F4F6;color:#6B7280}
/* Tabs */
.tabs{display:flex;gap:0;border-bottom:1px solid #E8ECF0;margin-bottom:14px}
.tab{padding:8px 14px;font-size:12px;font-weight:500;color:#9CA3AF;cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px;white-space:nowrap}
.tab.active{color:#6C63FF;border-bottom-color:#6C63FF;font-weight:600}
/* Search/filter bar */
.fbar{display:flex;align-items:center;gap:8px;margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid #F5F6FA}
.finp{flex:1;max-width:220px;display:flex;align-items:center;gap:6px;background:#F5F6FA;border:1px solid #E8ECF0;border-radius:7px;padding:5px 10px;font-size:12px;color:#9CA3AF}
.finp svg{width:13px;height:13px;fill:currentColor;flex-shrink:0}
.fsel{font-size:12px;background:#F5F6FA;border:1px solid #E8ECF0;border-radius:7px;padding:5px 10px;color:#374151;flex-shrink:0}
.fbtn{font-size:11px;padding:5px 12px;border-radius:7px;border:none;cursor:pointer;display:flex;align-items:center;gap:5px;font-weight:600;flex-shrink:0}
.fbtn svg{width:12px;height:12px;fill:currentColor}
.fbtn-sec{background:#F5F6FA;color:#374151;border:1px solid #E8ECF0}
.fbtn-pri{background:#6C63FF;color:#fff}
/* Grid layouts */
.g2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.g3{display:grid;grid-template-columns:2fr 1fr;gap:12px}
/* Breadcrumb inline */
.bc{display:flex;align-items:center;gap:5px;font-size:11px;color:#9CA3AF;margin-bottom:12px}
.bc a{color:#6C63FF;font-weight:500}
.bc svg{width:10px;height:10px;fill:currentColor}
/* Chart area */
.chart-wrap{position:relative;overflow:hidden}
/* Toggle */
.toggle{width:36px;height:20px;border-radius:10px;background:#10B981;display:flex;align-items:center;padding:2px;cursor:pointer;flex-shrink:0}
.toggle-dot{width:16px;height:16px;border-radius:50%;background:#fff;margin-left:auto;box-shadow:0 1px 3px rgba(0,0,0,.2)}
/* Alert row */
.al{display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border-radius:8px;margin-bottom:6px;font-size:12px}
.al-w{background:#FFFBEB;border:1px solid #FDE68A;color:#92400E}
.al-e{background:#FEF2F2;border:1px solid #FECACA;color:#991B1B}
.al-g{background:#F0FDF4;border:1px solid #BBF7D0;color:#166534}
/* Scrollbar thin */
::-webkit-scrollbar{width:4px;height:4px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:#E2E8F0;border-radius:2px}
</style>
</head>
<body>
<aside class="sb">
  <div class="sb-logo">
    <div class="sb-mark"><svg viewBox="0 0 20 20" fill="white"><path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 11.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg></div>
    <div><div class="sb-brand">OmniCore</div><div class="sb-sub">銓幻元科技</div></div>
  </div>
  <nav class="sb-nav">
    <div class="sb-sec">主選單</div>
    ${navItems.map(n => `
    <div class="ni${n.key === activeNav ? " active" : ""}">
      <svg viewBox="0 0 20 20" fill="currentColor">${n.icon.match(/<svg[^>]*>(.*)<\/svg>/s)?.[1] ?? ""}</svg>
      ${n.label}
    </div>`).join("")}
    <div class="sb-sec" style="margin-top:10px">系統</div>
    <div class="ni"><svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"/></svg>系統設定</div>
  </nav>
  <div class="sb-foot">
    <div class="ua">
      <div class="av">J</div>
      <div><div class="un">Jason Lee</div><div class="ur">系統管理員</div></div>
    </div>
  </div>
</aside>
<div class="main">
  <div class="tb">
    <div class="tb-bc">
      <svg viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>
      首頁
      <svg viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/></svg>
      <span>${{ home:"首頁", analytics:"數據分析", devices:"設備名單", transactions:"交易紀錄", restocking:"運補管理", notify:"Line Notify", stores:"店鋪名單" }[activeNav] ?? activeNav}</span>
    </div>
    <div class="tb-r">
      <div class="tb-tag">eb-plus 東方美</div>
      <div class="tb-ico">
        <svg viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/></svg>
        <div class="tb-dot"></div>
      </div>
      <div class="tb-ico">
        <svg viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"/></svg>
      </div>
    </div>
  </div>
  <div class="cnt">${content}</div>
</div>
</body></html>`;
}

// ─── Screen Contents ───────────────────────────────────────────────────────────
const screens = [

  // 1. 首頁儀表板 (P.34)
  {
    key: "home",
    filename: "backend-device-monitor.jpg",
    content: `
    <div class="sgrid">
      <div class="sc">
        <div class="sl"><svg viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4z"/></svg> 銷售營業額</div>
        <div class="sv">$284,201</div>
        <div class="sa up">▲ 12.3% 較上月</div>
      </div>
      <div class="sc">
        <div class="sl"><svg viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5z"/></svg> 交易筆數</div>
        <div class="sv">3,276</div>
        <div class="sa up">▲ 8.7%</div>
      </div>
      <div class="sc">
        <div class="sl"><svg viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 14.094A5.973 5.973 0 004 17v1H1v-1a3 3 0 013.75-2.906z"/></svg> 來客數</div>
        <div class="sv">2,841</div>
        <div class="sa up">▲ 5.1%</div>
      </div>
      <div class="sc">
        <div class="sl"><svg viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg> 設備上線率</div>
        <div class="sv">98.7%</div>
        <div class="sa nt">312 / 316 台</div>
      </div>
    </div>
    <div class="g3">
      <div>
        <div class="card">
          <div class="ch">
            <div class="ct"><svg viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>商品銷售排行</div>
            <div style="display:flex;gap:6px;align-items:center;font-size:11px;color:#9CA3AF">
              <span>2024/08/01</span><span>—</span><span>2024/08/20</span>
              <button class="fbtn fbtn-sec" style="font-size:10px;padding:3px 8px"><svg viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"/></svg>匯出</button>
            </div>
          </div>
          <div class="cb" style="padding:0">
            <table>
              <thead><tr><th>排名</th><th>商品名稱</th><th>實補量</th><th>銷售量</th><th>點擊率</th></tr></thead>
              <tbody>
                ${[
                  ["1","日式溫泉風味湯","6","4","—"],
                  ["2","花雕風味溫泉湯","6","4","—"],
                  ["3","嶺春綜合滋味","6","2","—"],
                  ["4","蒜香超良風味Q丸","6","4","—"],
                  ["5","義式經典鹹豬腳","6","4","—"],
                  ["6","K I R I N生茶","1","1","—"],
                  ["7","石燒牛肉風味湯","6","2","—"],
                  ["8","銀座豚骨白湯","4","3","—"],
                ].map(([r,n,s,sl,c]) => `<tr>
                  <td style="color:#9CA3AF;font-size:11px">${r}</td>
                  <td style="font-weight:500">${n}</td>
                  <td style="text-align:center">${s}</td>
                  <td style="text-align:center;color:#6C63FF;font-weight:600">${sl}</td>
                  <td style="text-align:center;color:#9CA3AF">${c}</td>
                </tr>`).join("")}
              </tbody>
            </table>
          </div>
        </div>
        <div class="card">
          <div class="ch"><div class="ct">交易紀錄及統計</div><span style="font-size:11px;color:#9CA3AF">最近 30 天</span></div>
          <div class="cb">
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">
              ${[["交易筆數","3 / 276",""],["成功","98.2%","c-g"],["退款","0.8%","c-r"]].map(([l,v,c]) => `
              <div style="background:#F9FAFB;border-radius:8px;padding:10px;text-align:center">
                <div style="font-size:10px;color:#9CA3AF;margin-bottom:4px">${l}</div>
                <div class="${c} chip" style="font-size:14px;font-weight:800;display:block;padding:0;background:none;border-radius:0${c?";color:inherit":";"}">${v}</div>
              </div>`).join("")}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="card" style="margin-bottom:12px">
          <div class="ch"><div class="ct">設備即時狀態</div></div>
          <div class="cb" style="padding:10px 14px">
            ${[["正常上線","308 台","c-g"],["異常告警","4 台","c-r"],["低庫存","22 台","c-o"],["離線","4 台","c-gr"]].map(([l,v,c]) => `
            <div style="display:flex;align-items:center;justify-content:space-between;padding:7px 0;border-bottom:1px solid #F5F6FA">
              <span style="font-size:12px;color:#6B7280">${l}</span>
              <span class="chip ${c}">${v}</span>
            </div>`).join("")}
          </div>
        </div>
        <div class="card">
          <div class="ch"><div class="ct" style="font-size:12px">📱 LINE Notify 最新通報</div></div>
          <div class="cb" style="padding:10px 14px">
            ${[
              ["出貨異常","023400-TM4","c-r"],
              ["4件商品到期","018816-TM4","c-o"],
              ["低庫存警示","021113-TM5","c-o"],
              ["溫度恢復正常","015805-TM3","c-g"],
            ].map(([m,d,c]) => `
            <div class="al ${c==="c-r"?"al-e":c==="c-o"?"al-w":"al-g"}" style="padding:7px 10px;margin-bottom:4px">
              <div style="font-size:10px;font-weight:700">${m}</div>
              <div style="font-size:10px;color:#9CA3AF;margin-top:1px">${d}</div>
            </div>`).join("")}
          </div>
        </div>
      </div>
    </div>
  `,
  },

  // 2. 交易紀錄 (P.35)
  {
    key: "transactions",
    filename: "backend-sales-report.jpg",
    content: `
    <div class="card">
      <div class="ch">
        <div class="ct"><svg viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"/></svg>交易紀錄</div>
        <div style="display:flex;gap:8px;align-items:center">
          <button class="fbtn fbtn-sec"><svg viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"/></svg>匯出</button>
          <div class="tb-tag" style="background:#F0FDF4;color:#15803D">營業分析</div>
          <div class="tb-tag" style="background:#F5F3FF;color:#6D28D9">商品排行</div>
          <div class="tb-tag" style="background:#EEF2FF;color:#4338CA">交易紀錄</div>
        </div>
      </div>
      <div class="cb" style="padding:12px 16px">
        <div class="fbar">
          <div class="finp"><svg viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/></svg>搜尋...</div>
          <div class="fsel">2024/08/01</div>
          <span style="font-size:11px;color:#9CA3AF">—</span>
          <div class="fsel">2024/08/20</div>
          <div class="fsel">所有交易</div>
          <div class="fsel">所有店鋪</div>
        </div>
        <table>
          <thead>
            <tr><th></th><th>商品</th><th>發票碼</th><th>實付金額</th><th>支付方式</th><th>交易時間</th><th>🏪 店鋪</th><th>⚙ 設備</th><th>設備代碼</th><th>貨道</th></tr>
          </thead>
          <tbody>
            ${[
              ["☑","二配草莓餐包","$25","信用卡","2024-08-20 19:17:52","XXX店","(設備名稱)","023400-TM4","1C4"],
              ["☑","瘋狂超司三明治","$39","悠遊卡","2024-08-20 19:17:36","XXX直店","(設備名稱)","018816-TM4","0B5"],
              ["☑","桂林仔滷排便當","$99","Lin Pay","2024-08-20 19:17:24","XXX店","(設備名稱)","022079-TM6","0C2"],
              ["☑","排骨爵麵（小碗）","$23","信用卡","2024-08-20 19:17:13","XXX店","(設備名稱)","015805-TM3","1B1"],
              ["☑","A S A H I 十六茶","$29","悠遊卡","2024-08-20 19:17:01","XXX小店","(設備名稱)","014869-TM4","0E1"],
              ["☑","草莓炎節可可製品","$55","信用卡","2024-08-20 19:16:12","XXX_店","(設備名稱)","021113-TM5","1D6"],
              ["☑","統一陽光無糖高纖豆漿","$25","Lin Pay","2024-08-20 19:13:02","XXX店","(設備名稱)","023400-TM4","0F8"],
              ["☑","義式冷萃咖啡","$45","信用卡","2024-08-20 19:12:44","XXX店","(設備名稱)","018816-TM4","1A2"],
              ["☑","K I R I N 生茶","$42","悠遊卡","2024-08-20 19:11:30","XXX店","(設備名稱)","023400-TM4","0E1"],
            ].map(([cb,n,p,py,t,st,dv,dc,sl]) => `
            <tr>
              <td style="color:#9CA3AF">${cb}</td>
              <td style="display:flex;align-items:center;gap:6px"><span style="color:#10B981;font-size:14px">✓</span>${n}</td>
              <td style="color:#9CA3AF;font-size:11px">—</td>
              <td style="font-weight:600;color:#1A1D23">${p}</td>
              <td><span class="chip c-b" style="font-size:10px">${py}</span></td>
              <td style="font-size:11px;color:#6B7280">${t}</td>
              <td style="font-size:11px">${st}</td>
              <td style="font-size:11px;color:#9CA3AF">${dv}</td>
              <td style="font-size:11px;color:#6C63FF;font-weight:500">${dc}</td>
              <td style="font-size:11px;font-weight:600">${sl}</td>
            </tr>`).join("")}
          </tbody>
        </table>
        <div style="display:flex;align-items:center;justify-content:space-between;padding-top:12px;border-top:1px solid #F5F6FA;margin-top:4px">
          <span style="font-size:11px;color:#9CA3AF">顯示第 1 ~ 20 筆，共 3,276 筆</span>
          <div style="display:flex;gap:4px">
            ${["上一頁","1","2","3","...","163","下一頁"].map((p,i) => `<button class="fbtn ${i===1?"fbtn-pri":"fbtn-sec"}" style="padding:4px 9px;font-size:11px">${p}</button>`).join("")}
          </div>
        </div>
      </div>
    </div>
  `,
  },

  // 3. 設備狀態監控 (P.36)
  {
    key: "devices",
    filename: "backend-inventory.jpg",
    content: `
    <div class="g3">
      <div>
        <div class="card">
          <div class="ch"><div class="ct">設備狀態</div><div class="finp" style="max-width:140px;font-size:11px"><svg viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/></svg>尋找</div></div>
          <div class="cb" style="padding:0">
            <table>
              <thead><tr><th></th><th>設備代碼</th><th>名稱</th><th>區域</th><th>上次連線</th><th></th></tr></thead>
              <tbody>
                ${[
                  ["●","005989-TM7","XXX門市名稱","","1 分鐘前","🔔"],
                  ["●","011489-TM4","XXX門市名稱名稱","","剛剛","🔔"],
                  ["●","012784-TM5","XXX 名稱 名稱名稱","","剛剛","🔔"],
                  ["●","012848-TM5","名名 名稱","","剛剛","🔔"],
                  ["●","014117-TM4","XXX名稱名稱","","剛剛","🔔"],
                  ["●","014827-TM3","XXX名稱名稱","","剛剛","🔔"],
                  ["●","014998-TM3","XXX名稱名稱名","","剛剛","🔔"],
                  ["●","015100-TM3","XXX名稱名稱","","剛剛","🔔"],
                ].map(([s,id,nm,area,last,ico],i) => `
                <tr style="${i===0?"background:#F0FDF4":""}" >
                  <td style="color:${i===0?"#10B981":"#10B981"};font-size:16px">${s}</td>
                  <td style="font-size:11px;color:#6C63FF;font-weight:600">${id}</td>
                  <td style="font-size:11px;color:#374151">${nm}</td>
                  <td style="font-size:11px;color:#9CA3AF">${area}</td>
                  <td style="font-size:11px;color:#9CA3AF">${last}</td>
                  <td style="font-size:14px">${ico}</td>
                </tr>`).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:12px">
        <div class="card">
          <div class="ch" style="padding:10px 14px"><div class="ct" style="font-size:12px">005989-TM7 ▾</div><button class="fbtn fbtn-sec" style="font-size:10px;padding:3px 8px">清除貨道資料</button></div>
          <div style="padding:0 14px">
            <div class="tabs">
              ${["貨道/庫存","溫度","控制","設定","Line Notify","設備資訊"].map((t,i) => `<div class="tab${i===0?" active":""}">${t}</div>`).join("")}
            </div>
          </div>
          <div class="cb" style="padding:0">
            <table>
              <thead><tr><th>貨道</th><th>最大庫存/實補/銷售/庫存</th><th>商品</th><th>過期日</th><th>更新時間</th></tr></thead>
              <tbody>
                ${[
                  ["0A1","6/2/0/2","日式溫泉風味湯","2024-08-26","2024-08-20 19:00"],
                  ["0A3","6/2/0/2","花雕風味溫泉湯","2024-09-03","2024-08-20 19:00"],
                  ["0A5","6/2/0/2","嶺春綜合滋味","2024-08-30","2024-08-20 19:00"],
                  ["0A7","6/2/2/0","東山綜合滋味","2024-08-22","2024-08-20 19:00"],
                  ["0A9","6/2/0/2","蒜香超良風味Q丸","2024-09-01","2024-08-20 19:00"],
                  ["0B1","6/2/0/2","義式經典鹹豬腳","2024-09-11","2024-08-20 19:00"],
                ].map(([slot,qty,nm,exp,upd]) => `
                <tr>
                  <td style="font-weight:600;color:#6C63FF;font-size:12px">${slot}</td>
                  <td style="font-size:11px;color:#6B7280">${qty}</td>
                  <td style="font-size:11px">${nm}</td>
                  <td style="font-size:11px;color:#10B981">${exp}</td>
                  <td style="font-size:10px;color:#9CA3AF">${upd}:10</td>
                </tr>`).join("")}
              </tbody>
            </table>
          </div>
        </div>
        <div class="card">
          <div class="ch" style="padding:10px 14px"><div class="ct" style="font-size:12px">溫度監控</div></div>
          <div class="cb" style="padding:10px 14px">
            <div style="display:flex;gap:12px;margin-bottom:8px;font-size:11px">
              <span style="display:flex;align-items:center;gap:4px"><span style="width:20px;height:2px;background:#3B82F6;display:inline-block"></span>主機</span>
              <span style="display:flex;align-items:center;gap:4px"><span style="width:20px;height:2px;background:#10B981;display:inline-block"></span>副機</span>
            </div>
            <svg viewBox="0 0 400 120" style="width:100%;height:90px">
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3B82F6" stop-opacity=".15"/><stop offset="100%" stop-color="#3B82F6" stop-opacity="0"/></linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#10B981" stop-opacity=".15"/><stop offset="100%" stop-color="#10B981" stop-opacity="0"/></linearGradient>
              </defs>
              <!-- Grid lines -->
              ${[0,30,60,90].map(y=>`<line x1="0" y1="${y}" x2="400" y2="${y}" stroke="#F3F4F6" stroke-width="1"/>`).join("")}
              <!-- Labels -->
              <text x="2" y="8" font-size="8" fill="#9CA3AF">25°C</text>
              <text x="2" y="38" font-size="8" fill="#9CA3AF">20°C</text>
              <text x="2" y="68" font-size="8" fill="#9CA3AF">15°C</text>
              <text x="2" y="98" font-size="8" fill="#9CA3AF">9°C</text>
              <!-- Main line (blue) -->
              <polyline points="20,45 50,40 80,55 110,35 140,50 170,42 200,48 230,38 260,52 290,44 320,40 350,46 380,42" fill="none" stroke="#3B82F6" stroke-width="1.5" stroke-linejoin="round"/>
              <!-- Sub line (green) -->
              <polyline points="20,58 50,62 80,55 110,68 140,60 170,72 200,65 230,58 260,70 290,62 320,68 350,60 380,65" fill="none" stroke="#10B981" stroke-width="1.5" stroke-linejoin="round"/>
              <!-- Highlight point -->
              <circle cx="110" cy="35" r="4" fill="#3B82F6" stroke="#fff" stroke-width="1.5"/>
              <rect x="115" y="22" width="28" height="14" rx="3" fill="#3B82F6"/>
              <text x="129" y="32" font-size="8" fill="#fff" text-anchor="middle">21</text>
              <!-- X labels -->
              <text x="20" y="115" font-size="7" fill="#9CA3AF" text-anchor="middle">8/18</text>
              <text x="110" y="115" font-size="7" fill="#9CA3AF" text-anchor="middle">8/18 3:30</text>
              <text x="230" y="115" font-size="7" fill="#9CA3AF" text-anchor="middle">8/18 6:30</text>
              <text x="380" y="115" font-size="7" fill="#9CA3AF" text-anchor="middle">8/19</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  `,
  },

  // 4. LINE Notify 異常通報設定 (P.37)
  {
    key: "notify",
    filename: "backend-member.jpg",
    content: `
    <div class="g2">
      <div>
        <div class="card" style="margin-bottom:12px">
          <div class="ch"><div class="ct">LINE Notify 通報紀錄</div></div>
          <div class="cb" style="padding:10px 14px">
            ${[
              {type:"出貨異常",device:"023400-TM4",time:"上午 3:50",color:"#EF4444",icon:"🚨"},
              {type:"4件商品到期",device:"018816-TM4",time:"今天",color:"#F59E0B",icon:"⏰"},
              {type:"低庫存警示",device:"021113-TM5",time:"上午 8:12",color:"#F59E0B",icon:"⚠️"},
              {type:"心跳異常（離線）",device:"015805-TM3",time:"昨天",color:"#EF4444",icon:"❌"},
              {type:"溫度恢復正常",device:"014869-TM4",time:"昨天",color:"#10B981",icon:"✅"},
            ].map(({type,device,time,color,icon}) => `
            <div style="display:flex;align-items:flex-start;gap:10px;padding:10px;background:#F9FAFB;border-radius:8px;margin-bottom:6px;border-left:3px solid ${color}">
              <div style="width:30px;height:30px;border-radius:50%;background:#fff;border:1px solid #E8ECF0;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0">${icon}</div>
              <div style="flex:1">
                <div style="font-size:12px;font-weight:700;color:#1A1D23">${type}</div>
                <div style="font-size:10px;color:#9CA3AF;margin-top:2px">${device} · ${time}</div>
              </div>
              <a href="#" style="font-size:10px;color:#6C63FF;text-decoration:none">查看詳情</a>
            </div>`).join("")}
          </div>
        </div>
        <div class="card">
          <div class="ch"><div class="ct">LINE 聊天室模擬</div></div>
          <div class="cb" style="padding:12px;background:#F0F9FF">
            <div style="font-size:11px;color:#0369A1;font-weight:600;margin-bottom:8px">[通報群] LINE Notify (9+)</div>
            ${[
              {msg:"【IVM設備】\n🚨 出貨異常\nhttps://hotspot.transtep.com...",time:"上午 3:50",warn:true},
              {msg:"【IVM設備】\n⏰ 4件商品到期\nhttps://hotspot.transtep.com...",time:"今天",warn:false},
            ].map(({msg,time,warn}) => `
            <div style="display:flex;gap:8px;margin-bottom:8px">
              <div style="width:28px;height:28px;border-radius:50%;background:#06C755;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0">L</div>
              <div>
                <div style="font-size:10px;color:#9CA3AF;margin-bottom:3px">LINE Notify</div>
                <div style="background:#fff;border-radius:0 8px 8px 8px;padding:8px 10px;font-size:11px;line-height:1.5;white-space:pre-line;max-width:200px;box-shadow:0 1px 3px rgba(0,0,0,.08);border:1px solid ${warn?"#FECACA":"#FDE68A"}">${msg}</div>
                <div style="font-size:9px;color:#9CA3AF;margin-top:2px">${time}</div>
              </div>
            </div>`).join("")}
          </div>
        </div>
      </div>
      <div>
        <div class="card">
          <div class="ch"><div class="ct">警示設定</div><span style="font-size:11px;color:#9CA3AF">005989-TM7</span></div>
          <div style="padding:0 14px">
            <div class="tabs">
              ${["貨道/庫存","溫度","控制","設定","Line Notify","設備資訊"].map((t,i) => `<div class="tab${i===4?" active":""}">${t}</div>`).join("")}
            </div>
          </div>
          <div class="cb">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid #F5F6FA">
              <span style="font-size:13px;font-weight:600;color:#1A1D23">啟用警示</span>
              <div class="toggle"><div class="toggle-dot"></div></div>
            </div>
            ${[
              ["溫度警示","機台內部溫度超標時通知"],
              ["心跳警示","設備離線或心跳中斷時通知"],
              ["低庫存率","貨道庫存低於設定比例時通知"],
              ["空倉率","貨道完全清空時通知"],
              ["維運警示","設備需要維護保養時通知"],
            ].map(([title,desc]) => `
            <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid #F5F6FA">
              <div>
                <div style="font-size:12px;font-weight:600;color:#374151">${title}</div>
                <div style="font-size:10px;color:#9CA3AF;margin-top:2px">${desc}</div>
              </div>
              <svg viewBox="0 0 20 20" fill="#9CA3AF" style="width:14px;height:14px"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/></svg>
            </div>`).join("")}
          </div>
        </div>
      </div>
    </div>
  `,
  },

  // 5. 食安控管 (P.38)
  {
    key: "devices",
    filename: "backend-promo.jpg",
    content: `
    <div class="card">
      <div class="ch">
        <div class="ct">食安控管 — 貨道庫存</div>
        <div style="display:flex;gap:6px">
          <button class="fbtn fbtn-sec">清除貨道資料</button>
          <button class="fbtn fbtn-sec">🖨 列印貨道商品</button>
        </div>
      </div>
      <div style="padding:0 14px">
        <div class="bc">首頁 / 設備名單 / <a href="#">005989-TM7</a></div>
        <div class="tabs">
          ${["貨道/庫存","溫度","控制","設定","Line Notify","設備資訊"].map((t,i) => `<div class="tab${i===0?" active":""}">${t}</div>`).join("")}
        </div>
      </div>
      <div class="cb" style="padding:8px 14px">
        <div class="fbar" style="margin-bottom:8px;padding-bottom:8px">
          <div class="finp"><svg viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/></svg>尋找</div>
          <span style="font-size:11px;color:#9CA3AF;margin-left:auto">顯示第 1 ~ 78 筆，共 78 筆</span>
        </div>
        <table>
          <thead><tr><th>貨道 ↕</th><th>實補/銷售/庫存</th><th>商品</th><th style="min-width:100px">過期日 ↕</th><th>更新時間</th></tr></thead>
          <tbody>
            ${[
              ["0D3","1/0/1","石燒牛肉風味湯","2023-08-20",true,"2023-08-21 01:30:16"],
              ["0D4","1/0/1","銀座豚骨白湯","2023-08-20",true,"2023-08-21 01:30:16"],
              ["1C0","1/0/1","日式溫泉風味","2023-08-20",true,"2023-08-21 01:30:18"],
              ["1C1","1/0/1","抹茶拿鐵","2023-08-20",true,"2023-08-21 01:30:18"],
              ["1C2","1/0/1","美式咖啡無糖","2023-08-20",true,"2023-08-21 01:30:18"],
              ["1C4","1/0/1","蒜香超良風味Q丸","2023-08-20",true,"2023-08-21 01:30:18"],
              ["1C3","1/0/1","義式經典鹹豬腳","2023-08-21","","2023-08-21 01:30:18"],
              ["0C4","1/1/0","花雕風味溫泉湯","2023-08-24","","2023-08-21 01:30:16"],
              ["0A1","1/0/1","K I R I N 生茶","2023-09-05","","2023-08-21 01:30:10"],
              ["0A3","1/0/1","統一純喫茶烏龍","2023-09-08","","2023-08-21 01:30:10"],
              ["0A5","1/0/1","御茶園每朝健康","2023-09-10","","2023-08-21 01:30:12"],
            ].map(([slot,qty,nm,exp,expired,upd]) => `
            <tr${expired?" style='background:#FFF5F5'":""}>
              <td style="font-weight:700;color:#6C63FF">${slot}</td>
              <td style="font-size:11px;color:#6B7280">${qty}</td>
              <td style="font-size:12px">${nm}</td>
              <td>${expired
                ? `<span style="background:#EF4444;color:#fff;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:600">${exp}</span>`
                : `<span style="font-size:11px;color:#374151">${exp}</span>`
              }</td>
              <td style="font-size:10px;color:#9CA3AF">${upd}</td>
            </tr>`).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `,
  },

  // 6. 各式營運報表 (P.39) — daily 2000–4500 NT$ dummy data
  {
    key: "analytics",
    filename: "backend-maintenance.jpg",
    content: (() => {
      // 20 days of Aug 2024 daily revenue (NT$), range 2000–4500
      const daily = [2841,3205,2654,3842,4121,4380,2987,3124,3456,2765,3021,4203,4456,3102,3287,2934,3456,3087,4312,4098];
      const total = daily.reduce((a,b)=>a+b,0);           // 66,311
      const avg   = Math.round(total/daily.length);        // 3,315
      const txns  = daily.map(v=>Math.round(v/42));        // avg NT$42/txn
      const totalTxns = txns.reduce((a,b)=>a+b,0);        // ~1,579

      // chart dimensions
      const W=480, H=110, YMIN=1500, YMAX=4800;
      const toY = v => H - Math.round((v-YMIN)/(YMAX-YMIN)*H);
      const barW = Math.floor((W-10)/daily.length)-2;
      const xOf  = i => 5 + i*Math.floor((W-10)/daily.length);

      // SVG bars + line
      const bars = daily.map((v,i)=>`<rect x="${xOf(i)}" y="${toY(v)}" width="${barW}" height="${H-toY(v)}" fill="#6C63FF" rx="2" opacity="${0.55+((v-2000)/2500)*0.35}"/>`).join("");
      const linePts = daily.map((v,i)=>`${xOf(i)+barW/2},${toY(v)}`).join(" ");
      const xLabels = [0,4,9,14,19].map(i=>`<text x="${xOf(i)+barW/2}" y="${H+14}" font-size="7.5" fill="#9CA3AF" text-anchor="middle">8/${i+1}</text>`).join("");
      const yGrids  = [2000,2500,3000,3500,4000,4500].map(v=>{
        const y=toY(v);
        return `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="#F3F4F6" stroke-width="1"/>
                <text x="-4" y="${y+3}" font-size="7.5" fill="#9CA3AF" text-anchor="end">${(v/1000).toFixed(1)}K</text>`;
      }).join("");

      // product data (top 8, cumulative)
      const prods = [
        ["日式溫泉風味湯",412,0.72],["花雕風味溫泉湯",387,0.68],["嶺春綜合滋味",341,0.59],
        ["蒜香超良風味Q丸",298,0.52],["義式經典鹹豬腳",274,0.48],["K I R I N生茶",241,0.42],
        ["石燒牛肉風味湯",219,0.38],["銀座豚骨白湯",198,0.35],
      ];
      const maxSale=412;
      const prodBars=prods.map(([n,s],i)=>{
        const bw=Math.round(s/maxSale*160);
        return `<g>
          <text x="0" y="${14+i*20}" font-size="9" fill="#374151">${n}</text>
          <rect x="145" y="${3+i*20}" width="${bw}" height="11" fill="#6C63FF" rx="2" opacity="${0.5+s/maxSale*0.45}"/>
          <text x="${148+bw}" y="${14+i*20}" font-size="9" fill="#6C63FF" font-weight="600">${s}</text>
          <text x="320" y="${14+i*20}" font-size="9" fill="#10B981">${(prods[i][2]*100).toFixed(0)}%</text>
        </g>`;
      }).join("");

      return `
    <div class="g3">
      <div>
        <div class="card" style="margin-bottom:12px">
          <div class="ch">
            <div class="ct">營業分析 — 2024/08/01 ~ 2024/08/20</div>
            <div style="display:flex;gap:6px;align-items:center">
              <div class="tb-tag" style="background:#EEF2FF;color:#4338CA">營業分析</div>
              <div class="tb-tag" style="background:#F5F3FF;color:#6D28D9">商品排行</div>
              <div class="tb-tag" style="background:#F9FAFB;color:#6B7280">交易紀錄</div>
              <button class="fbtn fbtn-sec" style="font-size:10px;padding:3px 8px">匯出</button>
            </div>
          </div>
          <div class="cb" style="padding:10px 18px">
            <!-- KPI row -->
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:14px">
              ${[
                ["累計業績",`NT$${total.toLocaleString()}`,"▲ 18.2% vs 上月","#10B981"],
                ["累計筆數",totalTxns.toLocaleString(),"▲ 11.7%","#10B981"],
                ["日均業績",`NT$${avg.toLocaleString()}`,`▲ NT$${(avg-2841).toLocaleString()} vs 上月`,"#10B981"],
                ["客單價","NT$42","▲ NT$4","#10B981"],
              ].map(([l,v,c,cc])=>`
              <div style="background:#F9FAFB;border-radius:8px;padding:9px 10px;border:1px solid #E8ECF0">
                <div style="font-size:9px;color:#9CA3AF;margin-bottom:4px">${l}</div>
                <div style="font-size:14px;font-weight:800;color:#1A1D23;margin-bottom:2px">${v}</div>
                <div style="font-size:9px;font-weight:600;color:${cc}">${c}</div>
              </div>`).join("")}
            </div>
            <!-- Bar chart + line overlay -->
            <div style="display:flex;gap:12px;font-size:10px;margin-bottom:6px">
              <span style="display:flex;align-items:center;gap:4px"><span style="width:12px;height:10px;background:#6C63FF;display:inline-block;border-radius:2px;opacity:.75"></span>日銷售額（NT$）</span>
              <span style="display:flex;align-items:center;gap:4px"><span style="width:16px;height:2px;background:#F59E0B;display:inline-block"></span>趨勢線</span>
            </div>
            <svg viewBox="-28 0 ${W+32} ${H+24}" style="width:100%;height:${H+28}px;overflow:visible">
              ${yGrids}
              ${bars}
              <polyline points="${linePts}" fill="none" stroke="#F59E0B" stroke-width="1.8" stroke-linejoin="round"/>
              <!-- Highlight max bar -->
              <rect x="${xOf(12)}" y="${toY(4456)-2}" width="${barW+4}" height="${H-toY(4456)+2}" fill="none" stroke="#E8751A" stroke-width="1.5" rx="2"/>
              <text x="${xOf(12)+barW/2}" y="${toY(4456)-5}" font-size="8" fill="#E8751A" text-anchor="middle" font-weight="700">最高 4,456</text>
              ${xLabels}
            </svg>
          </div>
        </div>
        <div class="card">
          <div class="ch"><div class="ct">商品銷售排行（累計）</div><span style="font-size:10px;color:#9CA3AF">2024/08 共 ${totalTxns} 筆</span></div>
          <div class="cb" style="padding:10px 14px">
            <div style="display:flex;gap:16px;font-size:9px;color:#9CA3AF;margin-bottom:6px;padding-left:145px">
              <span>← 銷售量（件）</span>
              <span style="margin-left:130px">點擊率</span>
            </div>
            <svg viewBox="0 0 340 ${prods.length*20+4}" style="width:100%;height:${prods.length*20+8}px">
              ${prodBars}
            </svg>
          </div>
        </div>
      </div>
      <div>
        <div class="card">
          <div class="ch"><div class="ct">數據分析</div></div>
          <div class="cb" style="padding:8px 0">
            ${[
              ["機台即時狀態表",""],
              ["店鋪別銷售彙整表",""],
              ["產品別銷售彙整表",""],
              ["場域類別銷售彙整表",""],
              ["交易工具別銷售彙整表",""],
              ["機台每日銷售時段分析表",""],
              ["機台每日庫存變動表",""],
              ["機台別巡補時效彙整表",""],
              ["營業分析","active"],
              ["商品排行",""],
            ].map(([n,a]) => `
            <div style="display:flex;align-items:center;gap:8px;padding:8px 14px;cursor:pointer;background:${a?"#EEF2FF":"transparent"};border-left:2px solid ${a?"#6C63FF":"transparent"}">
              <svg viewBox="0 0 20 20" fill="${a?"#6C63FF":"#9CA3AF"}" style="width:13px;height:13px;flex-shrink:0"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>
              <span style="font-size:11px;color:${a?"#4338CA":"#374151"};font-weight:${a?"600":"400"}">${n}</span>
            </div>`).join("")}
          </div>
        </div>
      </div>
    </div>
  `})(),
  },

  // 7. 運補相關表單 (P.40)
  {
    key: "restocking",
    filename: "backend-tenant.jpg",
    content: `
    <div class="g3">
      <div>
        <div class="card">
          <div class="ch">
            <div class="ct">店鋪詳細內容</div>
            <div style="display:flex;gap:6px">
              <button class="fbtn fbtn-sec">補貨</button>
              <button class="fbtn fbtn-sec">稽核</button>
              <button class="fbtn fbtn-pri">建立設備</button>
            </div>
          </div>
          <div style="padding:0 14px">
            <div class="bc">首頁 / 店鋪名單 / <a href="#">XXX 門市</a></div>
            <div class="tabs">
              ${["管理設備","相關資料"].map((t,i) => `<div class="tab${i===0?" active":""}">${t}</div>`).join("")}
            </div>
          </div>
          <div class="cb" style="padding:0">
            <div class="fbar" style="padding:8px 14px;margin-bottom:0">
              <div class="finp"><svg viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/></svg>尋找</div>
              <span style="font-size:11px;color:#9CA3AF;margin-left:auto">每頁 10 ▾</span>
            </div>
            <table>
              <thead><tr><th></th><th>設備代碼</th><th>場域</th><th>名稱</th><th>型號</th><th>啟用</th><th>建立時間</th></tr></thead>
              <tbody>
                ${[
                  ["023400-TM4","XXX門市","XXX-TM4","TM4","2024-04-26"],
                  ["023400-TM5","XXX門市","XXX-TM5","TM5","2024-04-26"],
                  ["023400-TM6","XXX門市","XXX-TM6","TM6","2024-04-26"],
                  ["023400-TM8","XXX門市","XXX-TM8","TM8","2024-04-29"],
                  ["023400-TM9","XXX門市","XXX-TM9","TM9","2024-06-24"],
                  ["023400-TM11","XXX門市","XXX-TM11","TM11","2024-09-13"],
                  ["023400-TM12","XXX門市","XXX-TM12","TM12","2024-09-29"],
                  ["023400-TM13","XXX門市","XXX-TM13","TM13","2024-09-29"],
                ].map(([id,area,nm,model,date]) => `
                <tr>
                  <td><div style="width:8px;height:8px;border-radius:50%;background:#10B981"></div></td>
                  <td style="font-size:11px;color:#6C63FF;font-weight:600">${id}</td>
                  <td style="font-size:11px;color:#9CA3AF">${area}</td>
                  <td style="font-size:11px">${nm}</td>
                  <td style="font-size:11px;color:#6B7280">${model}</td>
                  <td><span style="color:#10B981;font-size:16px">✓</span></td>
                  <td style="font-size:11px;color:#9CA3AF">${date}</td>
                </tr>`).join("")}
              </tbody>
            </table>
            <div style="padding:8px 14px;border-top:1px solid #F5F6FA;font-size:11px;color:#9CA3AF">顯示第 1 ~ 8 筆，共 8 筆</div>
          </div>
        </div>
      </div>
      <div>
        <div class="card">
          <div class="ch">
            <div class="ct">實補歷史</div>
            <div style="font-size:18px;font-weight:800;color:#1A1D23">1,084 <span style="font-size:11px;font-weight:400;color:#9CA3AF">實補數</span></div>
          </div>
          <div style="padding:0 14px">
            <div class="bc">首頁 / 實補歷史</div>
          </div>
          <div class="cb" style="padding:8px 14px">
            <div class="fbar" style="padding:0;margin-bottom:10px;padding-bottom:10px">
              <div class="fsel">2024年08月</div>
              <div class="fsel" style="max-width:180px;font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">023400-TM7</div>
              <span style="font-size:11px;color:#9CA3AF;margin-left:auto">每頁 10 ▾</span>
            </div>
            <table>
              <thead><tr><th>⚙ 設備</th><th>實補數</th><th>貨道數</th><th>補貨時間</th><th>開門時間</th></tr></thead>
              <tbody>
                ${[
                  ["XXX門市-TM7","54","32","7 分鐘","2024-08-01 08:20:28"],
                  ["XXX門市-TM7","51","30","12 分鐘","2024-08-02 08:11:54"],
                  ["XXX門市-TM7","41","19","13 分鐘","2024-08-03 08:48:01"],
                  ["XXX門市-TM7","86","44","12 分鐘","2024-08-05 07:43:23"],
                  ["XXX門市-TM7","92","45","15 分鐘","2024-08-06 08:31:27"],
                  ["XXX門市-TM7","67","32","12 分鐘","2024-08-07 08:37:37"],
                  ["XXX門市-TM7","42","24","11 分鐘","2024-08-08 08:43:49"],
                ].map(([d,r,s,t,dt]) => `
                <tr>
                  <td style="font-size:11px;color:#374151">${d}</td>
                  <td style="font-weight:700;color:#6C63FF;text-align:center">${r}</td>
                  <td style="text-align:center;color:#6B7280">${s}</td>
                  <td style="color:#6B7280">${t}</td>
                  <td style="font-size:10px;color:#9CA3AF">${dt}</td>
                </tr>`).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  },
];

// ─── Main ──────────────────────────────────────────────────────────────────────
const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 2 },
});

console.log("OmniCore Backend Screenshot Generator (PDF-matched)");
console.log("====================================================");

for (const screen of screens) {
  const html = shell(screen.content, screen.key);
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  const outPath = path.join(OUT_DIR, screen.filename);
  await page.screenshot({ path: outPath, type: "jpeg", quality: 92, fullPage: false });
  await page.close();
  console.log(`✓ ${screen.filename}`);
}

await browser.close();
console.log("\n✅ 完成！7 張截圖已對齊 PDF 實際功能。");
