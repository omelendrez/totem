const Discount = require("../models").discount;

module.exports = {

	create(req, res) {
		return Discount
			.create({
				name: req.body.name,
				description: req.body.description,
				percent: req.body.percent
			})
			.then(discount => res.sendStatus(201).send(discount))
			.catch(error => res.sendStatus(400).send(error));
	},

	findAll(req, res) {
		return Discount
			.findAll()
			.then(discounts => res.json(discounts))
			.catch(error => res.sendStatus(400).send(error));
	},

	findById(req, res) {
		return Discount
			.findOne({
				where: {
					id: req.params.id
				}
			})
			.then(discount => discount ? res.json(discount) : res.sendStatus(404))
			.catch(error => res.sendStatus(400).send(error));
	},

	delete(req, res) {
		return Discount
			.findOne({
				where: {
					id: req.params.id
				}
			})
			.then(discount => discount.destroy()
				.then(result => {
					res.json(result);
				}))
			.catch(error => res.sendStatus(400).send(error));
	}

};
