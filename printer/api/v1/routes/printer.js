'use strict'
const printer = require('../controllers/printer')
const express = require('express')
const router = express.Router()

router.post('/:printerId', printer.print)

module.exports = router
