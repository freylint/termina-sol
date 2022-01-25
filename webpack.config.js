const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

var WEB_CLIENT_PREFIX = './packages/client-web'
var APP_NAME = 'Termina-Sol'


module.exports = {
  // Compiler configuration
  devtool: 'source-map',
  optimization: {
    chunkIds: 'named',
  },
  entry: './build/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },

  // Module processor configuration
  module: {
    rules: [
      {
        test:    /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader'
      },
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
          cwd: WEB_CLIENT_PREFIX
        }
      },
    ]
  },

  // Plugin configuration
  plugins: [
    new HtmlWebpackPlugin({
      title: APP_NAME,
      'files': {
        'chunks': {
          'head': {},
          'body': {
            'entry': 'build/index.js',
            'css': []
          }
        }
      }
    }),
    new FaviconsWebpackPlugin({
      logo: './assets/icon.png',
      favicons: {
        appName: APP_NAME
      }
    })
  ],
};