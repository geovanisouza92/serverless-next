const jwt = require('jsonwebtoken')
const config = require('./_config')

module.exports.authenticate = (username, password) => {
  if (username === 'admin@example.com' && password === 'admin') {
    const session = { sub: username }
    return jwt.sign(session, config.secret, config.options)
  }
  return null
}
