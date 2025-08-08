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

  // Test all specialized error classes with a data-driven approach
  const errorClassTests = [
    {
      ErrorClass: ConfigurationError,
      name: "ConfigurationError",
      expectedMessage: "Configuration Error: Invalid config",
      expectedCode: "CONFIG_ERROR",
    },
    {
      ErrorClass: FigmaAPIError,
      name: "FigmaAPIError", 
      expectedMessage: "Figma API Error: API request failed",
      expectedCode: "FIGMA_API_ERROR",
    },
    {
      ErrorClass: FileSystemError,
      name: "FileSystemError",
      expectedMessage: "File System Error: Cannot write file", 
      expectedCode: "FS_ERROR",
    },
    {
      ErrorClass: ValidationError,
      name: "ValidationError",
      expectedMessage: "Validation Error: Invalid input",
      expectedCode: "VALIDATION_ERROR",
    },
  ];

  errorClassTests.forEach(({ ErrorClass, name, expectedMessage, expectedCode }) => {
    describe(name, () => {
      it("should create error with correct properties", () => {
        const inputMessage = name === "ConfigurationError" ? "Invalid config" :
                           name === "FigmaAPIError" ? "API request failed" :
                           name === "FileSystemError" ? "Cannot write file" : 
                           "Invalid input";
        
        const error = new ErrorClass(inputMessage);
        expect(error.message).toBe(expectedMessage);
        expect(error.name).toBe(name);
        expect(error.code).toBe(expectedCode);
      });

      it("should accept cause parameter", () => {
        const cause = new Error("Root cause");
        const error = new ErrorClass("Test message", cause);
        expect(error.cause).toBe(cause);
      });
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

  it("should wrap null/undefined values", () => {
    expect(wrapError(null, "Test context").message).toBe("Test context: null");
    expect(wrapError(undefined, "Test context").message).toBe("Test context: undefined");
  });
});

describe("Assertion Functions", () => {
  describe("assertDefined", () => {
    it("should pass for defined values", () => {
      expect(() => assertDefined("test", "Should be defined")).not.toThrow();
      expect(() => assertDefined(0, "Should be defined")).not.toThrow();
      expect(() => assertDefined(false, "Should be defined")).not.toThrow();
    });

    it("should throw ValidationError for null/undefined", () => {
      expect(() => assertDefined(null, "Value is null")).toThrow(ValidationError);
      expect(() => assertDefined(undefined, "Value is undefined")).toThrow(ValidationError);
      expect(() => assertDefined(null, "Custom message")).toThrow("Validation Error: Custom message");
    });
  });

  describe("assertNotEmpty", () => {
    it("should pass for non-empty strings", () => {
      expect(() => assertNotEmpty("test", "Should not be empty")).not.toThrow();
      expect(() => assertNotEmpty("  content  ", "Should not be empty")).not.toThrow();
    });

    it("should throw ValidationError for empty/invalid values", () => {
      const invalidValues = ["", "   ", null, undefined];
      invalidValues.forEach(value => {
        expect(() => assertNotEmpty(value, "Invalid value")).toThrow(ValidationError);
      });
      expect(() => assertNotEmpty("", "Custom message")).toThrow("Validation Error: Custom message");
    });
  });
});
