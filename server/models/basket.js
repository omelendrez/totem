module.exports = function(sequelize, DataTypes) {
    const Basket = sequelize.define("Basket", {
        productId: {
            type: DataTypes.INTEGER
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        unitPrice: {
            type: DataTypes.DECIMAL
        },
        totalPrice: {
            type: DataTypes.DECIMAL
        }
    }, {
        freezeTableName: true
    });

    return Basket;
};
