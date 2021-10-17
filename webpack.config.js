const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let mode = process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = {
  mode,
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/bundle.js",
    // this clean will delete everything in the dist folder (our assets XD) ; be careful!!
    // clean: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  devtool: "source-map",
};
