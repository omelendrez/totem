'use strict'
module.exports = (sequelize, DataTypes) => {
  const PrinterError = sequelize.define('printer_error', {
    orderNumber: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    printerId: {
      type: DataTypes.INTEGER
    },
    printerInteface: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    printerName: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    errorMessage: {
      type: DataTypes.STRING,
      defaultValue: ''
    }
  })

  return PrinterError
}
