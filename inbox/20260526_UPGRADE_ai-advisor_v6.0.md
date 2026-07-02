# ai-advisor v6.0 升級通知 — mcstation-web MCS AI 顧問

**發出日期：** 2026-05-26  
**發出單位：** CTO（OmniCore）  
**目標：** mcstation-web（`C:\Users\JasonLee\claude_code_projects\mcstation-web`）

---

## 升級摘要

ai-advisor skill 已升級至 **v6.0**，新增雙模式架構：

| 模式 | 說明 |
|------|------|
| **Mode A（被動累積）** | 從對話中自動萃取記憶 |
| **Mode B（主動行業智能）** | 新增 `domain_knowledge` table，AI 主動帶出無人販賣機行業洞察 |

---

## mcstation-web 目前狀態

- 目前版本：**尚未實作 ai-advisor**
- 升級目標：**直上 v6.0 Mode B**（MCS AI 顧問，無人販賣機場景）

---

## 實作清單（直上 Mode B）

### Step 1：建基礎 DB Schema

```sql
-- 長期記憶
CREATE TABLE ai_memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  subject TEXT,
  content TEXT NOT NULL,
  confidence INT NOT NULL DEFAULT 1,
  expires_at TIMESTAMPTZ DEFAULT NULL,
  source TEXT NOT NULL DEFAULT 'conversation'
);

-- 行業知識庫（Mode B 核心）
CREATE TABLE domain_knowledge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  source TEXT,
  confidence INT DEFAULT 1,
  domain TEXT NOT NULL DEFAULT 'vending_machine'
);
```

### Step 2：建行業種子知識 `src/lib/domain-knowledge-seed.ts`

行業域 = `retail`（無人販賣機/自助零售）

種子知識方向：
- **場景分類**：封閉場域（工廠/軍方/宿舍）vs 半開放（便利店旁）vs 開放
- **設備類型**：冷凍販賣機、冷藏販賣機、智取冰箱、GraBox 智取櫃
- **補貨策略**：動態安全庫存、售完率分析、最佳補貨頻率
- **商品選品**：場景對應熱銷品（移工 = 泡麵/飲料、工廠早班 = 早餐）
- **故障管理**：常見故障類型 + L0-L4 維修流程
- **法規合規**：食品冷鏈溫度規範、無人販賣機登記規定

### Step 3：整合到 AI 顧問對話

參考 SKILL.md §零 Mode B 完整說明。

---

## 參考資料

- **Skill 文件：** `~/.claude/skills/ai-advisor/SKILL.md`（v6.0 全文）
- **已實作範例：** Feedbites（Mode B）、LexForge（Mode B）
- **CHANGELOG：** `~/.claude/skills/ai-advisor/CHANGELOG.md`

---

*此通知由 CTO 自動派發，完成升級後請更新 `~/.claude/skills/ai-advisor/PROJECTS.md`*
