#!/usr/bin/env node
/**
 * 建置輸出驗證（2026-08-15 建立）
 *
 * 為什麼需要這一層：`content-gate.js` 掃的是 markdown 原始檔，但實際送到
 * Google 面前的是**算繪後的 HTML**。中間隔著 frontmatter 解析、schema 產生、
 * 標題模板套用、canonical 計算——這些都可能引入原始檔裡看不到的問題。
 *
 * 實際踩過的例子（都不是 markdown 層能抓到的）：
 *   - mcstation 的 H1 由兩個相鄰 <span> 組成，中間沒空白 → DOM 文字抽取
 *     變成「GraBoxAI 智取櫃」，品牌 token 壞掉
 *   - 子頁 metadata title 又寫一次品牌名，被 layout 的 title.template 疊加
 *     成 42 中文字，SERP 只顯示約 30 字
 *   - 首頁有 8 個同名 Person 節點、零個 @id，Google 視為 8 個不同實體
 *   - schema url 用中文網域、canonical 用 punycode，同實體兩種字串
 *
 * 用法：
 *   node scripts/verify-output.js <out目錄>            # 掃全部 HTML
 *   node scripts/verify-output.js <out目錄> --sample 20 # 抽樣 20 頁（CI 用）
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const OUT_DIR = args.find((a) => !a.startsWith('--')) || 'site/out';
const sampleIdx = args.indexOf('--sample');
const SAMPLE = sampleIdx >= 0 ? parseInt(args[sampleIdx + 1], 10) : 0;

function collectHtml(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.html')) out.push(p);
    }
  };
  walk(dir);
  return out;
}

// ── 從 HTML 撈出所有 JSON-LD 物件 ──────────────────────────
function extractJsonLd(html) {
  const blocks = [];
  const re = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html))) {
    try {
      blocks.push(JSON.parse(m[1]));
    } catch {
      blocks.push({ __parseError: true });
    }
  }
  return blocks;
}

function walkNodes(o, fn) {
  if (Array.isArray(o)) return o.forEach((v) => walkNodes(v, fn));
  if (o && typeof o === 'object') {
    fn(o);
    Object.values(o).forEach((v) => walkNodes(v, fn));
  }
}

const text = (s) => s.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

// ── 檢查一頁 ─────────────────────────────────────────────
function checkPage(file) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(process.cwd(), file).replace(/\\/g, '/');
  const issues = [];
  const add = (level, msg) => issues.push({ level, msg, file: rel });

  // 1. <title> ------------------------------------------------
  const titleM = html.match(/<title>([^<]*)<\/title>/);
  if (!titleM || !titleM[1].trim()) {
    add('ERROR', '缺少 <title>');
  } else {
    const t = titleM[1];
    // 中文標題在 SERP 約顯示 30 字，超過就是白寫
    const cjk = (t.match(/[一-鿿]/g) || []).length;
    if (cjk > 0 && t.length > 40) add('WARN', `標題過長（${t.length} 字，SERP 約顯示 30）：${t.slice(0, 50)}…`);
    // 品牌名重複＝title.template 疊加在已含品牌的子頁標題上
    for (const brand of ['銓幻元科技', '李奇申', '龍雲數位', '森林藥局聯盟']) {
      const n = t.split(brand).length - 1;
      if (n > 1) add('ERROR', `標題品牌名「${brand}」重複 ${n} 次：${t.slice(0, 60)}`);
    }
  }

  // 2. canonical ----------------------------------------------
  const canon = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/);
  if (!canon) add('WARN', '缺少 canonical');

  // 3. JSON-LD -------------------------------------------------
  const lds = extractJsonLd(html);
  if (lds.some((b) => b.__parseError)) add('ERROR', 'JSON-LD 解析失敗（語法錯誤）');

  // 3a. 同名 Person 實體碎片化
  const persons = [];
  lds.forEach((b) =>
    walkNodes(b, (n) => {
      if (n['@type'] === 'Person' && n.name === '李奇申') persons.push(n);
    })
  );
  if (persons.length > 1) {
    add('ERROR', `同一頁出現 ${persons.length} 個「李奇申」Person 節點（實體碎片化）`);
  }
  if (persons.length === 1 && !persons[0]['@id']) {
    add('ERROR', 'Person 節點缺少 @id，其他頁面無法引用同一實體');
  }

  // 3b. schema 的網域字串要跟 canonical 一致（中文網域 vs punycode）
  if (canon) {
    const canonHost = (() => { try { return new URL(canon[1]).host; } catch { return null; } })();
    if (canonHost) {
      const bad = new Set();
      lds.forEach((b) =>
        walkNodes(b, (n) => {
          for (const k of ['url', '@id', 'mainEntityOfPage']) {
            const v = typeof n[k] === 'string' ? n[k] : n[k]?.['@id'];
            if (typeof v !== 'string' || !v.startsWith('http')) continue;
            try {
              const h = new URL(v).host;
              // 只比對自站網址；外部 sameAs 不管
              if (h !== canonHost && (h.includes('xn--') || /[一-鿿]/.test(h))) bad.add(v);
            } catch { /* 忽略壞網址 */ }
          }
        })
      );
      if (bad.size) add('WARN', `schema 網址形式與 canonical 不一致：${[...bad][0]}`);
    }
  }

  // 4. H1 -------------------------------------------------------
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => m[1]);
  if (h1s.length === 0) add('WARN', '缺少 <h1>');
  if (h1s.length > 1) add('WARN', `有 ${h1s.length} 個 <h1>`);
  for (const raw of h1s) {
    const t = text(raw);
    // 相鄰標籤之間沒有空白，會把英文 token 黏在一起（實測過 GraBox+AI → GraBoxAI）。
    // ⚠️ 不可以先 strip 空白再比對——那樣連正確加了空白的 `</span> <span>` 也會命中，
    //    這是本檢查器第一版的誤判來源。要用原始 raw 找「緊鄰、中間真的沒東西」的標籤。
    const glued = /<\/(?:span|em|b|strong)><(?:span|em|b|strong)[^>]*>/.test(raw);
    // 而且抽取後的文字真的出現「小寫緊接大寫」才算壞掉（GraBoxAI），
    // 正常的「GraBox AI」有空白不會命中。
    if (glued && /[a-z][A-Z]/.test(t)) {
      add('ERROR', `H1 相鄰標籤缺空白，文字抽取會黏成一個 token：「${t.slice(0, 40)}」`);
    }
  }

  // 5. robots ---------------------------------------------------
  const robots = html.match(/<meta[^>]+name="robots"[^>]+content="([^"]+)"/);
  if (robots && /noindex/.test(robots[1]) && canon) {
    // noindex + canonical 指向自己不是錯，但值得留意
    add('INFO', 'noindex 頁');
  }

  return issues;
}

// ── main ─────────────────────────────────────────────────
let files = collectHtml(OUT_DIR);
if (!files.length) {
  console.error(`✗ 在 ${OUT_DIR} 找不到 HTML —— 請先 build，或確認輸出目錄正確`);
  process.exit(1);
}

if (SAMPLE > 0 && files.length > SAMPLE) {
  // 固定抽樣（不用亂數，讓 CI 每次檢查同一批，結果可比較）
  const step = Math.floor(files.length / SAMPLE);
  files = files.filter((_, i) => i % step === 0).slice(0, SAMPLE);
}

const all = [];
for (const f of files) {
  try {
    all.push(...checkPage(f));
  } catch (e) {
    all.push({ level: 'ERROR', msg: `檢查時發生例外：${e.message}`, file: f });
  }
}

const errors = all.filter((i) => i.level === 'ERROR');
const warns = all.filter((i) => i.level === 'WARN');

console.log(`建置輸出驗證：檢查 ${files.length} 個 HTML（來源 ${OUT_DIR}）\n`);

if (warns.length) {
  const byMsg = {};
  warns.forEach((w) => (byMsg[w.msg.split('：')[0]] ||= []).push(w));
  console.log(`⚠ WARN ${warns.length} 處`);
  for (const [k, v] of Object.entries(byMsg)) {
    console.log(`  ・${k}：${v.length} 處`);
    v.slice(0, 2).forEach((w) => console.log(`      ${w.file}  ${w.msg}`));
  }
  console.log('');
}

if (errors.length) {
  console.log(`✗ ERROR ${errors.length} 處 — 不得部署：\n`);
  errors.slice(0, 30).forEach((e) => console.log(`  ${e.file}\n    ${e.msg}\n`));
  if (errors.length > 30) console.log(`  …另外 ${errors.length - 30} 處`);
  process.exit(1);
}

console.log('✓ 通過，無 ERROR。');
