'use strict'
const totem = require('../controllers/totem')
const express = require('express')
const router = express.Router()

router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path)
  next()
})
router.get('/:id', totem.findById)
router.get('/', totem.findAll)
router.post('/', totem.create)
router.put('/:id', totem.changeStatus)

module.exports = router
