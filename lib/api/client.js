const util = require('./util')

module.exports = {
  Auth: {
    login: util.POST('/auth')
  },

  Fake: {
    hello: util.GET('/hello')
  },

  Notes: {
    create: util.POST('/n/'),
    get: util.GET('/n/:id'),
    list: util.GET('/n'),
    update: util.PUT('/n/:id'),
    destroy: util.DELETE('/n/:id')
  }
}
