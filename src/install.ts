#!/usr/bin/env node

import generateConfigFile from "./scripts/generateConfigFile.js";
import generateCoreFile from "./scripts/generateCoreFile.js";
import getConfig from "./scripts/utils/getConfig.js";
import generateComponentsFile from "./scripts/generateComponentsFile.js";

const install = async () => {
  if (!process.env.FIGMA_TOKEN) {
    console.error("❌ FIGMA_TOKEN is not defined in environment variables");
    return null;
  }
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
    console.log("✅ Installation complete!");
    return;
  } catch (error) {
    console.error("❌ Error in install script:", error);
    return;
  }
};

install();

export default install;
