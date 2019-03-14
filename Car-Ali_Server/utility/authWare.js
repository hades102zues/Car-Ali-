const jwt = require("jsonwebtoken");
const secret = process.env.SECRET || "Kil3rQue3nbiT5D4Dust";

module.exports = (req, res, next) => {
	const token = req
		.get("Authorization")
		.split("Bearer")[1]
		.trim();

	jwt.verify(token, secret, (err, decodeResult) => {
		if (!decodeResult)
			return res
				.status(501)
				.json({ message: "Invalid jwt token received" });

		req.decoded = decodeResult;
		next();
	});
};

//check for the presence of a json webtoken
//no token then block access
//if token then decode the token and store details in req.decoded
