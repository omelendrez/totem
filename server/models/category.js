module.exports = function(sequelize, DataTypes) {
    var Category = sequelize.define("Category", {
        categoryName:{
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Category;
};
