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

  describe("Error handling", () => {
    it("should throw error when CSS content is empty string", () => {
      expect(() => replaceClassPrefix("")).toThrow(
        "❌ CSS content is required"
      );
      expect(mockedGetConfig).not.toHaveBeenCalled();
    });

    it("should throw error when CSS content is null", () => {
      expect(() => replaceClassPrefix(null as any)).toThrow(
        "❌ CSS content is required"
      );
      expect(mockedGetConfig).not.toHaveBeenCalled();
    });

    it("should throw error when CSS content is undefined", () => {
      expect(() => replaceClassPrefix(undefined as any)).toThrow(
        "❌ CSS content is required"
      );
      expect(mockedGetConfig).not.toHaveBeenCalled();
    });

    it("should handle getConfig throwing an Error", () => {
      const cssContent = ".moon-button { color: red; }";
      mockedGetConfig.mockImplementation(() => {
        throw new Error("Config file not found");
      });

      expect(() => replaceClassPrefix(cssContent)).toThrow(
        "❌ Failed to replace class prefix: Config file not found"
      );
    });

    it("should handle getConfig throwing unknown error", () => {
      const cssContent = ".moon-button { color: red; }";
      mockedGetConfig.mockImplementation(() => {
        throw "Unknown error"; // Non-Error object
      });

      expect(() => replaceClassPrefix(cssContent)).toThrow(
        "❌ Failed to replace class prefix: Unknown error"
      );
    });
  });

  describe("No customPrefix scenarios", () => {
    it("should return original CSS when customPrefix is false", () => {
      const cssContent =
        ".moon-button { color: red; }\n.moon-input { border: 1px solid blue; }";
      mockedGetConfig.mockReturnValue({
        coreFileId: "test",
        componentsFileId: "test",
        projectName: "myproject",
        outputFolder: "test",
        customPrefix: false,
      });

      const result = replaceClassPrefix(cssContent);

      expect(result).toBe(cssContent);
      expect(mockedGetConfig).toHaveBeenCalledTimes(1);
    });

    it("should return original CSS when customPrefix is undefined", () => {
      const cssContent = ".moon-button { color: red; }";
      mockedGetConfig.mockReturnValue({
        coreFileId: "test",
        componentsFileId: "test",
        projectName: "myproject",
        outputFolder: "test",
        // customPrefix is undefined
      });

      const result = replaceClassPrefix(cssContent);

      expect(result).toBe(cssContent);
    });

    it("should return original CSS when config is null", () => {
      const cssContent = ".moon-button { color: red; }";
      mockedGetConfig.mockReturnValue(null as any);

      const result = replaceClassPrefix(cssContent);

      expect(result).toBe(cssContent);
    });
  });

  describe("Class prefix replacement", () => {
    it("should replace moon- prefix with projectName prefix", () => {
      const cssContent = ".moon-button { color: red; }";
      mockedGetConfig.mockReturnValue({
        coreFileId: "test",
        componentsFileId: "test",
        projectName: "myproject",
        outputFolder: "test",
        customPrefix: true,
      });

      const result = replaceClassPrefix(cssContent);

      expect(result).toBe(".myproject-button { color: red; }");
      expect(mockedGetConfig).toHaveBeenCalledTimes(1);
    });

    it("should replace multiple moon- prefixes in single CSS rule", () => {
      const cssContent = ".moon-button.moon-primary { color: red; }";
      mockedGetConfig.mockReturnValue({
        coreFileId: "test",
        componentsFileId: "test",
        projectName: "awesome",
        outputFolder: "test",
        customPrefix: true,
      });

      const result = replaceClassPrefix(cssContent);

      expect(result).toBe(".awesome-button.awesome-primary { color: red; }");
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

      mockedGetConfig.mockReturnValue({
        coreFileId: "test",
        componentsFileId: "test",
        projectName: "webapp",
        outputFolder: "test",
        customPrefix: true,
      });

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

    it("should handle projectName with special characters", () => {
      const cssContent = ".moon-button { color: red; }";
      mockedGetConfig.mockReturnValue({
        coreFileId: "test",
        componentsFileId: "test",
        projectName: "my-awesome_project123",
        outputFolder: "test",
        customPrefix: true,
      });

      const result = replaceClassPrefix(cssContent);

      expect(result).toBe(".my-awesome_project123-button { color: red; }");
    });

    it("should only replace .moon- and not other occurrences of moon-", () => {
      const cssContent = `
.moon-button { color: red; }
/* This is about moon-phases */
.other-moon-class { background: blue; }
content: "moon-like";`;

      mockedGetConfig.mockReturnValue({
        coreFileId: "test",
        componentsFileId: "test",
        projectName: "custom",
        outputFolder: "test",
        customPrefix: true,
      });

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
    it("should handle empty CSS content when customPrefix is true", () => {
      // This should not reach the replacement logic due to early validation
      // but testing the behavior if somehow empty string passes through
      const cssContent = "   "; // whitespace that might be truthy
      mockedGetConfig.mockReturnValue({
        coreFileId: "test",
        componentsFileId: "test",
        projectName: "test",
        outputFolder: "test",
        customPrefix: true,
      });

      const result = replaceClassPrefix(cssContent);

      expect(result).toBe("   "); // Should return as-is
    });

    it("should handle CSS with nested selectors and pseudo-classes", () => {
      const cssContent = `
.moon-button:hover .moon-icon {
  color: blue;
}
.moon-form .moon-input:focus {
  border-color: green;
}
@media (max-width: 768px) {
  .moon-mobile { display: block; }
}`;

      mockedGetConfig.mockReturnValue({
        coreFileId: "test",
        componentsFileId: "test",
        projectName: "responsive",
        outputFolder: "test",
        customPrefix: true,
      });

      const result = replaceClassPrefix(cssContent);

      const expected = `
.responsive-button:hover .responsive-icon {
  color: blue;
}
.responsive-form .responsive-input:focus {
  border-color: green;
}
@media (max-width: 768px) {
  .responsive-mobile { display: block; }
}`;

      expect(result).toBe(expected);
    });

    it("should handle CSS with comments containing moon- references", () => {
      const cssContent = `
/* .moon-old-class was deprecated */
.moon-button {
  /* Based on moon-design-system */
  color: red;
}`;

      mockedGetConfig.mockReturnValue({
        coreFileId: "test",
        componentsFileId: "test",
        projectName: "newdesign",
        outputFolder: "test",
        customPrefix: true,
      });

      const result = replaceClassPrefix(cssContent);

      const expected = `
/* .newdesign-old-class was deprecated */
.newdesign-button {
  /* Based on moon-design-system */
  color: red;
}`;

      expect(result).toBe(expected);
    });

    it("should handle very long CSS content efficiently", () => {
      // Generate a long CSS string with many moon- classes
      const moonClasses = Array.from(
        { length: 100 },
        (_, i) => `.moon-class${i} { color: red; }`
      );
      const cssContent = moonClasses.join("\n");

      mockedGetConfig.mockReturnValue({
        coreFileId: "test",
        componentsFileId: "test",
        projectName: "large",
        outputFolder: "test",
        customPrefix: true,
      });

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
    it("should work with minimal config structure", () => {
      const cssContent = ".moon-component { display: flex; }";
      mockedGetConfig.mockReturnValue({
        coreFileId: "core123",
        componentsFileId: "comp456",
        projectName: "minimal",
        outputFolder: "dist",
        customPrefix: true,
      });

      const result = replaceClassPrefix(cssContent);

      expect(result).toBe(".minimal-component { display: flex; }");
    });

    it("should work with config containing additional fields", () => {
      const cssContent = ".moon-widget { padding: 10px; }";
      mockedGetConfig.mockReturnValue({
        coreFileId: "core123",
        componentsFileId: "comp456",
        projectName: "extended",
        outputFolder: "build",
        customPrefix: true,
        themes: { light: "theme1", dark: "theme2" },
      });

      const result = replaceClassPrefix(cssContent);

      expect(result).toBe(".extended-widget { padding: 10px; }");
    });
  });
});
