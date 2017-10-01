"use strict";
const Status = require("../models").status;

module.exports = {
  findAll(req, res) {
    return Status
      .findAll({
        raw: true
      })
      .then(status => res.json(status))
      .catch(error => res.status(400).json(error));
  }
};