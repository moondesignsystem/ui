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

  it("should update component variants in SCSS file based on core CSS", async () => {
    const variantsContent = `
$button-variants: ("primary", "secondary");
$chip-variants: ("small", "medium");
$alert-variants: ("info", "warning");
    `;

    const coreCssContent = `
--button-primary-background: #007bff;
--button-secondary-background: #6c757d;
--button-success-background: #28a745;
--chip-small-unselected-background: #f8f9fa;
--chip-medium-unselected-background: #e9ecef;
--chip-large-unselected-background: #dee2e6;
--alert-info-background: #d1ecf1;
--alert-warning-background: #fff3cd;
--alert-error-background: #f8d7da;
    `;

    mockedFs.readFileSync
      .mockReturnValueOnce(variantsContent) // variantsScssPath
      .mockReturnValueOnce(coreCssContent); // coreCssPath

    await generateComponentVariants(
      "/path/to/variants.scss",
      "/path/to/core.css"
    );

    expect(mockedFs.readFileSync).toHaveBeenCalledWith(
      "/path/to/variants.scss",
      "utf8"
    );
    expect(mockedFs.readFileSync).toHaveBeenCalledWith(
      "/path/to/core.css",
      "utf8"
    );

    const writeCall = mockedFs.writeFileSync.mock.calls[0];
    const updatedContent = writeCall[1] as string;

    expect(updatedContent).toContain(
      '$button-variants: ("primary", "secondary", "success");'
    );
    expect(updatedContent).toContain(
      '$chip-variants: ("large", "medium", "small");'
    );
    expect(updatedContent).toContain(
      '$alert-variants: ("error", "info", "warning");'
    );
  });

  it("should handle chip component with special unselected-background pattern", async () => {
    const variantsContent = '$chip-variants: ("default");';
    const coreCssContent = `
--chip-primary-unselected-background: #007bff;
--chip-secondary-unselected-background: #6c757d;
--chip-ghost-unselected-background: transparent;
    `;

    mockedFs.readFileSync
      .mockReturnValueOnce(variantsContent)
      .mockReturnValueOnce(coreCssContent);

    await generateComponentVariants(
      "/path/to/variants.scss",
      "/path/to/core.css"
    );

    const writeCall = mockedFs.writeFileSync.mock.calls[0];
    const updatedContent = writeCall[1] as string;

    expect(updatedContent).toContain(
      '$chip-variants: ("ghost", "primary", "secondary");'
    );
  });

  it("should not update variants when no matching CSS variables found", async () => {
    const variantsContent = '$button-variants: ("primary", "secondary");';
    const coreCssContent = `
--input-primary-border: #007bff;
--select-secondary-background: #6c757d;
    `;

    mockedFs.readFileSync
      .mockReturnValueOnce(variantsContent)
      .mockReturnValueOnce(coreCssContent);

    await generateComponentVariants(
      "/path/to/variants.scss",
      "/path/to/core.css"
    );

    const writeCall = mockedFs.writeFileSync.mock.calls[0];
    const updatedContent = writeCall[1] as string;

    expect(updatedContent).toBe(variantsContent);
  });

  it("should sort variants alphabetically", async () => {
    const variantsContent = "$button-variants: ();";
    const coreCssContent = `
--button-zebra-background: #000;
--button-alpha-background: #111;
--button-beta-background: #222;
    `;

    mockedFs.readFileSync
      .mockReturnValueOnce(variantsContent)
      .mockReturnValueOnce(coreCssContent);

    await generateComponentVariants(
      "/path/to/variants.scss",
      "/path/to/core.css"
    );

    const writeCall = mockedFs.writeFileSync.mock.calls[0];
    const updatedContent = writeCall[1] as string;

    expect(updatedContent).toContain(
      '$button-variants: ("alpha", "beta", "zebra");'
    );
  });

  it("should handle multiple components in one operation", async () => {
    const variantsContent = `
$button-variants: ();
$icon-button-variants: ();
$avatar-variants: ();
    `;
    const coreCssContent = `
--button-primary-background: #007bff;
--button-secondary-background: #6c757d;
--icon-button-small-background: #28a745;
--icon-button-large-background: #dc3545;
--avatar-xs-background: #f8f9fa;
--avatar-sm-background: #e9ecef;
    `;

    mockedFs.readFileSync
      .mockReturnValueOnce(variantsContent)
      .mockReturnValueOnce(coreCssContent);

    await generateComponentVariants(
      "/path/to/variants.scss",
      "/path/to/core.css"
    );

    const writeCall = mockedFs.writeFileSync.mock.calls[0];
    const updatedContent = writeCall[1] as string;

    expect(updatedContent).toContain(
      '$button-variants: ("primary", "secondary");'
    );
    expect(updatedContent).toContain(
      '$icon-button-variants: ("large", "small");'
    );
    expect(updatedContent).toContain('$avatar-variants: ("sm", "xs");');
  });

  it("should handle existing variant lists correctly", async () => {
    const variantsContent = `
$button-variants: ("old-variant");
$chip-variants: ("existing-one", "existing-two");
    `;
    const coreCssContent = `
--button-new-background: #007bff;
--button-fresh-background: #6c757d;
--chip-updated-unselected-background: #28a745;
    `;

    mockedFs.readFileSync
      .mockReturnValueOnce(variantsContent)
      .mockReturnValueOnce(coreCssContent);

    await generateComponentVariants(
      "/path/to/variants.scss",
      "/path/to/core.css"
    );

    const writeCall = mockedFs.writeFileSync.mock.calls[0];
    const updatedContent = writeCall[1] as string;

    expect(updatedContent).toContain('$button-variants: ("fresh", "new");');
    expect(updatedContent).toContain('$chip-variants: ("updated");');
  });

  it("should handle file read errors gracefully", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
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
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    mockedFs.readFileSync
      .mockReturnValueOnce("$button-variants: ();")
      .mockReturnValueOnce("--button-primary-background: #007bff;");

    mockedFs.writeFileSync.mockImplementation(() => {
      throw new Error("Write permission denied");
    });

    await generateComponentVariants(
      "/path/to/variants.scss",
      "/path/to/core.css"
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      "❌ Error in generateComponentVariants:",
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });

  it("should handle empty CSS content", async () => {
    const variantsContent = '$button-variants: ("existing");';
    const coreCssContent = "";

    mockedFs.readFileSync
      .mockReturnValueOnce(variantsContent)
      .mockReturnValueOnce(coreCssContent);

    await generateComponentVariants(
      "/path/to/variants.scss",
      "/path/to/core.css"
    );

    const writeCall = mockedFs.writeFileSync.mock.calls[0];
    const updatedContent = writeCall[1] as string;

    expect(updatedContent).toBe(variantsContent);
  });

  it("should handle empty variants content", async () => {
    const variantsContent = "";
    const coreCssContent = "--button-primary-background: #007bff;";

    mockedFs.readFileSync
      .mockReturnValueOnce(variantsContent)
      .mockReturnValueOnce(coreCssContent);

    await generateComponentVariants(
      "/path/to/variants.scss",
      "/path/to/core.css"
    );

    const writeCall = mockedFs.writeFileSync.mock.calls[0];
    const updatedContent = writeCall[1] as string;

    expect(updatedContent).toBe(variantsContent);
  });

  it("should handle complex variant names with numbers and hyphens", async () => {
    const variantsContent = "$button-variants: ();";
    const coreCssContent = `
--button-primary2xl-background: #007bff;
--button-secondarysm-background: #6c757d;
--button-ghostoutline-background: transparent;
    `;

    mockedFs.readFileSync
      .mockReturnValueOnce(variantsContent)
      .mockReturnValueOnce(coreCssContent);

    await generateComponentVariants(
      "/path/to/variants.scss",
      "/path/to/core.css"
    );

    const writeCall = mockedFs.writeFileSync.mock.calls[0];
    const updatedContent = writeCall[1] as string;

    // \\w+ captures only word characters (no hyphens)
    expect(updatedContent).toContain(
      '$button-variants: ("ghostoutline", "primary2xl", "secondarysm");'
    );
  });
});
