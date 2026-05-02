import { describe, it, expect } from "vitest";
import { loanMonthlyPayment } from "./loan-payment";

describe("loanMonthlyPayment", () => {
  it("computes monthly payment for a fixed loan in months", () => {
    const r = loanMonthlyPayment(20000, 0.10, 60);
    expect(r.monthly).toBeCloseTo(424.94, 0);
    expect(r.totalInterest).toBeGreaterThan(5000);
  });
  it("handles 0 APR", () => {
    const r = loanMonthlyPayment(12000, 0, 36);
    expect(r.monthly).toBeCloseTo(333.33, 1);
    expect(r.totalInterest).toBe(0);
  });
});
