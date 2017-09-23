"use strict";
module.exports = function(sequelize, DataTypes) {
    const Product = sequelize.define("product", {
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0
        },
        photo: {
            type: DataTypes.STRING,
            defaultValue: ""
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    }, {
        indexes: [{
            unique: true,
            fields: ["code"]
        }]
    });

    return Product;
};