"use strict"
module.exports = (sequelize, DataTypes) => {
  const CCPayment = sequelize.define("cc_payment", {
    order_id: {
      type: DataTypes.INTEGER
    },
    response: {
      type: DataTypes.STRING(8000)
    }
  })
  return CCPayment
}
