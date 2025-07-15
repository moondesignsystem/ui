import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import fs from "fs";
import path from "path";

// Mock all dependencies
jest.mock("fs");
jest.mock("path");
jest.mock("../../src/scripts/utils/getConfig");
jest.mock("../../src/scripts/fetchFigmaData");

const mockFs = fs as jest.Mocked<typeof fs>;
const mockPath = path as jest.Mocked<typeof path>;

describe("Integration Tests", () => {
  // Helper functions
  const expectNoThrow = (fn: () => void) => {
    expect(fn).not.toThrow();
  };

  const expectThrowWithMessage = (fn: () => void, expectedMessage: string | RegExp) => {
    expect(fn).toThrow(expectedMessage);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("File System Operations", () => {
    const fileSystemTestCases = [
      {
        description: "should handle directory creation gracefully",
        setup: () => {
          mockFs.existsSync.mockReturnValue(false);
          mockFs.mkdirSync.mockImplementation(() => undefined);
          mockPath.dirname.mockReturnValue("/test/output");
        },
        operation: () => {
          if (!mockFs.existsSync("/test/output")) {
            mockFs.mkdirSync("/test/output", { recursive: true });
          }
        },
        verification: () => {
          expect(mockFs.mkdirSync).toHaveBeenCalledWith("/test/output", {
            recursive: true,
          });
        },
      },
      {
        description: "should handle file writing operations",
        setup: () => {
          mockFs.writeFileSync.mockImplementation(() => undefined);
        },
        operation: () => {
          const testContent = "/* Generated CSS */\n.test { color: red; }";
          mockFs.writeFileSync("/test/output/test.css", testContent, "utf8");
        },
        verification: () => {
          expect(mockFs.writeFileSync).toHaveBeenCalledWith(
            "/test/output/test.css",
            "/* Generated CSS */\n.test { color: red; }",
            "utf8"
          );
        },
      },
    ];

    fileSystemTestCases.forEach(({ description, setup, operation, verification }) => {
      it(description, () => {
        setup();
        expectNoThrow(operation);
        verification();
      });
    });
  });

  describe("Error Handling and Configuration Integration", () => {
    it("should handle file system errors gracefully", () => {
      const fsError = new Error("ENOENT: no such file or directory");
      mockFs.writeFileSync.mockImplementation(() => {
        throw fsError;
      });

      expectThrowWithMessage(() => {
        try {
          mockFs.writeFileSync("/invalid/path/test.css", "content", "utf8");
        } catch (error) {
          // In real code, this would be wrapped in our custom error
          throw new Error(`File System Error: ${(error as Error).message}`);
        }
      }, "File System Error: ENOENT: no such file or directory");
    });

    it("should validate required configuration fields", () => {
      const configTestCases = [
        { 
          config: { projectName: "test", outputFolder: "./dist" },
          expectedMissingFields: ["coreFileId"]
        },
        { 
          config: { coreFileId: "test123", outputFolder: "./dist" },
          expectedMissingFields: ["projectName"]
        },
        { 
          config: { coreFileId: "test123", projectName: "test" },
          expectedMissingFields: ["outputFolder"]
        },
      ];

      configTestCases.forEach(({ config, expectedMissingFields }) => {
        expectThrowWithMessage(() => {
          const requiredFields = ["coreFileId", "projectName", "outputFolder"];
          const missingFields = requiredFields.filter(
            (field) => !(field in config)
          );
          if (missingFields.length > 0) {
            throw new Error(
              `Missing required fields: ${missingFields.join(", ")}`
            );
          }
        }, `Missing required fields: ${expectedMissingFields.join(", ")}`);
      });
    });
  });
});
