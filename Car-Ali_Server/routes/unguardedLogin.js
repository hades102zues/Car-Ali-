const express = require("express");
const router = express.Router();
const loginControllers = require("../controllers/login");

router.post("/signup", loginControllers.postSignup);
router.post("/login", loginControllers.postLogin);

//user sends an email for which they want a password reset
router.post('/password-reset', loginControllers.postPasswordReset);

//user gets link from email and resets password
router.post('/password-reset-confirm', loginControllers.postPasswordConfirm);

module.exports = router;
