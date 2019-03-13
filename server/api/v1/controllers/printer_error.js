'use strict'
const PrinterError = require('../models').printer_error

module.exports = {
  create(req, res) {
    const { data } = req.body
    const { order, printer, message } = data
    return PrinterError.create({
      orderNumber: order.order_number,
      printerId: printer.id,
      printerInteface: printer.interface,
      printerName: printer.name,
      errorMessage: message
    })
      .then(printerError => {
        res.status(201).json(printerError)
      })
      .catch(error => res.status(400).send(error))
  }
}
