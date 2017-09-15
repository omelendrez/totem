module.exports = function(sequelize, DataTypes) {
    const Discount = sequelize.define("Discount", {
        discountName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        discountDescription: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        discountPercentage: {
            type: DataTypes.DECIMAL(10,2),
            defaultValue: 0
        }
    }, {
        freezeTableName: true
    });

    return Discount;
};
