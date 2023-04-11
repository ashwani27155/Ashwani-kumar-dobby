const express = require("express");
const userRouter = express.Router();
const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//signup

userRouter.post("/signup", async (req, res) => {
	const salt = 8;
	try {
		const user = new User({
			fname: req.body.fname,
			email: req.body.email,
			password: await bcrypt.hash(req.body.password, salt),
		});
		user.save();
		res.status(200).send(user);
	} catch (error) {
		console.log(error.message);
		res.status(404).send({
			msg: "Something went wrong while creating user",
		});
	}
});
//signin
//Get  user
userRouter.post("/signin", async (req, res) => {
	try {
		var user = await User.findOne({
			email: req.body.email,
		});
		if (!user) {
			res.status(403).json({ msg: "email not found" });
		}

		const isPasswordValid = bcrypt.compareSync(
			req.body.password,
			user.password
		);

		if (isPasswordValid) {
			const token = await jwt.sign({ _id: req.body._id }, "pankaj", {
				expiresIn: 6000,
			});
			res.status(200).json({ status: true, token });
		} else {
			res.status(400).json({ msg: "Password does not match" });
		}
	} catch (error) {
		console.log(error.message);
		res.status(404).send({
			msg: "Something went wrong while fetching all user",
		});
	}
});
module.exports = userRouter;
