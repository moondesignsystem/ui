export class MoonUIError extends Error {
    code;
    cause;
    constructor(message, code, cause) {
        super(message);
        this.code = code;
        this.cause = cause;
        this.name = "MoonUIError";
    }
}
export class ConfigurationError extends MoonUIError {
    constructor(message, cause) {
        super(`Configuration Error: ${message}`, "CONFIG_ERROR", cause);
        this.name = "ConfigurationError";
    }
}
export class FigmaAPIError extends MoonUIError {
    constructor(message, cause) {
        super(`Figma API Error: ${message}`, "FIGMA_API_ERROR", cause);
        this.name = "FigmaAPIError";
    }
}
export class FileSystemError extends MoonUIError {
    constructor(message, cause) {
        super(`File System Error: ${message}`, "FS_ERROR", cause);
        this.name = "FileSystemError";
    }
}
export class ValidationError extends MoonUIError {
    constructor(message, cause) {
        super(`Validation Error: ${message}`, "VALIDATION_ERROR", cause);
        this.name = "ValidationError";
    }
}
export function wrapError(error, context) {
    if (error instanceof MoonUIError) {
        return error;
    }
    if (error instanceof Error) {
        return new MoonUIError(`${context}: ${error.message}`, undefined, error);
    }
    return new MoonUIError(`${context}: ${String(error)}`);
}
export function assertDefined(value, message) {
    if (value === null || value === undefined) {
        throw new ValidationError(message);
    }
}
export function assertNotEmpty(value, message) {
    if (!value || value.trim().length === 0) {
        throw new ValidationError(message);
    }
}
