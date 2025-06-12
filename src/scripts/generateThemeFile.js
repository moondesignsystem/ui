import getConfig from "./getConfig.js";
import generateCoreFile from "./generateCoreFile.js";

const generateThemeFile = async (fileId, projectName) => {
  try {
    const config = getConfig();
    const originalCore = config.coreFileId;
    const originalProject = config.projectName;
    config.coreFileId = fileId;
    config.projectName = projectName;
    await generateCoreFile(config);
    config.coreFileId = originalCore;
    config.projectName = originalProject;
  } catch (error) {
    console.error("Error in generateThemeFile script:", error);
  }
};

export default generateThemeFile;
