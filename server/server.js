"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const fileUpload  = require('express-fileupload');
const apiPath = "./api/v1";
const models = require(apiPath + "/models");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(logger("combined"));
app.use(fileUpload());

models.sequelize.sync({
  force: false
});

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use("/basket", require(apiPath + "/routes/basket"));
app.use("/categories", require(apiPath + "/routes/category"));
app.use("/sub_categories", require(apiPath + "/routes/sub_category"));
app.use("/discounts", require(apiPath + "/routes/discount"));
app.use("/orders", require(apiPath + "/routes/order"));
app.use("/products", require(apiPath + "/routes/product"));
app.use("/users", require(apiPath + "/routes/user"));
app.use("/product_discount", require(apiPath + "/routes/product_discount"));
app.use("/status", require(apiPath + "/routes/status"));
app.use("/login", require(apiPath + "/routes/login"));

const port = 3000;

app.listen(port);

console.log(Date());
console.log("Listening on port " + port);