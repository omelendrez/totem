const express = require("express"),
    product = require("./routes/product"),
    category = require("./routes/category"),
    user = require("./routes/user"),
    basket = require("./routes/basket"),
    discount = require("./routes/discount"),
    models = require("./models"),
    bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/products/:id/category", product.findByCategory);
app.get("/products/:id", product.findById);
app.get("/products", product.findAll);
app.post("/products", product.create);

app.get("/categories/:id", category.findById);
app.get("/categories", category.findAll);
app.post("/categories", category.create);

app.get("/users/:id", user.findById);
app.get("/users", user.findAll);
app.post("/users", user.create);

app.get("/basket", basket.findAll);
app.post("/basket", basket.create);

app.get("/discounts", discount.findAll);
app.post("/discounts", discount.create);

app.get("*", function(req, res){
    res.send(400);
});

models.sequelize.sync({
    force: true
});

const port = 3000;

app.listen(port);

console.log(Date());
console.log("Listening on port " + port);
