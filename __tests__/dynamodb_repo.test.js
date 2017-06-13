'use strict'

const repoFactory = require('../aws/dynamodb_repo')

describe('DynamoDB repository', () => {
  it('works with local DynamoDB', () => {
    const repo = repoFactory()
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
          .then(found => {
            expect(found.Items.length).toBeGreaterThan(0)
            // NOTE: Pick the latest item, to avoid conflict with other items
            const item = found.Items.sort((a, b) => a.createdAt - b.createdAt)[found.Items.length - 1]
            expect(item.content).toEqual(content)
            return item
          })
      }).then(item => {
        // Update
        noteId = item.noteId
        return repo.update(userId, noteId, { content: item.content + ' updated' })
      }).then(() => {
        // Get
        return repo.get(userId, noteId)
          .then(found => {
            expect(found.Item.content).toEqual(content + ' updated')
          })
      }).then(() => {
        // Destroy
        return repo.destroy(userId, noteId)
      })
  })
})
