import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as sass from "sass";
import getConfig from "./utils/getConfig.js";
import getPackageVersion from "./utils/getPackageVersion.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, "../..");

const generatePreflightFile = async () => {
  try {
    const config = getConfig();
    console.log(`Generating ${config.projectName}-preflight.css file...`);
    if (!fs.existsSync(config.outputFolder)) {
      fs.mkdirSync(config.outputFolder, { recursive: true });
    }
    const outputPreflightFile = `${config.outputFolder}/${config.projectName}-preflight.css`;
    const preflightCssPath = path.resolve(
      packageRoot,
      "src/styles/preflight.css"
    );
    const result = sass.compile(preflightCssPath, {
      style: "compressed",
      sourceMap: true,
      loadPaths: [path.resolve(packageRoot, "src/styles")],
    });
    const version = getPackageVersion();
    const versionComment = `/* Moon UI v${version} */\n`;
    const cssWithVersionComment =
      versionComment + `@layer base {\n` + result.css + `\n}\n`;
    fs.writeFileSync(outputPreflightFile, cssWithVersionComment);
  } catch (error) {
    console.error("❌ Error in generatePreflightFile script:", error);
    return;
  }
};

export default generatePreflightFile;
