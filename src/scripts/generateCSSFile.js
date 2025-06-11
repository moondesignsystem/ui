import fs from "fs";
import removeThemePrefixesFromVariables from "./utils/removeThemePrefixesFromVariables.js";
import processCoreVariables from "./processCoreVariables.js";
import processComponentVariables from "./processComponentVariables.js";

// STEP 1. Generate base CSS file

/**
 * @async
 * @returns {Promise<void>}
 * @throws {Error}
 */
const generateCSSFile = async () => {
  try {
    const { coreVariables, themes, colorCollectionName } =
      await processCoreVariables();
    const { componentVariables } = await processComponentVariables();
    const cssVariables = [...coreVariables, ...componentVariables];
    const outputPath = "base.css";
    // If fewer than 2 themes, put all variables in :root
    if (themes.length < 2) {
      const allVariables = cssVariables
        .map((v) =>
          removeThemePrefixesFromVariables(v, themes, colorCollectionName)
        )
        .sort();
      const cssContent = ":root {\n" + allVariables.join("\n") + "\n}\n";
      fs.writeFileSync(outputPath, cssContent);
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
    let cssContent = ":root {\n" + rootVariables.join("\n") + "\n}\n";
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
      cssContent += `.${theme} {\n${themeVariables.join("\n")}\n}\n`;
    });
    fs.writeFileSync(outputPath, cssContent);
  } catch (error) {
    console.error("Error in generateCSSFile script:", error);
  }
};

export default generateCSSFile;
