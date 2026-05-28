"""
Generate satellite v3 — 8 scenario context images
Each image shows the EXACT device combination for that venue.
Device visual specs are embedded in each prompt for AI accuracy.
"""
import os, base64, requests, sys
sys.path.insert(0, os.path.dirname(__file__))
from _load_gemini_key import get_gemini_key

API_KEY = get_gemini_key()
MODEL   = "imagen-4.0-generate-001"
URL     = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:predict?key={API_KEY}"
OUT_DIR = r"C:\Users\JasonLee\claude_code_projects\CMO\public\images\eastbeauty"

os.makedirs(OUT_DIR, exist_ok=True)

# ── Device visual shorthand (embedded in prompts) ──────────────────────────
COFFEE = (
    "a compact countertop WMF-style professional automatic coffee machine, "
    "stainless steel body, 7-inch touchscreen display on front, "
    "QR code scan area, two group-head nozzles dispensing into a cup"
)
FRIDGE_LOCKER = (
    "a tall floor-standing smart refrigerated pickup locker cabinet (GraBox), "
    "dark navy matte body with gold trim, transparent glass front doors, "
    "LED-lit shelves showing cold bottled drinks and milk tea, "
    "small 7-inch touchscreen on the right side panel with QR code prompt"
)
FROZEN_LOCKER = (
    "a tall floor-standing smart freezer-refrigerator pickup locker cabinet (GraBox), "
    "dark navy matte body with gold trim, "
    "upper half transparent glass showing cold drinks in blue LED light, "
    "lower half frosted glass freezer section showing sealed frozen ramen cups and frozen meal pouches, "
    "cold vapor effect, small touchscreen on the right side panel"
)
RAMEN_STEAMER = (
    "a compact tabletop steam ramen cooker machine the size and shape of a professional coffee machine, "
    "matte black body, 5-inch touchscreen display on front, "
    "a steam nozzle port pointing into a sealed ramen cup placed below it, "
    "gentle steam rising from the nozzle"
)
VENDING = (
    "a tall modern smart vending machine with a large 21-inch full-color touchscreen display, "
    "transparent glass front showing colorful product grid — drinks, snacks, meal cups — "
    "touch-to-select interface visible on screen, NFC and QR payment panel on side"
)
TEA_DISPENSER = (
    "a tall 1.5-meter floor-standing commercial automatic milk tea and tea beverage dispenser, "
    "stainless steel and white body, multiple flavor selection buttons and a large touchscreen, "
    "dispensing a warm cup of milk tea from a front nozzle"
)
MICROWAVE_LOCKER = (
    "a wall-mounted smart microwave pickup locker cabinet, "
    "stainless steel finish, 4 compartment doors each with LED status indicator, "
    "a touchscreen panel on the side, one door open with steam rising from inside"
)

IMAGES = [
    # 01 — 中小旅館: 自助咖啡機 + 冷藏自取冰櫃
    {
        "filename": "sat_v3_hotel.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic interior photo of a cozy boutique hotel lobby self-service station. "
            "Small stylish hotel reception corner, warm wood tones and amber lighting. "
            "Against the wall: " + FRIDGE_LOCKER + ". "
            "On a nearby counter: " + COFFEE + ". "
            "One hotel guest in casual clothes scanning QR code on smartphone near the cabinet, "
            "another guest picking up a cold drink. "
            "No text or signage with words. Elegant 24-hour convenience. "
            "Magazine quality boutique hotel interior photography."
        ),
    },
    # 02 — 學生宿舍: 冷凍自取冰櫃 + 桌上蒸煮拉麵機
    {
        "filename": "sat_v3_dorm.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a university student dormitory common room at night. "
            "Bright fluorescent lighting, modern dormitory hallway. "
            "Against the wall: " + FROZEN_LOCKER + ". "
            "On the counter beside it: " + RAMEN_STEAMER + " with a sealed frozen ramen cup placed underneath the nozzle. "
            "A college student in casual clothes scanning phone QR code on the freezer cabinet. "
            "Another student placing a frozen sealed ramen cup into the steam cooker, steam rising. "
            "Energetic late-night student atmosphere. No text. Clean, modern, practical."
        ),
    },
    # 03 — 移工宿舍: 冷凍自取冰櫃 + 桌上蒸煮拉麵機 + 智慧販賣機
    {
        "filename": "sat_v3_worker.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a worker dormitory facility self-service food station. "
            "Clean functional common area in a modern industrial worker dormitory. "
            "Left side: " + FROZEN_LOCKER + ". "
            "Center counter: " + RAMEN_STEAMER + " with steam rising into a ramen cup. "
            "Right side: " + VENDING + ". "
            "Workers in work uniforms using smartphones to access equipment. "
            "Southeast Asian workers, diverse group, dignified representation. "
            "Practical 24-hour industrial facility lighting. No text."
        ),
    },
    # 04 — 診所候診區: 冷藏自取冰櫃 + 自助咖啡機
    {
        "filename": "sat_v3_clinic.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a clean modern medical clinic waiting area with self-service refreshment corner. "
            "Bright white clinic waiting room with comfortable chairs. "
            "In the corner: " + FRIDGE_LOCKER + " showing cold bottled water, herbal teas, healthy drinks. "
            "Beside it on a counter: " + COFFEE + ". "
            "A patient scanning QR code on smartphone, a family member picking up a drink. "
            "Calming, clean, medical-grade cleanliness aesthetic. Soft white lighting. "
            "No text, no medical equipment visible. Welcoming clinic atmosphere."
        ),
    },
    # 05 — 共享辦公: 自助智慧茶飲機 + 冷藏自取冰櫃
    {
        "filename": "sat_v3_cowork.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a stylish co-working space refreshment corner. "
            "Modern open-plan co-working space with exposed brick, pendant lights, green plants. "
            "Standing tall against the wall: " + TEA_DISPENSER + ". "
            "Beside it: " + FRIDGE_LOCKER + " showing cold brew coffee, kombucha, and healthy snacks. "
            "Young professionals in casual business attire — one selecting milk tea flavor, "
            "another grabbing a cold drink from the locker. "
            "Warm morning light through windows. No text. Productive startup aesthetic."
        ),
    },
    # 06 — 企業大樓: 冷凍自取冰櫃 + 桌上蒸煮拉麵機 + 自助微波取餐櫃
    {
        "filename": "sat_v3_office.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a modern corporate office floor break room with automated lunch station. "
            "Sleek corporate office, glass partition walls, polished floors. "
            "Left: " + FROZEN_LOCKER + " showing packaged salads and frozen ramen cups. "
            "Center counter: " + RAMEN_STEAMER + " with steam gently rising into a sealed ramen cup. "
            "Right wall-mounted: " + MICROWAVE_LOCKER + " with one door open, steam rising. "
            "Office workers in business attire — one opening the freezer locker with phone, "
            "another placing a frozen item in the steam cooker. "
            "Natural daylight, productive corporate atmosphere. No text."
        ),
    },
    # 07 — 社區大廳: 冷藏自取冰櫃 + 智慧販賣機
    {
        "filename": "sat_v3_community.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a Taiwan residential apartment building lobby with neighborhood convenience station. "
            "Ground floor lobby, tile floor, mailbox area visible. "
            "Against the wall: " + FRIDGE_LOCKER + " showing cold drinks, packaged snacks, bottled teas. "
            "Beside it: " + VENDING + ". "
            "Residents of different ages — an elderly woman with shopping bag using the vending machine touchscreen, "
            "a young couple grabbing drinks from the smart locker, a child looking curiously. "
            "Warm neighborhood community feeling, evening lighting. "
            "Welcoming, accessible, everyday convenience. No text."
        ),
    },
    # 08 — 醫院: 冷藏自取冰櫃 + 自助咖啡機
    {
        "filename": "sat_v3_hospital.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a hospital corridor or family waiting area with self-service refreshment station. "
            "Modern hospital public area, clean white and light blue color scheme. "
            "Along the wall: " + FRIDGE_LOCKER + " showing cold bottled water, nutrition drinks, healthy snacks, "
            "fruit pouches in bright LED compartments. "
            "On a counter beside it: " + COFFEE + " dispensing into a paper cup. "
            "A middle-aged woman using her smartphone near the fridge locker. "
            "An elderly patient in hospital clothes sitting nearby with a drink. "
            "Calm, clean, compassionate hospital atmosphere. Bright white lighting. No text."
        ),
    },
]


def generate(item):
    body = {
        "instances": [{"prompt": item["prompt"]}],
        "parameters": {"sampleCount": 1, "aspectRatio": item["ratio"]},
    }
    r = requests.post(URL, json=body, timeout=120)
    if r.status_code != 200:
        print(f"  ERROR {item['filename']}: {r.status_code} {r.text[:300]}")
        return False
    data = r.json()
    b64 = data["predictions"][0]["bytesBase64Encoded"]
    path = os.path.join(OUT_DIR, item["filename"])
    with open(path, "wb") as f:
        f.write(base64.b64decode(b64))
    print(f"  ✅ {item['filename']} saved")
    return True


if __name__ == "__main__":
    print(f"Generating {len(IMAGES)} satellite v3 scenario images\n")
    ok = 0
    for img in IMAGES:
        print(f"Generating {img['filename']}...")
        if generate(img):
            ok += 1
    print(f"\nDone. {ok}/{len(IMAGES)} generated.")
