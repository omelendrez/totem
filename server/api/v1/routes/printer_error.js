'use strict'
const printerError = require('../controllers/printer_error')
const express = require('express')
const router = express.Router()

router.post('/', printerError.create)

module.exports = router
