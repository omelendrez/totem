const express = require('express')
const logger = require('morgan')
const apiPath = './api/v1'
const CONFIG = require(apiPath + '/config')

const app = express()

app.use(logger('dev'))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.use('/products', require(apiPath + '/routes/product'))
app.use('/orders', require(apiPath + '/routes/order'))
app.use((req, res) => {
  res.status(404).json({error: 'Resource not found'})
})

const port = CONFIG.port
app.listen(port)

console.log('Secure server started ' + port)

