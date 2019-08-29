module.exports.printItems = (printer, order) => {
  const { order_items: items, total_price: orderTotal } = order
  items.map(item => {
    const { ticket_text, unit_price, quantity, total_price } = item
    printer.alignLeft()
    printer.println(ticket_text)
    printer.tableCustom([
      {
        text: `${unit_price} X ${quantity}`,
        align: 'LEFT'
      },
      { text: total_price, align: 'RIGHT', bold: true }
    ])
  })
  printer.alignLeft()
  printer.println()
  printer.bold(true)

  printer.tableCustom([
    { text: 'TOTAL =>', align: 'LEFT' },
    { text: orderTotal, align: 'RIGHT' }
  ])
  printer.bold(false)
  printer.setTextNormal()
  printer.drawLine()
  printer.newLine()
  printer.alignCenter()
}
