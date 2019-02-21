"use strict"
module.exports = (sequelize, DataTypes) => {
  const Config = sequelize.define("config", {
    updates: {
      type: DataTypes.TINYINT
    }
  })

  return Config
}
