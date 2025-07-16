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

  // Helper functions
  const setupMockForArgument = (flag: string, value: string) => {
    mockGetArgValue.mockImplementation((argFlag: string, defaultValue: string | boolean) => {
      return argFlag === flag ? value : defaultValue;
    });
  };

  const getWrittenConfig = () => {
    const writtenContent = mockFs.writeFileSync.mock.calls[0][1] as string;
    return JSON.parse(writtenContent);
  };

  const expectDefaultConfig = () => ({
    projectName: "moon",
    coreFileId: "BZiHkvF7pXFHrFH8P0cG2T",
    componentsFileId: "S3q1SkVngbwHuwpxHKCsgtJj",
    outputFolder: "dist",
    customPrefix: false,
    target: "tailwindcss",
    preflight: false,
    themes: {},
  });

  beforeEach(() => {
    originalArgv = process.argv;
    
    // Reset mocks
    mockFs.existsSync.mockReset();
    mockFs.writeFileSync.mockReset();
    mockGetArgValue.mockReset();
    
    // Set up default mock implementations
    mockFs.existsSync.mockReturnValue(false);
    mockGetArgValue.mockImplementation((_flag: string, defaultValue: string | boolean) => defaultValue);
    
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
    const existenceTestCases = [
      {
        description: "should return early if moonconfig.json already exists with all properties",
        fileExists: true,
        existingConfig: {
          projectName: "moon",
          coreFileId: "BZiHkvF7pXFHrFH8P0cG2T",
          componentsFileId: "S3q1SkVngbwHuwpxHKCsgtJj",
          outputFolder: "dist",
          customPrefix: false,
          target: "tailwindcss",
          preflight: false,
          themes: {},
        },
        shouldCallWriteFile: false,
        shouldLogMessage: false,
      },
      {
        description: "should proceed if moonconfig.json does not exist",
        fileExists: false,
        existingConfig: null,
        shouldCallWriteFile: true,
        shouldLogMessage: true,
      },
    ];

    existenceTestCases.forEach(({ description, fileExists, existingConfig, shouldCallWriteFile, shouldLogMessage }) => {
      it(description, () => {
        mockFs.existsSync.mockReturnValue(fileExists);
        
        if (fileExists && existingConfig) {
          mockFs.readFileSync.mockReturnValue(JSON.stringify(existingConfig));
        }

        generateConfigFile();

        expect(mockFs.existsSync).toHaveBeenCalledWith("moonconfig.json");
        
        if (shouldCallWriteFile) {
          expect(mockFs.writeFileSync).toHaveBeenCalled();
        } else {
          expect(mockFs.writeFileSync).not.toHaveBeenCalled();
        }
        
        if (shouldLogMessage) {
          expect(consoleLogSpy).toHaveBeenCalledWith("Generating moonconfig.json file...");
        } else {
          expect(consoleLogSpy).not.toHaveBeenCalled();
        }
      });
    });

    it("should handle existing file with invalid JSON and recreate it", () => {
      const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
      
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue("{ invalid json content }");

      generateConfigFile();

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        "Warning: Could not parse existing config file, will recreate it"
      );
      expect(mockFs.writeFileSync).toHaveBeenCalled();
      
      consoleWarnSpy.mockRestore();
    });

    it("should update existing file when missing properties", () => {
      const partialConfig = {
        projectName: "existing-project",
        coreFileId: "existing-core-id",
        // Missing other required properties
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(partialConfig));

      generateConfigFile();

      expect(consoleLogSpy).toHaveBeenCalledWith("Updating moonconfig.json file...");
      expect(mockFs.writeFileSync).toHaveBeenCalled();
      
      const config = getWrittenConfig();
      expect(config.projectName).toBe("existing-project");
      expect(config.coreFileId).toBe("existing-core-id");
      // Should have all default properties filled in
      expect(config.componentsFileId).toBe("S3q1SkVngbwHuwpxHKCsgtJj");
      expect(config.outputFolder).toBe("dist");
    });

    it("should not log any message when file exists with all properties", () => {
      const completeConfig = {
        projectName: "moon",
        coreFileId: "BZiHkvF7pXFHrFH8P0cG2T",
        componentsFileId: "S3q1SkVngbwHuwpxHKCsgtJj",
        outputFolder: "dist",
        customPrefix: false,
        target: "tailwindcss",
        preflight: false,
        themes: {},
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(completeConfig));

      generateConfigFile();

      // Should not log "Generating..." or "Updating..." messages
      expect(consoleLogSpy).not.toHaveBeenCalledWith("Generating moonconfig.json file...");
      expect(consoleLogSpy).not.toHaveBeenCalledWith("Updating moonconfig.json file...");
      expect(mockFs.writeFileSync).not.toHaveBeenCalled();
    });
  });

  describe("Default configuration", () => {
    it("should create config with default values", () => {
      process.argv = ["node", "script.js"];
      
      generateConfigFile();

      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        "moonconfig.json",
        JSON.stringify(expectDefaultConfig(), null, 2) + "\n"
      );
    });

    const customPrefixTestCases = [
      {
        description: "should set customPrefix to true when --custom-prefix flag is present",
        argv: ["node", "script.js", "--custom-prefix"],
        expectedCustomPrefix: true,
      },
      {
        description: "should set customPrefix to false when --custom-prefix flag is not present",
        argv: ["node", "script.js"],
        expectedCustomPrefix: false,
      },
    ];

    customPrefixTestCases.forEach(({ description, argv, expectedCustomPrefix }) => {
      it(description, () => {
        process.argv = argv;
        
        // Mock getArgValue to return true if --custom-prefix is in argv
        mockGetArgValue.mockImplementation((flag: string, defaultValue: string | boolean) => {
          if (flag === "--custom-prefix") {
            return argv.includes("--custom-prefix");
          }
          return defaultValue;
        });
        
        generateConfigFile();

        const config = getWrittenConfig();
        expect(config.customPrefix).toBe(expectedCustomPrefix);
      });
    });
  });

  describe("Command line argument parsing", () => {
    const argumentTestCases = [
      {
        description: "should use custom projectName when provided",
        flag: "--projectName",
        value: "custom-project",
        defaultValue: "moon",
        configProperty: "projectName",
      },
      {
        description: "should use custom outputFolder when provided",
        flag: "--outputFolder",
        value: "build",
        defaultValue: "dist",
        configProperty: "outputFolder",
      },
      {
        description: "should use custom coreFileId when provided",
        flag: "--coreFileId",
        value: "custom-core-id",
        defaultValue: "BZiHkvF7pXFHrFH8P0cG2T",
        configProperty: "coreFileId",
      },
      {
        description: "should use custom componentsFileId when provided",
        flag: "--componentsFileId",
        value: "custom-components-id",
        defaultValue: "S3q1SkVngbwHuwpxHKCsgtJj",
        configProperty: "componentsFileId",
      },
    ];

    argumentTestCases.forEach(({ description, flag, value, defaultValue, configProperty }) => {
      it(description, () => {
        setupMockForArgument(flag, value);

        generateConfigFile();

        expect(mockGetArgValue).toHaveBeenCalledWith(flag, defaultValue);
        
        const config = getWrittenConfig();
        expect(config[configProperty]).toBe(value);
      });
    });

    it("should handle multiple custom arguments", () => {
      process.argv = ["node", "script.js", "--custom-prefix"];
      
      mockGetArgValue.mockImplementation((flag: string, defaultValue: string | boolean) => {
        const argValues: Record<string, string | boolean> = {
          "--projectName": "my-project",
          "--outputFolder": "public",
          "--coreFileId": "core123",
          "--componentsFileId": "comp456",
          "--custom-prefix": true, // Set to true since it's in process.argv
        };
        return argValues[flag] !== undefined ? argValues[flag] : defaultValue;
      });

      generateConfigFile();

      const config = getWrittenConfig();
      
      expect(config).toEqual({
        projectName: "my-project",
        coreFileId: "core123",
        componentsFileId: "comp456",
        outputFolder: "public",
        customPrefix: true,
        target: "tailwindcss",
        preflight: false,
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

      const config = getWrittenConfig();
      const requiredProperties = [
        "projectName", "coreFileId", "componentsFileId", 
        "outputFolder", "customPrefix", "themes"
      ];
      
      requiredProperties.forEach(property => {
        expect(config).toHaveProperty(property);
      });
      
      expect(config.themes).toEqual({});
    });

    it("should log generation message", () => {
      generateConfigFile();

      expect(consoleLogSpy).toHaveBeenCalledWith("Generating moonconfig.json file...");
    });
  });

  describe("Error handling", () => {
    const errorTestCases = [
      {
        description: "should handle fs.existsSync errors",
        setupError: () => mockFs.existsSync.mockImplementation(() => {
          throw new Error("File system error");
        }),
      },
      {
        description: "should handle fs.writeFileSync errors",
        setupError: () => mockFs.writeFileSync.mockImplementation(() => {
          throw new Error("Write error");
        }),
      },
      {
        description: "should handle getArgValue errors",
        setupError: () => mockGetArgValue.mockImplementation(() => {
          throw new Error("Argument parsing error");
        }),
      },
    ];

    errorTestCases.forEach(({ description, setupError }) => {
      it(description, () => {
        setupError();

        generateConfigFile();

        expect(consoleErrorSpy).toHaveBeenCalledWith(
          "❌ Error in generateConfigFile script:",
          expect.any(Error)
        );
      });
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

      const expectedCalls = [
        ["--custom-prefix", false],
        ["--projectName", "moon"],
        ["--outputFolder", "dist"],
        ["--coreFileId", "BZiHkvF7pXFHrFH8P0cG2T"],
        ["--componentsFileId", "S3q1SkVngbwHuwpxHKCsgtJj"],
        ["--target", "tailwindcss"],
        ["--preflight", false],
      ];

      expect(mockFs.existsSync).toHaveBeenCalledWith("moonconfig.json");
      
      expectedCalls.forEach(([flag, defaultValue]) => {
        expect(mockGetArgValue).toHaveBeenCalledWith(flag as string, defaultValue);
      });
      
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        "moonconfig.json",
        expect.any(String)
      );
    });

    it("should not call writeFileSync if file exists with all required properties", () => {
      const completeConfig = {
        projectName: "moon",
        coreFileId: "BZiHkvF7pXFHrFH8P0cG2T",
        componentsFileId: "S3q1SkVngbwHuwpxHKCsgtJj",
        outputFolder: "dist",
        customPrefix: false,
        target: "tailwindcss",
        preflight: false,
        themes: {},
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(completeConfig));

      generateConfigFile();

      expect(mockFs.writeFileSync).not.toHaveBeenCalled();
    });
  });

  describe("Edge cases", () => {
    const edgeCaseTestCases = [
      {
        description: "should handle empty process.argv",
        argv: [],
        expectedCustomPrefix: false,
      },
      {
        description: "should handle process.argv with only --custom-prefix",
        argv: ["--custom-prefix"],
        expectedCustomPrefix: true,
      },
    ];

    edgeCaseTestCases.forEach(({ description, argv, expectedCustomPrefix }) => {
      it(description, () => {
        process.argv = argv;

        // Mock getArgValue to return true if --custom-prefix is in argv
        mockGetArgValue.mockImplementation((flag: string, defaultValue: string | boolean) => {
          if (flag === "--custom-prefix") {
            return argv.includes("--custom-prefix");
          }
          return defaultValue;
        });

        generateConfigFile();

        const config = getWrittenConfig();
        expect(config.customPrefix).toBe(expectedCustomPrefix);
      });
    });

    const invalidValueTestCases = [
      {
        description: "should handle undefined return from getArgValue",
        mockReturnValue: undefined as any,
        expectedValues: {
          projectName: undefined,
          outputFolder: undefined,
          coreFileId: undefined,
          componentsFileId: undefined,
        },
      },
      {
        description: "should handle empty string returns from getArgValue",
        mockReturnValue: "",
        expectedValues: {
          projectName: "",
          outputFolder: "",
          coreFileId: "",
          componentsFileId: "",
        },
      },
    ];

    invalidValueTestCases.forEach(({ description, mockReturnValue, expectedValues }) => {
      it(description, () => {
        mockGetArgValue.mockReturnValue(mockReturnValue);

        generateConfigFile();

        const config = getWrittenConfig();
        
        Object.entries(expectedValues).forEach(([property, expectedValue]) => {
          expect(config[property]).toBe(expectedValue);
        });
      });
    });
  });
});
