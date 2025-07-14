declare const fetchFigmaData: (fileId: string) => Promise<{
    localVariableCollections: any;
    publishedVariableCollections: any;
    localVariables: any;
    publishedVariables: any;
} | undefined>;
export default fetchFigmaData;
