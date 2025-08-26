const replacements = [
    [/--sizing-radius-(\w+)/g, "--radius-$1"],
    [/--style-text-font-family-(\w+)/g, "--font-$1"],
    [/--style-text-font-weight-(\w+)/g, "--font-weight-$1"],
    [/--primitives-(\w+)/g, "--spacing-$1"],
];
const replaceVariablesByPattern = (cssContent) => {
    let processedContent = cssContent;
    for (const [pattern, replacement] of replacements) {
        processedContent = processedContent.replace(pattern, replacement);
    }
    return processedContent;
};
export default replaceVariablesByPattern;
