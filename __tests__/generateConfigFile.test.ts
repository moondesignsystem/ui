import { describe, it, expect, beforeEach, afterEach, jest } from "@jest/globals";
import fs from "fs";
import generateConfigFile from "../src/scripts/generateConfigFile";

// Mock dependencies
jest.mock("fs");
jest.mock("../src/scripts/utils/getArgValue");

import getArgValue from "../src/scripts/utils/getArgValue";

const mockFs = fs as jest.Mocked<typeof fs>;
const mockGetArgValue = getArgValue as jest.MockedFunction<typeof getArgValue>;

describe("generateConfigFile", () => {
  let originalArgv: string[];
  let consoleLogSpy: jest.SpiedFunction<typeof console.log>;
  let consoleErrorSpy: jest.SpiedFunction<typeof console.error>;

  beforeEach(() => {
    originalArgv = process.argv;
    
    // Reset mocks
    mockFs.existsSync.mockReset();
    mockFs.writeFileSync.mockReset();
    mockGetArgValue.mockReset();
    
    // Set up default mock implementations
    mockFs.existsSync.mockReturnValue(false);
    mockGetArgValue.mockImplementation((_flag: string, defaultValue: string) => defaultValue);
    
    // Spy on console methods
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    process.argv = originalArgv;
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  describe("File existence check", () => {
    it("should return early if moonconfig.json already exists", () => {
      mockFs.existsSync.mockReturnValue(true);

      generateConfigFile();

      expect(mockFs.existsSync).toHaveBeenCalledWith("moonconfig.json");
      expect(mockFs.writeFileSync).not.toHaveBeenCalled();
      expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it("should proceed if moonconfig.json does not exist", () => {
      mockFs.existsSync.mockReturnValue(false);

      generateConfigFile();

      expect(mockFs.existsSync).toHaveBeenCalledWith("moonconfig.json");
      expect(mockFs.writeFileSync).toHaveBeenCalled();
      expect(consoleLogSpy).toHaveBeenCalledWith("Generating moonconfig.json file...");
    });
  });

  describe("Default configuration", () => {
    it("should create config with default values", () => {
      process.argv = ["node", "script.js"];
      
      generateConfigFile();

      const expectedConfig = {
        projectName: "moon",
        coreFileId: "BZiHkvF7pXFHrFH8P0cG2T",
        componentsFileId: "S3q1SkVngbwHuwpxHKCsgtJj",
        outputFolder: "dist",
        customPrefix: false,
        themes: {},
      };

      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        "moonconfig.json",
        JSON.stringify(expectedConfig, null, 2) + "\n"
      );
    });

    it("should set customPrefix to true when --custom-prefix flag is present", () => {
      process.argv = ["node", "script.js", "--custom-prefix"];
      
      generateConfigFile();

      const writtenContent = mockFs.writeFileSync.mock.calls[0][1] as string;
      const config = JSON.parse(writtenContent);
      
      expect(config.customPrefix).toBe(true);
    });

    it("should set customPrefix to false when --custom-prefix flag is not present", () => {
      process.argv = ["node", "script.js"];
      
      generateConfigFile();

      const writtenContent = mockFs.writeFileSync.mock.calls[0][1] as string;
      const config = JSON.parse(writtenContent);
      
      expect(config.customPrefix).toBe(false);
    });
  });

  describe("Command line argument parsing", () => {
    it("should use custom projectName when provided", () => {
      mockGetArgValue.mockImplementation((flag: string, defaultValue: string) => {
        if (flag === "--projectName") return "custom-project";
        return defaultValue;
      });

      generateConfigFile();

      expect(mockGetArgValue).toHaveBeenCalledWith("--projectName", "moon");
      
      const writtenContent = mockFs.writeFileSync.mock.calls[0][1] as string;
      const config = JSON.parse(writtenContent);
      expect(config.projectName).toBe("custom-project");
    });

    it("should use custom outputFolder when provided", () => {
      mockGetArgValue.mockImplementation((flag: string, defaultValue: string) => {
        if (flag === "--outputFolder") return "build";
        return defaultValue;
      });

      generateConfigFile();

      expect(mockGetArgValue).toHaveBeenCalledWith("--outputFolder", "dist");
      
      const writtenContent = mockFs.writeFileSync.mock.calls[0][1] as string;
      const config = JSON.parse(writtenContent);
      expect(config.outputFolder).toBe("build");
    });

    it("should use custom coreFileId when provided", () => {
      mockGetArgValue.mockImplementation((flag: string, defaultValue: string) => {
        if (flag === "--coreFileId") return "custom-core-id";
        return defaultValue;
      });

      generateConfigFile();

      expect(mockGetArgValue).toHaveBeenCalledWith("--coreFileId", "BZiHkvF7pXFHrFH8P0cG2T");
      
      const writtenContent = mockFs.writeFileSync.mock.calls[0][1] as string;
      const config = JSON.parse(writtenContent);
      expect(config.coreFileId).toBe("custom-core-id");
    });

    it("should use custom componentsFileId when provided", () => {
      mockGetArgValue.mockImplementation((flag: string, defaultValue: string) => {
        if (flag === "--componentsFileId") return "custom-components-id";
        return defaultValue;
      });

      generateConfigFile();

      expect(mockGetArgValue).toHaveBeenCalledWith("--componentsFileId", "S3q1SkVngbwHuwpxHKCsgtJj");
      
      const writtenContent = mockFs.writeFileSync.mock.calls[0][1] as string;
      const config = JSON.parse(writtenContent);
      expect(config.componentsFileId).toBe("custom-components-id");
    });

    it("should handle multiple custom arguments", () => {
      process.argv = ["node", "script.js", "--custom-prefix"];
      
      mockGetArgValue.mockImplementation((flag: string, defaultValue: string) => {
        switch (flag) {
          case "--projectName": return "my-project";
          case "--outputFolder": return "public";
          case "--coreFileId": return "core123";
          case "--componentsFileId": return "comp456";
          default: return defaultValue;
        }
      });

      generateConfigFile();

      const writtenContent = mockFs.writeFileSync.mock.calls[0][1] as string;
      const config = JSON.parse(writtenContent);
      
      expect(config).toEqual({
        projectName: "my-project",
        coreFileId: "core123",
        componentsFileId: "comp456",
        outputFolder: "public",
        customPrefix: true,
        themes: {},
      });
    });
  });

  describe("File creation", () => {
    it("should write properly formatted JSON to moonconfig.json", () => {
      generateConfigFile();

      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        "moonconfig.json",
        expect.stringMatching(/^\{\s*\n\s*"projectName"/)
      );
      
      const writtenContent = mockFs.writeFileSync.mock.calls[0][1] as string;
      
      // Verify it's valid JSON
      expect(() => JSON.parse(writtenContent)).not.toThrow();
      
      // Verify it ends with newline
      expect(writtenContent.endsWith("\n")).toBe(true);
      
      // Verify it's properly formatted (indented)
      expect(writtenContent).toContain("  \"projectName\"");
    });

    it("should include all required config properties", () => {
      generateConfigFile();

      const writtenContent = mockFs.writeFileSync.mock.calls[0][1] as string;
      const config = JSON.parse(writtenContent);
      
      expect(config).toHaveProperty("projectName");
      expect(config).toHaveProperty("coreFileId");
      expect(config).toHaveProperty("componentsFileId");
      expect(config).toHaveProperty("outputFolder");
      expect(config).toHaveProperty("customPrefix");
      expect(config).toHaveProperty("themes");
      
      expect(config.themes).toEqual({});
    });

    it("should log generation message", () => {
      generateConfigFile();

      expect(consoleLogSpy).toHaveBeenCalledWith("Generating moonconfig.json file...");
    });
  });

  describe("Error handling", () => {
    it("should handle fs.existsSync errors", () => {
      mockFs.existsSync.mockImplementation(() => {
        throw new Error("File system error");
      });

      generateConfigFile();

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "❌ Error in generateConfigFile script:",
        expect.any(Error)
      );
    });

    it("should handle fs.writeFileSync errors", () => {
      mockFs.writeFileSync.mockImplementation(() => {
        throw new Error("Write error");
      });

      generateConfigFile();

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "❌ Error in generateConfigFile script:",
        expect.any(Error)
      );
    });

    it("should handle getArgValue errors", () => {
      mockGetArgValue.mockImplementation(() => {
        throw new Error("Argument parsing error");
      });

      generateConfigFile();

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "❌ Error in generateConfigFile script:",
        expect.any(Error)
      );
    });

    it("should return undefined when error occurs", () => {
      mockFs.writeFileSync.mockImplementation(() => {
        throw new Error("Write error");
      });

      const result = generateConfigFile();

      expect(result).toBeUndefined();
    });

    it("should not throw errors but handle them gracefully", () => {
      mockFs.writeFileSync.mockImplementation(() => {
        throw new Error("Write error");
      });

      expect(() => generateConfigFile()).not.toThrow();
    });
  });

  describe("Integration tests", () => {
    it("should call all dependencies with correct parameters", () => {
      generateConfigFile();

      expect(mockFs.existsSync).toHaveBeenCalledWith("moonconfig.json");
      expect(mockGetArgValue).toHaveBeenCalledWith("--projectName", "moon");
      expect(mockGetArgValue).toHaveBeenCalledWith("--outputFolder", "dist");
      expect(mockGetArgValue).toHaveBeenCalledWith("--coreFileId", "BZiHkvF7pXFHrFH8P0cG2T");
      expect(mockGetArgValue).toHaveBeenCalledWith("--componentsFileId", "S3q1SkVngbwHuwpxHKCsgtJj");
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        "moonconfig.json",
        expect.any(String)
      );
    });

    it("should not call writeFileSync if file exists", () => {
      mockFs.existsSync.mockReturnValue(true);

      generateConfigFile();

      expect(mockGetArgValue).not.toHaveBeenCalled();
      expect(mockFs.writeFileSync).not.toHaveBeenCalled();
    });
  });

  describe("Edge cases", () => {
    it("should handle empty process.argv", () => {
      process.argv = [];

      generateConfigFile();

      const writtenContent = mockFs.writeFileSync.mock.calls[0][1] as string;
      const config = JSON.parse(writtenContent);
      expect(config.customPrefix).toBe(false);
    });

    it("should handle process.argv with only --custom-prefix", () => {
      process.argv = ["--custom-prefix"];

      generateConfigFile();

      const writtenContent = mockFs.writeFileSync.mock.calls[0][1] as string;
      const config = JSON.parse(writtenContent);
      expect(config.customPrefix).toBe(true);
    });

    it("should handle undefined return from getArgValue", () => {
      mockGetArgValue.mockReturnValue(undefined as any);

      generateConfigFile();

      const writtenContent = mockFs.writeFileSync.mock.calls[0][1] as string;
      const config = JSON.parse(writtenContent);
      
      expect(config.projectName).toBeUndefined();
      expect(config.outputFolder).toBeUndefined();
      expect(config.coreFileId).toBeUndefined();
      expect(config.componentsFileId).toBeUndefined();
    });

    it("should handle empty string returns from getArgValue", () => {
      mockGetArgValue.mockReturnValue("");

      generateConfigFile();

      const writtenContent = mockFs.writeFileSync.mock.calls[0][1] as string;
      const config = JSON.parse(writtenContent);
      
      expect(config.projectName).toBe("");
      expect(config.outputFolder).toBe("");
      expect(config.coreFileId).toBe("");
      expect(config.componentsFileId).toBe("");
    });
  });
});
