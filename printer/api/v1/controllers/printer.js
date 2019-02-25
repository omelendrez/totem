'use strict'
const ThermalPrinter = require('node-thermal-printer').printer
const PrinterTypes = require('node-thermal-printer').types
let printer = new ThermalPrinter({
  type: PrinterTypes.EPSON,
  interface: 'tcp://192.168.0.5'
})
module.exports = {
  async print(req, res) {
    const order = req.body.orderData
    const isConnected = await printer.isPrinterConnected()
    if (!isConnected) {
      res.status(404).send({
        error: true,
        message: 'Atención!!! Impresora de tickets desconectada'
      })
      return
    }
    printer.alignCenter()

    printer.println(order.order_number)
    var data = order.order_number // Barcode data (string or buffer)
    var type = 74 // Barcode type (See Reference)
    var settings = {
      // Optional Settings
      hriPos: 0, // Human readable character 0 - 3 (none, top, bottom, both)
      hriFont: 0, // Human readable character font
      width: 3, // Barcode width
      height: 168 // Barcode height
    }

    printer.printBarcode(data, type, settings)

    printer.cut()
    printer.execute(err => {
      if (err) {
        res
          .status(500)
          .send({ error: true, message: 'Error imprimiento ticket' })
        return
      }
      res.status(200).send({ error: false })
    })
  }
}
