const jwt = require('jsonwebtoken')
const config = require('./_config')

module.exports = (token) => {
  if (!token) return false
  try {
    return jwt.verify(token, config.secret)
  } catch (err) {
    console.error(err)
    return false
  }
}
