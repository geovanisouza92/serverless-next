// const url = require('url')
const express = require('express')
const bodyParser = require('body-parser')

function apiFactory (repo, userIdGetter) {
  const api = express()
  api.use(bodyParser.json())
  api.use(/* get userId from request */ (req, res, next) => {
    var userId = null
    try {
      userId = userIdGetter(req)
    } catch (err) {
      console.warn(err.stack || err)
    }

    req.userId = userId
    next()
  })

  // Create
  api.post('/', (req, res) => {
    // TODO
  })

  // Get
  api.get('/:id', (req, res) => {
    // TODO
  })

  // List
  api.get('/', (req, res) => {
    // TODO
  })

  // Update
  api.put('/:id', (req, res) => {
    // TODO
  })

  // Destroy
  api.delete('/:id', (req, res) => {
    // TODO
  })

  const topLevel = express()
  topLevel.use('/n', api)
  return topLevel
}

module.exports = apiFactory
