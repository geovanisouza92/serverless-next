const cuid = require('cuid')

module.exports = (client, TableName) => Item => {
  Item.noteId = cuid()
  Item.createdAt = new Date().getTime()
  Item.updatedAt = Item.createdAt
  const params = { TableName, Item }

  return client.put(params).promise()
}
