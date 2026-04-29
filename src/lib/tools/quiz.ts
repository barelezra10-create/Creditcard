import type { Card } from "@/lib/cards/types";

export type Answers = {
  goal: "cashback" | "travel" | "build" | "balance-transfer" | "business";
  creditScore: number;
  annualFeeOk: boolean;
  monthlySpend: number;
  categories: string[];
};

export function recommendFromAnswers(cards: Card[], a: Answers): Card[] {
  const goalToCategory: Record<Answers["goal"], string[]> = {
    cashback: ["cashback"],
    travel: ["travel", "rewards"],
    build: ["secured", "rebuilding"],
    "balance-transfer": ["balance-transfer", "cashback"],
    business: ["business"],
  };
  const wanted = goalToCategory[a.goal];
  return cards
    .filter((c) => c.category.some((cat) => wanted.includes(cat)))
    .filter((c) => c.credit_score_required.recommended <= a.creditScore + 30)
    .filter((c) => a.annualFeeOk || c.annual_fee === 0)
    .sort((a, b) => (b.signup_bonus_value_usd ?? 0) - (a.signup_bonus_value_usd ?? 0))
    .slice(0, 5);
}
