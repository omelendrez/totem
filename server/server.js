const express = require('express'),
    products = require('./routes/product'),
    categories = require('./routes/category'),
    models = require('./models'),
    bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//app.get('/products/:id/category', products.findByCategory);
//app.get('/products/:id', products.findById);
app.get('/products', products.findAll);
app.post('/products', products.create);

//app.get('/categories/:id', categories.findById);
app.get('/categories', categories.findAll);
app.post('/categories', categories.create);

models.sequelize.sync({
    force: false
});

const port = 3000;

app.listen(port);

console.log(Date());
console.log('Listening on port ' + port);
