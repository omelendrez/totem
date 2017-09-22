"use strict";
module.exports = function(sequelize, DataTypes) {
    const Basket = sequelize.define("basket", {
        product_id: {
            type: DataTypes.INTEGER
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        unit_price: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0
        },
        total_price: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0
        },
        discount: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0
        },
        net_price: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0
        }
    });

    return Basket;
};