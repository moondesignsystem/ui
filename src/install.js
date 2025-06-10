import generateCSSFile from "./generateCSSFile.js";
import generateTWFile from "./generateTWFile.js";

const install = async () => {
  await generateCSSFile();
  await generateTWFile();
};

install();

export default install;
