'use strict'
const config = require('../controllers/config')
const express = require('express')
const router = express.Router()

router.get('/', config.getStatus)
router.put('/', config.aknowledge)

module.exports = router
