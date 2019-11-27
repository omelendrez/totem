"use strict"
const CCPayment = require("../models").cc_payment

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
    return CCPayment.findAndCountAll({
      attributes: ["id", "order_id", "response"]
    })
      .then(cc_payments => {
        const parsedResponse = cc_payments.rows.map(row => {
          return {
            id: row.id,
            orderId: row.orderId,
            response: JSON.parse(row.response)
          }
        })
        res.status(200).json(parsedResponse)
      })
      .catch(error => res.status(400).send(error))
  }
}
