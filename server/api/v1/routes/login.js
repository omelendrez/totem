'use strict'
const user = require('../controllers/user')
const express = require('express')
const router = express.Router()

router.post('/', user.login)

module.exports = router
