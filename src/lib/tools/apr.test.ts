import { describe, it, expect } from "vitest";
import { dailyInterestCost, monthlyInterestCost } from "./apr";

describe("APR calcs", () => {
  it("daily cost", () => {
    expect(dailyInterestCost(1000, 0.2433)).toBeCloseTo(0.6666, 3);
  });
  it("monthly cost", () => {
    expect(monthlyInterestCost(1000, 0.24)).toBeCloseTo(20, 1);
  });
});
