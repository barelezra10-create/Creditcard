import fs from "fs";
import path from "path";
import { loadAllCards } from "../src/lib/cards/loader";

const lines = loadAllCards().map((c) => `/go/${c.slug} ${c.application_url} 302`);
const outPath = path.join(process.cwd(), "out/_redirects");
const existing = fs.existsSync(outPath) ? fs.readFileSync(outPath, "utf8") : "";
fs.writeFileSync(outPath, existing + (existing && !existing.endsWith("\n") ? "\n" : "") + lines.join("\n") + "\n");
console.log(`Wrote ${lines.length} affiliate redirects to _redirects`);
