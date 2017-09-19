const express = require("express"),
    bodyParser = require("body-parser"),
    logger = require("morgan");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(logger("combined"));

app.use("/basket", require("./api/v1/routes/basket"));
app.use("/categories", require("./api/v1/routes/category"));
app.use("/discounts", require("./api/v1/routes/discount"));
app.use("/orders", require("./api/v1/routes/order"));
app.use("/products", require("./api/v1/routes/product"));
app.use("/users", require("./api/v1/routes/user"));

const port = 3000;

app.listen(port);

console.log(Date());
console.log("Listening on port " + port);
