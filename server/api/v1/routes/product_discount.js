'use strict'
const productDiscount = require('../controllers/product_discount')
const express = require('express')
const router = express.Router()

router.get('/:id/discount', productDiscount.findByDiscountId)
router.post('/', productDiscount.create)
router.delete('/:id', productDiscount.delete)

module.exports = router
