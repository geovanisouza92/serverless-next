const checkToken = require('../auth/checkToken')

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
  }
})

module.exports.handler = (event, context, callback) => {
  const token = event.authorizationToken.split(' ')[1]
  if (checkToken(token)) {
    callback(null, generatePolicy('user', 'Allow', event.methodArn))
  } else {
    callback(null, generatePolicy('user', 'Deny', event.methodArn))
  }
}
