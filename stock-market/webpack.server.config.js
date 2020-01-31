const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {server: './server.ts'},
  resolve: {extensions: ['.js', '.ts']},
  target: 'node',
  // 這確保引入 node_modules 與其他第三函式庫
  externals: [/(node_modules|main\..*\.js)/],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [{test: /\.ts$/, loader: 'ts-loader'}]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(__dirname, 'src'), // src 位置
      {} // 路由的 map
    ),
    new webpack.ContextReplacementPlugin(
      /(.+)?express(\\|\/)(.+)?/,
      path.join(__dirname, 'src'),
      {}
    )
  ]
};
