import fs from "fs";
import path from "path";
import * as sass from "sass";
import getConfig from "./getConfig.js";
import getPackageVersion from "./utils/getPackageVersion.js";

/**
 * Compiles SCSS files from src/components into a single CSS file
 * @async
 * @param {Object} [configOverride] - Optional config override object
 * @returns {Promise<void>}
 * @throws {Error}
 */
const generateComponentsFile = async (configOverride = null) => {
  try {
    const config = configOverride || getConfig();
    if (!fs.existsSync(config.output)) {
      fs.mkdirSync(config.output, { recursive: true });
    }
    const outputComponentsFile = `${config.output}/${config.project}-components.css`;
    const mainScssPath = path.resolve(
      process.cwd(),
      "src/components/main.scss"
    );
    const result = sass.compile(mainScssPath, {
      style: "compressed",
      sourceMap: true,
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
