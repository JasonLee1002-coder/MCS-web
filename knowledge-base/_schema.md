# 知識庫 Schema 規範

每份知識文件必須包含以下 frontmatter：

```markdown
---
domain: products | clients | market | projects | strategy
entity: 主體名稱（用於快速索引）
tags: [標籤陣列]
lang: zh
last_updated: YYYY-MM-DD
author: CMO
confidence: high | medium | low  # 資料可信度
source: 來源說明
---
```

## 目錄結構

```
knowledge-base/
  products/        # MCS 產品規格、設備資料
  clients/         # 客戶檔案（黃維德、東方美、欣殿萬飲等）
  market/          # 市場分析、場景研究、競品
  projects/        # 各專案策略、現況、SOP
  strategy/        # 公司整體策略、商業模式
```

## 命名規則

`{entity-slug}.md` — 例如 `grabox.md`, `east-beauty.md`, `huangweide.md`

## 更新規則

- 每次對話有重大新資訊 → CMO 立刻更新對應文件
- `last_updated` 必須更新
- 若資料有衝突，以最新日期為準
