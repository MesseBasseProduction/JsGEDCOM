const path = require('path');
const webpack = require('webpack');
const loaders = require('./loaders');
const plugins = require('./plugins');

module.exports = {
  entry: {
    JsGEDCOM: './src/JsGEDCOM.js'
  },
  module: {
    rules: [
      loaders.JSLoader
    ]
  },
  output: {
    filename: 'JsGEDCOM.bundle.js',
    path: path.resolve(__dirname, '../dist'),
    library: 'JsGEDCOM',
    libraryTarget: 'window',
    libraryExport: 'default'
  },
  plugins: [
    new webpack.ProgressPlugin(),
    plugins.CleanWebpackPlugin,
    plugins.ESLintPlugin
  ]
};
