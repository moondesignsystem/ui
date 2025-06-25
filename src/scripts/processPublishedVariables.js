import formatName from "./utils/formatName.js";

// STEP 4. Process Figma published variables

/**
 * @param {Object} localVariableCollections
 * @param {Object} publishedVariableCollections
 * @param {Object} localVariables
 * @param {Object} publishedVariables
 * @returns {{
 *   variableCollections: Object,
 *   themes: string[],
 *   colorCollectionName: string
 * }}
 * @throws {Error}
 */
const processPublishedVariables = (
  localVariableCollections,
  publishedVariableCollections,
  localVariables,
  publishedVariables
) => {
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

        // Filter variables inside each variableCollection
        for (const variableId in localVariables) {
          const variable = localVariables[variableId];
          if (
            variable.variableCollectionId === key &&
            publishedVariables.hasOwnProperty(variableId)
          ) {
            variableCollections[collectionName].variables[variable.name] = {
              ...variable,
              cssVariableName: `${collectionName}/${variable.name}`,
            };
          }
        }

        const allVariablesAreColor = Object.values(
          variableCollections[collectionName].variables
        ).every((variable) => variable.resolvedType === "COLOR");

        if (allVariablesAreColor) {
          themes = variableCollections[collectionName].modes.map((mode) =>
            formatName(mode.name)
          );
          colorCollectionName = formatName(collectionName);
        }
      }
    }
    return { variableCollections, themes, colorCollectionName };
  } catch (error) {
    console.error("❌ Error in processPublishedVariables script:", error);
  }
};

export default processPublishedVariables;
