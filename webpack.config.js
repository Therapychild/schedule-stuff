const path = require("path");

console.log(__dirname);
// Use babel-loader to compile all js.
module.exports = {
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },
  devtool: "source-map",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.[tj]sx?$/,
        use: ["babel-loader"]
      },
      {
        // @todo This should be \.(?!(css|js|jsx|ts|tsx)$).*$, but that doesn't
        //    work.
        test: /\.(png|eot|svg|gif|woff2?|ttf)$/,
        loader: "file-loader",
        options: {
          name: '[name].[ext]',
          publicPath: "../build",
          esModule: false
        }
      }
    ]
  }
};
