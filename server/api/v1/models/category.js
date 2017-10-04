"use strict";
module.exports = function(sequelize, DataTypes) {
  const Category = sequelize.define("category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status_id: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    indexes: [{
      unique: true,
      fields: ["name"]
    }]
  });

  return Category;
};