"""
載入 Gemini API Key — 從 ~/.credentials/global.env（不 hardcode）
所有 gen_*.py 腳本 import 此模組使用
"""
import os
from pathlib import Path

def get_gemini_key() -> str:
    """從 ~/.credentials/global.env 讀取 GEMINI_API_KEY"""
    cred_file = Path.home() / ".credentials" / "global.env"

    if cred_file.exists():
        for line in cred_file.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line.startswith("GEMINI_API_KEY=") and not line.startswith("#"):
                key = line.split("=", 1)[1].strip()
                if key and key != "BLOCKED_NEEDS_NEW_KEY":
                    return key

    # fallback: 讀環境變數
    key = os.environ.get("GEMINI_API_KEY", "")
    if key and key != "BLOCKED_NEEDS_NEW_KEY":
        return key

    raise RuntimeError(
        "❌ GEMINI_API_KEY 未設定或已被封鎖。\n"
        "請到 https://console.cloud.google.com/apis/credentials 建立新 key，\n"
        f"然後填入：{cred_file}"
    )

if __name__ == "__main__":
    try:
        k = get_gemini_key()
        print(f"✅ Key loaded: {k[:10]}...{k[-4:]}")
    except RuntimeError as e:
        print(e)
