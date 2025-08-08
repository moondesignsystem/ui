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

  const setupValidConfigFile = (config: object) => {
    mockFs.existsSync.mockReturnValue(true);
    mockFs.readFileSync.mockReturnValue(JSON.stringify(config));
  };

  const setupMissingConfigFile = () => {
    mockFs.existsSync.mockReturnValue(false);
  };

  const setupInvalidJsonFile = (content: string) => {
    mockFs.existsSync.mockReturnValue(true);
    mockFs.readFileSync.mockReturnValue(content);
  };

  it("should load valid config successfully", () => {
    const validConfig = {
      coreFileId: "core123",
      componentsFileId: "comp456",
      projectName: "test-project",
      outputFolder: "./dist",
      themes: { light: "light123", dark: "dark456" },
      customPrefix: "moon",
      preflight: false,
    };

    setupValidConfigFile(validConfig);

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

  it("should handle minimal valid config", () => {
    const minimalConfig = {
      coreFileId: "core123",
      projectName: "test-project",
      outputFolder: "./dist",
      preflight: false,
    };

    setupValidConfigFile(minimalConfig);

    const result = getConfig();
    expect(result).toEqual(minimalConfig);
  });

  const requiredFieldTests = [
    {
      field: "coreFileId",
      config: {
        componentsFileId: "comp456",
        projectName: "test-project",
        outputFolder: "./dist",
      }
    },
    {
      field: "projectName",
      config: {
        coreFileId: "core123",
        componentsFileId: "comp456",
        outputFolder: "./dist",
      }
    },
    {
      field: "outputFolder",
      config: {
        coreFileId: "core123",
        componentsFileId: "comp456",
        projectName: "test-project",
      }
    }
  ];

  requiredFieldTests.forEach(({ field, config }) => {
    it(`should throw error when missing ${field}`, () => {
      setupValidConfigFile(config);

      expect(() => getConfig()).toThrow(
        `❌ Missing required field '${field}' in moonconfig.json`
      );
    });
  });

  it("should throw error when missing preflight field", () => {
    const configWithoutPreflight = {
      coreFileId: "core123",
      projectName: "test-project",
      outputFolder: "./dist",
      // missing preflight field
    };

    setupValidConfigFile(configWithoutPreflight);

    expect(() => getConfig()).toThrow(
      "❌ Missing required field 'preflight' in moonconfig.json"
    );
  });

  it("should throw error when config file does not exist", () => {
    setupMissingConfigFile();

    expect(() => getConfig()).toThrow(
      "❌ moonconfig.json not found in current directory"
    );
  });

  it("should throw error for invalid JSON", () => {
    setupInvalidJsonFile("{ invalid json }");

    expect(() => getConfig()).toThrow(/❌ Invalid JSON in moonconfig.json:/);
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
