"""
Generate mcstation.ai design illustrations using Gemini Imagen 4
"""
import os, base64, json, requests

API_KEY = "AIzaSyCRpV_VfVujaJ99PMd_33qR9AjvnabkY4g"
MODEL   = "imagen-4.0-generate-001"
URL     = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:predict?key={API_KEY}"
OUT_DIR = r"C:\Users\JasonLee\claude_code_projects\mcstation-web\public"

os.makedirs(OUT_DIR, exist_ok=True)

IMAGES = [
    {
        "filename": "mcs-hero.jpg",
        "prompt": (
            "Cinematic aerial view of a futuristic smart city in Taiwan at night. "
            "Multiple restaurants and venues glow with teal and blue neon light. "
            "Glowing digital data streams connect the venues like a neural network. "
            "Holographic AI assistant interfaces float above the buildings. "
            "Ultra-realistic, 8K, cyberpunk-meets-clean-tech aesthetic, dramatic lighting, "
            "deep navy sky, teal and gold accent lights, magazine cover quality."
        ),
    },
    {
        "filename": "mcs-omnicore.jpg",
        "prompt": (
            "Four professional AI avatars depicted as holographic executives in a futuristic command center. "
            "They sit around a glowing round table with holographic dashboards. "
            "Each avatar represents CMO, CTO, CPO, COO — professional business attire, diverse, "
            "teal and white light emanating from the interfaces. "
            "Ultra-realistic render, cinematic lighting, clean tech aesthetic, "
            "deep dark background with glowing data visualizations, impressive and trustworthy."
        ),
    },
    {
        "filename": "mcs-venue.jpg",
        "prompt": (
            "Modern Taiwanese restaurant owner, 40s, standing in a sleek venue, "
            "holding a tablet showing AI analytics dashboard with teal accents. "
            "The venue has smart digital menus, QR codes, and subtle AI-powered ordering displays. "
            "Warm and professional lighting, photorealistic, magazine quality, "
            "background shows a successful modern venue with happy customers. "
            "Tech-forward but human and approachable feeling."
        ),
    },
    {
        "filename": "mcs-brand.jpg",
        "prompt": (
            "Professional business meeting between brand executives and venue tech team. "
            "Large holographic display shows a brand expanding across multiple venue locations on a Taiwan map. "
            "Glowing connection lines between venue pins. Modern boardroom, "
            "teal and white tech interfaces, confident people reviewing partnership data. "
            "Cinematic, photorealistic, aspirational B2B aesthetic."
        ),
    },
    {
        "filename": "mcs-franchise.jpg",
        "prompt": (
            "Bird's eye view of multiple franchise venue locations across Taiwan, "
            "connected by glowing digital network lines forming a constellation. "
            "Each node is a restaurant or venue location with a small holographic status display. "
            "Central AI brain node pulsing with teal light. "
            "Ultra-realistic aerial render, night view, dramatic but clean, "
            "shows scale and connectivity of a managed franchise network."
        ),
    },
    {
        "filename": "mcs-partner.jpg",
        "prompt": (
            "A team of diverse tech engineers and AI specialists working in a futuristic open-plan office. "
            "Multiple screens show code, AI model training, and system architecture diagrams. "
            "Teal holographic interfaces float in the workspace. "
            "Collaborative, energetic, cutting-edge tech company vibe. "
            "Photorealistic, cinematic lighting, aspirational for talent recruitment, "
            "diverse team of Taiwanese and international professionals."
        ),
    },
]

def generate(item):
    body = {
        "instances": [{"prompt": item["prompt"]}],
        "parameters": {"sampleCount": 1, "aspectRatio": "16:9"},
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
    print(f"  ✅ {item['filename']} saved")
    return True

if __name__ == "__main__":
    print(f"Generating {len(IMAGES)} images → {OUT_DIR}\n")
    for img in IMAGES:
        print(f"Generating {img['filename']}...")
        generate(img)
    print("\nDone.")
