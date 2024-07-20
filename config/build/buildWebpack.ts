import webpack from "webpack";
import { buildPlugins } from "./buildPlugins";
import { buildDevServer } from "./buildDevServer";
import { BuildOptions } from "../types";
import { buildLoaders } from "./buildLoaders";
import { buildResolvers } from "./buildResolvers";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
    const { paths, mode } = options;

    const isDev = mode === "development";

    const config: webpack.Configuration = {
        mode: mode ?? "development", // модификация сборки - продакшн автоматически оптимизирует бандл
        entry: paths.entry, // точка входа для бандла,  от этой точки входа строится граф зависимостей
        output: {
            path: paths.output, // путь до файла
            filename: "[name].[contenthash].js", // название выходного файла с учетом хэша
            clean: true, // замена файла при сборке
        },
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        devServer: buildDevServer(options),
        plugins: buildPlugins(options),
        devtool: isDev && "inline-source-map",
    };

    return config;
}
