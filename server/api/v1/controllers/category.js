"use strict";
const Category = require("../models").category;

module.exports = {
    create(req, res) {
        return Category
            .create({
                name: req.body.name,
            })
            .then(category => res.status(201).json(category))
            .catch(error => res.status(400).send(error));
    },

    findAll(req, res) {
        return Category
            .findAll({ raw: true })
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
            .then(category => category ? res.json(category) : res.status(404).json({
                "error": "Not found"
            }))
            .catch(error => res.status(400).send(error));
    },

    delete(req, res) {
        return Category
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(category => category.destroy()
                .then(result => {
                    res.json(result);
                }))
            .catch(error => res.status(400).send(error));
    },

    update(req, res) {
        return Category
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(category => category.update({
                name: req.body.name
            })
                .then(result => {
                    res.json(result);
                }))
            .catch(error => res.status(400).send(error));
    }
};