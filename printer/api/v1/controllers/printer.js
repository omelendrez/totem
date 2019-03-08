'use strict'
const config = require('../config')

module.exports = {
  async print(req, res) {
    const ThermalPrinter = require('node-thermal-printer').printer
    const PrinterTypes = require('node-thermal-printer').types
    const printerId = parseInt(req.params.printerId)
    let printer = new ThermalPrinter({
      type: PrinterTypes.EPSON,
      interface: config.getPrinter(printerId).interface
    })
    const printerInterface = printer.Interface
    const order = req.body.orderData
    const items = order.order_items
    const isConnected = await printer.isPrinterConnected()
    if (!isConnected) {
      res.status(404).send({
        error: true,
        message: 'Atención!!! Impresora de tickets desconectada',
        order,
        printerInterface
      })
      return
    }
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
    const header = await config.header()
    header.forEach(line => {
      printer.println(line)
    })
    printer.alignLeft()
    printer.drawLine()
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
    const data = order.order_number
    const type = 74
    const settings = {
      hriPos: 0,
      hriFont: 0,
      width: 3,
      height: 168
    }
    printer.printBarcode(data, type, settings)
    printer.cut()
    const execute = await printer.execute()
    if (!execute) {
      console.log('execute empty')
    }
    res.status(200).send({ error: false, message: '', order, printerInterface })
  }
}
