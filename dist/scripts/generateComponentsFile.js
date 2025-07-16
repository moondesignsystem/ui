import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as sass from "sass";
import getConfig from "./utils/getConfig.js";
import getPackageVersion from "./utils/getPackageVersion.js";
import replaceClassPrefix from "./utils/replaceClassPrefix.js";
import generateComponentVariants from "./utils/generateComponentVariants.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, "../..");
const generateComponentsFile = async () => {
    try {
        const config = getConfig();
        console.log(`Generating ${config.projectName}-components.css file...`);
        if (!fs.existsSync(config.outputFolder)) {
            fs.mkdirSync(config.outputFolder, { recursive: true });
        }
        const outputComponentsFile = `${config.outputFolder}/${config.projectName}-components.css`;
        const coreCssPath = `${config.outputFolder}/${config.projectName}-core.css`;
        const mainScssPath = path.resolve(packageRoot, "src/styles/components/main.scss");
        const variantsScssPath = path.resolve(packageRoot, "src/styles/components/_variants.scss");
        await generateComponentVariants(variantsScssPath, coreCssPath);
        const result = sass.compile(mainScssPath, {
            style: "compressed",
            sourceMap: true,
            loadPaths: [path.resolve(packageRoot, "src/styles/components")],
        });
        const version = getPackageVersion();
        const versionComment = `/* Moon UI v${version} */\n`;
        const cssWithPrefixReplaced = replaceClassPrefix(result.css);
        const cssWithVersionComment = versionComment +
            `@layer components {\n` +
            cssWithPrefixReplaced +
            `\n}\n`;
        fs.writeFileSync(outputComponentsFile, cssWithVersionComment);
    }
    catch (error) {
        console.error("❌ Error in generateComponentsFile script:", error);
        return;
    }
};
export default generateComponentsFile;
