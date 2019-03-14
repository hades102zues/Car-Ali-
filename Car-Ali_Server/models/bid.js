const knex = require("../knexExportFile");

module.exports = class Bid {
	static create(req, res, cb) {
		knex("bids")
			.insert({
				bid: req.body.bid,
				user_name: req.decoded.username,
				user_id: req.decoded.id,
				listing_id: req.body.listingId,
				won: 0,
				user_path: req.decoded.profile_img
			})
			.then(result => cb(result))
			.catch(err =>
				res.status(400).json({
					message: "Failed to Create Bid",
					err
				})
			);
	}

	static getAllUserBids(req, res, cb) {
		knex("bids")
			.select()
			.where({ user_id: req.decoded.id })
			.then(results => cb(results))
			.catch(err =>
				res.status(400).json({ message: "Bid Retrieval Failed", err })
			);
	}

	static getOneUserBids(req, res, cb) {
		knex("bids")
			.select()
			.where({ user_id: req.decoded.id, id: req.body.bidId })
			.first()
			.then(result => cb(result))
			.catch(err =>
				res.status(400).json({ message: "Bid Retrieval Failed", err })
			);
	}

	static getAllListingBids(req, res, cb) {
		knex("bids")
			.select()
			.where({ listing_id: req.params.listingId })
			.orderBy("bid", "desc")
			.then(results => cb(results))
			.catch(err =>
				res.status(400).json({ message: "Bid Retrieval Failed", err })
			);
	}

	//*****
	static expGetAllListingBids(listingId, res, cb) {
		knex("bids")
			.select()
			.where({ listing_id: listingId })
			.orderBy("bid", "desc")
			.then(results => cb(results))
			.catch(err =>
				res.status(400).json({ message: "Failed To Close Bidding" })
			);
	}
	static expUpdateSomeBidToWon(bidId, res, cb) {
		knex("bids")
			.update({ won: 1 })
			.where({ id: bidId })
			.then(results => cb(results))
			.catch(err =>
				res.status(400).json({ message: "Failed To Close Bidding" })
			);
	}
	//****

	static delete(req, res, cb) {
		knex("bids")
			.del()
			.where({ user_id: req.decoded.id, id: req.body.bidId })
			.then(result => cb(result))
			.catch(err =>
				res.status(400).json({
					message: "Failed to Delete Bid",
					err
				})
			);
	}

	//
	static expUpdateBidsUserDetails(req, res, cb, updObj = null) {
		if (updObj === null) return;
		knex("bids")
			.update(updObj)
			.where({ user_id: req.decoded.id })
			.then(results => cb(results))
			.catch(err => null);
	}
};
