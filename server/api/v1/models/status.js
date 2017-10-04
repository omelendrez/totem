"use strict";
module.exports = function(sequelize, DataTypes) {
  const Status = sequelize.define("status", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    indexes: [{
      unique: true,
      fields: ["name"]
    }]
  });

  return Status;
};