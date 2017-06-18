const path = require('path')

module.exports = {
  plugins: [
    require('postcss-easy-import')({ prefix: '_' }),
    require('postcss-url')({
      url: 'copy',
      basePath: path.resolve(__dirname, 'node_modules/@blueprintjs/core/dist'),
      assetsPath: 'static/resources'
    }),
    require('autoprefixer')({ prefix: '_' })
  ]
}
