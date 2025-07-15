import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import processPublishedVariables from "../src/scripts/processPublishedVariables";
import type { FigmaVariableCollection, FigmaVariable } from "../src/types";

// Mock dependencies
jest.mock("../src/scripts/utils/formatName");

import formatName from "../src/scripts/utils/formatName";

const mockFormatName = formatName as jest.MockedFunction<typeof formatName>;

describe("processPublishedVariables", () => {
  let consoleErrorSpy: jest.SpiedFunction<typeof console.error>;

  // Helper functions
  const createMockCollection = (
    id: string,
    name: string,
    modes = [{ modeId: "mode1", name: "Light" }],
    variablaIds = ["var1"]
  ): FigmaVariableCollection => ({
    id,
    name,
    key: `${id}-key`,
    modes,
    defaultModeId: "mode1",
    remote: false,
    hiddenFromPublishing: false,
    variablaIds,
  });

  const createMockVariable = (
    id: string,
    name: string,
    collectionId: string,
    resolvedType: "COLOR" | "FLOAT" | "STRING" | "BOOLEAN" = "COLOR",
    valuesByMode: any = { mode1: { r: 0, g: 0.4, b: 1, a: 1 } }
  ): FigmaVariable => ({
    id,
    name,
    key: `${id}-key`,
    variableCollectionId: collectionId,
    resolvedType,
    valuesByMode,
    remote: false,
    description: `${name} description`,
    hiddenFromPublishing: false,
    scopes: [],
    codeSyntax: {},
    deletedButReferenced: false,
  });

  const callFunction = (
    localCollections: any = mockLocalVariableCollections,
    publishedCollections: any = mockPublishedVariableCollections,
    localVars: any = mockLocalVariables,
    publishedVars: any = mockPublishedVariables
  ) => processPublishedVariables(localCollections, publishedCollections, localVars, publishedVars);

  const expectBasicStructure = (result: any) => {
    expect(result).toHaveProperty("variableCollections");
    expect(result).toHaveProperty("themes");
    expect(result).toHaveProperty("colorCollectionName");
  };

  // Mock data
  const mockLocalVariableCollections = {
    collection1: createMockCollection("collection1", "Colors", [
      { modeId: "mode1", name: "Light" },
      { modeId: "mode2", name: "Dark" },
    ], ["var1", "var2"]),
    collection2: createMockCollection("collection2", "Spacing", [
      { modeId: "mode1", name: "Default" }
    ], ["var3"]),
  };

  const mockPublishedVariableCollections = { ...mockLocalVariableCollections };

  const mockLocalVariables = {
    var1: createMockVariable("var1", "primary", "collection1", "COLOR"),
    var2: createMockVariable("var2", "secondary", "collection1", "COLOR", 
      { mode1: { r: 1, g: 0.5, b: 0, a: 1 }, mode2: { r: 1, g: 0.7, b: 0.2, a: 1 } }),
    var3: createMockVariable("var3", "base", "collection2", "FLOAT", { mode1: 16 }),
  };

  const mockPublishedVariables = { ...mockLocalVariables };

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
      const result = callFunction();

      expectBasicStructure(result);
      expect(result.variableCollections).toHaveProperty("Colors");
      expect(result.variableCollections).toHaveProperty("Spacing");
    });

    it("should create variable collections with correct structure", () => {
      const result = callFunction();

      ["Colors", "Spacing"].forEach(collectionName => {
        expect(result.variableCollections).toHaveProperty(collectionName);
        expect(result.variableCollections[collectionName]).toHaveProperty("variables");
      });
    });

    it("should include variables with cssVariableName", () => {
      const result = callFunction();

      const cssVariableTests = [
        { collection: "Colors", variable: "primary", expected: "Colors/primary" },
        { collection: "Colors", variable: "secondary", expected: "Colors/secondary" },
        { collection: "Spacing", variable: "base", expected: "Spacing/base" },
      ];

      cssVariableTests.forEach(({ collection, variable, expected }) => {
        expect(result.variableCollections[collection].variables[variable].cssVariableName).toBe(expected);
      });
    });
  });

  describe("Collection filtering", () => {
    const emptyDataTestCases = [
      {
        description: "should only process collections that exist in both local and published",
        localCollections: mockLocalVariableCollections,
        publishedCollections: { collection1: mockPublishedVariableCollections.collection1 },
        expectedCollections: ["Colors"],
        unexpectedCollections: ["Spacing"],
      },
      {
        description: "should handle empty published collections",
        localCollections: mockLocalVariableCollections,
        publishedCollections: {},
        expectedCollections: [],
        unexpectedCollections: ["Colors", "Spacing"],
      },
      {
        description: "should handle empty local collections",
        localCollections: {},
        publishedCollections: mockPublishedVariableCollections,
        expectedCollections: [],
        unexpectedCollections: ["Colors", "Spacing"],
      },
    ];

    emptyDataTestCases.forEach(({ description, localCollections, publishedCollections, expectedCollections, unexpectedCollections }) => {
      it(description, () => {
        const result = callFunction(localCollections, publishedCollections);

        expectedCollections.forEach(collection => {
          expect(result.variableCollections).toHaveProperty(collection);
        });

        unexpectedCollections.forEach(collection => {
          expect(result.variableCollections).not.toHaveProperty(collection);
        });

        if (expectedCollections.length === 0) {
          expect(result.themes).toEqual([]);
          expect(result.colorCollectionName).toBe("");
        }
      });
    });
  });

  describe("Variable filtering", () => {
    it("should only include variables that exist in both local and published", () => {
      const partialPublished = { var1: mockPublishedVariables.var1 };

      const result = callFunction(undefined, undefined, undefined, partialPublished);

      const colorsVariables = result.variableCollections.Colors.variables;
      expect(colorsVariables).toHaveProperty("primary");
      expect(colorsVariables).not.toHaveProperty("secondary");
      
      const spacingVariables = result.variableCollections.Spacing.variables;
      expect(Object.keys(spacingVariables)).toHaveLength(0);
    });

    it("should filter variables by collection ID", () => {
      const orphanVariable = createMockVariable("var4", "orphan", "nonexistent-collection");
      const mixedVariables = { ...mockLocalVariables, var4: orphanVariable };
      const mixedPublished = { ...mockPublishedVariables, var4: orphanVariable };

      const result = callFunction(undefined, undefined, mixedVariables, mixedPublished);

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
      const result = callFunction();

      const expectedFormatNameCalls = ["Light", "Dark", "Colors"];
      expectedFormatNameCalls.forEach(call => {
        expect(mockFormatName).toHaveBeenCalledWith(call);
      });
      
      expect(result.themes).toEqual(["light", "dark"]);
      expect(result.colorCollectionName).toBe("colors");
    });

    const colorDetectionTestCases = [
      {
        description: "should not set themes for non-color collections",
        variables: { var3: mockLocalVariables.var3 },
        published: { var3: mockPublishedVariables.var3 },
        collections: { collection2: mockLocalVariableCollections.collection2 },
        expectedThemes: [],
        expectedColorCollectionName: "",
      },
      {
        description: "should handle partially color collections",
        variables: {
          var1: mockLocalVariables.var1,
          var2: createMockVariable("var2", "secondary", "collection1", "FLOAT"),
        },
        published: null, // Will use variables as published
        collections: { collection1: mockLocalVariableCollections.collection1 },
        expectedThemes: [],
        expectedColorCollectionName: "",
      },
    ];

    colorDetectionTestCases.forEach(({ description, variables, published, collections, expectedThemes, expectedColorCollectionName }) => {
      it(description, () => {
        const publishedVars = published || variables;
        const result = callFunction(collections, collections, variables, publishedVars);

        expect(result.themes).toEqual(expectedThemes);
        expect(result.colorCollectionName).toBe(expectedColorCollectionName);
      });
    });

    it("should handle mixed collections (color + non-color)", () => {
      const result = callFunction();

      // Should detect themes from the color collection
      expect(result.themes).toEqual(["light", "dark"]);
      expect(result.colorCollectionName).toBe("colors");
      
      // Should still include both collections
      expect(result.variableCollections).toHaveProperty("Colors");
      expect(result.variableCollections).toHaveProperty("Spacing");
    });
  });

  describe("CSS variable naming and formatName integration", () => {
    it("should create correct CSS variable names", () => {
      const result = callFunction();

      const cssNameTests = [
        { collection: "Colors", variable: "primary", expected: "Colors/primary" },
        { collection: "Colors", variable: "secondary", expected: "Colors/secondary" },
        { collection: "Spacing", variable: "base", expected: "Spacing/base" },
      ];

      cssNameTests.forEach(({ collection, variable, expected }) => {
        expect(result.variableCollections[collection].variables[variable].cssVariableName).toBe(expected);
      });
    });

    it("should handle special characters in collection and variable names", () => {
      const specialCollections = {
        "special-collection": createMockCollection("special-collection", "Special Collection"),
      };
      const specialVariables = {
        "special-var": createMockVariable("special-var", "special variable", "special-collection"),
      };

      const result = callFunction(specialCollections, specialCollections, specialVariables, specialVariables);

      expect(result.variableCollections["Special Collection"].variables["special variable"].cssVariableName)
        .toBe("Special Collection/special variable");
    });

    const formatNameTestCases = [
      {
        description: "should call formatName for mode names and collection name when processing color collections",
        expectedCalls: ["Light", "Dark", "Colors"],
      },
      {
        description: "should use formatName results correctly",
        mockImplementation: (input: string) => `formatted-${input.toLowerCase()}`,
        expectedThemes: ["formatted-light", "formatted-dark"],
        expectedColorCollectionName: "formatted-colors",
      },
    ];

    formatNameTestCases.forEach(({ description, expectedCalls, mockImplementation, expectedThemes, expectedColorCollectionName }) => {
      it(description, () => {
        if (mockImplementation) {
          mockFormatName.mockImplementation(mockImplementation);
        }

        const result = callFunction();

        if (expectedCalls) {
          expectedCalls.forEach(call => {
            expect(mockFormatName).toHaveBeenCalledWith(call);
          });
        }

        if (expectedThemes) {
          expect(result.themes).toEqual(expectedThemes);
          expect(result.colorCollectionName).toBe(expectedColorCollectionName);
        }
      });
    });
  });

  describe("Data preservation", () => {
    const preservationTestCases = [
      {
        description: "should preserve original variable properties",
        test: (result: any) => {
          const primaryVar = result.variableCollections.Colors.variables.primary;
          const expectedProperties = {
            id: "var1",
            name: "primary",
            resolvedType: "COLOR",
            valuesByMode: mockLocalVariables.var1.valuesByMode,
            description: "primary description",
          };
          
          Object.entries(expectedProperties).forEach(([key, value]) => {
            expect(primaryVar[key]).toEqual(value);
          });
        },
      },
      {
        description: "should preserve original collection properties",
        test: (result: any) => {
          const colorsCollection = result.variableCollections.Colors;
          const expectedProperties = {
            id: "collection1",
            name: "Colors",
            modes: mockLocalVariableCollections.collection1.modes,
            defaultModeId: "mode1",
          };
          
          Object.entries(expectedProperties).forEach(([key, value]) => {
            expect(colorsCollection[key]).toEqual(value);
          });
        },
      },
    ];

    preservationTestCases.forEach(({ description, test }) => {
      it(description, () => {
        const result = callFunction();
        test(result);
      });
    });
  });

  describe("Error handling", () => {
    it("should handle errors and re-throw them", () => {
      mockFormatName.mockImplementation(() => {
        throw new Error("Format error");
      });

      expect(() => callFunction()).toThrow("Format error");
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "❌ Error in processPublishedVariables script:",
        expect.any(Error)
      );
    });

    const errorHandlingTestCases = [
      {
        description: "should handle malformed input data gracefully",
        setup: () => ({ "bad-collection": null as any }),
        expectThrow: false,
        expectedResult: { variableCollections: {}, themes: [], colorCollectionName: "" },
      },
      {
        description: "should handle undefined variables",
        setup: () => ({ var1: undefined as any }),
        expectThrow: true,
        localCollections: mockLocalVariableCollections,
        publishedCollections: mockPublishedVariableCollections,
        publishedVars: mockPublishedVariables,
      },
    ];

    errorHandlingTestCases.forEach(({ description, setup, expectThrow, expectedResult, localCollections, publishedCollections, publishedVars }) => {
      it(description, () => {
        const malformedData = setup();
        
        if (expectThrow) {
          expect(() => {
            callFunction(localCollections, publishedCollections, malformedData, publishedVars);
          }).toThrow();
          expect(consoleErrorSpy).toHaveBeenCalled();
        } else {
          const result = callFunction(malformedData, mockPublishedVariableCollections);
          expect(result).toEqual(expectedResult);
        }
      });
    });
  });

  describe("Edge cases", () => {
    const edgeCaseTestCases = [
      {
        description: "should handle empty variable collections",
        setup: () => ({
          collections: {
            collection1: createMockCollection("collection1", "Colors", [
              { modeId: "mode1", name: "Light" },
              { modeId: "mode2", name: "Dark" },
            ], []),
          },
          variables: {},
        }),
        expectedVariables: {},
        expectedThemes: ["light", "dark"], // empty() returns true for empty arrays
        expectedColorCollectionName: "colors",
      },
      {
        description: "should handle collections with no modes",
        setup: () => ({
          collections: {
            collection1: createMockCollection("collection1", "Colors", []),
          },
          variables: mockLocalVariables,
        }),
        expectedThemes: [],
      },
      {
        description: "should handle collections with single mode",
        setup: () => ({
          collections: {
            collection1: createMockCollection("collection1", "Colors", [
              { modeId: "mode1", name: "Default" }
            ]),
          },
          variables: mockLocalVariables,
        }),
        expectedThemes: ["default"],
        expectedColorCollectionName: "colors",
      },
    ];

    edgeCaseTestCases.forEach(({ description, setup, expectedVariables, expectedThemes, expectedColorCollectionName }) => {
      it(description, () => {
        const { collections, variables } = setup();
        const result = callFunction(collections, collections, variables, variables);

        if (expectedVariables !== undefined) {
          expect(result.variableCollections.Colors.variables).toEqual(expectedVariables);
        }
        if (expectedThemes !== undefined) {
          expect(result.themes).toEqual(expectedThemes);
        }
        if (expectedColorCollectionName !== undefined) {
          expect(result.colorCollectionName).toBe(expectedColorCollectionName);
        }
      });
    });

    it("should handle variables with different resolved types", () => {
      const mixedTypeVariables = {
        var1: createMockVariable("var1", "color-var", "collection1", "COLOR"),
        var2: createMockVariable("var2", "string-var", "collection1", "STRING"),
        var3: createMockVariable("var3", "float-var", "collection1", "FLOAT"),
        var4: createMockVariable("var4", "boolean-var", "collection1", "BOOLEAN"),
      };
      const singleCollection = { collection1: mockLocalVariableCollections.collection1 };

      const result = callFunction(singleCollection, singleCollection, mixedTypeVariables, mixedTypeVariables);

      // Should include all variables
      expect(Object.keys(result.variableCollections.Colors.variables)).toHaveLength(4);
      // Should not set themes because not all variables are COLOR
      expect(result.themes).toEqual([]);
      expect(result.colorCollectionName).toBe("");
    });

    it("should handle variables with no valuesByMode", () => {
      const noValuesVariables = {
        var1: createMockVariable("var1", "primary", "collection1", "COLOR", {}),
      };
      const singleCollection = { collection1: mockLocalVariableCollections.collection1 };

      const result = callFunction(singleCollection, singleCollection, noValuesVariables, noValuesVariables);

      expect(result.variableCollections.Colors.variables.primary.valuesByMode).toEqual({});
    });
  });
});
