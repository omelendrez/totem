const Discount = require("../models").discount;

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
            .then(discounts => res.json(discounts))
            .catch(error => res.status(400).send(error));
    }
};
