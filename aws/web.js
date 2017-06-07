'use strict'

const next = require('next')
const adapter = require('aws-serverless-express')

const app = next({ dev: process.env.NODE_ENV !== 'production' })
const server = adapter.createServer(app.getRequestHandler())

module.exports.handler = (event, context, callback) => {
  // NOTE: aws-serverless-express uses context.succeed, but AWS already
  // deprecated it in favor of callback
  const fakeContext = {
    succeed: res => callback(null, res)
  }
  app.prepare().then(() => adapter.proxy(server, event, fakeContext))
}
