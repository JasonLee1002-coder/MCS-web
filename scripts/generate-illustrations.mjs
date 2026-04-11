/**
 * MCS Web — Imagen 4 Illustration Generator
 * 使用 Imagen 4.0 生成三張高品質網站插圖
 */

import { writeFileSync, mkdirSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));

// Load .env.local
const envPath = join(__dir, "../.env.local");
try {
  const envContent = readFileSync(envPath, "utf8");
  for (const line of envContent.split("\n")) {
    const m = line.match(/^([^#=\s]+)\s*=\s*"?([^"\n]*)"?\s*$/);
    if (m) process.env[m[1]] = m[2].trim();
  }
} catch { /* ignore */ }

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) { console.error("GEMINI_API_KEY not found"); process.exit(1); }

const outDir = join(__dir, "../public/images/illustrations");
mkdirSync(outDir, { recursive: true });

const illustrations = [
  {
    filename: "sg-hq.png",
    aspectRatio: "16:9",
    prompt: `Cinematic digital illustration of Singapore skyline at twilight. Marina Bay Sands three towers with iconic sky deck reflecting on calm water. Modern glass skyscrapers, Singapore Flyer ferris wheel glowing orange. Dark navy blue sky with city lights, orange and gold accent lighting on buildings. Professional corporate aesthetic, ultra-detailed, no text or logos. Style: premium tech company illustration, dark blue and warm orange palette.`,
  },
  {
    filename: "tw-rnd.png",
    aspectRatio: "16:9",
    prompt: `Cinematic digital illustration of a futuristic electronics R&D facility in Taiwan. Close-up of advanced PCB circuit board with glowing circuit traces in orange and blue. Microchips, semiconductors, IoT devices arranged artistically. Clean laboratory environment with blue-white lighting, orange accent glow. Ultra-detailed, photorealistic tech aesthetic. No text, no logos. Dark background, vibrant circuit glow effects.`,
  },
  {
    filename: "global-bridge.png",
    aspectRatio: "16:9",
    prompt: `Epic cinematic digital illustration of night satellite view over Asia-Pacific. Singapore city glowing warm orange at lower left, Taiwan island glowing orange at upper right. A brilliant curved fiber optic data stream arc in orange-gold light connecting the two glowing cities over dark deep-blue ocean. Southeast Asia landmasses with subtle coastlines. Stars and atmosphere above horizon. Ultra-detailed, no text, no labels, cinematic composition.`,
  },
];

async function generateImage(prompt, filename, aspectRatio) {
  console.log(`\nGenerating: ${filename} (${aspectRatio})...`);
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${API_KEY}`;

  const body = {
    instances: [{ prompt }],
    parameters: {
      sampleCount: 1,
      aspectRatio,
      safetyFilterLevel: "block_only_high",
      personGeneration: "dont_allow",
    },
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error(`  ✗ HTTP ${res.status}:`, JSON.stringify(data?.error || data, null, 2));
      return false;
    }

    const predictions = data.predictions;
    if (!predictions?.length) {
      console.error("  ✗ No predictions in response:", JSON.stringify(data, null, 2));
      return false;
    }

    const imageData = predictions[0].bytesBase64Encoded;
    if (!imageData) {
      console.error("  ✗ No image data:", JSON.stringify(predictions[0], null, 2));
      return false;
    }

    const buffer = Buffer.from(imageData, "base64");
    const outPath = join(outDir, filename);
    writeFileSync(outPath, buffer);
    console.log(`  ✓ Saved → public/images/illustrations/${filename} (${(buffer.length/1024).toFixed(0)}KB)`);
    return true;
  } catch (err) {
    console.error(`  ✗ Error:`, err.message);
    return false;
  }
}

async function main() {
  console.log("MCS Web — Imagen 4 Illustration Generator");
  console.log("==========================================");
  console.log(`API Key: ${API_KEY.slice(0,8)}...${API_KEY.slice(-4)}\n`);

  let success = 0;
  for (const ill of illustrations) {
    const ok = await generateImage(ill.prompt, ill.filename, ill.aspectRatio);
    if (ok) success++;
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log(`\n✓ Done: ${success}/${illustrations.length} images generated`);
  console.log("Files saved to: public/images/illustrations/");
}

main().catch(console.error);
