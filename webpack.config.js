const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/retry.js',
  output: {
    path: path.resolve('dist'),
    filename: 'retry.js',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
};
