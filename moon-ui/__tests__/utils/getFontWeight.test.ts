import { describe, it, expect } from "@jest/globals";
import getFontWeight from "../../src/scripts/utils/getFontWeight";

describe("getFontWeight", () => {
  const numericTestCases = [
    { input: 400, expected: 400, description: "standard weight" },
    { input: 700, expected: 700, description: "bold weight" },
    { input: 100, expected: 100, description: "thin weight" }
  ];

  numericTestCases.forEach(({ input, expected, description }) => {
    it(`should return ${input} as-is (${description})`, () => {
      expect(getFontWeight(input)).toBe(expected);
    });
  });

  const stringTestCases = [
    // Standard weight names
    { input: "thin", expected: 100, description: "thin weight name" },
    { input: "extralight", expected: 200, description: "extralight weight name" },
    { input: "light", expected: 300, description: "light weight name" },
    { input: "regular", expected: 400, description: "regular weight name" },
    { input: "medium", expected: 500, description: "medium weight name" },
    { input: "semibold", expected: 600, description: "semibold weight name" },
    { input: "bold", expected: 700, description: "bold weight name" },
    { input: "extrabold", expected: 800, description: "extrabold weight name" },
    { input: "black", expected: 900, description: "black weight name" },
    
    // Case variations
    { input: "BOLD", expected: 700, description: "uppercase weight name" },
    { input: "Bold", expected: 700, description: "title case weight name" },
    { input: "REGULAR", expected: 400, description: "uppercase regular" },
    { input: "Medium", expected: 500, description: "title case medium" },
    
    // Variations with spaces and slashes
    { input: "semi bold", expected: 600, description: "weight name with space" },
    { input: "extra light", expected: 200, description: "compound weight with space" },
    { input: "semi/bold", expected: 600, description: "weight name with slash" },
    { input: "extra/light", expected: 200, description: "compound weight with slash" }
  ];

  stringTestCases.forEach(({ input, expected, description }) => {
    it(`should convert "${input}" to ${expected} (${description})`, () => {
      expect(getFontWeight(input)).toBe(expected);
    });
  });

  const invalidTestCases = [
    { input: "unknown", description: "unknown weight name" },
    { input: "invalid", description: "invalid weight name" },
    { input: "", description: "empty string" }
  ];

  invalidTestCases.forEach(({ input, description }) => {
    it(`should return undefined for "${input}" (${description})`, () => {
      expect(getFontWeight(input)).toBeUndefined();
    });
  });
});
