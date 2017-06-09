const webpack = require('webpack')

const apiEndpoint = process.env.NODE_ENV === 'production'
  ? ''
  : 'http://localhost:4000'

module.exports = {
  webpack: config => {
    config.plugins.push(
      new webpack.DefinePlugin({
        API_ENDPOINT: JSON.stringify(apiEndpoint)
      })
    )
    return config
  }
}
