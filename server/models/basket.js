module.exports = function(sequelize, DataTypes) {
    const Basket = sequelize.define("Basket", {
        productId: {
            type: DataTypes.INTEGER
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        unitPrice: {
            type: DataTypes.DECIMAL(10,2),
            defaultValue: 0
        },
        totalPrice: {
            type: DataTypes.DECIMAL(10,2),
            defaultValue: 0
        }
    }, {
        freezeTableName: true
    });

    return Basket;
};
