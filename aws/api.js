'use strict'

const adapter = require('aws-serverless-express')
const apiFactory = require('../lib/api')
const repoFactory = require('./dynamodb_repo')

const userIdGetter = req => req.requestContext.authorizer.claims.sub

module.exports.handler = (event, context, callback) => {
  // Build a concrete repository (DynamoDB as storage)
  const repo = repoFactory('notes')

  // Create a server for a API instance
  const server = adapter.createServer(apiFactory(repo, userIdGetter))

  // NOTE: aws-serverless-express uses context.succeed, but AWS already
  // deprecated it in favor of callback
  const fakeContext = {
    succeed: res => callback(null, res)
  }

  // Proxy the actual request
  adapter.proxy(server, event, fakeContext)
}
