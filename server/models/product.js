module.exports = function(sequelize, DataTypes) {
	var Product = sequelize.define("Product", {
        productCode: {
			type: DataTypes.STRING,
			allowNull: false
		},
        productName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		CategoryId: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, {
		indexes: [{
			unique: true,
			fields: ["productCode"]
		}]
	});

	return Product;
};
