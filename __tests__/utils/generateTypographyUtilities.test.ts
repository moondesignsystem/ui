import { describe, it, expect } from "@jest/globals";
import generateTypographyUtilities from "../../src/scripts/utils/generateTypographyUtilities";

describe("generateTypographyUtilities", () => {
  it("should generate typography utilities from CSS content with font-size variables", () => {
    const cssContent = `
      --text-body-14-font-size: 14px;
      --text-heading-24-font-size: 24px;
      --text-caption-12-font-size: 12px;
    `;

    const result = generateTypographyUtilities(cssContent);

    expect(result).toContain("@utility text-body-14 {");
    expect(result).toContain("@utility text-heading-24 {");
    expect(result).toContain("@utility text-caption-12 {");
    expect(result).toContain("font-size: var(--text-body-14-font-size);");
    expect(result).toContain("line-height: var(--text-body-14-line-height);");
    expect(result).toContain("font-weight: var(--text-body-14-font-weight);");
    expect(result).toContain("font-family: var(--text-body-14-font-family);");
  });

  it("should handle duplicate font-size entries", () => {
    const cssContent = `
      --text-body-16-font-size: 16px;
      --text-body-16-line-height: 24px;
      --text-body-16-font-weight: 400;
      --text-body-16-font-family: "Inter";
    `;

    const result = generateTypographyUtilities(cssContent);

    // Should only generate one utility even with multiple related variables
    const matches = result.match(/@utility text-body-16 \{/g);
    expect(matches).toHaveLength(1);
  });

  it("should return empty string when no typography variables found", () => {
    const cssContent = `
      --color-primary: #000;
      --spacing-4: 16px;
      --effect-shadow-2-x: 2px;
    `;

    const result = generateTypographyUtilities(cssContent);

    expect(result).toBe("");
  });

  it("should handle empty CSS content", () => {
    const result = generateTypographyUtilities("");

    expect(result).toBe("");
  });

  it("should generate complete typography utility with all properties", () => {
    const cssContent = "--text-title-20-font-size: 20px;";

    const result = generateTypographyUtilities(cssContent);

    expect(result).toContain("@utility text-title-20 {");
    expect(result).toContain("font-size: var(--text-title-20-font-size);");
    expect(result).toContain("line-height: var(--text-title-20-line-height);");
    expect(result).toContain("font-weight: var(--text-title-20-font-weight);");
    expect(result).toContain("font-family: var(--text-title-20-font-family);");
    expect(result).toContain("}");
  });

  it("should handle mixed content with other variables", () => {
    const cssContent = `
      --color-primary: #000;
      --text-small-10-font-size: 10px;
      --spacing-8: 32px;
      --text-large-32-font-size: 32px;
      --effect-shadow-4-x: 4px;
    `;

    const result = generateTypographyUtilities(cssContent);

    expect(result).toContain("@utility text-small-10 {");
    expect(result).toContain("@utility text-large-32 {");
    expect(result).not.toContain("color-primary");
    expect(result).not.toContain("spacing-8");
    expect(result).not.toContain("effect-shadow");
  });

  it("should handle various naming patterns", () => {
    const cssContent = `
      --text-body1-16-font-size: 16px;
      --text-H1-32-font-size: 32px;
      --text-caption2-10-font-size: 10px;
      --text-subtitle1-18-font-size: 18px;
    `;

    const result = generateTypographyUtilities(cssContent);

    expect(result).toContain("@utility text-body1-16 {");
    expect(result).toContain("@utility text-H1-32 {");
    expect(result).toContain("@utility text-caption2-10 {");
    expect(result).toContain("@utility text-subtitle1-18 {");
  });

  it("should handle different font-size value formats", () => {
    const cssContent = `
      --text-rem-16-font-size: 1rem;
      --text-em-14-font-size: 0.875em;
      --text-px-12-font-size: 12px;
      --text-percent-18-font-size: 112.5%;
    `;

    const result = generateTypographyUtilities(cssContent);

    expect(result).toContain("@utility text-rem-16 {");
    expect(result).toContain("@utility text-em-14 {");
    expect(result).toContain("@utility text-px-12 {");
    expect(result).toContain("@utility text-percent-18 {");
  });

  it("should handle complex variable names with hyphens and numbers", () => {
    const cssContent = `
      --text-display-48-font-size: 48px;
      --text-body-16-font-size: 16px;
      --text-label-12-font-size: 12px;
    `;

    const result = generateTypographyUtilities(cssContent);

    expect(result).toContain("@utility text-display-48 {");
    expect(result).toContain("@utility text-body-16 {");
    expect(result).toContain("@utility text-label-12 {");
  });

  it("should handle single character names and large sizes", () => {
    const cssContent = `
      --text-h-72-font-size: 72px;
      --text-p-14-font-size: 14px;
      --text-a-16-font-size: 16px;
    `;

    const result = generateTypographyUtilities(cssContent);

    expect(result).toContain("@utility text-h-72 {");
    expect(result).toContain("@utility text-p-14 {");
    expect(result).toContain("@utility text-a-16 {");
  });
});
