import formatName from "./utils/formatName.js";
const processPublishedVariables = (localVariableCollections, publishedVariableCollections, localVariables, publishedVariables) => {
    try {
        let themes = [];
        let colorCollectionName = "";
        const variableCollections = {};
        for (const key in localVariableCollections) {
            if (publishedVariableCollections.hasOwnProperty(key)) {
                const collectionName = localVariableCollections[key].name;
                variableCollections[collectionName] = {
                    ...localVariableCollections[key],
                    variables: {},
                };
                for (const variableId in localVariables) {
                    const variable = localVariables[variableId];
                    if (variable.variableCollectionId === key &&
                        publishedVariables.hasOwnProperty(variableId)) {
                        variableCollections[collectionName].variables[variable.name] = {
                            ...variable,
                            cssVariableName: `${collectionName}/${variable.name}`,
                        };
                    }
                }
                const allVariablesAreColor = Object.values(variableCollections[collectionName].variables).every((variable) => variable.resolvedType === "COLOR");
                if (allVariablesAreColor) {
                    const collectionModes = variableCollections[collectionName].modes.map((mode) => formatName(mode.name));
                    if (themes.length === 0 || collectionModes.length > themes.length) {
                        themes = collectionModes;
                        colorCollectionName = formatName(collectionName);
                    }
                }
            }
        }
        return { variableCollections, themes, colorCollectionName };
    }
    catch (error) {
        console.error("❌ Error in processPublishedVariables script:", error);
        throw error;
    }
};
export default processPublishedVariables;
