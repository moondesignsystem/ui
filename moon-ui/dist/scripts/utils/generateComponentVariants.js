import fs from "fs";
const updateComponentVariants = async (componentName, coreCssContent, variantsContent) => {
    let cssPattern;
    if (componentName === "chip") {
        cssPattern = `--${componentName}-(\\w+)-unselected-background`;
    }
    else {
        cssPattern = `--${componentName}-(\\w+)-background`;
    }
    const cssVariantPattern = new RegExp(cssPattern, "g");
    const foundVariants = new Set();
    let match;
    while ((match = cssVariantPattern.exec(coreCssContent)) !== null) {
        foundVariants.add(match[1]);
    }
    if (foundVariants.size === 0) {
        return variantsContent;
    }
    const variantsList = Array.from(foundVariants)
        .sort()
        .map((variant) => `"${variant}"`)
        .join(", ");
    const variableName = `$${componentName}-variants`;
    const variablePattern = new RegExp(`${variableName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}:\\s*\\([^)]*\\);`);
    return variantsContent.replace(variablePattern, `${variableName}: (${variantsList});`);
};
const generateComponentVariants = async (variantsScssPath, coreCssPath) => {
    try {
        const variantsContent = fs.readFileSync(variantsScssPath, "utf8");
        const coreCssContent = fs.readFileSync(coreCssPath, "utf8");
        const components = [
            "button",
            "icon-button",
            "chip",
            "avatar",
            "alert",
            "snackbar",
            "tag",
        ];
        let updatedContent = variantsContent;
        for (const component of components) {
            updatedContent = await updateComponentVariants(component, coreCssContent, updatedContent);
        }
        fs.writeFileSync(variantsScssPath, updatedContent, "utf8");
    }
    catch (error) {
        console.error("❌ Error in generateComponentVariants:", error);
    }
};
export default generateComponentVariants;
