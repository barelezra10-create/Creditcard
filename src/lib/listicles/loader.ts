import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ListicleSchema, type Listicle } from "./types";

const DIR = path.join(process.cwd(), "content/best");

export function loadAllListicles(): Listicle[] {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR).filter((f) => f.endsWith(".mdx")).map((f) => {
    const raw = fs.readFileSync(path.join(DIR, f), "utf8");
    const { data } = matter(raw);
    return ListicleSchema.parse({ ...data, slug: f.replace(/\.mdx$/, "") });
  });
}

export function loadListicleBySlug(slug: string): Listicle | null {
  return loadAllListicles().find((l) => l.slug === slug) ?? null;
}
