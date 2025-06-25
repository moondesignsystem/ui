import formatName from "./utils/formatName.js";
import formatValue from "./utils/formatValue.js";

// STEP 5. Create an object with all CSS variables

/**
 * @param {string[]} cssVariables
 * @param {string} collectionName
 * @param {string} modeName
 * @param {string} variableName
 * @param {Object} variable
 * @param {string} modeId
 * @param {Object} localVariables
 * @param {Object} localVariableCollections
 * @param {boolean} singleMode
 * @returns {string[]}
 * @throws {Error}
 */
const formatAndAddCSSVariable = (
  cssVariables,
  collectionName,
  modeName,
  variableName,
  variable,
  modeId,
  localVariables,
  localVariableCollections,
  singleMode
) => {
  try {
    const cssVariableName = formatName(
      singleMode
        ? `--${collectionName}-${variableName}`
        : `--${collectionName}-${modeName}-${variableName}`
    );
    if (variable.valuesByMode[modeId].type === "VARIABLE_ALIAS") {
      const aliasVariableId = variable.valuesByMode[modeId].id;
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
      );
      cssVariables.push(`${cssVariableName}: ${cssVariableAliasName};`);
    } else {
      cssVariables.push(
        `${cssVariableName}: ${formatValue(
          variable.resolvedType,
          variable.name,
          variable.valuesByMode[modeId]
        )};`
      );
    }
    return cssVariables;
  } catch (error) {
    console.error("❌ Error in formatAndAddCSSVariable script:", error);
  }
};

export default formatAndAddCSSVariable;
