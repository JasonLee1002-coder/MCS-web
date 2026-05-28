"""
Generate illustrations for 海柏特 × Uber Eats 剪報
Using Gemini Imagen 4
"""
import os, base64, requests

API_KEY = "AIzaSyCRpV_VfVujaJ99PMd_33qR9AjvnabkY4g"
MODEL   = "imagen-4.0-generate-001"
URL     = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:predict?key={API_KEY}"
OUT_DIR = r"C:\Users\JasonLee\claude_code_projects\CMO\docs\clients\assets\haibo_ubereats"

os.makedirs(OUT_DIR, exist_ok=True)

IMAGES = [
    {
        "filename": "haibo-locker-hero.jpg",
        "ratio": "16:9",
        "prompt": (
            "Photorealistic magazine editorial photo. A sleek modern smart pickup locker station "
            "installed at the entrance of a busy Taiwanese restaurant. The locker has a bright green "
            "Uber Eats branded panel with glowing LED compartments. A delivery rider in green helmet "
            "is scanning a QR code on the locker screen. Warm evening street light, authentic Taiwan "
            "street scene background with neon signs. Clean, professional food-tech aesthetic. "
            "Shot like a Bloomberg Businessweek editorial photo. High contrast, sharp focus."
        ),
    },
    {
        "filename": "haibo-rider-scan.jpg",
        "ratio": "4:3",
        "prompt": (
            "Close-up editorial photo of a delivery rider's hand scanning a QR code on a smart locker "
            "touchscreen. The screen shows a green checkmark and order details in Chinese. "
            "The locker compartment door is opening, revealing a bag of hot food. "
            "Uber Eats green color accent on the device. Shallow depth of field, bokeh background "
            "of a busy Taiwanese restaurant. Magazine quality, warm lighting, technology meets human touch."
        ),
    },
    {
        "filename": "haibo-restaurant-staff.jpg",
        "ratio": "4:3",
        "prompt": (
            "Photorealistic magazine photo. A smiling Taiwanese restaurant owner in her 40s "
            "placing a bagged meal into a smart pickup locker compartment. She wears an apron "
            "and looks confident and satisfied. The locker is installed neatly at the restaurant counter. "
            "Modern, clean restaurant interior with warm lighting. Digital displays showing order queue. "
            "Shot like a Forbes Asia editorial. Professional, aspirational, human-centered."
        ),
    },
    {
        "filename": "haibo-taiwan-map.jpg",
        "ratio": "16:9",
        "prompt": (
            "Stylized infographic illustration of Taiwan island map with glowing green network nodes. "
            "Each node represents a smart locker location in a city. Pulsing connection lines between "
            "Taipei, Taichung, Tainan, Kaohsiung. Clean flat design with depth, dark navy background, "
            "Uber Eats green accent lights. Icons of restaurant, delivery scooter, smartphone. "
            "Modern tech infographic style, magazine data visualization quality. Bold and clear."
        ),
    },
    {
        "filename": "haibo-data-dashboard.jpg",
        "ratio": "16:9",
        "prompt": (
            "Photorealistic screenshot-style illustration of a sleek analytics dashboard on a large monitor. "
            "Shows real-time delivery pickup data: bar charts of peak hours, heatmap of Taiwan cities, "
            "KPI cards with numbers like '68% faster pickup', '4.8 star rating'. "
            "Uber Eats green color scheme on dark background. Clean data visualization. "
            "Professional SaaS product UI, like a Stripe or Vercel dashboard. "
            "Shot in a modern tech office environment with soft blue ambient light."
        ),
    },
    {
        "filename": "haibo-team-handshake.jpg",
        "ratio": "4:3",
        "prompt": (
            "Editorial business photo. Two business professionals shaking hands across a conference table. "
            "On the table: a smart locker device model, tablet showing Uber Eats app, partnership documents. "
            "Modern boardroom in Taipei, city skyline visible through floor-to-ceiling windows. "
            "Professional attire, diverse Taiwanese business team. "
            "Lighting warm and aspirational, like Harvard Business Review photography. "
            "Partnership, trust, technology collaboration theme."
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
    print(f"Generating {len(IMAGES)} illustrations → {OUT_DIR}\n")
    success = 0
    for img in IMAGES:
        print(f"Generating {img['filename']}...")
        if generate(img):
            success += 1
    print(f"\nDone. {success}/{len(IMAGES)} images generated.")
