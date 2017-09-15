const Discount = require("../models").Discount;

module.exports = {

    create(req, res) {
        return Discount
            .create({
                name: req.body.name,
                description: req.body.description,
                percent: req.body.percent
            })
            .then(discount => res.status(201).send(discount))
            .catch(error => res.status(400).send(error));
    },

    findAll(req, res) {
        return Discount
            .findAll()
            .then(discount => res.json(discount))
            .catch(error => res.status(400).send(error));
    }
};
