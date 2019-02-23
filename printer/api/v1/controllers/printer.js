'use strict'
const ThermalPrinter = require('node-thermal-printer').printer
const PrinterTypes = require('node-thermal-printer').types
let printer = new ThermalPrinter({
  type: PrinterTypes.EPSON,
  interface: '\\.COM1'
})
module.exports = {
  print(req, res) {
    const order =req.body.orderData
    printer.alignCenter()
    printer.println(order.order_number)
    printer.cut()
    try {
      let execute = printer.execute()
      console.error('Print done!', order.order_number, execute)
    } catch (error) {
      console.log('Print failed:', error)
    }
    res.status(200).send({ order_number: order.order_number })
  }
}
