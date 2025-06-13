function generateGenericUtilities() {
  return (
    `@utility icon-* {\n` +
    `color: --value(--semantic-icon-*);\n` +
    `}\n` +
    `@utility text-* {\n` +
    `color: --value(--semantic-text-*);\n` +
    `}\n` +
    `@utility bg-* {\n` +
    `color: --value(--semantic-background-*);\n` +
    `}\n` +
    `@utility opacity-* {\n` +
    `color: --value(--effect-opacity-*);\n` +
    `}\n`
  );
}

export default generateGenericUtilities;
