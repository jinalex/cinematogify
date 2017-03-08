const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})

const PATHS = {
  build: path.join(__dirname, 'build')
}

module.exports = {
  devServer: {
    historyApiFallback: true
  },
  entry: './src/index.js',
  output: {
    path: PATHS.build,
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style-loader!css-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [ HtmlWebpackPluginConfig ]
}
