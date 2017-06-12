const util = require('./util')

module.exports = {
  Auth: {
    login: util.POST('/auth')
  },

  Fake: {
    hello: util.GET('/hello')
  },

  Shortcuts: {
    create: util.POST('/a/'),
    follow: util.GET('/a/:id')
  }
}
