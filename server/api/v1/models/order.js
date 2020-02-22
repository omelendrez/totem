'use strict'
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'order',
    {
      totem_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      order_number: {
        type: DataTypes.STRING
      },
      total_price: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
      },
      discount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
      },
      net_price: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
      },
      payment_method: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      status_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      order_printed: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      stock_printed: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {
      indexes: [
        {
          fields: ['order_number']
        }
      ]
    }
  )

  return Order
}
