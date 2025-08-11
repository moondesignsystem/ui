import getConfig from "./getConfig.js";

const replaceClassPrefix = (cssContent: string) => {
  if (!cssContent) {
    throw new Error("❌ CSS content is required");
  }
  try {
    const config = getConfig();
    const prefix = config?.customPrefix;
    if (!prefix) {
      return cssContent;
    }
    return cssContent.replace(/\.moon-/g, `.${config.projectName}-`);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`❌ Failed to replace class prefix: ${error.message}`);
    }
    throw new Error("❌ Failed to replace class prefix: Unknown error");
  }
};

export default replaceClassPrefix;
