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
  api.post('/n/', (req, res) => {
    const item = {
      userId: req.userId,
      content: req.body.content
    }

    repo.create(item)
      .then(created => {
        res.send(201, JSON.stringify(created))
      })
  })

  // Get
  api.get('/n/:id', (req, res) => {
    // TODO
  })

  // List
  api.get('/n/', (req, res) => {
    // TODO
  })

  // Update
  api.put('/n/:id', (req, res) => {
    // TODO
  })

  // Destroy
  api.delete('/n/:id', (req, res) => {
    // TODO
  })

  return api
}

module.exports = apiFactory
