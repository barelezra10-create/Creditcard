import type { Card } from "@/lib/cards/types";

export type SpendByCategory = Record<string, number>;

export function yearlyRewardsValue(card: Card, monthlySpend: SpendByCategory): number {
  let yearly = 0;
  for (const [cat, monthly] of Object.entries(monthlySpend)) {
    const rate = card.rewards[cat] ?? card.rewards.other ?? 0;
    const annual = monthly * 12;
    if (card.rewards_type === "cashback") {
      yearly += annual * (rate / 100);
    } else {
      const cents = card.points_value_cents ?? 1;
      yearly += annual * rate * (cents / 100);
    }
  }
  return +yearly.toFixed(2);
}
