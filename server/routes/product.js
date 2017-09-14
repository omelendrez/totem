const Product = require('../models').Product;

module.exports = {
  create(req, res) {
    return Product
      .create({
        productName: req.body.productName,
        CategoryId: req.body.CategoryId
      })
      .then(product => res.status(201).send(product))
      .catch(error => res.status(400).send(error));
  },

  findAll(req, res) {
    return Product
      .findAll()
      .then(products => res.json(products))
      .catch(error => res.status(400).send(error));
  }
};
