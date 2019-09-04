/*
ALTER TABLE `escng_totem`.`product`
ADD COLUMN `small_price` DECIMAL(10,2) NULL DEFAULT '0.00'  AFTER `price`,
ADD COLUMN `medium_price` DECIMAL(10,2) NULL DEFAULT '0.00'  AFTER `small_price`,
ADD COLUMN `big_price` DECIMAL(10,2) NULL DEFAULT '0.00'  AFTER `medium_price`;

*/
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
      small_price: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
      },
      medium_price: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
      },
      big_price: {
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
