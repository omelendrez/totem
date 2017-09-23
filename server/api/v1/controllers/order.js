"use strict";
const Order = require("../models").order;
const Basket = require("../models").basket;

var new_order_number = 0;
module.exports = {
 
    create(req, res) {
        Order.max("order_number").then(max => {
            new_order_number = ("0".repeat(5) + (Number(max) + 1).toString()).slice(-5);
        });
        let total_order = 0;
        let items = 0;
        Basket
            .findAll()
            .then(basket => {
                basket.forEach((item) => {
                    const record = item.get({
                        plain: true
                    });
                    Order
                        .create({
                            order_number: new_order_number,
                            product_id: record.product_id,
                            quantity: record.quantity,
                            unit_price: record.unit_price,
                            total_price: record.total_price,
                            discount: record.discount,
                            net_price: record.net_price
                        });
                    total_order = total_order + parseFloat(record.net_price);
                    items++;
                }); // End forEach
            })
            .then(() => {
                Basket.destroy({
                    where: {},
                    truncate: true
                });
                res.json(201, {
                    order_number: new_order_number,
                    total_order: total_order,
                    items: items
                });
            })
            .catch(error => res.status(400).json(error));

    },

    findAll(req, res) {
        return Order
            .findAll()
            .then(orders => res.json(200, orders))
            .catch(error => res.status(400).send(error));
    },

    findById(req, res) {
        return Order
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(order => order ? res.json(200, order) : res.status(404).json({
                error: "Not found"
            }))
            .catch(error => res.status(400).send(error));
    },

    findByNumber(req, res) {
        return Order
            .findAll({
                where: {
                    order_number: req.params.id
                }
            })
            .then(order => order ? res.json(200, order) : res.status(404).json({
                error: "Not found"
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