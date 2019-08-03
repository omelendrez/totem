'use strict'
const totem = require('../controllers/totem')
const express = require('express')
const router = express.Router()

router.get('/:id', totem.findById)
router.get('/', totem.findAll)
router.post('/', totem.create)
router.put('/:id', totem.changeStatus)
router.put('/:id/activate', totem.activate)
router.put('/:id/de-activate', totem.deActivate)

module.exports = router
