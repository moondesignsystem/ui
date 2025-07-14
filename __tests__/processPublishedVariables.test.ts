import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import processPublishedVariables from "../src/scripts/processPublishedVariables";
import type { FigmaVariableCollection, FigmaVariable } from "../src/types";

// Mock dependencies
jest.mock("../src/scripts/utils/formatName");

import formatName from "../src/scripts/utils/formatName";

const mockFormatName = formatName as jest.MockedFunction<typeof formatName>;

describe("processPublishedVariables", () => {
  let consoleErrorSpy: jest.SpiedFunction<typeof console.error>;

  // Mock data types
  interface LocalVariableCollections {
    [key: string]: FigmaVariableCollection;
  }

  interface PublishedVariableCollections {
    [key: string]: FigmaVariableCollection;
  }

  interface LocalVariables {
    [key: string]: FigmaVariable;
  }

  interface PublishedVariables {
    [key: string]: FigmaVariable;
  }

  // Mock data
  const mockLocalVariableCollections: LocalVariableCollections = {
    collection1: {
      id: "collection1",
      name: "Colors",
      key: "colors-key",
      modes: [
        { modeId: "mode1", name: "Light" },
        { modeId: "mode2", name: "Dark" },
      ],
      defaultModeId: "mode1",
      remote: false,
      hiddenFromPublishing: false,
      variablaIds: ["var1", "var2"],
    },
    collection2: {
      id: "collection2",
      name: "Spacing",
      key: "spacing-key",
      modes: [{ modeId: "mode1", name: "Default" }],
      defaultModeId: "mode1",
      remote: false,
      hiddenFromPublishing: false,
      variablaIds: ["var3"],
    },
  };

  const mockPublishedVariableCollections: PublishedVariableCollections = {
    collection1: mockLocalVariableCollections.collection1,
    collection2: mockLocalVariableCollections.collection2,
  };

  const mockLocalVariables: LocalVariables = {
    var1: {
      id: "var1",
      name: "primary",
      key: "primary-key",
      variableCollectionId: "collection1",
      resolvedType: "COLOR",
      valuesByMode: {
        mode1: { r: 0, g: 0.4, b: 1, a: 1 },
        mode2: { r: 0.3, g: 0.6, b: 1, a: 1 },
      },
      remote: false,
      description: "Primary color",
      hiddenFromPublishing: false,
      scopes: [],
      codeSyntax: {},
      deletedButReferenced: false,
    },
    var2: {
      id: "var2",
      name: "secondary",
      key: "secondary-key",
      variableCollectionId: "collection1",
      resolvedType: "COLOR",
      valuesByMode: {
        mode1: { r: 1, g: 0.5, b: 0, a: 1 },
        mode2: { r: 1, g: 0.7, b: 0.2, a: 1 },
      },
      remote: false,
      description: "Secondary color",
      hiddenFromPublishing: false,
      scopes: [],
      codeSyntax: {},
      deletedButReferenced: false,
    },
    var3: {
      id: "var3",
      name: "base",
      key: "base-key",
      variableCollectionId: "collection2",
      resolvedType: "FLOAT",
      valuesByMode: {
        mode1: 16,
      },
      remote: false,
      description: "Base spacing",
      hiddenFromPublishing: false,
      scopes: [],
      codeSyntax: {},
      deletedButReferenced: false,
    },
  };

  const mockPublishedVariables: PublishedVariables = {
    var1: mockLocalVariables.var1,
    var2: mockLocalVariables.var2,
    var3: mockLocalVariables.var3,
  };

  beforeEach(() => {
    // Reset mocks
    mockFormatName.mockReset();
    
    // Set up default mock implementation
    mockFormatName.mockImplementation((input: string) => input.toLowerCase().replace(/\s+/g, "-"));
    
    // Spy on console methods
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  describe("Basic functionality", () => {
    it("should process published variables correctly", () => {
      const result = processPublishedVariables(
        mockLocalVariableCollections,
        mockPublishedVariableCollections,
        mockLocalVariables,
        mockPublishedVariables
      );

      expect(result).toHaveProperty("variableCollections");
      expect(result).toHaveProperty("themes");
      expect(result).toHaveProperty("colorCollectionName");
    });

    it("should create variable collections with correct structure", () => {
      const result = processPublishedVariables(
        mockLocalVariableCollections,
        mockPublishedVariableCollections,
        mockLocalVariables,
        mockPublishedVariables
      );

      expect(result.variableCollections).toHaveProperty("Colors");
      expect(result.variableCollections).toHaveProperty("Spacing");
      
      expect(result.variableCollections.Colors).toHaveProperty("variables");
      expect(result.variableCollections.Spacing).toHaveProperty("variables");
    });

    it("should include variables with cssVariableName", () => {
      const result = processPublishedVariables(
        mockLocalVariableCollections,
        mockPublishedVariableCollections,
        mockLocalVariables,
        mockPublishedVariables
      );

      const colorsVariables = result.variableCollections.Colors.variables;
      expect(colorsVariables.primary).toHaveProperty("cssVariableName", "Colors/primary");
      expect(colorsVariables.secondary).toHaveProperty("cssVariableName", "Colors/secondary");
    });
  });

  describe("Collection filtering", () => {
    it("should only process collections that exist in both local and published", () => {
      const partialPublished = {
        collection1: mockPublishedVariableCollections.collection1,
        // collection2 is missing
      };

      const result = processPublishedVariables(
        mockLocalVariableCollections,
        partialPublished,
        mockLocalVariables,
        mockPublishedVariables
      );

      expect(result.variableCollections).toHaveProperty("Colors");
      expect(result.variableCollections).not.toHaveProperty("Spacing");
    });

    it("should handle empty published collections", () => {
      const result = processPublishedVariables(
        mockLocalVariableCollections,
        {},
        mockLocalVariables,
        mockPublishedVariables
      );

      expect(Object.keys(result.variableCollections)).toHaveLength(0);
      expect(result.themes).toEqual([]);
      expect(result.colorCollectionName).toBe("");
    });

    it("should handle empty local collections", () => {
      const result = processPublishedVariables(
        {},
        mockPublishedVariableCollections,
        mockLocalVariables,
        mockPublishedVariables
      );

      expect(Object.keys(result.variableCollections)).toHaveLength(0);
      expect(result.themes).toEqual([]);
      expect(result.colorCollectionName).toBe("");
    });
  });

  describe("Variable filtering", () => {
    it("should only include variables that exist in both local and published", () => {
      const partialPublished = {
        var1: mockPublishedVariables.var1,
        // var2 and var3 are missing
      };

      const result = processPublishedVariables(
        mockLocalVariableCollections,
        mockPublishedVariableCollections,
        mockLocalVariables,
        partialPublished
      );

      const colorsVariables = result.variableCollections.Colors.variables;
      expect(colorsVariables).toHaveProperty("primary");
      expect(colorsVariables).not.toHaveProperty("secondary");
      
      const spacingVariables = result.variableCollections.Spacing.variables;
      expect(Object.keys(spacingVariables)).toHaveLength(0);
    });

    it("should filter variables by collection ID", () => {
      const mixedVariables = {
        ...mockLocalVariables,
        var4: {
          ...mockLocalVariables.var1,
          id: "var4",
          name: "orphan",
          variableCollectionId: "nonexistent-collection",
        },
      };

      const result = processPublishedVariables(
        mockLocalVariableCollections,
        mockPublishedVariableCollections,
        mixedVariables,
        { ...mockPublishedVariables, var4: mixedVariables.var4 }
      );

      // Should not include the orphan variable
      expect(result.variableCollections.Colors.variables).toHaveProperty("primary");
      expect(result.variableCollections.Colors.variables).toHaveProperty("secondary");
      expect(Object.values(result.variableCollections).every(
        collection => !Object.keys(collection.variables).includes("orphan")
      )).toBe(true);
    });
  });

  describe("Color collection detection", () => {
    it("should detect color collections and set themes", () => {
      const result = processPublishedVariables(
        mockLocalVariableCollections,
        mockPublishedVariableCollections,
        mockLocalVariables,
        mockPublishedVariables
      );

      expect(mockFormatName).toHaveBeenCalledWith("Light");
      expect(mockFormatName).toHaveBeenCalledWith("Dark");
      expect(mockFormatName).toHaveBeenCalledWith("Colors");
      
      expect(result.themes).toEqual(["light", "dark"]);
      expect(result.colorCollectionName).toBe("colors");
    });

    it("should not set themes for non-color collections", () => {
      // Remove color variables, leaving only spacing
      const nonColorVariables = {
        var3: mockLocalVariables.var3,
      };
      const nonColorPublished = {
        var3: mockPublishedVariables.var3,
      };
      const nonColorCollections = {
        collection2: mockLocalVariableCollections.collection2,
      };

      const result = processPublishedVariables(
        nonColorCollections,
        nonColorCollections,
        nonColorVariables,
        nonColorPublished
      );

      expect(result.themes).toEqual([]);
      expect(result.colorCollectionName).toBe("");
    });

    it("should handle mixed collections (color + non-color)", () => {
      const result = processPublishedVariables(
        mockLocalVariableCollections,
        mockPublishedVariableCollections,
        mockLocalVariables,
        mockPublishedVariables
      );

      // Should detect themes from the color collection
      expect(result.themes).toEqual(["light", "dark"]);
      expect(result.colorCollectionName).toBe("colors");
      
      // Should still include both collections
      expect(result.variableCollections).toHaveProperty("Colors");
      expect(result.variableCollections).toHaveProperty("Spacing");
    });

    it("should handle partially color collections", () => {
      // Mix COLOR and FLOAT variables in the same collection
      const mixedVariables = {
        var1: mockLocalVariables.var1, // COLOR
        var2: {
          ...mockLocalVariables.var2,
          resolvedType: "FLOAT" as const, // FLOAT instead of COLOR
        },
      };

      const result = processPublishedVariables(
        { collection1: mockLocalVariableCollections.collection1 },
        { collection1: mockPublishedVariableCollections.collection1 },
        mixedVariables,
        mixedVariables
      );

      // Should not set themes because not all variables are COLOR
      expect(result.themes).toEqual([]);
      expect(result.colorCollectionName).toBe("");
    });
  });

  describe("CSS variable naming", () => {
    it("should create correct CSS variable names", () => {
      const result = processPublishedVariables(
        mockLocalVariableCollections,
        mockPublishedVariableCollections,
        mockLocalVariables,
        mockPublishedVariables
      );

      expect(result.variableCollections.Colors.variables.primary.cssVariableName).toBe("Colors/primary");
      expect(result.variableCollections.Colors.variables.secondary.cssVariableName).toBe("Colors/secondary");
      expect(result.variableCollections.Spacing.variables.base.cssVariableName).toBe("Spacing/base");
    });

    it("should handle special characters in collection and variable names", () => {
      const specialCollections = {
        "special-collection": {
          ...mockLocalVariableCollections.collection1,
          id: "special-collection",
          name: "Special Collection",
        },
      };

      const specialVariables = {
        "special-var": {
          ...mockLocalVariables.var1,
          id: "special-var",
          name: "special variable",
          variableCollectionId: "special-collection",
        },
      };

      const result = processPublishedVariables(
        specialCollections,
        specialCollections,
        specialVariables,
        specialVariables
      );

      expect(result.variableCollections["Special Collection"].variables["special variable"].cssVariableName)
        .toBe("Special Collection/special variable");
    });
  });

  describe("formatName integration", () => {
    it("should call formatName for mode names when processing color collections", () => {
      processPublishedVariables(
        mockLocalVariableCollections,
        mockPublishedVariableCollections,
        mockLocalVariables,
        mockPublishedVariables
      );

      expect(mockFormatName).toHaveBeenCalledWith("Light");
      expect(mockFormatName).toHaveBeenCalledWith("Dark");
    });

    it("should call formatName for collection name when processing color collections", () => {
      processPublishedVariables(
        mockLocalVariableCollections,
        mockPublishedVariableCollections,
        mockLocalVariables,
        mockPublishedVariables
      );

      expect(mockFormatName).toHaveBeenCalledWith("Colors");
    });

    it("should use formatName results correctly", () => {
      mockFormatName.mockImplementation((input: string) => `formatted-${input.toLowerCase()}`);

      const result = processPublishedVariables(
        mockLocalVariableCollections,
        mockPublishedVariableCollections,
        mockLocalVariables,
        mockPublishedVariables
      );

      expect(result.themes).toEqual(["formatted-light", "formatted-dark"]);
      expect(result.colorCollectionName).toBe("formatted-colors");
    });
  });

  describe("Data preservation", () => {
    it("should preserve original variable properties", () => {
      const result = processPublishedVariables(
        mockLocalVariableCollections,
        mockPublishedVariableCollections,
        mockLocalVariables,
        mockPublishedVariables
      );

      const primaryVar = result.variableCollections.Colors.variables.primary;
      expect(primaryVar.id).toBe("var1");
      expect(primaryVar.name).toBe("primary");
      expect(primaryVar.resolvedType).toBe("COLOR");
      expect(primaryVar.valuesByMode).toEqual(mockLocalVariables.var1.valuesByMode);
      expect(primaryVar.description).toBe("Primary color");
    });

    it("should preserve original collection properties", () => {
      const result = processPublishedVariables(
        mockLocalVariableCollections,
        mockPublishedVariableCollections,
        mockLocalVariables,
        mockPublishedVariables
      );

      const colorsCollection = result.variableCollections.Colors;
      expect(colorsCollection.id).toBe("collection1");
      expect(colorsCollection.name).toBe("Colors");
      expect(colorsCollection.modes).toEqual(mockLocalVariableCollections.collection1.modes);
      expect(colorsCollection.defaultModeId).toBe("mode1");
    });
  });

  describe("Error handling", () => {
    it("should handle errors and re-throw them", () => {
      mockFormatName.mockImplementation(() => {
        throw new Error("Format error");
      });

      expect(() => {
        processPublishedVariables(
          mockLocalVariableCollections,
          mockPublishedVariableCollections,
          mockLocalVariables,
          mockPublishedVariables
        );
      }).toThrow("Format error");

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "❌ Error in processPublishedVariables script:",
        expect.any(Error)
      );
    });

    it("should handle malformed input data gracefully", () => {
      const malformedCollections = {
        "bad-collection": null as any,
      };

      // The function doesn't throw for null collection data - it just skips processing
      const result = processPublishedVariables(
        malformedCollections,
        mockPublishedVariableCollections,
        mockLocalVariables,
        mockPublishedVariables
      );

      expect(result.variableCollections).toEqual({});
      expect(result.themes).toEqual([]);
      expect(result.colorCollectionName).toBe("");
    });

    it("should handle undefined variables", () => {
      const undefinedVariables = {
        var1: undefined as any,
      };

      expect(() => {
        processPublishedVariables(
          mockLocalVariableCollections,
          mockPublishedVariableCollections,
          undefinedVariables,
          mockPublishedVariables
        );
      }).toThrow();

      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });

  describe("Edge cases", () => {
    it("should handle empty variable collections", () => {
      const emptyCollections = {
        collection1: {
          ...mockLocalVariableCollections.collection1,
          variablaIds: [],
        },
      };

      const result = processPublishedVariables(
        emptyCollections,
        emptyCollections,
        {},
        {}
      );

      expect(result.variableCollections.Colors.variables).toEqual({});
      // When there are no variables, the function still detects it as a color collection
      // because every() returns true for empty arrays, so themes are set from modes
      expect(result.themes).toEqual(["light", "dark"]);
      expect(result.colorCollectionName).toBe("colors");
    });

    it("should handle collections with no modes", () => {
      const noModeCollections = {
        collection1: {
          ...mockLocalVariableCollections.collection1,
          modes: [],
        },
      };

      const result = processPublishedVariables(
        noModeCollections,
        noModeCollections,
        mockLocalVariables,
        mockPublishedVariables
      );

      expect(result.themes).toEqual([]);
    });

    it("should handle variables with different resolved types", () => {
      const mixedTypeVariables = {
        var1: { ...mockLocalVariables.var1, resolvedType: "COLOR" as const },
        var2: { ...mockLocalVariables.var1, id: "var2", name: "string-var", resolvedType: "STRING" as const },
        var3: { ...mockLocalVariables.var1, id: "var3", name: "float-var", resolvedType: "FLOAT" as const },
        var4: { ...mockLocalVariables.var1, id: "var4", name: "boolean-var", resolvedType: "BOOLEAN" as const },
      };

      const result = processPublishedVariables(
        { collection1: mockLocalVariableCollections.collection1 },
        { collection1: mockPublishedVariableCollections.collection1 },
        mixedTypeVariables,
        mixedTypeVariables
      );

      // Should include all variables
      expect(Object.keys(result.variableCollections.Colors.variables)).toHaveLength(4);
      // Should not set themes because not all variables are COLOR
      expect(result.themes).toEqual([]);
      expect(result.colorCollectionName).toBe("");
    });

    it("should handle collections with single mode", () => {
      const singleModeCollection = {
        collection1: {
          ...mockLocalVariableCollections.collection1,
          modes: [{ modeId: "mode1", name: "Default" }],
        },
      };

      const result = processPublishedVariables(
        singleModeCollection,
        singleModeCollection,
        mockLocalVariables,
        mockPublishedVariables
      );

      expect(result.themes).toEqual(["default"]);
      expect(result.colorCollectionName).toBe("colors");
    });

    it("should handle variables with no valuesByMode", () => {
      const noValuesVariables = {
        var1: {
          ...mockLocalVariables.var1,
          valuesByMode: {},
        },
      };

      const result = processPublishedVariables(
        { collection1: mockLocalVariableCollections.collection1 },
        { collection1: mockPublishedVariableCollections.collection1 },
        noValuesVariables,
        noValuesVariables
      );

      expect(result.variableCollections.Colors.variables.primary.valuesByMode).toEqual({});
    });
  });
});
