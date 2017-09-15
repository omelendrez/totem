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
            type: DataTypes.DECIMAL(10,2),
            defaultValue: 0
        }
    }, {
        indexes: [{
            unique: true,
            fields: ["code"]
        }],
        underscored: true,
        paranoid: true,
        freezeTableName: true,
        tableName: "product"
    });

    return Product;
};
