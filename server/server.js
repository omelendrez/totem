"use strict";

const apiPath = "./api/v1";

const express = require("express"),
    bodyParser = require("body-parser"),
    logger = require("morgan"),
    models = require(apiPath + "/models");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(logger("combined"));

models.sequelize.sync({
    force: false
});

app.use("/basket", require(apiPath + "/routes/basket"));
app.use("/categories", require(apiPath + "/routes/category"));
app.use("/discounts", require(apiPath + "/routes/discount"));
app.use("/orders", require(apiPath + "/routes/order"));
app.use("/products", require(apiPath + "/routes/product"));
app.use("/users", require(apiPath + "/routes/user"));
app.use("/product_discount", require(apiPath + "/routes/product_discount"));

const port = 3000;

app.listen(port);

console.log(Date());
console.log("Listening on port " + port);
