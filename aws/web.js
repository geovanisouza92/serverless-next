const es = require('aws-serverless-express')
const next = require('next')

const app = next({
  dev: process.env.NODE_ENV !== 'production'
})

const server = es.createServer(app.getRequestHandler())

module.exports.handler = (event, context, callback) => {
  es.proxy(server, event, {
    succeed: res => callback(null, res)
  })
}
