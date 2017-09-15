const User = require("../models").user;

module.exports = {
	create(req, res) {
		return User
			.create({
				user_name: req.body.user_name,
				password: req.body.password,
				full_name: req.body.full_name,
				photo: req.body.photo
			})
			.then(user => res.status(201).send(user))
			.catch(error => res.status(400).send(error));
	},

	findAll(req, res) {
		return User
			.findAll()
			.then(users => res.json(users))
			.catch(error => res.status(400).send(error));
	},

	findById(req, res) {
		return User
			.findOne({
				where: {
					id: req.params.id
				}
			})
			.then(user => res.json(user))
			.catch(error => res.status(400).send(error));
	},

	delete(req, res) {
		return User
			.findOne({
				where: {
					id: req.params.id
				}
			})
			.then(user => user.destroy()
				.then(result => {
					res.json(result);
				}))
			.catch(error => res.status(400).send(error));
	}

};
