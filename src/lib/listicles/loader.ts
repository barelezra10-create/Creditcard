import fs from "fs";
import path from "path";
import type matter from "gray-matter";
import { ListicleSchema, type Listicle } from "./types";

const DIR = path.join(process.cwd(), "content/best");

// Import gray-matter synchronously
const matterModule = require("gray-matter");
const matterFn: typeof matter = matterModule.default || matterModule;

export function loadAllListicles(): Listicle[] {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR).filter((f) => f.endsWith(".mdx")).map((f) => {
    const raw = fs.readFileSync(path.join(DIR, f), "utf8");
    const { data } = matterFn(raw);
    try {
      return ListicleSchema.parse({ ...data, slug: f.replace(/\.mdx$/, "") });
    } catch {
      return null;
    }
  }).filter((l): l is Listicle => l !== null);
}

export function loadListicleBySlug(slug: string): Listicle | null {
  return loadAllListicles().find((l) => l.slug === slug) ?? null;
}
