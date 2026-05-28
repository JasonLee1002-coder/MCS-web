"""
Generate v2 device illustrations for 東方美 × MCS 半自助科技餐廳
Using Gemini Imagen 4
"""
import os, base64, requests

API_KEY = "AIzaSyCRpV_VfVujaJ99PMd_33qR9AjvnabkY4g"
MODEL   = "imagen-4.0-generate-001"
URL     = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:predict?key={API_KEY}"
OUT_DIR = r"C:\Users\JasonLee\claude_code_projects\CMO\public\images\eastbeauty"

os.makedirs(OUT_DIR, exist_ok=True)

IMAGES = [
    {
        "filename": "device_tea_dispenser.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic product photo of a premium commercial floor-standing automatic bubble tea / milk tea dispenser machine. "
            "Professional stainless steel body, 1.5 meters wide, with 6-8 large transparent ingredient tanks on top filled with colored liquids. "
            "Digital touchscreen control panel in the center showing tea menu. "
            "Multiple dispensing nozzles at the front. Modern Japanese commercial kitchen appliance aesthetic. "
            "Placed in a sleek modern tea shop environment with soft warm lighting. "
            "Semi-automatic: staff places empty cup, machine automatically dispenses tea. "
            "High-end product photography, white to light grey gradient background. Sharp, clean, professional."
        ),
    },
    {
        "filename": "device_ramen_steamer.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a commercial semi-automatic steam ramen cooker machine in a restaurant kitchen. "
            "Stainless steel body with 4-6 individual steam compartments, each with a timer display and LED status light. "
            "Each compartment holds one sealed food cup/container. "
            "Staff member's hands (gloved) placing a sealed ramen cup into one of the compartments. "
            "Digital panel shows countdown: '3:30 remaining'. Steam gently rising. "
            "Semi-automatic concept: human loads cup, machine handles all cooking. "
            "Warm professional kitchen lighting, clean stainless steel environment. "
            "Magazine quality food industry photography. Japanese commercial kitchen aesthetic."
        ),
    },
    {
        "filename": "semi_auto_concept.jpg",
        "ratio": "16:9",
        "prompt": (
            "Premium business infographic illustration showing the 'Semi-Self-Service' restaurant concept. "
            "Dark navy background (#0d2240) with gold accents (#f5c842). "
            "Five stations arranged horizontally with connecting arrows: "
            "1) Self-order kiosk with person touching screen, "
            "2) Auto tea dispenser machine dispensing drink, "
            "3) Steam cooker with sealed cup going in, "
            "4) Smart food locker with glowing green compartment opening, "
            "5) QR code mobile payment. "
            "Above each station: icon showing human role vs machine role split. "
            "Text overlay: '人機協作 · 2人操作全店' (Human-Machine Collaboration). "
            "Clean modern infographic, flat illustration with 3D depth. "
            "Gold numbered steps, white Chinese text labels. Professional strategy presentation quality."
        ),
    },
    {
        "filename": "ramen_cup_product.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic product photo of premium sealed ramen cup containers for commercial restaurant use. "
            "5-6 different varieties arranged on a dark wood table: "
            "Rich tonkotsu pork ramen, Spicy mala noodles, Chicken soup noodles, Curry rice, Tom yum noodles. "
            "Each in a sealed cylindrical container with colorful Chinese food photography labels. "
            "Appetizing steam rising from one open cup showing beautiful noodles with toppings. "
            "Premium instant-fresh concept: not cheap instant noodles, but restaurant-quality sealed meals. "
            "Warm moody food photography lighting. Bokeh background. "
            "High-end meal kit aesthetic, like Michelin street food quality."
        ),
    },
    {
        "filename": "expansion_blueprint.jpg",
        "ratio": "16:9",
        "prompt": (
            "Stylized business strategy illustration showing restaurant expansion blueprint. "
            "Dark navy background. "
            "Left side: One flagship restaurant building labeled '東方美 駁二旗艦' with golden glow. "
            "Center: Large arrow pointing right labeled '半自助模組標準化'. "
            "Right side: Three smaller restaurant buildings in a row, labeled Phase 2 and Phase 3. "
            "Below each new store: icons showing '2人運作', '成本-40%', '3天開店'. "
            "Gold connecting lines showing the replication process. "
            "MCS logo/chip icon in center as the technology hub connecting all stores. "
            "Clean, sophisticated business visualization. McKinsey strategy slide quality. "
            "Gold (#f5c842) and navy (#0d2240) color scheme throughout."
        ),
    },
    {
        "filename": "semi_auto_hero.jpg",
        "ratio": "16:9",
        "prompt": (
            "Dramatic wide-angle photo of a futuristic semi-self-service restaurant interior at night. "
            "Beautiful atmospheric lighting: warm amber from ceiling, cool blue from device screens. "
            "Left: glowing floor-standing tea dispenser machine in action. "
            "Center: customer at ordering kiosk touching screen. "
            "Right: illuminated smart food locker with green LED compartments. "
            "Background: semi-open kitchen with steam rising from ramen cooker. "
            "One smiling staff member visible, clearly not busy — the machines are doing the work. "
            "Text invisible. Pure cinematic visual storytelling. "
            "This is the future of restaurant: efficient, beautiful, tech-enabled. "
            "Shot like a Wallpaper magazine architecture feature. Stunning."
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
    print(f"Generating {len(IMAGES)} v2 illustrations\n")
    success = 0
    for img in IMAGES:
        print(f"Generating {img['filename']}...")
        if generate(img):
            success += 1
    print(f"\nDone. {success}/{len(IMAGES)} images generated.")
