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

      for (const variableName in collection.variables) {
        const variable = collection.variables[variableName];
        const singleMode = Object.keys(variable.valuesByMode).length === 1;

        for (const modeId in variable.valuesByMode) {
          const mode = collection.modes.find((mode) => mode.modeId === modeId);
          if (!mode) continue;

          const modeName = mode.name;
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
            singleMode
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
