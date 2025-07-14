import { describe, it, expect } from "@jest/globals";
import replaceVariablesByPattern from "../../src/scripts/utils/replaceVariablesByPattern";

describe("replaceVariablesByPattern", () => {
  it("should replace dimension-space variables with spacing-space", () => {
    const input =
      "--dimension-space-small: 8px; --dimension-space-large: 24px;";
    const result = replaceVariablesByPattern(input);
    expect(result).toBe(
      "--spacing-space-small: 8px; --spacing-space-large: 24px;"
    );
  });

  it("should replace dimension-rounded variables with radius", () => {
    const input =
      "--dimension-rounded-small: 4px; --dimension-rounded-medium: 8px;";
    const result = replaceVariablesByPattern(input);
    expect(result).toBe("--radius-small: 4px; --radius-medium: 8px;");
  });

  it("should replace text-font-family variables with font", () => {
    const input =
      '--text-font-family-heading: "Inter"; --text-font-family-body: "Roboto";';
    const result = replaceVariablesByPattern(input);
    expect(result).toBe('--font-heading: "Inter"; --font-body: "Roboto";');
  });

  it("should replace text-font-weight variables with font-weight", () => {
    const input =
      "--text-font-weight-normal: 400; --text-font-weight-bold: 700;";
    const result = replaceVariablesByPattern(input);
    expect(result).toBe("--font-weight-normal: 400; --font-weight-bold: 700;");
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

  it("should return unchanged content when no patterns match", () => {
    const input = "--custom-variable: value; --another-var: 123;";
    const result = replaceVariablesByPattern(input);
    expect(result).toBe(input);
  });

  it("should handle empty string", () => {
    const result = replaceVariablesByPattern("");
    expect(result).toBe("");
  });

  it("should handle content with no CSS variables", () => {
    const input = ".button { color: red; background: blue; }";
    const result = replaceVariablesByPattern(input);
    expect(result).toBe(input);
  });
});
