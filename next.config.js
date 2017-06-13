const webpack = require('webpack')

const apiEndpoint = process.env.NODE_ENV === 'production'
  ? '' // TODO: App domain
  : 'http://localhost:4000'

module.exports = {
  webpack: (config, { dev }) => {
    config.module.rules.push(
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'emit-file-loader',
            options: {
              name: 'dist/[path][name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader']
      }
    )
    config.plugins.push(
      new webpack.DefinePlugin({
        API_ENDPOINT: JSON.stringify(apiEndpoint)
      })
    )
    return config
  }
}
