const express = require("express");
const router = express.Router();
const listingControllers = require("../controllers/listing");
const upload = require("../multerfile");

//upload a listing
router.post("/listing", upload.single("image"), listingControllers.postListing);

//get all user listings in db
router.get("/listings-user", listingControllers.getUserListings);

//update a listing
router.patch("/listing-user", listingControllers.patchListing);

//delete a listing
router.delete("/listing-user", listingControllers.deleteListing);

//updates a listing to close bidding
router.post("/listing-user-accept-bid", listingControllers.postAcceptBid);

//retrieve a specific user listing in db
router.post("/listing-user", listingControllers.getUserListing);

module.exports = router;
