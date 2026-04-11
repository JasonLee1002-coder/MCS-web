/**
 * Generate SVG illustrations using Claude API
 */
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import https from "https";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load env
const envContent = readFileSync(join(__dirname, "../.env.local"), "utf8");
for (const line of envContent.split("\n")) {
  const m = line.match(/^([^#=\s]+)=(.+)$/);
  if (m) process.env[m[1]] = m[2].replace(/^"|"$/g, "").trim();
}

const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_KEY) { console.error("No ANTHROPIC_API_KEY"); process.exit(1); }

function callClaude(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: "claude-opus-4-6",
      max_tokens: 4000,
      messages: [{ role: "user", content: prompt }],
    });
    const req = https.request("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_KEY,
        "anthropic-version": "2023-06-01",
        "Content-Length": Buffer.byteLength(body),
      },
    }, (res) => {
      let data = "";
      res.on("data", d => data += d);
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          resolve(json.content?.[0]?.text || "");
        } catch (e) { reject(e); }
      });
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

const illustrations = [
  {
    name: "SGHQIllustration",
    file: "src/components/illustrations/SGHQIllustration.tsx",
    prompt: `Create a React/TSX component that exports a beautiful inline SVG illustration representing Singapore's CBD business district and a tech company headquarters.

Requirements:
- Export: export default function SGHQIllustration({ className }: { className?: string })
- Size: viewBox="0 0 600 400" width="100%" height="100%"
- Style: dark navy blue background (#0F2440), orange accents (#E8751A), white/light blue building lines
- Content: Abstract Singapore skyline with modern glass office buildings, subtle data grid overlay, glowing orange accent lights on buildings, Singapore lion head silhouette subtly embedded, stars/network nodes floating
- Technical feel: circuit board traces as streets, glowing windows, fiber optic lines between buildings
- Animation: subtle CSS keyframe animations for glowing effects (use <style> inside SVG)
- Must be production-quality, visually impressive, at least 80 SVG elements
- Return ONLY the TSX code, no explanation, no markdown fences`,
  },
  {
    name: "TWRDIllustration",
    file: "src/components/illustrations/TWRDIllustration.tsx",
    prompt: `Create a React/TSX component that exports a beautiful inline SVG illustration representing a high-tech R&D manufacturing facility in Taiwan.

Requirements:
- Export: export default function TWRDIllustration({ className }: { className?: string })
- Size: viewBox="0 0 600 400" width="100%" height="100%"
- Style: dark blue gradient background (#1B3A5C to #0F2440), orange accents (#E8751A), white circuit elements
- Content: Abstract PCB/circuit board with microchips, smart device outlines (cabinet/vending machine silhouettes), quality control checkmarks, Taiwan mountain silhouette in background, 100% badge, data flow arrows
- Technical elements: detailed circuit traces, component outlines, solder points, data flow paths
- Animation: pulsing circuit elements, data flow animations
- Must be production-quality, visually impressive, at least 80 SVG elements
- Return ONLY the TSX code, no explanation, no markdown fences`,
  },
  {
    name: "GlobalBridgeIllustration",
    file: "src/components/illustrations/GlobalBridgeIllustration.tsx",
    prompt: `Create a React/TSX component that exports a beautiful inline SVG illustration of a glowing data/network bridge connecting Singapore and Taiwan across the Asia-Pacific.

Requirements:
- Export: export default function GlobalBridgeIllustration({ className }: { className?: string })
- Size: viewBox="0 0 800 300" width="100%" height="100%"
- Style: dark navy background (#0F2440), glowing orange (#E8751A) and white connection lines, blue gradient sky
- Content: Simplified Asia-Pacific ocean map outline, Singapore dot on left (glowing orange), Taiwan dot on right (glowing orange), multiple curved fiber optic lines connecting them with animated data packets flowing, network nodes along the connection, subtle grid overlay
- Technical: SVG path animations for data flow along curves, glowing node pulses
- Animation: animated dashes flowing from SG to TW, pulsing nodes, shimmer effects
- Must be production-quality, at least 60 SVG elements
- Return ONLY the TSX code, no explanation, no markdown fences`,
  },
];

async function main() {
  const outBase = join(__dirname, "..");
  mkdirSync(join(outBase, "src/components/illustrations"), { recursive: true });

  for (const ill of illustrations) {
    console.log(`Generating ${ill.name}...`);
    try {
      const code = await callClaude(ill.prompt);
      const filePath = join(outBase, ill.file);
      writeFileSync(filePath, code, "utf8");
      console.log(`  ✓ Saved → ${ill.file}`);
    } catch (e) {
      console.error(`  ✗ Failed: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 1000));
  }
  console.log("\nDone! SVG illustrations generated.");
}

main().catch(console.error);
