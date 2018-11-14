"use strict";
const Config = require("../models").config;

module.exports = {
  update() {
    return Config.findOne({
      where: {
        id: 1
      }
    }).then(config =>
      config
        .update({
          updates: 1
        })
        .then(console.log("ok"))
        .catch(err => console.log(err))
    );
  },
  aknowledge(req, res) {
    Config.findOne({
      where: {
        id: 1
      }
    }).then(config =>
      config
        .update({
          updates: 0
        })
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err))
    );
  },
  getStatus(req, res) {
    return Config.findOne({
      where: {
        id: 1
      },
      attributes: ["updates"]
    }).then(config => res.status(200).json(config));
  }
};
