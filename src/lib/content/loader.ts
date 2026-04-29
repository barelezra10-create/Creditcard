import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ArticleFrontmatter, type ArticleMeta } from "./types";

const ROOT = path.join(process.cwd(), "content");

export function loadArticles(subdir: string): ArticleMeta[] {
  const dir = path.join(ROOT, subdir);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile() && d.name.endsWith(".mdx"))
    .map((d) => {
      const raw = fs.readFileSync(path.join(dir, d.name), "utf8");
      const { data, content } = matter(raw);
      const fm = ArticleFrontmatter.parse(data);
      return { ...fm, slug: d.name.replace(/\.mdx$/, ""), body: content };
    });
}

export function loadArticle(subdir: string, slug: string): ArticleMeta | null {
  return loadArticles(subdir).find((a) => a.slug === slug) ?? null;
}
