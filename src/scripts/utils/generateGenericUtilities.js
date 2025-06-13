function generateGenericUtilities() {
  return (
    `@utility icon-* {\n` +
    `color: --value(--semantic-icon-*);\n` +
    `}\n` +
    `@utility text-* {\n` +
    `color: --value(--semantic-text-*);\n` +
    `}\n` +
    `@utility bg-* {\n` +
    `background-color: --value(--semantic-background-*);\n` +
    `}\n` +
    `@utility opacity-* {\n` +
    `opacity: --value(--effect-opacity-*);\n` +
    `}\n`
  );
}

export default generateGenericUtilities;
