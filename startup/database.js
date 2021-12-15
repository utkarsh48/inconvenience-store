const db = require("../models/index");
// const product = require("../controllers/product");

// const order = require("../controllers/order");
// const user = require("../controllers/user");
// const pro = require("./products.json"), moc = require("./mock.json");

module.exports = function () {
	db.sequelize.authenticate()
		.then(()=>console.log("connected to db"))
		.catch (error => {
			console.error('Unable to connect to the database:', error);
		});

	// Promise.allSettled([...moc.map(m=>{
	// 	return user.create(m);
	// }),
	// ...pro.map(p=>{
	// 	return product.create(p);
	// })]).then(res=>console.log(res, "\n\n\n\ncomplete!!!!!")).catch(er=>console.error(er));

	// order.create("teah@email.com", "041da22e-2506-4320-82dd-41c532595f5f")
	// .then(res=>console.log(res, "\n\n\n\ncreated"))
	// .catch(err=>console.error(err));

	// user.authenticate({
	// 	fname: "first", 
	// 	lname: "last", 
	// 	email: "example@email.com",
	// 	password: "pass",
	// 	money: 10
	// }).then(res=>console.log("auth \n", res)).catch(err=>console.error(err));

	// product.create({
	// 	title: "title 2", 
	// 	description: "desc", 
	// 	image: "https://picsum.photos/400",
	// 	cost: 10
	// }).then(res=>console.log("create \n", res)).catch(err=>console.error(err));

	// productI.findAll({
	// }, {limit: 20, offset: 0}).then(res=>console.log("found \n", res)).catch(err=>console.error(err));

	// await db.Role.create({
	// 	name: 'admin'
	// });

	// await db.Role.create({
	// 	name: 'user'
	// });

}