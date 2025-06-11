import fs from "fs";
import path from "path";

/**
 * Gets the package version from package.json
 * @returns {string} Version string from package.json
 */
const getPackageVersion = () => {
  try {
    const packageJsonPath = path.resolve(process.cwd(), "package.json");
    const packageData = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    return packageData.version || "0.0.0";
  } catch (error) {
    console.error("Error in getPackageVersion script:", error);
  }
};

export default getPackageVersion;
