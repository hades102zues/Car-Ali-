const express = require("express");
const router = express.Router();
const loginControllers = require("../controllers/login");
const upload = require("../multerfile");

router.get("/user-details", loginControllers.getUserDetails);
router.get("/user-image", loginControllers.getUserImage);
router.post("/upload-user-image", upload.single("image"), loginControllers.postUserImage);

module.exports = router;
