import webpack from "webpack";
import path from "path";
import { buildWebpack } from "./config/build/buildWebpack";
import { BuildPaths, Mode, Platform } from "./config/types";

interface EnvVariables {
    mode: Mode;
    port?: number;
    analyzer?: boolean;
    platform?: Platform;
}

export default (env: EnvVariables) => {
    const paths: BuildPaths = {
        output: path.resolve(__dirname, "build"),
        entry: path.resolve(__dirname, "src", "index.tsx"),
        html: path.resolve(__dirname, "public", "index.html"),
        src: path.resolve(__dirname, "src"),
        public: path.resolve(__dirname, "public"),
    };

    const config: webpack.Configuration = buildWebpack({
        mode: env.mode ?? "development",
        port: env.port ?? 3000,
        paths: paths,
        analyzer: env.analyzer,
        platform: env.platform ?? "desktop",
    });

    return config;
};
