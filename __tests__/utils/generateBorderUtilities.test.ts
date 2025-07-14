import { describe, it, expect } from "@jest/globals";
import generateBorderUtilities from "../../src/scripts/utils/generateBorderUtilities";

describe("generateBorderUtilities", () => {
  it("should generate CSS border utilities", () => {
    const result = generateBorderUtilities();

    // Check that it returns a string
    expect(typeof result).toBe("string");

    // Check for various border utility patterns
    expect(result).toContain("@utility border-*");
    expect(result).toContain("border-color: --value(--semantic-border- *);");

    expect(result).toContain("@utility border-x-*");
    expect(result).toContain(
      "border-inline-color: --value(--semantic-border- *);"
    );

    expect(result).toContain("@utility border-y-*");
    expect(result).toContain(
      "border-block-color: --value(--semantic-border- *);"
    );

    expect(result).toContain("@utility border-t-*");
    expect(result).toContain(
      "border-top-color: --value(--semantic-border- *);"
    );

    expect(result).toContain("@utility border-r-*");
    expect(result).toContain(
      "border-right-color: --value(--semantic-border- *);"
    );

    expect(result).toContain("@utility border-b-*");
    expect(result).toContain(
      "border-bottom-color: --value(--semantic-border- *);"
    );

    expect(result).toContain("@utility border-l-*");
    expect(result).toContain(
      "border-left-color: --value(--semantic-border- *);"
    );
  });

  it("should include directional border utilities", () => {
    const result = generateBorderUtilities();

    expect(result).toContain("@utility border-s-*");
    expect(result).toContain("border-inline-start-color");

    expect(result).toContain("@utility border-e-*");
    expect(result).toContain("border-inline-end-color");
  });

  it("should include additional border-related utilities", () => {
    const result = generateBorderUtilities();

    expect(result).toContain("@utility divide-*");
    expect(result).toContain("& > :not(:last-child)");

    expect(result).toContain("@utility outline-*");
    expect(result).toContain("outline-color");

    expect(result).toContain("@utility inset-ring-*");
    expect(result).toContain("--tw-inset-ring-color");

    expect(result).toContain("@utility ring-*");
    expect(result).toContain("--tw-ring-color");
  });

  it("should return consistent output", () => {
    const result1 = generateBorderUtilities();
    const result2 = generateBorderUtilities();

    expect(result1).toBe(result2);
  });
});
