const express = require("express");
const router = express.Router();
const { User } = require("../models");
const auth = require("../middleware/auth");



router.get("/:email", auth, async (req, res) => {
	const { money } = await User.findByPk(req.params["email"], {
		attributes: {
			exclude: 'password',
		}
	});

	if (!money) return res.sendStatus(404);

	res.send({ money });
});

router.put("/:email", auth, async (req, res) => {
	const { error, value: money } = User.validateMoney(req.body);

	if (error) return res.sendStatus(400);

	const { updatedAt } = await User.findByPk(req.params["email"]);

	const present = new Date().getTime();

	if ((present - updatedAt.getTime()) / 1000 < 50) return res.sendStatus(429);

	const [result] = await User.update(money, {
		where: {
			email: req.params['email']
		}
	});

	if (result === 0) return res.sendStatus(404);

	res.sendStatus(204);
});


module.exports = router;