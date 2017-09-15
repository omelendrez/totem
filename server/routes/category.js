const Category = require("../models").category;

module.exports = {
	create(req, res) {
		return Category
			.create({
				name: req.body.name,
			})
			.then(category => res.status(201).send(category))
			.catch(error => res.status(400).send(error));
	},

	findAll(req, res) {
		return Category
			.findAll()
			.then(categories => res.json(categories))
			.catch(error => res.status(400).send(error));
	},

	findById(req, res) {
		return Category
			.findOne({
				where: {
					id: req.params.id
				}
			})
			.then(category => category ? res.json(category) : res.send(404))
			.catch(error => res.status(400).send(error));
	},

	delete(req, res) {
		return Category
			.findOne({
				where: {
					id: req.params.id
				}
			})
			.then(category => category.destroy()
				.then(result => {
					res.json(result);
				}))
			.catch(error => res.status(400).send(error));
	}

};
