module.exports = function(sequelize, DataTypes) {
	const ProductDiscount = sequelize.define("product_discount", {
		product_id: {
			type: DataTypes.INTEGER
		},
		discount_id: {
			type: DataTypes.INTEGER
		}
	});

	return ProductDiscount;
};
