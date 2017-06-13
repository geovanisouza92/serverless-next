const aws = require('aws-sdk')

module.exports = () => {
  const config = {region: 'us-east-1'}
  if (process.env.NODE_ENV !== 'production') {
    config.endpoint = new aws.Endpoint('http://localhost:4569')
  }

  const client = new aws.DynamoDB.DocumentClient(config)
  const tableName = 'notes'

  return {
    create: require('./create')(client, tableName),
    get: require('./get')(client, tableName),
    list: require('./list')(client, tableName),
    update: require('./update')(client, tableName),
    destroy: require('./destroy')(client, tableName)
  }
}
