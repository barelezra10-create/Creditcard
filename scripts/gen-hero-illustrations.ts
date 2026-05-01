import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) throw new Error("GEMINI_API_KEY not set");

const MODEL = "gemini-3-pro-image-preview";
const ASPECT = "16:9";
const OUT_DIR = path.join(process.cwd(), "public/images/heroes");
fs.mkdirSync(OUT_DIR, { recursive: true });

type Hero = { slug: string; prompt: string };

const HEROES: Hero[] = [
  {
    slug: "homepage-illu-1-flat",
    prompt: "Modern flat vector illustration in the style of Notion or Linear marketing pages, NOT photorealistic, friendly cartoon character (gender-neutral, casual modern outfit) holding a credit card and looking happy at a calculator app on a phone, clean geometric shapes, thick outlines, color palette of deep navy, soft amber, mint green, cream background with subtle geometric patterns, no text, isometric perspective with floating UI elements (small chart, percentage symbol, dollar sign) around the character, premium fintech illustration aesthetic, 16:9 landscape",
  },
  {
    slug: "homepage-illu-2-iso-scene",
    prompt: "Isometric vector illustration in the style of fintech app marketing (think Stripe or Plaid landing pages), NOT photorealistic, an isometric scene showing 3-4 floating credit cards arranged at varying depths over a stylized navy gradient platform, with abstract data visualization elements (small bar chart, line graph, donut chart) floating around them, color palette of deep navy, electric teal, warm amber, soft pink accents, geometric clean style with thick outlines and flat colors, no people no text on cards, premium illustration aesthetic, 16:9 landscape",
  },
  {
    slug: "homepage-illu-3-character-stack",
    prompt: "Friendly modern illustration in the style of MailChimp or Duolingo, three diverse cartoon characters of different ages and ethnicities standing together each holding a different colored credit card, expressive faces with subtle smiles, casual modern clothing, abstract floating elements behind them (coins, percentage symbols, small chart, gift box), color palette of soft cream background with deep navy outlines and accent colors of mint green, warm amber, dusty rose, vector style with thick outlines, no text, premium playful aesthetic, 16:9 landscape",
  },
  {
    slug: "homepage-illu-4-mascot-rocket",
    prompt: "Bold vector illustration of a friendly cartoon mascot character (rounded cute geometric design, big eyes, slight smile) sitting confidently at the top of a stack of credit cards arranged like a podium or ladder, with stylized speed lines and small confetti elements suggesting upward momentum, color palette of deep navy background fading to soft amber sunset, mint green accents, the mascot wears a small graduation cap or crown to suggest 'top pick', vector flat style with thick outlines and bold color blocks, no text on cards, premium friendly fintech aesthetic, 16:9 landscape",
  },
];

async function generateOne(h: Hero) {
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
    console.error(`FAIL ${h.slug}:`, res.status, await res.text());
    return false;
  }
  const json: any = await res.json();
  const part = json.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData?.data);
  if (!part) {
    console.error(`NO IMAGE ${h.slug}`);
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
    await generateOne(h);
    await new Promise((r) => setTimeout(r, 1500));
  }
})();
