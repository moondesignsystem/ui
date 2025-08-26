const shadowRegex = /--style-shadow-(\d+)-/g;
const generateShadowUtilities = (isTailwind, cssContent) => {
    const shadowSizes = new Set();
    let match;
    while ((match = shadowRegex.exec(cssContent))) {
        const size = match[1];
        shadowSizes.add(size);
    }
    const uniqueSizes = Array.from(shadowSizes).sort((a, b) => parseInt(a) - parseInt(b));
    const result = uniqueSizes
        .map((size) => {
        const selector = `shadow-${size}`;
        const properties = `box-shadow: \n` +
            `var(--style-shadow-${size}-layer-1-x) \n` +
            `var(--style-shadow-${size}-layer-1-y) \n` +
            `var(--style-shadow-${size}-layer-1-blur) \n` +
            `var(--style-shadow-${size}-layer-1-spread) \n` +
            `var(--style-shadow-${size}-layer-1-color),\n` +
            `var(--style-shadow-${size}-layer-2-x) \n` +
            `var(--style-shadow-${size}-layer-2-y) \n` +
            `var(--style-shadow-${size}-layer-2-blur) \n` +
            `var(--style-shadow-${size}-layer-2-spread) \n` +
            `var(--style-shadow-${size}-layer-2-color);`;
        return isTailwind
            ? `@utility ${selector} {\n${properties}\n}`
            : `.${selector} {\n${properties}\n}`;
    })
        .join("\n");
    return result;
};
export default generateShadowUtilities;
