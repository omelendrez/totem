var express = require('express'),
    products = require('./routes/product');

var app = express();

app.get('/products/:id/category', products.findByCategory);
app.get('/products/:id', products.findById);
app.get('/products', products.findAll);

app.listen(3000);
console.log('Listening on port 3000...');
