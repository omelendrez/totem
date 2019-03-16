'use strict'
const user = require('../controllers/user')
const express = require('express')
const router = express.Router()

router.get('/:id', user.findById)
router.get('/', user.findAll)
router.post('/', user.create)
router.put('/:id', user.update)
router.delete('/:id', user.delete)

module.exports = router
