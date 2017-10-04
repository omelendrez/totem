"use strict";
const User = require("../models").user;
const sequelize = require("sequelize");

module.exports = {
  create(req, res) {
    return User
      .create({
        user_name: req.body.user_name,
        password: req.body.password,
        full_name: req.body.full_name
      })
      .then(user => res.status(201).json(user))
      .catch(error => res.status(400).send(error));
  },

  findAll(req, res) {
    const Status = require("../models").status;
    User.belongsTo(Status);

    return User
      .findAll({
        include: [{
          model: Status,
          where: {
            id: sequelize.col('user.status_id')
          }
        }],
        attributes: [
          'id',
          'user_name',
          'full_name'
        ]
      })
      .then(users => res.json(users))
      .catch(error => res.status(400).json(error));
  },

  findById(req, res) {
    const Status = require("../models").status;
    User.belongsTo(Status);

    return User
      .findOne({
        where: {
          id: req.params.id
        },
        include: [{
          model: Status,
          where: {
            id: sequelize.col('user.status_id')
          }
        }],
        attributes: [
          'id',
          'user_name',
          'full_name',
          'status_id', [sequelize.fn('date_format', sequelize.col('user.created_at'), '%d-%b-%y %H:%i'), 'created_at'],
          [sequelize.fn('date_format', sequelize.col('user.updated_at'), '%d-%b-%y %H:%i'), 'updated_at']
        ]
      })
      .then(user => user ? res.json(user) : res.status(404).json({
        "error": "Not found"
      }))
      .catch(error => res.status(400).send(error));
  },

  login(req, res) {
    return User
      .findOne({
        where: {
          user_name: req.query.user_name,
          password: req.query.password
        }
      })
      .then(user => user ? res.json(user) : res.status(404).json({
        "error": "Not found"
      }))
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    return User
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(user => user.destroy()
        .then(result => {
          res.json(result);
        }))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return User
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(user => user.update({
        user_name: req.body.user_name,
        full_name: req.body.full_name,
        status_id: req.body.status_id
      })
        .then(result => {
          res.json(result);
        }))
      .catch(error => res.status(400).send(error));
  }
};