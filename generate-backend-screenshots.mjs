/**
 * generate-backend-screenshots.mjs
 * Generates 7 OmniCore backend UI mock screenshots using Puppeteer.
 * Run: node generate-backend-screenshots.mjs
 */

import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "public/images/intro");

// ─── Shared Design Tokens ─────────────────────────────────────────────────────
const BRAND = "#E8751A";
const DARK = "#0F172A";
const SIDEBAR_BG = "#1E293B";
const WHITE = "#FFFFFF";

// ─── Shared HTML shell ────────────────────────────────────────────────────────
function shell(title, mainHtml, activeNav) {
  const navItems = [
    { icon: "📡", label: "設備監控", key: "monitor" },
    { icon: "📊", label: "銷售報表", key: "sales" },
    { icon: "📦", label: "庫存補貨", key: "inventory" },
    { icon: "👤", label: "會員點數", key: "member" },
    { icon: "🎯", label: "促銷活動", key: "promo" },
    { icon: "🔧", label: "報修工單", key: "maintenance" },
    { icon: "🏢", label: "租戶管理", key: "tenant" },
  ];
  return `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>OmniCore — ${title}</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #F1F5F9; display: flex; height: 100vh; overflow: hidden; }
  /* Sidebar */
  .sidebar {
    width: 220px; background: ${SIDEBAR_BG}; color: #CBD5E1;
    display: flex; flex-direction: column; flex-shrink: 0; height: 100vh;
  }
  .sidebar-logo {
    padding: 20px 20px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    display: flex; align-items: center; gap: 10px;
  }
  .logo-mark {
    width: 32px; height: 32px; border-radius: 8px;
    background: linear-gradient(135deg, ${BRAND}, #F59E0B);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; font-weight: 900; color: white; letter-spacing: -1px;
  }
  .logo-text { font-size: 14px; font-weight: 700; color: white; line-height: 1.2; }
  .logo-sub { font-size: 10px; color: #64748B; }
  .sidebar-nav { flex: 1; padding: 12px 8px; overflow: auto; }
  .nav-section-label { font-size: 10px; font-weight: 600; color: #475569; text-transform: uppercase; letter-spacing: 0.08em; padding: 8px 12px 4px; }
  .nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 12px; border-radius: 8px; cursor: pointer;
    font-size: 13px; color: #94A3B8; margin-bottom: 2px;
    transition: all 0.15s;
  }
  .nav-item.active { background: rgba(232,117,26,0.15); color: ${BRAND}; font-weight: 600; }
  .nav-item:not(.active):hover { background: rgba(255,255,255,0.05); color: #CBD5E1; }
  .nav-icon { font-size: 15px; width: 20px; text-align: center; }
  .sidebar-footer { padding: 12px 16px; border-top: 1px solid rgba(255,255,255,0.08); }
  .user-row { display: flex; align-items: center; gap: 8px; }
  .user-avatar { width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg, ${BRAND}, #F59E0B); display: flex; align-items: center; justify-content: center; font-size: 12px; color: white; font-weight: 700; }
  .user-name { font-size: 12px; color: #CBD5E1; font-weight: 600; }
  .user-role { font-size: 10px; color: #64748B; }
  /* Main */
  .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
  /* Topbar */
  .topbar {
    background: white; border-bottom: 1px solid #E2E8F0;
    padding: 0 24px; height: 56px;
    display: flex; align-items: center; justify-content: space-between; flex-shrink: 0;
  }
  .topbar-title { font-size: 16px; font-weight: 700; color: ${DARK}; }
  .topbar-right { display: flex; align-items: center; gap: 12px; }
  .topbar-badge { font-size: 11px; background: #FEF3C7; color: #92400E; padding: 3px 10px; border-radius: 20px; font-weight: 600; }
  .topbar-btn { width: 34px; height: 34px; border-radius: 8px; background: #F8FAFC; border: 1px solid #E2E8F0; display: flex; align-items: center; justify-content: center; font-size: 15px; cursor: pointer; }
  .topbar-notif { position: relative; }
  .notif-dot { position: absolute; top: 6px; right: 6px; width: 7px; height: 7px; background: #EF4444; border-radius: 50%; border: 1.5px solid white; }
  /* Content */
  .content { flex: 1; overflow: auto; padding: 20px 24px; }
  /* Cards */
  .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 20px; }
  .stat-card { background: white; border-radius: 12px; padding: 16px; border: 1px solid #E2E8F0; }
  .stat-label { font-size: 11px; color: #64748B; font-weight: 500; margin-bottom: 6px; }
  .stat-value { font-size: 26px; font-weight: 800; color: ${DARK}; line-height: 1; margin-bottom: 4px; }
  .stat-change { font-size: 11px; color: #10B981; font-weight: 600; }
  .stat-change.down { color: #EF4444; }
  .card { background: white; border-radius: 12px; border: 1px solid #E2E8F0; overflow: hidden; }
  .card-header { padding: 14px 18px; border-bottom: 1px solid #F1F5F9; display: flex; align-items: center; justify-content: space-between; }
  .card-title { font-size: 13px; font-weight: 700; color: ${DARK}; }
  .card-body { padding: 14px 18px; }
  /* Table */
  table { width: 100%; border-collapse: collapse; font-size: 12px; }
  th { text-align: left; padding: 8px 12px; font-size: 11px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.05em; background: #F8FAFC; border-bottom: 1px solid #E2E8F0; }
  td { padding: 10px 12px; border-bottom: 1px solid #F1F5F9; color: #374151; }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: #F8FAFC; }
  /* Status chips */
  .chip { display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 20px; font-size: 10px; font-weight: 600; }
  .chip.green { background: #DCFCE7; color: #166534; }
  .chip.red { background: #FEE2E2; color: #991B1B; }
  .chip.orange { background: #FEF3C7; color: #92400E; }
  .chip.blue { background: #DBEAFE; color: #1E40AF; }
  .chip.gray { background: #F1F5F9; color: #475569; }
  /* Bar chart */
  .bar-chart { display: flex; align-items: flex-end; gap: 8px; height: 140px; padding: 0 4px; }
  .bar-group { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
  .bar { width: 100%; border-radius: 4px 4px 0 0; min-height: 4px; }
  .bar-label { font-size: 10px; color: #64748B; }
  /* Progress */
  .progress-row { margin-bottom: 10px; }
  .progress-meta { display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 12px; }
  .progress-name { color: #374151; font-weight: 500; }
  .progress-val { color: ${DARK}; font-weight: 700; }
  .progress-bar-bg { height: 6px; background: #F1F5F9; border-radius: 3px; overflow: hidden; }
  .progress-bar-fill { height: 100%; border-radius: 3px; }
  /* Map-like */
  .map-placeholder { background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%); border-radius: 8px; height: 160px; display: flex; align-items: center; justify-content: center; color: #3B82F6; font-size: 13px; font-weight: 600; position: relative; overflow: hidden; }
  .map-dot { position: absolute; width: 10px; height: 10px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 0 3px rgba(232,117,26,0.3); }
  /* Grid layouts */
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .three-col { display: grid; grid-template-columns: 2fr 1fr; gap: 14px; }
  .alert-row { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 8px; margin-bottom: 6px; font-size: 12px; }
  .alert-row.warn { background: #FEF3C7; color: #92400E; }
  .alert-row.err { background: #FEE2E2; color: #991B1B; }
  .alert-row.ok { background: #DCFCE7; color: #166534; }
  .timeline-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
</style>
</head>
<body>
<!-- Sidebar -->
<aside class="sidebar">
  <div class="sidebar-logo">
    <div class="logo-mark">MC</div>
    <div>
      <div class="logo-text">OmniCore</div>
      <div class="logo-sub">銓幻元科技</div>
    </div>
  </div>
  <nav class="sidebar-nav">
    <div class="nav-section-label">主要功能</div>
    ${navItems.map(n => `
    <div class="nav-item${n.key === activeNav ? " active" : ""}">
      <span class="nav-icon">${n.icon}</span>${n.label}
    </div>`).join("")}
    <div class="nav-section-label" style="margin-top:12px">系統</div>
    <div class="nav-item"><span class="nav-icon">⚙️</span>系統設定</div>
    <div class="nav-item"><span class="nav-icon">📋</span>稽核日誌</div>
  </nav>
  <div class="sidebar-footer">
    <div class="user-row">
      <div class="user-avatar">J</div>
      <div>
        <div class="user-name">Jason Lee</div>
        <div class="user-role">系統管理員</div>
      </div>
    </div>
  </div>
</aside>
<!-- Main -->
<div class="main">
  <div class="topbar">
    <div class="topbar-title">${title}</div>
    <div class="topbar-right">
      <div class="topbar-badge">eb-plus 東方美</div>
      <div class="topbar-btn topbar-notif">🔔<div class="notif-dot"></div></div>
      <div class="topbar-btn">🌐</div>
    </div>
  </div>
  <div class="content">${mainHtml}</div>
</div>
</body>
</html>`;
}

// ─── Screen Definitions ───────────────────────────────────────────────────────

const screens = [

  // 1. Device Monitor
  {
    key: "monitor",
    filename: "backend-device-monitor.jpg",
    title: "設備即時監控",
    html: () => `
      <div class="stat-grid">
        <div class="stat-card"><div class="stat-label">上線設備</div><div class="stat-value">312</div><div class="stat-change">▲ 3 今日新增</div></div>
        <div class="stat-card"><div class="stat-label">異常設備</div><div class="stat-value" style="color:#EF4444">7</div><div class="stat-change down">▼ 需要處理</div></div>
        <div class="stat-card"><div class="stat-label">今日交易筆數</div><div class="stat-value">4,821</div><div class="stat-change">▲ 12.3%</div></div>
        <div class="stat-card"><div class="stat-label">平均溫度（冷凍）</div><div class="stat-value">-19.2°</div><div class="stat-change">✓ 正常</div></div>
      </div>
      <div class="three-col">
        <div class="card">
          <div class="card-header"><span class="card-title">設備狀態列表</span><span style="font-size:11px;color:#64748B">最後更新：14:32:01</span></div>
          <div class="card-body" style="padding:0">
            <table>
              <thead><tr><th>設備 ID</th><th>門市</th><th>類型</th><th>狀態</th><th>溫度</th><th>庫存</th></tr></thead>
              <tbody>
                <tr><td>GRB-001</td><td>東方美 信義</td><td>GraBox</td><td><span class="chip green">正常</span></td><td>—</td><td>82%</td></tr>
                <tr><td>GRB-002</td><td>東方美 南港</td><td>GraBox</td><td><span class="chip green">正常</span></td><td>—</td><td>67%</td></tr>
                <tr><td>VND-031</td><td>台積電 園區</td><td>常溫販賣</td><td><span class="chip orange">低庫存</span></td><td>22.1°</td><td>18%</td></tr>
                <tr><td>FRZ-012</td><td>翔耀 宿舍A</td><td>冷凍販賣</td><td><span class="chip green">正常</span></td><td>-19.5°</td><td>55%</td></tr>
                <tr><td>FRZ-013</td><td>翔耀 宿舍B</td><td>冷凍販賣</td><td><span class="chip red">溫控異常</span></td><td>-12.1°</td><td>61%</td></tr>
                <tr><td>MWV-005</td><td>首都高速 東京</td><td>冷凍微波</td><td><span class="chip green">正常</span></td><td>-18.8°</td><td>44%</td></tr>
                <tr><td>KSK-008</td><td>麥味登 板橋</td><td>自助點餐</td><td><span class="chip green">正常</span></td><td>—</td><td>—</td></tr>
                <tr><td>GRB-018</td><td>東方美 三重</td><td>GraBox</td><td><span class="chip red">離線</span></td><td>—</td><td>—</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:14px">
          <div class="card">
            <div class="card-header"><span class="card-title">警報通知</span></div>
            <div class="card-body" style="padding:10px 14px">
              <div class="alert-row err">🚨 FRZ-013 溫控異常 -12.1°C（應 &lt; -18°C）</div>
              <div class="alert-row err">🚨 GRB-018 設備離線 3h 27m</div>
              <div class="alert-row warn">⚠️ VND-031 庫存低於 20%</div>
              <div class="alert-row warn">⚠️ VND-044 庫存低於 20%</div>
              <div class="alert-row ok">✓ MWV-005 溫度恢復正常</div>
            </div>
          </div>
          <div class="card">
            <div class="card-header"><span class="card-title">設備分佈</span></div>
            <div class="card-body">
              <div class="map-placeholder">
                🗺 設備地圖（台灣 + 日本）
                <div class="map-dot" style="top:35%;left:55%;background:#E8751A"></div>
                <div class="map-dot" style="top:45%;left:52%;background:#E8751A"></div>
                <div class="map-dot" style="top:40%;left:58%;background:#3B82F6"></div>
                <div class="map-dot" style="top:30%;left:60%;background:#10B981"></div>
                <div class="map-dot" style="top:50%;left:49%;background:#E8751A"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  },

  // 2. Sales Report
  {
    key: "sales",
    filename: "backend-sales-report.jpg",
    title: "銷售報表分析",
    html: () => `
      <div class="stat-grid">
        <div class="stat-card"><div class="stat-label">本月營收</div><div class="stat-value">NT$ 2.4M</div><div class="stat-change">▲ 18.2% vs 上月</div></div>
        <div class="stat-card"><div class="stat-label">本月訂單數</div><div class="stat-value">38,241</div><div class="stat-change">▲ 9.7%</div></div>
        <div class="stat-card"><div class="stat-label">客單價</div><div class="stat-value">NT$ 62</div><div class="stat-change">▲ NT$4</div></div>
        <div class="stat-card"><div class="stat-label">設備坪效</div><div class="stat-value">NT$ 7.7K</div><div class="stat-change">▲ 22% YoY</div></div>
      </div>
      <div class="two-col" style="margin-bottom:14px">
        <div class="card">
          <div class="card-header"><span class="card-title">日銷售趨勢（近 14 天）</span></div>
          <div class="card-body">
            <div class="bar-chart">
              ${[62,71,58,80,95,88,73,92,105,98,87,112,118,124].map((v,i) => `
              <div class="bar-group">
                <div class="bar" style="height:${v}%;background:linear-gradient(to top,${BRAND},#F59E0B);opacity:${i===13?1:0.7}"></div>
                <div class="bar-label">${i+11}/4</div>
              </div>`).join("")}
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><span class="card-title">品項銷售排行（本月 Top 8）</span></div>
          <div class="card-body">
            ${[
              ["美式咖啡","2,841","#E8751A"],
              ["拿鐵","2,312","#F59E0B"],
              ["蛋餅","1,987","#3B82F6"],
              ["三明治","1,654","#10B981"],
              ["豆漿","1,421","#8B5CF6"],
              ["可頌","1,203","#06B6D4"],
              ["紅茶","998","#6B7280"],
              ["礦泉水","887","#6B7280"],
            ].map(([n,v,c],i) => `
            <div class="progress-row">
              <div class="progress-meta"><span class="progress-name">${i+1}. ${n}</span><span class="progress-val">${v} 件</span></div>
              <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${100-i*10}%;background:${c}"></div></div>
            </div>`).join("")}
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">門市銷售排行</span><span style="font-size:11px;color:#64748B">2026 年 4 月</span></div>
        <div class="card-body" style="padding:0">
          <table>
            <thead><tr><th>排名</th><th>門市名稱</th><th>設備</th><th>訂單數</th><th>營收</th><th>客單價</th><th>vs 上月</th></tr></thead>
            <tbody>
              <tr><td>🥇 1</td><td>東方美 信義旗艦</td><td>GraBox × 2</td><td>4,821</td><td>NT$ 298K</td><td>NT$ 62</td><td><span class="chip green">+24%</span></td></tr>
              <tr><td>🥈 2</td><td>台積電 南科園區</td><td>常溫販賣 × 3</td><td>3,912</td><td>NT$ 241K</td><td>NT$ 62</td><td><span class="chip green">+18%</span></td></tr>
              <tr><td>🥉 3</td><td>東方美 南港</td><td>GraBox × 1</td><td>3,201</td><td>NT$ 198K</td><td>NT$ 62</td><td><span class="chip green">+11%</span></td></tr>
              <tr><td>4</td><td>翔耀 宿舍 A 棟</td><td>冷凍 × 2</td><td>2,887</td><td>NT$ 178K</td><td>NT$ 62</td><td><span class="chip orange">+3%</span></td></tr>
              <tr><td>5</td><td>Garmin 總部</td><td>常溫 × 2</td><td>2,541</td><td>NT$ 157K</td><td>NT$ 62</td><td><span class="chip green">+8%</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `,
  },

  // 3. Inventory
  {
    key: "inventory",
    filename: "backend-inventory.jpg",
    title: "庫存 / 補貨管理",
    html: () => `
      <div class="stat-grid">
        <div class="stat-card"><div class="stat-label">需補貨設備</div><div class="stat-value" style="color:#EF4444">12</div><div class="stat-change down">低庫存警報</div></div>
        <div class="stat-card"><div class="stat-label">本週補貨任務</div><div class="stat-value">48</div><div class="stat-change">31 已完成</div></div>
        <div class="stat-card"><div class="stat-label">AI 預測補貨準確率</div><div class="stat-value">94.2%</div><div class="stat-change">▲ 2.1%</div></div>
        <div class="stat-card"><div class="stat-label">平均補貨週期</div><div class="stat-value">2.4天</div><div class="stat-change">▼ 0.3天 優化</div></div>
      </div>
      <div class="three-col">
        <div class="card">
          <div class="card-header"><span class="card-title">庫存明細 — 需補貨</span><button style="font-size:11px;background:${BRAND};color:white;border:none;padding:4px 12px;border-radius:6px;cursor:pointer">📋 匯出補貨單</button></div>
          <div class="card-body" style="padding:0">
            <table>
              <thead><tr><th>設備</th><th>品項</th><th>現況</th><th>容量</th><th>補貨量</th><th>狀態</th></tr></thead>
              <tbody>
                <tr><td>VND-031</td><td>美式咖啡膠囊</td><td>4</td><td>60</td><td>+56</td><td><span class="chip red">緊急</span></td></tr>
                <tr><td>VND-031</td><td>拿鐵膠囊</td><td>6</td><td>60</td><td>+54</td><td><span class="chip red">緊急</span></td></tr>
                <tr><td>FRZ-012</td><td>雞腿便當</td><td>8</td><td>30</td><td>+22</td><td><span class="chip orange">建議</span></td></tr>
                <tr><td>FRZ-012</td><td>炒飯</td><td>11</td><td>30</td><td>+19</td><td><span class="chip orange">建議</span></td></tr>
                <tr><td>GRB-008</td><td>三明治</td><td>3</td><td>20</td><td>+17</td><td><span class="chip red">緊急</span></td></tr>
                <tr><td>VND-044</td><td>礦泉水</td><td>5</td><td>48</td><td>+43</td><td><span class="chip red">緊急</span></td></tr>
                <tr><td>VND-044</td><td>可樂 330ml</td><td>9</td><td>36</td><td>+27</td><td><span class="chip orange">建議</span></td></tr>
                <tr><td>KSK-008</td><td>收據紙</td><td>12%</td><td>—</td><td>—</td><td><span class="chip orange">建議</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:14px">
          <div class="card">
            <div class="card-header"><span class="card-title">AI 補貨預測（明日）</span></div>
            <div class="card-body">
              <div style="font-size:12px;color:#64748B;margin-bottom:10px">基於過去 30 天銷售模式分析</div>
              ${[
                ["美式咖啡膠囊","高需求","預計消耗 82%","#EF4444"],
                ["拿鐵膠囊","高需求","預計消耗 74%","#EF4444"],
                ["礦泉水","中需求","預計消耗 51%","#F59E0B"],
                ["雞腿便當","中需求","預計消耗 48%","#F59E0B"],
                ["三明治","低需求","預計消耗 32%","#10B981"],
              ].map(([n,l,d,c]) => `
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;padding:8px;background:#F8FAFC;border-radius:8px">
                <div style="width:8px;height:8px;border-radius:50%;background:${c};flex-shrink:0"></div>
                <div style="flex:1">
                  <div style="font-size:12px;font-weight:600;color:#1E293B">${n}</div>
                  <div style="font-size:10px;color:#64748B">${d}</div>
                </div>
                <span class="chip ${c==="#EF4444"?"red":c==="#F59E0B"?"orange":"green"}">${l}</span>
              </div>`).join("")}
            </div>
          </div>
        </div>
      </div>
    `,
  },

  // 4. Member
  {
    key: "member",
    filename: "backend-member.jpg",
    title: "會員 & 點數後台",
    html: () => `
      <div class="stat-grid">
        <div class="stat-card"><div class="stat-label">總會員數</div><div class="stat-value">184,320</div><div class="stat-change">▲ 2,841 本月</div></div>
        <div class="stat-card"><div class="stat-label">活躍會員（30天）</div><div class="stat-value">62,181</div><div class="stat-change">33.7% 活躍率</div></div>
        <div class="stat-card"><div class="stat-label">點數流通量（本月）</div><div class="stat-value">4.2M</div><div class="stat-change">▲ 14%</div></div>
        <div class="stat-card"><div class="stat-label">LINE 推播到達率</div><div class="stat-value">71.3%</div><div class="stat-change">▲ 3.2%</div></div>
      </div>
      <div class="two-col" style="margin-bottom:14px">
        <div class="card">
          <div class="card-header"><span class="card-title">會員列表</span><input type="text" placeholder="搜尋會員..." style="font-size:11px;padding:4px 10px;border:1px solid #E2E8F0;border-radius:6px;outline:none"></div>
          <div class="card-body" style="padding:0">
            <table>
              <thead><tr><th>姓名</th><th>電話</th><th>等級</th><th>點數</th><th>最後消費</th><th>狀態</th></tr></thead>
              <tbody>
                <tr><td>王小明</td><td>0912-***-456</td><td><span class="chip orange">金卡</span></td><td>3,241</td><td>今天</td><td><span class="chip green">正常</span></td></tr>
                <tr><td>林美華</td><td>0933-***-781</td><td><span class="chip blue">白金</span></td><td>8,820</td><td>昨天</td><td><span class="chip green">正常</span></td></tr>
                <tr><td>陳大偉</td><td>0987-***-123</td><td><span class="chip gray">一般</span></td><td>142</td><td>3天前</td><td><span class="chip green">正常</span></td></tr>
                <tr><td>張淑芬</td><td>0911-***-654</td><td><span class="chip orange">金卡</span></td><td>2,087</td><td>2天前</td><td><span class="chip green">正常</span></td></tr>
                <tr><td>李建國</td><td>0966-***-321</td><td><span class="chip gray">一般</span></td><td>58</td><td>14天前</td><td><span class="chip orange">沉睡</span></td></tr>
                <tr><td>黃雅婷</td><td>0922-***-987</td><td><span class="chip blue">白金</span></td><td>12,441</td><td>今天</td><td><span class="chip green">正常</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:14px">
          <div class="card">
            <div class="card-header"><span class="card-title">推播行銷</span><button style="font-size:11px;background:${BRAND};color:white;border:none;padding:4px 12px;border-radius:6px;cursor:pointer">+ 新增推播</button></div>
            <div class="card-body">
              ${[
                ["週三限定優惠","2026/04/23","全體","已發送 42,381","92.1%"],
                ["沉睡喚回活動","2026/04/20","沉睡會員","已發送 8,120","68.3%"],
                ["點數到期提醒","2026/04/18","即將到期","已發送 3,241","81.7%"],
              ].map(([t,d,s,n,r]) => `
              <div style="padding:10px;background:#F8FAFC;border-radius:8px;margin-bottom:8px;border-left:3px solid ${BRAND}">
                <div style="font-size:12px;font-weight:700;color:#1E293B;margin-bottom:4px">${t}</div>
                <div style="display:flex;gap:8px;flex-wrap:wrap">
                  <span style="font-size:10px;color:#64748B">${d}</span>
                  <span class="chip gray">${s}</span>
                  <span style="font-size:10px;color:#64748B">${n}</span>
                  <span class="chip green">到達率 ${r}</span>
                </div>
              </div>`).join("")}
            </div>
          </div>
          <div class="card">
            <div class="card-header"><span class="card-title">會員等級分佈</span></div>
            <div class="card-body">
              ${[["白金卡","12,841","7%","#3B82F6"],["金卡","38,210","21%","#F59E0B"],["一般","133,269","72%","#E2E8F0"]].map(([l,n,p,c]) => `
              <div class="progress-row">
                <div class="progress-meta"><span class="progress-name">${l}</span><span class="progress-val">${n} 人（${p}）</span></div>
                <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${p};background:${c}"></div></div>
              </div>`).join("")}
            </div>
          </div>
        </div>
      </div>
    `,
  },

  // 5. Promo
  {
    key: "promo",
    filename: "backend-promo.jpg",
    title: "促銷活動模組",
    html: () => `
      <div class="stat-grid">
        <div class="stat-card"><div class="stat-label">進行中活動</div><div class="stat-value">8</div><div class="stat-change">3 今日到期</div></div>
        <div class="stat-card"><div class="stat-label">本月折扣使用次數</div><div class="stat-value">12,841</div><div class="stat-change">▲ 31%</div></div>
        <div class="stat-card"><div class="stat-label">活動帶動營收</div><div class="stat-value">NT$ 284K</div><div class="stat-change">▲ 18.2%</div></div>
        <div class="stat-card"><div class="stat-label">新客轉換率</div><div class="stat-value">23.4%</div><div class="stat-change">▲ 4.1%</div></div>
      </div>
      <div class="two-col" style="margin-bottom:14px">
        <div class="card">
          <div class="card-header"><span class="card-title">活動列表</span><button style="font-size:11px;background:${BRAND};color:white;border:none;padding:4px 12px;border-radius:6px;cursor:pointer">+ 新增活動</button></div>
          <div class="card-body" style="padding:0">
            <table>
              <thead><tr><th>活動名稱</th><th>類型</th><th>折扣</th><th>期間</th><th>使用次數</th><th>狀態</th></tr></thead>
              <tbody>
                <tr><td>週三咖啡日</td><td>時段折扣</td><td>85折</td><td>每週三</td><td>4,821</td><td><span class="chip green">進行中</span></td></tr>
                <tr><td>新會員禮</td><td>折扣碼</td><td>9折</td><td>首次消費</td><td>2,341</td><td><span class="chip green">進行中</span></td></tr>
                <tr><td>滿額贈點</td><td>消費累點</td><td>2倍點</td><td>04/25–04/30</td><td>1,209</td><td><span class="chip blue">即將</span></td></tr>
                <tr><td>早餐組合優惠</td><td>組合促銷</td><td>NT$5折</td><td>07:00–10:00</td><td>3,412</td><td><span class="chip green">進行中</span></td></tr>
                <tr><td>午後甜點節</td><td>時段折扣</td><td>88折</td><td>14:00–16:00</td><td>987</td><td><span class="chip green">進行中</span></td></tr>
                <tr><td>生日特惠</td><td>會員限定</td><td>金卡免運</td><td>當月壽星</td><td>421</td><td><span class="chip green">進行中</span></td></tr>
                <tr><td>舊客回購</td><td>推播優惠碼</td><td>8折</td><td>04/15–04/22</td><td>1,821</td><td><span class="chip gray">已結束</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:14px">
          <div class="card">
            <div class="card-header"><span class="card-title">新增活動</span></div>
            <div class="card-body">
              <div style="display:flex;flex-direction:column;gap:10px">
                <div><div style="font-size:11px;font-weight:600;color:#64748B;margin-bottom:4px">活動名稱</div><input style="width:100%;font-size:12px;padding:7px 10px;border:1px solid #E2E8F0;border-radius:7px;outline:none" value="五一勞動節特惠"></div>
                <div><div style="font-size:11px;font-weight:600;color:#64748B;margin-bottom:4px">活動類型</div>
                  <div style="display:flex;gap:6px;flex-wrap:wrap">
                    ${["時段折扣","折扣碼","組合促銷","消費累點"].map((t,i) => `<span style="font-size:11px;padding:4px 10px;border-radius:6px;background:${i===0?"#FEF3C7":"#F1F5F9"};color:${i===0?"#92400E":"#475569"};cursor:pointer;border:${i===0?"1.5px solid #E8751A":"1px solid transparent"}">${t}</span>`).join("")}
                  </div>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
                  <div><div style="font-size:11px;font-weight:600;color:#64748B;margin-bottom:4px">開始時間</div><input style="width:100%;font-size:12px;padding:7px 10px;border:1px solid #E2E8F0;border-radius:7px;outline:none" value="2026-05-01 00:00"></div>
                  <div><div style="font-size:11px;font-weight:600;color:#64748B;margin-bottom:4px">結束時間</div><input style="width:100%;font-size:12px;padding:7px 10px;border:1px solid #E2E8F0;border-radius:7px;outline:none" value="2026-05-01 23:59"></div>
                </div>
                <div><div style="font-size:11px;font-weight:600;color:#64748B;margin-bottom:4px">折扣設定</div><input style="width:100%;font-size:12px;padding:7px 10px;border:1px solid #E2E8F0;border-radius:7px;outline:none" value="全館 85 折"></div>
                <button style="background:linear-gradient(135deg,${BRAND},#F59E0B);color:white;border:none;padding:10px;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;width:100%">立即上架活動</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  },

  // 6. Maintenance
  {
    key: "maintenance",
    filename: "backend-maintenance.jpg",
    title: "報修 & 維保工單",
    html: () => `
      <div class="stat-grid">
        <div class="stat-card"><div class="stat-label">待處理工單</div><div class="stat-value" style="color:#EF4444">14</div><div class="stat-change down">3 已逾 SLA</div></div>
        <div class="stat-card"><div class="stat-label">本月完工率</div><div class="stat-value">96.2%</div><div class="stat-change">▲ 1.8%</div></div>
        <div class="stat-card"><div class="stat-label">平均響應時間</div><div class="stat-value">1.4h</div><div class="stat-change">SLA ≤ 4h ✓</div></div>
        <div class="stat-card"><div class="stat-label">本月預防保養</div><div class="stat-value">48台</div><div class="stat-change">按計劃執行</div></div>
      </div>
      <div class="three-col">
        <div class="card">
          <div class="card-header"><span class="card-title">工單列表</span><button style="font-size:11px;background:${BRAND};color:white;border:none;padding:4px 12px;border-radius:6px;cursor:pointer">+ 新增工單</button></div>
          <div class="card-body" style="padding:0">
            <table>
              <thead><tr><th>工單 #</th><th>設備</th><th>問題描述</th><th>等級</th><th>派工</th><th>狀態</th><th>SLA</th></tr></thead>
              <tbody>
                <tr><td>#2024</td><td>FRZ-013</td><td>溫控器異常</td><td><span class="chip red">L4 緊急</span></td><td>歐總工</td><td><span class="chip orange">進行中</span></td><td style="color:#EF4444">⏰ 1h 30m</td></tr>
                <tr><td>#2023</td><td>GRB-018</td><td>網路模組斷線</td><td><span class="chip red">L3 嚴重</span></td><td>Mozo</td><td><span class="chip orange">進行中</span></td><td style="color:#F59E0B">⏰ 2h 15m</td></tr>
                <tr><td>#2022</td><td>VND-031</td><td>付款模組卡單</td><td><span class="chip orange">L2 一般</span></td><td>Henry</td><td><span class="chip blue">待派工</span></td><td>4h 00m</td></tr>
                <tr><td>#2021</td><td>KSK-008</td><td>觸控螢幕無反應</td><td><span class="chip orange">L2 一般</span></td><td>待指派</td><td><span class="chip blue">待派工</span></td><td>4h 00m</td></tr>
                <tr><td>#2019</td><td>GRB-002</td><td>格子 5 號鎖異常</td><td><span class="chip gray">L1 輕微</span></td><td>歐總工</td><td><span class="chip green">完工</span></td><td style="color:#10B981">✓ 已完成</td></tr>
                <tr><td>#2018</td><td>VND-044</td><td>定期清潔保養</td><td><span class="chip gray">L0 保養</span></td><td>Nick</td><td><span class="chip green">完工</span></td><td style="color:#10B981">✓ 已完成</td></tr>
                <tr><td>#2017</td><td>MWV-005</td><td>微波組件更換</td><td><span class="chip red">L3 嚴重</span></td><td>歐總工</td><td><span class="chip green">完工</span></td><td style="color:#10B981">✓ 提前完成</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:14px">
          <div class="card">
            <div class="card-header"><span class="card-title">SLA 時效追蹤</span></div>
            <div class="card-body">
              ${[["L4 緊急","≤ 2h","#2024 — 1h30m","red"],["L3 嚴重","≤ 4h","#2023 — 2h15m","orange"],["L2 一般","≤ 8h","正常","green"],["L1 輕微","≤ 24h","正常","green"],["L0 保養","計劃排程","按計劃","green"]].map(([l,sla,s,c]) => `
              <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid #F1F5F9">
                <div>
                  <div style="font-size:12px;font-weight:700;color:#1E293B">${l}</div>
                  <div style="font-size:10px;color:#64748B">SLA ${sla}</div>
                </div>
                <span class="chip ${c}">${s}</span>
              </div>`).join("")}
            </div>
          </div>
          <div class="card">
            <div class="card-header"><span class="card-title">工單狀態分佈</span></div>
            <div class="card-body">
              <div style="display:flex;gap:8px;flex-wrap:wrap">
                ${[["待派工","4","#3B82F6"],["進行中","2","#F59E0B"],["待驗收","3","#8B5CF6"],["本月完工","38","#10B981"],["已逾SLA","3","#EF4444"]].map(([l,n,c]) => `
                <div style="flex:1;min-width:80px;background:${c}10;border:1px solid ${c}30;border-radius:10px;padding:10px;text-align:center">
                  <div style="font-size:20px;font-weight:800;color:${c}">${n}</div>
                  <div style="font-size:10px;color:#64748B">${l}</div>
                </div>`).join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  },

  // 7. Tenant
  {
    key: "tenant",
    filename: "backend-tenant.jpg",
    title: "多租戶管理",
    html: () => `
      <div class="stat-grid">
        <div class="stat-card"><div class="stat-label">活躍租戶</div><div class="stat-value">8</div><div class="stat-change">2 試用中</div></div>
        <div class="stat-card"><div class="stat-label">總設備數</div><div class="stat-value">312</div><div class="stat-change">跨 8 個租戶</div></div>
        <div class="stat-card"><div class="stat-label">本月平台費收入</div><div class="stat-value">NT$ 84K</div><div class="stat-change">▲ 12%</div></div>
        <div class="stat-card"><div class="stat-label">API 呼叫量（今日）</div><div class="stat-value">2.1M</div><div class="stat-change">p99 < 80ms</div></div>
      </div>
      <div class="two-col" style="margin-bottom:14px">
        <div class="card">
          <div class="card-header"><span class="card-title">租戶列表</span><button style="font-size:11px;background:${BRAND};color:white;border:none;padding:4px 12px;border-radius:6px;cursor:pointer">+ 新增租戶</button></div>
          <div class="card-body" style="padding:0">
            <table>
              <thead><tr><th>租戶名稱</th><th>方案</th><th>設備數</th><th>本月費用</th><th>狀態</th><th>到期日</th></tr></thead>
              <tbody>
                <tr>
                  <td><div style="display:flex;align-items:center;gap:8px"><div style="width:8px;height:8px;border-radius:50%;background:#E8751A;flex-shrink:0"></div><strong>東方美集團</strong></div></td>
                  <td><span class="chip orange">企業版</span></td><td>148</td><td>NT$ 42,000</td><td><span class="chip green">正常</span></td><td>2027/03/31</td>
                </tr>
                <tr>
                  <td><div style="display:flex;align-items:center;gap:8px"><div style="width:8px;height:8px;border-radius:50%;background:#3B82F6;flex-shrink:0"></div><strong>翔耀實業</strong></div></td>
                  <td><span class="chip blue">專業版</span></td><td>62</td><td>NT$ 18,600</td><td><span class="chip green">正常</span></td><td>2026/12/31</td>
                </tr>
                <tr>
                  <td><div style="display:flex;align-items:center;gap:8px"><div style="width:8px;height:8px;border-radius:50%;background:#8B5CF6;flex-shrink:0"></div><strong>全家超商</strong></div></td>
                  <td><span class="chip blue">專業版</span></td><td>48</td><td>NT$ 14,400</td><td><span class="chip green">正常</span></td><td>2026/09/30</td>
                </tr>
                <tr>
                  <td><div style="display:flex;align-items:center;gap:8px"><div style="width:8px;height:8px;border-radius:50%;background:#10B981;flex-shrink:0"></div><strong>麥味登連鎖</strong></div></td>
                  <td><span class="chip blue">專業版</span></td><td>28</td><td>NT$ 8,400</td><td><span class="chip green">正常</span></td><td>2026/11/30</td>
                </tr>
                <tr>
                  <td><div style="display:flex;align-items:center;gap:8px"><div style="width:8px;height:8px;border-radius:50%;background:#F59E0B;flex-shrink:0"></div><strong>首都高速 JP</strong></div></td>
                  <td><span class="chip gray">標準版</span></td><td>12</td><td>¥ 24,000</td><td><span class="chip green">正常</span></td><td>2027/01/31</td>
                </tr>
                <tr>
                  <td><div style="display:flex;align-items:center;gap:8px"><div style="width:8px;height,8px;border-radius:50%;background:#EF4444;flex-shrink:0"></div><strong>麗嬰國際（試用）</strong></div></td>
                  <td><span class="chip gray">試用版</span></td><td>4</td><td>—</td><td><span class="chip orange">試用</span></td><td>2026/05/15</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:14px">
          <div class="card">
            <div class="card-header"><span class="card-title">東方美 — 租戶設定</span></div>
            <div class="card-body">
              <div style="display:flex;align-items:center;gap:10px;padding:10px;background:#FFF7ED;border-radius:10px;margin-bottom:12px;border:1px solid #FED7AA">
                <div style="width:36px;height:36px;border-radius:9px;background:linear-gradient(135deg,#E8751A,#F59E0B);display:flex;align-items:center;justify-content:center;font-size:18px">🌅</div>
                <div>
                  <div style="font-size:13px;font-weight:700;color:#1E293B">東方美集團 eb-plus</div>
                  <div style="font-size:10px;color:#64748B">tenant_id: eb-plus-001 · 企業版</div>
                </div>
              </div>
              ${[["品牌主色","#E8751A（橙）"],["Logo URL","cdn.omnicore.io/eb-plus/"],["語言","繁體中文 + EN"],["付款方式","LINE Pay + 悠遊卡 + 信用卡"],["API Rate Limit","10,000 req/min"],["月報表","每月 1 日自動發送"]].map(([k,v]) => `
              <div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid #F1F5F9;font-size:12px">
                <span style="color:#64748B">${k}</span>
                <span style="color:#1E293B;font-weight:600">${v}</span>
              </div>`).join("")}
            </div>
          </div>
          <div class="card">
            <div class="card-header"><span class="card-title">資源用量（今日）</span></div>
            <div class="card-body">
              ${[["API 呼叫量","1.4M / 10M","14%","#3B82F6"],["儲存空間","42GB / 500GB","8%","#10B981"],["CDN 流量","8.2GB / 100GB","8%","#8B5CF6"]].map(([l,d,p,c]) => `
              <div class="progress-row">
                <div class="progress-meta"><span class="progress-name">${l}</span><span class="progress-val">${d}</span></div>
                <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${p};background:${c}"></div></div>
              </div>`).join("")}
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

console.log("OmniCore Backend Screenshot Generator");
console.log("=====================================");

for (const screen of screens) {
  const html = shell(screen.title, screen.html(), screen.key);
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  const outPath = path.join(OUT_DIR, screen.filename);
  await page.screenshot({ path: outPath, type: "jpeg", quality: 92, fullPage: false });
  await page.close();
  console.log(`✓ ${screen.filename}`);
}

await browser.close();
console.log("\n✅ 全部完成！請重啟 Next.js dev server 查看效果。");
