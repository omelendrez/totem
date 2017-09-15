const Category = require("../models").Category;

module.exports = {
    create(req, res) {
        return Category
            .create({
                name: req.body.name,
            })
            .then(category => res.status(201).send(category))
            .catch(error => res.status(400).send(error));
    },

    findAll(req, res) {
        return Category
            .findAll()
            .then(categories => res.json(categories))
            .catch(error => res.status(400).send(error));
    },

    findById(req, res) {
        return Category
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(category => res.json(category))
            .catch(error => res.status(400).send(error));
    }

};
