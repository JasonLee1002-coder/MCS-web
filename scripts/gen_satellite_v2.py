"""
Generate satellite v2 — 8 scenes (consensus version)
- 軍方 REMOVED → 診所候診區 ADDED
- 醫院/診所 ADDED as scene 8
- Device combos corrected per CSO/CFO review
- NO Chinese text in prompts (Imagen renders it incorrectly)
"""
import os, base64, requests, sys
sys.path.insert(0, os.path.dirname(__file__))
from _load_gemini_key import get_gemini_key

API_KEY = get_gemini_key()
MODEL   = "imagen-4.0-generate-001"
URL     = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:predict?key={API_KEY}"
OUT_DIR = r"C:\Users\JasonLee\claude_code_projects\CMO\public\images\eastbeauty"

os.makedirs(OUT_DIR, exist_ok=True)

IMAGES = [
    # 01 — 中小旅館/民宿
    {
        "filename": "sat_v2_hotel.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic interior photo of a cozy boutique hotel lobby with smart food and beverage station. "
            "Small stylish hotel reception area, warm wood tones and soft amber lighting. "
            "Against the wall: a sleek smart refrigerated pickup locker cabinet with glass doors, "
            "LED-lit compartments showing cold bottled drinks, iced coffee, packaged light snacks. "
            "Next to it: a compact tabletop automatic milk tea and coffee dispenser machine with touchscreen. "
            "One or two hotel guests in casual clothes using their smartphones near the cabinet. "
            "No text or signage with words. No staff needed. Elegant, functional, 24-hour available. "
            "Magazine quality boutique hotel interior photography, warm golden hour light."
        ),
    },
    # 02 — 大學學生宿舍
    {
        "filename": "sat_v2_dorm.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a university student dormitory common room with self-service food station. "
            "Modern dormitory hallway or common area at night, bright fluorescent lighting. "
            "Against the wall: a tall smart refrigerated locker with glass front showing cold drinks on top "
            "and frozen meal cups (sealed ramen cups, dumplings) in the lower freezer compartments. "
            "Right beside it: a compact commercial steam cooker machine with 4-6 compartments and digital timers, "
            "one compartment door open with steam rising. "
            "A college student in casual clothes scanning phone QR code on the cabinet, another student "
            "placing a frozen sealed cup into the steam cooker. "
            "Energetic late-night student atmosphere. No text. Clean, modern, practical."
        ),
    },
    # 03 — 移工宿舍
    {
        "filename": "sat_v2_worker.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a worker dormitory facility self-service food and drink station. "
            "Clean, functional common area in a modern industrial worker dormitory facility. "
            "Against the wall: a tall smart freezer-refrigerator pickup locker cabinet with glass front, "
            "showing cold drinks and sealed frozen meal cups in lower freezer section. "
            "Beside it: a compact smart vending machine with large touchscreen showing food photos and prices, "
            "colorful variety of products visible through glass. "
            "And a small steam cooker machine on a counter. "
            "Workers in work uniforms scanning smartphones to access the locker. "
            "Southeast Asian workers, diverse group, dignified representation. "
            "Practical, 24-hour, clean industrial facility lighting. No text."
        ),
    },
    # 04 — 診所候診區 (替換軍方)
    {
        "filename": "sat_v2_clinic.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a clean modern medical clinic waiting area with a smart beverage and snack station. "
            "Bright, clean clinic waiting room with white walls and comfortable chairs. "
            "In the corner: a sleek smart refrigerated pickup locker with glass front showing cold bottled water, "
            "herbal teas, healthy drinks, light snacks in LED-lit compartments. "
            "Beside it: a compact automatic milk tea and warm beverage dispenser with touchscreen. "
            "Patients and family members sitting in waiting area, one person scanning QR code on phone. "
            "Calming, clean, medical-grade cleanliness aesthetic. Soft white lighting. "
            "No text, no medical equipment visible. Welcoming family clinic atmosphere."
        ),
    },
    # 05 — 共享辦公空間
    {
        "filename": "sat_v2_cowork.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a stylish co-working office space with a premium beverage and snack bar corner. "
            "Modern open-plan co-working space with exposed brick, hanging pendant lights, and green plants. "
            "In the kitchen/bar area: a tall floor-standing commercial automatic tea and coffee dispenser machine "
            "glowing warmly, dispensing into a cup. "
            "Beside it: a smart refrigerated cabinet with glass doors showing cold brew coffee, "
            "kombucha, protein bars, healthy snacks in illuminated compartments. "
            "Young professionals in casual business attire — one picking up a drink, another working on laptop. "
            "Warm morning light streaming through windows. No text. WeWork startup aesthetic. Productive, vibrant."
        ),
    },
    # 06 — 企業大樓
    {
        "filename": "sat_v2_office.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a modern corporate office floor break room with smart automated lunch station. "
            "Sleek corporate office environment, glass partition walls and polished floors. "
            "Self-service lunch station: a tall smart refrigerator-freezer locker with glass front, "
            "upper section showing cold drinks and packaged salads, "
            "lower freezer section showing sealed ramen cups and bento containers. "
            "Beside it: a countertop commercial steam cooker with 4 compartments and LED countdown timers, "
            "steam gently rising. And a self-service microwave pickup cabinet on the right. "
            "Office workers in business attire — one opening the freezer locker with phone, "
            "another placing a sealed cup in the steam cooker. "
            "Natural daylight, productive corporate atmosphere. No text."
        ),
    },
    # 07 — 社區公寓
    {
        "filename": "sat_v2_community.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a Taiwan residential apartment building lobby with a neighborhood self-service station. "
            "Ground floor lobby of a modern apartment building, tile floor and mailbox area visible. "
            "Against the wall: a smart refrigerated pickup cabinet with glass front showing cold drinks, "
            "packaged snacks, bottled teas in LED-lit compartments. "
            "Beside it: a sleek smart touchscreen vending machine showing food and beverage options on screen. "
            "Residents of different ages — an elderly woman with shopping bag, a young couple, a child looking curiously. "
            "Warm neighborhood community feeling, evening lighting. "
            "Welcoming, accessible, everyday convenience. No text. Taiwan apartment building aesthetic."
        ),
    },
    # 08 — 醫院 (新增)
    {
        "filename": "sat_v2_hospital.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a hospital corridor or family waiting area with a self-service food and beverage station. "
            "Modern hospital public area with clean white and light blue color scheme, clean floors. "
            "Along the wall: a smart refrigerated self-pickup locker cabinet with glass doors, "
            "showing cold bottled water, nutrition drinks, healthy snacks, fruit pouches in bright LED compartments. "
            "Next to it: an automatic warm beverage dispenser (coffee, tea, soup) with touchscreen interface. "
            "A family member — a middle-aged woman — using her smartphone near the cabinet. "
            "An elderly patient in hospital clothes sitting nearby. "
            "Calm, clean, supportive hospital atmosphere. Bright white lighting. Compassionate design. No text."
        ),
    },
    # Network map — 8 nodes
    {
        "filename": "sat_v2_network_map.jpg",
        "ratio": "16:9",
        "prompt": (
            "Premium flat illustration style business infographic showing a hub and spoke network diagram. "
            "Dark deep navy blue background (#0d2240). "
            "Center: large glowing circular node with a restaurant/store building icon, golden glow, labeled with a star. "
            "8 satellite nodes connected by glowing gold lines radiating outward, each with a unique icon: "
            "1. Small hotel building icon, "
            "2. University/dormitory building icon, "
            "3. Factory/warehouse building icon, "
            "4. Medical cross clinic icon, "
            "5. Co-working desk/coffee icon, "
            "6. Office tower skyscraper icon, "
            "7. Apartment residential building icon, "
            "8. Hospital large building icon. "
            "Each satellite node has a small smart locker/cabinet icon beneath it. "
            "Gold (#f5c842) connecting lines with animated dot pulse effect illustrated as dashes. "
            "Deep navy and gold color palette throughout. "
            "Clean, minimal, professional McKinsey-quality strategy visualization. "
            "No text, only icons and visual elements."
        ),
    },
    # GraBox frozen unit product shot (revised — emphasize freezer)
    {
        "filename": "sat_v2_grabox_frozen.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic premium product photo of a smart self-service freezer and refrigerator pickup locker. "
            "Standing cabinet approximately 1.8 meters tall, sleek matte dark navy body with gold trim accents. "
            "Transparent glass front doors divided into sections: "
            "Top half (refrigerator, 4 degrees): cold drinks, bottled tea, iced coffee, milk tea bottles, glowing in cool blue LED light. "
            "Bottom half (freezer, -18 degrees): sealed frozen meal cups visible through frosted glass, cold vapor effect. "
            "Right side panel: a small 7-inch touchscreen showing a QR code scan prompt. "
            "Each compartment has individual LED indicators: green = available, amber = reserved. "
            "Studio product photography, dark gradient background, dramatic side lighting. "
            "Premium tech product aesthetic, minimal, clean. No text."
        ),
    },
    # Uber Eats pickup (refined)
    {
        "filename": "sat_v2_ubereats.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic editorial photo of a food delivery rider picking up an order from a smart locker cabinet. "
            "Evening urban street scene in Taiwan, warm streetlights. "
            "A delivery rider in a green jacket and helmet stands at a sleek illuminated smart locker cabinet mounted on a wall. "
            "The rider is scanning a QR code on the cabinet's side panel with a smartphone. "
            "One of the cabinet compartment doors is open, the rider reaching in to grab a sealed bag. "
            "Other compartments visible with green and amber LED indicators. "
            "Restaurant glass storefront visible in background. "
            "Atmosphere: efficient, modern, tech-enabled urban delivery. No text. Bloomberg editorial photo style."
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
    print(f"Generating {len(IMAGES)} satellite v2 images\n")
    ok = 0
    for img in IMAGES:
        print(f"Generating {img['filename']}...")
        if generate(img): ok += 1
    print(f"\nDone. {ok}/{len(IMAGES)} generated.")
