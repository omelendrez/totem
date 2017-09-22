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
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
    }, {
        indexes: [{
            unique: true,
            fields: ["user_name"]
        }],
        hooks: {
            beforeCreate: user => {
                const salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(user.password, salt);
            },
            beforeUpdate: user => {
                const salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(user.password, salt);
            }
        }
    });

    return User;
};