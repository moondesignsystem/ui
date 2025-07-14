import { describe, it, expect } from "@jest/globals";
import generateShadowUtilities from "../../src/scripts/utils/generateShadowUtilities";

describe("generateShadowUtilities", () => {
  it("should generate shadow utilities from CSS content with shadow variables", () => {
    const cssContent = `
      --effect-shadow-2-layer-1-x: 0px;
      --effect-shadow-2-layer-1-y: 2px;
      --effect-shadow-4-layer-1-x: 0px;
      --effect-shadow-4-layer-1-y: 4px;
    `;

    const result = generateShadowUtilities(cssContent);

    expect(result).toContain("@utility shadow-2 {");
    expect(result).toContain("@utility shadow-4 {");
    expect(result).toContain("var(--effect-shadow-2-layer-1-x)");
    expect(result).toContain("var(--effect-shadow-2-layer-2-color)");
    expect(result).toContain("var(--effect-shadow-4-layer-1-x)");
    expect(result).toContain("var(--effect-shadow-4-layer-2-color)");
  });

  it("should sort shadow sizes numerically", () => {
    const cssContent = `
      --effect-shadow-12-layer-1-x: 0px;
      --effect-shadow-2-layer-1-x: 0px;
      --effect-shadow-8-layer-1-x: 0px;
    `;

    const result = generateShadowUtilities(cssContent);

    // Check that shadow-2 comes before shadow-8 which comes before shadow-12
    const shadow2Index = result.indexOf("@utility shadow-2 {");
    const shadow8Index = result.indexOf("@utility shadow-8 {");
    const shadow12Index = result.indexOf("@utility shadow-12 {");

    expect(shadow2Index).toBeLessThan(shadow8Index);
    expect(shadow8Index).toBeLessThan(shadow12Index);
  });

  it("should handle duplicate shadow sizes", () => {
    const cssContent = `
      --effect-shadow-4-layer-1-x: 0px;
      --effect-shadow-4-layer-1-y: 4px;
      --effect-shadow-4-layer-2-x: 0px;
      --effect-shadow-4-layer-2-y: 4px;
    `;

    const result = generateShadowUtilities(cssContent);

    // Should only appear once despite multiple variables with same size
    const matches = result.match(/@utility shadow-4 \{/g);
    expect(matches).toHaveLength(1);
  });

  it("should return empty string when no shadow variables found", () => {
    const cssContent = `
      --color-primary: #000;
      --spacing-4: 16px;
      --typography-heading: bold;
    `;

    const result = generateShadowUtilities(cssContent);

    expect(result).toBe("");
  });

  it("should handle empty CSS content", () => {
    const result = generateShadowUtilities("");

    expect(result).toBe("");
  });

  it("should generate complete shadow utility with both layers", () => {
    const cssContent = "--effect-shadow-6-layer-1-x: 0px;";

    const result = generateShadowUtilities(cssContent);

    expect(result).toContain("@utility shadow-6 {");
    expect(result).toContain("box-shadow:");
    expect(result).toContain("var(--effect-shadow-6-layer-1-x)");
    expect(result).toContain("var(--effect-shadow-6-layer-1-y)");
    expect(result).toContain("var(--effect-shadow-6-layer-1-blur)");
    expect(result).toContain("var(--effect-shadow-6-layer-1-spread)");
    expect(result).toContain("var(--effect-shadow-6-layer-1-color)");
    expect(result).toContain("var(--effect-shadow-6-layer-2-x)");
    expect(result).toContain("var(--effect-shadow-6-layer-2-y)");
    expect(result).toContain("var(--effect-shadow-6-layer-2-blur)");
    expect(result).toContain("var(--effect-shadow-6-layer-2-spread)");
    expect(result).toContain("var(--effect-shadow-6-layer-2-color)");
    expect(result).toContain("}");
  });

  it("should handle mixed content with other variables", () => {
    const cssContent = `
      --color-primary: #000;
      --effect-shadow-1-layer-1-x: 0px;
      --spacing-4: 16px;
      --effect-shadow-3-layer-2-y: 3px;
      --typography-body: normal;
    `;

    const result = generateShadowUtilities(cssContent);

    expect(result).toContain("@utility shadow-1 {");
    expect(result).toContain("@utility shadow-3 {");
    expect(result).not.toContain("color-primary");
    expect(result).not.toContain("spacing-4");
    expect(result).not.toContain("typography-body");
  });

  it("should handle single digit and multi-digit shadow sizes", () => {
    const cssContent = `
      --effect-shadow-1-layer-1-x: 0px;
      --effect-shadow-10-layer-1-x: 0px;
      --effect-shadow-100-layer-1-x: 0px;
    `;

    const result = generateShadowUtilities(cssContent);

    expect(result).toContain("@utility shadow-1 {");
    expect(result).toContain("@utility shadow-10 {");
    expect(result).toContain("@utility shadow-100 {");

    // Check sorting is correct
    const shadow1Index = result.indexOf("@utility shadow-1 {");
    const shadow10Index = result.indexOf("@utility shadow-10 {");
    const shadow100Index = result.indexOf("@utility shadow-100 {");

    expect(shadow1Index).toBeLessThan(shadow10Index);
    expect(shadow10Index).toBeLessThan(shadow100Index);
  });
});
