"use strict";
const ProductDiscount = require("../models").product_discount;

module.exports = {

  create(req, res) {
    return ProductDiscount
      .create({
        product_id: req.body.product_id,
        discount_id: req.body.discount_id
      })
      .then(productDiscount => res.status(201).json(productDiscount))
      .catch(error => res.status(400).send(error));
  },

  findAll(req, res) {
    return ProductDiscount
      .findAll({
        raw: true
      })
      .then(productDiscount => productDiscount ? res.json(productDiscount) : res.send(404).json({
        "error": "Not found"
      }))
      .catch(error => res.status(400).send(error));
  },

  findById(req, res) {
    return ProductDiscount
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(productDiscount => productDiscount ? res.json(productDiscount) : res.send(404).json({
        "error": "Not found"
      }))
      .catch(error => res.status(400).send(error));
  },

  findByProductId(req, res) {
    return ProductDiscount
      .findOne({
        where: {
          product_id: req.params.id
        }
      })
      .then(productDiscount => productDiscount ? res.json(productDiscount) : res.send(404).json({
        "error": "Not found"
      }))
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    return ProductDiscount
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(productDiscount => productDiscount.destroy()
        .then(result => {
          res.status(204).json(result);
        }))
      .catch(error => res.status(400).send(error));
  }

};