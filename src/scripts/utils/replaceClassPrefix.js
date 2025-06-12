import getConfig from "../getConfig.js";

/**
 * Replaces the default 'moon' class prefix in CSS with a custom prefix
 * @param {string} css - The compiled CSS content
 * @returns {string} - CSS with replaced class prefixes
 */
const replaceClassPrefix = (css) => {
  try {
    const config = getConfig();
    const prefix = config?.customPrefix;
    if (!prefix) {
      return css;
    }
    return css.replace(/\.moon-/g, `.${config.projectName}-`);
  } catch (error) {
    console.error("Error in replaceClassPrefix script:", error);
  }
};

export default replaceClassPrefix;
