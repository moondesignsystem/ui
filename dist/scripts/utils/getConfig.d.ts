interface Config {
    coreFileId: string;
    componentsFileId: string;
    projectName: string;
    outputFolder: string;
    themes?: Record<string, string>;
    customPrefix?: boolean;
    target: "tailwindcss" | "css";
}
declare const getConfig: () => Config;
export default getConfig;
