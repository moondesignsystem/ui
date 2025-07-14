import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import fetchFigmaData from "../src/scripts/fetchFigmaData";

// Mock dotenv
jest.mock("dotenv", () => ({
  config: jest.fn(),
}));

// Create a properly typed mock for fetch
const createMockFetch = () => {
  const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
  (global as any).fetch = mockFetch;
  return mockFetch;
};

describe("fetchFigmaData", () => {
  let mockFetch: jest.MockedFunction<typeof fetch>;
  const originalEnv = process.env;
  const mockFileId = "test-file-id-123";
  const mockFigmaToken = "figma-token-abc123";

  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch = createMockFetch();
    process.env = { ...originalEnv };
    process.env.FIGMA_TOKEN = mockFigmaToken;
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe("Environment validation", () => {
    it("should throw error when FIGMA_TOKEN is not defined", async () => {
      delete process.env.FIGMA_TOKEN;

      await expect(fetchFigmaData(mockFileId)).rejects.toThrow(
        "FIGMA_TOKEN is not defined in environment variables."
      );
    });

    it("should throw error when FIGMA_TOKEN is empty string", async () => {
      process.env.FIGMA_TOKEN = "";

      await expect(fetchFigmaData(mockFileId)).rejects.toThrow(
        "FIGMA_TOKEN is not defined in environment variables."
      );
    });
  });

  describe("Parameter validation", () => {
    it("should throw error when fileId is not provided", async () => {
      await expect(fetchFigmaData("")).rejects.toThrow(
        "❌ Figma file ID is required"
      );
    });

    it("should throw error when fileId is undefined", async () => {
      await expect(fetchFigmaData(undefined as any)).rejects.toThrow(
        "❌ Figma file ID is required"
      );
    });

    it("should throw error when fileId is null", async () => {
      await expect(fetchFigmaData(null as any)).rejects.toThrow(
        "❌ Figma file ID is required"
      );
    });
  });

  describe("API calls", () => {
    const mockLocalVariablesResponse = {
      meta: {
        variableCollections: { local1: "collection1" },
        variables: { var1: "value1" },
      },
    };

    const mockPublishedVariablesResponse = {
      meta: {
        variableCollections: { published1: "collection1" },
        variables: { var2: "value2" },
      },
    };

    it("should make correct API calls with proper headers", async () => {
      mockFetch.mockImplementation((url: string | URL | Request) => {
        const response = {
          ok: true,
          json: async () => {
            if (url.toString().includes("/local")) {
              return mockLocalVariablesResponse;
            }
            return mockPublishedVariablesResponse;
          },
        };
        return Promise.resolve(response as Response);
      });

      await fetchFigmaData(mockFileId);

      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(mockFetch).toHaveBeenNthCalledWith(
        1,
        `https://api.figma.com/v1/files/${mockFileId}/variables/local`,
        {
          headers: {
            "X-FIGMA-TOKEN": mockFigmaToken,
          },
        }
      );
      expect(mockFetch).toHaveBeenNthCalledWith(
        2,
        `https://api.figma.com/v1/files/${mockFileId}/variables/published`,
        {
          headers: {
            "X-FIGMA-TOKEN": mockFigmaToken,
          },
        }
      );
    });

    it("should return correct data structure on successful API calls", async () => {
      mockFetch.mockImplementation((url: string | URL | Request) => {
        const response = {
          ok: true,
          json: async () => {
            if (url.toString().includes("/local")) {
              return mockLocalVariablesResponse;
            }
            return mockPublishedVariablesResponse;
          },
        };
        return Promise.resolve(response as Response);
      });

      const result = await fetchFigmaData(mockFileId);

      expect(result).toEqual({
        localVariableCollections: { local1: "collection1" },
        publishedVariableCollections: { published1: "collection1" },
        localVariables: { var1: "value1" },
        publishedVariables: { var2: "value2" },
      });
    });
  });

  describe("Error handling", () => {
    it("should throw error when local variables API call fails", async () => {
      let callCount = 0;
      mockFetch.mockImplementation(() => {
        callCount++;
        if (callCount === 1) {
          return Promise.resolve({
            ok: false,
            status: 404,
            statusText: "Not Found",
          } as Response);
        }
        return Promise.resolve({
          ok: true,
          json: async () => ({
            meta: {
              variableCollections: {},
              variables: {},
            },
          }),
        } as Response);
      });

      await expect(fetchFigmaData(mockFileId)).rejects.toThrow(
        "❌ Failed to fetch local variables: 404 Not Found"
      );
    });

    it("should throw error when published variables API call fails", async () => {
      let callCount = 0;
      mockFetch.mockImplementation(() => {
        callCount++;
        if (callCount === 1) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              meta: {
                variableCollections: {},
                variables: {},
              },
            }),
          } as Response);
        }
        return Promise.resolve({
          ok: false,
          status: 401,
          statusText: "Unauthorized",
        } as Response);
      });

      await expect(fetchFigmaData(mockFileId)).rejects.toThrow(
        "❌ Failed to fetch published variables: 401 Unauthorized"
      );
    });

    it("should throw error when local variables response has no meta", async () => {
      let callCount = 0;
      mockFetch.mockImplementation(() => {
        callCount++;
        if (callCount === 1) {
          return Promise.resolve({
            ok: true,
            json: async () => ({}),
          } as Response);
        }
        return Promise.resolve({
          ok: true,
          json: async () => ({
            meta: {
              variableCollections: {},
              variables: {},
            },
          }),
        } as Response);
      });

      await expect(fetchFigmaData(mockFileId)).rejects.toThrow(
        "❌ Invalid response structure from Figma API"
      );
    });

    it("should throw error when published variables response has no meta", async () => {
      let callCount = 0;
      mockFetch.mockImplementation(() => {
        callCount++;
        if (callCount === 1) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              meta: {
                variableCollections: {},
                variables: {},
              },
            }),
          } as Response);
        }
        return Promise.resolve({
          ok: true,
          json: async () => ({}),
        } as Response);
      });

      await expect(fetchFigmaData(mockFileId)).rejects.toThrow(
        "❌ Invalid response structure from Figma API"
      );
    });

    it("should throw error when local variables response has null meta", async () => {
      let callCount = 0;
      mockFetch.mockImplementation(() => {
        callCount++;
        if (callCount === 1) {
          return Promise.resolve({
            ok: true,
            json: async () => ({ meta: null }),
          } as Response);
        }
        return Promise.resolve({
          ok: true,
          json: async () => ({
            meta: {
              variableCollections: {},
              variables: {},
            },
          }),
        } as Response);
      });

      await expect(fetchFigmaData(mockFileId)).rejects.toThrow(
        "❌ Invalid response structure from Figma API"
      );
    });
  });

  describe("Network error handling", () => {
    it("should handle network errors gracefully", async () => {
      const networkError = new Error("Network request failed");
      mockFetch.mockImplementation(() => Promise.reject(networkError));

      await expect(fetchFigmaData(mockFileId)).rejects.toThrow(
        "❌ Failed to fetch Figma data: Network request failed"
      );
    });

    it("should handle unknown errors gracefully", async () => {
      mockFetch.mockImplementation(() =>
        Promise.reject("Unknown error string")
      );

      await expect(fetchFigmaData(mockFileId)).rejects.toThrow(
        "❌ Failed to fetch Figma data: Unknown error"
      );
    });

    it("should handle JSON parsing errors", async () => {
      mockFetch.mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: async () => {
            throw new Error("Invalid JSON");
          },
        } as unknown as Response);
      });

      await expect(fetchFigmaData(mockFileId)).rejects.toThrow(
        "❌ Failed to fetch Figma data: Invalid JSON"
      );
    });
  });

  describe("Edge cases", () => {
    it("should handle API responses with different status codes", async () => {
      mockFetch.mockImplementation(() => {
        return Promise.resolve({
          ok: false,
          status: 500,
          statusText: "Internal Server Error",
        } as Response);
      });

      await expect(fetchFigmaData(mockFileId)).rejects.toThrow(
        "❌ Failed to fetch local variables: 500 Internal Server Error"
      );
    });

    it("should handle responses with missing statusText", async () => {
      mockFetch.mockImplementation(() => {
        return Promise.resolve({
          ok: false,
          status: 403,
          statusText: "",
        } as Response);
      });

      await expect(fetchFigmaData(mockFileId)).rejects.toThrow(
        "❌ Failed to fetch local variables: 403"
      );
    });

    it("should handle successful responses with empty collections and variables", async () => {
      const emptyResponse = {
        meta: {
          variableCollections: {},
          variables: {},
        },
      };

      mockFetch.mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: async () => emptyResponse,
        } as Response);
      });

      const result = await fetchFigmaData(mockFileId);

      expect(result).toEqual({
        localVariableCollections: {},
        publishedVariableCollections: {},
        localVariables: {},
        publishedVariables: {},
      });
    });
  });

  describe("Integration scenarios", () => {
    it("should handle timeout scenarios", async () => {
      const timeoutError = new Error("Request timeout");
      timeoutError.name = "TimeoutError";
      mockFetch.mockImplementation(() => Promise.reject(timeoutError));

      await expect(fetchFigmaData(mockFileId)).rejects.toThrow(
        "❌ Failed to fetch Figma data: Request timeout"
      );
    });

    it("should handle rate limiting scenarios", async () => {
      mockFetch.mockImplementation(() => {
        return Promise.resolve({
          ok: false,
          status: 429,
          statusText: "Too Many Requests",
        } as Response);
      });

      await expect(fetchFigmaData(mockFileId)).rejects.toThrow(
        "❌ Failed to fetch local variables: 429 Too Many Requests"
      );
    });

    it("should work with different file ID formats", async () => {
      const specialFileId = "abc-123_XYZ";
      const mockResponse = {
        meta: {
          variableCollections: { test: "collection" },
          variables: { test: "variable" },
        },
      };

      mockFetch.mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: async () => mockResponse,
        } as Response);
      });

      const result = await fetchFigmaData(specialFileId);

      expect(mockFetch).toHaveBeenNthCalledWith(
        1,
        `https://api.figma.com/v1/files/${specialFileId}/variables/local`,
        expect.any(Object)
      );
      expect(result).toBeDefined();
    });
  });
});
