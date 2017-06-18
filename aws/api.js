'use strict'

const adapter = require('aws-serverless-express')
const middleware = require('aws-serverless-express/middleware')
const apiFactory = require('../lib/api')
const repoFactory = require('./dynamodb_repo')

// Build a concrete repository (DynamoDB as storage)
const repo = repoFactory()

const middlewares = [
  middleware.eventContext(),
  /* get userId from event */ (req, res, next) => {
    try {
      req.userId = req.apiGateway.event.requestContext.authorizer.sub
    } catch (err) {
      req.userId = null
      console.warn(err.stack || err)
    }
    next()
  }
]

// Create a server for a API instance
const server = adapter.createServer(apiFactory(repo, middlewares))

module.exports.handler = (event, context, callback) => {
  // NOTE: aws-serverless-express uses context.succeed, but AWS already
  // deprecated it in favor of callback
  const fakeContext = {
    succeed: res => callback(null, res)
  }

  // Proxy the actual request
  adapter.proxy(server, event, fakeContext)
}
