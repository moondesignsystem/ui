import { describe, it, expect } from "@jest/globals";
import getFontFamily from "../../src/scripts/utils/getFontFamily";

describe("getFontFamily", () => {
  const testCases = [
    // Standard font names
    { input: "Inter", expected: '"Inter"', description: "simple font name" },
    { input: "Roboto", expected: '"Roboto"', description: "another simple font name" },
    { input: "Arial", expected: '"Arial"', description: "classic font name" },
    
    // Font names with spaces
    { input: "Times New Roman", expected: '"Times New Roman"', description: "font name with spaces" },
    { input: "Comic Sans MS", expected: '"Comic Sans MS"', description: "multi-word font name" },
    
    // Special characters and numbers
    { input: "Font-Name", expected: '"Font-Name"', description: "font name with hyphen" },
    { input: "Font_Name", expected: '"Font_Name"', description: "font name with underscore" },
    { input: "Font123", expected: '"Font123"', description: "font name with numbers" },
    
    // Edge case
    { input: "", expected: '""', description: "empty string" }
  ];

  testCases.forEach(({ input, expected, description }) => {
    it(`should wrap "${input}" in quotes (${description})`, () => {
      expect(getFontFamily(input)).toBe(expected);
    });
  });
});
