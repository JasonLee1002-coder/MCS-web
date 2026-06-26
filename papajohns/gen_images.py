import requests, base64, os, time

import os
API_KEY = os.environ.get("GEMINI_API_KEY", "")
URL = f"https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key={API_KEY}"
OUT = os.path.dirname(os.path.abspath(__file__))

IMAGES = [
    ("pj_hero_wide.png",
     "Epic wide cinematic shot of a Papa John's restaurant storefront at golden hour in Taipei Taiwan. Bold red Papa John's signage glowing, warm inviting light through windows, busy urban street, Taiwanese pedestrians, modern city buildings behind. Photorealistic, editorial quality, warm tones, 16:9."),

    ("pj_pizza_artisan.png",
     "Overhead top-down flat lay of a perfect Papa John's pepperoni pizza on a rustic wooden table. Steam rising, melted mozzarella pull, vibrant red tomato sauce, fresh basil garnish. Commercial food photography, ultra sharp, warm studio lighting, Papa John's branded box open beside it. Rich saturated colors."),

    ("pj_store_bright.png",
     "Bright clean Papa John's Taiwan store interior. Modern red and white decor, clean countertop, digital menu boards with Papa John's red branding. Welcoming atmosphere, warm lighting, no people. Architectural interior photography, high-end commercial, 16:9 wide angle."),

    ("pj_delivery_problem.png",
     "Split scene showing delivery chaos in a dense Taipei apartment complex. Frustrated delivery rider on scooter navigating narrow alley, confused resident at door looking for missing package, crowded mailboxes, raining. Cinematic, dramatic documentary style, slightly desaturated moody tones."),

    ("pj_smart_clean.png",
     "Happy young Taiwanese couple scanning QR code on a sleek modern smart locker bank in a clean Papa John's Taiwan store. Bright red Papa John's branding on wall behind, locker door opening to reveal steaming pizza box, warm inviting lighting. Lifestyle commercial photography."),

    ("pj_origin_1984.png",
     "Nostalgic warm illustration of a small-town American pizza restaurant in 1984. Vintage Midwest USA town, red and white checkered tablecloths, jukebox in corner, young John Schnatter serving pizza with a smile, retro neon signs, warm amber lighting. Painterly editorial illustration style."),

    ("pj_taiwan_map.png",
     "Premium minimal infographic illustration of Taiwan island map with glowing red location pins spreading from Taipei south, showing network expansion. Dark navy blue background, red (#DA291C) accent color, clean modern design, Papa John's logo placement top right. High-end data visualization aesthetic."),

    ("grabox_bright_row.png",
     "Row of three modern sleek smart food locker units (GraBox) in a bright clean retail environment. Matte white and light grey cabinets, touchscreen panels, small round porthole windows glowing warm orange indicating heated food inside, subtle LED accent lighting. Product photography, clean studio white background, ultra sharp."),

    ("pj_kiosk_scene.png",
     "Young stylish Taiwanese woman using a large modern 27-inch self-ordering kiosk touchscreen in a Papa John's restaurant. Red and white Papa John's branded interface on screen, showing pizza menu. Clean modern store interior, warm lighting, lifestyle commercial photography, shallow depth of field."),

    ("pj_partnership.png",
     "Premium business partnership concept visual. Two modern hands shaking over a table with Papa John's pizza box, GraBox smart locker, and Taiwan city skyline visible through floor-to-ceiling windows in the background. Corporate lifestyle photography, warm tones, bokeh background."),
]

def gen(fname, prompt):
    print(f"Generating {fname}...")
    body = {"instances": [{"prompt": prompt}], "parameters": {"sampleCount": 1, "aspectRatio": "16:9"}}
    r = requests.post(URL, json=body, timeout=60)
    if r.status_code == 200:
        d = r.json()
        img_b64 = d["predictions"][0]["bytesBase64Encoded"]
        path = os.path.join(OUT, fname)
        with open(path, "wb") as f:
            f.write(base64.b64decode(img_b64))
        print(f"  ✓ Saved {fname}")
        return True
    else:
        print(f"  ✗ Error {r.status_code}: {r.text[:200]}")
        return False

for fname, prompt in IMAGES:
    gen(fname, prompt)
    time.sleep(1.5)

print("\nAll done.")
