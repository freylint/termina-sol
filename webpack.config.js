const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

var WEB_CLIENT_PREFIX = path.resolve(__dirname, './packages/client-web')
var APP_NAME = 'Termina-Sol'


module.exports = {
  // Compiler configuration
  optimization: {
    chunkIds: 'named',
  },
  entry: WEB_CLIENT_PREFIX + '/src/Main.elm',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: "./assets",
    filename: 'main.js',
  },

  // Module processor configuration
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'assets/img',
        loader: 'file-loader'
      },
      {
        test:    /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        loader:  'elm-webpack-loader',
        options: {
          cwd: WEB_CLIENT_PREFIX,
        }
      },
    ]
  },

  // Plugin configuration
  plugins: [
    new HtmlWebpackPlugin({
      title: APP_NAME,
      inject: "body"
    }),
    new FaviconsWebpackPlugin({
      logo: './assets/icon.png',
      favicons: {
        appName: APP_NAME
      }
    })
  ],
};