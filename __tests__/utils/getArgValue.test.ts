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

  const setupArgv = (args: string[]) => {
    process.argv = ["node", "script.js", ...args];
  };

  const testCases = [
    {
      name: "should return the value after the flag",
      args: ["--output", "dist"],
      flag: "--output",
      defaultValue: "default",
      expected: "dist"
    },
    {
      name: "should return default value when flag is not found",
      args: [],
      flag: "--output",
      defaultValue: "default",
      expected: "default"
    },
    {
      name: "should return default value when flag is at the end with no value",
      args: ["--output"],
      flag: "--output",
      defaultValue: "default",
      expected: "default"
    },
    {
      name: "should handle short flag formats",
      args: ["-o", "output-dir"],
      flag: "-o",
      defaultValue: "default",
      expected: "output-dir"
    },
    {
      name: "should return first occurrence when flag appears multiple times",
      args: ["--output", "first", "--output", "second"],
      flag: "--output",
      defaultValue: "default",
      expected: "first"
    }
  ];

  testCases.forEach(({ name, args, flag, defaultValue, expected }) => {
    it(name, () => {
      setupArgv(args);
      expect(getArgValue(flag, defaultValue)).toBe(expected);
    });
  });

  it("should handle multiple different flags in single argv", () => {
    setupArgv(["--input", "src", "--output", "dist", "--verbose", "true"]);
    
    expect(getArgValue("--input", "default")).toBe("src");
    expect(getArgValue("--output", "default")).toBe("dist");
    expect(getArgValue("--verbose", "false")).toBe("true");
  });
});
