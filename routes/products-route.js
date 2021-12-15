const express = require("express");
const router = express.Router();
const { Product } = require("../models");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");


router.get("/", async (req, res) => {
	const offset = parseInt(req.query["offset"]) || 0,
		limit = parseInt(req.query["limit"]) || 10,
		filter = req.query["filterBy"] || "title",
		order = req.query["order"] || "asc";

	// validate offset and limit
	// send paginated products
	const products = await Product.findAll({
		order: [[filter, order]],
		limit,
		offset
	});

	if (!products) return res.sendStatus(404);

	res.send(products);
});


router.get("/:id", async (req, res) => {
	// send product details
	const product = await Product.findByPk(req.params["id"]);

	if (!product) return res.sendStatus(404);

	res.send(product);
});


// authorized only
router.post("/", auth, admin, async (req, res) => {
	// validate product details
	const { error, value: product } = Product.validate(req.body);

	if (error) return res.sendStatus(400);

	await Product.create(product);

	res.sendStatus(201);
});

router.put("/:id", auth, admin, async (req, res) => {
	// update product details
	const { error, value: product } = Product.validate(req.body);

	if (error) return res.sendStatus(400);

	const [result] = await Product.update(product, {
		where: {
			id: req.params["id"]
		}
	});

	if (result === 0) return res.sendStatus(404);

	res.sendStatus(204);
});

router.delete("/:id", auth, admin, async (req, res) => {
	// delete product

	const result = await Product.destroy({
		where: {
			id: req.params["id"]
		}
	});

	if (result === 0) return res.sendStatus(404);

	res.sendStatus(204);
});

module.exports = router;