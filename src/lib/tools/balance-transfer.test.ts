import { describe, it, expect } from "vitest";
import { balanceTransferSavings } from "./balance-transfer";

describe("balanceTransferSavings", () => {
  it("computes savings vs paying off at high APR", () => {
    const r = balanceTransferSavings({ balance: 5000, currentApr: 0.24, transferApr: 0, transferAprMonths: 18, transferFeePct: 0.03, monthlyPayment: 300 });
    expect(r.transferFee).toBe(150);
    expect(r.payoffMonths).toBeGreaterThan(0);
    expect(r.totalInterestSaved).toBeGreaterThan(500);
  });
});
