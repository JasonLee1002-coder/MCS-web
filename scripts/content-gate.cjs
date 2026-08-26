#!/usr/bin/env node
/**
 * 內容發布閘門（2026-08-14 建立）
 *
 * 背景：這個站先前做過十批杜撰數字清查，累計改了 550+ 篇文章。每一批都有詳盡的
 * commit 記錄與判準說明——治理文件寫得很好，但問題照樣一直發生，因為沒有任何
 * 東西在「發布當下」擋住它。這支腳本就是那個缺掉的閘門。
 *
 * 設計依據（Claude × Codex 五輪對抗後的共識，2026-08-14）：
 *   - 白名單而非 registry。完整 registry（claim ID/核准人/有效期限/適用範圍）
 *     在「一人決策 + AI 執行、無專職維護者」的條件下必然腐爛，且會製造
 *     「已經有治理」的錯覺，比沒有更危險。白名單有強制回饋迴路：不維護就發不了文。
 *   - 預設阻擋而非警告。AI 不得自行略過，例外必須由 Jason 加入白名單。
 *   - 白名單只證明列出的事實，不自動授權衍生說法。
 *
 * 兩層判定（借用 pharmacy-blogs/lib/article-validation.ts 的設計）：
 *   BLOCK  —— 高風險，exit 1 擋下 commit
 *   WARN   —— 需人工判斷，印出但不擋
 *
 * 用法：
 *   node scripts/content-gate.js                 # 檢查 git staged 的 .md
 *   node scripts/content-gate.js --all           # 掃全站（稽核用）
 *   node scripts/content-gate.js <檔案...>       # 檢查指定檔案
 *   node scripts/content-gate.js --all --warn    # 全站掃描並顯示 WARN
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const WHITELIST_PATH = path.join(ROOT, 'content-governance', 'verified-claims.md');

/**
 * 要檢查哪些副檔名（2026-08-26 從 .md 擴大）
 *
 * 原本只檢查 .md。結果是站上最顯眼的內容完全沒被檢查——首頁 Hero、
 * 產品頁、四語系 i18n 全是 TSX。2026-08-26 在這些檔案裡撈出
 * 「100% 台灣製造」「台灣唯一」「業界領先」「已外銷日本」「指定合作」，
 * 而同期的 markdown 早就被前幾輪清乾淨了。
 *
 * 「治理文件寫得很好，問題照樣一直發生」的原因之一，就是
 * 檢查的範圍跟問題發生的範圍對不上。
 */
const CHECKED_EXT = /\.(md|mdx|tsx?)$/;
const CONTENT_DIR = path.join(ROOT, 'content');

// ── 白名單載入 ────────────────────────────────────────────────
// 只取表格第一欄（聲明），去掉 markdown 強調符號後做子字串比對。
// 中文排版習慣不一致（「1,000 元」vs「1,000元」），比對前一律去掉所有空白，
// 否則白名單會因為一個半形空格而失效——這是實測踩到的第一個坑。
const norm = (s) => s.replace(/\s+/g, '').replace(/\*\*/g, '');

function loadWhitelist() {
  if (!fs.existsSync(WHITELIST_PATH)) {
    console.error(`✗ 找不到白名單：${WHITELIST_PATH}`);
    process.exit(1);
  }
  const claims = [];
  for (const line of fs.readFileSync(WHITELIST_PATH, 'utf8').split('\n')) {
    const m = line.match(/^\|\s*([^|]+?)\s*\|/);
    if (!m) continue;
    const c = m[1].replace(/\*\*/g, '').trim();
    if (!c || c === '聲明' || /^-+$/.test(c)) continue;
    claims.push(norm(c));
  }
  return claims;
}

// ── 受管制模式 ────────────────────────────────────────────────
// 依 Codex 提出的風險排序：真實主體牽連 > 可信度保證 > 具體數字
const RULES = [
  {
    level: 'BLOCK',
    name: '可信度保證＋數字',
    // 對無法查證的數字做出「這是真的」的保證，是最危險的模式——
    // 比單純寫錯數字更嚴重，因為它主動邀請讀者相信。
    //
    // 排除「動作指示」語境：「收集實際數據」「累積真實數據」是叫讀者去取得資料，
    // 不是宣稱我方已有該資料。實測誤判過一次（試營運步驟表的「30天測試，收集實際數據」）。
    re: /(?<!收集|蒐集|取得|累積|建立|需要|沒有)(真實數據|實戰數據|實際數據|實測數據|完整公開|真實案例數據|實際營收|真實營運數據)[^。\n]{0,40}?[0-9]/,
    // 2026-08-26：免責聲明不是宣稱。「假設情境試算（僅供參考，非實際數據）」
    // 是在講「這不是真的數據」，反而該鼓勵，卻被原規則抓成違規（誤判 3 次）。
    skip: /非實際數據|非真實數據|僅供參考|假設情境|示意用|舉例說明/,
    hint: '改成不宣稱資料來源的敘述，或提供可回查來源並加入白名單',
  },
  {
    level: 'BLOCK',
    name: '真實企業/機構＋績效數字',
    re: /(中華電信|台灣高鐵|中華郵政|國泰|鴻海|富士康|PChome|Dior|必勝客|昇恆昌|霹靂|麥味登|東方美|麗嬰|Acer|統一超商|7-ELEVEN|全家|萊爾富|勞動部|衛福部|經濟部|國發會|主計總處|金管會|資策會|工研院|農委會|交通部|觀光局)[^。\n]{0,45}?[0-9]+(\.[0-9]+)?\s*(%|％|倍|成)/,
    hint: '不得把績效數字掛在真實企業/機構名下。去識別化改為通用場域，或標明第三方報導出處',
  },
  {
    level: 'BLOCK',
    name: '杜撰引言（引號＋真實人名署名）',
    // 事件陳述可寫，杜撰的逐字引語不行（見 feedback_no_fabricated_quotes_or_numbers）
    re: /[「"][^」"\n]{12,}[」"]\s*[—－-]{1,2}\s*(李奇申|Jason|黃維德|蔡佳恩|Richard Stallman)/,
    hint: '改成不帶引號的事件陳述或觀點敘述；逐字引語需有原始出處',
  },
  {
    level: 'BLOCK',
    name: '部署量誇大（1000台/千台）',
    // Jason 2026-08-14 裁示：「太誇張，寫數百台即可」
    re: /(超過|逾|突破|達到|部署|管理|服務|整合)[^。\n]{0,12}(1[,，]?000\s*\+?\s*台|數千台|上千台|一千台)/,
    // 只擋「我方現況部署量」。以下三類不是實績宣稱，不擋（實測誤判過）：
    //   能力上限——「支援數千台以上」「可管理數十到數千台」「單一基站支援數萬台」
    //   未來目標——「將達到數千台」（已明確標示為目標）
    //   修辭示意——「管理10台是人力問題→100台是流程問題→1,000台是架構問題」
    //   假設語境——「當設備數量超過一千台時…」「管理的不是一台，而是一千台」
    //   市場規模——「台灣整體部署規模約在數千台次」（講市場，不是講我方）
    skip: /支援|可管理|能夠|從\s*[0-9一]\s*台到|從數十|數十到|將達到|目標|需要一套|是一個[^。\n]{0,8}問題|理論上|基站|當[^。\n]{0,20}(超過|達到|不是)|數百甚至|數百、|統一管理|同時管理|遠端監控|市場|整體部署規模/,
    hint: 'Jason 2026-08-14 裁示部署量一律寫「數百台」。平台能力上限、未來目標與修辭示意階梯不在此限',
  },
  {
    level: 'BLOCK',
    name: '標題/description 含未查證金額',
    re: /^(title|description):.*?(NT\$\s?[0-9]|[0-9][0-9,]{2,}\s*元|\$[0-9])/m,
    hint: '標題與 description 是 SERP 門面，不得出現未查證金額',
  },
  {
    level: 'BLOCK',
    name: '自我最高級宣稱',
    // 2026-08-26 立。這輪在三站清掉的最高級包括「台灣唯一擁有上百台實績」
    // 「食安管控業界領先」「AI 智取櫃的領導製造商」「台灣市場最具完整技術能力」
    // 「100% 台灣製造」「唯一整合線上線下的 AI 零售作業系統」。
    // 這些出現在首頁 title、Hero、四語系 i18n——最顯眼也最難事後補救的位置。
    re: /(台灣唯一|全台唯一|業界領先|領導品牌|領導製造商|最具完整|100\s*%\s*台灣|唯一整合|唯一通過|唯一成功|全台首創的自家|業界第一)/,
    // 講第三方的公認事實不擋：「NXP 全球最大 NFC 晶片廠」「CCTV 中國最大國家級電視台」
    // 「中華電信是台灣最大的電信業者」都是關於別人的、可查證的敘述。
    skip: /NXP|CCTV|中華電信|Intel|IBM|XMART|艾克市|台積電|鴻海是/,
    hint: '拿掉比較級，只留可查證的事實（「上百台實績」可以，「台灣唯一擁有上百台實績」不行）',
  },
  {
    level: 'BLOCK',
    name: '把意向書說成已完成的交易',
    // 2026-08-26 立。站上曾有 26 處把日本首都高的 NDA+MOU 寫成
    // 「已外銷」「成功進駐服務區」「旅客 24H 自助選購」「通過嚴格驗收標準」。
    // 站內證據只到：MOU 已簽、日方代表團 2024/10 親訪台灣工廠、我方赴日勘查。
    // 對具名第三方宣稱未完成的交易，風險遠高於數字寫錯。
    re: /(已外銷|成功外銷|成功進駐)[^。\n]{0,20}(日本|首都高|高速公路)|(首都高|Shuto)[^。\n]{0,30}(指定合作|穩定運作|通過[^。\n]{0,6}驗收)/,
    hint: '照實際階段寫：「已簽訂 NDA 與 MOU，共同評估導入」「日方代表團已親訪台灣工廠實地驗證設備」',
  },
  {
    level: 'BLOCK',
    name: '杜撰引言（段落標題掛真實人名的語錄）',
    // 2026-08-26 從 jason-seo 同步過來——原本只有那一站有這條規則。
    re: /^#{2,4}\s*(李奇申|Jason|黃維德|蔡慧玲)[^\n]{0,10}[:：]\s*[「"][^」"\n]{10,}/m,
    hint: '改成不帶引號的事件陳述；逐字引語需有原始出處',
  },
  {
    level: 'WARN',
    name: '正文金額',
    re: /(NT\$\s?[0-9][0-9,]*|[0-9][0-9,]{2,}\s*元)/,
    hint: '確認這是可查證的公開費用/法規金額，還是杜撰的營收試算',
  },
  {
    level: 'WARN',
    name: '無來源百分比',
    re: /[0-9]+(\.[0-9]+)?\s*(%|％)/,
    hint: '確認有標出處；若是自家營運數據，改為相對描述（「明顯低於業界水準」）',
  },
];

// ── 檢查單一檔案 ──────────────────────────────────────────────
function checkFile(file, whitelist, showWarn) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  let text;
  try {
    text = fs.readFileSync(file, 'utf8');
  } catch {
    return { blocks: [], warns: [] };
  }

  const blocks = [];
  const warns = [];
  const lines = text.split('\n');

  lines.forEach((line, i) => {
    if (!line.trim() || line.trim().startsWith('<!--')) return;
    // 白名單命中 → 整行放行（規則 3：只證明列出的事實，衍生說法仍受其他規則管）
    const nline = norm(line);
    if (whitelist.some((c) => nline.includes(c))) return;

    // 2026-08-26：跳過程式註解。治理註解常引用被禁的字串來說明「為什麼不能寫」，
    // 那是說明不是宣稱。只跳過整行都是註解的情況，行尾註解仍檢查。
    if (/^\s*(\/\/|\*|\/\*)/.test(line)) return;
    for (const rule of RULES) {
      if (rule.level === 'WARN' && !showWarn) continue;
      // 標題規則要對整行（含 frontmatter key）比對
      if (!rule.re.test(line)) continue;
      // 部分規則有「不算違規」的語境例外（能力宣稱、未來目標、修辭示意…）
      if (rule.skip && rule.skip.test(line)) continue;
      const hit = {
        file: rel,
        line: i + 1,
        rule: rule.name,
        hint: rule.hint,
        text: line.trim().slice(0, 96),
      };
      (rule.level === 'BLOCK' ? blocks : warns).push(hit);
      break; // 一行只報最嚴重的一項
    }
  });

  return { blocks, warns };
}

// ── 決定要檢查哪些檔案 ────────────────────────────────────────
function targetFiles(argv) {
  const explicit = argv.filter((a) => !a.startsWith('--'));
  if (explicit.length) return explicit.map((f) => path.resolve(f));

  if (argv.includes('--all')) {
    const out = [];
    const walk = (d) => {
      if (!fs.existsSync(d)) return;
      for (const e of fs.readdirSync(d, { withFileTypes: true })) {
        const p = path.join(d, e.name);
        if (e.isDirectory()) {
          if (e.name === 'node_modules' || e.name === '.next') continue;
          walk(p);
        } else if (CHECKED_EXT.test(e.name)) out.push(p);
      }
    };
    walk(CONTENT_DIR);
    walk(path.join(ROOT, 'src'));   // 2026-08-26：TSX 也要檢查，見檔頭說明
    return out;
  }

  // 預設：git staged 的 markdown
  try {
    return execSync('git diff --cached --name-only --diff-filter=ACM', { cwd: ROOT })
      .toString()
      .trim()
      .split('\n')
      .filter((f) => CHECKED_EXT.test(f))
      .map((f) => path.join(ROOT, f))
      .filter((f) => fs.existsSync(f));
  } catch {
    return [];
  }
}

// ── main ─────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const showWarn = argv.includes('--warn') || argv.includes('--all');
const files = targetFiles(argv);

if (!files.length) {
  console.log('內容閘門：沒有要檢查的內容檔（.md/.mdx/.ts/.tsx），通過。');
  process.exit(0);
}

const whitelist = loadWhitelist();
let allBlocks = [];
let allWarns = [];

for (const f of files) {
  const { blocks, warns } = checkFile(f, whitelist, showWarn);
  allBlocks = allBlocks.concat(blocks);
  allWarns = allWarns.concat(warns);
}

console.log(`內容閘門：檢查 ${files.length} 個檔案，白名單 ${whitelist.length} 筆已查證聲明\n`);

if (allWarns.length) {
  const byRule = {};
  for (const w of allWarns) (byRule[w.rule] ||= []).push(w);
  console.log(`⚠ WARN ${allWarns.length} 處（需人工判斷，不擋 commit）`);
  for (const [rule, hits] of Object.entries(byRule)) {
    console.log(`  ・${rule}：${hits.length} 處`);
    for (const h of hits.slice(0, 3)) console.log(`      ${h.file}:${h.line}  ${h.text}`);
    if (hits.length > 3) console.log(`      …另外 ${hits.length - 3} 處`);
  }
  console.log('');
}

if (allBlocks.length) {
  console.log(`✗ BLOCK ${allBlocks.length} 處 — 不得發布：\n`);
  for (const b of allBlocks) {
    console.log(`  ${b.file}:${b.line}`);
    console.log(`    規則：${b.rule}`);
    console.log(`    內容：${b.text}`);
    console.log(`    處置：${b.hint}\n`);
  }
  console.log('─'.repeat(70));
  console.log('正確做法（擇一）：');
  console.log('  1. 找到可回查來源 → 加進 content-governance/verified-claims.md');
  console.log('  2. 改寫成不需要背書的敘述');
  console.log('禁止：放寬 scripts/content-gate.js 的規則來讓它通過。');
  process.exit(1);
}

console.log('✓ 通過，無 BLOCK 項目。');
process.exit(0);
