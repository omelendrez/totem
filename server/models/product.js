module.exports = function(sequelize, DataTypes) {
    var Product = sequelize.define("Product", {
        productName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Product;
};
