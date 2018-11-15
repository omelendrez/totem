"use strict"
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "order",
    {
      order_number: {
        type: DataTypes.STRING
      },
      product_id: {
        type: DataTypes.INTEGER
      },
      quantity: {
        type: DataTypes.INTEGER
      },
      unit_price: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
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
      status_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {
      indexes: [
        {
          fields: ["order_number"]
        }
      ]
    }
  )

  return Order
}
