const authorization = require('../lib/auth/authorization')

const generatePolicy = (principalId, Effect, Resource) => ({
  principalId,
  policyDocument: {
    Version: '2012-10-17',
    Statement: [{
      Action: 'execute-api:Invoke',
      Effect,
      Resource
    }]
  },
  context: {
    // NOTE: Additional data
    foo: 'bar'
  }
})

module.exports.handler = (event, context, callback) => {
  const token = event.authorizationToken && event.authorizationToken.split(' ')[1]
  if (authorization.isValid(token)) {
    callback(null, generatePolicy('user', 'Allow', event.methodArn))
  } else {
    callback(null, generatePolicy('user', 'Deny', event.methodArn))
  }
}
