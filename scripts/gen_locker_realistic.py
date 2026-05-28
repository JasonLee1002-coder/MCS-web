"""
Generate REALISTIC smart locker (智取櫃) product photos for 海柏特 × Uber Eats 剪報
Ultra-realistic product photography style using Gemini Imagen 4
"""
import os, base64, requests

API_KEY = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_GENERATIVE_AI_API_KEY")
MODEL   = "imagen-4.0-generate-001"
URL     = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:predict?key={API_KEY}"
OUT_DIR = r"C:\Users\JasonLee\claude_code_projects\CMO\docs\clients\assets\haibo_ubereats"

os.makedirs(OUT_DIR, exist_ok=True)

IMAGES = [
    {
        "filename": "locker-product-shot.jpg",
        "ratio": "1:1",
        "prompt": (
            "Ultra-realistic product photography of a modern smart food pickup locker machine. "
            "Tall white cabinet with multiple temperature-controlled compartments, each with transparent glass doors. "
            "A large 15-inch touchscreen on the front showing Uber Eats green interface with QR code scanner. "
            "LED status indicators on each compartment door (green = ready, amber = waiting). "
            "Sleek minimal hardware design, like Apple product quality. "
            "Shot on white studio background with soft professional lighting from above. "
            "Sharp focus, commercial product photography quality, 8K resolution. "
            "The locker is approximately 180cm tall, 80cm wide, stainless steel frame with white panels."
        ),
    },
    {
        "filename": "locker-restaurant-entry.jpg",
        "ratio": "16:9",
        "prompt": (
            "Photorealistic wide shot of a modern smart food locker installed at the entrance of a busy "
            "Taiwanese restaurant in Taipei. The locker has Uber Eats bright green branding on the front panel. "
            "Multiple illuminated compartments with glass doors, touchscreen showing order status in Chinese. "
            "Real restaurant setting: ceramic tile floor, menu boards visible, warm interior lighting. "
            "A food delivery rider in green Uber Eats jacket approaches the locker with smartphone. "
            "Evening atmosphere, street visible through glass door. Canon 5D Mark IV quality photo. "
            "Sharp, detailed, photojournalism style. 100% photo-realistic, not illustration."
        ),
    },
    {
        "filename": "locker-compartment-open.jpg",
        "ratio": "4:3",
        "prompt": (
            "Close-up photorealistic shot of a smart food locker with one compartment door open. "
            "Inside is a bagged meal from a delivery order, kept warm under orange LED heat lamp. "
            "The open door shows the insulated lining and digital temperature display showing 65°C. "
            "Other compartments are closed with green LEDs indicating occupied status. "
            "Uber Eats logo visible on the door panel. "
            "Shallow depth of field, product photography quality, warm tones from interior LED. "
            "Shot from straight-on angle, ultra-realistic, food photography quality."
        ),
    },
    {
        "filename": "locker-qr-scan.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic close-up of delivery rider's hand holding smartphone up to smart locker's QR scanner. "
            "The locker screen shows a green success animation and the compartment door is clicking open. "
            "Smartphone displays Uber Eats app with pickup code '3847'. "
            "Rider wearing green Uber Eats wrist strap. Locker has Uber Eats branding. "
            "Sharp focus on the QR scan interaction, motion blur on opening door. "
            "Cinematic color grade, real photography quality, editorial style. Not illustration."
        ),
    },
    {
        "filename": "locker-row-installation.jpg",
        "ratio": "16:9",
        "prompt": (
            "Photorealistic wide shot showing a row of 3 smart food pickup lockers installed along the wall "
            "of a modern Taiwanese food court or restaurant cluster. "
            "Each locker unit has Uber Eats green branding, multiple compartments with glass doors, touchscreens. "
            "Clean modern interior setting, polished concrete floor, LED strip lighting above. "
            "One locker's compartment is open with a delivery bag inside. Another shows a rider scanning. "
            "Dramatic perspective shot showing scale. High-end commercial photography. "
            "Looks like a press release photo for a major technology company launch."
        ),
    },
    {
        "filename": "locker-night-glow.jpg",
        "ratio": "16:9",
        "prompt": (
            "Dramatic night-time photorealistic shot of a smart food locker outside a Taiwanese restaurant. "
            "The locker glows with Uber Eats green LED lighting in the dark street. "
            "Rain-wet pavement reflects the green glow. Neon signs from neighboring shops visible. "
            "The locker's compartment indicators create a constellation of green and amber lights. "
            "A delivery scooter is parked nearby. Cinematic urban night photography. "
            "Long exposure, bokeh street lights, moody and atmospheric. "
            "Shot like a Bloomberg Businessweek cover photo. 100% photorealistic."
        ),
    },
    {
        "filename": "locker-exploded-view.jpg",
        "ratio": "1:1",
        "prompt": (
            "Professional technical exploded view illustration of a smart food pickup locker. "
            "Clean white background. The locker is shown with components separated and labeled: "
            "touchscreen panel, IoT controller board, temperature sensors, insulated compartments, "
            "electronic lock mechanisms, LED status strips, 4G antenna, power supply. "
            "Arrows and clean lines connect each component. "
            "Style: Apple product exploded view, clean technical illustration. "
            "Labels in English. Teal and grey color palette. "
            "Sophisticated engineering diagram meets product marketing aesthetic."
        ),
    },
    {
        "filename": "locker-uber-branded.jpg",
        "ratio": "4:3",
        "prompt": (
            "Professional product marketing photo of a smart pickup locker with premium Uber Eats branding. "
            "The entire front face is covered with Uber Eats green with the logo prominently displayed. "
            "Clean white touchscreen area, illuminated compartments with transparent doors. "
            "Shot in a studio with dramatic side lighting that creates depth and luxury feel. "
            "White floor, gradient background from dark grey to white. "
            "The locker looks premium and high-end, like a product worth investing in. "
            "Advertising photography quality, campaign-ready image."
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
    print(f"Generating {len(IMAGES)} realistic locker images → {OUT_DIR}\n")
    success = 0
    for img in IMAGES:
        print(f"Generating {img['filename']}...")
        if generate(img):
            success += 1
    print(f"\nDone. {success}/{len(IMAGES)} images generated.")
