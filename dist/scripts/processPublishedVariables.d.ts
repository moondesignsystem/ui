import type { FigmaVariableCollection, FigmaVariable } from "../types.js";
interface ProcessedVariable extends FigmaVariable {
    cssVariableName: string;
}
interface ProcessedVariableCollection extends FigmaVariableCollection {
    variables: Record<string, ProcessedVariable>;
}
interface LocalVariableCollections {
    [key: string]: FigmaVariableCollection;
}
interface PublishedVariableCollections {
    [key: string]: FigmaVariableCollection;
}
interface LocalVariables {
    [key: string]: FigmaVariable;
}
interface PublishedVariables {
    [key: string]: FigmaVariable;
}
declare const processPublishedVariables: (localVariableCollections: LocalVariableCollections, publishedVariableCollections: PublishedVariableCollections, localVariables: LocalVariables, publishedVariables: PublishedVariables) => {
    variableCollections: Record<string, ProcessedVariableCollection>;
    themes: string[];
    colorCollectionName: string;
};
export default processPublishedVariables;
