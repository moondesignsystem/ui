import { describe, it, expect } from "@jest/globals";
import generateGenericUtilities from "../../src/scripts/utils/generateGenericUtilities";

describe("generateGenericUtilities", () => {
  it("should generate CSS generic utilities", () => {
    const result = generateGenericUtilities();

    // Check that it returns a string
    expect(typeof result).toBe("string");

    // Check for icon utilities
    expect(result).toContain("@utility icon-*");
    expect(result).toContain("color: --value(--semantic-icon-*);");

    // Check for text utilities
    expect(result).toContain("@utility text-*");
    expect(result).toContain("color: --value(--semantic-text-*);");

    // Check for background utilities
    expect(result).toContain("@utility bg-*");
    expect(result).toContain(
      "background-color: --value(--semantic-background-*);"
    );
  });

  it("should return consistent output", () => {
    const result1 = generateGenericUtilities();
    const result2 = generateGenericUtilities();

    expect(result1).toBe(result2);
  });

  it("should include all expected utility types", () => {
    const result = generateGenericUtilities();

    // Count the number of @utility declarations
    const utilityCount = (result.match(/@utility/g) || []).length;
    expect(utilityCount).toBe(4); // icon, text, bg, opacity

    // Check for opacity utility
    expect(result).toContain("@utility opacity-*");
    expect(result).toContain("opacity: --value(--effect-opacity-*);");
  });
});
