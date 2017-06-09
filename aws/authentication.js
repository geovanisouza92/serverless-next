const authentication = require('../lib/auth/authentication')

module.exports.handler = (event, context, callback) => {
  // Get credentials and authenticate user
  const credentials = JSON.parse(event.body)
  const token = authentication.authenticate(credentials.username, credentials.password)

  var res

  if (token) {
    res = {
      statusCode: 200,
      body: JSON.stringify({ token })
    }
  } else {
    res = {
      statusCode: 401,
      body: JSON.stringify({
        error: 'Username or password invalid'
      })
    }
  }

  callback(null, res)
}
