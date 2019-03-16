'use strict'
const status = require('../controllers/status')
const express = require('express')
const router = express.Router()

router.get('/', status.findAll)
router.post('/', status.create)

module.exports = router
