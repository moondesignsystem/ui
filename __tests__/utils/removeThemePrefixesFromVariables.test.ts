import { describe, it, expect } from "@jest/globals";
import removeThemePrefixesFromVariables from "../../src/scripts/utils/removeThemePrefixesFromVariables";

describe("removeThemePrefixesFromVariables", () => {
  it("should remove single theme prefix from variables", () => {
    const variable =
      "--color-light-primary: #000; --color-light-secondary: #fff;";
    const themes = ["light"];
    const colorCollectionName = "color";

    const result = removeThemePrefixesFromVariables(
      variable,
      themes,
      colorCollectionName
    );
    expect(result).toBe("--color-primary: #000; --color-secondary: #fff;");
  });

  it("should remove multiple theme prefixes from variables", () => {
    const variable =
      "--color-light-primary: #000; --color-dark-primary: #fff; --color-light-accent: red;";
    const themes = ["light", "dark"];
    const colorCollectionName = "color";

    const result = removeThemePrefixesFromVariables(
      variable,
      themes,
      colorCollectionName
    );
    expect(result).toBe(
      "--color-primary: #000; --color-primary: #fff; --color-accent: red;"
    );
  });

  it("should handle different color collection names", () => {
    const variable =
      "--semantic-light-error: red; --semantic-light-success: green;";
    const themes = ["light"];
    const colorCollectionName = "semantic";

    const result = removeThemePrefixesFromVariables(
      variable,
      themes,
      colorCollectionName
    );
    expect(result).toBe("--semantic-error: red; --semantic-success: green;");
  });

  it("should not affect variables that do not match the pattern", () => {
    const variable = "--custom-variable: value; --other-light-var: test;";
    const themes = ["light"];
    const colorCollectionName = "color";

    const result = removeThemePrefixesFromVariables(
      variable,
      themes,
      colorCollectionName
    );
    expect(result).toBe("--custom-variable: value; --other-light-var: test;");
  });

  it("should handle empty themes array", () => {
    const variable = "--color-light-primary: #000;";
    const themes: string[] = [];
    const colorCollectionName = "color";

    const result = removeThemePrefixesFromVariables(
      variable,
      themes,
      colorCollectionName
    );
    expect(result).toBe("--color-light-primary: #000;");
  });

  it("should handle empty variable string", () => {
    const variable = "";
    const themes = ["light", "dark"];
    const colorCollectionName = "color";

    const result = removeThemePrefixesFromVariables(
      variable,
      themes,
      colorCollectionName
    );
    expect(result).toBe("");
  });

  it("should handle complex theme names", () => {
    const variable =
      "--ui-light-mode-primary: #000; --ui-dark-mode-secondary: #fff;";
    const themes = ["light-mode", "dark-mode"];
    const colorCollectionName = "ui";

    const result = removeThemePrefixesFromVariables(
      variable,
      themes,
      colorCollectionName
    );
    expect(result).toBe("--ui-primary: #000; --ui-secondary: #fff;");
  });
});
