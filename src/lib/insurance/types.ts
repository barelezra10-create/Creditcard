import { z } from "zod";

export const COVERAGE_TYPES = ["liability-only", "full-coverage", "minimum-state", "high-value"] as const;

export const AutoInsuranceSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  carrier: z.string(),
  states_available: z.union([z.literal("all"), z.array(z.string())]),
  avg_annual_premium: z.object({ min: z.number(), max: z.number() }),
  bundling_discount_pct: z.number().nullable(),
  good_driver_discount_pct: z.number().nullable(),
  am_best_rating: z.string(),
  jd_power_satisfaction: z.number().nullable(),
  digital_experience: z.enum(["excellent", "good", "fair"]),
  claims_process: z.enum(["app", "phone", "online", "all"]),
  best_for: z.string(),
  coverage_types_offered: z.array(z.enum(COVERAGE_TYPES)),
  perks: z.array(z.string()),
  drawbacks: z.array(z.string()),
  quote_url: z.string().url(),
  rating: z.number().min(1).max(5).optional(),
  last_updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export type AutoInsurance = z.infer<typeof AutoInsuranceSchema>;
