const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  watch: true,
  devtool: "eval-source-map", //Run -npm run build to construct the website, keep terminal open to apply saves
};
