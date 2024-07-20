export type Mode = "production" | "development";
export type Platform = "mobile" | "desktop";

export interface BuildPaths {
    entry: string;
    html: string;
    output: string;
    src: string;
    public: string;
}

export interface BuildOptions {
    port: number;
    paths?: BuildPaths;
    mode: Mode;
    analyzer?: boolean;
    platform?: Platform;
}
