'use strict'
const ThermalPrinter = require('node-thermal-printer').printer
const PrinterTypes = require('node-thermal-printer').types
let printer = new ThermalPrinter({
  type: PrinterTypes.EPSON,
  interface: `\\.\COM1`
})
module.exports = {
  async print(req, res) {
    const order = req.body.orderData
    console.log(`Printing order ${order.order_number}`)
    const isConnected = await printer.isPrinterConnected()
    if (!isConnected) {
      res
        .status(404)
        .send({ error: true, message: 'Atención!!! Impresora de tickets desconectada' })
      return
    }
    printer.alignCenter()
    printer.println(order.order_number)
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
