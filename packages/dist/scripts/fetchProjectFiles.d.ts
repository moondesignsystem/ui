interface FigmaFile {
    key: string;
    name: string;
    thumbnail_url: string;
    last_modified: string;
}
declare const fetchProjectFiles: (projectId: string) => Promise<FigmaFile[]>;
export default fetchProjectFiles;
