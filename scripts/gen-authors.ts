import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) throw new Error("GEMINI_API_KEY not set");

const MODEL = "gemini-3-pro-image-preview";
const OUT_DIR = path.join(process.cwd(), "public/images/authors");
fs.mkdirSync(OUT_DIR, { recursive: true });

type Author = { slug: string; prompt: string };

const AUTHORS: Author[] = [
  {
    slug: "bar-elezra",
    prompt: "Professional editorial portrait photograph of a friendly man in his early 30s, light beard, wearing a casual button-up shirt in a muted color, soft natural window light from the side, neutral background of warm white or light gray, shallow depth of field, slight warm smile, looking directly at camera, magazine-quality editorial photography, no text, no watermarks, photorealistic",
  },
  {
    slug: "editorial-team",
    prompt: "Candid editorial photograph of a small group of 2-3 people in casual professional clothing sitting around a laptop in a modern bright office, diverse group, natural smiles, soft diffused window light, warm neutral color palette, shallow depth of field, magazine-quality photography, no text, no watermarks, photorealistic",
  },
];

async function generateOne(a: Author): Promise<boolean> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
  const body = {
    contents: [{ parts: [{ text: a.prompt }] }],
    generationConfig: { responseModalities: ["IMAGE"] },
  };
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error(`FAIL ${a.slug}: HTTP ${res.status}`, text.slice(0, 400));
    return false;
  }
  const json: any = await res.json();
  const part = json.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData?.data);
  if (!part) {
    console.error(`NO IMAGE ${a.slug}:`, JSON.stringify(json).slice(0, 300));
    return false;
  }
  const buf = Buffer.from(part.inlineData.data, "base64");
  const ext = part.inlineData.mimeType?.includes("png") ? "png" : "jpg";
  const out = path.join(OUT_DIR, `${a.slug}.${ext}`);
  fs.writeFileSync(out, buf);
  console.log(`OK ${a.slug} -> ${out} (${(buf.length / 1024).toFixed(0)}KB)`);
  return true;
}

(async () => {
  for (const a of AUTHORS) {
    // Check for any existing extension
    const exists = ["png", "jpg", "jpeg", "webp"].some((ext) =>
      fs.existsSync(path.join(OUT_DIR, `${a.slug}.${ext}`))
    );
    if (exists) {
      console.log(`SKIP ${a.slug} (exists)`);
      continue;
    }
    const ok = await generateOne(a);
    if (!ok) {
      console.warn(`WARN: ${a.slug} failed, continuing...`);
    }
    await new Promise((r) => setTimeout(r, 1200));
  }
  console.log("\nDone. Authors in:", OUT_DIR);
  const files = fs.readdirSync(OUT_DIR);
  console.log("Files:", files.join(", ") || "(none)");
})();
