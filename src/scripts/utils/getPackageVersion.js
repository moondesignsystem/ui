import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, "../../..");

/**
 * Gets the package version from package.json
 * @returns {string} Version string from package.json
 */
const getPackageVersion = () => {
  try {
    const packageJsonPath = path.resolve(packageRoot, "package.json");
    const packageData = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    return packageData.version || "0.0.0";
  } catch (error) {
    console.error("❌ Error in getPackageVersion script:", error);
  }
};

export default getPackageVersion;
