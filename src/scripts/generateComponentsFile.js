import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as sass from "sass";
import getConfig from "./getConfig.js";
import getPackageVersion from "./utils/getPackageVersion.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, "../..");

/**
 * Compiles SCSS files from src/components into a single CSS file
 * @async
 * @param {Object} - Optional config override object
 * @returns {Promise<void>}
 * @throws {Error}
 */
const generateComponentsFile = async () => {
  try {
    const config = getConfig();
    console.log(`Generating ${config.projectName}-components.css file...`);
    if (!fs.existsSync(config.outputFolder)) {
      fs.mkdirSync(config.outputFolder, { recursive: true });
    }
    const outputComponentsFile = `${config.outputFolder}/${config.projectName}-components.css`;
    const mainScssPath = path.resolve(packageRoot, "src/components/main.scss");
    const result = sass.compile(mainScssPath, {
      style: "compressed",
      sourceMap: true,
      loadPaths: [path.resolve(packageRoot, "src/components")],
    });
    const version = getPackageVersion();
    const versionComment = `/* Moon UI v${version} */\n`;
    const cssWithVersionComment = versionComment + result.css;
    fs.writeFileSync(outputComponentsFile, cssWithVersionComment);
  } catch (error) {
    console.error("Error in generateComponentsFile script:", error);
  }
};

export default generateComponentsFile;
