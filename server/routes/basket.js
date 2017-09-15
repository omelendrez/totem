const Basket = require("../models").Basket;

module.exports = {

    create(req, res) {
        return Basket
            .create({
                product_id: req.body.product_id,
                quantity: req.body.quantity,
                unit_price: req.body.unit_price,
                total_price: req.body.total_price
            })
            .then(basket => res.status(201).send(basket))
            .catch(error => res.status(400).send(error));
    },

    findAll(req, res) {
        return Basket
            .findAll()
            .then(basket => res.json(basket))
            .catch(error => res.status(400).send(error));
    }
};
