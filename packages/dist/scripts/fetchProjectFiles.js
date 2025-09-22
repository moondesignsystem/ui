import dotenv from "dotenv";
dotenv.config({ quiet: true });
// STEP 2.5. Fetch list of component files from Figma project
const fetchProjectFiles = async (projectId) => {
    const figmaToken = process.env.FIGMA_TOKEN;
    if (!figmaToken) {
        throw new Error("FIGMA_TOKEN is not defined in environment variables.");
    }
    if (!projectId) {
        throw new Error("❌ Figma project ID is required");
    }
    try {
        const response = await fetch(`https://api.figma.com/v1/projects/${projectId}/files`, {
            headers: {
                "X-FIGMA-TOKEN": figmaToken,
            },
        });
        if (!response.ok) {
            throw new Error(`❌ Failed to fetch project files: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (!data.files) {
            throw new Error("❌ Invalid response structure from Figma API");
        }
        // Filter for component files (you might want to add specific naming conventions here)
        // For now, returning all files - you can add filtering logic based on naming patterns
        return data.files;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`❌ Failed to fetch project files: ${error.message}`);
        }
        throw new Error("❌ Failed to fetch project files: Unknown error");
    }
};
export default fetchProjectFiles;
