import { describe, it, expect } from "vitest";
import { loadAllCards, loadCardBySlug } from "./loader";

describe("loadAllCards", () => {
  it("loads test fixture card", () => {
    const cards = loadAllCards();
    expect(cards.find((c) => c.slug === "test-card")).toBeDefined();
  });
});

describe("loadCardBySlug", () => {
  it("returns card by slug", () => {
    const c = loadCardBySlug("test-card");
    expect(c?.name).toBe("Test Card");
  });
  it("returns null for missing slug", () => {
    expect(loadCardBySlug("nope")).toBeNull();
  });
});
