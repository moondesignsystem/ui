interface Config {
    coreFileId: string;
    componentsFileId: string;
    projectName: string;
    outputFolder: string;
    themes?: Record<string, string>;
    customPrefix: boolean;
    target: "tailwindcss" | "css";
    preflight: boolean;
}
declare const getConfig: () => Config;
export default getConfig;
