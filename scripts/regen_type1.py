"""
Regenerate Type 1 外牆式 images — Uber Eats brand-forward, transparent glass lockers
No GraBox brand name. Locker = Uber Eats smart pickup cabinet with TRANSPARENT glass doors.
"""
import os, base64, requests

API_KEY = "AIzaSyCRpV_VfVujaJ99PMd_33qR9AjvnabkY4g"
MODEL   = "imagen-4.0-generate-001"
URL     = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:predict?key={API_KEY}"
OUT_DIR = r"C:\Users\JasonLee\claude_code_projects\CMO\docs\clients\assets\haibo_ubereats\scenarios"
os.makedirs(OUT_DIR, exist_ok=True)

# Locker physical description — transparent glass, Uber Eats identity, NO brand name
LOCKER = (
    "A modern smart food pickup cabinet flush-mounted into the exterior wall. "
    "The cabinet has 12 numbered compartments, each with a clear transparent glass door "
    "so you can see the food bags inside. "
    "The cabinet face is covered in Uber Eats signature bright green (#06C167) panel with the Uber Eats logo prominently displayed. "
    "Each glass compartment door has a small green LED status light and a number. "
    "The food bags inside are clearly visible through the transparent glass. "
)

# Rider visual DNA
RIDER = (
    "An Uber Eats delivery rider wearing bright green Uber Eats jacket, green branded helmet with Uber Eats logo. "
    "White electric scooter with a large green Uber Eats insulated delivery box on the back, parked nearby. "
    "Green Uber Eats paper bags with logo visible through the transparent glass compartments. "
)

IMAGES = [
    {
        "filename": "type1-breakfast-wall.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic editorial photo, 8AM morning rush in Taiwan. "
            + LOCKER +
            "The cabinet is embedded into the exterior glass wall of a busy Taiwanese breakfast shop "
            "(green storefront, 麥味登 style, with a Chinese breakfast menu sign). "
            "Inside the shop, a staff member in apron places a breakfast paper bag into one of the "
            "transparent glass compartments from the interior side — the bag is clearly visible through the glass. "
            "Outside on the sidewalk, "
            + RIDER +
            "The rider scans a QR code on the cabinet touchscreen to open a compartment. "
            "Morning golden hour light, authentic Taiwan neighborhood street with motorcycles and breakfast crowd. "
            "Like a drive-through pickup window but built into the wall — staff inside, rider outside. "
            "The entire cabinet exterior is dominated by Uber Eats green branding, logo, and green LED glow. "
            "Bloomberg Businessweek editorial quality photography, sharp focus, warm morning tones."
        ),
    },
    {
        "filename": "type1-bubbletea-wall.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic photo, afternoon peak hour in Taiwan. "
            + LOCKER +
            "The smart pickup cabinet is embedded into the exterior facade of a popular "
            "Taiwanese bubble tea shop (Tiger Sugar style, colorful neon branding). "
            "Through the transparent glass doors you can clearly see sealed cups of pearl milk tea "
            "with green Uber Eats stickers, placed in individual numbered compartments. "
            "Two Uber Eats riders — both in green jackets and green branded helmets — "
            "simultaneously scan QR codes on different numbered compartments. "
            "Both their white scooters with green Uber Eats boxes are parked on the sidewalk behind them. "
            "A queue of walk-in customers is visible through the shop window inside. "
            "The cabinet front glows green, Uber Eats logo large and prominent. "
            "Taiwan urban street, vivid colors, editorial photography, sharp focus."
        ),
    },
    {
        "filename": "type1-fastfood-wall.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic wide-angle architectural editorial photo. "
            "A large multi-column smart food pickup cabinet — entirely Uber Eats green branded with large Uber Eats logo — "
            "installed flush into the exterior wall of a busy Taiwan fast food restaurant on a Taipei city intersection. "
            "The cabinet has 3 columns × 4 rows = 12 individual compartments, "
            "each with a TRANSPARENT clear glass door showing the green Uber Eats food bags inside. "
            "Green LEDs glow on ready compartments, amber on in-progress ones. "
            "Three Uber Eats riders in bright green jackets and green branded helmets "
            "pick up orders simultaneously from different numbered compartments. "
            "Their white electric scooters with large green Uber Eats delivery boxes "
            "are lined up in front on the sidewalk. "
            "Rush hour, dramatic perspective shot, Taipei city background. "
            "The entire wall installation is dominated by Uber Eats green identity. "
            "Magazine cover quality photography, shows scale and efficiency of the system."
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
    print(f"  ✅ {item['filename']}")
    return True

if __name__ == "__main__":
    print(f"Regenerating {len(IMAGES)} Type 1 外牆式 images (Uber Eats brand-forward, transparent glass)\n")
    ok = 0
    for i, img in enumerate(IMAGES):
        print(f"[{i+1}/{len(IMAGES)}] {img['filename']}...")
        if generate(img): ok += 1
    print(f"\nDone. {ok}/{len(IMAGES)} images regenerated.")
