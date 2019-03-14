const knex = require("../knexExportFile");

module.exports = class User {
	//create
	static create(req, res, cb) {
		knex("users")
			.insert({
				username: req.body.username,
				name: req.body.name,
				email: req.body.email,
				password: req.hash,
				profile_img:''
			})
			.returning(["id", "username", "name", "email", 'profile_img'])
			.then(result => cb(result[0]))
			.catch(err =>
				res.status(400).json({ message: "error creating user", err })
			);
	}

	//getOne
	static getOne(req, res, cb) {
		knex("users")
			.select()
			.where({ email: req.body.email })
			.first()
			.then(result => cb(result))
			.catch(err => console.log("Error getting user"));
	}

	//
	static authedGetOneGetOne(req, res, cb) {
		knex("users")
			.select()
			.where({ id: req.decoded.id })
			.first()
			.then(result => cb(result))
			.catch(err => console.log("Error getting user"));
	}

	static update(req, res, cb, updObject = null) {
		if (updObject === null) return;

		knex("users")
			.update(updObject)
			.where({ id: req.decoded.id })
			.then(result => cb(result))
			.catch(err => console.log("Error getting user"));
	}
	//update

	//delete
};
