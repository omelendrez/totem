const User = require('../models').User;

module.exports = {
  create(req, res) {
    return User
      .create({
        userName: req.body.userName,
        userPassword: req.body.userPassword,
        userFullName: req.body.userFullName,
        userPhoto: req.body.userPhoto
      })
      .then(User => res.status(201).send(User))
      .catch(error => res.status(400).send(error));
  },

  findAll(req, res) {
    return User
      .findAll()
      .then(Users => res.json(Users))
      .catch(error => res.status(400).send(error));
  }
};
