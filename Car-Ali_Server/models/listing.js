const knex = require("../knexExportFile");

module.exports = class Listing {
	static create(req, res, cb) {
	
		knex("listings")
			.insert({
				status: parseInt(req.body.status),
				year: parseInt(req.body.year),
				condition: parseFloat(req.body.condition),
				verified: parseInt(req.body.verified),
				cost: parseFloat(req.body.cost),
				passengers: parseInt(req.body.passengers),
				car_name: req.body.carName.toUpperCase(),
				image_path: req.file.filename,
				user_id: req.decoded.id,
				closed: 0
			})
			.then(result => cb(result))
			.catch(err => {
				res.status(400).json({
					message: "Creating Listing Failed",
					err
				});
			});
	}

	static getAllUserListings(req, res, cb) {
		knex("listings")
			.select()
			.where({ user_id: req.decoded.id })
			.then(results => cb(results))
			.catch(err => {
				res.status(400).json({ message: "Failed To Get User Data" });
			});
	}

	static getOneUserListing(req, res, cb) {
		knex("listings")
			.select()
			// .where({ user_id: req.decoded.id, id: req.body.listingId })
			.where({ id: req.body.listingId })
			.then(results => cb(results))
			.catch(err => {
				res.status(400).json({ message: "Failed To Get Listing Data" });
			});
	}

	static epxGetOneUserListing(req, res, cb) {
		knex("listings")
			.select()
			// .where({ user_id: req.decoded.id, id: req.body.listingId })
			.where({ id: req.params.listingId })
			.then(results => cb(results))
			.catch(err => {
				res.status(400).json({ message: "Failed To Get Listing Data" });
			});
	}

	static updateOne(req, res, cb, preferedUpdateObj = null) {
		let updateObj = {};

		if (preferedUpdateObj === null) {
			updateObj = {
				status: parseInt(req.body.status),
				year: parseInt(req.body.year),
				condition: parseFloat(req.body.condition),
				verified: parseInt(req.body.verified),
				cost: parseFloat(req.body.cost),
				passengers: parseInt(req.body.passengers),
				car_name: req.body.carName.toUpperCase()
			};
		}

		if (preferedUpdateObj !== null) {
			updateObj = preferedUpdateObj;
		}
		knex("listings")
			.update(updateObj)
			.where({ id: req.body.listingId, user_id: req.decoded.id })
			.returning("id")
			.then(result => cb(result))
			.catch(err => {
				res.status(400).json({ message: "Failed To Update Item" });
			});
	}

	static deleteOne(req, res, cb) {
		knex("listings")
			.del()
			.where({ id: req.body.listingId })
			.then(result => cb(result))
			.catch(err => {
				res.status(400).json({ message: "Request Failed" });
			});
	}

	//---
	static getOne(req, res, cb) {
		knex("listings")
			.select()
			.where({ id: req.body.listingId })
			.first()
			.then(result => cb(result))
			.catch(err =>
				res.status(400).json({ message: "Error Fetching Data", err })
			);
	}

	static getAll(req, res, cb) {
		knex("listings")
			.select()
			.then(results => cb(results))
			.catch(err =>
				res.status(400).json({ message: "Error Fetching Data", err })
			);
	}
};
