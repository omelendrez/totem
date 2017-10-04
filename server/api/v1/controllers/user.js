"use strict";
const User = require("../models").user;

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
    return User
      .findAll({
        raw: true
      })
      .then(users => res.json(users))
      .catch(error => res.status(400).json(error));
  },

  findById(req, res) {
    return User
      .findOne({
        where: {
          id: req.params.id
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
          status: req.body.status
        })
        .then(result => {
          res.json(result);
        }))
      .catch(error => res.status(400).send(error));
  }
};