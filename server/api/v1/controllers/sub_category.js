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

    const page = parseInt(req.query.page ? req.query.page : 0);
    const size = parseInt(req.query.size ? req.query.size : 1000);
    const sort = req.query.sort ? req.query.sort : 'name';
    const type = req.query.type ? req.query.type : 'asc';
    const filter = req.query.filter ? req.query.filter : '';

    return SubCategory
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
            id: sequelize.col('sub_category.status_id')
          }
        }],
        attributes: [
          'id',
          'name',
          'image'
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
          'image',
          'status_id', [sequelize.fn('date_format', sequelize.col('sub_category.created_at'), '%d-%b-%y %H:%i'), 'created_at'],
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