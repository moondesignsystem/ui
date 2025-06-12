import fs from "fs";

const generateConfigFile = () => {
  try {
    const outputConfigFile = "moon.config.json";
    if (fs.existsSync(outputConfigFile)) {
      return;
    }
    console.log(`Generating moon.config.json file...`);
    let projectName = "moon";
    let outputFolder = "dist";
    let coreFileId = "BZiHkvF7pXFHrFH8P0cG2T";
    let componentsFileId = "S3q1SkVngbwHuwpxHKCsgtJj";
    const getArgValue = (flag, value) => {
      const index = process.argv.findIndex((arg) => arg === flag);
      return index !== -1 && process.argv[index + 1]
        ? process.argv[index + 1]
        : value;
    };
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
  } catch (error) {
    console.error("Error in generateConfigFile script:", error);
  }
};

export default generateConfigFile;
