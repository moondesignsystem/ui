import formatName from "./utils/formatName.js";
import formatValue from "./utils/formatValue.js";
import getConfig from "./utils/getConfig.js";
import type {
  FigmaResolvedType,
  FigmaValuesByMode,
  FigmaVariableAlias,
} from "../types.js";

// STEP 5. Create an object with all CSS variables

interface Variable {
  name: string;
  resolvedType: FigmaResolvedType;
  variableCollectionId: string;
  valuesByMode: Record<string, FigmaValuesByMode | FigmaVariableAlias>;
}

interface Mode {
  modeId: string;
  name: string;
}

interface VariableCollection {
  name: string;
  modes: Mode[];
}

interface LocalVariables {
  [key: string]: Variable;
}

interface LocalVariableCollections {
  [key: string]: VariableCollection;
}

const formatAndAddCSSVariable = (
  cssVariables: string[],
  collectionName: string,
  modeName: string,
  variableName: string,
  variable: Variable,
  modeId: string,
  localVariables: LocalVariables,
  localVariableCollections: LocalVariableCollections,
  singleMode: boolean,
  isComponent: boolean = false
) => {
  if (!cssVariables || !Array.isArray(cssVariables)) {
    throw new Error("❌ cssVariables must be a valid array");
  }
  if (!collectionName || !modeName || !variableName || !variable || !modeId) {
    throw new Error("❌ All required parameters must be provided");
  }
  try {
    const config = getConfig();
    let cssVariableName = formatName(
      singleMode
        ? `--${collectionName}-${variableName}`
        : `--${collectionName}-${modeName}-${variableName}`
    );
    // Add component prefix for component variables
    if (isComponent) {
      cssVariableName = cssVariableName.replace(/^--/, "--component-");
    }
    cssVariableName = cssVariableName.replace(/^--product-[^-]*-/, "--");
    const projectName = config.projectName.toLowerCase();
    // Transform --color-MODE-moon-COLOR to --color-MODE-COLOR
    const colorProjectRegex = new RegExp(
      `^--color-([^-]*-)?${projectName}-`,
      "i"
    );
    cssVariableName = cssVariableName.replace(colorProjectRegex, "--color-$1");
    if (
      typeof variable.valuesByMode[modeId] === "object" &&
      variable.valuesByMode[modeId] !== null &&
      (variable.valuesByMode[modeId] as FigmaVariableAlias).type ===
        "VARIABLE_ALIAS"
    ) {
      const aliasValue = variable.valuesByMode[modeId] as FigmaVariableAlias;
      const aliasVariableId = aliasValue.id;
      if (!aliasVariableId) {
        cssVariables.push(`${cssVariableName}: var(--missing-alias-id);`);
        return cssVariables;
      }
      const aliasVariable = localVariables[aliasVariableId];
      if (!aliasVariable) {
        cssVariables.push(`${cssVariableName}: var(--unknown-alias);`);
        return cssVariables;
      }
      const aliasVariableName = aliasVariable.name;
      const aliasVariableCollectionId = aliasVariable.variableCollectionId;
      if (!localVariableCollections[aliasVariableCollectionId]) {
        cssVariables.push(`${cssVariableName}: var(--unknown-collection);`);
        return cssVariables;
      }
      const aliasVariableCollectionName =
        localVariableCollections[aliasVariableCollectionId].name;
      const aliasSingleMode =
        Object.keys(aliasVariable.valuesByMode).length === 1;
      let aliasModeName = "Unknown Mode";
      if (!aliasSingleMode) {
        const aliasModeId = Object.keys(aliasVariable.valuesByMode)[0];
        const aliasMode = localVariableCollections[
          aliasVariableCollectionId
        ].modes.find((mode) => mode.modeId === aliasModeId);
        aliasModeName = aliasMode ? aliasMode.name : "Unknown Mode";
      }
      const cssVariableAliasName = formatName(
        aliasSingleMode
          ? `var(--${aliasVariableCollectionName}-${aliasVariableName})`
          : `var(--${aliasVariableCollectionName}-${aliasModeName}-${aliasVariableName})`
      ).replace(/var\(--product-[^-]*-/, "var(--");
      const aliasColorProjectRegex = new RegExp(
        `var\\(--color-([^-]*-)?${projectName}-`,
        "i"
      );
      const finalAliasName = cssVariableAliasName.replace(
        aliasColorProjectRegex,
        "var(--color-$1"
      );
      cssVariables.push(`${cssVariableName}: ${finalAliasName};`);
    } else {
      const value = variable.valuesByMode[modeId];
      if (
        typeof value === "string" ||
        typeof value === "number" ||
        (typeof value === "object" && value !== null && "r" in value)
      ) {
        cssVariables.push(
          `${cssVariableName}: ${formatValue(
            variable.resolvedType,
            variable.name,
            value as string | number | import("../types.js").FigmaColor
          )};`
        );
      } else {
        cssVariables.push(`${cssVariableName}: ${String(value)};`);
      }
    }
    return cssVariables;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `❌ Failed to format CSS variable '${variableName}': ${error.message}`
      );
    }
    throw new Error(
      `❌ Failed to format CSS variable '${variableName}': Unknown error`
    );
  }
};

export default formatAndAddCSSVariable;
