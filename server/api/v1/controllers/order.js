const Order = require("../models").order;
const Basket = require("../models").basket;

module.exports = {

    create(req, res) {
        var last_order = 0;
        Order.max("order_number").then( max => {
            last_order = Number(max)+1;
            last_order = last_order.toString();
            last_order = "00000" + last_order;
            last_order = last_order.slice(-5);
        });
        Basket
            .findAll()
            .then(basket => {
                basket.forEach((item) => {
                    const record = item.get({
                        plain: true
                    });
                    Order
                        .create({
                            order_number: last_order,
                            product_id: record.product_id,
                            quantity: record.quantity,
                            unit_price: record.unit_price,
                            total_price: record.total_price,
                            discount: 0,
                            net_price: record.total_price
                        });
                });
            })
            .then(() => {
                Basket.destroy({
                    where: {},
                    truncate: true
                });
                res.send(201);
            })
            .catch(error => res.status(400).json(error));
        return;

    },

    findAll(req, res) {
        return Order
            .findAll()
            .then(orders => res.json(orders))
            .catch(error => res.status(400).send(error));
    },

    findById(req, res) {
        return Order
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(order => order ? res.json(order) : res.status(404).json({
                "error": "Not found"
            }))
            .catch(error => res.status(400).send(error));
    },

    delete(req, res) {
        return Order
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(order => order.destroy()
                .then(result => {
                    res.json(result);
                }))
            .catch(error => res.status(400).send(error));
    }

};
