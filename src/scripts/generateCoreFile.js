import fs from "fs";
import removeThemePrefixesFromVariables from "./utils/removeThemePrefixesFromVariables.js";
import replaceVariablesByPattern from "./utils/replaceVariablesByPattern.js";
import generateTypographyUtilities from "./utils/generateTypographyUtilities.js";
import generateShadowUtilities from "./utils/generateShadowUtilities.js";
import getPackageVersion from "./utils/getPackageVersion.js";
import processCoreVariables from "./processCoreVariables.js";
import processComponentVariables from "./processComponentVariables.js";
import getConfig from "./getConfig.js";

// STEP 1. Generate base CSS file

/**
 * @async
 * @param {Object} - Optional config override object
 * @returns {Promise<void>}
 * @throws {Error}
 */
const generateCoreFile = async (coreFileId, projectName, addComponents) => {
  try {
    console.log(`Generating ${projectName}-core.css file...`);
    const config = getConfig();
    const outputFolder = config.outputFolder;
    const { coreVariables, themes, colorCollectionName } =
      await processCoreVariables(coreFileId);
    let cssVariables = [...coreVariables];
    if (addComponents) {
      const { componentVariables } = await processComponentVariables();
      cssVariables = [...coreVariables, ...componentVariables];
    }
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder, { recursive: true });
    }
    const outputCoreFile = `${outputFolder}/${projectName}-core.css`;
    // If fewer than 2 themes, put all variables in :root
    if (themes.length < 2) {
      const allVariables = cssVariables
        .map((v) =>
          removeThemePrefixesFromVariables(v, themes, colorCollectionName)
        )
        .sort();
      const cssContent =
        "@theme inline {\n" + allVariables.join("\n") + "\n}\n";
      fs.writeFileSync(outputCoreFile, cssContent);
      return;
    }
    // Otherwise, separate root and theme variables
    const colorVariablePattern = new RegExp(
      `^--${colorCollectionName}-[a-zA-Z0-9-]+:`,
      "i"
    );
    const rootVariables = cssVariables
      .filter((v) => !colorVariablePattern.test(v))
      .map((v) =>
        removeThemePrefixesFromVariables(v, themes, colorCollectionName)
      )
      .sort();
    let cssContent = "@theme inline {\n" + rootVariables.join("\n") + "\n}\n";
    const colorVariables = cssVariables.filter((v) =>
      colorVariablePattern.test(v)
    );
    themes.forEach((theme) => {
      const themePattern = new RegExp(`--${colorCollectionName}-${theme}`, "i");
      const themeVariables = colorVariables
        .filter((v) => themePattern.test(v))
        .map((variable) => {
          const themePrefix = `--${colorCollectionName}-${theme}-`;
          const replacementPrefix = `--${colorCollectionName}-`;
          const renamedVariable = variable.replace(
            themePrefix,
            replacementPrefix
          );
          return removeThemePrefixesFromVariables(
            renamedVariable,
            themes,
            colorCollectionName
          );
        })
        .sort();
      cssContent += `@custom-variant ${theme} (&:where(.${theme}, .${theme} *));\n`;
      cssContent += `@variant ${theme} {\n`;
      cssContent += `@theme inline {\n${themeVariables.join("\n")}\n}\n}\n`;
    });
    cssContent = replaceVariablesByPattern(cssContent);
    cssContent += generateTypographyUtilities(cssContent);
    cssContent += generateShadowUtilities(cssContent);
    const version = getPackageVersion();
    const versionComment = `/* Moon UI v${version} */\n`;
    const cssWithVersionComment = versionComment + cssContent;
    fs.writeFileSync(outputCoreFile, cssWithVersionComment);
  } catch (error) {
    console.error("Error in generateCoreFile script:", error);
  }
};

export default generateCoreFile;
