import { describe, it, expect } from "@jest/globals";
import replaceVariablesByPattern from "../../src/scripts/utils/replaceVariablesByPattern";

describe("replaceVariablesByPattern", () => {
  describe("Pattern replacements", () => {
    const replacementTestCases = [
      {
        description: "replace dimension-space variables with spacing-space",
        input: "--dimension-space-small: 8px; --dimension-space-large: 24px;",
        expected: "--spacing-space-small: 8px; --spacing-space-large: 24px;",
      },
      {
        description: "replace dimension-rounded variables with radius",
        input: "--dimension-rounded-small: 4px; --dimension-rounded-medium: 8px;",
        expected: "--radius-small: 4px; --radius-medium: 8px;",
      },
      {
        description: "replace text-font-family variables with font",
        input: '--text-font-family-heading: "Inter"; --text-font-family-body: "Roboto";',
        expected: '--font-heading: "Inter"; --font-body: "Roboto";',
      },
      {
        description: "replace text-font-weight variables with font-weight",
        input: "--text-font-weight-normal: 400; --text-font-weight-bold: 700;",
        expected: "--font-weight-normal: 400; --font-weight-bold: 700;",
      },
    ];

    replacementTestCases.forEach(({ description, input, expected }) => {
      it(`should ${description}`, () => {
        const result = replaceVariablesByPattern(input);
        expect(result).toBe(expected);
      });
    });

    it("should handle multiple patterns in the same content", () => {
      const input = `
      --dimension-space-small: 8px;
      --dimension-rounded-medium: 8px;
      --text-font-family-heading: "Inter";
      --text-font-weight-bold: 700;
    `;
      const result = replaceVariablesByPattern(input);
      expect(result).toContain("--spacing-space-small: 8px;");
      expect(result).toContain("--radius-medium: 8px;");
      expect(result).toContain('--font-heading: "Inter";');
      expect(result).toContain("--font-weight-bold: 700;");
    });
  });

  describe("Edge cases", () => {
    const edgeCaseTestCases = [
      {
        description: "return unchanged content when no patterns match",
        input: "--custom-variable: value; --another-var: 123;",
      },
      {
        description: "handle empty string",
        input: "",
      },
      {
        description: "handle content with no CSS variables",
        input: ".button { color: red; background: blue; }",
      },
    ];

    edgeCaseTestCases.forEach(({ description, input }) => {
      it(`should ${description}`, () => {
        const result = replaceVariablesByPattern(input);
        expect(result).toBe(input);
      });
    });
  });
});
