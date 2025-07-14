import { describe, it, expect } from "@jest/globals";
import getFontWeight from "../../src/scripts/utils/getFontWeight";

describe("getFontWeight", () => {
  it("should return numeric values as-is", () => {
    expect(getFontWeight(400)).toBe(400);
    expect(getFontWeight(700)).toBe(700);
    expect(getFontWeight(100)).toBe(100);
  });

  it("should convert string weight names to numbers", () => {
    expect(getFontWeight("thin")).toBe(100);
    expect(getFontWeight("extralight")).toBe(200);
    expect(getFontWeight("light")).toBe(300);
    expect(getFontWeight("regular")).toBe(400);
    expect(getFontWeight("medium")).toBe(500);
    expect(getFontWeight("semibold")).toBe(600);
    expect(getFontWeight("bold")).toBe(700);
    expect(getFontWeight("extrabold")).toBe(800);
    expect(getFontWeight("black")).toBe(900);
  });

  it("should handle case insensitive weight names", () => {
    expect(getFontWeight("BOLD")).toBe(700);
    expect(getFontWeight("Bold")).toBe(700);
    expect(getFontWeight("REGULAR")).toBe(400);
    expect(getFontWeight("Medium")).toBe(500);
  });

  it("should handle weight names with spaces and slashes", () => {
    expect(getFontWeight("semi bold")).toBe(600);
    expect(getFontWeight("extra light")).toBe(200);
    expect(getFontWeight("semi/bold")).toBe(600);
    expect(getFontWeight("extra/light")).toBe(200);
  });

  it("should return undefined for unknown weight names", () => {
    expect(getFontWeight("unknown")).toBeUndefined();
    expect(getFontWeight("invalid")).toBeUndefined();
    expect(getFontWeight("")).toBeUndefined();
  });
});
