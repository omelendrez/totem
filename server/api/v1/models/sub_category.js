"use strict";
module.exports = function(sequelize, DataTypes) {
  const SubCategory = sequelize.define("sub_category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: ""
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

  return SubCategory;
};