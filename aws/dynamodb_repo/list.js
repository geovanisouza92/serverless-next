module.exports = (client, TableName) => userId => {
  const params = {
    TableName,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId
    }
  }

  return client.query(params).promise().then(res => res.Items)
}
