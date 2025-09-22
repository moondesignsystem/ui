interface Config {
    coreFileId: string;
    componentsFileId?: string;
    componentsProjectId?: string;
    projectName: string;
    outputFolder: string;
    themes?: Record<string, string>;
    target: "tailwindcss" | "css";
    preflight: boolean;
}
declare const getConfig: () => Config;
export default getConfig;
