import fs from "fs";
import getArgValue from "./utils/getArgValue.js";
const generateConfigFile = () => {
    try {
        const outputConfigFile = "moonconfig.json";
        const fileExists = fs.existsSync(outputConfigFile);
        let existingConfig = {};
        if (fileExists) {
            try {
                const configContent = fs.readFileSync(outputConfigFile, "utf8");
                existingConfig = JSON.parse(configContent);
            }
            catch (parseError) {
                console.warn("Warning: Could not parse existing config file, will recreate it");
                existingConfig = {};
            }
        }
        const customPrefix = getArgValue("--custom-prefix", false);
        const projectName = getArgValue("--projectName", "moon");
        const outputFolder = getArgValue("--outputFolder", "dist");
        const coreFileId = getArgValue("--coreFileId", "tvIuWlowgVG4gzXjDuVIEw");
        const componentsFileId = getArgValue("--componentsFileId", "S3q1SkVngbwHuwpxHKCsgtJj");
        const componentsProjectId = getArgValue("--componentsProjectId", "408714341");
        const target = getArgValue("--target", "tailwindcss");
        const preflight = getArgValue("--preflight", false);
        const defaultConfig = {
            projectName,
            coreFileId,
            componentsFileId,
            componentsProjectId,
            outputFolder,
            customPrefix,
            target,
            preflight,
            themes: {},
        };
        const missingProperties = Object.keys(defaultConfig).filter((key) => !(key in existingConfig));
        const hasChanges = !fileExists || missingProperties.length > 0;
        if (!hasChanges) {
            return;
        }
        if (!fileExists) {
            console.log(`Generating moonconfig.json file...`);
        }
        else if (missingProperties.length > 0) {
            console.log(`Updating moonconfig.json file...`);
        }
        const config = { ...defaultConfig, ...existingConfig };
        Object.keys(defaultConfig).forEach((key) => {
            if (!(key in existingConfig)) {
                config[key] = defaultConfig[key];
            }
        });
        fs.writeFileSync(outputConfigFile, JSON.stringify(config, null, 2) + "\n");
    }
    catch (error) {
        console.error("❌ Error in generateConfigFile script:", error);
        return;
    }
};
export default generateConfigFile;
