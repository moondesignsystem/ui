import getConfig from "./getConfig.js";
const replaceClassPrefix = (cssContent) => {
    if (!cssContent) {
        throw new Error("❌ CSS content is required");
    }
    try {
        const config = getConfig();
        if (!config?.customPrefix || config.customPrefix === "") {
            return cssContent;
        }
        return cssContent.replace(/\.moon-/g, `.${config.customPrefix}-`);
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`❌ Failed to replace class prefix: ${error.message}`);
        }
        throw new Error("❌ Failed to replace class prefix: Unknown error");
    }
};
export default replaceClassPrefix;
