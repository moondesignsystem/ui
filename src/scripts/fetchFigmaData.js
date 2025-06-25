import dotenv from "dotenv";
dotenv.config();

// STEP 3. Fetch Figma data

/**
 * @async
 * @param {string} [fileId]
 * @returns {Promise<Object>}
 * @throws {Error}
 */
const fetchFigmaData = async (fileId) => {
  try {
    const localVariablesDataResponse = await fetch(
      `https://api.figma.com/v1/files/${fileId}/variables/local`,
      {
        headers: {
          "X-FIGMA-TOKEN": process.env.FIGMA_TOKEN,
        },
      }
    );
    const publishedVariablesDataResponse = await fetch(
      `https://api.figma.com/v1/files/${fileId}/variables/published`,
      {
        headers: {
          "X-FIGMA-TOKEN": process.env.FIGMA_TOKEN,
        },
      }
    );
    const localVariablesData = await localVariablesDataResponse.json();
    const publishedVariablesData = await publishedVariablesDataResponse.json();
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
    console.error("❌ Error in fetchFigmaData script:", error);
  }
};

export default fetchFigmaData;
