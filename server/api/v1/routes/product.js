'use strict'
const product = require('../controllers/product')
const express = require('express')
const router = express.Router()

router.get('/totem', product.totemFindAll)
router.put('/image/:id', product.updateImage)
router.get('/:id/category', product.findByCategory)
router.get('/:id', product.findById)
router.get('/', product.findAll)
router.post('/', product.create)
router.put('/:id', product.update)
router.delete('/:id', product.delete)

module.exports = router
