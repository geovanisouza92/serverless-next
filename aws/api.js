'use strict'

const adapter = require('aws-serverless-express')
const api = require('../api')

const server = adapter.createServer(api)

module.exports.handler = (event, context, callback) => {
  const fakeContext = {
    succeed: res => callback(null, res)
  }
  adapter.proxy(server, event, fakeContext)
}
