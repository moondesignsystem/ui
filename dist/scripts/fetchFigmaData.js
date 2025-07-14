import dotenv from "dotenv";
dotenv.config();
// STEP 3. Fetch Figma data
const fetchFigmaData = async (fileId) => {
    const figmaToken = process.env.FIGMA_TOKEN;
    if (!figmaToken) {
        throw new Error("FIGMA_TOKEN is not defined in environment variables.");
    }
    try {
        const localVariablesDataResponse = await fetch(`https://api.figma.com/v1/files/${fileId}/variables/local`, {
            headers: {
                "X-FIGMA-TOKEN": figmaToken,
            },
        });
        const publishedVariablesDataResponse = await fetch(`https://api.figma.com/v1/files/${fileId}/variables/published`, {
            headers: {
                "X-FIGMA-TOKEN": figmaToken,
            },
        });
        const localVariablesData = await localVariablesDataResponse.json();
        const publishedVariablesData = await publishedVariablesDataResponse.json();
        const localVariableCollections = localVariablesData.meta.variableCollections;
        const publishedVariableCollections = publishedVariablesData.meta.variableCollections;
        const localVariables = localVariablesData.meta.variables;
        const publishedVariables = publishedVariablesData.meta.variables;
        return {
            localVariableCollections,
            publishedVariableCollections,
            localVariables,
            publishedVariables,
        };
    }
    catch (error) {
        console.error("❌ Error in fetchFigmaData script:", error);
        return;
    }
};
export default fetchFigmaData;
