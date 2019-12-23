"use strict"
const sequelize = require('sequelize')
const CCPayment = require("../models").cc_payment
const Order = require('../models').order

module.exports = {
  create(req, res) {
    const { orderId, response } = req.body
    return CCPayment.create({
      order_id: orderId,
      response
    })
      .then(cc_payment => {
        res.status(201).json(cc_payment)
      })
      .catch(error => res.status(400).send(error))
  },

  findAll(req, res) {
    CCPayment.belongsTo(Order)
    Order.hasMany(CCPayment)
    const page = parseInt(req.query.page ? req.query.page : 0)
    const size = parseInt(req.query.size ? req.query.size : 1000)
    return CCPayment.findAndCountAll({
      order: [['order_id', 'desc'], ['id', 'desc']],
      offset: size !== 1000 ? (page - 1) * size : 0,
      limit: size,
      attributes: ["id", "order_id", "response", [
        sequelize.fn(
          'date_format',
          sequelize.col('cc_payment.created_at'),
          '%d-%b-%y %H:%i'
        ),
        'created_at'
      ]],
      include: [
        {
          model: Order,
          where: {
            id: sequelize.col('cc_payment.order_id')
          },
          attributes: ['order_number', 'total_price', 'status_id']
        }]
    })
      .then(cc_payments => res.status(200).json(cc_payments))
      .catch(error => res.status(400).send(error))
  }
}
