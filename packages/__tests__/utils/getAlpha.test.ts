import { describe, it, expect } from "@jest/globals";
import getAlpha from "../../src/scripts/utils/getAlpha";

describe("getAlpha", () => {
  it("should return empty string for alpha value of 1", () => {
    expect(getAlpha(1)).toBe("");
  });

  const testCases = [
    // Standard alpha values
    { alpha: 0.8, expected: " / 0.80", description: "0.8 alpha value" },
    { alpha: 0.5, expected: " / 0.50", description: "0.5 alpha value" },
    { alpha: 0.25, expected: " / 0.25", description: "0.25 alpha value" },
    
    // Zero and very small values
    { alpha: 0, expected: " / 0", description: "zero alpha value" },
    { alpha: 0.01, expected: " / 0.01", description: "small alpha value (0.01)" },
    { alpha: 0.001, expected: " / 0", description: "very small alpha value (0.001 rounds to 0.00)" },
    
    // Edge cases and rounding
    { alpha: 0.005, expected: " / 0.01", description: "edge case (0.005 rounds to 0.01)" },
    { alpha: 0.123, expected: " / 0.12", description: "three decimal places (truncated)" },
    { alpha: 0.999, expected: " / 1.00", description: "near 1 value (0.999)" }
  ];

  testCases.forEach(({ alpha, expected, description }) => {
    it(`should handle ${description}`, () => {
      expect(getAlpha(alpha)).toBe(expected);
    });
  });
});
