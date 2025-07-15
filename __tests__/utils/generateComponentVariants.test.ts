import { describe, it, expect, jest } from "@jest/globals";
import fs from "fs";
import generateComponentVariants from "../../src/scripts/utils/generateComponentVariants";

// Mock fs
jest.mock("fs");
const mockedFs = fs as jest.Mocked<typeof fs>;

describe("generateComponentVariants", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Helper function to setup file mocks and get result
  const setupMocksAndExecute = async (variantsContent: string, coreCssContent: string) => {
    mockedFs.readFileSync
      .mockReturnValueOnce(variantsContent)
      .mockReturnValueOnce(coreCssContent);

    await generateComponentVariants("/path/to/variants.scss", "/path/to/core.css");

    expect(mockedFs.readFileSync).toHaveBeenCalledWith("/path/to/variants.scss", "utf8");
    expect(mockedFs.readFileSync).toHaveBeenCalledWith("/path/to/core.css", "utf8");

    const writeCall = mockedFs.writeFileSync.mock.calls[0];
    return writeCall[1] as string;
  };

  describe("successful variant generation", () => {
    const testCases = [
      {
        name: "should update component variants in SCSS file based on core CSS",
        variantsContent: `
$button-variants: ("primary", "secondary");
$chip-variants: ("small", "medium");
$alert-variants: ("info", "warning");
        `,
        coreCssContent: `
--button-primary-background: #007bff;
--button-secondary-background: #6c757d;
--button-success-background: #28a745;
--chip-small-unselected-background: #f8f9fa;
--chip-medium-unselected-background: #e9ecef;
--chip-large-unselected-background: #dee2e6;
--alert-info-background: #d1ecf1;
--alert-warning-background: #fff3cd;
--alert-error-background: #f8d7da;
        `,
        expectations: [
          '$button-variants: ("primary", "secondary", "success");',
          '$chip-variants: ("large", "medium", "small");',
          '$alert-variants: ("error", "info", "warning");'
        ]
      },
      {
        name: "should handle chip component with special unselected-background pattern",
        variantsContent: '$chip-variants: ("default");',
        coreCssContent: `
--chip-primary-unselected-background: #007bff;
--chip-secondary-unselected-background: #6c757d;
--chip-ghost-unselected-background: transparent;
        `,
        expectations: ['$chip-variants: ("ghost", "primary", "secondary");']
      },
      {
        name: "should sort variants alphabetically",
        variantsContent: "$button-variants: ();",
        coreCssContent: `
--button-zebra-background: #000;
--button-alpha-background: #111;
--button-beta-background: #222;
        `,
        expectations: ['$button-variants: ("alpha", "beta", "zebra");']
      },
      {
        name: "should handle multiple components in one operation",
        variantsContent: `
$button-variants: ();
$icon-button-variants: ();
$avatar-variants: ();
        `,
        coreCssContent: `
--button-primary-background: #007bff;
--button-secondary-background: #6c757d;
--icon-button-small-background: #28a745;
--icon-button-large-background: #dc3545;
--avatar-xs-background: #f8f9fa;
--avatar-sm-background: #e9ecef;
        `,
        expectations: [
          '$button-variants: ("primary", "secondary");',
          '$icon-button-variants: ("large", "small");',
          '$avatar-variants: ("sm", "xs");'
        ]
      },
      {
        name: "should handle existing variant lists correctly",
        variantsContent: `
$button-variants: ("old-variant");
$chip-variants: ("existing-one", "existing-two");
        `,
        coreCssContent: `
--button-new-background: #007bff;
--button-fresh-background: #6c757d;
--chip-updated-unselected-background: #28a745;
        `,
        expectations: [
          '$button-variants: ("fresh", "new");',
          '$chip-variants: ("updated");'
        ]
      },
      {
        name: "should handle complex variant names with numbers and hyphens",
        variantsContent: "$button-variants: ();",
        coreCssContent: `
--button-primary2xl-background: #007bff;
--button-secondarysm-background: #6c757d;
--button-ghostoutline-background: transparent;
        `,
        expectations: ['$button-variants: ("ghostoutline", "primary2xl", "secondarysm");']
      }
    ];

    testCases.forEach(({ name, variantsContent, coreCssContent, expectations }) => {
      it(name, async () => {
        const updatedContent = await setupMocksAndExecute(variantsContent, coreCssContent);
        
        expectations.forEach(expectation => {
          expect(updatedContent).toContain(expectation);
        });
      });
    });
  });

  describe("edge cases and no-change scenarios", () => {
    const edgeCases = [
      {
        name: "should not update variants when no matching CSS variables found",
        variantsContent: '$button-variants: ("primary", "secondary");',
        coreCssContent: `
--input-primary-border: #007bff;
--select-secondary-background: #6c757d;
        `,
        shouldMatch: true // content should remain unchanged
      },
      {
        name: "should handle empty CSS content",
        variantsContent: '$button-variants: ("existing");',
        coreCssContent: "",
        shouldMatch: true
      },
      {
        name: "should handle empty variants content",
        variantsContent: "",
        coreCssContent: "--button-primary-background: #007bff;",
        shouldMatch: true
      }
    ];

    edgeCases.forEach(({ name, variantsContent, coreCssContent, shouldMatch }) => {
      it(name, async () => {
        const updatedContent = await setupMocksAndExecute(variantsContent, coreCssContent);
        
        if (shouldMatch) {
          expect(updatedContent).toBe(variantsContent);
        }
      });
    });
  });

  describe("error handling", () => {
    it("should handle file read errors gracefully", async () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
      mockedFs.readFileSync.mockImplementation(() => {
        throw new Error("File not found");
      });

      await generateComponentVariants("/invalid/path.scss", "/invalid/core.css");

      expect(consoleSpy).toHaveBeenCalledWith(
        "❌ Error in generateComponentVariants:",
        expect.any(Error)
      );
      expect(mockedFs.writeFileSync).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it("should handle file write errors gracefully", async () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

      mockedFs.readFileSync
        .mockReturnValueOnce("$button-variants: ();")
        .mockReturnValueOnce("--button-primary-background: #007bff;");

      mockedFs.writeFileSync.mockImplementation(() => {
        throw new Error("Write permission denied");
      });

      await generateComponentVariants("/path/to/variants.scss", "/path/to/core.css");

      expect(consoleSpy).toHaveBeenCalledWith(
        "❌ Error in generateComponentVariants:",
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });
});
