import fetchFigmaData from "./fetchFigmaData.js";
import processPublishedVariables from "./processPublishedVariables.js";
import formatAndAddCSSVariable from "./formatAndAddCSSVariable.js";
import getConfig from "./utils/getConfig.js";
import type { FigmaVariableCollection, FigmaVariable } from "../types.js";

// STEP 2. Process Figma core variables

interface ProcessedVariable extends FigmaVariable {
  cssVariableName: string;
}

interface ProcessedVariableCollection extends FigmaVariableCollection {
  variables: Record<string, ProcessedVariable>;
  groupedVariables?: Record<string, FigmaVariable[]>;
}

interface ProcessPublishedVariablesResult {
  variableCollections: Record<string, ProcessedVariableCollection>;
  themes: string[];
  colorCollectionName: string;
}

const processCoreVariables = async (fileId: string | null = null) => {
  try {
    const config = getConfig();
    const figmaFileId = fileId || config.coreFileId;
    const {
      localVariableCollections,
      publishedVariableCollections,
      localVariables,
      publishedVariables,
    } = await fetchFigmaData(figmaFileId);

    const {
      variableCollections,
      themes,
      colorCollectionName,
    }: ProcessPublishedVariablesResult = processPublishedVariables(
      localVariableCollections,
      publishedVariableCollections,
      localVariables,
      publishedVariables
    );

    let coreVariables: string[] = [];

    // Group variables by modes.modeId and output cssVariables
    for (const collectionName in variableCollections) {
      const collection = variableCollections[collectionName];
      const groupedVariables: Record<string, FigmaVariable[]> = {};
      const collectionNameLower = collectionName.toLowerCase();
      const projectName = config.projectName?.toLowerCase?.() || "";

      let allowedProductModeIds: Set<string> | null = null;
      if (collectionNameLower === "product") {
        const matchingModes = collection.modes.filter((m) =>
          m.name.toLowerCase().includes(projectName)
        );
        if (matchingModes.length > 0) {
          allowedProductModeIds = new Set(matchingModes.map((m) => m.modeId));
        } else if (collection.modes.length > 0) {
          allowedProductModeIds = new Set([collection.modes[0].modeId]);
        }
      }
      let colorHasProjectPrefix = false;
      let colorFallbackPrefix: string | null = null;
      if (collectionNameLower === "color") {
        for (const vName in collection.variables) {
          const parts = vName.split("/");
          if (parts.length >= 2) {
            const prefix = parts[0].toLowerCase();
            if (!colorFallbackPrefix) colorFallbackPrefix = prefix;
            if (prefix === projectName) {
              colorHasProjectPrefix = true;
              break;
            }
          }
        }
      }

      for (const variableName in collection.variables) {
        const variable = collection.variables[variableName];
        const singleMode = Object.keys(variable.valuesByMode).length === 1;

        for (const modeId in variable.valuesByMode) {
          const mode = collection.modes.find((mode) => mode.modeId === modeId);
          if (!mode) continue;

          const modeName = mode.name;

          if (collectionNameLower === "product" && allowedProductModeIds) {
            if (!allowedProductModeIds.has(modeId)) continue;
          }

          if (collectionNameLower === "color") {
            const parts = variableName.split("/");
            if (parts.length >= 2) {
              const prefix = parts[0].toLowerCase();
              if (colorHasProjectPrefix) {
                if (prefix !== projectName) continue;
              } else if (
                colorFallbackPrefix &&
                prefix !== colorFallbackPrefix
              ) {
                continue;
              }
            }
          }

          if (!groupedVariables[modeName]) {
            groupedVariables[modeName] = [];
          }
          groupedVariables[modeName].push(variable);

          formatAndAddCSSVariable(
            coreVariables,
            collectionName,
            modeName,
            variableName,
            variable,
            modeId,
            localVariables,
            localVariableCollections,
            singleMode,
            false // isComponent = false for core variables
          );
        }
      }

      collection.groupedVariables = groupedVariables;
    }

    return { coreVariables, themes, colorCollectionName };
  } catch (error) {
    console.error("❌ Error in processCoreVariables script:", error);
    throw error;
  }
};

export default processCoreVariables;
