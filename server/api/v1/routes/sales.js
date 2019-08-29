'use strict'
const order = require('../controllers/order')
const express = require('express')
const router = express.Router()

router.get('/', order.listAll)

module.exports = router
