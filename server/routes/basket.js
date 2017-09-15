const Basket = require("../models").Basket;

module.exports = {

    create(req, res) {
        return Basket
            .create({
                productId: req.body.productId,
                quantity: req.body.quantity,
                unitPrice: req.body.unitPrice,
                totalPrice: req.body.totalPrice
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
