import { describe, it, expect } from "@jest/globals";
import getFontFamily from "../../src/scripts/utils/getFontFamily";

describe("getFontFamily", () => {
  it("should wrap font name in quotes", () => {
    expect(getFontFamily("Inter")).toBe('"Inter"');
    expect(getFontFamily("Roboto")).toBe('"Roboto"');
    expect(getFontFamily("Arial")).toBe('"Arial"');
  });

  it("should handle font names with spaces", () => {
    expect(getFontFamily("Times New Roman")).toBe('"Times New Roman"');
    expect(getFontFamily("Comic Sans MS")).toBe('"Comic Sans MS"');
  });

  it("should handle empty string", () => {
    expect(getFontFamily("")).toBe('""');
  });

  it("should handle font names with special characters", () => {
    expect(getFontFamily("Font-Name")).toBe('"Font-Name"');
    expect(getFontFamily("Font_Name")).toBe('"Font_Name"');
    expect(getFontFamily("Font123")).toBe('"Font123"');
  });
});
