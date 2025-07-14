export default formatAndAddCSSVariable;
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
declare function formatAndAddCSSVariable(cssVariables: string[], collectionName: string, modeName: string, variableName: string, variable: Object, modeId: string, localVariables: Object, localVariableCollections: Object, singleMode: boolean): string[];
