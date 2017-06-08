const login = require('../auth/login')

module.exports.handler = (event, context, callback) => {
  const body = JSON.parse(event.body)
  const token = login(body.username, body.password)

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
