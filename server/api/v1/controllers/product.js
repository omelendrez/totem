"use strict";
const Product = require("../models").product;

module.exports = {
  create(req, res) {
    return Product
      .create({
        code: req.body.code,
        name: req.body.name,
        description: req.body.description,
        category_id: req.body.category_id,
        price: req.body.price
      })
      .then(product => res.status(201).send(product))
      .catch(error => res.status(400).send(error));
  },

  findAll(req, res) {
    return Product
      .findAll()
      .then(products => res.json(products))
      .catch(error => res.status(400).send(error));
  },

  findById(req, res) {
    return Product
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(product => product ? res.json(product) : res.status(404).json({
        "error": "Not found"
      }))
      .catch(error => res.status(400).send(error));
  },

  findByCategory(req, res) {
    return Product
      .findOne({
        where: {
          category_id: req.params.id
        }
      })
      .then(product => product ? res.json(product) : res.status(404).json({
        "error": "Not found"
      }))
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    return Product
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(product => product.destroy()
        .then(result => {
          res.json(result);
        }))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Product
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(product => product.update({
        code: req.body.code,
        name: req.body.name,
        description: req.body.description,
        category_id: req.body.category_id,
        price: req.body.price
      })
        .then(result => {
          res.json(result);
        }))
      .catch(error => res.status(400).send(error));
  }


};