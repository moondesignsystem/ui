export class MoonUIError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly cause?: Error
  ) {
    super(message);
    this.name = "MoonUIError";
  }
}

export class ConfigurationError extends MoonUIError {
  constructor(message: string, cause?: Error) {
    super(`Configuration Error: ${message}`, "CONFIG_ERROR", cause);
    this.name = "ConfigurationError";
  }
}

export class FigmaAPIError extends MoonUIError {
  constructor(message: string, cause?: Error) {
    super(`Figma API Error: ${message}`, "FIGMA_API_ERROR", cause);
    this.name = "FigmaAPIError";
  }
}

export class FileSystemError extends MoonUIError {
  constructor(message: string, cause?: Error) {
    super(`File System Error: ${message}`, "FS_ERROR", cause);
    this.name = "FileSystemError";
  }
}

export class ValidationError extends MoonUIError {
  constructor(message: string, cause?: Error) {
    super(`Validation Error: ${message}`, "VALIDATION_ERROR", cause);
    this.name = "ValidationError";
  }
}

export function wrapError(error: unknown, context: string): MoonUIError {
  if (error instanceof MoonUIError) {
    return error;
  }

  if (error instanceof Error) {
    return new MoonUIError(`${context}: ${error.message}`, undefined, error);
  }

  return new MoonUIError(`${context}: ${String(error)}`);
}

export function assertDefined<T>(
  value: T | null | undefined,
  message: string
): asserts value is T {
  if (value === null || value === undefined) {
    throw new ValidationError(message);
  }
}

export function assertNotEmpty(
  value: string | null | undefined,
  message: string
): asserts value is string {
  if (!value || value.trim().length === 0) {
    throw new ValidationError(message);
  }
}
