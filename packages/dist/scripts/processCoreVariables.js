import fetchFigmaData from "./fetchFigmaData.js";
import processPublishedVariables from "./processPublishedVariables.js";
import formatAndAddCSSVariable from "./formatAndAddCSSVariable.js";
import getConfig from "./utils/getConfig.js";
const processCoreVariables = async (fileId = null) => {
    try {
        const config = getConfig();
        const figmaFileId = fileId || config.coreFileId;
        const { localVariableCollections, publishedVariableCollections, localVariables, publishedVariables, } = await fetchFigmaData(figmaFileId);
        const { variableCollections, themes, colorCollectionName, } = processPublishedVariables(localVariableCollections, publishedVariableCollections, localVariables, publishedVariables);
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
                    if (!mode)
                        continue;
                    const modeName = mode.name;
                    // Filter modes in "product" collection to match projectName
                    if (collectionName.toLowerCase() === "product") {
                        // Check if mode name matches or contains the project name
                        const projectName = config.projectName.toLowerCase();
                        const modeNameLower = modeName.toLowerCase();
                        // Skip modes that don't match the project name
                        if (!modeNameLower.includes(projectName) &&
                            modeNameLower !== projectName) {
                            continue;
                        }
                    }
                    // Filter variables in "color" collection based on product name in variable name
                    // Pattern: --color-MODE-PRODUCT-colorName-number
                    if (collectionName.toLowerCase() === "color") {
                        const projectName = config.projectName.toLowerCase();
                        const variableNameLower = variableName.toLowerCase();
                        // Check if variable name contains the project name
                        // Variable names are like "Moon/Gray/1" or "Bitcasino/Chichi/10"
                        const variableNameParts = variableNameLower.split("/");
                        if (variableNameParts.length >= 2) {
                            const productInVariableName = variableNameParts[0];
                            // Skip variables that don't match the project name
                            if (productInVariableName !== projectName) {
                                continue;
                            }
                        }
                    }
                    if (!groupedVariables[modeName]) {
                        groupedVariables[modeName] = [];
                    }
                    groupedVariables[modeName].push(variable);
                    formatAndAddCSSVariable(coreVariables, collectionName, modeName, variableName, variable, modeId, localVariables, localVariableCollections, singleMode, false // isComponent = false for core variables
                    );
                }
            }
            collection.groupedVariables = groupedVariables;
        }
        return { coreVariables, themes, colorCollectionName };
    }
    catch (error) {
        console.error("❌ Error in processCoreVariables script:", error);
        throw error;
    }
};
export default processCoreVariables;
