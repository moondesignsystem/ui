import { describe, it, expect } from "@jest/globals";
import getAlpha from "../../src/scripts/utils/getAlpha";

describe("getAlpha", () => {
  it("should return empty string for alpha value of 1", () => {
    expect(getAlpha(1)).toBe("");
  });

  it("should return formatted alpha for values less than 1", () => {
    expect(getAlpha(0.8)).toBe(" / 0.80");
    expect(getAlpha(0.5)).toBe(" / 0.50");
    expect(getAlpha(0.25)).toBe(" / 0.25");
  });

  it('should return "0" for zero alpha value', () => {
    expect(getAlpha(0)).toBe(" / 0");
  });

  it("should handle very small alpha values", () => {
    expect(getAlpha(0.01)).toBe(" / 0.01");
    expect(getAlpha(0.001)).toBe(" / 0"); // 0.001 gets fixed to "0.00" which becomes "0"
  });

  it("should handle edge case of 0.005 (rounds to 0.01)", () => {
    expect(getAlpha(0.005)).toBe(" / 0.01");
  });

  it("should format alpha values with proper decimals", () => {
    expect(getAlpha(0.123)).toBe(" / 0.12");
    expect(getAlpha(0.999)).toBe(" / 1.00");
  });
});
