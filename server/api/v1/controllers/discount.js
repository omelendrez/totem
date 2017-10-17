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

    const page = parseInt(req.query.page ? req.query.page : 0);
    const size = parseInt(req.query.size ? req.query.size : 1000);
    const sort = req.query.sort ? req.query.sort : 'name';
    const type = req.query.type ? req.query.type : 'asc';
    const filter = req.query.filter ? req.query.filter : '';

    return Discount
      .findAndCountAll({
        where: {
          name: {
            $like: '%' + filter + '%'
          }
        },
        order: [
          [sort, type]
        ],
        offset: (page - 1) * size,
        limit: size,
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
          'status_id',
          [sequelize.fn('date_format', sequelize.col('discount.created_at'), '%d-%b-%y %H:%i'), 'created_at'],
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