import path from "path";
import fs from "fs";

const getConfig = () => {
  try {
    const configPath = path.resolve(process.cwd(), "moon.config.json");
    if (fs.existsSync(configPath)) {
      const configData = fs.readFileSync(configPath, "utf8");
      return JSON.parse(configData);
    }
    throw new Error("moon.config.json not found");
  } catch (error) {
    console.error("Error in getConfig script:", error);
    return null;
  }
};

export default getConfig;
