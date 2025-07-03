import path from "path";
import fs from "fs";

const getConfig = () => {
  try {
    const configPath = path.resolve(process.cwd(), "moonconfig.json");
    if (fs.existsSync(configPath)) {
      const configData = fs.readFileSync(configPath, "utf8");
      return JSON.parse(configData);
    }
    throw new Error("moonconfig.json not found");
  } catch (error) {
    console.error("❌ Error in getConfig script:", error);
    return;
  }
};

export default getConfig;
