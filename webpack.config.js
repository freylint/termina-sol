import path from "path";

import AssetConfigWebpackPlugin from "asset-config-webpack-plugin";
import FaviconsWebpackPlugin from "favicons-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import RemarkHTML from "remark-html";

const dirname = path.resolve();
const isProduction = process.argv[process.argv.indexOf('--mode') + 1] === 'production';
const isDevelopment = !isProduction;
const WEB_CLIENT_PREFIX = path.resolve(dirname, './packages/client-web')
const APP_NAME = 'Termina-Sol'

const config = {
    optimization: {
        chunkIds: 'named',
    },
    devtool: isDevelopment && "cheap-module-source-map",
    entry: WEB_CLIENT_PREFIX + '/src/index.ts',
    output: {
        publicPath: '',
        path: path.resolve(dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.less$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader",
                ],
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: "html-loader",
                    },
                    {
                        loader: "remark-loader",
                        options: {
                            remarkOptions: {
                                plugins: [RemarkHTML],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'assets/img',
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: "static/media/[name].[hash:8].[ext]"
                }
            },
        ]
    },
    plugins: [
        new AssetConfigWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: APP_NAME,
            template: 'packages/client-web/index.html',
            inject: true
        }),
        new FaviconsWebpackPlugin({
            logo: 'assets/icon.png',
            favicons: {
                appName: APP_NAME
            }
        })
    ],
    devServer: {
        allowedHosts: 'auto',
        hot: true
    },
    resolve: {
        alias: {
            content_home$: path.resolve(dirname, 'assets/home.md')
        }
    }
};

export default config;
