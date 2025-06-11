function generateGenericUtilities(cssContent) {
  const shadowRegex = /--effect-shadow-(\d+)-/g;
  const shadowSizes = new Set();
  let match;
  while ((match = shadowRegex.exec(cssContent))) {
    const size = match[1];
    shadowSizes.add(size);
  }
  const uniqueSizes = Array.from(shadowSizes).sort(
    (a, b) => parseInt(a) - parseInt(b)
  );
  const result = uniqueSizes
    .map((size) => {
      const selector = `shadow-${size}`;
      return (
        `@utility ${selector} {\n` +
        `  box-shadow: \n` +
        `    var(--effect-shadow-${size}-layer-1-x) \n` +
        `    var(--effect-shadow-${size}-layer-1-y) \n` +
        `    var(--effect-shadow-${size}-layer-1-blur) \n` +
        `    var(--effect-shadow-${size}-layer-1-spread) \n` +
        `    var(--effect-shadow-${size}-layer-1-color),\n` +
        `    var(--effect-shadow-${size}-layer-2-x) \n` +
        `    var(--effect-shadow-${size}-layer-2-y) \n` +
        `    var(--effect-shadow-${size}-layer-2-blur) \n` +
        `    var(--effect-shadow-${size}-layer-2-spread) \n` +
        `    var(--effect-shadow-${size}-layer-2-color);\n` +
        `}`
      );
    })
    .join("\n\n");

  return result;
}

export default generateGenericUtilities;
