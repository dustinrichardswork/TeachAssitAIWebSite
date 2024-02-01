const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  // your webpack config is here
  plugins: [new BundleAnalyzerPlugin()],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'all',
      minSize: 10000,
      maxSize: 250000,
    }
  },
}