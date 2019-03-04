'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
// const fileUpload = require('express-fileupload')
const helmet = require('helmet')

const apiPath = './api/v1'
const models = require(apiPath + '/models')
// const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })

const app = express()
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(logger('dev'))
//app.use(fileUpload())

models.sequelize.sync({
  force: false
})

app.use('/categories', require(apiPath + '/routes/category'))
app.use('/discounts', require(apiPath + '/routes/discount'))
app.use('/orders', require(apiPath + '/routes/order'))
app.use('/products', require(apiPath + '/routes/product'))
app.use('/users', require(apiPath + '/routes/user'))
app.use('/product_discount', require(apiPath + '/routes/product_discount'))
app.use('/status', require(apiPath + '/routes/status'))
app.use('/login', require(apiPath + '/routes/login'))
app.use('/config', require(apiPath + '/routes/config'))
app.use('/totem', require(apiPath + '/routes/totem'))
app.use(express.static('public'))
/*app.post('/public', upload.single('product'), function(req, res, next) {
  console.log(req)
  console.log(res)
  next()
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})
*/
const port = 3000

app.listen(port)

console.log(Date())
console.log('Listening on port ' + port)
