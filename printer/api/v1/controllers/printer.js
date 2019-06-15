'use strict'
const config = require('../config')

const initPrinter = printerId => {
  const ThermalPrinter = require('node-thermal-printer').printer
  const PrinterTypes = require('node-thermal-printer').types
  let printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: config.getPrinter(printerId).interface
  })
  return printer
}

const printHeader = async (printer, order) => {
  printer.alignCenter()
  await printer.printImage(`${__dirname}/../assets/logo.png`)
  printer.bold(true)
  printer.setTextQuadArea()
  printer.println(order.order_number)
  printer.bold(false)
  printer.setTextNormal()
  printer.newLine()
  printer.println(order.date + ' ' + order.time)
  printer.alignLeft()
  const header = config.header()
  header.forEach(line => {
    printer.println(line)
  })
  printer.alignLeft()
  printer.drawLine()
}

const printItems = (printer, order) => {
  const items = order.order_items
  items.map(item => {
    printer.alignLeft()
    printer.println(item.ticket_text)
    printer.tableCustom([
      {
        text: `${item.unit_price} X ${item.quantity}`,
        align: 'LEFT'
      },
      { text: item.total_price, align: 'RIGHT', bold: true }
    ])
  })
  printer.alignLeft()
  printer.println()
  printer.bold(true)

  printer.tableCustom([
    { text: 'TOTAL =>', align: 'LEFT' },
    { text: order.total_price, align: 'RIGHT' }
  ])
  printer.bold(false)
  printer.setTextNormal()
  printer.drawLine()
  printer.newLine()
  printer.alignCenter()
}

const printBarcode = (printer, order) => {
  printer.printBarcode(order.order_number, 74, {
    hriPos: 0,
    hriFont: 0,
    width: 3,
    height: 168
  })
}

module.exports = {
  async print(req, res) {
    const order = req.body.orderData
    const printerId = parseInt(req.params.printerId)
    const selectedPrinter = await config.getPrinter(printerId)
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
      res.status(503).send(resp)
      return
    }
    printHeader(printer, order)
    printItems(printer, order)
    printBarcode(printer, order)
    printer.cut()
    const execute = await printer.execute()
    if (!execute) {
      console.log('execute empty')
    }
    res.status(200).send(resp)
  }
}
