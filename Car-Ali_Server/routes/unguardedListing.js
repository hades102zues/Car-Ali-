const express = require("express");
const router = express.Router();
const listingControllers = require("../controllers/listing");

//get some front page results
router.get("/featured-results", listingControllers.getFeaturedListings);

//get some front page results
router.get("/some-results", listingControllers.getSomeListings);

//get all catalog info
router.get("/catalog", listingControllers.getCatalog);

//get a specific user listing in db
router.get("/listing-user/:listingId", listingControllers.expGetUserListing);

//get search results for car name
router.post("/catalog-query", listingControllers.postCatalogQuery);

module.exports = router;
