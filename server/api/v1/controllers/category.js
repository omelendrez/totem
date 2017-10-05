"use strict";
const Category = require("../models").category;
const sequelize = require("sequelize");

module.exports = {
  create(req, res) {
    return Category
      .create({
        name: req.body.name,
        status_id: req.body.status_id
      })
      .then(category => res.status(201).json(category))
      .catch(error => res.status(400).send(error));
  },

  findAll(req, res) {
    const Status = require("../models").status;
    Category.belongsTo(Status);

    return Category
      .findAll({
        include: [{
          model: Status,
          where: {
            id: sequelize.col('category.status_id')
          }
        }],
        attributes: [
          'id',
          'name'
        ]
      })
      .then(categories => res.json(categories))
      .catch(error => res.status(400).send(error));
  },

  findById(req, res) {
    const Status = require("../models").status;
    Category.belongsTo(Status);

    return Category
      .findOne({
        where: {
          id: req.params.id
        },
        include: [{
          model: Status,
          where: {
            id: sequelize.col('category.status_id')
          }
        }],
        attributes: [
          'id',
          'name',
          'status_id', 
          [sequelize.fn('date_format', sequelize.col('category.created_at'), '%d-%b-%y %H:%i'), 'created_at'],
          [sequelize.fn('date_format', sequelize.col('category.updated_at'), '%d-%b-%y %H:%i'), 'updated_at']
        ]
      })
      .then(category => category ? res.json(category) : res.status(404).json({
        "error": "Not found"
      }))
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    return Category
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(category => category.destroy()
        .then(result => {
          res.json(result);
        }))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Category
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(category => category.update({
        name: req.body.name,
        status_id: req.body.status_id
      })
        .then(result => {
          res.json(result);
        }))
      .catch(error => res.status(400).send(error));
  }
};