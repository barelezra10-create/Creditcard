import { describe, it, expect } from "vitest";
import { CardSchema } from "./types";

describe("CardSchema", () => {
  it("accepts a complete valid card", () => {
    const card = {
      slug: "chase-sapphire-preferred",
      issuer: "Chase",
      name: "Sapphire Preferred",
      network: "Visa",
      category: ["travel", "rewards"],
      apr_purchase: { min: 21.49, max: 28.49 },
      apr_intro: null,
      apr_intro_months: 0,
      apr_balance_transfer: { min: 21.49, max: 28.49 },
      apr_cash_advance: 29.99,
      annual_fee: 95,
      foreign_tx_fee: 0,
      balance_transfer_fee: 0.05,
      signup_bonus: "60,000 points",
      signup_bonus_spend: 4000,
      signup_bonus_value_usd: 750,
      rewards: { other: 1, dining: 3, travel_chase_portal: 5 },
      rewards_type: "points",
      points_value_cents: 1.25,
      credit_score_required: { min: 690, recommended: 720 },
      perks: ["Trip cancellation"],
      drawbacks: ["$95 annual fee"],
      application_url: "https://www.chase.com/...",
      last_updated: "2026-04-28",
    };
    expect(() => CardSchema.parse(card)).not.toThrow();
  });

  it("rejects card missing required fields", () => {
    expect(() => CardSchema.parse({ slug: "x" })).toThrow();
  });
});
