const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

const myEslintOptions = {
  extensions: [`js`, `jsx`, `ts`],
  exclude: [`node_modules`],
};


module.exports = {
  mode: 'development',
  entry: './src/assets/scripts/script.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '../src'),
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-webpack-plugin',
        options: {
          emitWarning: true,
        },
      },
    ],
  },
  plugins: [
    new ESLintPlugin(myEslintOptions),
  ],
};
