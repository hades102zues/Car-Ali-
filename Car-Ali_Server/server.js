const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require("body-parser");
const helmet = require("helmet");
const upload = require("./multerfile");
const cors = require("cors");
const authWare = require("./utility/authWare");

const unguargedLoginRoutes = require("./routes/unguardedLogin");
const unguardedlistingRoutes = require("./routes/unguardedListing");
const unguardedBidRoutes = require("./routes/unguardedBid");

const guardedLoginRoutes = require("./routes/guardedLogin");
const guardedlistingRoutes = require("./routes/guardedListing");
const guardedBidRoutes = require("./routes/guardedBid");


app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

//to serve files it MUST be an app.use
// to get an image we do
//http://localhost:3001/images/<some file path with the assumption made that we are already in the uploads folder>
//AND SO we do not got doing this //http://localhost:3001/images/public/uploads/<...>
app.use("/images", express.static(path.join(__dirname, "public", "uploads")));

app.use(unguargedLoginRoutes);
app.use(unguardedlistingRoutes);
app.use(unguardedBidRoutes);


app.use( guardedLoginRoutes);
app.use(guardedBidRoutes);

app.use( guardedlistingRoutes);

app.use((error, req, res, next) => {
	console.log(error);
	const errorCode = 501;
	const errorMessage = error.message ? error.message : "Internal error.";

	res.status(errorCode).json({
		message: errorMessage
	});
});

app.use((req, res) => {
	res.status(404).json({ message: "Unknown Route" });
});
app.listen(port, () => console.log("****SERVER INITIATED***", process.env.DATABASE_URL));
