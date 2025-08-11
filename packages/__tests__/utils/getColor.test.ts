import { describe, it, expect } from "@jest/globals";
import getColor from "../../src/scripts/utils/getColor";

describe("getColor", () => {
  const testCases = [
    // Boundary values
    { input: 0, expected: 0, description: "boundary value 0" },
    { input: 1, expected: 255, description: "boundary value 1" },
    
    // Common values
    { input: 0.5, expected: 128, description: "middle value 0.5" },
    { input: 0.2, expected: 51, description: "decimal value 0.2" },
    { input: 0.8, expected: 204, description: "decimal value 0.8" },
    
    // Rounding behavior
    { input: 0.501, expected: 128, description: "rounding up (0.501)" },
    { input: 0.499, expected: 127, description: "rounding down (0.499)" },
    
    // Edge cases
    { input: 0.00001, expected: 0, description: "very small value" },
    { input: 0.99999, expected: 255, description: "very large value" }
  ];

  testCases.forEach(({ input, expected, description }) => {
    it(`should convert ${input} to ${expected} (${description})`, () => {
      expect(getColor(input)).toBe(expected);
    });
  });
});
