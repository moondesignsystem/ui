const removeThemePrefixesFromVariables = (variable, themes, colorCollectionName) => {
    let updatedVariable = variable;
    themes.forEach((theme) => {
        const valueThemePrefix = new RegExp(`--${colorCollectionName}-${theme}-`, "g");
        updatedVariable = updatedVariable.replace(valueThemePrefix, `--${colorCollectionName}-`);
    });
    return updatedVariable;
};
export default removeThemePrefixesFromVariables;
