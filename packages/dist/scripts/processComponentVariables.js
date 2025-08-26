import fetchFigmaData from "./fetchFigmaData.js";
import fetchProjectFiles from "./fetchProjectFiles.js";
import processPublishedVariables from "./processPublishedVariables.js";
import formatAndAddCSSVariable from "./formatAndAddCSSVariable.js";
import getConfig from "./utils/getConfig.js";
const processComponentVariablesForFile = async (fileId, fileName) => {
    try {
        const { localVariableCollections, publishedVariableCollections, localVariables, publishedVariables, } = await fetchFigmaData(fileId);
        const { variableCollections } = processPublishedVariables(localVariableCollections, publishedVariableCollections, localVariables, publishedVariables);
        let componentVariables = [];
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
                    if (!groupedVariables[modeName]) {
                        groupedVariables[modeName] = [];
                    }
                    groupedVariables[modeName].push(variable);
                    formatAndAddCSSVariable(componentVariables, collectionName, modeName, variableName, variable, modeId, localVariables, localVariableCollections, singleMode, true // isComponent = true for component variables
                    );
                }
            }
            collection.groupedVariables = groupedVariables;
        }
        return { componentVariables, fileName };
    }
    catch (error) {
        console.error(`❌ Error processing file ${fileId} (${fileName || "unknown"}):`, error);
        throw error;
    }
};
const processComponentVariables = async () => {
    try {
        const config = getConfig();
        // Check if we should use the new project-based approach
        if (config.componentsProjectId) {
            const projectFiles = await fetchProjectFiles(config.componentsProjectId);
            if (projectFiles.length === 0) {
                console.warn("⚠️ No files found in the project");
                return { componentVariables: [] };
            }
            console.log(`📁 Fetching ${projectFiles.length} components...`);
            let allComponentVariables = [];
            // Process each file in the project
            for (const file of projectFiles) {
                try {
                    const result = await processComponentVariablesForFile(file.key, file.name);
                    allComponentVariables = allComponentVariables.concat(result.componentVariables);
                    if (result.componentVariables.length > 0) {
                        console.log(`✅ Processed ${result.componentVariables.length} variables from ${file.name}`);
                    }
                }
                catch (error) {
                    console.error(`❌ Failed to process file ${file.name}:`, error);
                    // Continue with other files instead of failing completely
                }
            }
            return { componentVariables: allComponentVariables };
        }
        // Fallback to single file approach for backward compatibility
        if (config.componentsFileId) {
            console.log("🔄 Processing single components file...");
            const result = await processComponentVariablesForFile(config.componentsFileId);
            return { componentVariables: result.componentVariables };
        }
        throw new Error("❌ Either 'componentsProjectId' or 'componentsFileId' must be specified in moonconfig.json");
    }
    catch (error) {
        console.error("❌ Error in processComponentVariables script:", error);
        throw error;
    }
};
export default processComponentVariables;
export { processComponentVariablesForFile };
