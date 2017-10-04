"use strict";
const Discount = require("../models").discount;
const sequelize = require("sequelize");

module.exports = {

  create(req, res) {
    return Discount
      .create({
        name: req.body.name,
        description: req.body.description,
        percent: req.body.percent,
        status_id: req.body.status_id
      })
      .then(discount => res.status(201).send(discount))
      .catch(error => res.status(400).send(error));
  },

  findAll(req, res) {
    const Status = require("../models").status;
    Discount.belongsTo(Status);

    return Discount
      .findAll({
        include: [{
          model: Status,
          where: {
            id: sequelize.col('discount.status_id')
          }
        }],
        attributes: [
          'id',
          'name',
          'description',
          'percent'
        ]
      })
      .then(discounts => res.json(discounts))
      .catch(error => res.status(400).send(error));
  },

  findById(req, res) {
    const Status = require("../models").status;
    Discount.belongsTo(Status);

    return Discount
      .findOne({
        where: {
          id: req.params.id
        },
        include: [{
          model: Status,
          where: {
            id: sequelize.col('discount.status_id')
          }
        }],
        attributes: [
          'id',
          'name',
          'description',
          'percent',
          'status_id', [sequelize.fn('date_format', sequelize.col('discount.created_at'), '%d-%b-%y %H:%i'), 'created_at'],
          [sequelize.fn('date_format', sequelize.col('discount.updated_at'), '%d-%b-%y %H:%i'), 'updated_at']
        ]
      })
      .then(discount => discount ? res.json(discount) : res.status(404).json({
        "error": "Not found"
      }))
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    return Discount
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(discount => discount.destroy()
        .then(result => {
          res.json(result);
        }))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Discount
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(discount => discount.update({
        name: req.body.name,
        description: req.body.description,
        percent: req.body.percent,
        status_id: req.body.status_id
      })
        .then(result => {
          res.json(result);
        }))
      .catch(error => res.status(400).send(error));
  }

};