import { z } from "zod";

export const ArticleFrontmatter = z.object({
  title: z.string(),
  description: z.string(),
  pillar: z.string().optional(),
  publishedAt: z.string(),
  updatedAt: z.string().optional(),
  author: z.string().default("The Credit Card Pick Editorial"),
});

export type ArticleMeta = z.infer<typeof ArticleFrontmatter> & { slug: string; body: string };
