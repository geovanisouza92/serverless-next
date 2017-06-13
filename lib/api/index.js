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
    repo.get(req.userId, req.params.id)
      .then(found => {
        if (found.Item) {
          res.send(200, JSON.stringify(found.Item))
        } else {
          res.send(404)
        }
      })
  })

  // List
  api.get('/n/', (req, res) => {
    repo.list(req.userId)
      .then(list => {
        // TODO: Handle pagination
        if (list.Items) {
          res.send(200, JSON.stringify(list.Items))
        } else {
          res.send(200)
        }
      })
  })

  // Update
  api.put('/n/:id', (req, res) => {
    repo.get(req.userId, req.params.id)
      .then(found => {
        if (!found.Item) {
          return res.send(404, JSON.stringify({
            error: 'Item does not exist for update'
          }))
        }

        const data = {
          // Whitelist attributes
          content: req.body.content
        }

        return repo.update(req.userId, req.params.id, data)
          .then(updated => {
            res.send(200, JSON.stringify(updated))
          })
      })
  })

  // Destroy
  api.delete('/n/:id', (req, res) => {
    repo.destroy(req.userId, req.params.id)
      .then(destroyed => {
        res.send(204)
      })
  })

  return api
}

module.exports = apiFactory
