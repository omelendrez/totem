'use strict'
module.exports = (sequelize, DataTypes) => {
  const OrderItems = sequelize.define(
    'order_items',
    {
      order_id: {
        type: DataTypes.INTEGER
      },
      product_id: {
        type: DataTypes.INTEGER
      },
      product_name: {
        type: DataTypes.STRING
      },
      quantity: {
        type: DataTypes.INTEGER
      },
      kitchen_text: {
        type: DataTypes.STRING
      },
      ticket_text: {
        type: DataTypes.STRING
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
          fields: ['order_id']
        }
      ]
    }
  )

  return OrderItems
}
