'use strict'
const config = require('../config')

import { initPrinter, printHeader, printItems, printBarcode } from '../utils'

module.exports = {
  async print(req, res) {
    const order = req.body.orderData
    const printerId = parseInt(req.params.printerId)
    const selectedPrinter = await config.getPrinter(printerId)
    const isFiscal = selectedPrinter.fiscal
    const printer = initPrinter(printerId)
    const printerInterface = printer.Interface
    const isConnected = await printer.isPrinterConnected()
    const resp = {
      error: !isConnected,
      message: isConnected
        ? ''
        : `Atención!!! Impresora de tickets desconectada`,
      order,
      printerInterface,
      printer: selectedPrinter
    }
    if (!isConnected) {
      res.status(404).send(resp)
      return
    }
    printHeader(printer, order)
    printItems(printer, order)
    if (!isFiscal) printBarcode(printer, order)
    printer.cut()
    const execute = await printer.execute()
    if (!execute) {
      console.log('execute empty')
    }
    res.status(200).send(resp)
  }
}
