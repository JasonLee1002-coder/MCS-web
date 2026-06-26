import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# ── 1. 中文 span 內 Papa John's → 棒約翰 ──────────────────────────
# 只動 class="zh" 的 span/div 內容，EN/JA 保持原樣
def replace_zh_content(m):
    tag = m.group(1)
    content = m.group(2)
    end = m.group(3)
    new_content = content.replace("Papa John's", "棒約翰")
    return tag + new_content + end

# span class="zh" 和 div class="zh" 都換
html = re.sub(
    r'(<(?:span|div)[^>]*class="zh"[^>]*>)(.*?)(</(?:span|div)>)',
    replace_zh_content,
    html,
    flags=re.DOTALL
)

# om-text zh (milestone rows)
html = re.sub(
    r'(<div class="om-text zh">)(.*?)(</div>)',
    lambda m: m.group(1) + m.group(2).replace("Papa John's", "棒約翰") + m.group(3),
    html, flags=re.DOTALL
)

# so-p zh (steps)
html = re.sub(
    r'(<p class="so-p zh">)(.*?)(</p>)',
    lambda m: m.group(1) + m.group(2).replace("Papa John's", "棒約翰") + m.group(3),
    html, flags=re.DOTALL
)

# fr-pt zh
html = re.sub(
    r'(<span class="zh">)(.*?)(</span>)',
    lambda m: m.group(1) + m.group(2).replace("Papa John's", "棒約翰") + m.group(3),
    html, flags=re.DOTALL
)

# ── 2. 移除加盟卡片投資金額 (fr-inv + fr-inv-l) ────────────────────
html = re.sub(
    r'\s*<div class="fr-inv">.*?</div>\s*<div class="fr-inv-l zh">.*?</div>\s*<div class="fr-inv-l en">.*?</div>\s*<div class="fr-inv-l ja">.*?</div>',
    '',
    html, flags=re.DOTALL
)

# ── 3. 移除「回本預估」bullet ──────────────────────────────────────
html = re.sub(
    r'\s*<div class="fr-pt"><span class="zh">回本預估[^<]*</span><span class="en">Estimated payback[^<]*</span><span class="ja">回収期間[^<]*</span></div>',
    '',
    html
)

# ── 4. 移除加盟描述中「投資超過 300 萬」句子 ──────────────────────
html = html.replace(
    '傳統加盟要廚房、要設備、要至少 15 坪，投資超過 300 萬。',
    '傳統加盟要廚房、要設備、要至少 15 坪。'
)
html = html.replace(
    'Traditional franchise requires kitchen, equipment, 50+ sqm, NT$3M+ investment.',
    'Traditional franchise requires kitchen, equipment, and 50+ sqm of space.'
)
html = html.replace(
    '従来のフランチャイズはキッチン、設備、15坪以上、300万円以上の投資が必要。',
    '従来のフランチャイズはキッチン、設備、15坪以上のスペースが必要。'
)

# ── 5. 移除 B2B 收益表格（完整 table）────────────────────────────
html = re.sub(
    r'\s*<table class="b2b-table">.*?</table>',
    '',
    html, flags=re.DOTALL
)

# 移除表格後面的備註 p
html = re.sub(
    r'\s*<p style="font-size:0\.75rem[^>]*"[^>]*>(?:※[^<]*)</p>',
    '',
    html
)

# ── 6. 移除金格補貼百分比數字 ─────────────────────────────────────
html = html.replace(
    '費用總部補貼 80%。', '費用總部統一吸收。'
)
html = html.replace(
    'headquarters covers 80% of costs.', 'costs absorbed by headquarters.'
)
html = html.replace(
    '費用の80%を本部が補助。', '費用は本部が一括吸収。'
)
html = html.replace(
    '總部補貼 80%、加盟主補貼 20%</strong>，每月上限 10 盒，換算月均成本不超過 NT$1,500',
    '費用由<strong>總部統一補貼</strong>，加盟主零負擔'
)
html = html.replace(
    "headquarters covers 80% of costs. In return: a month of user excitement",
    "headquarters absorbs all costs. In return: a month of user excitement"
)
html = html.replace(
    "費用の80%を本部が補助。見返りは1ヶ月分",
    "費用は本部が全額補助。見返りは1ヶ月分"
)

# ── 7. 金格說明中移除「每月上限 10 盒」等成本細節 ─────────────────
html = html.replace(
    '以月均 500 次取餐計算，金格觸發 10 次，加盟主補貼 2 成 = 2 個披薩成本，約 NT$500。換來的是整月用戶期待感與社群打卡曝光，行銷 CP 值無可比擬。',
    '金格活動費用由總部統一補貼，加盟主零負擔。換來的是整月用戶期待感與社群打卡曝光，是最有效的免費行銷。'
)
html = html.replace(
    '500 monthly pickups, 10 gold box triggers, franchisee covers 20% = 2 pizzas, ~NT$500. In return: a month of user excitement, social media posts, and organic buzz you can\'t buy at any price.',
    'Gold Box costs fully subsidized by headquarters — zero cost to franchisees. In return: a month of user excitement, social media posts, and organic buzz money can\'t buy.'
)
html = html.replace(
    '月500回のピックアップで、ゴールドボックス10回発生、加盟主負担20%=ピザ2枚、約NT$500。見返りは1ヶ月分のユーザーの期待感とSNS拡散、価格のつけようがないマーケティング効果。',
    'ゴールドボックスの費用は本部が全額補助、加盟主の負担ゼロ。見返りは1ヶ月分のユーザーの期待感とSNS拡散、お金では買えないマーケティング効果。'
)

# ── 8. footer copyright 中文也換 ──────────────────────────────────
html = html.replace(
    '© 2026 GraBox 智取科技 × Papa John\'s Taiwan · 本頁為概念合作提案示意',
    '© 2026 GraBox 智取科技 × 棒約翰 Taiwan · 本頁為概念合作提案示意'
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Done. Verifying remaining Papa John's in zh context...")
import re
zh_papajohns = re.findall(r'class="zh"[^>]*>[^<]*Papa John\'s', html)
print(f"  Remaining zh occurrences: {len(zh_papajohns)}")
for x in zh_papajohns[:5]:
    print(f"    {x[:100]}")
