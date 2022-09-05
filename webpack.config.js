const path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  mode: 'development',
  entry: './src/assets/scripts/script.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
