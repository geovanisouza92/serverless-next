'use strict'

const adapter = require('aws-serverless-express')
const api = require('../lib/api')

module.exports.handler = (event, context, callback) => {
  // TODO: Build a concrete repository
  const repo = {}

  // Create a server for a API instance
  const server = adapter.createServer(api(repo))

  // NOTE: aws-serverless-express uses context.succeed, but AWS already
  // deprecated it in favor of callback
  const fakeContext = {
    succeed: res => callback(null, res)
  }

  // Proxy the actual request
  adapter.proxy(server, event, fakeContext)
}
