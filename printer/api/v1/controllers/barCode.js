module.exports.printBarcode = (printer, order) => {
  printer.printBarcode(order.order_number, 74, {
    hriPos: 0,
    hriFont: 0,
    width: 3,
    height: 168
  })
}
