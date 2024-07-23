const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './src/client/index.tsx',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'client')
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [new MiniCssExtractPlugin({
    filename: 'app.css'
  })],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ]
  }
};