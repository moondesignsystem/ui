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

  // Helper function to create mock responses
  const createMockResponse = (data: any, ok = true, status = 200, statusText = "OK") => ({
    ok,
    status,
    statusText,
    json: async () => data,
  } as Response);

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
    const invalidTokenScenarios = [
      { token: undefined, description: "FIGMA_TOKEN is not defined" },
      { token: "", description: "FIGMA_TOKEN is empty string" },
    ];

    invalidTokenScenarios.forEach(({ token, description }) => {
      it(`should throw error when ${description}`, async () => {
        if (token === undefined) {
          delete process.env.FIGMA_TOKEN;
        } else {
          process.env.FIGMA_TOKEN = token;
        }

        await expect(fetchFigmaData(mockFileId)).rejects.toThrow(
          "FIGMA_TOKEN is not defined in environment variables."
        );
      });
    });
  });

  describe("Parameter validation", () => {
    const invalidFileIdScenarios = [
      { fileId: "", description: "fileId is not provided" },
      { fileId: undefined, description: "fileId is undefined" },
      { fileId: null, description: "fileId is null" },
    ];

    invalidFileIdScenarios.forEach(({ fileId, description }) => {
      it(`should throw error when ${description}`, async () => {
        await expect(fetchFigmaData(fileId as any)).rejects.toThrow(
          "❌ Figma file ID is required"
        );
      });
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
        const response = url.toString().includes("/local")
          ? createMockResponse(mockLocalVariablesResponse)
          : createMockResponse(mockPublishedVariablesResponse);
        return Promise.resolve(response);
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
        const response = url.toString().includes("/local")
          ? createMockResponse(mockLocalVariablesResponse)
          : createMockResponse(mockPublishedVariablesResponse);
        return Promise.resolve(response);
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
    const apiErrorScenarios = [
      {
        description: "local variables API call fails",
        mockImplementation: () => {
          let callCount = 0;
          return () => {
            callCount++;
            return Promise.resolve(
              callCount === 1
                ? createMockResponse({}, false, 404, "Not Found")
                : createMockResponse({ meta: { variableCollections: {}, variables: {} } })
            );
          };
        },
        expectedError: "❌ Failed to fetch local variables: 404 Not Found",
      },
      {
        description: "published variables API call fails",
        mockImplementation: () => {
          let callCount = 0;
          return () => {
            callCount++;
            return Promise.resolve(
              callCount === 1
                ? createMockResponse({ meta: { variableCollections: {}, variables: {} } })
                : createMockResponse({}, false, 401, "Unauthorized")
            );
          };
        },
        expectedError: "❌ Failed to fetch published variables: 401 Unauthorized",
      },
    ];

    apiErrorScenarios.forEach(({ description, mockImplementation, expectedError }) => {
      it(`should throw error when ${description}`, async () => {
        mockFetch.mockImplementation(mockImplementation());

        await expect(fetchFigmaData(mockFileId)).rejects.toThrow(expectedError);
      });
    });

    const invalidResponseScenarios = [
      {
        description: "local variables response has no meta",
        mockImplementation: () => {
          let callCount = 0;
          return () => {
            callCount++;
            return Promise.resolve(
              callCount === 1
                ? createMockResponse({})
                : createMockResponse({ meta: { variableCollections: {}, variables: {} } })
            );
          };
        },
      },
      {
        description: "published variables response has no meta",
        mockImplementation: () => {
          let callCount = 0;
          return () => {
            callCount++;
            return Promise.resolve(
              callCount === 1
                ? createMockResponse({ meta: { variableCollections: {}, variables: {} } })
                : createMockResponse({})
            );
          };
        },
      },
      {
        description: "local variables response has null meta",
        mockImplementation: () => {
          let callCount = 0;
          return () => {
            callCount++;
            return Promise.resolve(
              callCount === 1
                ? createMockResponse({ meta: null })
                : createMockResponse({ meta: { variableCollections: {}, variables: {} } })
            );
          };
        },
      },
    ];

    invalidResponseScenarios.forEach(({ description, mockImplementation }) => {
      it(`should throw error when ${description}`, async () => {
        mockFetch.mockImplementation(mockImplementation());

        await expect(fetchFigmaData(mockFileId)).rejects.toThrow(
          "❌ Invalid response structure from Figma API"
        );
      });
    });
  });

  describe("Network error handling", () => {
    const networkErrorScenarios = [
      {
        description: "network errors gracefully",
        mockImplementation: () => Promise.reject(new Error("Network request failed")),
        expectedError: "❌ Failed to fetch Figma data: Network request failed",
      },
      {
        description: "unknown errors gracefully",
        mockImplementation: () => Promise.reject("Unknown error string"),
        expectedError: "❌ Failed to fetch Figma data: Unknown error",
      },
      {
        description: "JSON parsing errors",
        mockImplementation: () => Promise.resolve({
          ok: true,
          json: async () => { throw new Error("Invalid JSON"); },
        } as unknown as Response),
        expectedError: "❌ Failed to fetch Figma data: Invalid JSON",
      },
    ];

    networkErrorScenarios.forEach(({ description, mockImplementation, expectedError }) => {
      it(`should handle ${description}`, async () => {
        mockFetch.mockImplementation(mockImplementation);

        await expect(fetchFigmaData(mockFileId)).rejects.toThrow(expectedError);
      });
    });
  });

  describe("Edge cases", () => {
    const edgeCaseScenarios = [
      {
        description: "API responses with different status codes",
        mockImplementation: () => Promise.resolve(createMockResponse({}, false, 500, "Internal Server Error")),
        expectedError: "❌ Failed to fetch local variables: 500 Internal Server Error",
      },
      {
        description: "responses with missing statusText",
        mockImplementation: () => Promise.resolve(createMockResponse({}, false, 403, "")),
        expectedError: "❌ Failed to fetch local variables: 403",
      },
    ];

    edgeCaseScenarios.forEach(({ description, mockImplementation, expectedError }) => {
      it(`should handle ${description}`, async () => {
        mockFetch.mockImplementation(mockImplementation);

        await expect(fetchFigmaData(mockFileId)).rejects.toThrow(expectedError);
      });
    });

    it("should handle successful responses with empty collections and variables", async () => {
      const emptyResponse = {
        meta: {
          variableCollections: {},
          variables: {},
        },
      };

      mockFetch.mockImplementation(() => Promise.resolve(createMockResponse(emptyResponse)));

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
    const integrationScenarios = [
      {
        description: "timeout scenarios",
        mockImplementation: () => {
          const timeoutError = new Error("Request timeout");
          timeoutError.name = "TimeoutError";
          return Promise.reject(timeoutError);
        },
        expectedError: "❌ Failed to fetch Figma data: Request timeout",
      },
      {
        description: "rate limiting scenarios",
        mockImplementation: () => Promise.resolve(createMockResponse({}, false, 429, "Too Many Requests")),
        expectedError: "❌ Failed to fetch local variables: 429 Too Many Requests",
      },
    ];

    integrationScenarios.forEach(({ description, mockImplementation, expectedError }) => {
      it(`should handle ${description}`, async () => {
        mockFetch.mockImplementation(mockImplementation);

        await expect(fetchFigmaData(mockFileId)).rejects.toThrow(expectedError);
      });
    });

    it("should work with different file ID formats", async () => {
      const specialFileId = "abc-123_XYZ";
      const mockResponse = {
        meta: {
          variableCollections: { test: "collection" },
          variables: { test: "variable" },
        },
      };

      mockFetch.mockImplementation(() => Promise.resolve(createMockResponse(mockResponse)));

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
