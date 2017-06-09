// const webpack = require('webpack')

const plugins = []

// if (process.env.NODE_ENV === 'production') {
//   plugins.push(new webpack.DefinePlugin({
//     NODE_ENV: JSON.stringify('production')
//   }))
//   plugins.push(new webpack.optimize.UglifyJsPlugin())
// }

module.exports = {
  // entry
  // output
  target: 'node',
  externals: {
    'aws-sdk': 'commonjs aws-sdk'
  },
  plugins,
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            [
              'env',
              {
                target: { node: 6.10 },
                useBuiltins: true,
                modules: false,
                loose: true
              }
            ],
            'stage-0'
          ]
        }
      }
    }]
  }
}
