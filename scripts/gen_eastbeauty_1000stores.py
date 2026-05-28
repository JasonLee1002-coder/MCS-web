"""
Generate 10億千店計畫 illustrations
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
        "filename": "thousand_stores_hero.jpg",
        "ratio": "16:9",
        "prompt": (
            "Epic cinematic wide-angle illustration of a massive food delivery fleet and restaurant network. "
            "Dramatic night scene with golden city lights. "
            "Foreground: 10+ branded delivery trucks/vans lined up in formation, warm gold and navy color scheme, "
            "each truck has '東方美實業' branding with a golden logo. "
            "Mid-ground: A glowing central headquarters building labeled '東方美 總部' with data streams radiating outward. "
            "Background: A panoramic Taiwan cityscape with hundreds of glowing store icons connected by golden network lines, "
            "like a neural network spreading across the city. "
            "Sky: Dark navy with subtle data visualization overlay showing '1,000 stores' growing network. "
            "This feels like a Tesla/Amazon logistics vision. Cinematic, aspirational, powerful. "
            "Color palette: Deep navy #0d2240, gold #f5c842, city amber lights. "
            "Mood: This is the future of restaurant chains in Taiwan."
        ),
    },
    {
        "filename": "coffee_bar_subbrand.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic interior photo of a premium semi-self-service coffee and tea bar. "
            "Small, sleek, modern kiosk-style space: 15-20 square meters. "
            "Beautiful floor-standing tea dispenser machine glowing warmly. "
            "German WMF coffee machine on counter. Smart pickup locker on the right wall. "
            "Minimal staff: one person managing, machines doing most work. "
            "QR code menu display. Warm amber and cream color scheme. "
            "Location: inside or attached to a main restaurant. "
            "The sub-brand feel: premium but approachable. "
            "Shot like a Kinfolk magazine interior feature. "
            "Sign reads: '茶飲 BAR' in elegant typography. "
            "Busy but efficient. Technology meets warmth."
        ),
    },
    {
        "filename": "supply_chain_hub.jpg",
        "ratio": "16:9",
        "prompt": (
            "Photorealistic editorial photo of a modern food supply chain operation center. "
            "Large clean warehouse space. "
            "Left: rows of branded delivery trucks (navy and gold, '東方美實業') loading up with food containers. "
            "Center: workers in uniforms packing semi-finished meal ingredients into sealed containers. "
            "Right: digital dispatch screen showing map of Taiwan with delivery routes and store locations. "
            "Overhead: banner reading '每日新鮮配送 · 半成品供應體系'. "
            "The whole operation is efficient, organized, modern. "
            "This is the backbone of the 1000-store system. "
            "Corporate food logistics editorial photography. "
            "Warm industrial lighting, navy and gold brand colors throughout."
        ),
    },
    {
        "filename": "franchise_store_small.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a small efficient semi-self-service restaurant storefront. "
            "15-25 square meters, street-front location in a busy Taiwan commercial area. "
            "Glass facade showing: self-ordering kiosk at entrance, smart locker on wall, "
            "tea dispenser machine visible. "
            "Signage: '東方美 × AI 智慧餐飲' in gold on navy background. "
            "Only one staff member visible inside. "
            "Evening scene with warm interior glow and street lights. "
            "This feels like a profitable, lean, scalable restaurant unit. "
            "People walking past, some stopping to look at the digital menu display. "
            "Modern Taiwan street scene. This is what 1000 stores look like."
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
    print(f"Generating {len(IMAGES)} 千店計畫 illustrations\n")
    for img in IMAGES:
        print(f"Generating {img['filename']}...")
        generate(img)
    print("\nDone.")
