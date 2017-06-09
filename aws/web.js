'use strict'

const next = require('next')
const adapter = require('aws-serverless-express')

// Build the Next.js app instance
const app = next({ dev: process.env.NODE_ENV !== 'production' })

// Create a server for a API instance
const server = adapter.createServer(app.getRequestHandler())

module.exports.handler = (event, context, callback) => {
  // NOTE: aws-serverless-express uses context.succeed, but AWS already
  // deprecated it in favor of callback
  const fakeContext = {
    succeed: res => callback(null, res)
  }

  // Prepare the app and proxy the actual request
  app.prepare().then(() => adapter.proxy(server, event, fakeContext))
}
