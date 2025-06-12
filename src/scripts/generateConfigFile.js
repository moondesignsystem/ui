import fs from "fs";

const generateConfigFile = () => {
  try {
    const outputConfigFile = "moon.config.json";
    if (fs.existsSync(outputConfigFile)) {
      return;
    }
    let project = "moon";
    let output = "dist";
    let core = "BZiHkvF7pXFHrFH8P0cG2T";
    let components = "S3q1SkVngbwHuwpxHKCsgtJj";
    const getArgValue = (flag, value) => {
      const index = process.argv.findIndex((arg) => arg === flag);
      return index !== -1 && process.argv[index + 1]
        ? process.argv[index + 1]
        : value;
    };
    project = getArgValue("--project", project);
    output = getArgValue("--output", output);
    core = getArgValue("--core", core);
    components = getArgValue("--components", components);
    const config = {
      project,
      core,
      components,
      themes: {},
      output,
    };
    fs.writeFileSync(outputConfigFile, JSON.stringify(config, null, 2) + "\n");
  } catch (error) {
    console.error("Error in generateConfigFile script:", error);
  }
};

export default generateConfigFile;
