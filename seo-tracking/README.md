# MCS Web — SEO 追蹤紀錄系統

## 目的
持續記錄 mcstation.ai 的 SEO 狀態，累積歷史數據用於：
1. 追蹤關鍵字排名變化
2. 監控技術 SEO 健康度
3. 衡量內容策略成效
4. 作為未來客戶 SEO 服務的成功案例數據

## 結構

```
seo-tracking/
├── README.md          # 本文件
├── CHANGELOG.md       # SEO 變更日誌（每次做了什麼）
├── snapshots/         # 每次執行的快照紀錄
│   ├── 2026-03-20.md  # 第一次紀錄
│   └── ...            # 後續紀錄
└── analysis/          # 數值分析報告（累積足夠數據後產生）
```

## 追蹤指標

### 核心指標
- 目標關鍵字 Google 排名
- GSC 索引頁面數
- GSC 點擊數 / 曝光數 / CTR / 平均排名
- Core Web Vitals（LCP / FID / CLS）

### 內容指標
- 總頁面數（主頁 + 部落格）
- 部落格文章數量
- 內部連結密度

### 技術指標
- sitemap URL 數量
- 結構化資料類型覆蓋
- 301 redirect 清理進度
- IndexNow 提交狀態

## 使用方式
每次 Claude Code 執行 SEO 相關工作時，自動在 `snapshots/` 新增當日快照。
快照之間的差異即為追蹤數據。
