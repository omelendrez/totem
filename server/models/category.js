module.exports = function(sequelize, DataTypes) {
    const Category = sequelize.define("Category", {
        categoryName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        indexes: [{
            unique: true,
            fields: ["categoryName"]
        }]
    }, {
        freezeTableName: true
    });

    return Category;
};
