const jwt = require('jsonwebtoken')
const config = require('./_config')

module.exports.authenticate = (username, password) => {
  if (username === 'admin' && password === 'admin') {
    const session = { sub: 'admin' }
    return jwt.sign(session, config.secret, config.options)
  }
  return null
}
