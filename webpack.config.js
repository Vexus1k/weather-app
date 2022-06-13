let path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const withCss = require('@zeit/next-css')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = withCss()
module.exports = {
  mode: 'development',
  entry: './src/assets/scripts/script.js',
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  target: 'node',
  stats: { children: true },
  devServer: {
    static: path.resolve(__dirname, "dist"),
    compress: true,
    port: 8080,
    open: true,
  },

  devtool: "inline-source-map",
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' },
      {
        test: /\\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
  ],


};

