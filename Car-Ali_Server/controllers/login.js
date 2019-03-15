const hasher = require("bcryptjs");
const User = require("../models/users");
const Bid = require("../models/bid");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET || "Kil3rQue3nbiT5D4Dust";
const mailer = require('../emailer');
const crypto = require('crypto');



exports.postSignup = (req, res) => {
	//check to see if the user exists
	User.getOne(req, res, result => {
		//if the result is not defined then user does not already exist
		if (!result) {
			//hash it
			hasher
				.hash(req.body.password, 10)
				.then(hash => {
					//remove crucial data
					delete req.body.password;

					req.hash = hash;
					User.create(req, res, result => {
						//clear crucial data
						delete req.hash;

						//create the token with user details
						const token = jwt.sign(result, secret);

						//send back a token
						
						 mailer.sendMail({
							to:req.body.email,
							from:'carali.test@gmail.com',
							subject:'Welcome to Car-ALi!',
							html:`<h1>You're up and ready to Bid, ${req.body.name}. Go on!</h1>`
						}, (error,info)=>{
							if(!error)
							res.status(200).json({
							message: "New User Created!",
							token: token	
						  });
						});
					});
				})
				.catch(err => console.log("error while hashing"));
		} else {
			return res
				.status(400)
				.json({ message: "User With That Email Already Exists" });
		}
	});
};

exports.postLogin = (req, res) => {
		

	User.getOne(req, res, user => {
		if (user) {
			//user exists

			//test to make sure password is correct
			hasher.compare(req.body.password, user.password).then(result => {
				//get rid of importants
				delete req.body.password;
				delete user.password;

				if (result) {
					//match was succesful

					//then create a token
					const token = jwt.sign(user, secret);


					//send back a token
					res.status(200).json({
						message: "User Is Now Logged In!",
						token: token
					});
				} else {
					res.status(400).json({
						message: "Invalid Email or Password"
					});
				}
			});
		} else {
			//user doesnt exist
			res.status(400).json({ message: "Invalid Email or Password" });
		}
	});
};

exports.postPasswordReset=(req, res)=>{
	User.getOne(req, res, user => {
		if (user) {
			//user exists
			crypto.randomBytes(32, (err, buffer)=>{
				if(err){
					
					res.status(500).json({message: 'Server Error Occured'});
				}else{
					const token = buffer.toString('hex');
					const expirationDate = Date.now() + 3600000;//hour in ms
					
					User.expUpdate(req, res, ()=>{

						mailer.sendMail({
							to:req.body.email,
							from:'carali.test@gmail.com',
							subject:'Password Reset',
							html:`
							<a href="http://localhost:3000/password-reset-confirm/${token}"><p>Click To Reset Password</p></a>
							`

						}, (err, info)=>{
							if(!err)
								res.status(200).json({message:'Reset in Email'})
						});


					}, {reset_token: token, reset_token_exptime:expirationDate});
				}
			});
		} else {
			res.status(400).json({ message: "No Account With That Email Found" });
		}
	});
}

exports.postPasswordConfirm=(req, res)=>{
	User.passwordResetGetOne(req, res, (user)=>{
		if(!user){
			res.status(500).json({message:'Something Went Wrong'});
		}else{

			
			//expiration date hase not been exceeded
			if(parseInt(user.reset_token_exptime) > Date.now() ){

				hasher
				.hash(req.body.newPassword, 10)
				.then(hash => {
					User.passwordResetUpdate(req,res,()=>{
						res.status(200).json({message: 'Password Reset Succesful'});
					},{ password: hash, reset_token:'', reset_token_exptime:0} );
				});
				
			}else{
				res.status(400).json({message: 'Password Expired'});
			}
		}
	});
}

//**guarded
exports.getUserDetails = (req, res) => {
	delete req.decoded.id;
	delete req.decoded.iat;
	res.status(200).json({ userInfo: req.decoded });
};

exports.postUserImage = (req, res) => {
	User.update(
		req,
		res,
		() => {
			//update bid with user details.
			Bid.expUpdateBidsUserDetails(
				req,
				res,
				() => {
					res.status(200).json({ message: "Image upload succesful" });
				},
				{ user_path: req.file.filename }
			);
		},
		{ profile_img: req.file.filename }
	);
};

exports.getUserImage = (req, res) => {
	User.authedGetOneGetOne(req, res, result => {
		res.status(200).json({
			message: "User profile image path",
			filename: result.profile_img
		});
	});
};

//**
