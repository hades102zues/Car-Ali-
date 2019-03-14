const express = require("express");
const router = express.Router();
const bidControllers = require("../controllers/bid");

//get the bids for a listing in desc
router.get("/listing-bids/:listingId", bidControllers.getListingBids);

module.exports = router;
