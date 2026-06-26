import requests, base64, os, time

import os
API_KEY = os.environ.get("GEMINI_API_KEY", "")
URL = f"https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key={API_KEY}"
OUT = os.path.dirname(os.path.abspath(__file__))

IMAGES = [
    ("pj_origin_1984.png",
     "Vintage 1984 American small-town pizza restaurant. Warm amber interior, red and white decor, friendly staff serving pizza, jukebox in corner, neon signs, retro nostalgic atmosphere. Painterly editorial illustration style, warm tones."),

    ("pj_taiwan_map.png",
     "Premium minimal illustration of Taiwan island silhouette on dark navy background. Glowing red location pins spread across the island from north to south showing restaurant network expansion. Clean modern data visualization, red accent color, high-end infographic design."),

    ("grabox_bright_row.png",
     "Row of three sleek modern food pickup lockers in bright clean retail environment. White and light grey cabinets with touchscreen panels, small round windows glowing warm orange. Product photography, clean white background, ultra sharp."),

    ("pj_kiosk_scene.png",
     "Young stylish Asian woman using a large modern 27-inch self-ordering touchscreen kiosk in a clean bright restaurant. Digital menu on screen, red and white branded interface. Warm lifestyle commercial photography, shallow depth of field."),

    ("pj_blindbox_night.png",
     "Dramatic close-up of a red illuminated smart locker compartment with a question mark symbol glowing on it, dark moody background, mystery box concept, warm orange glow from inside the locker door. Premium food tech photography."),

    ("pj_franchise_show.png",
     "Modern trade show booth at a franchise exhibition in Taiwan. Clean red and white Papa John's branded display wall, GraBox smart locker unit on display, digital screens, professional exhibition design, business people examining the booth. Wide angle shot."),

    ("pj_gold_box.png",
     "A smart food locker door opening with dramatic golden light pouring out, star burst effect, celebration confetti falling, dark background. The moment of winning a lucky prize, cinematic dramatic photography."),

    ("pj_office_b2b.png",
     "Modern Taipei office building lobby at noon. Rows of smart lockers along one wall, office workers in business casual collecting their lunch boxes using smartphones to scan QR codes. Clean bright interior, organized and efficient atmosphere."),

    ("pj_japan_tourist.png",
     "Japanese tourists in Taipei night market area, discovering a Papa John's smart pickup station. Red branding visible, people using phones, Taipei city atmosphere with Japanese signage visible. Warm evening city photography."),
]

def gen(fname, prompt):
    path = os.path.join(OUT, fname)
    if os.path.exists(path):
        print(f"  skip {fname} (already exists)")
        return True
    print(f"Generating {fname}...")
    body = {"instances": [{"prompt": prompt}], "parameters": {"sampleCount": 1, "aspectRatio": "16:9"}}
    for attempt in range(2):
        try:
            r = requests.post(URL, json=body, timeout=60)
            if r.status_code == 200:
                d = r.json()
                if "predictions" in d and d["predictions"]:
                    img_b64 = d["predictions"][0]["bytesBase64Encoded"]
                    with open(path, "wb") as f:
                        f.write(base64.b64decode(img_b64))
                    print(f"  ✓ Saved {fname}")
                    return True
                else:
                    print(f"  ✗ No predictions: {str(d)[:200]}")
            else:
                print(f"  ✗ Error {r.status_code}: {r.text[:200]}")
        except Exception as e:
            print(f"  ✗ Exception: {e}")
        if attempt == 0:
            print("  Retrying in 3s...")
            time.sleep(3)
    return False

for fname, prompt in IMAGES:
    gen(fname, prompt)
    time.sleep(1.5)

print("\nAll done.")
