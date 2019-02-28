"use strict"
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
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
      }
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["user_name"]
        }
      ]
    }
  )

  User.beforeCreate((user) => {
    return bcrypt.hash(user.password, 10)
      .then(hash => {
        user.password = hash;
      })
      .catch(() => {
        throw new Error();
      });
  });
  User.beforeUpdate((user) => {
    if (user.changed('password')) {
      return bcrypt.hash(user.password, 10)
        .then(hash => {
          user.password = hash;
        })
        .catch(() => {
          throw new Error();
        });
    }
  });


  return User
}
