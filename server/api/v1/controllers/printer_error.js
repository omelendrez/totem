'use strict'
const sequelize = require('sequelize')
const Op = sequelize.Op

const PrinterError = require('../models').printer_error

module.exports = {
  create(req, res) {
    const { order, printer, message } = req.body.printError
    const payload = {
      order_number: order.order_number,
      printer_id: printer.id,
      printer_interface: printer.interface,
      printer_name: printer.name,
      error_message: message
    }
    return PrinterError.create(payload)
      .then(printerError => {
        res.status(201).json(printerError)
      })
      .catch(error => res.status(400).send(error))
  },

  findAll(req, res) {
    const page = parseInt(req.query.page ? req.query.page : 0)
    const size = parseInt(req.query.size ? req.query.size : 1000)
    const sort = req.query.sort ? req.query.sort : 'order_number'
    const type = req.query.type ? req.query.type : 'asc'
    const filter = req.query.filter ? req.query.filter : ''

    PrinterError.findAndCountAll({
      where: {
        printer_name: {
          [Op.like]: '%' + filter + '%'
        }
      },
      order: [[sort, type]],
      offset: size !== 1000 ? (page - 1) * size : 0,
      limit: size,
      attributes: ['id', 'order_number', 'printer_interface', 'printer_name', 'error_message', 'printer_id', [
        sequelize.fn(
          'date_format',
          sequelize.col('created_at'),
          '%d-%b-%y %H:%i'
        ),
        'created_at'
      ]]
    })
      .then(printerErrors => res.status(200).json(printerErrors))
      .catch(error => res.status(400).send(error))
  }
}