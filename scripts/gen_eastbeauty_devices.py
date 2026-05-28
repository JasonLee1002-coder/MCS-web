"""
Generate tech device illustrations for 東方美 × MCS 科技自助餐廳
Using Gemini Imagen 4
"""
import os, base64, requests

API_KEY = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_GENERATIVE_AI_API_KEY")
MODEL   = "imagen-4.0-generate-001"
URL     = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:predict?key={API_KEY}"
OUT_DIR = r"C:\Users\JasonLee\claude_code_projects\CMO\public\images\eastbeauty"

os.makedirs(OUT_DIR, exist_ok=True)

IMAGES = [
    {
        "filename": "device_milk_tea.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic product photo of a premium tabletop automatic milk tea machine. "
            "Sleek black matte chassis with a transparent glass front showing internal mechanism and ingredient tanks. "
            "7-inch touchscreen on the left with digital menu interface showing bubble tea options. "
            "Professional studio lighting with soft shadows. Dark background with subtle navy gradient. "
            "High-end kitchen appliance aesthetic, like a Nespresso machine but for milk tea. "
            "Clean, modern, premium. Brand: MCS Smart Beverages. Shot like Apple product photography."
        ),
    },
    {
        "filename": "device_coffee_wmf.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic product photo of a professional German WMF tabletop coffee machine in a modern restaurant setting. "
            "Stainless steel body with chrome accents, digital display showing espresso options. "
            "Steam wand on the side. Placed on a sleek dark wood counter in a sophisticated restaurant bar area. "
            "Warm ambient lighting, bokeh background of restaurant interior. "
            "Premium commercial coffee equipment aesthetic. Shot like a hospitality industry magazine photo. "
            "High contrast, sharp focus on the machine details."
        ),
    },
    {
        "filename": "device_kiosk.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a modern self-ordering kiosk in a contemporary Asian restaurant. "
            "Tall freestanding kiosk with a large 21-inch touchscreen displaying a colorful digital menu in Chinese. "
            "The screen shows food photos, prices, and QR code scanning option. "
            "Queue number display shows 'A023 — Now Serving A021'. "
            "Sleek dark metallic frame with LED accent lighting at the base. "
            "Set against a warm restaurant interior background. Customer interaction zone. "
            "Shot like a tech retail magazine, professional lighting, slightly elevated angle."
        ),
    },
    {
        "filename": "device_smart_locker.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a smart refrigerated pickup locker for food service. "
            "Tall cabinet with 8-10 individual compartments, each with a clear frost-free door and bright LED interior lighting. "
            "Green LED glow when compartment is ready. Small touchscreen panel on the side showing 'Scan QR to Pickup'. "
            "Sleek white and chrome design, modern food tech aesthetic. "
            "Installed against a clean wall in a restaurant lobby. "
            "Looks like a high-end automated food pickup station. "
            "Professional editorial photography, sharp and clean."
        ),
    },
    {
        "filename": "device_steam_cooker.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic product photo of an industrial commercial automatic steam cooker machine. "
            "Large stainless steel body with multiple steam compartments for ramen noodles and dim sum. "
            "Digital control panel with temperature, timer, and program settings. "
            "Steam visibly rising from the top. Multiple trays visible through a tempered glass door. "
            "Professional kitchen equipment aesthetic. Placed in a modern semi-open kitchen. "
            "Dim sum bamboo baskets and ramen bowls nearby. "
            "Warm kitchen lighting, professional food industry photography."
        ),
    },
    {
        "filename": "device_microwave_locker.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a self-service smart microwave cabinet station in a modern food court. "
            "Cabinet with 4-6 individual microwave units stacked vertically, each with its own door and controls. "
            "QR code scanner panel on each unit with digital display showing 'Scan to Open & Heat'. "
            "Blue LED status indicator shows which units are in use. "
            "Sleek dark grey matte finish with orange accent lighting. "
            "Customer scanning phone QR code on one unit. The door automatically opens. "
            "Self-service food warming station aesthetic. Clean, tech-forward design. "
            "Shot in a bright modern food court environment."
        ),
    },
    {
        "filename": "hero_restaurant_wide.jpg",
        "ratio": "16:9",
        "prompt": (
            "Photorealistic wide-angle architectural photo of a stunning modern tech-enabled restaurant interior. "
            "Industrial chic design: exposed brick walls, 6-meter high warehouse ceiling with steel beams, large windows. "
            "Left side: long bar counter with high stools. Center: self-ordering kiosk at entrance. "
            "Right: smart food pickup locker with green LED compartments. "
            "Background: semi-open stainless steel kitchen. Dining tables with QR code stands. "
            "Warm atmospheric lighting mixed with cool blue tech accents. "
            "Kaohsiung Pier-2 art district warehouse vibe meets Silicon Valley tech startup. "
            "Empty, pristine, ready for opening. Magazine architectural photography quality."
        ),
    },
    {
        "filename": "strategy_map.jpg",
        "ratio": "16:9",
        "prompt": (
            "Stylized strategic infographic illustration of Taiwan island with city network nodes. "
            "Dark navy background (#0d2240). Gold glowing nodes on Kaohsiung (large, marked as 'Phase 1 旗艦店'), "
            "and several other cities with smaller nodes marked 'Phase 2', 'Phase 3'. "
            "Animated-style connecting lines between nodes in gold (#f5c842). "
            "Restaurant icon, AI chip icon, and smart device icons at each node. "
            "Clean flat illustration with depth and glow effects. "
            "Title: '東方美 AI 展店策略'. "
            "Premium business infographic style, like McKinsey strategy slide visualization."
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
    print(f"  ✅ {item['filename']} saved → {path}")
    return True

if __name__ == "__main__":
    print(f"Generating {len(IMAGES)} device illustrations for 東方美 AI 餐廳\n")
    success = 0
    for img in IMAGES:
        print(f"Generating {img['filename']}...")
        if generate(img):
            success += 1
    print(f"\nDone. {success}/{len(IMAGES)} images generated → {OUT_DIR}")
