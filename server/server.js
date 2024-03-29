"use strict"
const express = require("express")
const bodyParser = require("body-parser")
const logger = require("morgan")
const cors = require("cors")
const apiPath = "./api/v1"
const models = require(apiPath + "/models")
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(logger("dev"))
app.use(cors())

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE"
  )
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type")
  res.setHeader("Access-Control-Allow-Credentials", true)
  next()
})

models.sequelize.sync({
  force: false
})

app.use("/categories", require(apiPath + "/routes/category"))
app.use("/discounts", require(apiPath + "/routes/discount"))
app.use("/orders", require(apiPath + "/routes/order"))
app.use("/sales", require(apiPath + "/routes/sales"))
app.use("/products", require(apiPath + "/routes/product"))
app.use("/users", require(apiPath + "/routes/user"))
app.use("/product_discount", require(apiPath + "/routes/product_discount"))
app.use("/status", require(apiPath + "/routes/status"))
app.use("/login", require(apiPath + "/routes/login"))
app.use("/config", require(apiPath + "/routes/config"))
app.use("/totem", require(apiPath + "/routes/totem"))
app.use("/printer-error", require(apiPath + "/routes/printer_error"))
app.use("/cc-payment", require(apiPath + "/routes/cc_payment"))
app.use(express.static("public"))

const port = 3000

app.listen(port)

console.log(Date())
console.log("Listening on port " + port)
