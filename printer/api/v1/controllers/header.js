const utils = require('../utils')
const config = require('../config')

module.exports.printHeader = (printer, order) => {
  const { order_number, date, time } = order
  const today = utils.getToday()
  const now = utils.getNow()
  printer.alignCenter()
  printer.bold(true)
  printer.setTextQuadArea()
  printer.println(order_number)
  printer.bold(false)
  printer.setTextNormal()
  printer.newLine()
  printer.println(`${date || today} ${time || now}`)
  printer.alignLeft()
  const header = config.header()
  header.forEach(line => {
    printer.println(line)
  })
  printer.alignLeft()
  printer.drawLine()
}
