import { describe, it, expect } from "@jest/globals";
import generateTypographyUtilities from "../../src/scripts/utils/generateTypographyUtilities";

describe("generateTypographyUtilities", () => {
  describe("Tailwind mode (isTailwind: true)", () => {
    const testCases = [
      {
        name: "should generate typography utilities from CSS content with font-size variables",
        cssContent: `
          --text-body-14-font-size: 14px;
          --text-heading-24-font-size: 24px;
          --text-caption-12-font-size: 12px;
        `,
        expectations: {
          contains: [
            "@utility text-body-14 {",
            "@utility text-heading-24 {", 
            "@utility text-caption-12 {",
            "font-size: var(--text-body-14-font-size);",
            "line-height: var(--text-body-14-line-height);",
            "font-weight: var(--text-body-14-font-weight);",
            "font-family: var(--text-body-14-font-family);"
          ]
        }
      },
      {
        name: "should handle mixed content with other variables",
        cssContent: `
          --color-primary: #000;
          --text-small-10-font-size: 10px;
          --spacing-8: 32px;
          --text-large-32-font-size: 32px;
          --effect-shadow-4-x: 4px;
        `,
        expectations: {
          contains: ["@utility text-small-10 {", "@utility text-large-32 {"],
          notContains: ["color-primary", "spacing-8", "effect-shadow"]
        }
      },
      {
        name: "should handle various naming patterns",
        cssContent: `
          --text-body1-16-font-size: 16px;
          --text-H1-32-font-size: 32px;
          --text-caption2-10-font-size: 10px;
          --text-subtitle1-18-font-size: 18px;
        `,
        expectations: {
          contains: [
            "@utility text-body1-16 {",
            "@utility text-H1-32 {",
            "@utility text-caption2-10 {",
            "@utility text-subtitle1-18 {"
          ]
        }
      },
      {
        name: "should handle different font-size value formats",
        cssContent: `
          --text-rem-16-font-size: 1rem;
          --text-em-14-font-size: 0.875em;
          --text-px-12-font-size: 12px;
          --text-percent-18-font-size: 112.5%;
        `,
        expectations: {
          contains: [
            "@utility text-rem-16 {",
            "@utility text-em-14 {",
            "@utility text-px-12 {",
            "@utility text-percent-18 {"
          ]
        }
      },
      {
        name: "should handle complex variable names with hyphens and numbers",
        cssContent: `
          --text-display-48-font-size: 48px;
          --text-body-16-font-size: 16px;
          --text-label-12-font-size: 12px;
        `,
        expectations: {
          contains: [
            "@utility text-display-48 {",
            "@utility text-body-16 {",
            "@utility text-label-12 {"
          ]
        }
      },
      {
        name: "should handle single character names and large sizes",
        cssContent: `
          --text-h-72-font-size: 72px;
          --text-p-14-font-size: 14px;
          --text-a-999-font-size: 999px;
          --text-z-1-font-size: 1px;
        `,
        expectations: {
          contains: [
            "@utility text-h-72 {",
            "@utility text-p-14 {",
            "@utility text-a-999 {",
            "@utility text-z-1 {",
            "var(--text-a-999-font-size)",
            "var(--text-z-1-font-size)"
          ]
        }
      }
    ];

    testCases.forEach(({ name, cssContent, expectations }) => {
      it(name, () => {
        const result = generateTypographyUtilities(true, cssContent);
        
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

    it("should handle duplicate font-size entries", () => {
      const cssContent = `
        --text-body-16-font-size: 16px;
        --text-body-16-line-height: 24px;
        --text-body-16-font-weight: 400;
        --text-body-16-font-family: "Inter";
      `;

      const result = generateTypographyUtilities(true, cssContent);

      // Should only generate one utility even with multiple related variables
      const matches = result.match(/@utility text-body-16 \{/g);
      expect(matches).toHaveLength(1);
    });

    it("should generate complete typography utility with all properties", () => {
      const cssContent = "--text-title-20-font-size: 20px;";

      const result = generateTypographyUtilities(true, cssContent);

      expect(result).toContain("@utility text-title-20 {");
      expect(result).toContain("font-size: var(--text-title-20-font-size);");
      expect(result).toContain("line-height: var(--text-title-20-line-height);");
      expect(result).toContain("font-weight: var(--text-title-20-font-weight);");
      expect(result).toContain("font-family: var(--text-title-20-font-family);");
      expect(result).toContain("}");
    });

    const edgeCases = [
      {
        name: "should return empty string when no typography variables found",
        cssContent: `
          --color-primary: #000;
          --spacing-4: 16px;
          --effect-shadow-2-x: 2px;
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
        const result = generateTypographyUtilities(true, cssContent);
        expect(result).toBe(expected);
      });
    });
  });

  describe("Plain CSS mode (isTailwind: false)", () => {
    it("should generate plain CSS utilities with correct structure", () => {
      const cssContent = `
        --text-body-16-font-size: 16px;
        --text-heading-20-font-size: 20px;
      `;

      const result = generateTypographyUtilities(false, cssContent);

      const expectedPatterns = [
        ".text-body-16 {",
        ".text-heading-20 {",
        "font-size: var(--text-body-16-font-size);",
        "line-height: var(--text-body-16-line-height);",
        "font-weight: var(--text-body-16-font-weight);",
        "font-family: var(--text-body-16-font-family);"
      ];

      expectedPatterns.forEach(pattern => {
        expect(result).toContain(pattern);
      });

      expect(result).not.toContain("@utility");
    });

    it("should generate complete plain CSS utility structure", () => {
      const cssContent = `--text-caption-12-font-size: 12px;`;

      const result = generateTypographyUtilities(false, cssContent);

      expect(result).toBe(`.text-caption-12 {
font-size: var(--text-caption-12-font-size);
line-height: var(--text-caption-12-line-height);
font-weight: var(--text-caption-12-font-weight);
font-family: var(--text-caption-12-font-family);
}`);
    });

    it("should handle multiple utilities in plain CSS mode", () => {
      const cssContent = `
        --text-small-10-font-size: 10px;
        --text-large-24-font-size: 24px;
      `;

      const result = generateTypographyUtilities(false, cssContent);

      expect(result).toContain(".text-small-10 {");
      expect(result).toContain(".text-large-24 {");
      
      // Check both utilities are properly structured
      expect(result).toMatch(/\.text-small-10 \{[\s\S]*font-size:[\s\S]*\}/);
      expect(result).toMatch(/\.text-large-24 \{[\s\S]*font-size:[\s\S]*\}/);
    });
  });
});
