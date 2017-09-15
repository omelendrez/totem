module.exports = function(sequelize, DataTypes) {
	const Category = sequelize.define("category", {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		indexes: [{
			unique: true,
			fields: ["name"]
		}],
		paranoid: true
	});

	return Category;
};
