const replacements: [RegExp, string][] = [
  [/--dimension-space-(\w+)/g, "--spacing-space-$1"],
  [/--dimension-rounded-(\w+)/g, "--radius-$1"],
  [/--text-font-family-(\w+)/g, "--font-$1"],
  [/--text-font-weight-(\w+)/g, "--font-weight-$1"],
];

const replaceVariablesByPattern = (cssContent: string) => {
  let processedContent = cssContent;
  for (const [pattern, replacement] of replacements) {
    processedContent = processedContent.replace(pattern, replacement);
  }
  return processedContent;
};

export default replaceVariablesByPattern;
