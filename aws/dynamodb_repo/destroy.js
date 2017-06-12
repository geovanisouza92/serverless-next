module.exports = (client, TableName) => (userId, noteId) => {
  const params = {
    TableName,
    Key: {
      userId,
      noteId
    }
  }

  return client.delete(params).promise()
}
