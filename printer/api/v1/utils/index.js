'use strict'
const config = require('../config')

export const initPrinter = printerId => {
  const ThermalPrinter = require('node-thermal-printer').printer
  const PrinterTypes = require('node-thermal-printer').types
  const selectedPrinter = await config.getPrinter(printerId)
  let printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: selectedPrinter.interface
  })
  return printer
}

export const printHeader = async (printer, order) => {
  const selectedPrinter = await config.getPrinter(printerId)
  const isFiscal = selectedPrinter.fiscal
  printer.alignCenter()
  if (!isFiscal) {
    await printer.printImage(`${__dirname}/../assets/logo.png`)
  }
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
}

export const printItems = (printer, order) => {
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

export const printBarcode = (printer, order) => {
  printer.printBarcode(order.order_number, 74, {
    hriPos: 0,
    hriFont: 0,
    width: 3,
    height: 168
  })
}