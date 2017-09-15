const Order = require("../models").order;

module.exports = {

	create(req, res) {
		return Order
			.create({
				product_id: req.body.product_id,
				quantity: req.body.quantity,
				unit_price: req.body.unit_price,
				total_price: req.body.total_price
			})
			.then(order => res.status(201).send(order))
			.catch(error => res.status(400).send(error));
	},

	findAll(req, res) {
		return Order
			.findAll()
			.then(orders => res.json(orders))
			.catch(error => res.status(400).send(error));
	},

	findById(req, res) {
		return Order
			.findOne({
				where: {
					id: req.params.id
				}
			})
			.then(order => res.json(order))
			.catch(error => res.status(400).send(error));
	},

	delete(req, res) {
		return Order
			.findOne({
				where: {
					id: req.params.id
				}
			})
			.then(order => order.destroy()
				.then(result => {
					res.json(result);
				}))
			.catch(error => res.status(400).send(error));
	}

};
