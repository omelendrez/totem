'use strict'
const ThermalPrinter = require('node-thermal-printer').printer
const PrinterTypes = require('node-thermal-printer').types
let printer = new ThermalPrinter({
  type: PrinterTypes.EPSON,
  interface: '\\.COM1'
})
module.exports = {
  print(req, res) {
    printer.alignCenter()
    printer.println(req.body.order_number)
    printer.cut()
    try {
      let execute = printer.execute()
      console.error('Print done!')
    } catch (error) {
      console.log('Print failed:', error)
    }
    res.status(200).send({ order_number: req.body.order_number })
  }
}
