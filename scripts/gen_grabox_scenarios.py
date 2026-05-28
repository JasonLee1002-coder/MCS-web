"""
Generate GraBox application scenario illustrations — heavy Uber Eats visual identity
Green uniforms, helmets, scooters, branded bags throughout every image
"""
import os, base64, requests

API_KEY = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_GENERATIVE_AI_API_KEY")
MODEL   = "imagen-4.0-generate-001"
URL     = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:predict?key={API_KEY}"
OUT_DIR = r"C:\Users\JasonLee\claude_code_projects\CMO\docs\clients\assets\haibo_ubereats\scenarios"
os.makedirs(OUT_DIR, exist_ok=True)

# Shared Uber Eats visual DNA injected into every prompt
UE = (
    "Uber Eats delivery rider wearing bright green Uber Eats jacket and green branded helmet. "
    "A white electric scooter with a large green Uber Eats insulated delivery box on the back. "
    "Green Uber Eats paper bags with the logo inside the locker compartments. "
    "GraBox locker has Uber Eats green (#06C167) branded panel and logo. "
)

IMAGES = [
    # ── TYPE 1: 外牆式 (Exterior Wall Mount) ──────────────────────────────
    {
        "filename": "type1-breakfast-wall.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic editorial photo, 8AM morning rush. "
            "GraBox smart locker with Uber Eats green branding flush-mounted into the exterior glass wall "
            "of a busy Taiwanese breakfast shop (麥味登 style, green storefront sign). "
            "Inside, a staff member in apron places breakfast bags into numbered transparent compartments. "
            "Outside on the sidewalk, an Uber Eats rider in full green uniform and green helmet "
            "scans QR code on the locker touchscreen — their white scooter with green delivery box parked behind. "
            "Green Uber Eats paper bags visible through transparent glass. "
            "Morning golden hour, authentic Taiwan neighborhood street. "
            "Like McDonald's drive-through window but for food delivery. "
            + UE +
            "Bloomberg Businessweek editorial quality, sharp focus."
        ),
    },
    {
        "filename": "type1-bubbletea-wall.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo, afternoon peak hour. "
            "GraBox locker with Uber Eats green panel embedded in exterior facade of a popular "
            "Taiwanese bubble tea shop (similar to Tiger Sugar, colorful branding). "
            "Sealed cups of pearl milk tea sit in numbered compartments, LED glowing green. "
            "Two Uber Eats riders — both in green jackets and green branded helmets — "
            "simultaneously scan QR codes on different compartments. "
            "Their white scooters with green Uber Eats boxes are parked on the sidewalk. "
            "Green Uber Eats branded sticker on each cup. "
            "Queue of walk-in customers visible inside the shop. "
            + UE +
            "Taiwan urban street, vivid colors, editorial photography."
        ),
    },
    {
        "filename": "type1-fastfood-wall.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic wide-angle architectural photo. "
            "Large multi-column GraBox locker wall — Uber Eats green branded facade — "
            "installed on the exterior wall of a busy Taiwan fast food restaurant. "
            "Three Uber Eats riders in green jackets, green helmets, picking up orders simultaneously. "
            "Their white scooters with large green Uber Eats boxes lined up in front. "
            "Compartments glow green and amber, showing ready and in-progress orders. "
            "Green Uber Eats bags clearly visible in each compartment through glass. "
            "Taipei city intersection background, rush hour, dramatic perspective shot. "
            + UE +
            "Shows scale of the system. Magazine cover quality."
        ),
    },

    # ── TYPE 2: 外掛式 (Add-on / Table Mount) ─────────────────────────────
    {
        "filename": "type2-bento-table.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo inside a Taiwanese lunch box (便當) restaurant. "
            "Compact GraBox unit with Uber Eats green branding sits on a dedicated table near entrance. "
            "6 transparent compartments — numbered, each with LED status light. "
            "Staff member in apron places a green Uber Eats branded lunch box bag into compartment 3. "
            "Through the glass entrance door, an Uber Eats rider in green uniform and green helmet "
            "approaches — white scooter with green delivery box visible on the street. "
            "Warm midday light, clean organized interior. "
            + UE +
            "Practical, efficient, shows zero renovation needed. Editorial photography."
        ),
    },
    {
        "filename": "type2-cafe-counter.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a modern Taiwanese cafe interior (cama / 路易莎 style). "
            "Sleek GraBox pickup locker with Uber Eats green accent panel on a counter near entrance. "
            "Coffee cups in green Uber Eats bags inside the transparent compartments. "
            "Barista in background makes coffee while an Uber Eats rider — green jacket, green helmet — "
            "opens a compartment using the touchscreen. "
            "Rider's white scooter with Uber Eats green box visible through the cafe's glass window. "
            "Minimalist wood-and-white cafe decor, soft warm lighting. "
            + UE +
            "Instagram-quality photo, aspirational lifestyle meets delivery efficiency."
        ),
    },
    {
        "filename": "type2-nightmarket-stall.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic night photography of a Taiwanese night market stall (夜市). "
            "A compact GraBox unit with Uber Eats green LED trim sits beside the food stall counter. "
            "Inside compartments: green Uber Eats bags with 鹹酥雞 fried chicken and oyster vermicelli. "
            "The stall owner places an order while an Uber Eats rider in full green uniform "
            "and green helmet scans QR code. White scooter with green Uber Eats box behind the rider. "
            "Vibrant night market atmosphere — red lanterns, neon signs, crowds of people. "
            "GraBox glows green in the night scene, like a beacon. "
            + UE +
            "Cinematic night photography, warm food tones, energetic Taiwan street culture."
        ),
    },
    {
        "filename": "type2-japanese-restaurant.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a mid-range Japanese restaurant in Taipei. "
            "Premium GraBox unit with Uber Eats green panel on an elegant wooden stand near entrance. "
            "Ramen containers and sushi boxes in green Uber Eats branded bags inside compartments. "
            "Uber Eats rider — green jacket, green helmet with Uber Eats logo — "
            "politely opens a compartment. White scooter with green box visible outside glass door. "
            "Japanese minimalist interior — shoji screens, bamboo, warm wood tones. "
            "Uniformed restaurant staff bows slightly in background. "
            + UE +
            "Premium quality photography, shows GraBox fits any restaurant aesthetic."
        ),
    },
    {
        "filename": "type2-drinks-shop-counter.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a Taiwanese traditional drinks and breakfast counter shop. "
            "GraBox compact unit with Uber Eats green branding placed right on the serving counter. "
            "Soy milk, egg pancake rolls, in green Uber Eats bags visible through glass compartments. "
            "Young female shop owner places order into locker with one hand, takes next order with other. "
            "Uber Eats rider in green jacket and helmet stands at counter scanning QR code. "
            "White scooter with green Uber Eats box parked right outside. "
            "Morning rush atmosphere, steam from kitchen, local Taiwan vibe. "
            + UE +
            "Warm and human photography. Shows how seamless the workflow becomes."
        ),
    },

    # ── TYPE 3: 免整合單機 (Standalone, Zero POS Integration) ──────────────
    {
        "filename": "type3-standalone-simple.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a small Taiwanese fried chicken snack shop (鹹酥雞). "
            "A single compact GraBox unit with Uber Eats green branding sits on the counter. "
            "The owner — middle-aged Taiwanese man in blue apron — smiles as he places "
            "a green Uber Eats bag of fried items into the locker with one hand, "
            "his other hand holds his phone showing the Uber Eats order screen — no POS system anywhere. "
            "Uber Eats rider in green jacket and helmet waits, green scooter and box behind. "
            "Above the locker: small handwritten sign in Chinese '免POS · 直接上線'. "
            + UE +
            "Warm, humble, approachable. Shows any small shop can use this immediately."
        ),
    },
    {
        "filename": "type3-no-pos-workflow.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo showing the simple 3-step workflow. "
            "Split view: LEFT — Uber Eats app on restaurant owner's smartphone showing new order. "
            "CENTER — Owner's hands placing green Uber Eats bag into GraBox compartment (Uber Eats green panel). "
            "RIGHT — Uber Eats rider in green jacket scans QR code and compartment opens automatically. "
            "No computer, no POS terminal, no complex setup visible anywhere. "
            "Clean white background with subtle kitchen context. "
            "Graphic but photorealistic, instructional quality. "
            + UE +
            "Shows zero-integration simplicity. App → Locker → Rider. Three steps only."
        ),
    },

    # ── TYPE 4: Future AI / Expansion ──────────────────────────────────────
    {
        "filename": "type4-ai-evolution.jpg",
        "ratio": "16:9",
        "prompt": (
            "Futuristic yet photorealistic editorial image. "
            "A next-generation GraBox locker wall with Uber Eats green branding and AI interface. "
            "The large touchscreen shows multiple AI features: "
            "loyalty member points display, special meal recommendations, off-peak deals, "
            "real-time analytics dashboard, cultural merchandise section. "
            "A customer uses the screen to check points while an Uber Eats rider in green jacket picks up. "
            "Holographic-style data visualization panels float around the locker. "
            "Uber Eats green and white color scheme throughout. "
            "White scooter with green Uber Eats box in background. "
            + UE +
            "Bloomberg Businessweek future-tech style. Aspirational but grounded in reality."
        ),
    },
    {
        "filename": "type4-member-loyalty.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a customer using GraBox locker's member loyalty feature. "
            "The GraBox touchscreen (Uber Eats green branded) shows a member profile, "
            "accumulated points, exclusive member deal, and a QR code for pickup. "
            "The customer — young Taiwanese woman — smiles at the screen while scanning her member QR. "
            "An Uber Eats rider in green jacket and helmet, green scooter visible outside. "
            "The locker compartment has a special 'Member Pick' label glowing gold. "
            "Modern restaurant lobby context. "
            + UE +
            "Shows future potential: GraBox as a loyalty and engagement touchpoint, not just delivery."
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
        print(f"  ERROR {item['filename']}: {r.status_code} {r.text[:200]}")
        return False
    data = r.json()
    b64 = data["predictions"][0]["bytesBase64Encoded"]
    path = os.path.join(OUT_DIR, item["filename"])
    with open(path, "wb") as f:
        f.write(base64.b64decode(b64))
    print(f"  ✅ {item['filename']}")
    return True

if __name__ == "__main__":
    total = len(IMAGES)
    print(f"Generating {total} images with heavy Uber Eats visual identity → {OUT_DIR}\n")
    ok = 0
    for i, img in enumerate(IMAGES):
        print(f"[{i+1}/{total}] {img['filename']}...")
        if generate(img): ok += 1
    print(f"\nDone. {ok}/{total} images generated.")
