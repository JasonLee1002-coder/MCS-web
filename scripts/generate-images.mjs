/**
 * MCS Web — Gemini AI Image Generator
 * 用 Gemini 2.0 Flash 生成網站插圖
 *
 * 使用方式：
 *   node scripts/generate-images.mjs
 *
 * 需要 .env.local 中的 GEMINI_API_KEY
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputDir = join(__dirname, "../public/images/generated");
mkdirSync(outputDir, { recursive: true });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const images = [
  {
    filename: "sg-hq-illustration.png",
    prompt: `
      Professional digital illustration of Singapore's Cecil Court business district at dusk.
      Sleek modern office building with glass facade, warm orange accent lighting.
      Singapore skyline visible in background. Premium corporate feel.
      Style: clean vector art, dark navy blue and orange color palette, high-tech enterprise aesthetic.
      No text, no logos. Aspect ratio 16:9, wide format.
    `,
  },
  {
    filename: "tw-rnd-illustration.png",
    prompt: `
      Professional digital illustration of a modern electronics R&D manufacturing facility in Taiwan.
      Clean production line with circuit boards, smart devices, quality control stations.
      Engineers in white coats, precision manufacturing equipment.
      Style: clean vector art, dark blue and orange palette, high-tech enterprise aesthetic.
      No text, no logos. Aspect ratio 16:9, wide format.
    `,
  },
  {
    filename: "consulting-hero.png",
    prompt: `
      Professional digital illustration showing international business consulting concept.
      Singapore business district meeting room with floor-to-ceiling windows, Asia-Pacific map hologram on table.
      Diverse business professionals in discussion around a glass table.
      Style: clean vector art, dark navy blue and orange accent, premium corporate aesthetic.
      No text, no logos. Aspect ratio 16:9, wide format.
    `,
  },
  {
    filename: "global-bridge-illustration.png",
    prompt: `
      Minimalist digital illustration of two city skylines (Singapore and Taipei) connected by a glowing data bridge.
      Fiber optic / neural network lines connecting the two cities over a Pacific Ocean map.
      Particles and data nodes flow between them.
      Style: dark background, orange and white glowing lines, futuristic tech aesthetic.
      No text, no logos. Aspect ratio 21:9, ultra-wide format.
    `,
  },
];

async function generateImage(prompt, filename) {
  console.log(`Generating: ${filename}...`);

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp-image-generation",
    });

    const response = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ["IMAGE"],
      },
    });

    const parts = response.response.candidates?.[0]?.content?.parts;
    if (!parts) throw new Error("No parts in response");

    for (const part of parts) {
      if (part.inlineData?.mimeType?.startsWith("image/")) {
        const buffer = Buffer.from(part.inlineData.data, "base64");
        const outputPath = join(outputDir, filename);
        writeFileSync(outputPath, buffer);
        console.log(`  ✓ Saved → public/images/generated/${filename}`);
        return;
      }
    }
    throw new Error("No image data in response");
  } catch (err) {
    console.error(`  ✗ Failed: ${err.message}`);
    console.log("  Note: Image generation requires gemini-2.0-flash-exp-image-generation model access.");
  }
}

async function main() {
  if (!process.env.GEMINI_API_KEY) {
    console.error("Error: GEMINI_API_KEY not found in .env.local");
    process.exit(1);
  }

  console.log("MCS Web — Gemini Image Generator");
  console.log("==================================\n");

  for (const img of images) {
    await generateImage(img.prompt, img.filename);
    // Rate limit: 1 request per 2 seconds
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log("\nDone! Generated images saved to public/images/generated/");
  console.log("Update component src paths to use these images if satisfied with results.");
}

main().catch(console.error);
