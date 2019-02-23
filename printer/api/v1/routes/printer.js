'use strict'
const printer = require('../utils/printer')
const express = require('express')
const router = express.Router()
router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path)
  next()
})
router.post('/', printer.print)

module.exports = router
