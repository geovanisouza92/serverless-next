const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

app.post('/a/', (req, res) => {
  if (!req.body || !req.body.url) {
    res.send(400, JSON.stringify({ error: 'You must provide an url' }))
    return
  }

  try {
    var parsedUrl = url.parse(req.body.url)

    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify('Create new link and respond with 201 Created + Location header'))

  } catch (err) {
    res.send(400, JSON.stringify({ error: err.stack || err }))
    return
  }
})

app.get('/a/:id', (req, res) => {
  console.log(req.params.id)
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify('Find shortened ID (increment counter?) and redirect or 404'))
})

module.exports = app
