#!/usr/bin/env node

import generateConfigFile from "./scripts/generateConfigFile.js";
import generateCoreFile from "./scripts/generateCoreFile.js";
import getConfig from "./scripts/getConfig.js";
import generateThemeFile from "./scripts/generateThemeFile.js";
import generateComponentsFile from "./scripts/generateComponentsFile.js";

/**
 * Generate core file with specific file ID and project name
 * @async
 * @param {string} fileId - Figma file ID to fetch variables from
 * @param {string} projectName - Name to use for output file
 * @returns {Promise<void>}
 */

const install = async () => {
  try {
    generateConfigFile();
    const config = getConfig();
    console.log(`Generating ${config.projectName}-core.css file...`);
    await generateCoreFile();
    const themes = config.themes || {};
    const themeKeys = Object.keys(themes);
    if (themeKeys.length > 0) {
      for (const themeName of themeKeys) {
        const themeId = themes[themeName];
        console.log(`Generating ${themeName}-core.css file...`);
        await generateThemeFile(themeId, themeName);
      }
    }
    const addComponents = process.argv.includes("--add-components");
    if (addComponents) {
      console.log(`Generating ${config.projectName}-components.css file...`);
      await generateComponentsFile();
    }
    console.log("Installation complete!");
  } catch (error) {
    console.error("Error in install script:", error);
  }
};

install();

export default install;
