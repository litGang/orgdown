/*
    ./webpack.config.js
*/
const path = require('path');
module.exports = {
  entry: [
    `webpack-hot-middleware/client?path=http://localhost:8080/__webpack_hmr`,
    './src/js/index.js'
  ],
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    publicPath: `http://localhost:8080/dist/`
  },

  target: 'electron',

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    extensions: [".js", ".jsx", ".json"]
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.global\.css$/, loaders: ['style-loader', 'css-loader?sourceMap'] },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
    ]
  }
}
