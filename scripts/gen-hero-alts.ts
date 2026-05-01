import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) throw new Error("GEMINI_API_KEY not set");

const MODEL = "gemini-3-pro-image-preview";
const OUT_DIR = path.join(process.cwd(), "public/images/heroes");
fs.mkdirSync(OUT_DIR, { recursive: true });

type Hero = { slug: string; prompt: string };

const HERO_ALTS: Hero[] = [
  {
    slug: "homepage-tech-1-fan",
    prompt:
      "Premium product photography, 5 abstract credit cards arranged in a perfect fan, hovering above a deep navy gradient background that fades to black, soft teal and amber edge glow on each card, no text or logos on cards, cards have subtle metallic gradient surfaces (deep blue, gold, silver, emerald, dark plum), studio lighting, slight reflection beneath cards, professional fintech product shot, no people, modern Apple Card aesthetic, 16:9 landscape",
  },
  {
    slug: "homepage-tech-2-iso",
    prompt:
      "Isometric 3D illustration on a deep navy gradient background, three credit cards arranged at offset depths floating in space, abstract geometric data visualization elements behind them (subtle dotted grid, minimal floating bar chart, soft glowing circles), color palette of deep navy, electric teal, soft amber accent, modern fintech aesthetic, no people no text on cards, professional rendering with soft shadows, 16:9 landscape",
  },
  {
    slug: "homepage-tech-3-dashboard",
    prompt:
      "Aerial product photography of a sleek desk with a dark laptop showing an abstract dashboard with charts and card thumbnails (no readable text), a single credit card placed beside the laptop, a smartphone showing a card-comparison interface, all on a smooth deep gray surface with soft directional studio light, no people, modern fintech editorial, color palette of charcoal and navy with accent teal glow, 16:9 landscape",
  },
  {
    slug: "homepage-tech-4-cards-grid",
    prompt:
      "Top-down editorial product shot of 9 credit cards arranged in a perfect 3x3 grid on a smooth dark navy surface, cards have varied abstract gradient designs in deep blue, dark plum, emerald, charcoal, gold, no text or logos visible, soft directional light from upper left, slight specular highlights on card edges, premium product photography, no people, fintech magazine aesthetic, 16:9 landscape",
  },
];

async function generateOne(h: Hero): Promise<boolean> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
  const body = {
    contents: [{ parts: [{ text: h.prompt }] }],
    generationConfig: { responseModalities: ["IMAGE"] },
  };
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error(`FAIL ${h.slug}: HTTP ${res.status}`, text.slice(0, 400));
    return false;
  }
  const json: any = await res.json();
  const part = json.candidates?.[0]?.content?.parts?.find(
    (p: any) => p.inlineData?.data
  );
  if (!part) {
    console.error(`NO IMAGE ${h.slug}:`, JSON.stringify(json).slice(0, 300));
    return false;
  }
  const buf = Buffer.from(part.inlineData.data, "base64");
  const ext = part.inlineData.mimeType?.includes("png") ? "png" : "jpg";
  const out = path.join(OUT_DIR, `${h.slug}.${ext}`);
  fs.writeFileSync(out, buf);
  console.log(`OK ${h.slug} -> ${out} (${(buf.length / 1024).toFixed(0)}KB)`);
  return true;
}

(async () => {
  for (const h of HERO_ALTS) {
    const exists = ["png", "jpg", "jpeg", "webp"].some((ext) =>
      fs.existsSync(path.join(OUT_DIR, `${h.slug}.${ext}`))
    );
    if (exists) {
      console.log(`SKIP ${h.slug} (exists)`);
      continue;
    }
    console.log(`Generating ${h.slug}...`);
    const ok = await generateOne(h);
    if (!ok) {
      console.warn(`WARN: ${h.slug} failed, continuing...`);
    }
    await new Promise((r) => setTimeout(r, 1500));
  }
  console.log("\nDone. Heroes in:", OUT_DIR);
  const files = fs.readdirSync(OUT_DIR);
  console.log("Files:", files.join(", ") || "(none)");
})();
