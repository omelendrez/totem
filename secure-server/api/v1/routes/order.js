const express = require('express')
const router = express.Router()
const apiHelper = require('./../helpers')
const CONFIG = require('./../config')

router.post('/', (req, res, next) => {
  apiHelper.post(CONFIG.be_url + '/orders', req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(400).json(error)
    })
});

module.exports = router