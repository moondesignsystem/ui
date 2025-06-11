import fs from "fs";

const generateConfigFile = () => {
  try {
    const outputConfigFile = "moon.config.json";
    if (fs.existsSync(outputConfigFile)) {
      return;
    }
    const config = {
      project: "moon",
      core: "BZiHkvF7pXFHrFH8P0cG2T",
      components: "S3q1SkVngbwHuwpxHKCsgtJj",
      themes: {},
      output: "dist",
    };
    fs.writeFileSync(outputConfigFile, JSON.stringify(config, null, 2) + "\n");
  } catch (error) {
    console.error("Error in generateConfigFile script:", error);
  }
};

export default generateConfigFile;
