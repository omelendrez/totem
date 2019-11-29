'use strict'
const controller = require('../controller')
const express = require('express')
const router = express.Router()

router.post('/currencies', controller.getCurrencies)
router.post('/payment-methods', controller.getPaymentMethods)

router.post('/get-card', controller.getCard)
router.post('/buy', controller.buyRequest)
router.post('/confirm', controller.confirmPurchase)
router.post('/get-last-transaction', controller.getLastTransaction)

router.post('/batch-close', controller.batchClose)
router.post('/void-purchase', controller.voidPurchase)

module.exports = router
