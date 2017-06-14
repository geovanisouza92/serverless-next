/* global API_ENDPOINT */

const fetch = require('isomorphic-fetch')

function makeMethod (method /* , expectedStatuses */, hasBody) {
  return (urlTemplate /* , bodySpec */) => {
    return (data, token) => {
      // Build url
      var url = urlTemplate
      const matches = url.match(/:\w+/g) || []
      matches.forEach(tag => {
        var value = data[tag.slice(1)]
        if (value === undefined) {
          console.warn(`Warning: calling "${method} ${urlTemplate}" without ${tag}`)
          value = ''
        }
        url = url.replace(tag, encodeURIComponent(value))
        delete data[tag.slice(1)]
      })
      url = API_ENDPOINT + url

      // Adapt headers
      var headers = {
        Accept: 'application/json'
      }

      // Fill Authorization header with token
      // TODO: const token =
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      // Convert body
      var body
      if (hasBody) {
        headers['Content-Type'] = 'application/json'
        // TODO: Validate data against bodySpec
        body = JSON.stringify(data)
      }

      // Request options
      var init = {
        method,
        headers,
        body
      }

      // Request
      return fetch(url, init).then(res => res.json())
    }
  }
}

module.exports = {
  GET: makeMethod('GET'),
  POST: makeMethod('POST', true),
  PUT: makeMethod('PUT', true),
  PATCH: makeMethod('PATCH', true),
  DELETE: makeMethod('DELETE')
}
