'use strict'
const config = require('../config')
const init = require('./init')
const header = require('./header')
const items = require('./items')
const barCode = require('./barCode')
const utils = require('../utils')

module.exports = {
  async print(req, res) {
    const { order } = req.body
    const printerId = parseInt(req.params.printerId)
    const selectedPrinter = await config.getPrinter(printerId)
    const printer = init.initPrinter(printerId)
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
      res.status(503).send(resp)
      return
    }
    header.printHeader(printer, order)
    items.printItems(printer, order)
    barCode.printBarcode(printer, order)
    printer.cut()
    const execute = await printer.execute()
    if (!execute) {
      console.log('execute empty')
    }
    res.status(200).send(resp)
  },
  async printStock(req, res) {
    const { order } = req.body
    const printerId = parseInt(req.params.printerId)
    const selectedPrinter = await config.getPrinter(printerId)
    const printer = init.initPrinter(printerId)
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
      res.status(503).send(resp)
      return
    }
    header.printHeader(printer, order)
    items.printStockItems(printer, order)
    printer.cut()
    const execute = await printer.execute()
    if (!execute) {
      console.log('execute empty')
    }
    res.status(200).send(resp)
  }

}
