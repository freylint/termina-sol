const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')




module.exports = function (_env, argv) {
    const isProduction = argv.mode === "production";
    const isDevelopment = !isProduction;
    const WEB_CLIENT_PREFIX = path.resolve(__dirname, './packages/client-web')
    const APP_NAME = 'Termina-Sol'

    return {
        // Compiler configuration
        optimization: {
            chunkIds: 'named',
        },
        devtool: isDevelopment && "cheap-module-source-map",

        // Output configuration
        entry: WEB_CLIENT_PREFIX + '/src/index.ts',
        output: {
            publicPath: '',
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
        },

        // Module processor configuration
        module: {
            rules: [{
                test: /\.less$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader",
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

        // Plugin configuration
        plugins: [
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

        // Dev serve configuration
        devServer: {
            allowedHosts: 'auto',
            hot: true
        },
    };

}
