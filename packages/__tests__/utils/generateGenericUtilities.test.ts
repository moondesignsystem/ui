import { describe, it, expect } from "@jest/globals";
import generateGenericUtilities from "../../src/scripts/utils/generateGenericUtilities";

describe("generateGenericUtilities", () => {
  it("should generate CSS generic utilities with all expected patterns", () => {
    const result = generateGenericUtilities();

    // Check that it returns a string
    expect(typeof result).toBe("string");

    // Test all utility patterns in a comprehensive data-driven approach
    const expectedPatterns = [
      // Icon utilities
      "@utility icon-*",
      "color: --value(--semantic-icon-*);",
      
      // Text utilities
      "@utility text-*",
      "color: --value(--semantic-text-*);",
      
      // Background utilities
      "@utility bg-*",
      "background-color: --value(--semantic-background-*);",
      
      // Opacity utilities
      "@utility opacity-*",
      "opacity: --value(--effect-opacity-*);"
    ];

    expectedPatterns.forEach(pattern => {
      expect(result).toContain(pattern);
    });

    // Verify the exact count of @utility declarations
    const utilityCount = (result.match(/@utility/g) || []).length;
    expect(utilityCount).toBe(4); // icon, text, bg, opacity
  });

  it("should return consistent output", () => {
    const result1 = generateGenericUtilities();
    const result2 = generateGenericUtilities();

    expect(result1).toBe(result2);
  });
});
