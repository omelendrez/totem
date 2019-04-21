const express = require('express')
const router = express.Router()
const Product = require('../controllers/product')
const validateToken = require('../middleware/auth').validateToken

router.get('/', validateToken, Product.getAll);

module.exports = router