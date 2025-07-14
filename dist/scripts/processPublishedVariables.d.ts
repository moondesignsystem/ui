export default processPublishedVariables;
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
declare function processPublishedVariables(localVariableCollections: Object, publishedVariableCollections: Object, localVariables: Object, publishedVariables: Object): {
    variableCollections: Object;
    themes: string[];
    colorCollectionName: string;
};
