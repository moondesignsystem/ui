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
    const colorTestCases = [
      {
        name: "primary-color",
        colorValue: { r: 0.5, g: 0.75, b: 1.0, a: 0.8 },
        mockColors: [128, 192, 255],
        mockAlpha: " / 0.8",
        expected: "rgb(128 192 255 / 0.8)",
        case: "rgba values"
      },
      {
        name: "red",
        colorValue: { r: 1, g: 0, b: 0, a: 1 },
        mockColors: [255, 0, 0],
        mockAlpha: "",
        expected: "rgb(255 0 0)",
        case: "full opacity"
      },
      {
        name: "transparent",
        colorValue: { r: 0, g: 0, b: 0, a: 0 },
        mockColors: [0, 0, 0],
        mockAlpha: " / 0",
        expected: "rgb(0 0 0 / 0)",
        case: "zero values"
      }
    ];

    colorTestCases.forEach(({ name, colorValue, mockColors, mockAlpha, expected, case: caseType }) => {
      it(`should format COLOR type with ${caseType}`, () => {
        mockedGetColor
          .mockReturnValueOnce(mockColors[0])
          .mockReturnValueOnce(mockColors[1])
          .mockReturnValueOnce(mockColors[2]);
        mockedGetAlpha.mockReturnValue(mockAlpha);

        const result = formatValue("COLOR", name, colorValue);

        expect(result).toBe(expected);
        expect(mockedGetColor).toHaveBeenCalledTimes(3);
        expect(mockedGetColor).toHaveBeenNthCalledWith(1, colorValue.r);
        expect(mockedGetColor).toHaveBeenNthCalledWith(2, colorValue.g);
        expect(mockedGetColor).toHaveBeenNthCalledWith(3, colorValue.b);
        expect(mockedGetAlpha).toHaveBeenCalledWith(colorValue.a);
      });
    });
  });

  describe("Font family formatting", () => {
    const testCases = [
      { name: "font-family", value: "Inter", expected: '"Inter", sans-serif', case: "lowercase" },
      { name: "primaryFamily", value: "Roboto", expected: '"Roboto", sans-serif', case: "mixed case" },
      { name: "TEXT_FAMILY", value: "Arial", expected: '"Arial", sans-serif', case: "uppercase" },
    ];

    testCases.forEach(({ name, value, expected, case: caseType }) => {
      it(`should format values with "family" in name (${caseType})`, () => {
        mockedGetFontFamily.mockReturnValue(expected);

        const result = formatValue("STRING", name, value);

        expect(result).toBe(expected);
        expect(mockedGetFontFamily).toHaveBeenCalledWith(value);
      });
    });
  });

  describe("Font weight formatting", () => {
    const testCases = [
      { type: "STRING" as const, name: "font-weight", value: "Regular", expected: 400, case: "string value" },
      { type: "FLOAT" as const, name: "fontWeight", value: 700, expected: 700, case: "number value" },
      { type: "STRING" as const, name: "primaryWeight", value: "SemiBold", expected: 600, case: "mixed case" },
    ];

    testCases.forEach(({ type, name, value, expected, case: caseType }) => {
      it(`should format values with "weight" in name using ${caseType}`, () => {
        mockedGetFontWeight.mockReturnValue(expected);

        const result = formatValue(type, name, value);

        expect(result).toBe(expected);
        expect(mockedGetFontWeight).toHaveBeenCalledWith(value);
      });
    });
  });

  describe("Opacity formatting", () => {
    const testCases = [
      { name: "background-opacity", value: 0.5, expected: 0.005, case: "lowercase" },
      { name: "buttonOpacity", value: 0.75, expected: 0.0075, case: "mixed case" },
      { name: "MAIN_OPACITY", value: 1, expected: 0.01, case: "uppercase" },
    ];

    testCases.forEach(({ name, value, expected, case: caseType }) => {
      it(`should format values with "opacity" in name (${caseType})`, () => {
        mockedGetOpacity.mockReturnValue(expected);

        const result = formatValue("FLOAT", name, value);

        expect(result).toBe(expected);
        expect(mockedGetOpacity).toHaveBeenCalledWith(value);
      });
    });
  });

  describe("FLOAT type formatting", () => {
    const testCases = [
      { name: "padding", value: 16, expected: "16px", case: "integer values" },
      { name: "margin", value: 12.5, expected: "12.5px", case: "decimal values" },
      { name: "border-width", value: 0, expected: "0px", case: "zero value" },
    ];

    testCases.forEach(({ name, value, expected, case: caseType }) => {
      it(`should format FLOAT type values as dimensions with ${caseType}`, () => {
        mockedGetDimension.mockReturnValue(expected);

        const result = formatValue("FLOAT", name, value);

        expect(result).toBe(expected);
        expect(mockedGetDimension).toHaveBeenCalledWith(value);
      });
    });
  });

  describe("Default case - passthrough values", () => {
    const testCases = [
      { type: "STRING" as const, name: "custom-value", value: "test-string", expected: "test-string", case: "string values unchanged" },
      { type: "STRING" as const, name: "some-number", value: 42, expected: 42, case: "number values unchanged" },
      { type: "BOOLEAN" as any, name: "flag", value: true as any, expected: true, case: "boolean values unchanged" },
      { type: "STRING" as const, name: "nullable", value: null as any, expected: null, case: "null values unchanged" },
      { type: "STRING" as const, name: "undefined-value", value: undefined as any, expected: undefined, case: "undefined values unchanged" },
    ];

    testCases.forEach(({ type, name, value, expected, case: caseType }) => {
      it(`should return ${caseType} for unmatched types`, () => {
        const result = formatValue(type, name, value);

        expect(result).toBe(expected);

        // Verify no utility functions were called
        expect(mockedGetColor).not.toHaveBeenCalled();
        expect(mockedGetAlpha).not.toHaveBeenCalled();
        expect(mockedGetFontFamily).not.toHaveBeenCalled();
        expect(mockedGetFontWeight).not.toHaveBeenCalled();
        expect(mockedGetOpacity).not.toHaveBeenCalled();
        expect(mockedGetDimension).not.toHaveBeenCalled();
      });
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
