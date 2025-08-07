import { describe, it, expect } from "@jest/globals";
import formatName from "../../src/scripts/utils/formatName";

describe("formatName", () => {
  // Test core functionality with comprehensive data-driven approach
  it("should format names by converting to lowercase and replacing spaces/slashes with dashes", () => {
    const testCases = [
      // Basic formatting
      { input: "hello world", expected: "hello-world" },
      { input: "test name", expected: "test-name" },
      
      // Case conversion
      { input: "Hello World", expected: "hello-world" },
      { input: "TEST NAME", expected: "test-name" },
      
      // Multiple spaces/slashes
      { input: "hello   world   test", expected: "hello---world---test" },
      { input: "hello/world", expected: "hello-world" },
      { input: "path/to/file", expected: "path-to-file" },
      
      // Leading/trailing spaces
      { input: "  hello world  ", expected: "--hello-world--" },
      
      // Mixed content
      { input: "test 123", expected: "test-123" },
      { input: "123 test", expected: "123-test" },
      { input: "hello/world test", expected: "hello-world-test" },
      
      // Edge cases
      { input: "", expected: "" },
      { input: "   ", expected: "---" },
      { input: "hello", expected: "hello" },
      { input: "TEST", expected: "test" },
    ];

    testCases.forEach(({ input, expected }) => {
      expect(formatName(input)).toBe(expected);
    });
  });

  it("should preserve other special characters unchanged", () => {
    const specialChars = ["test@name", "test.name", "test#name", "test_name", "test-name"];
    
    specialChars.forEach(input => {
      const result = formatName(input);
      // Should only change case, not the special characters (except spaces/slashes)
      expect(result).toBe(input.toLowerCase());
    });
  });
});
