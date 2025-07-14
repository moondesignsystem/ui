import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import formatAndAddCSSVariable from "../src/scripts/formatAndAddCSSVariable";
import type {
  FigmaResolvedType,
  FigmaValuesByMode,
  FigmaVariableAlias,
  FigmaColor,
} from "../src/types";

// Mock dependencies first
jest.mock("../src/scripts/utils/formatName");
jest.mock("../src/scripts/utils/formatValue");

// Then import the mocked functions
import formatName from "../src/scripts/utils/formatName";
import formatValue from "../src/scripts/utils/formatValue";

const mockFormatName = formatName as jest.MockedFunction<typeof formatName>;
const mockFormatValue = formatValue as jest.MockedFunction<typeof formatValue>;

describe("formatAndAddCSSVariable", () => {
  let cssVariables: string[];

  // Mock data interfaces
  interface Variable {
    name: string;
    resolvedType: FigmaResolvedType;
    variableCollectionId: string;
    valuesByMode: Record<string, FigmaValuesByMode | FigmaVariableAlias>;
  }

  interface Mode {
    modeId: string;
    name: string;
  }

  interface VariableCollection {
    name: string;
    modes: Mode[];
  }

  interface LocalVariables {
    [key: string]: Variable;
  }

  interface LocalVariableCollections {
    [key: string]: VariableCollection;
  }

  const mockVariable: Variable = {
    name: "primary-color",
    resolvedType: "COLOR",
    variableCollectionId: "collection1",
    valuesByMode: {
      mode1: { r: 1, g: 0, b: 0, a: 1 } as FigmaColor,
    },
  };

  const mockLocalVariables: LocalVariables = {
    var1: {
      name: "primary-color",
      resolvedType: "COLOR",
      variableCollectionId: "collection1",
      valuesByMode: {
        mode1: { r: 1, g: 0, b: 0, a: 1 } as FigmaColor, // light mode
        mode2: { r: 0.8, g: 0, b: 0, a: 1 } as FigmaColor, // dark mode
      },
    },
    var2: {
      name: "secondary-color",
      resolvedType: "COLOR",
      variableCollectionId: "collection1",
      valuesByMode: {
        mode1: { r: 0, g: 1, b: 0, a: 1 } as FigmaColor,
      },
    },
  };

  const mockLocalVariableCollections: LocalVariableCollections = {
    collection1: {
      name: "colors",
      modes: [
        { modeId: "mode1", name: "light" },
        { modeId: "mode2", name: "dark" },
      ],
    },
  };

  beforeEach(() => {
    cssVariables = [];
    jest.clearAllMocks();

    // Setup default mock implementations
    mockFormatName.mockImplementation((...args: any[]) => {
      const input = args[0] as string;
      // Handle special characters by replacing them with hyphens
      return input.replace(/[@\s_]/g, "-");
    });

    mockFormatValue.mockImplementation((...args: any[]) => {
      const [type, _name, value] = args;
      if (type === "COLOR" && typeof value === "object" && "r" in value) {
        return `rgba(${Math.round(value.r * 255)}, ${Math.round(
          value.g * 255
        )}, ${Math.round(value.b * 255)}, ${value.a})`;
      }
      if (type === "FLOAT") return `${value}px`;
      return String(value);
    });
  });

  describe("Parameter validation", () => {
    it("should throw error when cssVariables is not an array", () => {
      expect(() =>
        formatAndAddCSSVariable(
          null as any,
          "collection",
          "mode",
          "variable",
          mockVariable,
          "mode1",
          mockLocalVariables,
          mockLocalVariableCollections,
          false
        )
      ).toThrow("❌ cssVariables must be a valid array");
    });

    it("should throw error when cssVariables is undefined", () => {
      expect(() =>
        formatAndAddCSSVariable(
          undefined as any,
          "collection",
          "mode",
          "variable",
          mockVariable,
          "mode1",
          mockLocalVariables,
          mockLocalVariableCollections,
          false
        )
      ).toThrow("❌ cssVariables must be a valid array");
    });

    it("should throw error when required parameters are missing", () => {
      expect(() =>
        formatAndAddCSSVariable(
          cssVariables,
          "",
          "mode",
          "variable",
          mockVariable,
          "mode1",
          mockLocalVariables,
          mockLocalVariableCollections,
          false
        )
      ).toThrow("❌ All required parameters must be provided");
    });

    it("should throw error when collectionName is missing", () => {
      expect(() =>
        formatAndAddCSSVariable(
          cssVariables,
          "",
          "mode",
          "variable",
          mockVariable,
          "mode1",
          mockLocalVariables,
          mockLocalVariableCollections,
          false
        )
      ).toThrow("❌ All required parameters must be provided");
    });

    it("should throw error when modeName is missing", () => {
      expect(() =>
        formatAndAddCSSVariable(
          cssVariables,
          "collection",
          "",
          "variable",
          mockVariable,
          "mode1",
          mockLocalVariables,
          mockLocalVariableCollections,
          false
        )
      ).toThrow("❌ All required parameters must be provided");
    });

    it("should throw error when variableName is missing", () => {
      expect(() =>
        formatAndAddCSSVariable(
          cssVariables,
          "collection",
          "mode",
          "",
          mockVariable,
          "mode1",
          mockLocalVariables,
          mockLocalVariableCollections,
          false
        )
      ).toThrow("❌ All required parameters must be provided");
    });

    it("should throw error when variable is missing", () => {
      expect(() =>
        formatAndAddCSSVariable(
          cssVariables,
          "collection",
          "mode",
          "variable",
          null as any,
          "mode1",
          mockLocalVariables,
          mockLocalVariableCollections,
          false
        )
      ).toThrow("❌ All required parameters must be provided");
    });

    it("should throw error when modeId is missing", () => {
      expect(() =>
        formatAndAddCSSVariable(
          cssVariables,
          "collection",
          "mode",
          "variable",
          mockVariable,
          "",
          mockLocalVariables,
          mockLocalVariableCollections,
          false
        )
      ).toThrow("❌ All required parameters must be provided");
    });
  });

  describe("Regular value handling", () => {
    it("should format COLOR value correctly in multi-mode", () => {
      const result = formatAndAddCSSVariable(
        cssVariables,
        "colors",
        "light",
        "primary",
        mockVariable,
        "mode1",
        mockLocalVariables,
        mockLocalVariableCollections,
        false
      );

      expect(result).toEqual(["--colors-light-primary: rgba(255, 0, 0, 1);"]);
      expect(cssVariables).toEqual([
        "--colors-light-primary: rgba(255, 0, 0, 1);",
      ]);
    });

    it("should format COLOR value correctly in single-mode", () => {
      const result = formatAndAddCSSVariable(
        cssVariables,
        "colors",
        "light",
        "primary",
        mockVariable,
        "mode1",
        mockLocalVariables,
        mockLocalVariableCollections,
        true
      );

      expect(result).toEqual(["--colors-primary: rgba(255, 0, 0, 1);"]);
      expect(cssVariables).toEqual(["--colors-primary: rgba(255, 0, 0, 1);"]);
    });

    it("should format FLOAT value correctly", () => {
      const floatVariable: Variable = {
        name: "spacing",
        resolvedType: "FLOAT",
        variableCollectionId: "collection1",
        valuesByMode: {
          mode1: 16,
        },
      };

      const result = formatAndAddCSSVariable(
        cssVariables,
        "spacing",
        "default",
        "medium",
        floatVariable,
        "mode1",
        mockLocalVariables,
        mockLocalVariableCollections,
        false
      );

      expect(result).toEqual(["--spacing-default-medium: 16px;"]);
    });

    it("should format STRING value correctly", () => {
      const stringVariable: Variable = {
        name: "font-family",
        resolvedType: "STRING",
        variableCollectionId: "collection1",
        valuesByMode: {
          mode1: "Arial, sans-serif",
        },
      };

      const result = formatAndAddCSSVariable(
        cssVariables,
        "typography",
        "default",
        "body",
        stringVariable,
        "mode1",
        mockLocalVariables,
        mockLocalVariableCollections,
        false
      );

      expect(result).toEqual(["--typography-default-body: Arial, sans-serif;"]);
    });

    it("should handle unknown value types by converting to string", () => {
      const unknownVariable: Variable = {
        name: "unknown",
        resolvedType: "STRING",
        variableCollectionId: "collection1",
        valuesByMode: {
          mode1: null as any,
        },
      };

      const result = formatAndAddCSSVariable(
        cssVariables,
        "misc",
        "default",
        "unknown",
        unknownVariable,
        "mode1",
        mockLocalVariables,
        mockLocalVariableCollections,
        false
      );

      expect(result).toEqual(["--misc-default-unknown: null;"]);
    });
  });

  describe("Variable alias handling", () => {
    it("should resolve variable alias correctly in multi-mode", () => {
      const aliasVariable: Variable = {
        name: "text-color",
        resolvedType: "COLOR",
        variableCollectionId: "collection1",
        valuesByMode: {
          mode1: {
            type: "VARIABLE_ALIAS",
            id: "var1",
          } as FigmaVariableAlias,
        },
      };

      const result = formatAndAddCSSVariable(
        cssVariables,
        "semantic",
        "light",
        "text",
        aliasVariable,
        "mode1",
        mockLocalVariables,
        mockLocalVariableCollections,
        false
      );

      expect(result).toEqual([
        "--semantic-light-text: var(--colors-light-primary-color);",
      ]);
    });

    it("should resolve variable alias correctly in single-mode", () => {
      const singleModeVariable: Variable = {
        name: "primary-color",
        resolvedType: "COLOR",
        variableCollectionId: "collection1",
        valuesByMode: {
          mode1: { r: 1, g: 0, b: 0, a: 1 } as FigmaColor,
        },
      };

      const singleModeVariables: LocalVariables = {
        var1: singleModeVariable,
      };

      const aliasVariable: Variable = {
        name: "text-color",
        resolvedType: "COLOR",
        variableCollectionId: "collection1",
        valuesByMode: {
          mode1: {
            type: "VARIABLE_ALIAS",
            id: "var1",
          } as FigmaVariableAlias,
        },
      };

      const result = formatAndAddCSSVariable(
        cssVariables,
        "semantic",
        "light",
        "text",
        aliasVariable,
        "mode1",
        singleModeVariables,
        mockLocalVariableCollections,
        false
      );

      expect(result).toEqual([
        "--semantic-light-text: var(--colors-primary-color);",
      ]);
    });

    it("should handle missing alias ID", () => {
      const aliasVariable: Variable = {
        name: "text-color",
        resolvedType: "COLOR",
        variableCollectionId: "collection1",
        valuesByMode: {
          mode1: {
            type: "VARIABLE_ALIAS",
            id: "",
          } as FigmaVariableAlias,
        },
      };

      const result = formatAndAddCSSVariable(
        cssVariables,
        "semantic",
        "light",
        "text",
        aliasVariable,
        "mode1",
        mockLocalVariables,
        mockLocalVariableCollections,
        false
      );

      expect(result).toEqual([
        "--semantic-light-text: var(--missing-alias-id);",
      ]);
    });

    it("should handle unknown alias variable", () => {
      const aliasVariable: Variable = {
        name: "text-color",
        resolvedType: "COLOR",
        variableCollectionId: "collection1",
        valuesByMode: {
          mode1: {
            type: "VARIABLE_ALIAS",
            id: "unknown-var",
          } as FigmaVariableAlias,
        },
      };

      const result = formatAndAddCSSVariable(
        cssVariables,
        "semantic",
        "light",
        "text",
        aliasVariable,
        "mode1",
        mockLocalVariables,
        mockLocalVariableCollections,
        false
      );

      expect(result).toEqual(["--semantic-light-text: var(--unknown-alias);"]);
    });

    it("should handle unknown alias collection", () => {
      const unknownCollectionVariable: Variable = {
        name: "alias-color",
        resolvedType: "COLOR",
        variableCollectionId: "unknown-collection",
        valuesByMode: {
          mode1: { r: 1, g: 0, b: 0, a: 1 } as FigmaColor,
        },
      };

      const variablesWithUnknownCollection: LocalVariables = {
        ...mockLocalVariables,
        "unknown-var": unknownCollectionVariable,
      };

      const aliasVariable: Variable = {
        name: "text-color",
        resolvedType: "COLOR",
        variableCollectionId: "collection1",
        valuesByMode: {
          mode1: {
            type: "VARIABLE_ALIAS",
            id: "unknown-var",
          } as FigmaVariableAlias,
        },
      };

      const result = formatAndAddCSSVariable(
        cssVariables,
        "semantic",
        "light",
        "text",
        aliasVariable,
        "mode1",
        variablesWithUnknownCollection,
        mockLocalVariableCollections,
        false
      );

      expect(result).toEqual([
        "--semantic-light-text: var(--unknown-collection);",
      ]);
    });

    it("should handle alias with unknown mode", () => {
      const multiModeVariable: Variable = {
        name: "primary-color",
        resolvedType: "COLOR",
        variableCollectionId: "collection1",
        valuesByMode: {
          "unknown-mode": { r: 1, g: 0, b: 0, a: 1 } as FigmaColor,
        },
      };

      const variablesWithUnknownMode: LocalVariables = {
        var1: multiModeVariable,
      };

      const aliasVariable: Variable = {
        name: "text-color",
        resolvedType: "COLOR",
        variableCollectionId: "collection1",
        valuesByMode: {
          mode1: {
            type: "VARIABLE_ALIAS",
            id: "var1",
          } as FigmaVariableAlias,
        },
      };

      const result = formatAndAddCSSVariable(
        cssVariables,
        "semantic",
        "light",
        "text",
        aliasVariable,
        "mode1",
        variablesWithUnknownMode,
        mockLocalVariableCollections,
        false
      );

      expect(result).toEqual([
        "--semantic-light-text: var(--colors-primary-color);",
      ]);
    });
  });

  describe("Error handling", () => {
    it("should catch and re-throw errors with context", () => {
      // Mock formatName to throw an error
      mockFormatName.mockImplementation(() => {
        throw new Error("Format error");
      });

      expect(() =>
        formatAndAddCSSVariable(
          cssVariables,
          "colors",
          "light",
          "primary",
          mockVariable,
          "mode1",
          mockLocalVariables,
          mockLocalVariableCollections,
          false
        )
      ).toThrow("❌ Failed to format CSS variable 'primary': Format error");
    });

    it("should handle unknown errors", () => {
      // Mock formatName to throw a non-Error object
      mockFormatName.mockImplementation(() => {
        throw "String error";
      });

      expect(() =>
        formatAndAddCSSVariable(
          cssVariables,
          "colors",
          "light",
          "primary",
          mockVariable,
          "mode1",
          mockLocalVariables,
          mockLocalVariableCollections,
          false
        )
      ).toThrow("❌ Failed to format CSS variable 'primary': Unknown error");
    });
  });

  describe("Edge cases", () => {
    it("should handle empty cssVariables array", () => {
      const result = formatAndAddCSSVariable(
        [],
        "colors",
        "light",
        "primary",
        mockVariable,
        "mode1",
        mockLocalVariables,
        mockLocalVariableCollections,
        false
      );

      expect(result).toEqual(["--colors-light-primary: rgba(255, 0, 0, 1);"]);
    });

    it("should append to existing cssVariables array", () => {
      cssVariables.push("--existing: value;");

      const result = formatAndAddCSSVariable(
        cssVariables,
        "colors",
        "light",
        "primary",
        mockVariable,
        "mode1",
        mockLocalVariables,
        mockLocalVariableCollections,
        false
      );

      expect(result).toEqual([
        "--existing: value;",
        "--colors-light-primary: rgba(255, 0, 0, 1);",
      ]);
    });

    it("should handle special characters in names", () => {
      const specialVariable: Variable = {
        name: "primary_color$test",
        resolvedType: "COLOR",
        variableCollectionId: "collection1",
        valuesByMode: {
          mode1: { r: 1, g: 0, b: 0, a: 1 } as FigmaColor,
        },
      };

      const result = formatAndAddCSSVariable(
        cssVariables,
        "colors@test",
        "light mode",
        "primary_var",
        specialVariable,
        "mode1",
        mockLocalVariables,
        mockLocalVariableCollections,
        false
      );

      expect(result).toEqual([
        "--colors-test-light-mode-primary-var: rgba(255, 0, 0, 1);",
      ]);
    });

    it("should handle boolean values", () => {
      const booleanVariable: Variable = {
        name: "enabled",
        resolvedType: "BOOLEAN",
        variableCollectionId: "collection1",
        valuesByMode: {
          mode1: true,
        },
      };

      const result = formatAndAddCSSVariable(
        cssVariables,
        "config",
        "default",
        "feature",
        booleanVariable,
        "mode1",
        mockLocalVariables,
        mockLocalVariableCollections,
        false
      );

      expect(result).toEqual(["--config-default-feature: true;"]);
    });

    it("should handle zero values", () => {
      const zeroVariable: Variable = {
        name: "spacing",
        resolvedType: "FLOAT",
        variableCollectionId: "collection1",
        valuesByMode: {
          mode1: 0,
        },
      };

      const result = formatAndAddCSSVariable(
        cssVariables,
        "spacing",
        "default",
        "none",
        zeroVariable,
        "mode1",
        mockLocalVariables,
        mockLocalVariableCollections,
        false
      );

      expect(result).toEqual(["--spacing-default-none: 0px;"]);
    });

    it("should handle negative values", () => {
      const negativeVariable: Variable = {
        name: "margin",
        resolvedType: "FLOAT",
        variableCollectionId: "collection1",
        valuesByMode: {
          mode1: -10,
        },
      };

      const result = formatAndAddCSSVariable(
        cssVariables,
        "spacing",
        "default",
        "negative",
        negativeVariable,
        "mode1",
        mockLocalVariables,
        mockLocalVariableCollections,
        false
      );

      expect(result).toEqual(["--spacing-default-negative: -10px;"]);
    });
  });

  describe("Integration with dependencies", () => {
    it("should call formatName with correct parameters for multi-mode", () => {
      const formatName = require("../src/scripts/utils/formatName").default;

      formatAndAddCSSVariable(
        cssVariables,
        "colors",
        "light",
        "primary",
        mockVariable,
        "mode1",
        mockLocalVariables,
        mockLocalVariableCollections,
        false
      );

      expect(formatName).toHaveBeenCalledWith("--colors-light-primary");
    });

    it("should call formatName with correct parameters for single-mode", () => {
      const formatName = require("../src/scripts/utils/formatName").default;

      formatAndAddCSSVariable(
        cssVariables,
        "colors",
        "light",
        "primary",
        mockVariable,
        "mode1",
        mockLocalVariables,
        mockLocalVariableCollections,
        true
      );

      expect(formatName).toHaveBeenCalledWith("--colors-primary");
    });

    it("should call formatValue with correct parameters", () => {
      const formatValue = require("../src/scripts/utils/formatValue").default;

      formatAndAddCSSVariable(
        cssVariables,
        "colors",
        "light",
        "primary",
        mockVariable,
        "mode1",
        mockLocalVariables,
        mockLocalVariableCollections,
        false
      );

      expect(formatValue).toHaveBeenCalledWith("COLOR", "primary-color", {
        r: 1,
        g: 0,
        b: 0,
        a: 1,
      });
    });
  });
});
