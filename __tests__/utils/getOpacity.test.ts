import { describe, it, expect } from "@jest/globals";
import getOpacity from "../../src/scripts/utils/getOpacity";

describe("getOpacity", () => {
  it("should convert percentage to decimal", () => {
    expect(getOpacity(100)).toBe(1);
    expect(getOpacity(50)).toBe(0.5);
    expect(getOpacity(0)).toBe(0);
  });

  it("should handle decimal percentages", () => {
    expect(getOpacity(25)).toBe(0.25);
    expect(getOpacity(75)).toBe(0.75);
    expect(getOpacity(12.5)).toBe(0.125);
  });

  it("should handle edge cases", () => {
    expect(getOpacity(1)).toBe(0.01);
    expect(getOpacity(99)).toBe(0.99);
    expect(getOpacity(0.1)).toBe(0.001);
  });
});
