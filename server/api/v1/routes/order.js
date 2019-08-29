'use strict'
const order = require('../controllers/order')
const express = require('express')
const router = express.Router()

router.post('/', order.create)
router.get('/orders', order.findOrders)
router.get('/items', order.findItems)
router.put('/items/:id', order.updateItemStatus)
router.get('/order_items', order.findOrderItems)
router.get('/order_turns', order.findOrderTurns)
router.get('/:id', order.findById)
router.get('/', order.findAll)
router.put('/printed/:id', order.setOrderPrinted)
router.put('/:id', order.updateOrderStatus)

module.exports = router
