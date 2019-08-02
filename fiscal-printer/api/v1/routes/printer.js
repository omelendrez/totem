'use strict'
const printer = require('../controllers/printer')
const express = require('express')
const router = express.Router()

router.post('/', printer.RunDLL)

module.exports = router
