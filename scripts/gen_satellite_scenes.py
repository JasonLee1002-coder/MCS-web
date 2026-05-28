"""
Generate satellite location scenes for GraBox 智取冰櫃 衛星擴散網
Using Gemini Imagen 4
"""
import os, base64, requests

import sys as _sys; _sys.path.insert(0,__import__("os").path.dirname(__file__))
from _load_gemini_key import get_gemini_key
API_KEY = get_gemini_key()
MODEL   = "imagen-4.0-generate-001"
URL     = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:predict?key={API_KEY}"
OUT_DIR = r"C:\Users\JasonLee\claude_code_projects\CMO\public\images\eastbeauty"

os.makedirs(OUT_DIR, exist_ok=True)

IMAGES = [
    {
        "filename": "satellite_hotel.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a premium hotel lobby smart convenience station. "
            "Elegant hotel lobby with marble floors and soft lighting. "
            "A sleek refrigerated smart locker cabinet with clear glass doors, "
            "LED-lit compartments showing cold drinks, bottled water, coffee cups, and packaged snacks. "
            "QR code scanner panel on the side. "
            "A modern touchscreen ordering kiosk next to it. "
            "Hotel guests in business attire scanning phones to open the cabinet. "
            "Warm amber lobby lighting, luxury hotel aesthetic. "
            "Small elegant sign reading '24H 智慧取餐 · 掃碼自取'. "
            "One staff member visible in background at concierge desk. "
            "Seamless, tech-enabled hospitality experience. "
            "Magazine quality interior hotel photography."
        ),
    },
    {
        "filename": "satellite_student_dorm.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a university student dormitory smart food station. "
            "Modern dormitory corridor or common room. "
            "Large illuminated smart refrigerated locker unit on wall: "
            "upper compartments show cold drinks and bubble tea, lower compartments show frozen meal cups. "
            "Adjacent: compact automatic ramen steam cooker machine. "
            "College students in casual clothes, one scanning phone to open locker, "
            "another placing a frozen noodle cup into the steam cooker. "
            "Bright, energetic student living environment. "
            "Digital display showing menu options and prices. "
            "Late night snack culture vibe. "
            "Clean, modern, practical. "
            "Taiwan university dormitory aesthetic."
        ),
    },
    {
        "filename": "satellite_migrant_worker.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a smart food vending station in a workers' dormitory facility. "
            "Clean, functional common area in a modern industrial worker dormitory. "
            "Smart refrigerated locker cabinet with multiple compartments: "
            "showing variety of Asian food options, drinks, instant noodles, packed meals. "
            "Southeast Asian workers in work clothes scanning QR codes on phones. "
            "Compact steam cooker machine next to the locker. "
            "Multilingual interface (Chinese, Vietnamese, Indonesian) visible on screen. "
            "Practical, 24-hour available self-service. "
            "Clean industrial facility lighting. "
            "Dignified, respectful representation of workers."
        ),
    },
    {
        "filename": "satellite_military.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a smart self-service food station inside a military base facility. "
            "Clean, functional military canteen or recreation area. "
            "Sleek refrigerated smart locker unit with glass doors showing cold drinks, "
            "packed meals, energy snacks, and noodle cups. "
            "Military personnel in uniform scanning phones or ID cards to access compartments. "
            "Steam cooker machine mounted on adjacent counter. "
            "Digital display showing daily menu options. "
            "Clean, organized, efficient. Military green and grey color scheme. "
            "24-hour operational, minimal staff required. "
            "Professional, disciplined environment. Taiwan ROC military context."
        ),
    },
    {
        "filename": "satellite_coworking.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a smart beverage and food bar in a modern co-working office space. "
            "Stylish open office with exposed brick, plants, and pendant lights. "
            "Premium semi-self-service bar station: "
            "automatic floor-standing tea/coffee dispenser machine glowing warmly, "
            "beside a refrigerated smart locker showing cold brew coffee, bottled drinks, healthy snacks. "
            "Young professionals in casual business attire scanning phones to pick up orders. "
            "QR code menu board showing morning options. "
            "No cashier, completely self-serve. "
            "Productive, energetic WeWork/startup aesthetic. "
            "Shot like a tech startup interior feature. Warm morning light."
        ),
    },
    {
        "filename": "satellite_corporate.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a smart food kiosk station in a corporate office building lobby or floor. "
            "Modern corporate office environment, glass and steel interior. "
            "Smart station unit: tall refrigerated locker with LED compartments showing "
            "premium packed lunches, cold drinks, coffee bottles, desserts. "
            "Adjacent automatic coffee machine and QR kiosk. "
            "Office workers in business attire using phones to purchase and retrieve items. "
            "Digital signage showing daily lunch specials from '東方美 AI 餐飲'. "
            "Clean, professional, premium corporate catering alternative. "
            "High-rise office building aesthetic, natural daylight. "
            "This replaces the lunch run — right in your building."
        ),
    },
    {
        "filename": "satellite_community.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a neighborhood community smart food and beverage station. "
            "Ground floor of a Taiwan residential apartment building or community center. "
            "Compact self-service station installed against the wall: "
            "refrigerated smart locker showing cold drinks, bento boxes, snacks, frozen meals. "
            "Compact steam cooker for self-heating ramen. "
            "Small QR code tea/coffee dispenser. "
            "Residents of different ages: elderly person scanning phone, young mother with child watching. "
            "Warm neighborhood community feeling. "
            "Taiwan apartment building lobby aesthetic with tile floors. "
            "Sign: '24H 鄰里智慧取餐站 · 掃碼即取'. "
            "Practical, accessible, community-focused."
        ),
    },
    {
        "filename": "grabox_cold_unit.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic premium product photo of a GraBox smart refrigerated pickup locker unit. "
            "Sleek standing cabinet, approximately 1.8 meters tall, 1.2 meters wide. "
            "Transparent glass front doors showing: "
            "top 4 rows: cold drinks (bottled tea, coffee, juice, bubble tea), "
            "bottom 3 rows: frozen meal cups (ramen, hot pot), packed food items. "
            "Each compartment has bright LED lighting, green indicator when available. "
            "Right side panel: 7-inch touchscreen showing QR scan prompt and menu. "
            "Bottom: logo panel 'GraBox by MCS' in navy and gold. "
            "Studio product photography, dark navy gradient background, "
            "soft studio lighting highlighting the cabinet. "
            "Premium tech product aesthetic, like an Apple Store display unit."
        ),
    },
    {
        "filename": "satellite_network_map.jpg",
        "ratio": "16:9",
        "prompt": (
            "Premium business infographic illustration of a hub-and-spoke satellite network map. "
            "Dark navy background (#0d2240). "
            "Center: large glowing node labeled '東方美 AI 主店' with a restaurant icon. "
            "Radiating outward: 7 satellite nodes connected by gold lines, each with icon and label: "
            "1. Hotel building icon '酒店飯店', "
            "2. Dormitory building '學生宿舍', "
            "3. Factory building '移工宿舍', "
            "4. Military symbol '軍方', "
            "5. Office tower '商辦', "
            "6. Corporate building '企業大樓', "
            "7. Apartment block '社區'. "
            "Each satellite node shows a small GraBox locker icon. "
            "Gold data flow lines pulsing between center and satellites. "
            "Small MCS chip icon at center labeled 'AI 管理中台'. "
            "Clean flat illustration, deep professional look. "
            "McKinsey strategy visualization quality. "
            "Title text: '智取冰櫃 衛星擴散網' in gold at top."
        ),
    },
    {
        "filename": "ubereats_grabox_pickup.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic editorial photo of an Uber Eats delivery rider picking up an order from a GraBox smart locker. "
            "Modern restaurant entrance with a GraBox illuminated cabinet mounted on wall. "
            "Uber Eats delivery rider in green jacket and helmet scanning QR code on cabinet panel. "
            "Compartment door automatically opening, rider reaching in to grab a bag. "
            "Other compartments visible: some lit green (available), some orange (reserved for delivery). "
            "Restaurant visible in background through glass. "
            "Evening street scene, Taiwan urban setting with warm street lights. "
            "GraBox branding: 'GraBox by MCS' in navy and gold on cabinet. "
            "Shot like a Bloomberg tech editorial photo. "
            "Atmosphere: efficient, modern, tech-enabled food delivery ecosystem."
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
    print(f"Generating {len(IMAGES)} satellite scene illustrations\n")
    ok = 0
    for img in IMAGES:
        print(f"Generating {img['filename']}...")
        if generate(img): ok += 1
    print(f"\nDone. {ok}/{len(IMAGES)} generated.")
