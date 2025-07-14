import { describe, it, expect } from "@jest/globals";
import getColor from "../../src/scripts/utils/getColor";

describe("getColor", () => {
  it("should convert 0 to 0", () => {
    expect(getColor(0)).toBe(0);
  });

  it("should convert 1 to 255", () => {
    expect(getColor(1)).toBe(255);
  });

  it("should convert 0.5 to 128 (rounded)", () => {
    expect(getColor(0.5)).toBe(128);
  });

  it("should handle decimal values correctly", () => {
    expect(getColor(0.2)).toBe(51);
    expect(getColor(0.8)).toBe(204);
  });

  it("should round to nearest integer", () => {
    expect(getColor(0.501)).toBe(128);
    expect(getColor(0.499)).toBe(127);
  });

  it("should handle edge cases", () => {
    expect(getColor(0.00001)).toBe(0);
    expect(getColor(0.99999)).toBe(255);
  });
});
