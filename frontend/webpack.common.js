const path = require("path");
const fs = require("fs");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackPrettierPlugin = require("webpack-prettier-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

module.exports = {
  entry: {
    shared: "./src/js/shared.js",
    index: "./src/html/pages/index/main.js",
    game: "./src/html/pages/game/main.js",
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/html/pages/index/index.html",
      inject: true,
      chunks: ["index", "shared"],
      filename: "index.html",
    }),
    new HTMLWebpackPlugin({
      template: "./src/html/pages/game/game.html",
      inject: true,
      chunks: ["game", "shared"],
      filename: "game/index.html",
    }),

    new CleanWebpackPlugin(),
    new WebpackPrettierPlugin(),
    new FaviconsWebpackPlugin("./src/assets/images/favicon.svg"),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {
            preprocessor: (content, loaderContext) =>
              content.replace(
                /<include src="(.+)"\s*\/?>(?:<\/include>)?/gi,
                (m, src) => {
                  const filePath = path.resolve(loaderContext.context, src);
                  loaderContext.dependency(filePath);
                  return fs.readFileSync(filePath, "utf8");
                }
              ),
          },
        },
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        type: "asset/resource",
      },
    ],
  },
};
