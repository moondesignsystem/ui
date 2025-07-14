import formatName from "./utils/formatName.js";
import type { FigmaVariableCollection, FigmaVariable } from "../types.js";

// STEP 4. Process Figma published variables

interface ProcessedVariable extends FigmaVariable {
  cssVariableName: string;
}

interface ProcessedVariableCollection extends FigmaVariableCollection {
  variables: Record<string, ProcessedVariable>;
}

interface LocalVariableCollections {
  [key: string]: FigmaVariableCollection;
}

interface PublishedVariableCollections {
  [key: string]: FigmaVariableCollection;
}

interface LocalVariables {
  [key: string]: FigmaVariable;
}

interface PublishedVariables {
  [key: string]: FigmaVariable;
}

const processPublishedVariables = (
  localVariableCollections: LocalVariableCollections,
  publishedVariableCollections: PublishedVariableCollections,
  localVariables: LocalVariables,
  publishedVariables: PublishedVariables
) => {
  try {
    let themes: string[] = [];
    let colorCollectionName = "";
    const variableCollections: Record<string, ProcessedVariableCollection> = {};

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
    throw error;
  }
};

export default processPublishedVariables;
