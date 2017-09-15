const Discount = require("../models").Discount;

module.exports = {

    create(req, res) {
        return Discount
            .create({
                discountName: req.body.discountName,
                discountDescription: req.body.discountDescription,
                discountPercentage: req.body.discountPercentage
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
