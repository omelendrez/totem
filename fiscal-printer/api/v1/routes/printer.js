'use strict'
const printer = require('../controllers/printer')
const express = require('express')
const router = express.Router()
router.post('/connect-fiscal', printer.connectFiscal)
router.post('/partial-close', printer.partialClose)
router.post('/daily-close', printer.dailyClose)

module.exports = router
