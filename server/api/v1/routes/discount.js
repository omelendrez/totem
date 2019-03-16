'use strict'
const discount = require('../controllers/discount')
const express = require('express')
const router = express.Router()

router.get('/:id', discount.findById)
router.get('/', discount.findAll)
router.post('/', discount.create)
router.put('/:id', discount.update)
router.delete('/:id', discount.delete)

module.exports = router
