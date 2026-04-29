import { describe, it, expect } from "vitest";
import { yearlyRewardsValue } from "./rewards-optimizer";
import { loadCardBySlug } from "@/lib/cards/loader";

describe("yearlyRewardsValue", () => {
  it("computes yearly $ value for a cashback card", () => {
    const card = loadCardBySlug("citi-double-cash")!;
    const v = yearlyRewardsValue(card, { other: 2000 });
    expect(v).toBeCloseTo(480, 0);
  });
});
