import { describe, it, expect } from "vitest";
import { studentLoanMonthlyPayment } from "./student-loan";

describe("studentLoanMonthlyPayment", () => {
  it("computes monthly payment for a fixed loan", () => {
    const r = studentLoanMonthlyPayment(30000, 0.07, 10);
    expect(r.monthly).toBeCloseTo(348.33, 0);
    expect(r.totalInterest).toBeGreaterThan(11000);
  });
  it("handles 0 APR", () => {
    const r = studentLoanMonthlyPayment(12000, 0, 5);
    expect(r.monthly).toBe(200);
    expect(r.totalInterest).toBe(0);
  });
});
