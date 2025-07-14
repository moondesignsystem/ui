import { describe, it, expect } from "@jest/globals";
import formatName from "../../src/scripts/utils/formatName";

describe("formatName", () => {
  it("should format basic names correctly", () => {
    expect(formatName("hello world")).toBe("hello-world");
    expect(formatName("test name")).toBe("test-name");
  });

  it("should handle multiple spaces by replacing each with dash", () => {
    expect(formatName("hello   world   test")).toBe("hello---world---test");
  });

  it("should handle leading and trailing spaces by replacing with dashes", () => {
    expect(formatName("  hello world  ")).toBe("--hello-world--");
  });

  it("should handle forward slashes", () => {
    expect(formatName("hello/world")).toBe("hello-world");
  });

  it("should not handle other special characters (only spaces and slashes)", () => {
    expect(formatName("test@name")).toBe("test@name");
    expect(formatName("test.name")).toBe("test.name");
  });

  it("should handle mixed case", () => {
    expect(formatName("Hello World")).toBe("hello-world");
    expect(formatName("TEST NAME")).toBe("test-name");
  });

  it("should handle empty strings", () => {
    expect(formatName("")).toBe("");
    expect(formatName("   ")).toBe("---");
  });

  it("should handle single words", () => {
    expect(formatName("hello")).toBe("hello");
    expect(formatName("TEST")).toBe("test");
  });

  it("should handle numbers", () => {
    expect(formatName("test 123")).toBe("test-123");
    expect(formatName("123 test")).toBe("123-test");
  });
});
