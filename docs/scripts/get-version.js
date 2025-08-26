#!/usr/bin/env node

import fs from "fs";
import path from "path";

const extractVersionFromCSS = () => {
  try {
    const cssPath = path.join(
      process.cwd(),
      "../packages/dist/styles/moon-core.css"
    );
    const cssContent = fs.readFileSync(cssPath, "utf8");
    const versionMatch = cssContent.match(/\/\*\s*Moon UI\s+v([\d.]+)\s*\*\//);
    if (versionMatch) {
      return versionMatch[1];
    }
  } catch (error) {
    console.warn("Could not read version from CSS file:", error.message);
  }
  try {
    const packagePath = path.join(process.cwd(), "../packages/package.json");
    const packageContent = JSON.parse(fs.readFileSync(packagePath, "utf8"));
    return packageContent.version;
  } catch (error) {
    console.warn("Could not read version from package.json:", error.message);
    return "2.0.0";
  }
};

const version = extractVersionFromCSS();
