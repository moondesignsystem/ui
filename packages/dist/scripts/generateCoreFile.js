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
const generateCoreFile = async (coreFileId, projectName, addComponents) => {
    try {
        console.log(`Generating ${projectName}-core.css file...`);
        const config = getConfig();
        const outputFolder = config.outputFolder;
        const isTailwind = config.target === "tailwindcss";
        const { coreVariables, themes, colorCollectionName } = await processCoreVariables(coreFileId);
        let cssVariables = [...coreVariables];
        if (addComponents) {
            const { componentVariables } = await processComponentVariables();
            cssVariables = [...coreVariables, ...componentVariables];
        }
        if (!fs.existsSync(outputFolder)) {
            fs.mkdirSync(outputFolder, { recursive: true });
        }
        const outputCoreFile = `${outputFolder}/${projectName}-core.css`;
        const version = getPackageVersion();
        const versionComment = `/* Moon UI v${version} */\n`;
        if (themes.length < 2) {
            const allVariables = cssVariables
                .map((v) => removeThemePrefixesFromVariables(v, themes, colorCollectionName))
                .sort();
            const cssContent = isTailwind
                ? "@theme {\n" + allVariables.join("\n") + "\n}\n"
                : ":root {\n" + allVariables.join("\n") + "\n}\n";
            fs.writeFileSync(outputCoreFile, versionComment + cssContent);
            return;
        }
        const colorVariablePattern = new RegExp(`^--${colorCollectionName}-[a-zA-Z0-9-]+:`, "i");
        let cssContent;
        if (isTailwind) {
            const defaultTheme = themes[0];
            const defaultThemePattern = new RegExp(`--${colorCollectionName}-${defaultTheme}-`, "i");
            const defaultThemeVariables = cssVariables.filter((v) => defaultThemePattern.test(v));
            const nonThemeVariables = cssVariables
                .filter((v) => !colorVariablePattern.test(v))
                .map((v) => removeThemePrefixesFromVariables(v, themes, colorCollectionName));
            const themedVariablesWithDefaults = cssVariables
                .filter((v) => colorVariablePattern.test(v) ||
                v.includes(`var(--${colorCollectionName}-`) ||
                v.includes("var(--context-"))
                .map((v) => {
                const cleaned = removeThemePrefixesFromVariables(v, themes, colorCollectionName);
                const varName = cleaned.split(":")[0];
                const defaultVariable = defaultThemeVariables.find((defaultVar) => {
                    const defaultCleaned = removeThemePrefixesFromVariables(defaultVar, themes, colorCollectionName);
                    return defaultCleaned.split(":")[0] === varName;
                });
                if (defaultVariable) {
                    return removeThemePrefixesFromVariables(defaultVariable, themes, colorCollectionName);
                }
                return cleaned;
            })
                .filter((variable) => {
                const value = variable.split(":")[1]?.trim() || "";
                return !value.startsWith("rgb(");
            })
                .filter((name, index, arr) => arr.indexOf(name) === index);
            const allVariables = [
                ...nonThemeVariables,
                ...themedVariablesWithDefaults,
            ]
                .filter((name, index, arr) => arr.indexOf(name) === index)
                .sort();
            cssContent = "@theme inline {\n" + allVariables.join("\n") + "\n}\n";
        }
        else {
            const rootVariables = cssVariables
                .filter((v) => !colorVariablePattern.test(v))
                .map((v) => removeThemePrefixesFromVariables(v, themes, colorCollectionName))
                .sort();
            cssContent = ":root {\n" + rootVariables.join("\n") + "\n}\n";
        }
        const themedVariablePattern = new RegExp(`--(${colorCollectionName}|semantic|component|context)-[a-zA-Z0-9-]+`, "i");
        let themedVariables;
        if (isTailwind) {
            themedVariables = cssVariables.filter((v) => {
                return (themedVariablePattern.test(v) ||
                    colorVariablePattern.test(v) ||
                    v.includes(`var(--${colorCollectionName}-`) ||
                    v.includes("var(--context-"));
            });
        }
        else {
            themedVariables = cssVariables.filter((v) => colorVariablePattern.test(v));
        }
        cssContent += isTailwind ? `@layer theme {\n` : "";
        themes.forEach((theme) => {
            const themePattern = new RegExp(`--${colorCollectionName}-${theme}-`, "i");
            let themeVariables = themedVariables
                .filter((v) => themePattern.test(v) ||
                !v.startsWith(`--${colorCollectionName}-`) ||
                v.includes(`var(--${colorCollectionName}-`) ||
                v.includes("var(--context-"))
                .map((variable) => {
                if (themePattern.test(variable)) {
                    const themePrefix = `--${colorCollectionName}-${theme}-`;
                    const replacementPrefix = `--${colorCollectionName}-`;
                    variable = variable.replace(themePrefix, replacementPrefix);
                }
                return removeThemePrefixesFromVariables(variable, themes, colorCollectionName);
            })
                .filter((name, index, arr) => arr.indexOf(name) === index)
                .sort();
            let themeContent = themeVariables.join("\n");
            const themePatternForReplacement = themes.join("|");
            const themeRegexForReplacement = new RegExp(`--color-(${themePatternForReplacement})-`, "g");
            themeContent = themeContent.replace(themeRegexForReplacement, "--color-");
            cssContent += `.${theme}-theme {\n${themeContent}\n}\n`;
        });
        cssContent += isTailwind ? `}\n` : "";
        cssContent = replaceVariablesByPattern(cssContent);
        cssContent += `${generateTypographyUtilities(isTailwind, cssContent)}\n`;
        cssContent += `${generateShadowUtilities(isTailwind, cssContent)}\n`;
        cssContent += isTailwind ? `${generateBorderUtilities()}\n` : "";
        cssContent += isTailwind ? `${generateGenericUtilities()}\n` : "";
        fs.writeFileSync(outputCoreFile, versionComment + cssContent);
    }
    catch (error) {
        console.error("❌ Error in generateCoreFile script:", error);
        return;
    }
};
export default generateCoreFile;
