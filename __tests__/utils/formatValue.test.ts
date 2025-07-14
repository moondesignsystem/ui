import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import formatValue from "../../src/scripts/utils/formatValue";
import type { FigmaColor } from "../../src/types";

// Mock all the utility functions
jest.mock("../../src/scripts/utils/getColor");
jest.mock("../../src/scripts/utils/getAlpha");
jest.mock("../../src/scripts/utils/getFontFamily");
jest.mock("../../src/scripts/utils/getFontWeight");
jest.mock("../../src/scripts/utils/getOpacity");
jest.mock("../../src/scripts/utils/getDimension");

import getColor from "../../src/scripts/utils/getColor";
import getAlpha from "../../src/scripts/utils/getAlpha";
import getFontFamily from "../../src/scripts/utils/getFontFamily";
import getFontWeight from "../../src/scripts/utils/getFontWeight";
import getOpacity from "../../src/scripts/utils/getOpacity";
import getDimension from "../../src/scripts/utils/getDimension";

const mockedGetColor = getColor as jest.MockedFunction<typeof getColor>;
const mockedGetAlpha = getAlpha as jest.MockedFunction<typeof getAlpha>;
const mockedGetFontFamily = getFontFamily as jest.MockedFunction<
  typeof getFontFamily
>;
const mockedGetFontWeight = getFontWeight as jest.MockedFunction<
  typeof getFontWeight
>;
const mockedGetOpacity = getOpacity as jest.MockedFunction<typeof getOpacity>;
const mockedGetDimension = getDimension as jest.MockedFunction<
  typeof getDimension
>;

describe("formatValue", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("COLOR type formatting", () => {
    it("should format COLOR type with rgba values", () => {
      const colorValue: FigmaColor = { r: 0.5, g: 0.75, b: 1.0, a: 0.8 };

      mockedGetColor
        .mockReturnValueOnce(128) // r: 0.5
        .mockReturnValueOnce(192) // g: 0.75
        .mockReturnValueOnce(255); // b: 1.0
      mockedGetAlpha.mockReturnValue(" / 0.8");

      const result = formatValue("COLOR", "primary-color", colorValue);

      expect(result).toBe("rgb(128 192 255 / 0.8)");
      expect(mockedGetColor).toHaveBeenCalledTimes(3);
      expect(mockedGetColor).toHaveBeenNthCalledWith(1, 0.5);
      expect(mockedGetColor).toHaveBeenNthCalledWith(2, 0.75);
      expect(mockedGetColor).toHaveBeenNthCalledWith(3, 1.0);
      expect(mockedGetAlpha).toHaveBeenCalledWith(0.8);
    });

    it("should format COLOR type with full opacity", () => {
      const colorValue: FigmaColor = { r: 1, g: 0, b: 0, a: 1 };

      mockedGetColor
        .mockReturnValueOnce(255)
        .mockReturnValueOnce(0)
        .mockReturnValueOnce(0);
      mockedGetAlpha.mockReturnValue("");

      const result = formatValue("COLOR", "red", colorValue);

      expect(result).toBe("rgb(255 0 0)");
      expect(mockedGetAlpha).toHaveBeenCalledWith(1);
    });

    it("should format COLOR type with zero values", () => {
      const colorValue: FigmaColor = { r: 0, g: 0, b: 0, a: 0 };

      mockedGetColor
        .mockReturnValueOnce(0)
        .mockReturnValueOnce(0)
        .mockReturnValueOnce(0);
      mockedGetAlpha.mockReturnValue(" / 0");

      const result = formatValue("COLOR", "transparent", colorValue);

      expect(result).toBe("rgb(0 0 0 / 0)");
    });
  });

  describe("Font family formatting", () => {
    it('should format values with "family" in name (lowercase)', () => {
      mockedGetFontFamily.mockReturnValue('"Inter", sans-serif');

      const result = formatValue("STRING", "font-family", "Inter");

      expect(result).toBe('"Inter", sans-serif');
      expect(mockedGetFontFamily).toHaveBeenCalledWith("Inter");
    });

    it('should format values with "Family" in name (mixed case)', () => {
      mockedGetFontFamily.mockReturnValue('"Roboto", sans-serif');

      const result = formatValue("STRING", "primaryFamily", "Roboto");

      expect(result).toBe('"Roboto", sans-serif');
      expect(mockedGetFontFamily).toHaveBeenCalledWith("Roboto");
    });

    it('should format values with "FAMILY" in name (uppercase)', () => {
      mockedGetFontFamily.mockReturnValue('"Arial", sans-serif');

      const result = formatValue("STRING", "TEXT_FAMILY", "Arial");

      expect(result).toBe('"Arial", sans-serif');
      expect(mockedGetFontFamily).toHaveBeenCalledWith("Arial");
    });
  });

  describe("Font weight formatting", () => {
    it('should format values with "weight" in name using string value', () => {
      mockedGetFontWeight.mockReturnValue(400);

      const result = formatValue("STRING", "font-weight", "Regular");

      expect(result).toBe(400);
      expect(mockedGetFontWeight).toHaveBeenCalledWith("Regular");
    });

    it('should format values with "weight" in name using number value', () => {
      mockedGetFontWeight.mockReturnValue(700);

      const result = formatValue("FLOAT", "fontWeight", 700);

      expect(result).toBe(700);
      expect(mockedGetFontWeight).toHaveBeenCalledWith(700);
    });

    it('should format values with "Weight" in name (mixed case)', () => {
      mockedGetFontWeight.mockReturnValue(600);

      const result = formatValue("STRING", "primaryWeight", "SemiBold");

      expect(result).toBe(600);
      expect(mockedGetFontWeight).toHaveBeenCalledWith("SemiBold");
    });
  });

  describe("Opacity formatting", () => {
    it('should format values with "opacity" in name', () => {
      mockedGetOpacity.mockReturnValue(0.005);

      const result = formatValue("FLOAT", "background-opacity", 0.5);

      expect(result).toBe(0.005);
      expect(mockedGetOpacity).toHaveBeenCalledWith(0.5);
    });

    it('should format values with "Opacity" in name (mixed case)', () => {
      mockedGetOpacity.mockReturnValue(0.0075);

      const result = formatValue("FLOAT", "buttonOpacity", 0.75);

      expect(result).toBe(0.0075);
      expect(mockedGetOpacity).toHaveBeenCalledWith(0.75);
    });

    it('should format values with "OPACITY" in name (uppercase)', () => {
      mockedGetOpacity.mockReturnValue(0.01);

      const result = formatValue("FLOAT", "MAIN_OPACITY", 1);

      expect(result).toBe(0.01);
      expect(mockedGetOpacity).toHaveBeenCalledWith(1);
    });
  });

  describe("FLOAT type formatting", () => {
    it("should format FLOAT type values as dimensions", () => {
      mockedGetDimension.mockReturnValue("16px");

      const result = formatValue("FLOAT", "padding", 16);

      expect(result).toBe("16px");
      expect(mockedGetDimension).toHaveBeenCalledWith(16);
    });

    it("should format FLOAT type with decimal values", () => {
      mockedGetDimension.mockReturnValue("12.5px");

      const result = formatValue("FLOAT", "margin", 12.5);

      expect(result).toBe("12.5px");
      expect(mockedGetDimension).toHaveBeenCalledWith(12.5);
    });

    it("should format FLOAT type with zero value", () => {
      mockedGetDimension.mockReturnValue("0px");

      const result = formatValue("FLOAT", "border-width", 0);

      expect(result).toBe("0px");
      expect(mockedGetDimension).toHaveBeenCalledWith(0);
    });
  });

  describe("Default case - passthrough values", () => {
    it("should return string values unchanged for unmatched types", () => {
      const result = formatValue("STRING", "custom-value", "test-string");

      expect(result).toBe("test-string");

      // Verify no utility functions were called
      expect(mockedGetColor).not.toHaveBeenCalled();
      expect(mockedGetAlpha).not.toHaveBeenCalled();
      expect(mockedGetFontFamily).not.toHaveBeenCalled();
      expect(mockedGetFontWeight).not.toHaveBeenCalled();
      expect(mockedGetOpacity).not.toHaveBeenCalled();
      expect(mockedGetDimension).not.toHaveBeenCalled();
    });

    it("should return number values unchanged for unmatched types", () => {
      const result = formatValue("STRING", "some-number", 42);

      expect(result).toBe(42);
    });

    it("should return boolean values unchanged", () => {
      const result = formatValue("BOOLEAN" as any, "flag", true as any);

      expect(result).toBe(true);
    });

    it("should return null values unchanged", () => {
      const result = formatValue("STRING", "nullable", null as any);

      expect(result).toBe(null);
    });

    it("should return undefined values unchanged", () => {
      const result = formatValue("STRING", "undefined-value", undefined as any);

      expect(result).toBe(undefined);
    });
  });

  describe("Edge cases and name matching", () => {
    it('should prioritize font family over FLOAT type when name contains "family"', () => {
      mockedGetFontFamily.mockReturnValue('"Test Font", serif');

      const result = formatValue("FLOAT", "font-family-size", "Test Font");

      expect(result).toBe('"Test Font", serif');
      expect(mockedGetFontFamily).toHaveBeenCalledWith("Test Font");
      expect(mockedGetDimension).not.toHaveBeenCalled();
    });

    it('should prioritize font weight over FLOAT type when name contains "weight"', () => {
      mockedGetFontWeight.mockReturnValue(500);

      const result = formatValue("FLOAT", "font-weight-value", 500);

      expect(result).toBe(500);
      expect(mockedGetFontWeight).toHaveBeenCalledWith(500);
      expect(mockedGetDimension).not.toHaveBeenCalled();
    });

    it('should prioritize opacity over FLOAT type when name contains "opacity"', () => {
      mockedGetOpacity.mockReturnValue(0.008);

      const result = formatValue("FLOAT", "button-opacity-level", 0.8);

      expect(result).toBe(0.008);
      expect(mockedGetOpacity).toHaveBeenCalledWith(0.8);
      expect(mockedGetDimension).not.toHaveBeenCalled();
    });

    it("should handle names with multiple matching keywords (family wins over weight)", () => {
      mockedGetFontFamily.mockReturnValue('"Weight Family", sans-serif');

      const result = formatValue(
        "STRING",
        "font-family-weight",
        "Weight Family"
      );

      expect(result).toBe('"Weight Family", sans-serif');
      expect(mockedGetFontFamily).toHaveBeenCalledWith("Weight Family");
      expect(mockedGetFontWeight).not.toHaveBeenCalled();
    });

    it("should handle partial keyword matches correctly", () => {
      mockedGetFontFamily.mockReturnValue('"Weight Family", sans-serif');

      const result = formatValue("STRING", "familyish", "test");

      expect(result).toBe('"Weight Family", sans-serif');
      expect(mockedGetFontFamily).toHaveBeenCalledWith("test");
    });

    it("should handle empty string names", () => {
      mockedGetDimension.mockReturnValue("10px");

      const result = formatValue("FLOAT", "", 10);

      expect(result).toBe("10px");
      expect(mockedGetDimension).toHaveBeenCalledWith(10);
    });
  });

  describe("Type casting and complex scenarios", () => {
    it("should handle COLOR type with non-standard color object", () => {
      const colorValue = {
        r: 0.2,
        g: 0.4,
        b: 0.6,
        a: 0.8,
        extra: "ignored",
      } as FigmaColor;

      mockedGetColor
        .mockReturnValueOnce(51)
        .mockReturnValueOnce(102)
        .mockReturnValueOnce(153);
      mockedGetAlpha.mockReturnValue(" / 0.8");

      const result = formatValue("COLOR", "test-color", colorValue);

      expect(result).toBe("rgb(51 102 153 / 0.8)");
    });

    it("should handle different value types with name-based routing", () => {
      // Test that string values work with weight detection
      mockedGetFontWeight.mockReturnValue(300);

      const result = formatValue("STRING", "text-weight", "Light");

      expect(result).toBe(300);
      expect(mockedGetFontWeight).toHaveBeenCalledWith("Light");
    });
  });
});
