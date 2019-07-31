const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const apiPath = "./api/v1";

const app = express()
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(logger('dev'))
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'POST, OPTIONS'
  )
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})
app.use("/", require(apiPath + "/routes/printer"));
const port = process.env.PORT || 3060
app.listen(port)
console.log('Fiscal print server started ' + port) // eslint-disable-line no-console
