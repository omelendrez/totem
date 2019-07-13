"use strict"
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const apiPath = "./src";

const app = express()

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(logger('dev'))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'POST, OPTIONS'
  )
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.use("/", require(apiPath + "/routes"));

app.use((req, res, next) => {
  if (!req.route) res.status(404).json({ message: 'Unknown endpoint' })
  next()
})

const port = process.env.PORT || 3050

app.listen(port)

console.log('Nosql server started ' + port) // eslint-disable-line no-console
