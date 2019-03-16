'use strict'
const category = require('../controllers/category')
const express = require('express')
const router = express.Router()

router.get('/totem', category.totemFindAll)
router.get('/:id', category.findById)
router.get('/', category.findAll)
router.post('/', category.create)
router.put('/:id', category.update)
router.delete('/:id', category.delete)

module.exports = router
