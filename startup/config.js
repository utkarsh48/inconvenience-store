const express = require("express");
require("express-async-errors");

module.exports = function (app){
	// app.use(apiKeyAuth);
	// load env vars
	
	app.use(express.json());
	app.use((err, req, res, next) => {
		if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
			return res.sendStatus(400);
		}
		next();
	});
}