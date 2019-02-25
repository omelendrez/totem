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
    const items = order.order_items
    const isConnected = await printer.isPrinterConnected()
    if (!isConnected) {
      res.status(404).send({
        error: true,
        message: 'Atención!!! Impresora de tickets desconectada'
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
    printer.bold(true)
    printer.setTextDoubleHeight()
    printer.setTextDoubleWidth()
    printer.tableCustom([
      { text: 'TOTAL =>', align: 'LEFT' },
      { text: order.total_price, align: 'RIGHT' }
    ])
    printer.println()
    printer.bold(false)
    printer.newLine()
    printer.setTextNormal()
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
