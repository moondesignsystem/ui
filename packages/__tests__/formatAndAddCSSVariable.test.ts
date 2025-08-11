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

  // Helper function to create test variables
  const createVariable = (overrides: Partial<Variable> = {}): Variable => ({
    name: "primary-color",
    resolvedType: "COLOR",
    variableCollectionId: "collection1",
    valuesByMode: {
      mode1: { r: 1, g: 0, b: 0, a: 1 } as FigmaColor,
    },
    ...overrides,
  });

  // Helper function to call formatAndAddCSSVariable with default parameters
  const callFunction = (overrides: any = {}) => {
    const defaults = {
      cssVariables,
      collectionName: "colors",
      modeName: "light",
      variableName: "primary",
      variable: createVariable(),
      modeId: "mode1",
      localVariables: mockLocalVariables,
      localVariableCollections: mockLocalVariableCollections,
      singleMode: false,
    };
    const params = { ...defaults, ...overrides };
    return formatAndAddCSSVariable(
      params.cssVariables,
      params.collectionName,
      params.modeName,
      params.variableName,
      params.variable,
      params.modeId,
      params.localVariables,
      params.localVariableCollections,
      params.singleMode
    );
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
    const invalidCssVariablesScenarios = [
      { cssVariables: null, description: "cssVariables is not an array" },
      { cssVariables: undefined, description: "cssVariables is undefined" },
    ];

    invalidCssVariablesScenarios.forEach(({ cssVariables, description }) => {
      it(`should throw error when ${description}`, () => {
        expect(() =>
          callFunction({ cssVariables })
        ).toThrow("❌ cssVariables must be a valid array");
      });
    });

    const requiredParameterScenarios = [
      { collectionName: "", description: "collectionName is missing" },
      { modeName: "", description: "modeName is missing" },
      { variableName: "", description: "variableName is missing" },
      { variable: null, description: "variable is missing" },
      { modeId: "", description: "modeId is missing" },
    ];

    requiredParameterScenarios.forEach(({ description, ...overrides }) => {
      it(`should throw error when ${description}`, () => {
        expect(() =>
          callFunction(overrides)
        ).toThrow("❌ All required parameters must be provided");
      });
    });
  });

  describe("Regular value handling", () => {
    const valueTestCases = [
      {
        description: "format COLOR value correctly in multi-mode",
        variable: createVariable(),
        singleMode: false,
        expected: ["--colors-light-primary: rgba(255, 0, 0, 1);"],
      },
      {
        description: "format COLOR value correctly in single-mode",
        variable: createVariable(),
        singleMode: true,
        expected: ["--colors-primary: rgba(255, 0, 0, 1);"],
      },
      {
        description: "format FLOAT value correctly",
        variable: createVariable({
          name: "spacing",
          resolvedType: "FLOAT",
          valuesByMode: { mode1: 16 },
        }),
        collectionName: "spacing",
        modeName: "default",
        variableName: "medium",
        expected: ["--spacing-default-medium: 16px;"],
      },
      {
        description: "format STRING value correctly",
        variable: createVariable({
          name: "font-family",
          resolvedType: "STRING",
          valuesByMode: { mode1: "Arial, sans-serif" },
        }),
        collectionName: "typography",
        modeName: "default",
        variableName: "body",
        expected: ["--typography-default-body: Arial, sans-serif;"],
      },
      {
        description: "handle unknown value types by converting to string",
        variable: createVariable({
          name: "unknown",
          resolvedType: "STRING",
          valuesByMode: { mode1: null as any },
        }),
        collectionName: "misc",
        modeName: "default",
        variableName: "unknown",
        expected: ["--misc-default-unknown: null;"],
      },
    ];

    valueTestCases.forEach(({ description, expected, ...overrides }) => {
      it(`should ${description}`, () => {
        const result = callFunction(overrides);
        expect(result).toEqual(expected);
        expect(cssVariables).toEqual(expected);
      });
    });
  });

  describe("Variable alias handling", () => {
    const createAliasVariable = (aliasId: string): Variable => ({
      name: "text-color",
      resolvedType: "COLOR",
      variableCollectionId: "collection1",
      valuesByMode: {
        mode1: {
          type: "VARIABLE_ALIAS",
          id: aliasId,
        } as FigmaVariableAlias,
      },
    });

    const aliasTestCases = [
      {
        description: "resolve variable alias correctly in multi-mode",
        variable: createAliasVariable("var1"),
        collectionName: "semantic",
        variableName: "text",
        singleMode: false,
        expected: ["--semantic-light-text: var(--colors-light-primary-color);"],
      },
      {
        description: "handle missing alias ID",
        variable: createAliasVariable(""),
        collectionName: "semantic",
        variableName: "text",
        expected: ["--semantic-light-text: var(--missing-alias-id);"],
      },
      {
        description: "handle unknown alias variable",
        variable: createAliasVariable("unknown-var"),
        collectionName: "semantic",
        variableName: "text",
        expected: ["--semantic-light-text: var(--unknown-alias);"],
      },
    ];

    aliasTestCases.forEach(({ description, expected, ...overrides }) => {
      it(`should ${description}`, () => {
        const result = callFunction(overrides);
        expect(result).toEqual(expected);
      });
    });

    it("should resolve variable alias correctly in single-mode", () => {
      const singleModeVariable: Variable = createVariable({
        valuesByMode: { mode1: { r: 1, g: 0, b: 0, a: 1 } as FigmaColor },
      });

      const singleModeVariables: LocalVariables = {
        var1: singleModeVariable,
      };

      const result = callFunction({
        variable: createAliasVariable("var1"),
        collectionName: "semantic",
        variableName: "text",
        localVariables: singleModeVariables,
        singleMode: false,
      });

      expect(result).toEqual([
        "--semantic-light-text: var(--colors-primary-color);",
      ]);
    });

    it("should handle unknown alias collection", () => {
      const unknownCollectionVariable: Variable = createVariable({
        name: "alias-color",
        variableCollectionId: "unknown-collection",
      });

      const variablesWithUnknownCollection: LocalVariables = {
        ...mockLocalVariables,
        "unknown-var": unknownCollectionVariable,
      };

      const result = callFunction({
        variable: createAliasVariable("unknown-var"),
        collectionName: "semantic",
        variableName: "text",
        localVariables: variablesWithUnknownCollection,
      });

      expect(result).toEqual([
        "--semantic-light-text: var(--unknown-collection);",
      ]);
    });

    it("should handle alias with unknown mode", () => {
      const multiModeVariable: Variable = createVariable({
        valuesByMode: { "unknown-mode": { r: 1, g: 0, b: 0, a: 1 } as FigmaColor },
      });

      const variablesWithUnknownMode: LocalVariables = {
        var1: multiModeVariable,
      };

      const result = callFunction({
        variable: createAliasVariable("var1"),
        collectionName: "semantic",
        variableName: "text",
        localVariables: variablesWithUnknownMode,
      });

      expect(result).toEqual([
        "--semantic-light-text: var(--colors-primary-color);",
      ]);
    });
  });

  describe("Error handling", () => {
    const errorScenarios = [
      {
        description: "catch and re-throw errors with context",
        mockImplementation: () => { throw new Error("Format error"); },
        expectedError: "❌ Failed to format CSS variable 'primary': Format error",
      },
      {
        description: "handle unknown errors",
        mockImplementation: () => { throw "String error"; },
        expectedError: "❌ Failed to format CSS variable 'primary': Unknown error",
      },
    ];

    errorScenarios.forEach(({ description, mockImplementation, expectedError }) => {
      it(`should ${description}`, () => {
        mockFormatName.mockImplementation(mockImplementation);

        expect(() => callFunction()).toThrow(expectedError);
      });
    });
  });

  describe("Edge cases", () => {
    const edgeCaseTestCases = [
      {
        description: "handle empty cssVariables array",
        cssVariables: [],
        expected: ["--colors-light-primary: rgba(255, 0, 0, 1);"],
      },
      {
        description: "handle boolean values",
        variable: createVariable({
          name: "enabled",
          resolvedType: "BOOLEAN",
          valuesByMode: { mode1: true },
        }),
        collectionName: "config",
        modeName: "default",
        variableName: "feature",
        expected: ["--config-default-feature: true;"],
      },
      {
        description: "handle zero values",
        variable: createVariable({
          name: "spacing",
          resolvedType: "FLOAT",
          valuesByMode: { mode1: 0 },
        }),
        collectionName: "spacing",
        modeName: "default",
        variableName: "none",
        expected: ["--spacing-default-none: 0px;"],
      },
      {
        description: "handle negative values",
        variable: createVariable({
          name: "margin",
          resolvedType: "FLOAT",
          valuesByMode: { mode1: -10 },
        }),
        collectionName: "spacing",
        modeName: "default",
        variableName: "negative",
        expected: ["--spacing-default-negative: -10px;"],
      },
    ];

    edgeCaseTestCases.forEach(({ description, expected, ...overrides }) => {
      it(`should ${description}`, () => {
        const result = callFunction(overrides);
        expect(result).toEqual(expected);
      });
    });

    it("should append to existing cssVariables array", () => {
      cssVariables.push("--existing: value;");

      const result = callFunction();

      expect(result).toEqual([
        "--existing: value;",
        "--colors-light-primary: rgba(255, 0, 0, 1);",
      ]);
    });

    it("should handle special characters in names", () => {
      const result = callFunction({
        variable: createVariable({
          name: "primary_color$test",
        }),
        collectionName: "colors@test",
        modeName: "light mode",
        variableName: "primary_var",
      });

      expect(result).toEqual([
        "--colors-test-light-mode-primary-var: rgba(255, 0, 0, 1);",
      ]);
    });
  });

  describe("Integration with dependencies", () => {
    const integrationTestCases = [
      {
        description: "call formatName with correct parameters for multi-mode",
        singleMode: false,
        expectedFormatNameCall: "--colors-light-primary",
      },
      {
        description: "call formatName with correct parameters for single-mode",
        singleMode: true,
        expectedFormatNameCall: "--colors-primary",
      },
    ];

    integrationTestCases.forEach(({ description, singleMode, expectedFormatNameCall }) => {
      it(`should ${description}`, () => {
        const formatName = require("../src/scripts/utils/formatName").default;

        callFunction({ singleMode });

        expect(formatName).toHaveBeenCalledWith(expectedFormatNameCall);
      });
    });

    it("should call formatValue with correct parameters", () => {
      const formatValue = require("../src/scripts/utils/formatValue").default;

      callFunction();

      expect(formatValue).toHaveBeenCalledWith("COLOR", "primary-color", {
        r: 1,
        g: 0,
        b: 0,
        a: 1,
      });
    });
  });
});
