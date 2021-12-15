const express = require("express");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { User } = require("../models");
const { compare } = require('../utility/hash');
const auth = require("../middleware/auth");


router.post("/", async (req, res) => {
	// send user details
	// if(req.user) return res.send
	let token = req.header("x-auth-token");

	if(isAlreadyLoggedIn(token))
		return res.status(406).send("Already logged in");

	const { error } = User.validateAuth(req.body);
	if (error) return res.sendStatus(400);

	const userFromDb = await User.findByPk(req.body.email);

	if (!userFromDb) return res.sendStatus(404);

	const match = await compare(req.body.password, userFromDb.password);

	if (!match) return res.status(400).send("Wrong Password");

	token = User.generateAuthToken(userFromDb);

	res.header('x-auth-token', token).send(_.omit(userFromDb.dataValues, "password"));
});


function isAlreadyLoggedIn(token){
	try{
		return jwt.verify(token, process.env["JWT_AUTH_KEY"]);
	}
	catch(ex){
		return false;
	}
}

module.exports = router;