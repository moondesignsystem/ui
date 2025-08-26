interface ComponentVariablesResult {
    componentVariables: string[];
    fileName?: string;
}
declare const processComponentVariablesForFile: (fileId: string, fileName?: string) => Promise<ComponentVariablesResult>;
declare const processComponentVariables: () => Promise<{
    componentVariables: string[];
}>;
export default processComponentVariables;
export { processComponentVariablesForFile };
