const authorization = require('../lib/auth/authorization')

// Create a AWS IAM policy object
// NOTE: Could accept additional data on context
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
  // Get the JWT token
  const token = event.authorizationToken && event.authorizationToken.split(' ')[1]

  // Verify token
  if (authorization.isValid(token)) {
    callback(null, generatePolicy('user', 'Allow', event.methodArn))
  } else {
    callback(null, generatePolicy('user', 'Deny', event.methodArn))
  }
}
