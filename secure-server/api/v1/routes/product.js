const express = require('express')
const router = express.Router()
const apiHelper = require('./../helpers')

router.get('/', (req, res, next) => {
  apiHelper.call('http://localhost:3000/products')
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(400).json(error)
    })
});

module.exports = router