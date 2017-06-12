'use strict'

const repoFactory = require('../aws/dynamodb_repo')

describe('DynamoDB repository', () => {
  it('works with local DynamoDB', () => {
    const repo = repoFactory('notes')
    const userId = 'USER-SUB-1234'
    const content = 'hello world'
    var noteId = null

    return Promise.resolve({ userId, content })
      .then(item => {
        // Create
        return repo.create(item)
      })
      .then(() => {
        // List
        return repo.list(userId)
          .then(item => {
            expect(item[0].content).toEqual(content)
            return item[0]
          })
      }).then(item => {
        // Update
        noteId = item.noteId
        return repo.update(userId, noteId, { content: item.content + ' updated' })
      }).then(() => {
        // Get
        return repo.get(userId, noteId)
          .then(item => {
            expect(item.content).toEqual(content + ' updated')
          })
      }).then(() => {
        // Destroy
        return repo.destroy(userId, noteId)
      })

      // TODO: Check if dynamodb is empty?
  })
})
