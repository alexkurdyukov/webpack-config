import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ProgressBarPlugin from "progress-bar-webpack-plugin";
import { BuildOptions } from "../types";
import { Configuration, DefinePlugin } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

export const buildPlugins = (options: BuildOptions) => {
    const { mode, paths, analyzer, platform } = options;

    const isDev = mode === "development";
    const isProd = mode === "production";

    // общие плагины
    const plugins: Configuration["plugins"] = [
        new HtmlWebpackPlugin({
            template: path.resolve(paths.html),
            favicon: path.resolve(paths.public, "favicon.ico"),
        }),
        new DefinePlugin({ __PLATFORM__: JSON.stringify(platform) }),
    ];

    // плагины для дев сборки
    if (isDev) {
        plugins.push(
            new ProgressBarPlugin() as { apply(...args: any[]): void }
        );

        plugins.push(
            new MiniCssExtractPlugin({
                filename: "css/[name].[contenthash:8].css",
                chunkFilename: "css/[name].[contenthash:8].css",
            })
        );

        plugins.push(new ForkTsCheckerWebpackPlugin());
        plugins.push(new ReactRefreshWebpackPlugin());
    }

    // плагины для продакшн сборки
    if (isProd) {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: "css/[name].[contenthash:8].css",
                chunkFilename: "css/[name].[contenthash:8].css",
            })
        );
    }

    if (analyzer) {
        plugins.push(new BundleAnalyzerPlugin());
    }

    return plugins;
};
