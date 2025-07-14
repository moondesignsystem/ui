import path from "path";
import fs from "fs";

interface Config {
  coreFileId: string;
  componentsFileId: string;
  projectName: string;
  outputFolder: string;
  themes?: Record<string, string>;
  customPrefix?: boolean;
}

const getConfig = () => {
  try {
    const configPath = path.resolve(process.cwd(), "moonconfig.json");
    if (!fs.existsSync(configPath)) {
      throw new Error("❌ moonconfig.json not found in current directory");
    }
    const configData = fs.readFileSync(configPath, "utf8");
    const config = JSON.parse(configData) as Config;
    if (!config.coreFileId) {
      throw new Error(
        "❌ Missing required field 'coreFileId' in moonconfig.json"
      );
    }
    if (!config.projectName) {
      throw new Error(
        "❌ Missing required field 'projectName' in moonconfig.json"
      );
    }
    if (!config.outputFolder) {
      throw new Error(
        "❌ Missing required field 'outputFolder' in moonconfig.json"
      );
    }
    return config;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`❌ Invalid JSON in moonconfig.json: ${error.message}`);
    }
    throw error;
  }
};

export default getConfig;
