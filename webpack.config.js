const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    library: 'flexified',
    libraryTarget: 'commonjs2',
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib'),
  },
  mode: 'production',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader }, 'css-loader', 'sass-loader'
        ],
      },
    ]
  },
  plugins: [
    new OptimizeCssAssetsPlugin(),
    new MiniCssExtractPlugin({
      filename: "styles.css",
      chunkFilename: "[id].css"
    })
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.css', '.scss', '.sass' ]
  }
};
