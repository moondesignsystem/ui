declare const processCoreVariables: (fileId?: string | null) => Promise<{
    coreVariables: string[];
    themes: string[];
    colorCollectionName: string;
}>;
export default processCoreVariables;
