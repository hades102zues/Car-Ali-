const Listing = require("../models/listing");
const Bid = require("../models/bid");

//---guarded
exports.postListing = (req, res) => {
	Listing.create(req, res, () => {
		res.status(200).json({ message: "New Listing Succesfully Created" });
	});
};
exports.getUserListings = (req, res) => {
	Listing.getAllUserListings(req, res, results => {
		res.status(200).json({ message: "Listings", results });
	});
};

exports.getUserListing = (req, res) => {
	Listing.getOneUserListing(req, res, result => {
		res.status(200).json({ message: "Listing", result });
	});
};

exports.expGetUserListing = (req, res) => {
	Listing.epxGetOneUserListing(req, res, result => {
		res.status(200).json({ message: "Listing", result });
	});
};
exports.patchListing = (req, res) => {
	Listing.updateOne(req, res, () => {
		res.status(200).json({ message: "Update Succesfull" });
	});
};

exports.deleteListing = (req, res) => {
	Listing.deleteOne(req, res, () => {
		res.status(200).json({ message: "Item Deleted" });
	});
};

exports.postAcceptBid = (req, res) => {
	Listing.updateOne(
		req,
		res,
		() => {
			//get bid id of the largest bid
			Bid.expGetAllListingBids(req.body.listingId, res, results => {
				const highestBidId = results[0].id;

				//now set that bid to won
				Bid.expUpdateSomeBidToWon(highestBidId, res, () => {
					res.status(200).json({ message: "Bidding Closed!" });
				});
			});
		},
		{ closed: 1 }
	);
};

//---unguarded

exports.getFeaturedListings = (req, res) => {
	Listing.getAll(req, res, results => {
		const newResults = results.filter(
			listing =>
				listing.year <= 2000 ||
				(listing.status === 1 && listing.cost >= 10000) ||
				(listing.cost >= 100 &&
					listing.cost <= 600 &&
					listing.status === 0)
		);

		res.status(200).json({
			message: "Featured Listings",
			results: newResults
		});
	});
};

exports.getSomeListings = (req, res) => {
	Listing.getAll(req, res, results => {
		const newResults = [];
		for (let i = results.length - 1; i >= results.length / 2; i--) {
			newResults.push(results[i]);
		}

		res.status(200).json({
			message: "Some Listings",
			results: newResults
		});
	});
};

exports.getCatalog = (req, res) => {
	Listing.getAll(req, res, results => {
		res.status(200).json({
			message: "Catalog",
			results
		});
	});
};

exports.postCatalogQuery = (req, res) => {
	Listing.getAll(req, res, results => {
		const newResults = results.filter(
			listing =>
				listing.car_name
					.toLowerCase()
					.includes(
						req.body.searchResults.inputQuery.toLowerCase()
					) &&
				listing.status === parseInt(req.body.searchResults.indexQuery)
		);

		res.status(200).json({
			message: "Search Results",
			results: newResults
		});
	});
};
