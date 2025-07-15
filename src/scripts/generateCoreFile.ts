import fs from "fs";
import removeThemePrefixesFromVariables from "./utils/removeThemePrefixesFromVariables.js";
import replaceVariablesByPattern from "./utils/replaceVariablesByPattern.js";
import generateTypographyUtilities from "./utils/generateTypographyUtilities.js";
import generateShadowUtilities from "./utils/generateShadowUtilities.js";
import getPackageVersion from "./utils/getPackageVersion.js";
import generateGenericUtilities from "./utils/generateGenericUtilities.js";
import generateBorderUtilities from "./utils/generateBorderUtilities.js";
import processCoreVariables from "./processCoreVariables.js";
import processComponentVariables from "./processComponentVariables.js";
import getConfig from "./utils/getConfig.js";

// STEP 1. Generate base CSS file
const generateCoreFile = async (
  coreFileId: string,
  projectName: string,
  addComponents: boolean
) => {
  try {
    console.log(`Generating ${projectName}-core.css file...`);
    const config = getConfig();
    const outputFolder = config.outputFolder;
    const isTailwind = config.target === "tailwindcss";
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
      const cssContent = isTailwind
        ? "@theme {\n" + allVariables.join("\n") + "\n}\n"
        : ":root {\n" + allVariables.join("\n") + "\n}\n";
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
    let cssContent = isTailwind
      ? "@theme inline {\n" + rootVariables.join("\n") + "\n}\n"
      : ":root {\n" + rootVariables.join("\n") + "\n}\n";
    const themedVariablePattern = new RegExp(
      `--(${colorCollectionName}|semantic)-[a-zA-Z0-9-]+`,
      "i"
    );
    const themedVariables = cssVariables.filter((v) =>
      themedVariablePattern.test(v)
    );
    cssContent += isTailwind ? `@layer theme {\n` : "";
    themes.forEach((theme) => {
      const themePattern = new RegExp(
        `--${colorCollectionName}-${theme}-`,
        "i"
      );
      let themeVariables = themedVariables
        .filter(
          (v) =>
            themePattern.test(v) || !v.startsWith(`--${colorCollectionName}-`)
        )
        .map((variable) => {
          if (themePattern.test(variable)) {
            const themePrefix = `--${colorCollectionName}-${theme}-`;
            const replacementPrefix = `--${colorCollectionName}-`;
            variable = variable.replace(themePrefix, replacementPrefix);
          }
          return removeThemePrefixesFromVariables(
            variable,
            themes,
            colorCollectionName
          );
        })
        .sort();
      let themeContent = themeVariables.join("\n");
      const themePatternForReplacement = themes.join("|");
      const themeRegexForReplacement = new RegExp(
        `--color-(${themePatternForReplacement})-`,
        "g"
      );
      themeContent = themeContent.replace(themeRegexForReplacement, "--color-");
      cssContent += `.${theme}-theme {\n${themeContent}\n}\n`;
    });
    cssContent += isTailwind ? `}\n` : "";
    cssContent = replaceVariablesByPattern(cssContent);
    cssContent += `${generateTypographyUtilities(isTailwind, cssContent)}\n`;
    cssContent += `${generateShadowUtilities(isTailwind, cssContent)}\n`;
    cssContent += isTailwind ? `${generateBorderUtilities()}\n` : "";
    cssContent += isTailwind ? `${generateGenericUtilities()}\n` : "";
    const version = getPackageVersion();
    const versionComment = `/* Moon UI v${version} */\n`;
    const cssWithVersionComment = versionComment + cssContent;
    fs.writeFileSync(outputCoreFile, cssWithVersionComment);
  } catch (error) {
    console.error("❌ Error in generateCoreFile script:", error);
    return;
  }
};

export default generateCoreFile;
