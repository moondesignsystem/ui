#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

/**
 * Extract all CSS variables from moon-core.css
 */
function extractCSSVariables(cssFilePath) {
  try {
    const cssContent = fs.readFileSync(cssFilePath, "utf8");
    const variableRegex = /--([a-zA-Z0-9-]+):/g;
    const variables = new Set();

    let match;
    while ((match = variableRegex.exec(cssContent)) !== null) {
      variables.add(match[1]);
    }

    return variables;
  } catch (error) {
    console.error(`Error reading CSS file: ${error.message}`);
    return new Set();
  }
}

/**
 * Extract all CSS variable references from CSS content
 */
function extractCSSVariableReferences(cssContent, filePath) {
  const variableRegex = /var\(--([a-zA-Z0-9-]+)\)/g;
  const variables = new Map();

  let match;
  while ((match = variableRegex.exec(cssContent)) !== null) {
    const variableName = match[1];
    if (!variables.has(variableName)) {
      variables.set(variableName, []);
    }

    // Find line number
    const lines = cssContent.substring(0, match.index).split("\n");
    const lineNumber = lines.length;
    const lineContent = cssContent.split("\n")[lineNumber - 1].trim();

    variables.get(variableName).push({
      line: lineNumber,
      content: lineContent,
      file: filePath,
    });
  }

  return variables;
}

/**
 * Process the moon-components.css file
 */
function processComponentsCSS(componentsFilePath) {
  const allVariableReferences = new Map();

  try {
    const cssContent = fs.readFileSync(componentsFilePath, "utf8");
    const variables = extractCSSVariableReferences(
      cssContent,
      "moon-components.css"
    );

    variables.forEach((occurrences, variableName) => {
      if (!allVariableReferences.has(variableName)) {
        allVariableReferences.set(variableName, []);
      }
      allVariableReferences.get(variableName).push(...occurrences);
    });
  } catch (error) {
    console.error(`Error reading CSS file: ${error.message}`);
  }

  return allVariableReferences;
}

/**
 * Check for undefined variables
 */
function checkUndefinedVariables(definedVariables, usedVariables) {
  const undefinedVariables = new Map();

  usedVariables.forEach((occurrences, variableName) => {
    if (!definedVariables.has(variableName)) {
      undefinedVariables.set(variableName, occurrences);
    }
  });

  return undefinedVariables;
}

/**
 * Generate and display the report
 */
function generateReport(undefinedVariables) {
  console.log("\n🔴 UNDEFINED CSS VARIABLES:");
  console.log("=".repeat(50));

  if (undefinedVariables.size === 0) {
    console.log("✅ All CSS variables are properly defined!");
    return;
  }

  const sortedUndefined = Array.from(undefinedVariables.entries()).sort(
    (a, b) => a[0].localeCompare(b[0])
  );

  sortedUndefined.forEach(([variableName]) => {
    console.log(`--${variableName}`);
  });
  console.log("=".repeat(50));
  console.log(`🔴 Found ${undefinedVariables.size} undefined variables!`);
}

/**
 * Main function
 */
function main() {
  const projectRoot = process.cwd();
  const cssFilePath = path.join(
    projectRoot,
    "packages/dist/styles/moon-core.css"
  );
  const componentsFilePath = path.join(
    projectRoot,
    "packages/dist/styles/moon-components.css"
  );

  console.log(
    "🔍 Checking CSS variables in moon-components.css against defined variables...\n"
  );

  // Check if files exist
  if (!fs.existsSync(cssFilePath)) {
    console.error(`❌ CSS file not found: ${cssFilePath}`);
    console.log(
      "Please make sure moon-core.css exists in packages/dist/styles/"
    );
    process.exit(1);
  }

  if (!fs.existsSync(componentsFilePath)) {
    console.error(`❌ Components CSS file not found: ${componentsFilePath}`);
    console.log(
      "Please make sure moon-components.css exists in packages/dist/styles/"
    );
    process.exit(1);
  }

  // Extract variables from both files
  const coreVariables = extractCSSVariables(cssFilePath);
  const componentVariables = extractCSSVariables(componentsFilePath);

  // Combine all defined variables
  const allDefinedVariables = new Set([
    ...coreVariables,
    ...componentVariables,
  ]);

  console.log(`Total defined variables: ${allDefinedVariables.size}`);

  // Extract used variables
  const usedVariables = processComponentsCSS(componentsFilePath);

  // Check for undefined variables
  const undefinedVariables = checkUndefinedVariables(
    allDefinedVariables,
    usedVariables
  );

  // Generate report
  generateReport(undefinedVariables);

  // Exit with appropriate code
  process.exit(undefinedVariables.size > 0 ? 1 : 0);
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  extractCSSVariables,
  extractCSSVariableReferences,
  processComponentsCSS,
  checkUndefinedVariables,
};
