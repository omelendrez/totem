'use strict'
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'product',
    {
      code: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      kitchen_text: {
        type: DataTypes.STRING,
        defaultValue: ''
      },
      ticket_text: {
        type: DataTypes.STRING,
        allowNull: false
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
      },
      image: {
        type: DataTypes.STRING,
        defaultValue: ''
      },
      is_combo: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      has_alcohol: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      status_id: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      }
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['code']
        }
      ]
    }
  )

  return Product
}
