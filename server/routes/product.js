const Product = require("../models").Product;

module.exports = {
    create(req, res) {
        return Product
            .create({
                code: req.body.code,
                name: req.body.name,
                category_id: req.body.category_id,
                price: req.body.price
            })
            .then(product => res.status(201).send(product))
            .catch(error => res.status(400).send(error));
    },

    findAll(req, res) {
        return Product
            .findAll()
            .then(products => res.json(products))
            .catch(error => res.status(400).send(error));
    },

    findById(req, res) {
        return Product
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(product => res.json(product))
            .catch(error => res.status(400).send(error));
    },

    findByCategory(req, res) {
        return Product
            .findOne({
                where: {
                    CategoryId: req.params.id
                }
            })
            .then(product => res.json(product))
            .catch(error => res.status(400).send(error));
    }
};
