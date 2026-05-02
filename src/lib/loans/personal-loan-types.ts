import { z } from "zod";

export const PersonalLoanSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  lender: z.string(),
  product_name: z.string(),
  apr_range: z.object({ min: z.number(), max: z.number() }),
  loan_amount_min: z.number(),
  loan_amount_max: z.number(),
  repayment_terms_months: z.array(z.number()),
  origination_fee: z.object({ min: z.number(), max: z.number() }),
  prepayment_penalty: z.boolean(),
  late_fee: z.string().nullable(),
  funding_speed: z.string(),
  credit_score_required: z.object({ min: z.number(), recommended: z.number() }),
  best_for: z.string(),
  perks: z.array(z.string()),
  drawbacks: z.array(z.string()),
  application_url: z.string().url(),
  rating: z.number().min(1).max(5).optional(),
  last_updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export type PersonalLoan = z.infer<typeof PersonalLoanSchema>;
