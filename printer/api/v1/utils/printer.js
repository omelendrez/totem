'use strict'
module.exports = {
  print(req, res) {
    res.status(200).send({ order_number: req.body.order_number })
  }
}
