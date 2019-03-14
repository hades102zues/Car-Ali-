const Bid = require("../models/bid");

exports.getUserBids = (req, res) => {
	Bid.getAllUserBids(req, res, results => {
		res.status(200).json({ message: "Retrieval Successful", results });
	});
};
exports.getListingBids = (req, res) => {
	Bid.getAllListingBids(req, res, results => {
		res.status(200).json({ message: "Retrieval Successful", results });
	});
};

exports.postBidUpload = (req, res) => {
	Bid.create(req, res, () => {
		res.status(200).json({ message: "Bid Successfully Posted" });
	});
};
exports.deleteBidRemoval = (req, res) => {
	Bid.delete(req, res, () => {
		res.status(200).json({ message: "Bid Successfully Removed" });
	});
};
