import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "../types";

export const buildDevServer = (options: BuildOptions) => {
    const { mode, port } = options;

    const isDev = mode === "development";

    if (isDev) {
        const devServerConfig = {
            port: port ?? 3000,
            open: true,
            historyApiFallback: true,
            hot: true,
        } as DevServerConfiguration;

        return devServerConfig;
    }
};
