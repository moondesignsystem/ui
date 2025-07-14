// Jest setup file for Moon UI tests
import { jest } from "@jest/globals";

// Mock console methods in tests to avoid noise
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
};

// Mock process.exit for CLI tests
const mockExit = jest.fn() as jest.MockedFunction<typeof process.exit>;
process.exit = mockExit;

// Global test utilities
declare global {
  var mockProcessExit: jest.MockedFunction<typeof process.exit>;
}

(global as any).mockProcessExit = mockExit;
