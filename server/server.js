const express = require("express"),
    product = require("./routes/product"),
    category = require("./routes/category"),
    user = require("./routes/user"),
    basket = require("./routes/basket"),
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

models.sequelize.sync({
    force: false
});

const port = 3000;

app.listen(port);

console.log(Date());
console.log("Listening on port " + port);
