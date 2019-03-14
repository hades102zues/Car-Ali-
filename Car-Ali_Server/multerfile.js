const multer = require("multer");
const path = require("path");

//This portion prepares the files to be stored at a specific directory.
//It determines what names the uploaded files will be stored under
//and keeps the extension defined on the upload
const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {

		//this is how we specify where to store the files
		//create these directories before hand!!!
		cb(null, path.join(path.dirname(process.mainModule.filename), "public", "uploads"));
		

	},

	filename: (req, file, cb) => {
		//this specifies what names our uploaded files will be stored under
		//.original name holds the name+extension of the uploaded file
		cb(null, Date.now() + "_" + file.originalname);
	}
});

const filterFunction = (req, file, cb) => {
	//DO NOT USE THE TERNARY OPERATOR!!!!
	if (
		file.mimetype === "image/jpg" ||
		file.mimetype === "image/jpeg" ||
		file.mimetype === "image/png"
	) {
		cb(null, true);
	} else {
		cb(null, false); //reject the file

		//then throw this error
		//which will be nexted to express
		cb(new Error("File Was Not Accepted"));
	}
};

module.exports = multer({ storage: fileStorage, fileFilter: filterFunction });
