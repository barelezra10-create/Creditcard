import { z } from "zod";

export const CARD_CATEGORIES = [
  "cashback",
  "travel",
  "rewards",
  "miles",
  "hotel",
  "secured",
  "rebuilding",
  "business",
  "student",
  "no-credit",
  "balance-transfer",
] as const;

const AprRange = z.object({ min: z.number(), max: z.number() });

export const CardSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  issuer: z.string(),
  name: z.string(),
  network: z.enum(["Visa", "Mastercard", "Amex", "Discover"]),
  category: z.array(z.enum(CARD_CATEGORIES)).min(1),
  apr_purchase: AprRange,
  apr_intro: z.number().nullable(),
  apr_intro_months: z.number().int().min(0),
  apr_balance_transfer: AprRange,
  apr_cash_advance: z.number(),
  annual_fee: z.number(),
  foreign_tx_fee: z.number().min(0).max(1),
  balance_transfer_fee: z.number().min(0).max(1),
  signup_bonus: z.string().nullable(),
  signup_bonus_spend: z.number().nullable(),
  signup_bonus_value_usd: z.number().nullable(),
  rewards: z.record(z.string(), z.number()),
  rewards_type: z.enum(["cashback", "points", "miles", "none"]),
  points_value_cents: z.number().nullable(),
  credit_score_required: z.object({ min: z.number(), recommended: z.number() }),
  perks: z.array(z.string()),
  drawbacks: z.array(z.string()),
  application_url: z.string().url(),
  last_updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export type Card = z.infer<typeof CardSchema>;
export type CardCategory = (typeof CARD_CATEGORIES)[number];
