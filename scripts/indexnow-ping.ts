import fs from "fs";
import path from "path";

const KEY = "thecreditcardpick-2026-04-28-indexnow-key";
const HOST = "thecreditcardpick.com";

const outDir = path.join(process.cwd(), "out");
if (!fs.existsSync(outDir)) {
  console.error("out/ directory not found - run `npm run build` first");
  process.exit(1);
}

fs.writeFileSync(path.join(outDir, `${KEY}.txt`), KEY);

const sitemap = fs.readFileSync(path.join(outDir, "sitemap.xml"), "utf8");
const urls = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1]);

const body = { host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls };

fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}).then((r) => console.log(`IndexNow ping: ${r.status} (${urls.length} urls)`)).catch((e) => console.error("IndexNow ping failed:", e));
