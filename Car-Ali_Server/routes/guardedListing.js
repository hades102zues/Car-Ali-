const express = require("express");
const router = express.Router();
const listingControllers = require("../controllers/listing");
const upload = require("../multerfile");
const authWare = require("../utility/authWare");

//upload a listing
//the file is now accessible through req.file.
//single takes the name of the field alloted to the file, uploaded in the form
router.post("/listing", authWare, upload.single("image"), listingControllers.postListing);

//get all user listings in db
router.get("/listings-user", authWare, listingControllers.getUserListings);

//update a listing
router.patch("/listing-user", authWare, listingControllers.patchListing);

//delete a listing
router.delete("/listing-user", authWare, listingControllers.deleteListing);

//updates a listing to close bidding
router.post("/listing-user-accept-bid", authWare, listingControllers.postAcceptBid);

//retrieve a specific user listing in db
router.post("/listing-user", authWare, listingControllers.getUserListing);

module.exports = router;
