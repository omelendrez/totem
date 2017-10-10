"use strict";
const SubCategory = require("../models").sub_category;
const sequelize = require("sequelize");

module.exports = {
  create(req, res) {
    return SubCategory
      .create({
        name: req.body.name,
        status_id: req.body.status_id
      })
      .then(sub_category => res.status(201).json(sub_category))
      .catch(error => res.status(400).send(error));
  },

  findAll(req, res) {
    const Status = require("../models").status;
    SubCategory.belongsTo(Status);

    return SubCategory
      .findAll({
        include: [{
          model: Status,
          where: {
            id: sequelize.col('sub_category.status_id')
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
    SubCategory.belongsTo(Status);

    return SubCategory
      .findOne({
        where: {
          id: req.params.id
        },
        include: [{
          model: Status,
          where: {
            id: sequelize.col('sub_category.status_id')
          }
        }],
        attributes: [
          'id',
          'name',
          'status_id', 
          [sequelize.fn('date_format', sequelize.col('sub_category.created_at'), '%d-%b-%y %H:%i'), 'created_at'],
          [sequelize.fn('date_format', sequelize.col('sub_category.updated_at'), '%d-%b-%y %H:%i'), 'updated_at']
        ]
      })
      .then(sub_category => sub_category ? res.json(sub_category) : res.status(404).json({
        "error": "Not found"
      }))
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    return SubCategory
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(sub_category => sub_category.destroy()
        .then(result => {
          res.json(result);
        }))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return SubCategory
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(sub_category => sub_category.update({
        name: req.body.name,
        status_id: req.body.status_id
      })
        .then(result => {
          res.json(result);
        }))
      .catch(error => res.status(400).send(error));
  }
};