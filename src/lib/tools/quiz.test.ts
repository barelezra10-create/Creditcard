import { describe, it, expect } from "vitest";
import { recommendFromAnswers } from "./quiz";
import { loadAllCards } from "@/lib/cards/loader";

describe("recommendFromAnswers", () => {
  it("recommends cashback for low-spend simple-rewards user with good credit", () => {
    const recs = recommendFromAnswers(loadAllCards(), {
      goal: "cashback",
      creditScore: 720,
      annualFeeOk: false,
      monthlySpend: 1500,
      categories: ["other"],
    });
    expect(recs[0].category).toContain("cashback");
  });
});
