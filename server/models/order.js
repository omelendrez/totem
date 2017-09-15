module.exports = function(sequelize, DataTypes) {
    const Order = sequelize.define("Order", {
        orderNumber: {
            type: DataTypes.STRING
        },
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
        },
        totalDiscount: {
            type: DataTypes.DECIMAL
        },
        netPrice: {
            type: DataTypes.DECIMAL
        }
    }, {
        freezeTableName: true
    });

    return Order;
};
