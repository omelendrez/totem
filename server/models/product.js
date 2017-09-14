module.exports = function(sequelize, DataTypes) {
    var Product = sequelize.define("Product", {
        productName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        CategoryId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return Product;
};
