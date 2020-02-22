'use strict'
const printer = require('../controllers/printer')
const express = require('express')
const router = express.Router()

router.post('/stock/:printerId', printer.printStock)
router.post('/:printerId', printer.print)

module.exports = router
