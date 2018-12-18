const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => [
  {
    name: 'client',
    target: 'web',
    entry: './src/index.js',
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader'
        }]
      }]
    },
    devServer: {
      contentBase: '../../dist',
      hot: true,
      open: true,
      host: '127.0.0.1',
      port: '1234'
    },
    plugins: [
      argv.mode === 'production' ? undefined : new webpack.NamedModulesPlugin(),
      argv.mode === 'production' ? undefined : new webpack.HotModuleReplacementPlugin(),
      new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: './index.html'
      })
    ].filter(Boolean),
    node: {
      __dirname: false
    },
    mode: 'production',
    performance: {
      hints: argv.mode === 'production' ? 'warning' : false
    },
    devtool: argv.mode === 'production' ? 'none' : 'inline-source-map',
    output: {
      path: path.join(__dirname, '../dist'),
      filename: 'main.js',
      publicPath: '/'
    }
  }];
