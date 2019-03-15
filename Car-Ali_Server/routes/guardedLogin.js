const express = require("express");
const router = express.Router();
const loginControllers = require("../controllers/login");
const upload = require("../multerfile");
const authWare = require("../utility/authWare");

router.get("/user-details", authWare, loginControllers.getUserDetails);
router.get("/user-image", authWare, loginControllers.getUserImage);


//the file is now accessible through req.file.
//single takes the name of the field alloted to the file, uploaded in the form
router.post("/upload-user-image", authWare, upload.single("image"), loginControllers.postUserImage);

module.exports = router;
