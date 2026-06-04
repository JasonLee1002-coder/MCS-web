"""
Relove × MCS — 智慧女性保養體驗站
生成 8 張品牌形象圖，風格：高端女性、玫瑰暖光、極簡奢華
"""
import os, base64, requests, sys
sys.path.insert(0, os.path.dirname(__file__))
from _load_gemini_key import get_gemini_key

API_KEY = get_gemini_key()
MODEL   = "imagen-4.0-generate-001"
URL     = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:predict?key={API_KEY}"
OUT_DIR = r"C:\Users\JasonLee\claude_code_projects\CMO\public\images\relove"

os.makedirs(OUT_DIR, exist_ok=True)

STYLE = (
    "luxury feminine aesthetic, soft rose and blush tones (#c74060 rose red accents), "
    "warm champagne and ivory palette, minimalist clean composition, "
    "natural diffused lighting, high-end beauty brand photography style, "
    "no text overlays, no watermarks, photorealistic, editorial quality"
)

IMAGES = [
    {
        "filename": "hero_bg.jpg",
        "prompt": (
            f"A modern minimalist bathroom in a luxury spa or upscale apartment. "
            "A sophisticated Asian woman in a soft white robe gently applying premium skincare serum to her face. "
            "Rose gold faucets and marble surfaces. Soft warm morning light through frosted glass. "
            "Skincare bottles with rose-toned labels arranged elegantly on the countertop. "
            f"Wide cinematic composition. {STYLE}"
        ),
    },
    {
        "filename": "station_yoga.jpg",
        "prompt": (
            "A premium women-only yoga and pilates studio interior. "
            "In the corner near the changing room area, a sleek tall smart vending station "
            "with a white and rose gold matte finish, 10-inch touchscreen display, "
            "glass front showing small premium skincare bottles and intimate care products "
            "arranged beautifully like a high-end boutique display. "
            "Wooden floors, natural plants, soft pink ambient lighting. "
            f"No people visible. {STYLE}"
        ),
    },
    {
        "filename": "station_clinic.jpg",
        "prompt": (
            "An upscale women's health clinic or gynecology waiting room in Taiwan. "
            "Soft cream walls, potted orchids, comfortable seating in blush pink. "
            "A discreet elegant slim smart locker station against the wall, "
            "white matte body with subtle rose gold trim, small tasteful display screen, "
            "no large branding visible, blends into the premium medical environment. "
            f"Empty room, daytime natural light. {STYLE}"
        ),
    },
    {
        "filename": "station_hotel.jpg",
        "prompt": (
            "A luxury 5-star hotel bathroom amenity area in Taiwan. "
            "Marble countertops, brass/rose gold fixtures, soft warm lighting. "
            "A compact elegant smart dispenser unit integrated into the bathroom vanity, "
            "white and rose gold finish, small QR code panel, "
            "premium skincare product bottles visible through a glass door. "
            f"No people. Photorealistic hotel photography. {STYLE}"
        ),
    },
    {
        "filename": "privacy_mode.jpg",
        "prompt": (
            "Close-up of a premium smart vending machine interface screen showing a purchase process. "
            "The screen has a soft pink privacy filter applied, making it hard to see from angles. "
            "A woman's hand (well-manicured, rose nail polish) tapping to select an intimate care product. "
            "The product packaging is elegant and discreet — no explicit product names visible. "
            "Bokeh background of a clean modern interior. "
            f"Macro photography style. {STYLE}"
        ),
    },
    {
        "filename": "membership_app.jpg",
        "prompt": (
            "A woman's hand holding a modern smartphone displaying a premium beauty loyalty app. "
            "The app UI has a clean white and rose design, showing: loyalty points balance (2,480 pts), "
            "recent purchase history (skincare items shown as elegant thumbnails), "
            "a push notification 'Time to replenish your serum — 20% off today'. "
            "Soft out-of-focus background of a stylish cafe or co-working space. "
            f"Lifestyle product photography. {STYLE}"
        ),
    },
    {
        "filename": "products_display.jpg",
        "prompt": (
            "A beautifully curated flat lay of premium skincare and intimate care products. "
            "Elegant minimal packaging in white, cream and rose tones. "
            "Small glass serums, intimate care gel bottles, body lotion, toner in rose-tinted bottles. "
            "Arranged on a white marble surface with dried rose petals and a few eucalyptus sprigs. "
            "Product labels are elegant but generic (no specific brand names). "
            f"Studio product photography, top-down angle. {STYLE}"
        ),
    },
    {
        "filename": "station_office.jpg",
        "prompt": (
            "A modern corporate women's restroom powder room in a premium office building in Taiwan. "
            "Clean marble walls, mirror with warm LED surround lighting, "
            "A tall slim smart beauty station in the corner — white matte cabinet, "
            "small rose gold touchscreen, glass window showing neatly stacked skincare products. "
            "Very discreet and elegant, no large signs or logos visible. "
            f"Interior architectural photography. {STYLE}"
        ),
    },
]

def generate(prompt: str, filename: str):
    out_path = os.path.join(OUT_DIR, filename)
    if os.path.exists(out_path):
        print(f"  ⏭  skip (exists): {filename}")
        return True

    body = {
        "instances": [{"prompt": prompt}],
        "parameters": {"sampleCount": 1, "aspectRatio": "16:9"}
    }
    resp = requests.post(URL, json=body, timeout=120)
    if resp.status_code != 200:
        print(f"  ❌ {filename}: {resp.status_code} {resp.text[:200]}")
        return False

    data = resp.json()
    b64  = data["predictions"][0]["bytesBase64Encoded"]
    with open(out_path, "wb") as f:
        f.write(base64.b64decode(b64))
    print(f"  ✅ {filename}")
    return True

if __name__ == "__main__":
    print(f"生成 {len(IMAGES)} 張 Relove 品牌圖 → {OUT_DIR}\n")
    for img in IMAGES:
        generate(img["prompt"], img["filename"])
    print("\n完成！")
