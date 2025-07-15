import { describe, it, expect } from "@jest/globals";
import generateBorderUtilities from "../../src/scripts/utils/generateBorderUtilities";

describe("generateBorderUtilities", () => {
  it("should generate CSS border utilities with all expected patterns", () => {
    const result = generateBorderUtilities();

    // Check that it returns a string
    expect(typeof result).toBe("string");

    // Test all border utility patterns in a single comprehensive test
    const expectedPatterns = [
      // Basic border utilities
      "@utility border-*",
      "border-color: --value(--semantic-border- *);",
      
      // Axis utilities
      "@utility border-x-*",
      "border-inline-color: --value(--semantic-border- *);",
      "@utility border-y-*",
      "border-block-color: --value(--semantic-border- *);",
      
      // Directional utilities (TRBL)
      "@utility border-t-*",
      "border-top-color: --value(--semantic-border- *);",
      "@utility border-r-*",
      "border-right-color: --value(--semantic-border- *);",
      "@utility border-b-*",
      "border-bottom-color: --value(--semantic-border- *);",
      "@utility border-l-*",
      "border-left-color: --value(--semantic-border- *);",
      
      // Logical directional utilities
      "@utility border-s-*",
      "border-inline-start-color",
      "@utility border-e-*",
      "border-inline-end-color",
      
      // Additional border-related utilities
      "@utility divide-*",
      "& > :not(:last-child)",
      "@utility outline-*",
      "outline-color",
      "@utility inset-ring-*",
      "--tw-inset-ring-color",
      "@utility ring-*",
      "--tw-ring-color"
    ];

    expectedPatterns.forEach(pattern => {
      expect(result).toContain(pattern);
    });
  });

  it("should return consistent output", () => {
    const result1 = generateBorderUtilities();
    const result2 = generateBorderUtilities();

    expect(result1).toBe(result2);
  });
});
