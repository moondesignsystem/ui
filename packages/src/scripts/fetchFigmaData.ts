import dotenv from "dotenv";
dotenv.config();

// STEP 3. Fetch Figma data
const fetchFigmaData = async (fileId: string) => {
  const figmaToken = process.env.FIGMA_TOKEN;
  if (!figmaToken) {
    throw new Error("FIGMA_TOKEN is not defined in environment variables.");
  }
  if (!fileId) {
    throw new Error("❌ Figma file ID is required");
  }
  try {
    const localVariablesDataResponse = await fetch(
      `https://api.figma.com/v1/files/${fileId}/variables/local`,
      {
        headers: {
          "X-FIGMA-TOKEN": figmaToken,
        },
      }
    );
    const publishedVariablesDataResponse = await fetch(
      `https://api.figma.com/v1/files/${fileId}/variables/published`,
      {
        headers: {
          "X-FIGMA-TOKEN": figmaToken,
        },
      }
    );
    if (!localVariablesDataResponse.ok) {
      throw new Error(
        `❌ Failed to fetch local variables: ${localVariablesDataResponse.status} ${localVariablesDataResponse.statusText}`
      );
    }
    if (!publishedVariablesDataResponse.ok) {
      throw new Error(
        `❌ Failed to fetch published variables: ${publishedVariablesDataResponse.status} ${publishedVariablesDataResponse.statusText}`
      );
    }
    const localVariablesData = await localVariablesDataResponse.json();
    const publishedVariablesData = await publishedVariablesDataResponse.json();
    if (!localVariablesData.meta || !publishedVariablesData.meta) {
      throw new Error("❌ Invalid response structure from Figma API");
    }
    const localVariableCollections =
      localVariablesData.meta.variableCollections;
    const publishedVariableCollections =
      publishedVariablesData.meta.variableCollections;
    const localVariables = localVariablesData.meta.variables;
    const publishedVariables = publishedVariablesData.meta.variables;
    return {
      localVariableCollections,
      publishedVariableCollections,
      localVariables,
      publishedVariables,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`❌ Failed to fetch Figma data: ${error.message}`);
    }
    throw new Error("❌ Failed to fetch Figma data: Unknown error");
  }
};

export default fetchFigmaData;
