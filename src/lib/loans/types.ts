import { z } from "zod";

export const STUDENT_LOAN_TYPES = ["private", "refinance"] as const;
export const REPAYMENT_TERMS = [5, 7, 10, 15, 20] as const;

export const StudentLoanSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  lender: z.string(),
  product_name: z.string(),
  type: z.enum(STUDENT_LOAN_TYPES),
  apr_range: z.object({ min: z.number(), max: z.number() }),
  apr_type: z.enum(["fixed", "variable", "both"]),
  loan_amount_min: z.number(),
  loan_amount_max: z.number().nullable(),
  repayment_terms_years: z.array(z.number()),
  cosigner_required: z.boolean(),
  cosigner_release_after_months: z.number().nullable(),
  origination_fee: z.number(),
  prepayment_penalty: z.boolean(),
  late_fee: z.string().nullable(),
  forbearance_available: z.boolean(),
  in_school_payment_options: z.array(z.string()),
  credit_score_required: z.object({ min: z.number(), recommended: z.number() }),
  perks: z.array(z.string()),
  drawbacks: z.array(z.string()),
  application_url: z.string().url(),
  rating: z.number().min(1).max(5).optional(),
  last_updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export type StudentLoan = z.infer<typeof StudentLoanSchema>;
