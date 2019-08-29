'use strict'
module.exports = (sequelize, DataTypes) => {
  const PrinterError = sequelize.define('printer_error', {
    order_number: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    printer_id: {
      type: DataTypes.INTEGER
    },
    printer_interface: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    printer_name: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    error_message: {
      type: DataTypes.STRING,
      defaultValue: ''
    }
  })

  return PrinterError
}
