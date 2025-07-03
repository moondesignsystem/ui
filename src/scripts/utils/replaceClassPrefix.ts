import getConfig from "./getConfig.js";

const replaceClassPrefix = (cssContent: string) => {
  try {
    const config = getConfig();
    const prefix = config?.customPrefix;
    if (!prefix) {
      return cssContent;
    }
    return cssContent.replace(/\.moon-/g, `.${config.projectName}-`);
  } catch (error) {
    console.error("❌ Error in replaceClassPrefix script:", error);
    return;
  }
};

export default replaceClassPrefix;
