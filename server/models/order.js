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
            type: DataTypes.DECIMAL(10,2),
            defaultValue: 0
        },
        totalPrice: {
            type: DataTypes.DECIMAL(10,2),
            defaultValue: 0
        },
        totalDiscount: {
            type: DataTypes.DECIMAL(10,2),
            defaultValue: 0
        },
        netPrice: {
            type: DataTypes.DECIMAL(10,2),
            defaultValue: 0
        }
    }, {
        freezeTableName: true
    });

    return Order;
};
