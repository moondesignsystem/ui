import generateCSSFile from "./scripts/generateCSSFile.js";
import generateTWFile from "./scripts/generateTWFile.js";

const install = async () => {
  try {

  await generateCSSFile();
  await generateTWFile();
  } catch (error) {
    console.error("Error in install script:", error);
  }
};

install();

export default install;
