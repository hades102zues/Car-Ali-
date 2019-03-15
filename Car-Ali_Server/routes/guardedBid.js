const express = require("express");
const router = express.Router();
const bidControllers = require("../controllers/bid");
const authWare = require("../utility/authWare");

//gets all of a user's bids
router.get("/user-bids",authWare, bidControllers.getUserBids);

//allows user to post a bid
router.post("/bid-upload", authWare,  bidControllers.postBidUpload);

//allows user to delete a bid
router.delete("/bid-removal", authWare,  bidControllers.deleteBidRemoval);

module.exports = router;
