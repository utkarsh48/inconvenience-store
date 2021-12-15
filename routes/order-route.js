const express = require("express");
const router = express.Router();
const { Order, User, sequelize } = require("../models");
const auth = require("../middleware/auth");


router.get("/:orderId", async (req, res) => {
	const order = await Order.findByPk(req.params["orderId"]);

	if (!order) return res.sendStatus(404);

	res.send(order);
});

router.post("/", auth, async (req, res) => {
	const { error, value: order } = Order.validate(req.body);

	if (error) return res.sendStatus(400);

	const {userEmail, itemCost, quantity} = req.body;

	const transaction = await sequelize.transaction();

	try {
		const user = await User.findByPk(userEmail);
		if(!user) return res.status(404).send("User not found");
		
		if (user.money < itemCost * quantity) return res.status(400).send("Not enough money");

		const newMoney = user.money - (itemCost * quantity);


		const orderTransaction = await Order.create(order, { transaction });

		const [money] = await User.update({ money: newMoney }, {
			where: {
				email: userEmail
			}, transaction
		});

		await transaction.commit();
		res.status(204);
	} catch (er) {
		await transaction.rollback();
		res.sendStatus(400);
	}
});

// router.put("/:orderId", auth, async (req, res) => {
// 	const { error, value: order } = Order.validate(req.body);

// 	if (error) return res.sendStatus(400);

// 	const [result] = await Order.update(order, {
// 		where: {
// 			id: req.params["orderId"]
// 		}
// 	});

// 	if (result === 0) return res.sendStatus(404);

// 	res.sendStatus(204);
// });

// router.delete("/:orderId", auth, async (req, res) => {
// 	const result = await Order.destroy({
// 		where: {
// 			id: req.params["orderId"]
// 		}
// 	});

// 	if (result === 0) return res.sendStatus(404);

// 	res.sendStatus(204);
// });


module.exports = router;