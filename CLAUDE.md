@AGENTS.md

---
## 📱 手機模擬驗證（Jason 2026-06-29 全域強制）

**所有 Web App 部署後，桌面 + 手機三端截圖全部正常才能回報完成：**

```bash
# 1. 桌面（預設）
agent-browser open <url> && agent-browser screenshot --annotate

# 2. iPhone 模擬
agent-browser set device "iPhone 14 Pro"
agent-browser open <url> && agent-browser screenshot --annotate

# 3. Android 模擬
agent-browser set device "Pixel 7"
agent-browser open <url> && agent-browser screenshot --annotate
```

- 確認 RWD 版面正常（無橫向 overflow、文字可讀、按鈕可點）
- 三張截圖全部通過才通知 Jason，有問題自行修復再回報
