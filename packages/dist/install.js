#!/usr/bin/env node
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import generateConfigFile from "./scripts/generateConfigFile.js";
import generateCoreFile from "./scripts/generateCoreFile.js";
import getConfig from "./scripts/utils/getConfig.js";
import generateComponentsFile from "./scripts/generateComponentsFile.js";
import generatePreflightFile from "./scripts/generatePreflightFile.js";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const copyFile = (sourceFile, targetFile, fileName) => {
    if (fs.existsSync(sourceFile)) {
        fs.copyFileSync(sourceFile, targetFile);
        console.log(`✅ Copied ${fileName}`);
    }
    else {
        console.warn(`⚠️ Warning: ${fileName} not found at ${sourceFile}`);
    }
};
const handleError = (error, context) => {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`❌ Error in ${context}:`, message);
    process.exit(1);
};
const copyExistingFiles = async (addComponents) => {
    console.log("ℹ️ FIGMA_TOKEN not found. Copying existing CSS files...");
    generateConfigFile();
    const config = getConfig();
    const outputDir = config.outputFolder || "packages/dist/styles";
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    // Get the directory where this package's CSS files are located
    // __dirname points to packages/dist, so we need to go to styles subdirectory
    const sourceDir = path.join(__dirname, "styles");
    copyFile(path.join(sourceDir, "moon-core.css"), path.join(outputDir, "moon-core.css"), "moon-core.css");
    if (addComponents) {
        copyFile(path.join(sourceDir, "moon-components.css"), path.join(outputDir, "moon-components.css"), "moon-components.css");
    }
};
const generateFromFigma = async (addComponents) => {
    generateConfigFile();
    const config = getConfig();
    if (config.preflight) {
        await generatePreflightFile();
    }
    await generateCoreFile(config.coreFileId, config.projectName, addComponents);
    const themes = config.themes || {};
    for (const [themeName, themeFileId] of Object.entries(themes)) {
        if (!themeFileId) {
            console.warn(`⚠️ Warning: No file ID found for theme '${themeName}', skipping...`);
            continue;
        }
        await generateCoreFile(themeFileId, themeName, addComponents);
    }
    if (addComponents) {
        await generateComponentsFile();
    }
};
const install = async () => {
    const addComponents = process.argv.includes("--add-components");
    try {
        if (!process.env.FIGMA_TOKEN) {
            await copyExistingFiles(addComponents);
        }
        else {
            await generateFromFigma(addComponents);
        }
        console.log("✅ Installation complete!");
    }
    catch (error) {
        handleError(error, process.env.FIGMA_TOKEN ? "install script" : "copying CSS files");
    }
};
install();
export default install;
