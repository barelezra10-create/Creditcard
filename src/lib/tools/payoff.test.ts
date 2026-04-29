import { describe, it, expect } from "vitest";
import { payoffTimeline } from "./payoff";

describe("payoffTimeline", () => {
  it("computes payoff months and total interest", () => {
    const r = payoffTimeline({ balance: 3000, apr: 0.22, monthlyPayment: 200 });
    expect(r.months).toBeGreaterThan(15);
    expect(r.months).toBeLessThan(24);
    expect(r.totalInterest).toBeGreaterThan(0);
  });
  it("returns infinite if payment doesn't cover interest", () => {
    const r = payoffTimeline({ balance: 10000, apr: 0.30, monthlyPayment: 50 });
    expect(r.months).toBe(Infinity);
  });
});
