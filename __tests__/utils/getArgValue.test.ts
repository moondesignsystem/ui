import { describe, it, expect, beforeEach, afterEach } from "@jest/globals";
import getArgValue from "../../src/scripts/utils/getArgValue";

describe("getArgValue", () => {
  let originalArgv: string[];

  beforeEach(() => {
    originalArgv = process.argv;
  });

  afterEach(() => {
    process.argv = originalArgv;
  });

  it("should return the value after the flag", () => {
    process.argv = ["node", "script.js", "--output", "dist"];
    expect(getArgValue("--output", "default")).toBe("dist");
  });

  it("should return default value when flag is not found", () => {
    process.argv = ["node", "script.js"];
    expect(getArgValue("--output", "default")).toBe("default");
  });

  it("should return default value when flag is at the end with no value", () => {
    process.argv = ["node", "script.js", "--output"];
    expect(getArgValue("--output", "default")).toBe("default");
  });

  it("should handle multiple flags", () => {
    process.argv = ["node", "script.js", "--input", "src", "--output", "dist"];
    expect(getArgValue("--input", "default")).toBe("src");
    expect(getArgValue("--output", "default")).toBe("dist");
  });

  it("should handle flags with different formats", () => {
    process.argv = [
      "node",
      "script.js",
      "-o",
      "output-dir",
      "--verbose",
      "true",
    ];
    expect(getArgValue("-o", "default")).toBe("output-dir");
    expect(getArgValue("--verbose", "false")).toBe("true");
  });

  it("should return first occurrence when flag appears multiple times", () => {
    process.argv = [
      "node",
      "script.js",
      "--output",
      "first",
      "--output",
      "second",
    ];
    expect(getArgValue("--output", "default")).toBe("first");
  });
});
