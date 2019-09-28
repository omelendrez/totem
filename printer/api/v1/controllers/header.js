const config = require('../config')

module.exports.printHeader = (printer, order) => {
  const { order_number, date, time } = order
  printer.alignCenter()
  //printer.printImage(`${__dirname}/../assets/logo.png`)
  //printer.printImage('../assets/logo.png')
  printer.bold(true)
  printer.setTextQuadArea()
  printer.println(order_number)
  printer.bold(false)
  printer.setTextNormal()
  printer.newLine()
  printer.println(`${date} ${time}`)
  printer.alignLeft()
  const header = config.header()
  header.forEach(line => {
    printer.println(line)
  })
  printer.alignLeft()
  printer.drawLine()
}
