"use strict"
module.exports = (sequelize, DataTypes) => {
  const Totem = sequelize.define(
    "totem",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["name"]
        }
      ]
    }
  )

  return Totem
}
