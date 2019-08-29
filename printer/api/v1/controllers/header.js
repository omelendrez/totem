const config = require('../config')

module.exports.printHeader = async (printer, order) => {
  const { order_number, date, time } = order
  printer.alignCenter()
  await printer.printImage(`${__dirname}/../assets/logo.png`)
  //await printer.printImage('../assets/logo.png')
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
