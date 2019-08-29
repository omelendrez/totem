const config = require('../config')

module.exports.initPrinter = printerId => {
  const ThermalPrinter = require('node-thermal-printer').printer
  const PrinterTypes = require('node-thermal-printer').types
  let printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: config.getPrinter(printerId).interface
  })
  return printer
}
