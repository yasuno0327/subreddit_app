const path = require('path');
const webpack = require('webpack');

module.exports = [
  {
    context: path.join(__dirname, 'src'),
    entry: {
      bundle: './index.js'
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.js[x]?$/,
          exclude: /node_modules/,
          options: {
            presets: ["es2015", "react"]
          },
        }
      ],
    },
    devServer: {
      contentBase: 'dist'
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
    ],
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.jsx']
    }
  },
  {
      context: path.join(__dirname, 'src')
      entry:
  }
]
