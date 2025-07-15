import fs from "fs";
import getArgValue from "./utils/getArgValue.js";

const generateConfigFile = () => {
  try {
    const outputConfigFile = "moonconfig.json";
    if (fs.existsSync(outputConfigFile)) {
      return;
    }
    console.log(`Generating moonconfig.json file...`);
    const customPrefix = process.argv.includes("--custom-prefix");
    const projectName = getArgValue("--projectName", "moon");
    const outputFolder = getArgValue("--outputFolder", "dist");
    const coreFileId = getArgValue("--coreFileId", "BZiHkvF7pXFHrFH8P0cG2T");
    const componentsFileId = getArgValue(
      "--componentsFileId",
      "S3q1SkVngbwHuwpxHKCsgtJj"
    );
    const target = getArgValue("--target", "tailwindcss");
    const config = {
      projectName,
      coreFileId,
      componentsFileId,
      outputFolder,
      customPrefix,
      target,
      themes: {},
    };
    fs.writeFileSync(outputConfigFile, JSON.stringify(config, null, 2) + "\n");
  } catch (error) {
    console.error("❌ Error in generateConfigFile script:", error);
    return;
  }
};

export default generateConfigFile;
