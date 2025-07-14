import fs from "fs";
import getArgValue from "./utils/getArgValue.js";
const generateConfigFile = () => {
    try {
        const outputConfigFile = "moonconfig.json";
        if (fs.existsSync(outputConfigFile)) {
            return;
        }
        console.log(`Generating moonconfig.json file...`);
        let projectName = "moon";
        let outputFolder = "dist";
        let coreFileId = "BZiHkvF7pXFHrFH8P0cG2T";
        let componentsFileId = "S3q1SkVngbwHuwpxHKCsgtJj";
        const customPrefix = process.argv.includes("--custom-prefix");
        projectName = getArgValue("--projectName", projectName);
        outputFolder = getArgValue("--outputFolder", outputFolder);
        coreFileId = getArgValue("--coreFileId", coreFileId);
        componentsFileId = getArgValue("--componentsFileId", componentsFileId);
        const config = {
            projectName,
            coreFileId,
            componentsFileId,
            outputFolder,
            customPrefix,
            themes: {},
        };
        fs.writeFileSync(outputConfigFile, JSON.stringify(config, null, 2) + "\n");
    }
    catch (error) {
        console.error("❌ Error in generateConfigFile script:", error);
        return;
    }
};
export default generateConfigFile;
