"use strict";
const bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("user", {
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 50]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    status_id: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
  }, {
    indexes: [{
      unique: true,
      fields: ["user_name"]
    }]
  });

  return User;
};