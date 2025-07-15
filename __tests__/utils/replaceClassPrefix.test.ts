import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import replaceClassPrefix from "../../src/scripts/utils/replaceClassPrefix";
import getConfig from "../../src/scripts/utils/getConfig";

// Mock getConfig function
jest.mock("../../src/scripts/utils/getConfig");

const mockedGetConfig = getConfig as jest.MockedFunction<typeof getConfig>;

describe("replaceClassPrefix", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Helper function to create config mock
  const createMockConfig = (overrides: any = {}) => ({
    coreFileId: "test",
    componentsFileId: "test",
    projectName: "myproject",
    outputFolder: "test",
    target: "tailwindcss",
    customPrefix: true,
    ...overrides,
  });

  describe("Error handling", () => {
    const invalidInputs = [
      { input: "", description: "empty string" },
      { input: null, description: "null" },
      { input: undefined, description: "undefined" },
    ];

    invalidInputs.forEach(({ input, description }) => {
      it(`should throw error when CSS content is ${description}`, () => {
        expect(() => replaceClassPrefix(input as any)).toThrow(
          "❌ CSS content is required"
        );
        expect(mockedGetConfig).not.toHaveBeenCalled();
      });
    });

    const errorScenarios = [
      {
        mockImplementation: () => { throw new Error("Config file not found"); },
        expectedError: "❌ Failed to replace class prefix: Config file not found",
        description: "getConfig throwing an Error"
      },
      {
        mockImplementation: () => { throw "Unknown error"; },
        expectedError: "❌ Failed to replace class prefix: Unknown error",
        description: "getConfig throwing unknown error"
      },
    ];

    errorScenarios.forEach(({ mockImplementation, expectedError, description }) => {
      it(`should handle ${description}`, () => {
        const cssContent = ".moon-button { color: red; }";
        mockedGetConfig.mockImplementation(mockImplementation);

        expect(() => replaceClassPrefix(cssContent)).toThrow(expectedError);
      });
    });
  });

  describe("No customPrefix scenarios", () => {
    const noCustomPrefixConfigs = [
      { config: createMockConfig({ customPrefix: false }), description: "customPrefix is false" },
      { config: createMockConfig({ customPrefix: undefined }), description: "customPrefix is undefined" },
      { config: null, description: "config is null" },
    ];

    noCustomPrefixConfigs.forEach(({ config, description }) => {
      it(`should return original CSS when ${description}`, () => {
        const cssContent = ".moon-button { color: red; }\n.moon-input { border: 1px solid blue; }";
        mockedGetConfig.mockReturnValue(config as any);

        const result = replaceClassPrefix(cssContent);

        expect(result).toBe(cssContent);
        if (config !== null) {
          expect(mockedGetConfig).toHaveBeenCalledTimes(1);
        }
      });
    });
  });

  describe("Class prefix replacement", () => {
    const replacementTestCases = [
      {
        description: "replace moon- prefix with projectName prefix",
        cssContent: ".moon-button { color: red; }",
        projectName: "myproject",
        expected: ".myproject-button { color: red; }",
      },
      {
        description: "replace multiple moon- prefixes in single CSS rule",
        cssContent: ".moon-button.moon-primary { color: red; }",
        projectName: "awesome",
        expected: ".awesome-button.awesome-primary { color: red; }",
      },
      {
        description: "handle projectName with special characters",
        cssContent: ".moon-button { color: red; }",
        projectName: "my-awesome_project123",
        expected: ".my-awesome_project123-button { color: red; }",
      },
    ];

    replacementTestCases.forEach(({ description, cssContent, projectName, expected }) => {
      it(`should ${description}`, () => {
        mockedGetConfig.mockReturnValue(createMockConfig({ projectName }));

        const result = replaceClassPrefix(cssContent);

        expect(result).toBe(expected);
        expect(mockedGetConfig).toHaveBeenCalledTimes(1);
      });
    });

    it("should replace moon- prefixes across multiple CSS rules", () => {
      const cssContent = `
.moon-button {
  color: red;
}
.moon-input {
  border: 1px solid blue;
}
.moon-card .moon-header {
  font-weight: bold;
}`;

      mockedGetConfig.mockReturnValue(createMockConfig({ projectName: "webapp" }));

      const result = replaceClassPrefix(cssContent);

      const expected = `
.webapp-button {
  color: red;
}
.webapp-input {
  border: 1px solid blue;
}
.webapp-card .webapp-header {
  font-weight: bold;
}`;

      expect(result).toBe(expected);
    });

    it("should only replace .moon- and not other occurrences of moon-", () => {
      const cssContent = `
.moon-button { color: red; }
/* This is about moon-phases */
.other-moon-class { background: blue; }
content: "moon-like";`;

      mockedGetConfig.mockReturnValue(createMockConfig({ projectName: "custom" }));

      const result = replaceClassPrefix(cssContent);

      const expected = `
.custom-button { color: red; }
/* This is about moon-phases */
.other-moon-class { background: blue; }
content: "moon-like";`;

      expect(result).toBe(expected);
    });
  });

  describe("Edge cases and complex CSS", () => {
    const complexCssTestCases = [
      {
        description: "handle CSS with nested selectors and pseudo-classes",
        cssContent: `
.moon-button:hover .moon-icon {
  color: blue;
}
.moon-form .moon-input:focus {
  border-color: green;
}
@media (max-width: 768px) {
  .moon-mobile { display: block; }
}`,
        projectName: "responsive",
        expected: `
.responsive-button:hover .responsive-icon {
  color: blue;
}
.responsive-form .responsive-input:focus {
  border-color: green;
}
@media (max-width: 768px) {
  .responsive-mobile { display: block; }
}`,
      },
      {
        description: "handle CSS with comments containing moon- references",
        cssContent: `
/* .moon-old-class was deprecated */
.moon-button {
  /* Based on moon-design-system */
  color: red;
}`,
        projectName: "newdesign",
        expected: `
/* .newdesign-old-class was deprecated */
.newdesign-button {
  /* Based on moon-design-system */
  color: red;
}`,
      },
    ];

    complexCssTestCases.forEach(({ description, cssContent, projectName, expected }) => {
      it(`should ${description}`, () => {
        mockedGetConfig.mockReturnValue(createMockConfig({ projectName }));

        const result = replaceClassPrefix(cssContent);

        expect(result).toBe(expected);
      });
    });

    it("should handle empty CSS content when customPrefix is true", () => {
      const cssContent = "   "; // whitespace that might be truthy
      mockedGetConfig.mockReturnValue(createMockConfig({ projectName: "test" }));

      const result = replaceClassPrefix(cssContent);

      expect(result).toBe("   "); // Should return as-is
    });

    it("should handle very long CSS content efficiently", () => {
      // Generate a long CSS string with many moon- classes
      const moonClasses = Array.from(
        { length: 100 },
        (_, i) => `.moon-class${i} { color: red; }`
      );
      const cssContent = moonClasses.join("\n");

      mockedGetConfig.mockReturnValue(createMockConfig({ projectName: "large" }));

      const result = replaceClassPrefix(cssContent);

      // Check that all classes were replaced
      expect(result).not.toContain(".moon-");
      expect(result).toContain(".large-class0");
      expect(result).toContain(".large-class99");

      // Count replacements
      const moonCount = (cssContent.match(/\.moon-/g) || []).length;
      const largeCount = (result.match(/\.large-/g) || []).length;
      expect(largeCount).toBe(moonCount);
    });
  });

  describe("Integration with getConfig variations", () => {
    const configVariations = [
      {
        description: "work with minimal config structure",
        cssContent: ".moon-component { display: flex; }",
        config: {
          coreFileId: "core123",
          componentsFileId: "comp456",
          projectName: "minimal",
          outputFolder: "dist",
          customPrefix: true,
          target: "tailwindcss" as const,
        },
        expected: ".minimal-component { display: flex; }",
      },
      {
        description: "work with config containing additional fields",
        cssContent: ".moon-widget { padding: 10px; }",
        config: {
          coreFileId: "core123",
          componentsFileId: "comp456",
          projectName: "extended",
          outputFolder: "build",
          customPrefix: true,
          target: "tailwindcss" as const,
          themes: { light: "theme1", dark: "theme2" },
        },
        expected: ".extended-widget { padding: 10px; }",
      },
    ];

    configVariations.forEach(({ description, cssContent, config, expected }) => {
      it(`should ${description}`, () => {
        mockedGetConfig.mockReturnValue(config);

        const result = replaceClassPrefix(cssContent);

        expect(result).toBe(expected);
      });
    });
  });
});
