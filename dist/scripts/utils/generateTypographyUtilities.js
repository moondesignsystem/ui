const fontSizeRegex = /--text-([a-zA-Z0-9]+)-(\d+)-font-size\s*:\s*[^;]+;/g;
const generateTypographyUtilities = (isTailwind, cssContent) => {
    const groups = [];
    let match;
    while ((match = fontSizeRegex.exec(cssContent))) {
        const name = match[1];
        const size = match[2];
        groups.push({ name, size });
    }
    const uniqueGroups = Array.from(new Set(groups.map((g) => `${g.name}-${g.size}`))).map((str) => {
        const [name, size] = str.split("-");
        return { name, size };
    });
    const result = uniqueGroups
        .map(({ name, size }) => {
        const selector = `text-${name}-${size}`;
        return isTailwind
            ? `@utility ${selector} {\n`
            : `.${selector} {\n` +
                `font-size: var(--text-${name}-${size}-font-size);\n` +
                `line-height: var(--text-${name}-${size}-line-height);\n` +
                `font-weight: var(--text-${name}-${size}-font-weight);\n` +
                `font-family: var(--text-${name}-${size}-font-family);\n` +
                `}`;
    })
        .join("\n");
    return result;
};
export default generateTypographyUtilities;
