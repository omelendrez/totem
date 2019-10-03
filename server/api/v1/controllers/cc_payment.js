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
  }
}
