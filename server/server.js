const express = require("express"),
    product = require("./routes/product"),
    category = require("./routes/category"),
    user = require("./routes/user"),
    basket = require("./routes/basket"),
    discount = require("./routes/discount"),
    order = require("./routes/order"),
    models = require("./models"),
    bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Users
app.get("/users/:id", user.findById);
app.get("/users", user.findAll);
app.post("/users", user.create);
app.delete("/users/:id", user.delete);

// Categories
app.get("/categories/:id", category.findById);
app.get("/categories", category.findAll);
app.post("/categories", category.create);
app.delete("/categories/:id", category.delete);

// Products
app.get("/products/:id/category", product.findByCategory);
app.get("/products/:id", product.findById);
app.get("/products", product.findAll);
app.post("/products", product.create);
app.delete("/products/:id", product.delete);

// Discounts
app.get("/discounts/:id", discount.findById);
app.get("/discounts", discount.findAll);
app.post("/discounts", discount.create);
app.delete("/discounts/:id", discount.delete);

// Basket
app.get("/basket", basket.findAll);
app.post("/basket", basket.create);

// Orders
app.get("/orders/:id", order.findById);
app.get("/orders", order.findAll);
app.post("/orders", order.create);
app.delete("/orders/:id", order.delete);

app.get("*", function(req, res){
    res.send(400);
});

models.sequelize.sync({
    force: false
});

const port = 3000;

app.listen(port);

console.log(Date());
console.log("Listening on port " + port);
