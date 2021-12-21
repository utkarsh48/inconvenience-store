const express = require("express");
require("express-async-errors");
const cors = require("cors");
require("dotenv").config();

const corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
  "allowedHeaders": ["x-auth-token", "content-type"],
  "exposedHeaders": ["x-auth-token"],
  "credentials": true
}



module.exports = function (app){
	// app.use(apiKeyAuth);
	// load env vars
	app.use(cors(corsOptions));
	app.use(express.json());
	app.use((err, req, res, next) => {
		if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
			return res.sendStatus(400);
		}
		next();
	});
}
