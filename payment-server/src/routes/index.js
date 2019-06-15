'use strict'
const controller = require('../controller')
const express = require('express')
const router = express.Router()

router.post('/currencies', controller.getCurrencies)
router.post('/payment-methods', controller.getPaymentMethods)

module.exports = router
