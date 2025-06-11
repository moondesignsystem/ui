import getConfig from "./getConfig.js";
import generateCoreFile from "./generateCoreFile.js";

const generateThemeFile = async (fileId, projectName) => {
  try {
    const config = getConfig();
    const originalCore = config.core;
    const originalProject = config.project;
    config.core = fileId;
    config.project = projectName;
    await generateCoreFile(config);
    config.core = originalCore;
    config.project = originalProject;
  } catch (error) {
    console.error("Error in generateThemeFile script:", error);
  }
};

export default generateThemeFile;
