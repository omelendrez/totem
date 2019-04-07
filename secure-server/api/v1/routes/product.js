const express = require('express')
const router = express.Router()
const Product = require('./../controllers/product')

router.get('/', Product.getAll);

module.exports = router