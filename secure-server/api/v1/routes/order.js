const express = require('express')
const router = express.Router()
const Order = require('../controllers/order')
const validateToken = require('../middleware/auth').validateToken

router.post('/', validateToken, Order.create);

module.exports = router