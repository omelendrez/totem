"use strict";
const Category = require("../models").category;
const Config = require("./config");
const sequelize = require("sequelize");

const update = val => {
  Config.update(val);
};

module.exports = {
  create(req, res) {
    return Category.create({
      name: req.body.name,
      status_id: req.body.status_id
    })
      .then(category => {
        update();
        res.status(201).json(category);
      })
      .catch(error => res.status(400).send(error));
  },

  findAll(req, res) {
    const Status = require("../models").status;
    Category.belongsTo(Status);

    const page = parseInt(req.query.page ? req.query.page : 0);
    const size = parseInt(req.query.size ? req.query.size : 1000);
    const sort = req.query.sort ? req.query.sort : "name";
    const type = req.query.type ? req.query.type : "asc";
    const filter = req.query.filter ? req.query.filter : "";

    return Category.findAndCountAll({
      where: {
        name: {
          $like: "%" + filter + "%"
        }
      },
      order: [[sort, type]],
      offset: size !== 1000 ? (page - 1) * size : 0,
      limit: size,
      include: [
        {
          model: Status,
          where: {
            id: sequelize.col("category.status_id")
          }
        }
      ],
      attributes: ["id", "name", "image"]
    })
      .then(categories => {
        update(0);
        res.json(categories);
      })
      .catch(error => res.status(400).send(error));
  },

  findById(req, res) {
    const Status = require("../models").status;
    Category.belongsTo(Status);

    return Category.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Status,
          where: {
            id: sequelize.col("category.status_id")
          }
        }
      ],
      attributes: [
        "id",
        "name",
        "image",
        "status_id",
        [
          sequelize.fn(
            "date_format",
            sequelize.col("category.created_at"),
            "%d-%b-%y %H:%i"
          ),
          "created_at"
        ],
        [
          sequelize.fn(
            "date_format",
            sequelize.col("category.updated_at"),
            "%d-%b-%y %H:%i"
          ),
          "updated_at"
        ]
      ]
    })
      .then(
        category =>
          category
            ? res.json(category)
            : res.status(404).json({
              error: "Not found"
            })
      )
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    return Category.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(category =>
        category.destroy().then(result => {
          update();
          res.status(204).json(result);
        })
      )
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Category.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(category =>
        category
          .update({
            name: req.body.name,
            status_id: req.body.status_id
          })
          .then(result => {
            update();
            res.json(result);
          })
      )
      .catch(error => res.status(400).send(error));
  }
};
