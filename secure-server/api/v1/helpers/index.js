const request = require('request')

module.exports = {
  get: (url) => {
    return new Promise((resolve, reject) => {
      request.get(url, { json: true }, (err, res, body) => {
        if (err) reject(err)
        resolve(body)
      });
    })
  },
  post: (url, payload) => {
    return new Promise((resolve, reject) => {
      request.post({ url, json: payload }, (err, res, body) => {
        if (err) reject(err)
        resolve(body)
      });
    })
  }
}
