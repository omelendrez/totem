"use strict";
module.exports = function(sequelize, DataTypes) {
    const Discount = sequelize.define("discount", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        percent: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    });

    return Discount;
};