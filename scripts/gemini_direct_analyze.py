# -*- coding: utf-8 -*-
"""Direct Gemini API meeting analysis (baseline, no custom pipeline/KB)."""
import sys, os, json, time, re

def load_key():
    with open(r"C:\Users\JasonLee\.credentials\global.env", "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line.startswith("GEMINI_API_KEY="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    raise RuntimeError("GEMINI_API_KEY not found")

from google import genai
from google.genai import types as genai_types

API_KEY = load_key()
os.environ.pop("GOOGLE_API_KEY", None)
os.environ.pop("GEMINI_API_KEY", None)
client = genai.Client(api_key=API_KEY)
MODEL = "gemini-2.5-pro"

PROMPT = """你是一位專業會議記錄整理助理。請聽這段會議錄音，完成以下任務，並用清楚的繁體中文條列輸出：

1. 完整逐字稿（依說話順序，盡量標示不同說話者，若無法確定說話者身分可標示「說話者A/B」）
2. 會議摘要（3-8點重點）
3. 具體決議事項
4. 待辦事項/行動項目（含負責人與時間點，若有提及）
5. 值得注意的數字、金額、日期、專有名詞（如公司名、產品名、專利號等）

請直接輸出結構化內容，不需要客套話。"""

def analyze(audio_path, out_path):
    print(f"[Gemini-direct] 上傳音檔: {audio_path}", flush=True)
    audio_file = client.files.upload(
        file=audio_path,
        config=genai_types.UploadFileConfig(display_name="meeting_audio", mime_type="audio/mp4"),
    )
    print(f"[Gemini-direct] 上傳完成: {audio_file.uri}，等待處理...", flush=True)
    # wait for ACTIVE state
    f = client.files.get(name=audio_file.name)
    waited = 0
    while f.state.name == "PROCESSING":
        time.sleep(5)
        waited += 5
        f = client.files.get(name=audio_file.name)
        print(f"[Gemini-direct] 檔案處理中... ({waited}s)", flush=True)
    print(f"[Gemini-direct] 檔案狀態: {f.state.name}，開始生成分析...", flush=True)

    t0 = time.time()
    response = client.models.generate_content(
        model=MODEL,
        contents=[f, PROMPT],
    )
    elapsed = time.time() - t0
    text = response.text
    with open(out_path, "w", encoding="utf-8") as out:
        out.write(text)
    print(f"[Gemini-direct] 完成，耗時{elapsed:.1f}s，輸出長度{len(text)}字元 -> {out_path}", flush=True)
    return text

if __name__ == "__main__":
    audio_path = sys.argv[1]
    out_path = sys.argv[2]
    analyze(audio_path, out_path)
