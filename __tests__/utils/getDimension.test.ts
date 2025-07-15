import { describe, it, expect } from "@jest/globals";
import getDimension from "../../src/scripts/utils/getDimension";

describe("getDimension", () => {
  it("should convert 0 to 0 (special case)", () => {
    expect(getDimension(0)).toBe(0);
  });

  const testCases = [
    // Positive integers
    { input: 16, expected: "16px", description: "positive integer" },
    { input: 32, expected: "32px", description: "larger positive integer" },
    
    // Decimal values
    { input: 8.5, expected: "8.5px", description: "decimal value" },
    { input: 24.25, expected: "24.25px", description: "multi-decimal value" },
    { input: 0.1, expected: "0.1px", description: "small decimal" },
    { input: 1.5, expected: "1.5px", description: "small positive decimal" },
    
    // Negative values
    { input: -10, expected: "-10px", description: "negative integer" },
    { input: -5.5, expected: "-5.5px", description: "negative decimal" },
    
    // Large values
    { input: 1000, expected: "1000px", description: "large integer" },
    { input: 9999.99, expected: "9999.99px", description: "large decimal" }
  ];

  testCases.forEach(({ input, expected, description }) => {
    it(`should convert ${input} to "${expected}" (${description})`, () => {
      expect(getDimension(input)).toBe(expected);
    });
  });
});
