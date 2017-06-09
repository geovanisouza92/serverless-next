const authentication = require('../lib/auth/authentication')

module.exports.handler = (event, context, callback) => {
  const body = JSON.parse(event.body)
  const token = authentication.authenticate(body.username, body.password)

  if (token) {
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({ token })
    })
  }

  callback(null, {
    statusCode: 401,
    body: JSON.stringify({
      error: 'Username or password invalid'
    })
  })
}
