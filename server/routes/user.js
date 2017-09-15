const User = require("../models").User;

module.exports = {
    create(req, res) {
        return User
            .create({
                userName: req.body.userName,
                userPassword: req.body.userPassword,
                userFullName: req.body.userFullName,
                userPhoto: req.body.userPhoto
            })
            .then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error));
    },

    findAll(req, res) {
        return User
            .findAll()
            .then(users => res.json(users))
            .catch(error => res.status(400).send(error));
    },

    findById(req, res) {
        return User
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(user => res.json(user))
            .catch(error => res.status(400).send(error));
    }

};
