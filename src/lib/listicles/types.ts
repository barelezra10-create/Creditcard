import { z } from "zod";

export const ListicleSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  intro: z.string(),
  picks: z.array(z.object({
    cardSlug: z.string(),
    bestFor: z.string(),
    blurb: z.string().min(50),
  })).min(3),
  methodology: z.string(),
  faqs: z.array(z.object({ q: z.string(), a: z.string() })),
  last_updated: z.string(),
});
export type Listicle = z.infer<typeof ListicleSchema>;
