const fontSizeRegex = /--style-text-([a-zA-Z0-9]+)-font-size\s*:\s*[^;]+;/g;

const generateTypographyUtilities = (
  isTailwind: boolean,
  cssContent: string
) => {
  const groups = [];
  let match;
  while ((match = fontSizeRegex.exec(cssContent))) {
    const name = match[1];
    groups.push({ name });
  }
  const uniqueGroups = Array.from(new Set(groups.map((g) => g.name))).map(
    (name) => {
      return { name };
    }
  );
  const result = uniqueGroups
    .map(({ name }) => {
      const selector = `text-${name}`;
      const properties =
        `font-size: var(--style-text-${name}-font-size);\n` +
        `line-height: var(--style-text-${name}-line-height);\n` +
        `font-weight: var(--style-text-${name}-font-weight-default);\n` +
        `font-family: var(--font-default);`;

      return isTailwind
        ? `@utility ${selector} {\n${properties}\n}`
        : `.${selector} {\n${properties}\n}`;
    })
    .join("\n");
  return result;
};

export default generateTypographyUtilities;
