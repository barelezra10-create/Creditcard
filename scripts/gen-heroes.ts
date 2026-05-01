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

const HEROES: Hero[] = [
  {
    slug: "homepage",
    prompt: "Editorial photography, soft morning light through large window, person in their late 20s in casual modern clothes sitting at minimalist wooden desk, holding a credit card thoughtfully while looking at laptop screen, slight smile, candid moment of confident decision-making, neutral color palette of warm beige and soft greens, shallow depth of field, no text, no watermarks, magazine-quality fintech imagery",
  },
  {
    slug: "pillar-credit-card-basics",
    prompt: "Clean conceptual still life, single credit card resting on textured cream paper next to a fountain pen and a small ceramic coffee cup, top-down view, warm overhead light, editorial finance magazine aesthetic, no text on card, soft shadows, color palette of cream warm gray and deep navy",
  },
  {
    slug: "pillar-choosing-a-card",
    prompt: "Three credit cards arranged in a fan on a clean light gray surface, photographed from above with soft directional light, cards have abstract gradient designs in different colors (deep blue, forest green, warm gold), no logos no text, editorial shot, shallow depth of field, modern fintech aesthetic",
  },
  {
    slug: "pillar-building-credit",
    prompt: "Conceptual photograph of small wooden ladder leaning against a soft beige wall with morning sunlight casting gentle diagonal shadows, photographed editorial style, warm minimalist tones, single small green plant in corner, sense of patience and growth, no text, magazine-quality",
  },
  {
    slug: "pillar-maximizing-rewards",
    prompt: "Aerial view of an open passport on a textured wooden table next to a coffee cup, a credit card with abstract gradient design (no logos or text), and a small set of keys, soft natural window light, warm earth tones with hints of teal, editorial travel-finance aesthetic, shallow depth of field",
  },
  {
    slug: "pillar-business-credit",
    prompt: "Modern small business owner in their 30s in a small bright workspace, casual professional clothing, looking at a laptop while holding a credit card, natural light from a large window, plants visible in background, candid moment, editorial photography, neutral palette with warm accents, no text or logos visible, magazine-quality",
  },
  {
    slug: "best-cashback",
    prompt: "Overhead editorial still life, scattered coins of various denominations on a clean cream-colored surface with one credit card placed neatly among them, abstract card design with no logos or text, soft directional light, modern fintech aesthetic, color palette of warm metallic gold and clean cream",
  },
  {
    slug: "best-travel",
    prompt: "Editorial photo of an airplane wing seen through a window above a layer of soft white clouds at golden hour, warm sunset light catching the wing edge, color palette of warm orange and deep blue, magazine-quality travel photography, no text, no logos",
  },
  {
    slug: "best-secured",
    prompt: "Conceptual minimalist photo of a small concrete foundation stone or building cornerstone resting on smooth gray surface with soft side light, color palette of warm gray and cream, sense of solidity and starting point, editorial style, no text",
  },
  {
    slug: "best-business",
    prompt: "Top-down editorial photo of a clean wooden desk with a notebook open showing handwritten lists, a coffee cup, eyeglasses, a credit card with abstract design, and natural plant leaves casting soft shadows, warm afternoon light, color palette of warm wood tones and cream, modern small business aesthetic",
  },
  {
    slug: "best-miles",
    prompt: "Editorial close-up of vintage globe surface showing continents partially in soft warm light, with subtle motion blur suggesting travel, warm earth tones with deep blue accents, no text, magazine-quality conceptual photography",
  },
  {
    slug: "tools",
    prompt: "Modern minimalist still life of a calculator app on a clean smartphone screen visible at an angle on a soft cream surface, with a coffee cup and notepad nearby, top-down editorial photography, soft natural light, color palette of warm cream and soft navy blue, no text on screen, magazine-quality fintech aesthetic",
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
  const part = json.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData?.data);
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
  for (const h of HEROES) {
    const exists = ["png", "jpg", "jpeg", "webp"].some((ext) =>
      fs.existsSync(path.join(OUT_DIR, `${h.slug}.${ext}`))
    );
    if (exists) {
      console.log(`SKIP ${h.slug} (exists)`);
      continue;
    }
    const ok = await generateOne(h);
    if (!ok) {
      console.warn(`WARN: ${h.slug} failed, continuing...`);
    }
    await new Promise((r) => setTimeout(r, 1200));
  }
  console.log("\nDone. Heroes in:", OUT_DIR);
  const files = fs.readdirSync(OUT_DIR);
  console.log("Files:", files.join(", ") || "(none)");
})();
