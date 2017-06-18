const jwt = require('jsonwebtoken')
const config = require('./_config')

module.exports.isValid = token => {
  if (!token) return false
  try {
    return jwt.verify(token, config.secret)
  } catch (err) {
    console.error(err)
    return false
  }
}

module.exports.getSession = token => {
  if (!token) return {}
  return jwt.decode(token)
}
