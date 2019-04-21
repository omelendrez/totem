const CONFIG = require('../config')
const apiHelper = require('../helpers')

module.exports = {
  create(req, res) {
    apiHelper.post(CONFIG.be_url + '/orders', req.body)
      .then(response => {
        res.status(200).json(response)
      })
      .catch(error => {
        res.status(400).json(error)
      })
  }
}
