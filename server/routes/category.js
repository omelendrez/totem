const Category = require('../models').Category;

module.exports = {
  create(req, res) {
    return Category
      .create({
        categoryName: req.body.categoryName,
      })
      .then(category => res.status(201).send(category))
      .catch(error => res.status(400).send(error));
  },

  findAll(req, res) {
    return Category
      .findAll()
      .then(categories => res.json(categories))
      .catch(error => res.status(400).send(error));
  }
};
