const CONFIG = require('./../config')
const apiHelper = require('./../helpers')

module.exports = {
  getAll(req, res) {
    apiHelper.get(CONFIG.be_url + '/products/totem')
      .then(response => {
        res.status(200).json(response)
      })
      .catch(error => {
        res.status(400).json(error)
      })
  }
}
