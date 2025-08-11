import { describe, it, expect } from "@jest/globals";
import generateShadowUtilities from "../../src/scripts/utils/generateShadowUtilities";

describe("generateShadowUtilities", () => {
  describe("Tailwind mode (isTailwind: true)", () => {
    const testCases = [
      {
        name: "should generate shadow utilities from CSS content with shadow variables",
        cssContent: `
          --effect-shadow-2-layer-1-x: 0px;
          --effect-shadow-2-layer-1-y: 2px;
          --effect-shadow-4-layer-1-x: 0px;
          --effect-shadow-4-layer-1-y: 4px;
        `,
        expectations: {
          contains: [
            "@utility shadow-2 {",
            "@utility shadow-4 {",
            "var(--effect-shadow-2-layer-1-x)",
            "var(--effect-shadow-2-layer-2-color)",
            "var(--effect-shadow-4-layer-1-x)",
            "var(--effect-shadow-4-layer-2-color)"
          ]
        }
      },
      {
        name: "should generate complete shadow utility with both layers",
        cssContent: "--effect-shadow-6-layer-1-x: 0px;",
        expectations: {
          contains: [
            "@utility shadow-6 {",
            "box-shadow:",
            "var(--effect-shadow-6-layer-1-x)",
            "var(--effect-shadow-6-layer-1-y)",
            "var(--effect-shadow-6-layer-1-blur)",
            "var(--effect-shadow-6-layer-1-spread)",
            "var(--effect-shadow-6-layer-1-color)",
            "var(--effect-shadow-6-layer-2-x)",
            "var(--effect-shadow-6-layer-2-y)",
            "var(--effect-shadow-6-layer-2-blur)",
            "var(--effect-shadow-6-layer-2-spread)",
            "var(--effect-shadow-6-layer-2-color)",
            "}"
          ]
        }
      },
      {
        name: "should handle mixed content with other variables",
        cssContent: `
          --color-primary: #000;
          --effect-shadow-1-layer-1-x: 0px;
          --spacing-4: 16px;
          --effect-shadow-3-layer-2-y: 3px;
          --typography-body: normal;
        `,
        expectations: {
          contains: ["@utility shadow-1 {", "@utility shadow-3 {"],
          notContains: ["color-primary", "spacing-4", "typography-body"]
        }
      },
      {
        name: "should handle single digit and multi-digit shadow sizes",
        cssContent: `
          --effect-shadow-1-layer-1-x: 0px;
          --effect-shadow-100-layer-1-x: 0px;
        `,
        expectations: {
          contains: ["@utility shadow-1 {", "@utility shadow-100 {"]
        }
      }
    ];

    testCases.forEach(({ name, cssContent, expectations }) => {
      it(name, () => {
        const result = generateShadowUtilities(true, cssContent);
        
        if (expectations.contains) {
          expectations.contains.forEach(pattern => {
            expect(result).toContain(pattern);
          });
        }
        
        if (expectations.notContains) {
          expectations.notContains.forEach(pattern => {
            expect(result).not.toContain(pattern);
          });
        }
      });
    });

    it("should sort shadow sizes numerically", () => {
      const cssContent = `
        --effect-shadow-12-layer-1-x: 0px;
        --effect-shadow-2-layer-1-x: 0px;
        --effect-shadow-8-layer-1-x: 0px;
      `;

      const result = generateShadowUtilities(true, cssContent);

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

      const result = generateShadowUtilities(true, cssContent);

      // Should only appear once despite multiple variables with same size
      const matches = result.match(/@utility shadow-4 \{/g);
      expect(matches).toHaveLength(1);
    });

    const edgeCases = [
      {
        name: "should return empty string when no shadow variables found",
        cssContent: `
          --color-primary: #000;
          --spacing-4: 16px;
          --typography-heading: bold;
        `,
        expected: ""
      },
      {
        name: "should handle empty CSS content",
        cssContent: "",
        expected: ""
      }
    ];

    edgeCases.forEach(({ name, cssContent, expected }) => {
      it(name, () => {
        const result = generateShadowUtilities(true, cssContent);
        expect(result).toBe(expected);
      });
    });
  });

  describe("Plain CSS mode (isTailwind: false)", () => {
    it("should generate plain CSS utilities with correct structure", () => {
      const cssContent = `
        --effect-shadow-4-layer-1-x: 0px;
        --effect-shadow-8-layer-1-x: 0px;
      `;

      const result = generateShadowUtilities(false, cssContent);

      const expectedPatterns = [
        ".shadow-4 {",
        ".shadow-8 {", 
        "box-shadow:",
        "var(--effect-shadow-4-layer-1-x)",
        "var(--effect-shadow-4-layer-2-color)"
      ];

      expectedPatterns.forEach(pattern => {
        expect(result).toContain(pattern);
      });

      expect(result).not.toContain("@utility");
    });

    it("should generate complete plain CSS shadow utility structure", () => {
      const cssContent = `--effect-shadow-6-layer-1-x: 0px;`;

      const result = generateShadowUtilities(false, cssContent);

      expect(result).toBe(`.shadow-6 {
box-shadow: 
var(--effect-shadow-6-layer-1-x) 
var(--effect-shadow-6-layer-1-y) 
var(--effect-shadow-6-layer-1-blur) 
var(--effect-shadow-6-layer-1-spread) 
var(--effect-shadow-6-layer-1-color),
var(--effect-shadow-6-layer-2-x) 
var(--effect-shadow-6-layer-2-y) 
var(--effect-shadow-6-layer-2-blur) 
var(--effect-shadow-6-layer-2-spread) 
var(--effect-shadow-6-layer-2-color);
}`);
    });

    it("should handle multiple shadow utilities and sort numerically in plain CSS mode", () => {
      const cssContent = `
        --effect-shadow-10-layer-1-x: 0px;
        --effect-shadow-2-layer-1-x: 0px;
        --effect-shadow-5-layer-1-x: 0px;
      `;

      const result = generateShadowUtilities(false, cssContent);

      // Check both utilities are present and properly structured
      expect(result).toContain(".shadow-2 {");
      expect(result).toContain(".shadow-5 {");
      expect(result).toContain(".shadow-10 {");
      expect(result).toMatch(/\.shadow-2 \{[\s\S]*box-shadow:[\s\S]*\}/);
      expect(result).toMatch(/\.shadow-10 \{[\s\S]*box-shadow:[\s\S]*\}/);

      // Verify numerical sorting
      const shadowOrder = result.match(/\.shadow-(\d+)/g);
      expect(shadowOrder).toEqual([".shadow-2", ".shadow-5", ".shadow-10"]);
    });
  });
});
