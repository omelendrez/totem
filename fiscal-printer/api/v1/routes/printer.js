'use strict'
const printer = require('../controllers/printer')
const express = require('express')
const router = express.Router()
router.post('/connect-fiscal', printer.connectFiscal)
router.post('/partial-close', printer.partialClose)
router.post('/daily-close', printer.dailyClose)
router.post('/printer-status', printer.getPrinterStatus)
router.post('/fiscal-status', printer.getFiscalStatus)
router.post('/print-ticket', printer.printTicket)

module.exports = router
