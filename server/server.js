const express = require("express"),
    bodyParser = require("body-parser"),
    logger = require("morgan");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(logger("combined"));

app.use("/basket", require("./api/v1/basket"));
app.use("/categories", require("./api/v1/category"));
app.use("/discounts", require("./api/v1/discount"));
app.use("/orders", require("./api/v1/order"));
app.use("/products", require("./api/v1/product"));
app.use("/users", require("./api/v1/user"));

const port = 3000;

app.listen(port);

console.log(Date());
console.log("Listening on port " + port);
