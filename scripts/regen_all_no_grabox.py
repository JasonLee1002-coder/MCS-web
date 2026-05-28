"""
Regenerate ALL scenario images — NO GraBox branding anywhere.
Locker = "Uber Eats Smart Pickup Cabinet" with transparent glass compartments.
All Uber Eats visual identity throughout every image.
"""
import os, base64, requests

API_KEY = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_GENERATIVE_AI_API_KEY")
MODEL   = "imagen-4.0-generate-001"
URL     = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:predict?key={API_KEY}"
OUT_DIR = r"C:\Users\JasonLee\claude_code_projects\CMO\docs\clients\assets\haibo_ubereats\scenarios"
os.makedirs(OUT_DIR, exist_ok=True)

# Cabinet physical description — Uber Eats branding, NO GraBox name
CABINET = (
    "A modern Uber Eats branded smart food pickup cabinet. "
    "The cabinet has multiple numbered compartments, each with a CLEAR TRANSPARENT GLASS door "
    "so the food bags inside are fully visible. "
    "The cabinet front panel is entirely covered in Uber Eats signature bright green (#06C167) "
    "with the Uber Eats wordmark and logo prominently displayed. "
    "Green LED status lights on each compartment door indicate ready/occupied status. "
    "The Uber Eats logo is large and dominant on the cabinet face. "
)

RIDER = (
    "Uber Eats delivery rider wearing bright green Uber Eats jacket and green branded helmet. "
    "White electric scooter with large green Uber Eats insulated delivery box parked nearby. "
    "Green Uber Eats paper bags with logo visible through the transparent glass compartment doors. "
)

IMAGES = [
    # ── TYPE 2: 外掛式 ──────────────────────────────────────────────────────
    {
        "filename": "type2-bento-table.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic editorial photo inside a Taiwanese lunch box (便當) restaurant. "
            + CABINET +
            "The Uber Eats smart pickup cabinet sits on a dedicated table near the restaurant entrance. "
            "6 transparent glass compartments show numbered green Uber Eats branded lunch box bags inside. "
            "Staff member in apron places a green Uber Eats bag into compartment 3, visible through glass. "
            "Through the glass entrance door, " + RIDER +
            "approaches — white scooter with green delivery box visible on the street. "
            "Warm midday light, clean organized interior. "
            "Practical, efficient setup showing zero renovation needed. Editorial photography."
        ),
    },
    {
        "filename": "type2-cafe-counter.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a modern Taiwanese cafe interior (cama / 路易莎 style). "
            + CABINET +
            "The Uber Eats smart pickup cabinet is placed on a counter near the cafe entrance. "
            "Coffee cups in green Uber Eats bags are visible through the transparent glass compartments. "
            "Barista in background makes coffee while " + RIDER +
            "opens a compartment using the touchscreen. "
            "Rider's white scooter with Uber Eats green box visible through the cafe's glass window. "
            "Minimalist wood-and-white cafe decor, soft warm lighting. "
            "Instagram-quality photo, lifestyle meets delivery efficiency."
        ),
    },
    {
        "filename": "type2-nightmarket-stall.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic night photography of a Taiwanese night market stall (夜市). "
            + CABINET +
            "A compact Uber Eats smart pickup cabinet with green LED trim sits beside the food stall counter. "
            "Inside the transparent glass compartments: green Uber Eats bags with 鹹酥雞 and oyster vermicelli. "
            "The stall owner places an order into the cabinet while " + RIDER +
            "scans QR code on the touchscreen. "
            "Vibrant night market atmosphere — red lanterns, neon signs, crowds of people. "
            "The cabinet glows green in the night scene, Uber Eats logo illuminated. "
            "Cinematic night photography, warm food tones, energetic Taiwan street culture."
        ),
    },
    {
        "filename": "type2-japanese-restaurant.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a mid-range Japanese restaurant in Taipei. "
            + CABINET +
            "Premium Uber Eats smart pickup cabinet on an elegant wooden stand near entrance. "
            "Ramen containers and sushi boxes in green Uber Eats branded bags visible through transparent glass. "
            + RIDER +
            "politely opens a compartment using the touchscreen. "
            "White scooter with green Uber Eats box visible outside glass door. "
            "Japanese minimalist interior — shoji screens, bamboo, warm wood tones. "
            "Uniformed restaurant staff bows slightly in background. "
            "Premium photography showing the cabinet fits any aesthetic."
        ),
    },
    {
        "filename": "type2-drinks-shop-counter.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a Taiwanese traditional drinks and breakfast counter shop. "
            + CABINET +
            "Uber Eats smart pickup cabinet placed right on the serving counter. "
            "Soy milk, egg pancake rolls in green Uber Eats bags visible through transparent glass compartments. "
            "Young female shop owner places order into cabinet with one hand, takes next order with other. "
            + RIDER +
            "stands at counter scanning QR code. White scooter with Uber Eats green box parked right outside. "
            "Morning rush atmosphere, steam from kitchen, local Taiwan vibe. "
            "Warm and human photography showing seamless workflow."
        ),
    },

    # ── TYPE 3: 免整合單機 ──────────────────────────────────────────────────
    {
        "filename": "type3-standalone-simple.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a small Taiwanese fried chicken snack shop (鹹酥雞). "
            + CABINET +
            "A single compact Uber Eats smart pickup cabinet sits on the counter. "
            "The owner — middle-aged Taiwanese man in blue apron — smiles as he places "
            "a green Uber Eats bag of fried items into the cabinet. "
            "The transparent glass shows the bag clearly inside. "
            "His other hand holds his phone showing the Uber Eats order screen — no POS system anywhere. "
            + RIDER +
            "waits at the counter with their green scooter outside. "
            "Small handwritten sign in Chinese '免POS · 直接上線' above the cabinet. "
            "Warm, humble, approachable atmosphere. Any small shop can use this immediately."
        ),
    },
    {
        "filename": "type3-no-pos-workflow.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic editorial photo showing a simple 3-step pickup workflow. "
            "Three-panel split composition: "
            "LEFT PANEL — Uber Eats app on restaurant owner's smartphone showing new order notification. "
            "CENTER PANEL — Owner's hands placing a green Uber Eats bag into an Uber Eats branded "
            "smart pickup cabinet compartment. The transparent glass door shows the bag inside clearly. "
            "The cabinet front is entirely Uber Eats green with logo. "
            "RIGHT PANEL — " + RIDER +
            "scans QR code and a transparent glass compartment door opens automatically. "
            "No computer, no POS terminal, no complex setup visible anywhere. "
            "Clean white background with subtle kitchen context. "
            "Instructional quality, shows zero-integration simplicity: App → Cabinet → Rider."
        ),
    },

    # ── TYPE 4: AI 進化 ──────────────────────────────────────────────────────
    {
        "filename": "type4-ai-evolution.jpg",
        "ratio": "16:9",
        "prompt": (
            "Futuristic photorealistic editorial image. "
            "A next-generation Uber Eats smart pickup cabinet wall with AI interface. "
            "The entire cabinet array is Uber Eats green (#06C167) with large Uber Eats logo. "
            "Multiple transparent glass compartments glow with green LED. "
            "A large touchscreen shows multiple AI features: "
            "member loyalty points display, special meal recommendations, off-peak deals, "
            "real-time analytics dashboard, cultural merchandise section. "
            "A customer uses the screen to check points while " + RIDER +
            "in green jacket picks up order from transparent glass compartment. "
            "Holographic-style data visualization panels surround the cabinet. "
            "Uber Eats green and white color scheme throughout. "
            "Bloomberg Businessweek future-tech editorial style. Aspirational but grounded."
        ),
    },
    {
        "filename": "type4-member-loyalty.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo of a customer using Uber Eats smart pickup cabinet member loyalty feature. "
            + CABINET +
            "The cabinet touchscreen shows a member profile, "
            "accumulated points, exclusive member deal, and a QR code for pickup. "
            "The customer — young Taiwanese woman — smiles at the screen while scanning her member QR. "
            "Through the transparent glass compartment she can see her order bag inside, glowing green. "
            "A compartment has a special 'Member Pick' label glowing gold on the glass door. "
            + RIDER +
            "in green jacket and helmet visible in background. "
            "Modern restaurant lobby context. "
            "Shows future potential: Uber Eats smart cabinet as loyalty and engagement touchpoint."
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
    print(f"Regenerating {total} images — NO GraBox, all Uber Eats branded cabinet with transparent glass\n")
    ok = 0
    for i, img in enumerate(IMAGES):
        print(f"[{i+1}/{total}] {img['filename']}...")
        if generate(img): ok += 1
    print(f"\nDone. {ok}/{total} regenerated.")
