const express = require('express')
const router = express.Router()
const Order = require('./../controllers/order')

router.post('/', Order.create);

module.exports = router