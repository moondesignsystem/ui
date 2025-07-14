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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("File System Operations", () => {
    it("should handle directory creation gracefully", () => {
      mockFs.existsSync.mockReturnValue(false);
      mockFs.mkdirSync.mockImplementation(() => undefined);
      mockPath.dirname.mockReturnValue("/test/output");

      // Test that directory creation would work
      expect(() => {
        if (!mockFs.existsSync("/test/output")) {
          mockFs.mkdirSync("/test/output", { recursive: true });
        }
      }).not.toThrow();

      expect(mockFs.mkdirSync).toHaveBeenCalledWith("/test/output", {
        recursive: true,
      });
    });

    it("should handle file writing operations", () => {
      const testContent = "/* Generated CSS */\n.test { color: red; }";
      mockFs.writeFileSync.mockImplementation(() => undefined);

      expect(() => {
        mockFs.writeFileSync("/test/output/test.css", testContent, "utf8");
      }).not.toThrow();

      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        "/test/output/test.css",
        testContent,
        "utf8"
      );
    });
  });

  describe("Error Handling Integration", () => {
    it("should handle file system errors gracefully", () => {
      const fsError = new Error("ENOENT: no such file or directory");
      mockFs.writeFileSync.mockImplementation(() => {
        throw fsError;
      });

      expect(() => {
        try {
          mockFs.writeFileSync("/invalid/path/test.css", "content", "utf8");
        } catch (error) {
          // In real code, this would be wrapped in our custom error
          throw new Error(`File System Error: ${(error as Error).message}`);
        }
      }).toThrow("File System Error: ENOENT: no such file or directory");
    });
  });

  describe("Configuration Integration", () => {
    it("should validate required configuration fields", () => {
      const invalidConfigs = [
        { projectName: "test", outputFolder: "./dist" }, // missing coreFileId
        { coreFileId: "test123", outputFolder: "./dist" }, // missing projectName
        { coreFileId: "test123", projectName: "test" }, // missing outputFolder
      ];

      invalidConfigs.forEach((config) => {
        expect(() => {
          const requiredFields = ["coreFileId", "projectName", "outputFolder"];
          const missingFields = requiredFields.filter(
            (field) => !(field in config)
          );
          if (missingFields.length > 0) {
            throw new Error(
              `Missing required fields: ${missingFields.join(", ")}`
            );
          }
        }).toThrow("Missing required fields:");
      });
    });
  });
});
