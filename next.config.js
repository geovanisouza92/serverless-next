const webpack = require('webpack')

const apiEndpoint = process.env.NODE_ENV === 'production'
  ? '' // NOTE: Same domain
  : 'http://localhost:4000'

module.exports = {
  webpack: (config) => {
    config.plugins.push(new webpack.DefinePlugin({
      API_ENDPOINT: JSON.stringify(apiEndpoint)
    }))

    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(new webpack.optimize.UglifyJsPlugin())
      config.plugins.push(new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }))
    }

    return config
  }
}
