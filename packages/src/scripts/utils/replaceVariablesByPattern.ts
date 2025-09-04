const replacements: [RegExp, string][] = [
  [/--sizing-radius-(\w+)/g, "--radius-$1"],
  [/--style-font-family-(\w+)/g, "--font-$1"],
  [/--style-font-weight-(\w+)/g, "--font-weight-$1"],
  [/--sizing-line-height-(\w+)/g, "--leading-$1"],
  [/--sizing-font-size-(\w+)/g, "--text-$1"],
  [/--primitives-(\w+)/g, "--spacing-space-$1"],
];

const replaceVariablesByPattern = (cssContent: string) => {
  let processedContent = cssContent;
  for (const [pattern, replacement] of replacements) {
    processedContent = processedContent.replace(pattern, replacement);
  }
  return processedContent;
};

export default replaceVariablesByPattern;
