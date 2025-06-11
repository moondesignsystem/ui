import fetchFigmaData from "./fetchFigmaData.js";
import processPublishedVariables from "./processPublishedVariables.js";
import formatAndAddCSSVariable from "./formatAndAddCSSVariable.js";
import getConfig from "./getConfig.js";

// STEP 2. Process Figma core variables

/**
 * @async
 * @param {string} [fileId] - Optional Figma file ID override
 * @returns {Promise<{coreVariables: string[], themes: string[], colorCollectionName: string}>}
 * @throws {Error}
 */
const processCoreVariables = async (fileId = null) => {
  try {
    const config = getConfig();
    const figmaFileId = fileId || config.core;
    const {
      localVariableCollections,
      publishedVariableCollections,
      localVariables,
      publishedVariables,
    } = await fetchFigmaData(figmaFileId);
    const { variableCollections, themes, colorCollectionName } =
      processPublishedVariables(
        localVariableCollections,
        publishedVariableCollections,
        localVariables,
        publishedVariables
      );
    let coreVariables = [];
    // Group variables by modes.modeId and output cssVariables
    for (const collectionName in variableCollections) {
      const collection = variableCollections[collectionName];
      const groupedVariables = {};

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
    console.error("Error in processCoreVariables script:", error);
  }
};

export default processCoreVariables;
