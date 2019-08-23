'use strict'
const PrinterError = require('../models').printer_error

module.exports = {
  create(req, res) {
    const { order, printer, message } = req.body.printError
    const payload = {
      order_number: order.order_number,
      printer_id: printer.id,
      printer_inteface: printer.interface,
      printer_name: printer.name,
      error_message: message
    }
    return PrinterError.create(payload)
      .then(printerError => {
        res.status(201).json(printerError)
      })
      .catch(error => res.status(400).send(error))
  }
}
