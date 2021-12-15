const express = require("express");
const products = require("../routes/products-route");
const auth = require("../routes/auth-route");
const user = require("../routes/user-route");
const money = require("../routes/money-route");
const order = require("../routes/order-route");
const errorHandler = require("../middleware/errorHandler");

module.exports = function (app){
	app.use("/api/auth", auth);
	app.use("/api/user", user);
	app.use("/api/products", products);
	app.use("/api/order", order);
	app.use("/api/money", money);
	app.get("/", (req, res)=>{res.send("hello world")});
	app.use(errorHandler);
}