export declare class MoonUIError extends Error {
    readonly code?: string | undefined;
    readonly cause?: Error | undefined;
    constructor(message: string, code?: string | undefined, cause?: Error | undefined);
}
export declare class ConfigurationError extends MoonUIError {
    constructor(message: string, cause?: Error);
}
export declare class FigmaAPIError extends MoonUIError {
    constructor(message: string, cause?: Error);
}
export declare class FileSystemError extends MoonUIError {
    constructor(message: string, cause?: Error);
}
export declare class ValidationError extends MoonUIError {
    constructor(message: string, cause?: Error);
}
export declare function wrapError(error: unknown, context: string): MoonUIError;
export declare function assertDefined<T>(value: T | null | undefined, message: string): asserts value is T;
export declare function assertNotEmpty(value: string | null | undefined, message: string): asserts value is string;
