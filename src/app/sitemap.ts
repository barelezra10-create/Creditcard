import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { loadAllCards } from "@/lib/cards/loader";
import { loadAllListicles } from "@/lib/listicles/loader";
import { loadArticles } from "@/lib/content/loader";
import { PILLARS } from "@/lib/pillars";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date().toISOString();

  const entries: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, priority: 1 },
    { url: `${base}/cards/`, lastModified: now },
    { url: `${base}/tools/`, lastModified: now },
    { url: `${base}/learn/`, lastModified: now },
    { url: `${base}/compare/`, lastModified: now },
    { url: `${base}/glossary/`, lastModified: now },
    { url: `${base}/methodology/`, lastModified: now },
    { url: `${base}/how-we-make-money/`, lastModified: now },
    { url: `${base}/about/`, lastModified: now },
    { url: `${base}/privacy/`, lastModified: now },
    { url: `${base}/contact/`, lastModified: now },
  ];
  for (const c of loadAllCards()) entries.push({ url: `${base}/cards/${c.slug}/`, lastModified: c.last_updated });
  for (const l of loadAllListicles()) entries.push({ url: `${base}/best/${l.slug}/`, lastModified: l.last_updated, priority: 0.9 });
  for (const p of PILLARS) {
    entries.push({ url: `${base}/learn/${p.slug}/`, lastModified: now });
    for (const a of loadArticles(`learn/${p.slug}`)) entries.push({ url: `${base}/learn/${p.slug}/${a.slug}/`, lastModified: a.updatedAt ?? a.publishedAt });
  }
  for (const t of loadArticles("glossary")) entries.push({ url: `${base}/glossary/${t.slug}/`, lastModified: now, priority: 0.5 });
  for (const slug of ["which-card", "rewards-optimizer", "balance-transfer", "payoff", "apr"]) entries.push({ url: `${base}/tools/${slug}/`, lastModified: now });
  return entries;
}
