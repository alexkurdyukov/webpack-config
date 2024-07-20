import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import { BuildOptions } from "../types";
import ReactRefreshTypescript from "react-refresh-typescript";

export const buildLoaders = (options: BuildOptions) => {
    const { mode } = options;
    const isDev = mode === "development";

    const svgrLoader = {
        test: /\.svg$/i,
        use: [
            {
                loader: "@svgr/webpack",
                options: {
                    icon: true,
                    svgoConfig: {
                        plugins: [
                            {
                                name: "convertColors",
                                params: {
                                    currentColor: true,
                                },
                            },
                        ],
                    },
                },
            },
        ],
    };

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
    };

    // обычный css лоадер для глобальных css стилей
    const cssLoader = {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
    };

    // лоадер, обрабатывающий css модули
    const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev
                    ? "[path][name]__[local]"
                    : "[hash:base64:8]",
            },
        },
    };

    // лоадер, обрабатывающий препроцессор
    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            cssLoaderWithModules,
            "sass-loader",
        ],
    };

    const tsLoader = {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
            getCustomTransformers: () => ({
                before: [isDev && ReactRefreshTypescript()].filter(Boolean),
            }),
            transpileOnly: true,
        },
    };

    return [assetLoader, scssLoader, cssLoader, tsLoader, svgrLoader];
};
