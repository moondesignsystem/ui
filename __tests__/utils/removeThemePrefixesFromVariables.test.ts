import { describe, it, expect } from "@jest/globals";
import removeThemePrefixesFromVariables from "../../src/scripts/utils/removeThemePrefixesFromVariables";

describe("removeThemePrefixesFromVariables", () => {
  const testCases = [
    {
      name: "should remove single theme prefix from variables",
      variable: "--color-light-primary: #000; --color-light-secondary: #fff;",
      themes: ["light"],
      colorCollectionName: "color",
      expected: "--color-primary: #000; --color-secondary: #fff;"
    },
    {
      name: "should remove multiple theme prefixes from variables",
      variable: "--color-light-primary: #000; --color-dark-primary: #fff; --color-light-accent: red;",
      themes: ["light", "dark"],
      colorCollectionName: "color",
      expected: "--color-primary: #000; --color-primary: #fff; --color-accent: red;"
    },
    {
      name: "should handle different color collection names",
      variable: "--semantic-light-error: red; --semantic-light-success: green;",
      themes: ["light"],
      colorCollectionName: "semantic",
      expected: "--semantic-error: red; --semantic-success: green;"
    },
    {
      name: "should not affect variables that do not match the pattern",
      variable: "--custom-variable: value; --other-light-var: test;",
      themes: ["light"],
      colorCollectionName: "color",
      expected: "--custom-variable: value; --other-light-var: test;"
    },
    {
      name: "should handle complex theme names",
      variable: "--ui-light-mode-primary: #000; --ui-dark-mode-secondary: #fff;",
      themes: ["light-mode", "dark-mode"],
      colorCollectionName: "ui",
      expected: "--ui-primary: #000; --ui-secondary: #fff;"
    }
  ];

  testCases.forEach(({ name, variable, themes, colorCollectionName, expected }) => {
    it(name, () => {
      const result = removeThemePrefixesFromVariables(variable, themes, colorCollectionName);
      expect(result).toBe(expected);
    });
  });

  const edgeCases = [
    {
      name: "should handle empty themes array",
      variable: "--color-light-primary: #000;",
      themes: [] as string[],
      colorCollectionName: "color",
      expected: "--color-light-primary: #000;"
    },
    {
      name: "should handle empty variable string",
      variable: "",
      themes: ["light", "dark"],
      colorCollectionName: "color",
      expected: ""
    }
  ];

  edgeCases.forEach(({ name, variable, themes, colorCollectionName, expected }) => {
    it(name, () => {
      const result = removeThemePrefixesFromVariables(variable, themes, colorCollectionName);
      expect(result).toBe(expected);
    });
  });
});
