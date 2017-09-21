const Basket = require("../models").basket;

module.exports = {

    create(req, res) {
        return Basket
            .create({
                product_id: req.body.product_id,
                quantity: req.body.quantity,
                unit_price: req.body.unit_price,
                total_price: req.body.total_price,
                discount: req.body.discount,
                net_price: req.body.net_price
            })
            .then(basket => res.status(201).json(basket))
            .catch(error => res.status(400).json(error));
    },

    findAll(req, res) {
        return Basket
            .findAll()
            .then(basket => res.json(basket))
            .catch(error => res.status(400).send(error));
    }
};
