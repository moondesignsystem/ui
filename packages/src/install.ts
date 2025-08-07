#!/usr/bin/env node

import dotenv from "dotenv";
import generateConfigFile from "./scripts/generateConfigFile.js";
import generateCoreFile from "./scripts/generateCoreFile.js";
import getConfig from "./scripts/utils/getConfig.js";
import generateComponentsFile from "./scripts/generateComponentsFile.js";
import generatePreflightFile from "./scripts/generatePreflightFile.js";

dotenv.config();

const install = async () => {
  if (!process.env.FIGMA_TOKEN) {
    throw new Error("❌ FIGMA_TOKEN is not defined in environment variables");
  }
  try {
    generateConfigFile();
    const config = getConfig();
    const addComponents = process.argv.includes("--add-components");
    if (config.preflight) {
      await generatePreflightFile();
    }
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
        if (!themeFileId) {
          console.warn(
            `⚠️ Warning: No file ID found for theme '${themeName}', skipping...`
          );
          continue;
        }
        await generateCoreFile(themeFileId, themeName, addComponents);
      }
    }
    if (addComponents) {
      await generateComponentsFile();
    }
    console.log("✅ Installation complete!");
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Error in install script:", error.message);
    } else {
      console.error("❌ Error in install script:", String(error));
    }
    process.exit(1);
  }
};

install();

export default install;
