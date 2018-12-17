const path = require('path');

module.exports = (env, argv) => [{
  name: 'server',
  target: 'node',
  entry: './src/server.js',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },
  mode: 'production',
  node: {
    __dirname: false
  },
  devtool: argv.mode === 'production' ? 'none' : 'inline-source-map',
  output: {
    path: path.join(__dirname, '../../dist'),
    filename: 'server.js',
    publicPath: '/'
  }
}];
