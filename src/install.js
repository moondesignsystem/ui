#!/usr/bin/env node

import generateConfigFile from "./scripts/generateConfigFile.js";
import generateCoreFile from "./scripts/generateCoreFile.js";
import getConfig from "./scripts/getConfig.js";
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
    const addComponents = process.argv.includes("--add-components");
    await generateCoreFile(
      config.coreFileId,
      config.projectName,
      addComponents
    );
    const themes = config.themes || {};
    const themeKeys = Object.keys(themes);
    if (themeKeys.length > 0) {
      for (const themeName of themeKeys) {
        const themeFileId = themes[themeName];
        await generateCoreFile(themeFileId, themeName, addComponents);
      }
    }
    if (addComponents) {
      await generateComponentsFile();
    }
    console.log("Installation complete!");
  } catch (error) {
    console.error("Error in install script:", error);
  }
};

install();

export default install;
