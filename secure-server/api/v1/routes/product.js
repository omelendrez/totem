const express = require('express')
const router = express.Router()
const apiHelper = require('./../helpers')
const CONFIG = require('./../config')

router.get('/', (req, res, next) => {
  apiHelper.get(CONFIG.be_url + '/products')
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(400).json(error)
    })
});

module.exports = router