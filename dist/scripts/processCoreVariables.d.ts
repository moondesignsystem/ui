export default processCoreVariables;
/**
 * @async
 * @param {string} [fileId] - Optional Figma file ID override
 * @returns {Promise<{coreVariables: string[], themes: string[], colorCollectionName: string}>}
 * @throws {Error}
 */
declare function processCoreVariables(fileId?: string): Promise<{
    coreVariables: string[];
    themes: string[];
    colorCollectionName: string;
}>;
