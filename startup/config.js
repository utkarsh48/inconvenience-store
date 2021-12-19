const express = require("express");
require("express-async-errors");
const cors = require("cors");


module.exports = function (app){
	// app.use(apiKeyAuth);
	// load env vars
	app.use(cors());
	app.use(express.json());
	app.use((err, req, res, next) => {
		if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
			return res.sendStatus(400);
		}
		next();
	});
}