import { describe, it, expect } from "@jest/globals";
import {
  MoonUIError,
  ConfigurationError,
  FigmaAPIError,
  FileSystemError,
  ValidationError,
  wrapError,
  assertDefined,
  assertNotEmpty,
} from "../../src/scripts/utils/errors";

describe("Error Classes", () => {
  describe("MoonUIError", () => {
    it("should create basic error", () => {
      const error = new MoonUIError("Test message");
      expect(error.message).toBe("Test message");
      expect(error.name).toBe("MoonUIError");
      expect(error.code).toBeUndefined();
      expect(error.cause).toBeUndefined();
    });

    it("should create error with code and cause", () => {
      const cause = new Error("Original error");
      const error = new MoonUIError("Test message", "TEST_CODE", cause);
      expect(error.message).toBe("Test message");
      expect(error.code).toBe("TEST_CODE");
      expect(error.cause).toBe(cause);
    });
  });

  describe("ConfigurationError", () => {
    it("should create configuration error", () => {
      const error = new ConfigurationError("Invalid config");
      expect(error.message).toBe("Configuration Error: Invalid config");
      expect(error.name).toBe("ConfigurationError");
      expect(error.code).toBe("CONFIG_ERROR");
    });

    it("should create configuration error with cause", () => {
      const cause = new Error("File not found");
      const error = new ConfigurationError("Missing file", cause);
      expect(error.cause).toBe(cause);
    });
  });

  describe("FigmaAPIError", () => {
    it("should create Figma API error", () => {
      const error = new FigmaAPIError("API request failed");
      expect(error.message).toBe("Figma API Error: API request failed");
      expect(error.name).toBe("FigmaAPIError");
      expect(error.code).toBe("FIGMA_API_ERROR");
    });
  });

  describe("FileSystemError", () => {
    it("should create file system error", () => {
      const error = new FileSystemError("Cannot write file");
      expect(error.message).toBe("File System Error: Cannot write file");
      expect(error.name).toBe("FileSystemError");
      expect(error.code).toBe("FS_ERROR");
    });
  });

  describe("ValidationError", () => {
    it("should create validation error", () => {
      const error = new ValidationError("Invalid input");
      expect(error.message).toBe("Validation Error: Invalid input");
      expect(error.name).toBe("ValidationError");
      expect(error.code).toBe("VALIDATION_ERROR");
    });
  });
});

describe("wrapError", () => {
  it("should return MoonUIError as-is", () => {
    const original = new MoonUIError("Original error");
    const wrapped = wrapError(original, "Context");
    expect(wrapped).toBe(original);
  });

  it("should wrap regular Error", () => {
    const original = new Error("Original message");
    const wrapped = wrapError(original, "Test context");
    expect(wrapped).toBeInstanceOf(MoonUIError);
    expect(wrapped.message).toBe("Test context: Original message");
    expect(wrapped.cause).toBe(original);
  });

  it("should wrap non-Error values", () => {
    const wrapped = wrapError("String error", "Test context");
    expect(wrapped).toBeInstanceOf(MoonUIError);
    expect(wrapped.message).toBe("Test context: String error");
  });

  it("should wrap null/undefined", () => {
    const wrapped = wrapError(null, "Test context");
    expect(wrapped.message).toBe("Test context: null");
  });
});

describe("assertDefined", () => {
  it("should pass for defined values", () => {
    expect(() => assertDefined("test", "Should be defined")).not.toThrow();
    expect(() => assertDefined(0, "Should be defined")).not.toThrow();
    expect(() => assertDefined(false, "Should be defined")).not.toThrow();
  });

  it("should throw for null", () => {
    expect(() => assertDefined(null, "Value is null")).toThrow(ValidationError);
    expect(() => assertDefined(null, "Value is null")).toThrow(
      "Validation Error: Value is null"
    );
  });

  it("should throw for undefined", () => {
    expect(() => assertDefined(undefined, "Value is undefined")).toThrow(
      ValidationError
    );
  });
});

describe("assertNotEmpty", () => {
  it("should pass for non-empty strings", () => {
    expect(() => assertNotEmpty("test", "Should not be empty")).not.toThrow();
    expect(() =>
      assertNotEmpty("  content  ", "Should not be empty")
    ).not.toThrow();
  });

  it("should throw for empty string", () => {
    expect(() => assertNotEmpty("", "String is empty")).toThrow(
      ValidationError
    );
    expect(() => assertNotEmpty("", "String is empty")).toThrow(
      "Validation Error: String is empty"
    );
  });

  it("should throw for whitespace-only string", () => {
    expect(() => assertNotEmpty("   ", "String is whitespace")).toThrow(
      ValidationError
    );
  });

  it("should throw for null", () => {
    expect(() => assertNotEmpty(null, "Value is null")).toThrow(
      ValidationError
    );
  });

  it("should throw for undefined", () => {
    expect(() => assertNotEmpty(undefined, "Value is undefined")).toThrow(
      ValidationError
    );
  });
});
