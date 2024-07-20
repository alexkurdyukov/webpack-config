import { BuildOptions } from "../types";

export const buildResolvers = (options: BuildOptions) => {
    return {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            "@": options.paths.src,
        },
    };
};
