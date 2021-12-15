const express = require("express");
const router = express.Router();
const { User, Order } = require("../models");
const {hash} = require("../utility/hash");
const auth = require("../middleware/auth");


router.get("/:email", async (req, res) => {
	// send user details
	const user = await User.findByPk(req.params["email"], {
		attributes: {
			exclude: 'password'
		}
	});

	if (!user) return res.sendStatus(404);

	res.send(user);
});

router.post("/", async (req, res) => {
	// validate user details
	const { error, value: user } = User.validate(req.body);

	if (error) return res.sendStatus(400);

	user.password = await hash(user.password);

	await User.create(user);
	const token = User.generateAuthToken(user);

	res.header('x-auth-token', token).sendStatus(201);
});


router.put("/:email", auth, async (req, res) => {
	// update user details
	const { error, value: user } = User.validateUpdate(req.body);

	if(error) return res.sendStatus(400);

	if (user.password) user.password = await hash(user.password);

	const [result] = await User.update(user, {
		where: {
			email: req.params["email"]
		}
	});

	if (result === 0) return res.sendStatus(404);

	const token = User.generateAuthToken(user);

	res.header('x-auth-token', token).sendStatus(204);
});


router.delete("/:email", auth, async (req, res) => {
	// delete user

	const result = await User.destroy({
		where: {
			email: req.params["email"]
		}
	});

	if (result === 0) return res.sendStatus(404);

	res.sendStatus(204);
});


router.get("/:email/orders", auth, async (req, res) => {
	const { orders } = await User.findByPk(req.params["email"], {
		include: Order,
		attributes: {
			exclude: 'password',
		}
	});

	if (!orders) return res.sendStatus(404);

	res.send(orders);
});


module.exports = router;