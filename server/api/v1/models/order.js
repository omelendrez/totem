module.exports = function(sequelize, DataTypes) {
	const Order = sequelize.define("order", {
		order_number: {
			type: DataTypes.STRING
		},
		product_id: {
			type: DataTypes.INTEGER
		},
		quantity: {
			type: DataTypes.INTEGER
		},
		unit_price: {
			type: DataTypes.DECIMAL(10, 2),
			defaultValue: 0
		},
		total_price: {
			type: DataTypes.DECIMAL(10, 2),
			defaultValue: 0
		},
		discount: {
			type: DataTypes.DECIMAL(10, 2),
			defaultValue: 0
		},
		net_price: {
			type: DataTypes.DECIMAL(10, 2),
			defaultValue: 0
		},
		status: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		}
	}, {
		paranoid: true,
		indexes: [{
			unique: true,
			fields: ["order_number"]
		}]
	});

	return Order;
};
