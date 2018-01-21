const path = require('path')

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(`${__dirname}/webpackconDir`),
    filename: 'build.js'
  },

  watch: true,
  module: {
    rules: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react']
      }
    }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}
