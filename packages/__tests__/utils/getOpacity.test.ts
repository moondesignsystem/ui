import { describe, it, expect } from "@jest/globals";
import getOpacity from "../../src/scripts/utils/getOpacity";

describe("getOpacity", () => {
  const testCases = [
    // Boundary values
    { input: 100, expected: 1, description: "full opacity" },
    { input: 0, expected: 0, description: "no opacity" },
    
    // Common percentages
    { input: 50, expected: 0.5, description: "half opacity" },
    { input: 25, expected: 0.25, description: "quarter opacity" },
    { input: 75, expected: 0.75, description: "three-quarter opacity" },
    
    // Decimal percentages
    { input: 12.5, expected: 0.125, description: "decimal percentage" },
    
    // Edge cases
    { input: 1, expected: 0.01, description: "one percent" },
    { input: 99, expected: 0.99, description: "near full opacity" },
    { input: 0.1, expected: 0.001, description: "very small percentage" }
  ];

  testCases.forEach(({ input, expected, description }) => {
    it(`should convert ${input}% to ${expected} (${description})`, () => {
      expect(getOpacity(input)).toBe(expected);
    });
  });
});
