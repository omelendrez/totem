"use strict";
const Status = require("../models").status;

module.exports = {
  create(req, res) {
    return Status
      .create({
        name: req.body.name
      })
      .then(status => res.status(201).send(status))
      .catch(error => res.status(400).send(error));
  },

  findAll(req, res) {
    return Status
      .findAll({
        raw: true
      })
      .then(status => res.json(status))
      .catch(error => res.status(400).json(error));
  }
};