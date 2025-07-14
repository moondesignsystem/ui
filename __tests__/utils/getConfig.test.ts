import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  jest,
} from "@jest/globals";
import fs from "fs";
import path from "path";
import getConfig from "../../src/scripts/utils/getConfig";

// Mock fs module
jest.mock("fs");
const mockFs = fs as jest.Mocked<typeof fs>;

// Mock path module
jest.mock("path");
const mockPath = path as jest.Mocked<typeof path>;

describe("getConfig", () => {
  const originalCwd = process.cwd;

  beforeEach(() => {
    jest.clearAllMocks();
    (process.cwd as jest.Mock) = jest.fn().mockReturnValue("/test/directory");
    mockPath.resolve.mockReturnValue("/test/directory/moonconfig.json");
  });

  afterEach(() => {
    process.cwd = originalCwd;
  });

  it("should load valid config successfully", () => {
    const validConfig = {
      coreFileId: "core123",
      componentsFileId: "comp456",
      projectName: "test-project",
      outputFolder: "./dist",
      themes: { light: "light123", dark: "dark456" },
      customPrefix: "moon",
    };

    mockFs.existsSync.mockReturnValue(true);
    mockFs.readFileSync.mockReturnValue(JSON.stringify(validConfig));

    const result = getConfig();

    expect(result).toEqual(validConfig);
    expect(mockPath.resolve).toHaveBeenCalledWith(
      "/test/directory",
      "moonconfig.json"
    );
    expect(mockFs.existsSync).toHaveBeenCalledWith(
      "/test/directory/moonconfig.json"
    );
    expect(mockFs.readFileSync).toHaveBeenCalledWith(
      "/test/directory/moonconfig.json",
      "utf8"
    );
  });

  it("should throw error when config file does not exist", () => {
    mockFs.existsSync.mockReturnValue(false);

    expect(() => getConfig()).toThrow(
      "❌ moonconfig.json not found in current directory"
    );
  });

  it("should throw error for invalid JSON", () => {
    mockFs.existsSync.mockReturnValue(true);
    mockFs.readFileSync.mockReturnValue("{ invalid json }");

    expect(() => getConfig()).toThrow(/❌ Invalid JSON in moonconfig.json:/);
  });

  it("should throw error when missing coreFileId", () => {
    const invalidConfig = {
      componentsFileId: "comp456",
      projectName: "test-project",
      outputFolder: "./dist",
    };

    mockFs.existsSync.mockReturnValue(true);
    mockFs.readFileSync.mockReturnValue(JSON.stringify(invalidConfig));

    expect(() => getConfig()).toThrow(
      "❌ Missing required field 'coreFileId' in moonconfig.json"
    );
  });

  it("should throw error when missing projectName", () => {
    const invalidConfig = {
      coreFileId: "core123",
      componentsFileId: "comp456",
      outputFolder: "./dist",
    };

    mockFs.existsSync.mockReturnValue(true);
    mockFs.readFileSync.mockReturnValue(JSON.stringify(invalidConfig));

    expect(() => getConfig()).toThrow(
      "❌ Missing required field 'projectName' in moonconfig.json"
    );
  });

  it("should throw error when missing outputFolder", () => {
    const invalidConfig = {
      coreFileId: "core123",
      componentsFileId: "comp456",
      projectName: "test-project",
    };

    mockFs.existsSync.mockReturnValue(true);
    mockFs.readFileSync.mockReturnValue(JSON.stringify(invalidConfig));

    expect(() => getConfig()).toThrow(
      "❌ Missing required field 'outputFolder' in moonconfig.json"
    );
  });

  it("should handle minimal valid config", () => {
    const minimalConfig = {
      coreFileId: "core123",
      projectName: "test-project",
      outputFolder: "./dist",
    };

    mockFs.existsSync.mockReturnValue(true);
    mockFs.readFileSync.mockReturnValue(JSON.stringify(minimalConfig));

    const result = getConfig();
    expect(result).toEqual(minimalConfig);
  });

  it("should handle file read errors", () => {
    const readError = new Error("Permission denied");
    mockFs.existsSync.mockReturnValue(true);
    mockFs.readFileSync.mockImplementation(() => {
      throw readError;
    });

    expect(() => getConfig()).toThrow("Permission denied");
  });
});
