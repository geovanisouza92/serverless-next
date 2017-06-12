module.exports = (client, TableName) => (userId, noteId, data) => {
  const params = {
    TableName,
    Key: {
      userId,
      noteId
    },
    UpdateExpression: 'SET content = :content, updatedAt = :updatedAt',
    ExpressionAttributeValues: {
      ':content': data.content || null,
      ':updatedAt': new Date().getTime()
    },
    ReturnValues: 'ALL_NEW'
  }

  return client.update(params).promise()
}
