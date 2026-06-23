#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
MCS 產品型錄品牌替換腳本
將龍雲數位/Transtep 品牌替換為 銓幻元科技/MCS
"""

import fitz  # PyMuPDF
import sys
import os


def detect_font_info(page, rect):
    """從頁面中找出指定矩形區域的字型資訊"""
    try:
        blocks = page.get_text("rawdict")["blocks"]
        for block in blocks:
            for line in block.get("lines", []):
                for span in line.get("spans", []):
                    span_rect = fitz.Rect(span["bbox"])
                    if span_rect.intersects(rect) and span_rect.get_area() > 0:
                        color_int = span.get("color", 0)
                        r = ((color_int >> 16) & 0xFF) / 255
                        g = ((color_int >> 8) & 0xFF) / 255
                        b = (color_int & 0xFF) / 255
                        return {
                            "size": span.get("size", 10),
                            "color": (r, g, b)
                        }
    except Exception:
        pass
    return {"size": 10, "color": (0, 0, 0)}


def process_pdf(input_path, output_path, chinese_font_path):
    """處理 PDF：搜尋並替換文字"""

    # 定義替換規則 (舊文字, 新文字)，空字串代表移除
    replacements = [
        ("龍雲數位整合股份有限公司", "銓幻元科技股份有限公司"),
        ("龍雲數位整合",              "銓幻元科技"),
        ("龍雲數位",                  "銓幻元"),
        ("WWW.TRANSTEP.COM",          "WWW.MCSTATION.AI"),
        ("+886 2 2558-8848",          "0929-866-735"),
        ("Justin.lin@transtep.com",   "alualu81@gmail.com"),
        ("0910-189109",               ""),   # 移除業務個人電話
        ("Transtep",                  "MCS"),
    ]

    doc = fitz.open(input_path)
    total_replacements = 0

    for page_num in range(len(doc)):
        page = doc[page_num]
        page_tasks = []

        for old_text, new_text in replacements:
            rects = page.search_for(old_text)
            if rects:
                print(f"  第{page_num+1:2d}頁：找到 {len(rects):2d} 個「{old_text}」")

            for rect in rects:
                font_info = detect_font_info(page, rect)
                page_tasks.append({
                    "rect":     rect,
                    "new_text": new_text,
                    "size":     font_info["size"],
                    "color":    font_info["color"]
                })
                # 用白色矩形遮蓋舊文字
                page.add_redact_annot(rect, fill=(1, 1, 1))
                total_replacements += 1

        # 套用所有遮蓋
        page.apply_redactions()

        # 插入替換文字
        for task in page_tasks:
            if not task["new_text"]:
                continue  # 純移除，不插入

            rect  = task["rect"]
            point = fitz.Point(rect.x0, rect.y1 - 1)  # 文字基線

            success = False

            # 優先使用中文字型
            if os.path.exists(chinese_font_path):
                try:
                    page.insert_text(
                        point,
                        task["new_text"],
                        fontname="msjhbd",
                        fontfile=chinese_font_path,
                        fontsize=task["size"],
                        color=task["color"]
                    )
                    success = True
                except Exception as e:
                    print(f"    ⚠ 中文字型失敗: {e}")

            # Fallback：使用內建字型
            if not success:
                try:
                    page.insert_text(
                        point,
                        task["new_text"],
                        fontsize=task["size"],
                        color=task["color"]
                    )
                except Exception as e:
                    print(f"    ✗ 插入失敗: {e}")

    doc.save(output_path, garbage=4, deflate=True)
    doc.close()

    print(f"\n✅ 完成！共替換 {total_replacements} 處文字")
    print(f"   輸出：{output_path}")
    return output_path


if __name__ == "__main__":
    input_path    = r"G:\我的雲端硬碟\2025_銓幻元_MCS相關資料\07_行銷素材\圖片素材\catalog DM 型錄20240617V1 (1).pdf"
    output_path   = r"G:\我的雲端硬碟\2025_銓幻元_MCS相關資料\07_行銷素材\圖片素材\MCS_產品型錄_20260622.pdf"
    chinese_font  = r"C:\Windows\Fonts\msjhbd.ttc"

    print("=== MCS 產品型錄品牌替換 ===")
    print(f"輸入：{input_path}")
    print(f"輸出：{output_path}")
    print()

    try:
        result = process_pdf(input_path, output_path, chinese_font)
    except Exception as e:
        print(f"\n❌ 錯誤：{e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
