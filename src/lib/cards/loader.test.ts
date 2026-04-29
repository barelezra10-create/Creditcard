import { describe, it, expect } from "vitest";
import { loadAllCards, loadCardBySlug } from "./loader";

describe("loadAllCards", () => {
  it("loads test fixture card", () => {
    const cards = loadAllCards();
    expect(cards.find((c) => c.slug === "citi-double-cash")).toBeDefined();
  });
});

describe("loadCardBySlug", () => {
  it("returns card by slug", () => {
    const c = loadCardBySlug("citi-double-cash");
    expect(c?.name).toBe("Double Cash Card");
  });
  it("returns null for missing slug", () => {
    expect(loadCardBySlug("nope")).toBeNull();
  });
});
