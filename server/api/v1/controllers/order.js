"use strict";
const Order = require("../models").order;
const OrderItems = require("../models").order_items;

module.exports = {
  create(req, res) {
    var order_number = ("0".repeat(5) + (1).toString()).slice(-5);
    const items = req.body.basket;
    const data = [];
    let total_order = 0;

    Order.max("order_number")
      .then(max => {
        order_number = ("0".repeat(5) + (Number(max) + 1).toString()).slice(-5);
        Order.create({
          order_number
        })
          .then(order => {
            const orderId = order.id;
            order_number = order.order_number;
            items.map(item => {
              data.push({
                order_id: orderId,
                product_id: item.id,
                product_name: item.name,
                quantity: item.quantity,
                unit_price: item.price,
                total_price: item.totalPrice,
                discount: 0,
                net_price: item.totalPrice
              });
              total_order = total_order + parseFloat(item.totalPrice);
            });
            OrderItems.bulkCreate(data).then((items) => {
              Order.findOne({ where: { id: orderId } }).then(order => {
                order
                  .update({
                    total_price: total_order,
                    net_price: total_order
                  })
                  .then(() => {
                    res.json(201, {
                      order_number,
                      total_order,
                      items
                    });
                  });
              });
            });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log("err", err));
  },

  findAll(req, res) {
    return Order.findAll({
      raw: true
    })
      .then(orders => res.json(200, orders))
      .catch(error => res.status(400).send(error));
  },

  findById(req, res) {
    return Order.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(order =>
        order
          ? res.json(200, order)
          : res.status(404).json({
              error: "Not found"
            })
      )
      .catch(error => res.status(400).send(error));
  },

  findByNumber(req, res) {
    return Order.findAll({
      where: {
        order_number: req.params.id
      }
    })
      .then(order =>
        order
          ? res.json(200, order)
          : res.status(404).json({
              error: "Not found"
            })
      )
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    return Order.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(order =>
        order.destroy().then(result => {
          res.json(result);
        })
      )
      .catch(error => res.status(400).send(error));
  }
};
