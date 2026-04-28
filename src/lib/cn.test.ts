import { describe, it, expect } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("merges tailwind classes deduping conflicts", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
  it("handles falsy values", () => {
    expect(cn("p-2", false, undefined, "text-red-500")).toBe("p-2 text-red-500");
  });
});
